from enum import Enum

from pydantic import BaseModel


class UserMessage(BaseModel):
    message: str
    user_id: int


class Option(str, Enum):
    yt = "youtube"
    website = "website"
    pdf = "pdf"
