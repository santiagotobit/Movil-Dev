"""Pruebas de integración para endpoints de carrito."""

from tests.conftest import auth_headers_for


def test_guest_cart_add_total_and_remove_uses_cookie(client, make_product):
    product = make_product(precio_unitario=100000, cantidad_stock=5)

    add_response = client.post(
        "/cart/add",
        json={"product_id": product.id, "quantity": 2},
    )
    assert add_response.status_code == 201
    assert add_response.json()["source"] == "guest"
    assert add_response.json()["item"]["line_total"] == 200000
    assert "guest_cart" in add_response.headers["set-cookie"]

    items_response = client.get("/cart/items")
    assert items_response.status_code == 200
    assert items_response.json()[0]["quantity"] == 2

    total_response = client.get("/cart/total")
    assert total_response.status_code == 200
    assert total_response.json()["source"] == "guest"
    assert total_response.json()["item_count"] == 2
    assert total_response.json()["total"] == 200000

    remove_response = client.delete(f"/cart/remove/{product.id}")
    assert remove_response.status_code == 204

    empty_response = client.get("/cart/items")
    assert empty_response.status_code == 200
    assert empty_response.json() == []


def test_authenticated_cart_add_merge_and_tax_settings(client, make_user, make_product):
    user = make_user(email="cart-auth@example.com")
    admin = make_user(email="cart-admin@example.com", role="administrador")
    product = make_product(referencia="AUTH-CART", precio_unitario=50000, cantidad_stock=10)

    tax_update = client.put(
        "/cart/settings/tax",
        headers=auth_headers_for(admin),
        json={"tax_percent": 10},
    )
    assert tax_update.status_code == 200
    assert tax_update.json()["tax_percent"] == 10

    add_response = client.post(
        "/cart/add",
        headers=auth_headers_for(user),
        json={"product_id": product.id, "quantity": 1},
    )
    assert add_response.status_code == 201
    assert add_response.json()["source"] == "authenticated"

    merge_response = client.post(
        "/cart/merge",
        headers=auth_headers_for(user),
        json={"items": [{"product_id": product.id, "quantity": 2}]},
    )
    assert merge_response.status_code == 200
    assert merge_response.json()[0]["quantity"] == 3

    total_response = client.get("/cart/total", headers=auth_headers_for(user))
    assert total_response.status_code == 200
    assert total_response.json()["source"] == "authenticated"
    assert total_response.json()["item_count"] == 3
