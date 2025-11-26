
from fastapi import APIRouter, Depends
from ..schemas import EssayRequest, EssayResponse
from typing import Dict
router = APIRouter()

@router.post("/generate", response_model=EssayResponse)
async def generate_essay(payload: EssayRequest):
    # Stub: replace with call to an LLM provider
    text = f"Generated draft for prompt: {payload.prompt}\n\n(Length target: {payload.length_target})"
    return {"essay_id": "stub-essay-id", "text": text}
