"use client";

import { useState } from "react";
import axios from "axios";

export default function Home() {

  const [formData, setFormData] = useState({
    interest_rate: "",
    employment_status: "",
    debt_to_income_ratio: "",
    annual_income: "",
    credit_score: "",
    loan_purpose: "",
    loan_amount: "",
    education_level: "",
    marital_status: "",
    grade_subgrade: "",
    gender: ""
  });

  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {

      const response = await axios.post(
  `${process.env.NEXT_PUBLIC_API_URL}/predict`,
        {
          interest_rate: Number(formData.interest_rate),
          employment_status: formData.employment_status,
          debt_to_income_ratio: Number(formData.debt_to_income_ratio),
          annual_income: Number(formData.annual_income),
          credit_score: Number(formData.credit_score),
          loan_purpose: formData.loan_purpose,
          loan_amount: Number(formData.loan_amount),
          education_level: formData.education_level,
          marital_status: formData.marital_status,
          grade_subgrade: formData.grade_subgrade,
          gender: formData.gender
        }
      );

      setResult(response.data);
      setLoading(false);

    } catch (error) {
      setLoading(false);

      console.error(error);
    }
  };

  return (

    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-4xl">


        <h1 className="text-5xl font-extrabold mb-3 text-center">
    Loan Risk Predictor
  </h1>
      <p className="text-gray-500 text-center mb-10">
  AI-powered loan risk prediction system
      </p>
       <div className="grid md:grid-cols-2 grid-cols-1 gap-4"></div>


      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-4xl">
        <input />

  </div>



  <input
    name="interest_rate"
    placeholder="Interest Rate"
    value={formData.interest_rate}
    onChange={handleChange}
    className="border p-3 rounded"
  />

  <input
    name="debt_to_income_ratio"
    placeholder="Debt to Income Ratio"
    value={formData.debt_to_income_ratio}
    onChange={handleChange}
    className="border p-3 rounded"
  />

  <input
    name="annual_income"
    placeholder="Annual Income"
    value={formData.annual_income}
    onChange={handleChange}
    className="border p-3 rounded"
  />

  <input
    name="credit_score"
    placeholder="Credit Score"
    value={formData.credit_score}
    onChange={handleChange}
    className="border p-3 rounded"
  />

  <input
    name="loan_amount"
    placeholder="Loan Amount"
    value={formData.loan_amount}
    onChange={handleChange}
    className="border p-3 rounded"
  />

  <select
    name="gender"
    value={formData.gender}
    onChange={handleChange}
    className="border p-3 rounded"
  >
    <option value="">Select Gender</option>
    <option value="Male">Male</option>
    <option value="Female">Female</option>
  </select>

  <select
    name="employment_status"
    value={formData.employment_status}
    onChange={handleChange}
    className="border p-3 rounded"
  >
    <option value="">Employment Status</option>
    <option value="Employed">Employed</option>
    <option value="Unemployed">Unemployed</option>
    <option value="Self-Employed">Self-Employed</option>
  </select>

  <select
    name="education_level"
    value={formData.education_level}
    onChange={handleChange}
    className="border p-3 rounded"
  >
    <option value="">Education Level</option>
    <option value="High School">High School</option>
    <option value="Bachelor">Bachelor</option>
    <option value="Master">Master</option>
  </select>

  <select
    name="marital_status"
    value={formData.marital_status}
    onChange={handleChange}
    className="border p-3 rounded"
  >
    <option value="">Marital Status</option>
    <option value="Single">Single</option>
    <option value="Married">Married</option>
  </select>

  <select
    name="loan_purpose"
    value={formData.loan_purpose}
    onChange={handleChange}
    className="border p-3 rounded"
  >
    <option value="">Loan Purpose</option>
    <option value="Education">Education</option>
    <option value="Business">Business</option>
    <option value="Personal">Personal</option>
  </select>

  <input
    name="grade_subgrade"
    placeholder="Grade Subgrade"
    value={formData.grade_subgrade}
    onChange={handleChange}
    className="border p-3 rounded"
  />

</div>

      <button
        onClick={handleSubmit}
        className="mt-6 px-6 py-3 border rounded"
      >
        {loading ? "Predicting..." : "Predict"}
      </button>

      {result && (

  <div
    className="mt-8 w-full bg-black text-white py-4 rounded-xl text-lg font-semibold hover:opacity-90 transition"
  >

    <h2 className="text-3xl font-bold mb-4">

      {result.prediction === 1
        ? "High Risk Applicant"
        : "Low Risk Applicant"}

    </h2>

    <p className="text-xl">

      Risk Probability:

      <span className="font-bold ml-2">

        {(result.probability * 100).toFixed(2)}%

      </span>

    </p>

  </div>
)}
      

    </main>
  );
}