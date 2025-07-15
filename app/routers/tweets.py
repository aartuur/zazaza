from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from openai import OpenAI
import os
import logging
from dotenv import load_dotenv

# Carica le variabili d'ambiente da .env
load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    logger.warning("⚠️ Variabile OPENAI_API_KEY non trovata. Impostala nell'ambiente!")

client = OpenAI(api_key=api_key)

router = APIRouter()

class TweetRequest(BaseModel):
    topic: str
    count: int = 5
    keywords: list[str] = []

class TweetItem(BaseModel):
    tweet: str

class TweetListResponse(BaseModel):
    tweets: list[TweetItem]

@router.post("/", response_model=TweetListResponse)
async def generate_tweets(data: TweetRequest):
    logger.info(f"📩 Topic ricevuto: {data.topic}")
    logger.info(f"📩 Numero tweet: {data.count}")
    logger.info(f"📩 Keywords: {data.keywords}")

    keywords_text = ", ".join(data.keywords) if data.keywords else "nessuna keyword specifica"
    prompt = (
        f"Genera {data.count} tweet in inglese, virali, ironici e brevi (max 280 caratteri) sull'argomento '{data.topic}', "
        f"relativo al mondo delle meme coins. Ogni tweet deve includere almeno 1-2 hashtag virali pertinenti "
        f"che riflettano le keywords: {keywords_text}. "
        f"Il tono deve essere giovane, fresco, accattivante e con tecniche di marketing persuasive. "
        f"Usa le keywords in modo naturale per aumentare la probabilità di viralità almeno al 90%. "
        f"Restituisci SOLO l'elenco dei tweet numerati da 1 a {data.count}, senza testo aggiuntivo."
        f"Utilizza anche emoji simpatiche e divertenti "
    )

    try:
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {
                    "role": "system",
                    "content": "Sei un copywriter esperto di memecoin marketing e tendenze social crypto. Usa sempre hashtag pertinenti e virali."
                },
                {"role": "user", "content": prompt}
            ],
            temperature=0.9,
            max_tokens=800
        )

        raw_text = response.choices[0].message.content.strip()
        logger.debug(f"📝 Output grezzo:\n{raw_text}")

        tweets = []
        for line in raw_text.split("\n"):
            if line.strip() and any(c.isdigit() for c in line[:3]):
                tweet_text = line.split(".", 1)[-1].strip()
                tweets.append(TweetItem(tweet=tweet_text))

        if not tweets:
            raise ValueError("Nessun tweet estratto dalla risposta")

        logger.info(f"✅ {len(tweets)} tweet generati")
        return TweetListResponse(tweets=tweets)

    except Exception as e:
        logger.exception("❌ Errore durante la generazione dei tweet")
        raise HTTPException(status_code=500, detail=str(e))
