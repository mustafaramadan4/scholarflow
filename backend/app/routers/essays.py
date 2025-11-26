from fastapi import APIRouter
from ..schemas import EssayRequest, EssayResponse
from ..core_config import settings
import openai

router = APIRouter()

@router.post("/generate", response_model=EssayResponse)
async def generate_essay(payload: EssayRequest):
    # Uncomment to use real AI
    # if settings.OPENAI_API_KEY:
    #     client = openai.AsyncOpenAI(api_key=settings.OPENAI_API_KEY)
    #     try:
    #         response = await client.chat.completions.create(
    #             model="gpt-4",
    #             messages=[
    #                 {"role": "system", "content": f"Tone: {payload.tone or 'professional'}."},
    #                 {"role": "user", "content": f"Write a {payload.length_target or 500} word essay. Prompt: {payload.prompt}"}
    #             ]
    #         )
    #         return {"essay_id": "gpt-generated", "text": response.choices[0].message.content}
    #     except Exception as e:
    #         print(f"OpenAI Error: {e}")

    text = f"[STUB] Generated draft for: {payload.prompt}\n\n(Set OPENAI_API_KEY in backend/.env for real AI)"
    return {"essay_id": "stub-essay-id", "text": text}
