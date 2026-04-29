from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import settings


_client: AsyncIOMotorClient | None = None


async def get_database():
    global _client
    if _client is None:
        _client = AsyncIOMotorClient(settings.MONGODB_URI)
    return _client[settings.MONGODB_DATABASE]


async def close_database():
    global _client
    if _client:
        _client.close()
        _client = None
