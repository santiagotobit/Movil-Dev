"""Módulo de seguridad para manejo de contraseñas y tokens JWT."""

import os
from datetime import datetime, timedelta, timezone
from typing import Any

from dotenv import load_dotenv
from jose import ExpiredSignatureError, JWTError, jwt
from passlib.context import CryptContext

# FUNCIONES PARA HASHEAR Y VERIFICAR HASH DE  CONTRASEÑAS

# se crea el contexto para hashear contraseñas
_pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str) -> str:
    "Recibe la contraseña y la convierte en hash"
    return _pwd_context.hash(password)


def verify_hash(password: str, password_hashed: str) -> bool:
    """Verifica si una contraseña coincide con su versión hasheada.

    Toma una contraseña en texto plano y su hash almacenado para comprobar si son equivalentes.

    Args:
        password: Contraseña en texto plano que se desea verificar.
        password_hashed: Contraseña previamente hasheada contra la que se realizará la verificación.

    Returns:
        bool:True si la contraseña coincide con el hash, False en caso contrario.
    """
    return _pwd_context.verify(password, password_hashed)


# -/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
# -/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/

load_dotenv(".env")
ACCESS_MINUTES_EXPIRE = int(os.getenv("APP_JWT_EXPIRATION", default="60"))
ALGORITHM = os.getenv("APP_JWT_ALGORITHM")
APP_JWT_SECRET = os.getenv("APP_JWT_SECRET")


def create_token(data: dict) -> str:
    """Crea a JWT token con tiempo de expiracion.

    Args:
        data: contiene un diccionario con los datos a codificar con el Token.

    Returns:
        str: una cadena codificada de JWT TOKEN.

    Raises:
        ValueError: If APP_JWT_SECRET o APP_JWT_ALGORITHM no son configurados en el ambiente.
    """
    if APP_JWT_SECRET is None:
        raise ValueError("APP_JWT_SECRET debe ser configurado en el entorno")
    if ALGORITHM is None:
        raise ValueError("APP_JWT_ALGORITHM debe ser configurado en el entorno")

    to_encode = data.copy()

    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_MINUTES_EXPIRE)
    to_encode["exp"] = expire
    return jwt.encode(to_encode, APP_JWT_SECRET, algorithm=ALGORITHM)


def decode_token(token: str) -> dict[str, Any]:
    """Decodifica un JWT y devuelve los datos contenidos si el token es válido.

    Args:
        token: Token JWT en formato string.

    Returns:
        dict[str, Any]: Contenido decodificado del token.

    Raises:
        ValueError: Token expirado, inválido o configuración de entorno faltante.
    """
    try:
        if APP_JWT_SECRET is None:
            raise ValueError("APP_JWT_SECRET debe ser configurado en el entorno")
        if ALGORITHM is None:
            raise ValueError("APP_JWT_ALGORITHM debe ser configurado en el entorno")
        return jwt.decode(token, APP_JWT_SECRET, [ALGORITHM])

    except ExpiredSignatureError as exc:
        raise ValueError("⚠️ Token expirado") from exc

    except JWTError as exc:
        raise ValueError("❌ Token inválido") from exc
