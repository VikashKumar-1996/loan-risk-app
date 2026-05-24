from pydantic import BaseModel

class LoanRequest(BaseModel):

    interest_rate: float
    employment_status: str
    debt_to_income_ratio: float
    annual_income: float
    credit_score: int
    loan_purpose: str
    loan_amount: float
    education_level: str
    marital_status: str
    grade_subgrade: str
    gender: str