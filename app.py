from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow all origins for development

@app.route('/')
def home():
    return "Traffic Prediction API is running!"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get JSON data from request
        data = request.get_json()
        
        time = data.get('time', '').strip()
        day_of_week = data.get('dayOfWeek', '').strip().lower()
        car_count = int(data.get('carCount', 0))
        bike_count = int(data.get('bikeCount', 0))
        bus_count = int(data.get('busCount', 0))
        truck_count = int(data.get('truckCount', 0))

        # Calculate traffic score using weights
        traffic_score = (
            car_count * 1 +
            bike_count * 0.5 +
            bus_count * 2 +
            truck_count * 2.5
        )

        # Determine traffic level
        if traffic_score >= 100:
            prediction = "High"
        elif traffic_score >= 50:
            prediction = "Moderate"
        else:
            prediction = "Low"

        reason = f"Calculated from vehicle counts at {time} on {day_of_week.title()} (score: {traffic_score:.1f})"

        return jsonify({"prediction": prediction, "reason": reason})

    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True)
