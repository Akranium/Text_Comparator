from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.responses import FileResponse
from pathlib import Path
from fastapi.staticfiles import StaticFiles

from compare import compare_texts

BASE_DIR = Path(__file__).resolve().parent

app = FastAPI(title="TextComparator")
app.mount("/static", StaticFiles(directory=BASE_DIR / "static"), name="static")

@app.get("/")
def home():
    return FileResponse(BASE_DIR / "static" / "index.html")

class CompareRequest(BaseModel):
    original: str
    modified: str
    ignore_extra_spaces: bool = True

@app.post("/api/compare")
def compare(request: CompareRequest):
    return compare_texts(
        request.original,
        request.modified,
        request.ignore_extra_spaces
    )
