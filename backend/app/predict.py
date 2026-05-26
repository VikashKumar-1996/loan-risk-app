

import joblib
import pandas as pd

from pathlib import Path

MODEL_PATH = (
    Path(__file__).resolve().parent.parent
    / "model"
    / "loan_model_pipeline.pkl"
)

pipeline = joblib.load(MODEL_PATH)

preprocessor = pipeline.named_steps["preprocess"]

model = pipeline.named_steps["model"]


def predict_input(data):



    try:

        df = pd.DataFrame([data])

        transformed = preprocessor.transform(df)

        prediction = model.predict(transformed)[0]

        probability = model.predict_proba(transformed)[0][1]

        importance_scores = model.feature_importances_

        if hasattr(preprocessor, "get_feature_names_out"):

            feature_names = preprocessor.get_feature_names_out()

        else:

            feature_names = [
                f"feature_{i}"
                for i in range(len(importance_scores))
            ]

        feature_importance = {}

        for name, value in zip(feature_names, importance_scores):

            clean_name = (
                str(name)
                .replace("num__", "")
                .replace("cat__", "")
            )

            feature_importance[clean_name] = float(value)

        sorted_features = dict(

            sorted(
                feature_importance.items(),
                key=lambda x: abs(x[1]),
                reverse=True
            )[:5]

        )

        return {

            "prediction": int(prediction),

            "probability": float(probability),

            "feature_importance": sorted_features

        }

    except Exception as e:

        print("ERROR:", str(e))

        return {

            "error": str(e)

        }