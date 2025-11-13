from flask import Flask, jsonify
from flask_cors import CORS     # <--- ADD THIS LINE
import random

app = Flask(__name__)
CORS(app)   # <--- ADD THIS LINE!
counter = 0

@app.route('/metrics')
def metrics():
    global counter
    counter += 1
    return jsonify({
        "cpu_usage": random.uniform(0, 100),
        "latency_ms": random.randint(80, 250),
        "request_count": counter
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
