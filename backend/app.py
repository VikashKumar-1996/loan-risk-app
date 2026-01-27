from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import joblib

import csv
import os
from datetime import datetime

app = FastAPI(title="Loan Payback Prediction API")

model = joblib.load("loan_model_pipeline.pkl")

FEATURES = [
    "age",
    "gender",
    "education_level",
    "credit_score",
    "annual_income",
    "loan_amount",
    "loan_term",
    "employment_status",
    "marital_status",
    "loan_purpose",
    "interest_rate",
    "grade_subgrade",
    "debt_to_income_ratio"
]

class LoanInput(BaseModel):
    age: int
    gender: str
    education_level: str
    credit_score: float
    annual_income: float
    loan_amount: float
    loan_term: int
    employment_status: str
    marital_status: str
    loan_purpose: str
    interest_rate: float
    grade_subgrade: str
    debt_to_income_ratio: float

def decision_from_prob(p: float):
    if p < 0.35:
        return "APPROVE"
    elif p < 0.65:
        return "MANUAL_REVIEW"
    else:
        return "REJECT"

@app.post("/predict")
def predict(data: LoanInput):
    df = pd.DataFrame([data.model_dump()], columns=FEATURES)

    prob = float(model.predict_proba(df)[:, 1][0])
    decision = decision_from_prob(prob)

    log_file = "pred_logs.csv"

    write_header = (not os.path.exists(log_file)) or (os.path.getsize(log_file) == 0)

    if write_header:
        with open(log_file, "w", newline="") as f:
            writer = csv.writer(f)
            writer.writerow(["time", "probability", "decision"] + FEATURES)

    with open(log_file, "a", newline="") as f:
        writer = csv.writer(f)
        writer.writerow([datetime.now(), prob, decision] + list(df.iloc[0].values))


    return {
        "default_probability": round(prob, 4),
        "risk_label": "HIGH_RISK" if prob >= 0.65 else "MEDIUM_RISK" if prob >= 0.35 else "LOW_RISK",
        "decision": decision
    }

@app.get("/health")
def health():
    return {"status": "healthy"}
