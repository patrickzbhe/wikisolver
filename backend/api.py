from flask import Flask
from flask import request
from scoring import search
from scraper import *
from flask_cors import CORS
app = Flask(__name__)
CORS(app)


@app.route('/find', methods=['GET'])
def calculate_path():
    w1 = request.args.get('w1')
    w2 = request.args.get('w2')
    breadth = request.args.get('breadth')
    return {'payload': search(w1, w2, int(breadth))}
