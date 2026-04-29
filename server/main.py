from contextlib import asynccontextmanager
from fastapi import FastAPI
from app.database.mongo import close_database
from app.auth.routes import router as auth_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    yield
    await close_database()


app = FastAPI(
    title="Graduation Code API",
    description="FastAPI backend with JWT authentication",
    version="1.0.0",
    lifespan=lifespan,
)

app.include_router(auth_router, prefix="/api/v1")


@app.get("/health")
async def health_check():
    return {"status": "healthy"}
