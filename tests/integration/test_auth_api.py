"""Pruebas de integración para endpoints de autenticación."""

from tests.conftest import auth_headers_for
from users.constants import UserRole


def test_register_login_me_shipping_and_logout_flow(client):
    register_response = client.post(
        "/auth/register",
        json={
            "email": "cliente@example.com",
            "password": "ClaveSegura123",
            "full_name": "Cliente Movil",
        },
    )
    assert register_response.status_code == 201
    assert register_response.json()["role"] == UserRole.USER.value

    login_response = client.post(
        "/auth/login",
        json={"email": "cliente@example.com", "password": "ClaveSegura123"},
    )
    assert login_response.status_code == 200
    token = login_response.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    me_response = client.get("/auth/me", headers=headers)
    assert me_response.status_code == 200
    assert me_response.json()["email"] == "cliente@example.com"

    shipping_response = client.patch(
        "/auth/me/shipping",
        headers=headers,
        json={
            "receiver_name": "Cliente Movil",
            "phone": "3001234567",
            "address": "Calle 123",
            "city": "Bogota",
        },
    )
    assert shipping_response.status_code == 200
    assert shipping_response.json()["preferences"]["shipping"]["city"] == "Bogota"

    logout_response = client.post("/auth/logout", headers=headers)
    assert logout_response.status_code == 200

    revoked_response = client.get("/auth/me", headers=headers)
    assert revoked_response.status_code == 401


def test_public_register_rejects_admin_role(client):
    response = client.post(
        "/auth/register",
        json={
            "email": "admin-public@example.com",
            "password": "ClaveSegura123",
            "full_name": "Admin Publico",
            "role": UserRole.ADMIN.value,
        },
    )

    assert response.status_code == 403
    assert "registro p" in response.json()["detail"].lower()


def test_admin_can_register_admin_user(client, make_user):
    admin = make_user(email="root@example.com", role=UserRole.ADMIN)

    response = client.post(
        "/auth/admin/register",
        headers=auth_headers_for(admin),
        json={
            "email": "new-admin@example.com",
            "password": "ClaveSegura123",
            "full_name": "Nuevo Admin",
            "role": UserRole.ADMIN.value,
        },
    )

    assert response.status_code == 201
    assert response.json()["role"] == UserRole.ADMIN.value
