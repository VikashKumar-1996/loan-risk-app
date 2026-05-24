import joblib
import pandas as pd
from pathlib import Path

MODEL_PATH = Path(__file__).resolve().parent.parent / "model" / "loan_model_pipeline.pkl"

model = joblib.load(MODEL_PATH)

def predict_input(data):

    try:

        df = pd.DataFrame([data])

        print(df)

        prediction = model.predict(df)[0]

        probability = model.predict_proba(df)[0][1]

        return {
            "prediction": int(prediction),
            "probability": float(probability)
        }

    except Exception as e:

        print("ERROR:", str(e))

        return {
            "error": str(e)
        }