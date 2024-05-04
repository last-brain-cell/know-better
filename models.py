from pydantic import BaseModel


class UserMessage(BaseModel):
    message: str
    user_id: int