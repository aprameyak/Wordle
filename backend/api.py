from fastapi import FastAPI
import openai
from dotenv import load_dotenv
import os
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)

@app.get("/random_word")
def get_random_word():
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are an assistant that only generates random 5-letter English words using only alphabet characters. And your response should only be a 5 character word."},
                {"role": "user", "content": "Generate a random 5-letter English word."}
            ]
        )
        word = response['choices'][0]['message']['content'].strip()
        return {"word": word}
    except Exception as e:
        return {"error": str(e)}
