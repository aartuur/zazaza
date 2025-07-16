import os
import time
import logging
import requests
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv
from typing import Optional

# Carica le variabili d'ambiente
load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

openai_api_key = os.getenv("OPENAI_API_KEY")

router = APIRouter()

class MemeRequest(BaseModel):
    topic: str
    keywords: list[str] = []
    style: Optional[str] = "viral"  # viral, 3d, cinematic, etc.

class MemeImageResponse(BaseModel):
    image_url: str
    prompt_used: str
    meme_text: str

OPENAI_CHAT_URL = "https://api.openai.com/v1/chat/completions"
OPENAI_IMAGE_URL = "https://api.openai.com/v1/images/generations"

def generate_meme_text(prompt: str, retries: int = 3, delay: int = 2) -> str:
    headers = {
        "Authorization": f"Bearer {openai_api_key}",
        "Content-Type": "application/json"
    }

    data = {
        "model": "gpt-4",
        "messages": [
            {"role": "system", "content": "Sei un creatore di meme esperto in marketing virale. Scrivi testi brevi, ironici e adatti a immagini meme."},
            {"role": "user", "content": prompt}
        ],
        "temperature": 0.9,
        "max_tokens": 60
    }

    for attempt in range(retries):
        try:
            response = requests.post(OPENAI_CHAT_URL, headers=headers, json=data)
            response.raise_for_status()
            return response.json()['choices'][0]['message']['content'].strip()
        except requests.exceptions.HTTPError as e:
            if response.status_code == 429:
                wait_time = delay * (attempt + 1)
                logger.warning(f"Rate limit raggiunto, riprovo tra {wait_time}s...")
                time.sleep(wait_time)
                continue
            logger.error(f"Errore OpenAI: {str(e)}")
            raise HTTPException(status_code=500, detail="Errore generazione testo meme")
        except Exception as e:
            logger.error(f"Errore generico: {str(e)}")
            raise HTTPException(status_code=500, detail="Errore generazione testo meme")

    raise HTTPException(status_code=429, detail="Troppe richieste a OpenAI")

def generate_image_with_dalle(prompt: str, style: str = "viral") -> str:
    headers = {
        "Authorization": f"Bearer {openai_api_key}",
        "Content-Type": "application/json"
    }

    # OpenAI DALL·E supports prompt-based generation
    dalle_prompt = f"{prompt}"

    data = {
        "model": "dall-e-3",
        "prompt": dalle_prompt,
        "n": 1,
        "size": "1024x1024"
    }

    try:
        response = requests.post(OPENAI_IMAGE_URL, headers=headers, json=data)
        response.raise_for_status()
        result = response.json()
        return result['data'][0]['url']
    except Exception as e:
        logger.error(f"Errore generazione immagine con DALL·E: {str(e)}")
        raise HTTPException(status_code=500, detail="Errore generazione immagine")

@router.post("/", response_model=MemeImageResponse)
async def generate_meme(data: MemeRequest):
    try:
        # 1. Genera il testo del meme
        gpt_prompt = (
            f"Crea un testo per meme su '{data.topic}'. "
            f"Parole chiave: {', '.join(data.keywords) if data.keywords else 'nessuna'}. "
            f"Massimo 15 parole, stile giovane e virale."
        )

        meme_text = generate_meme_text(gpt_prompt)
        logger.info(f"📝 Testo generato: {meme_text}")

        # 2. Genera prompt per l'immagine
        dalle_prompt = (
            f"Immagine per meme virale con testo: '{meme_text}'. "
            f"Argomento: {data.topic}. "
            f"Stile: {data.style}. "
            f"Testo chiaro e leggibile, composizione semplice, "
            f"adatta a social media come Instagram e TikTok."
        )

        # 3. Genera immagine con DALL·E
        image_url = generate_image_with_dalle(dalle_prompt, data.style)
        logger.info(f"🖼️ Immagine generata: {image_url}")

        return MemeImageResponse(
            image_url=image_url,
            prompt_used=dalle_prompt,
            meme_text=meme_text
        )

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Errore generico: {str(e)}")
        raise HTTPException(status_code=500, detail="Errore generazione meme")
