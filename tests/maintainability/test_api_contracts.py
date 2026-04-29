"""Pruebas de mantenibilidad para evitar regresiones de contratos públicos."""


def test_fastapi_route_names_are_not_registered_twice(client):
    route_keys = [
        (route.path, tuple(sorted(route.methods or [])))
        for route in client.app.routes
        if route.path.startswith(("/auth", "/products", "/cart", "/orders", "/payments"))
    ]

    assert len(route_keys) == len(set(route_keys))


def test_openapi_contains_main_domains(client):
    schema = client.get("/openapi.json").json()
    paths = schema["paths"]

    assert "/auth/login" in paths
    assert "/products" in paths
    assert "/cart/add" in paths
    assert "/orders/" in paths
    assert "/payments/paypal/create-order" in paths
