
from fastapi import FastAPI
from .db import engine, Base
from .routers import auth, profiles, scholarships, applications, essays

app = FastAPI(title="ScholarFlow API")

# include routers
app.include_router(auth.router, prefix="/auth")
app.include_router(profiles.router, prefix="/profiles", tags=["profiles"])
app.include_router(scholarships.router, prefix="/scholarships", tags=["scholarships"])
app.include_router(applications.router, prefix="/applications", tags=["applications"])
app.include_router(essays.router, prefix="/essays", tags=["essays"])

@app.on_event("startup")
async def startup():
    # create tables (for dev)
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

app.include_router(auth.router, prefix="/auth")  # <- this is key

