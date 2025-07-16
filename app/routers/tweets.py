from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from openai import OpenAI
import os
import logging
from dotenv import load_dotenv
import traceback

# Carica le variabili d'ambiente da .env
load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    logger.warning("⚠️ Variabile OPENAI_API_KEY non trovata. Impostala nell'ambiente!")
else:
    logger.info(f"🔐 OPENAI_API_KEY caricata correttamente: {api_key[:5]}***{api_key[-3:]}")

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
    logger.info(f"📩 Numero tweet richiesti: {data.count}")
    logger.info(f"📩 Keywords: {data.keywords}")

    keywords_text = ", ".join(data.keywords) if data.keywords else "nessuna keyword specifica"
    prompt = (
        f"Genera {data.count} tweet in inglese, virali, ironici e brevi (max 280 caratteri) sull'argomento '{data.topic}', "
        f"relativo al mondo delle meme coins. Ogni tweet deve includere almeno 1-2 hashtag virali pertinenti "
        f"che riflettano le keywords: {keywords_text}. "
        f"Il tono deve essere giovane, fresco, accattivante e con tecniche di marketing persuasive. "
        f"Usa le keywords in modo naturale per aumentare la probabilità di viralità almeno al 90%. "
        f"Restituisci SOLO l'elenco dei tweet numerati da 1 a {data.count}, senza testo aggiuntivo. "
        f"Utilizza anche emoji simpatiche e divertenti."
    )

    logger.debug(f"📜 Prompt generato:\n{prompt}")
    logger.info("🚀 Inizio chiamata API OpenAI GPT-4...")

    try:
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "Sei un copywriter esperto di memecoin marketing e tendenze social crypto. Usa sempre hashtag pertinenti e virali.Tono ironico,divertente ma professionale e determinato"},
                {"role": "user", "content": prompt}
            ],
            temperature=0.9,
            max_tokens=700
        )

        logger.info("✅ Risposta ricevuta da OpenAI")
        raw_text = response.choices[0].message.content.strip()
        logger.debug(f"📝 Output grezzo:\n{raw_text}")

        tweets = []
        for line in raw_text.split("\n"):
            if line.strip() and any(c.isdigit() for c in line[:3]):
                tweet_text = line.split(".", 1)[-1].strip()
                tweets.append(TweetItem(tweet=tweet_text))

        if not tweets:
            raise ValueError("Nessun tweet estratto dalla risposta")

        logger.info(f"✅ {len(tweets)} tweet generati con successo")
        return TweetListResponse(tweets=tweets)

    except Exception as e:
        logger.error("❌ Errore durante la generazione dei tweet")
        logger.error(f"🛑 Dettaglio eccezione: {repr(e)}")
        logger.error(f"🛑 Traceback:\n{traceback.format_exc()}")
        logger.error(f"🛑 Chiave API usata: {api_key[:5]}***{api_key[-3:]}")
        logger.error(f"🛑 Modello richiesto: gpt-4")
        raise HTTPException(status_code=500, detail=str(e))
