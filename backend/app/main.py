from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .db import engine, Base
from .routers import auth, profiles, scholarships, applications, essays

app = FastAPI(title="ScholarFlow API")

origins = ["http://localhost:3000", "http://127.0.0.1:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(profiles.router, prefix="/profiles", tags=["profiles"])
app.include_router(scholarships.router, prefix="/scholarships", tags=["scholarships"])
app.include_router(applications.router, prefix="/applications", tags=["applications"])
app.include_router(essays.router, prefix="/essays", tags=["essays"])

@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
