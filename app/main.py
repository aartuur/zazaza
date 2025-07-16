from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import tweets
from .routers import meme

app = FastAPI(title="Tweet Generator API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://zazazasahur-gamma.vercel.app","http://localhost:5173"],  #per ora accesso totale, dopo blocca
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tweets.router, prefix="/tweets", tags=["tweets"])
app.include_router(meme.router, prefix="/meme-generator", tags=["meme"])