import logging
import json
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import Response

from app.db import engine, Base
from app.routers import auth, profiles, scholarships, applications, essays
from app.seed import seed_db

# -------------------------
# Logging setup
# -------------------------
logging.basicConfig(
    level=logging.DEBUG,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger("app")

# -------------------------
# FastAPI app setup
# -------------------------
app = FastAPI(title="ScholarFlow API")

origins = ["http://localhost:3000", "http://127.0.0.1:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------
# Request logging middleware
# -------------------------
@app.middleware("http")
async def log_requests(request: Request, call_next):
    try:
        body_bytes = await request.body()
        if body_bytes:
            try:
                body_json = json.loads(body_bytes.decode("utf-8"))
            except json.JSONDecodeError:
                body_json = body_bytes.decode("utf-8")
            logger.debug("Incoming request to %s %s: %s", request.method, request.url.path, body_json)
            
            # Reset the body so downstream endpoints can read it
            async def receive():
                return {"type": "http.request", "body": body_bytes}
            request._receive = receive
        else:
            logger.debug("Incoming request to %s %s: (no body)", request.method, request.url.path)
    except Exception as e:
        logger.error("Failed to log request body: %s", e)

    response = await call_next(request)
    return response

# -------------------------
# Startup event
# -------------------------
@app.on_event("startup")
async def on_startup():
    logger.debug("Starting up: creating tables and seeding DB")
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    await seed_db()
    logger.debug("Startup complete")

# -------------------------
# Include routers
# -------------------------
app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(profiles.router, prefix="/profiles", tags=["profiles"])
app.include_router(scholarships.router, prefix="/scholarships", tags=["scholarships"])
app.include_router(applications.router, prefix="/applications", tags=["applications"])
app.include_router(essays.router, prefix="/essays", tags=["essays"])