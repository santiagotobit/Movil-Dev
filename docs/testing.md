# Estrategia de pruebas

La suite se divide por intención para que sea fácil ubicar y mantener cobertura:

- `tests/auth`, `tests/cart`, `tests/products`: unitarias históricas de servicios.
- `tests/unit`: unitarias nuevas para servicios de órdenes y pagos, sin red externa.
- `tests/integration`: pruebas HTTP contra FastAPI con base SQLite aislada.
- `tests/e2e`: flujos completos backend, por ejemplo registro, catálogo, carrito y orden.
- `tests/maintainability`: contratos de API y señales de regresión estructural.

## Ejecutar

```powershell
.\.venv\Scripts\python.exe -m pytest -q
```

## Convenciones

- Usar `tests/conftest.py` para crear usuarios, productos, tokens y clientes HTTP.
- No llamar PayPal, ePayco, Google ni Cloudinary en unitarias; usar `monkeypatch`.
- Mantener cada prueba enfocada en un comportamiento observable.
- Para endpoints protegidos, usar `auth_headers_for(user)`.
- Para nuevos flujos críticos de compra, agregar una prueba en `tests/e2e`.
