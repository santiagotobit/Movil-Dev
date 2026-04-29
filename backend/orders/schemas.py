from datetime import datetime
from typing import List

from pydantic import BaseModel, ConfigDict


class OrderItemSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    product_id: int
    quantity: int
    price: float

class OrderSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    user_id: int
    created_at: datetime
    status: str
    subtotal: float
    tax: float
    total: float
    items: List[OrderItemSchema]
