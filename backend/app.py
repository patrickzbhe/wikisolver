from flask import Flask
from flask import request
from scoring import search
from scraper import *
from flask_socketio import SocketIO, send, emit
from flask_cors import CORS, cross_origin
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins='*')

CORS(app)


@ app.route('/', methods=['GET'])
@ cross_origin(supports_credentials=True)
def main():
    return "Server running"


@socketio.on('connect')
def on_connect():
    send('connected')


@socketio.on('get')
def handle_message(json):
    w1 = json['w1']
    w2 = json['w2']
    breadth = json['breadth']
    emit('data', {'payload': list(search(w1, w2, int(breadth)))})


if __name__ == "__main__":
    # no way I had to spend 10 hours switching to socketio
    socketio.run(app)
