from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class ContactForm(BaseModel):
    name: str
    email: str
    message: str


@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.post("/api/contact")
def contact(form: ContactForm):
    # TODO: wire up email sending or storage
    return {"success": True, "message": "Message received"}
