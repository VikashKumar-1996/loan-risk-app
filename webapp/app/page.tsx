"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import {
  DollarSign,
  ShieldAlert,
  TrendingUp
} from "lucide-react";

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
  const [darkMode, setDarkMode] = useState(false);
 const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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
  const chartData = result?.feature_importance
  ? Object.entries(result.feature_importance).map(
      ([key, value]) => ({
        feature: key,
        importance: Number(value)
      })
    )
  : [];

  return (

  <main
  className={`min-h-screen flex items-center justify-center p-6 transition-all duration-500 ${
    darkMode
      ? "bg-gradient-to-br from-gray-900 to-black"
      : "bg-gradient-to-br from-gray-100 to-gray-300"
  }`}
>

  <div
  className={`backdrop-blur-lg p-10 rounded-3xl shadow-2xl w-full max-w-5xl border transition-all duration-500 ${
    darkMode
      ? "bg-black/40 text-white border-gray-700"
      : "bg-white/80 text-black border-white/40"
  }`}
>

    <div className="mb-10">

      <div className="flex items-center gap-3 justify-center">

        <ShieldAlert size={40} />

        <h1 className="text-5xl font-extrabold">
          Loan Risk Predictor
        </h1>

      </div>

      <p className="text-gray-500 text-center mt-4 text-lg">
        AI-powered loan approval risk analysis platform
      </p>
      <div className="flex justify-center mt-6">

  <button
    onClick={() => setDarkMode(!darkMode)}
    className="px-5 py-2 rounded-xl border font-semibold hover:scale-105 transition-all"
  >

    {darkMode ? "Light Mode" : "Dark Mode"}

  </button>

</div>
    </div>

    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">

      <DollarSign />

      Applicant Information

    </h2>

   <div className="grid md:grid-cols-2 grid-cols-1 gap-6 mt-8">  



  <input
    name="interest_rate"
    placeholder="Interest Rate"
    value={formData.interest_rate}
    onChange={handleChange}
    className={`border p-3 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 hover:shadow-md ${
  darkMode
    ? "bg-gray-900 border-gray-700 text-white focus:ring-white"
    : "bg-white border-gray-300 text-black focus:ring-black"
}`}
  />

  <input
    name="debt_to_income_ratio"
    placeholder="Debt to Income Ratio"
    value={formData.debt_to_income_ratio}
    onChange={handleChange}
    className={`border p-3 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 hover:shadow-md ${
  darkMode
    ? "bg-gray-900 border-gray-700 text-white focus:ring-white"
    : "bg-white border-gray-300 text-black focus:ring-black"
}`}
  />

  <input
    name="annual_income"
    placeholder="Annual Income"
    value={formData.annual_income}
    onChange={handleChange}
    className={`border p-3 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 hover:shadow-md ${
  darkMode
    ? "bg-gray-900 border-gray-700 text-white focus:ring-white"
    : "bg-white border-gray-300 text-black focus:ring-black"
}`}
  />

  <input
    name="credit_score"
    placeholder="Credit Score"
    value={formData.credit_score}
    onChange={handleChange}
    className={`border p-3 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 hover:shadow-md ${
  darkMode
    ? "bg-gray-900 border-gray-700 text-white focus:ring-white"
    : "bg-white border-gray-300 text-black focus:ring-black"
}`}
  />

  <input
    name="loan_amount"
    placeholder="Loan Amount"
    value={formData.loan_amount}
    onChange={handleChange}
    className={`border p-3 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 hover:shadow-md ${
  darkMode
    ? "bg-gray-900 border-gray-700 text-white focus:ring-white"
    : "bg-white border-gray-300 text-black focus:ring-black"
}`}
  />

  <select
    name="gender"
    value={formData.gender}
    onChange={handleChange}
    className={`border p-3 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 hover:shadow-md ${
  darkMode
    ? "bg-gray-900 border-gray-700 text-white focus:ring-white"
    : "bg-white border-gray-300 text-black focus:ring-black"
}`}
  >
    <option value="">Select Gender</option>
    <option value="Male">Male</option>
    <option value="Female">Female</option>
  </select>

  <select
    name="employment_status"
    value={formData.employment_status}
    onChange={handleChange}
    className={`border p-3 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 hover:shadow-md ${
  darkMode
    ? "bg-gray-900 border-gray-700 text-white focus:ring-white"
    : "bg-white border-gray-300 text-black focus:ring-black"
}`}
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
    className={`border p-3 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 hover:shadow-md ${
  darkMode
    ? "bg-gray-900 border-gray-700 text-white focus:ring-white"
    : "bg-white border-gray-300 text-black focus:ring-black"
}`}
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
    className={`border p-3 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 hover:shadow-md ${
  darkMode
    ? "bg-gray-900 border-gray-700 text-white focus:ring-white"
    : "bg-white border-gray-300 text-black focus:ring-black"
}`}
  >
    <option value="">Marital Status</option>
    <option value="Single">Single</option>
    <option value="Married">Married</option>
  </select>

  <select
    name="loan_purpose"
    value={formData.loan_purpose}
    onChange={handleChange}
    className={`border p-3 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 hover:shadow-md ${
  darkMode
    ? "bg-gray-900 border-gray-700 text-white focus:ring-white"
    : "bg-white border-gray-300 text-black focus:ring-black"
}`}
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
    className={`border p-3 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 hover:shadow-md ${
  darkMode
    ? "bg-gray-900 border-gray-700 text-white focus:ring-white"
    : "bg-white border-gray-300 text-black focus:ring-black"
}`}
  />

</div>

      <button
  onClick={handleSubmit}
  className="mt-8 w-full bg-black text-white py-4 rounded-2xl text-lg font-semibold hover:scale-[1.02] hover:opacity-90 transition-all duration-300 shadow-lg"
>
  {loading ? "Predicting..." : "Predict"}
</button>

      {result && (

  <div className="grid md:grid-cols-3 gap-4 mb-6">

  <div
  className={`rounded-2xl p-6 shadow-lg border transition-all duration-500 ${
    result.prediction === 1
      ? "bg-red-100 border-red-300 text-black"
      : "bg-green-100 border-green-300 text-black"
  }`}
>

    <p className="text-gray-500 text-sm">
      Risk Score
    </p>

    <h3 className="text-3xl font-bold mt-2">
      {(result.probability * 100).toFixed(1)}%
    </h3>

  </div>

  <div
  className={`rounded-2xl p-6 shadow-lg border transition-all duration-500 ${
    result.prediction === 1
      ? "bg-red-200 border-red-400 text-black"
      : "bg-green-200 border-green-400 text-black"
  }`}
>

    <p className="text-gray-500 text-sm">
      Decision
    </p>

    <h3 className="text-2xl font-bold mt-2">

      {result.prediction === 1
        ? "High Risk"
        : "Low Risk"}

    </h3>

  </div>

  <div
  className={`rounded-2xl p-6 shadow-lg border ${
    darkMode
      ? "bg-gray-900 border-gray-700 text-white"
      : "bg-white border-gray-200 text-black"
  }`}
>

    <p className="text-gray-500 text-sm">
      Model Confidence
    </p>

    <h3 className="text-4xl font-bold mt-2">

      {(Math.abs(result.probability - 0.5) * 200).toFixed(1)}%

    </h3>

  </div>

</div>
)}
{chartData.length > 0 && (
<div
  className={`mt-10 p-8 rounded-2xl shadow-xl border transition-all duration-500 ${
    darkMode
      ? "bg-gray-900 border-gray-700 text-white"
      : "bg-white border-gray-200 text-black"
  }`}
>

    <h2 className="text-2xl font-bold mb-6">
      Top Risk Factors
    </h2>

    <div className="h-[400px]">

      <ResponsiveContainer width="100%" height="100%">

        <BarChart data={chartData} layout="vertical">

          <XAxis type="number" />

          <YAxis
            type="category"
            dataKey="feature"
            width={200}
          />

          <Tooltip />

          <Bar
              dataKey="importance"
              radius={[0, 10, 10, 0]}
            />

        </BarChart>

      </ResponsiveContainer>

    </div>

  </div>
)}

      

  </div>

    </main>
  );
}