from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from openai import OpenAI
import os
import logging
from dotenv import load_dotenv

# Carica le variabili d'ambiente dal file .env
load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

api_key = os.getenv("OPENAI_API_KEY")  # ora la variabile è caricata da dotenv
client = OpenAI(api_key=api_key)

router = APIRouter()

class MemeRequest(BaseModel):
    topic: str
    keywords: list[str] = []

class MemeImageResponse(BaseModel):
    image_url: str
    prompt_used: str

@router.post("/", response_model=MemeImageResponse)
async def generate_meme_image(data: MemeRequest):
    logger.info(f"📩 Topic: {data.topic}")
    keywords_text = ", ".join(data.keywords) if data.keywords else ""

    # Step 1: genera testo meme con GPT
    gpt_prompt = (
        f"Scrivi un breve testo ironico, virale e divertente da usare come testo di un meme sull'argomento '{data.topic}'. "
        f"Includi se possibile queste parole chiave: {keywords_text}. "
        f"Lo stile deve essere giovane, spiritoso, max 15 parole, facilmente leggibile e adatto ad essere sovrapposto su un'immagine virale."
        f"Fornisci solo la frase senza virgolette o altri simboli."
    )

    try:
        gpt_response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "Sei un creatore di meme esperto in marketing e cultura social."},
                {"role": "user", "content": gpt_prompt}
            ],
            temperature=0.9,
            max_tokens=60
        )
        meme_text = gpt_response.choices[0].message.content.strip()
        logger.info(f"📝 Testo meme generato: {meme_text}")

        # Step 2: prompt ottimizzato per generare immagine con testo
        dalle_prompt = (
            f"Immagine per meme virale su '{data.topic}'. "
            f"Il meme include il testo: '{meme_text}'. "
            f"Incorpora creativamente le parole chiave: {keywords_text}. "
            f"L'immagine deve essere ironica, giovane, colorata e adatta ai social media come Instagram, TikTok e Twitter. "
            f"Testo chiaro, leggibile, senza caratteri strani o simboli non necessari. "
            f"L'immagine deve trasmettere il senso del meme in modo immediato e divertente."
        )

        image_response = client.images.generate(
            model="dall-e-3",
            prompt=dalle_prompt,
            size="1024x1024",
            quality="standard",
            n=1
        )

        image_url = image_response.data[0].url
        logger.info(f"🖼️ Immagine generata: {image_url}")

        return MemeImageResponse(image_url=image_url, prompt_used=dalle_prompt)

    except Exception as e:
        logger.exception("❌ Errore durante la generazione dell'immagine meme")
        raise HTTPException(status_code=500, detail=str(e))
