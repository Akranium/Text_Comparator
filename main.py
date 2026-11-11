from fastapi import FastAPI

app = FastAPI(title="TextComparator")

@app.get("/")
def home():
    return {"message": "Welcome to TextComparator!"}
