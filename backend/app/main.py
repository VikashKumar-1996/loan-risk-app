from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.predict import predict_input
from app.schemas import LoanRequest

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Loan Prediction API Running"}

@app.post("/predict")
def predict(data: LoanRequest):

    return predict_input(data.dict())