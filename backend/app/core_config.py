from pydantic import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "ScholarFlow API"
    DATABASE_URL: str = "postgresql+asyncpg://postgres:postgres@db:5432/scholarflow"
    SECRET_KEY: str = "CHANGE_ME"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60*24*7

settings = Settings()
