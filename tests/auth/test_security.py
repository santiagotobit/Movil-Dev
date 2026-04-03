"""Modulo de pruebas para la seguridad de autenticación,
incluyendo hashing de contraseñas y manejo de tokens JWT."""

import pytest

from backend.core.security import create_token, decode_token, hash_password, verify_hash


def test_password_hash():
    """tests para verificar el hash de la contraseña y su verificación."""
    # arrange: se hardcodea la contraseña"
    password = "1234"

    # act : se crea el hash de la contraseña"
    contrasenia_hasheada = hash_password(password)

    # assert : verifica que si la contraseña es hasheada"
    assert contrasenia_hasheada

    # assert: verifica si la contraseña hasheada es diferente a la contraseña plana"
    assert contrasenia_hasheada != password

    # assert: verifica que la contraseña plana y la contraseña hasheada sean verificadas
    assert verify_hash(password, contrasenia_hasheada) is True


def test_verify_password_hashed():
    """tests para verificar que una contraseña incorrecta no coincida con su hash."""
    # Arrange: harcodemos la contraseña
    contrasenia = "1234"
    contrasenia_incorrecta = "4321"

    # Act: se hashea la contraseña
    contrasenia_hashed = hash_password(contrasenia)

    # Assert : se verifica si la contraseña incorrecta es diferente a la contraseña hasheada
    assert verify_hash(contrasenia_incorrecta, contrasenia_hashed) is False


def test_create_token():
    """tests para verificar la creación de un token JWT y su decodificación correcta."""
    # Arrange: se hardodea los datos
    data = {"sub": "celular iphone 17", "precio": 5000000}

    # Act : genera el token"
    token = create_token(data)

    # Assert: verifica si el toquen no se genero
    assert token is not None

    # Assert: verifica si el token es de tipo String
    assert isinstance(token, str)

    # act: obtiene la informacion del token
    payload = decode_token(token)

    # Assert: verifica que payload contenga la informacion decodificada del token"
    assert payload is not None
    # Assert: verifica que sub coincida
    assert payload["sub"] == "celular iphone 17"

    # Assert: verifica que precio coincida cuando se creo el #token"
    assert payload["precio"] == 5000000

    # Assert: comprueba que el tiempo de expiracion este en el payload"
    assert "exp" in payload


def test_decode_token_jwt_error_cases():
    """tests para verificar que la decodificación de un
    token JWT maneje correctamente los casos de error."""

    # Arrange: se hardcodea el token invalido
    token = token = "token.invalido"

    # Act / Assert

    with pytest.raises(ValueError) as exc_info:
        decode_token(token)

        assert str(exc_info.value) == "❌ Token inválido"
