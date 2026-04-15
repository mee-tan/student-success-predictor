from flask import Flask, request, jsonify
import numpy as np
import tensorflow as tf
import joblib

app = Flask(__name__)

# -----------------------
# Load BOTH models
# -----------------------
academic_model = tf.keras.models.load_model("output/academic_model.h5")
persistence_model = tf.keras.models.load_model("output/persistence_model.h5")

academic_scaler = joblib.load("output/scalar_academic.pkl")
persistence_scaler = joblib.load("output/scalar_persistence.pkl")

# -----------------------
# Prediction route
# -----------------------
@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    hs = data["hs_score"]
    gpa1 = data["first_term_gpa"]

    # -----------------------
    # Academic prediction
    # -----------------------
    X_academic = np.array([[hs, gpa1]])
    X_academic = academic_scaler.transform(X_academic)

    academic_pred = academic_model.predict(X_academic)[0][0]

    # -----------------------
    # Persistence prediction
    # -----------------------
    X_persist = np.array([[hs, gpa1]])
    X_persist = persistence_scaler.transform(X_persist)

    persistence_pred = persistence_model.predict(X_persist)[0][0]

    # If classification (0/1), convert to label
    persistence_label = "Likely to Persist" if persistence_pred > 0.5 else "At Risk"

    return jsonify({
        "predicted_gpa": float(academic_pred),
        "persistence_score": float(persistence_pred),
        "persistence_label": persistence_label
    })


# -----------------------
# Run server
# -----------------------
if __name__ == "__main__":
    app.run(port=5001, debug=True)