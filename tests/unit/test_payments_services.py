"""Pruebas unitarias para lógica de pagos sin llamar pasarelas externas."""

from types import SimpleNamespace

import pytest

from cart.services import add_item_for_user
from database.core.errors import ConflictError
from payments import services


class FakeResponse:
    def __init__(self, status_code, payload):
        self.status_code = status_code
        self._payload = payload

    def json(self):
        return self._payload


def test_build_paypal_amount_converts_cop_to_usd(monkeypatch):
    monkeypatch.setenv("PAYPAL_CURRENCY", "USD")
    monkeypatch.setenv("PAYPAL_COP_TO_USD_RATE", "4000")

    amount, currency = services.build_paypal_amount(100000)

    assert amount == "25.00"
    assert currency == "USD"


def test_build_paypal_amount_rejects_invalid_rate(monkeypatch):
    monkeypatch.setenv("PAYPAL_CURRENCY", "USD")
    monkeypatch.setenv("PAYPAL_COP_TO_USD_RATE", "0")

    with pytest.raises(ConflictError, match="tasa"):
        services.build_paypal_amount(100000)


def test_get_user_cart_total_rejects_empty_cart(db_session, make_user):
    user = make_user(email="pay-empty@example.com")

    with pytest.raises(ConflictError, match="vacio"):
        services.get_user_cart_total(db_session, user)


def test_create_paypal_order_builds_expected_payload(
    db_session,
    make_user,
    make_product,
    monkeypatch,
):
    user = make_user(email="paypal-user@example.com")
    product = make_product(precio_unitario=400000, cantidad_stock=5)
    add_item_for_user(db_session, user_id=user.id, product_id=product.id, quantity=1)

    posted_payloads = []

    def fake_post(url, **kwargs):
        posted_payloads.append((url, kwargs))
        return FakeResponse(
            201,
            {
                "id": "PAYPAL-1",
                "links": [{"rel": "approve", "href": "https://paypal.test/approve"}],
            },
        )

    monkeypatch.setenv("PAYPAL_CURRENCY", "COP")
    monkeypatch.setattr(services, "_paypal_access_token", lambda: "access-token")
    monkeypatch.setattr(services.requests, "post", fake_post)

    result = services.create_paypal_order(
        db=db_session,
        user=user,
        customer=SimpleNamespace(
            nombre="Cliente",
            direccion="Calle 1",
            ciudad="Bogota",
        ),
    )

    assert result["order_id"] == "PAYPAL-1"
    assert result["url"] == "https://paypal.test/approve"
    assert result["currency"] == "COP"
    assert posted_payloads[0][1]["json"]["purchase_units"][0]["amount"]["value"] == "400000.00"


def test_create_epayco_session_raises_when_provider_returns_no_session(
    db_session,
    make_user,
    make_product,
    monkeypatch,
):
    user = make_user(email="epayco-user@example.com")
    product = make_product(precio_unitario=200000, cantidad_stock=5)
    add_item_for_user(db_session, user_id=user.id, product_id=product.id, quantity=1)

    monkeypatch.setattr(services, "_epayco_access_token", lambda: "access-token")
    monkeypatch.setattr(
        services.requests,
        "post",
        lambda *_, **__: FakeResponse(200, {"success": True, "data": {}}),
    )

    with pytest.raises(ConflictError, match="sesion"):
        services.create_epayco_session(
            db=db_session,
            user=user,
            customer=SimpleNamespace(
                nombre="Cliente",
                telefono="3001234567",
                direccion="Calle 1",
                ciudad="Bogota",
            ),
        )
