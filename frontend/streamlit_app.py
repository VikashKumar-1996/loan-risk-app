import streamlit as st
import requests

st.title("Loan Default Risk Prediction")

API_URL = "http://127.0.0.1:10000/predict"  

st.subheader("Enter Applicant Details")

age = st.number_input("Age", 18, 100, 30)
gender = st.selectbox("Gender", ["Male", "Female"])
education_level = st.selectbox("Education Level", ["High School", "Bachelor", "Master", "PhD"])
credit_score = st.number_input("Credit Score", 300.0, 900.0, 650.0)
annual_income = st.number_input("Annual Income", 0.0, 1e8, 500000.0)
loan_amount = st.number_input("Loan Amount", 0.0, 1e8, 200000.0)
loan_term = st.number_input("Loan Term (months)", 1, 360, 36)
employment_status = st.selectbox("Employment Status", ["Employed", "Self-Employed", "Unemployed"])
marital_status = st.selectbox("Marital Status", ["Single", "Married", "Divorced"])
loan_purpose = st.selectbox("Loan Purpose", [
    "debt_consolidation", "credit_card", "home_improvement",
    "major_purchase", "small_business", "car", "wedding", "medical", "other"
])

interest_rate = st.number_input("Interest Rate (%)", 0.0, 60.0, 12.0)

grade_subgrade = st.selectbox("Grade/Subgrade", [
    "A1","A2","A3","A4","A5",
    "B1","B2","B3","B4","B5",
    "C1","C2","C3","C4","C5",
    "D1","D2","D3","D4","D5",
    "E1","E2","E3","E4","E5",
    "F1","F2","F3","F4","F5",
    "G1","G2","G3","G4","G5"
])

debt_to_income_ratio = st.number_input("Debt to Income Ratio", 0.0, 200.0, 20.0)

if st.button("Predict Risk"):
    payload = {
    "age": age,
    "gender": gender,
    "education_level": education_level,
    "credit_score": credit_score,
    "annual_income": annual_income,
    "loan_amount": loan_amount,
    "loan_term": loan_term,
    "employment_status": employment_status,
    "marital_status": marital_status,

    "loan_purpose": loan_purpose,
    "interest_rate": interest_rate,
    "grade_subgrade": grade_subgrade,
    "debt_to_income_ratio": debt_to_income_ratio
}


    res = requests.post(API_URL, json=payload)

    if res.status_code == 200:
        out = res.json()
        st.success(f"Default Probability: {out['default_probability']}")
        st.info(f"Risk Label: {out['risk_label']}")
        st.warning(f"Decision: {out['decision']}")
    else:
        st.error("API error. Check backend URL.")
import pandas as pd
import os

log_path = "../backend/pred_logs.csv"

if os.path.exists(log_path):
    st.subheader(" Recent Predictions (Logs)")
    logs = pd.read_csv(log_path)
    st.dataframe(logs.tail(10))
    
if st.button("🗑️ Clear Logs"):
    if os.path.exists(log_path):
        os.remove(log_path)
        st.success("Logs cleared ")
