from flask import Flask, render_template, request, redirect, session, jsonify
import random

from lobby import Lobby
import wordsets

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/game')
def game():
    lobby = request.args.get('lobby')
    name = request.args.get('name')
    if not lobby:
        return redirect('/')
    if not name:
        return redirect('/')
    lobby = int(lobby)

    return render_template('game.html', lobby=lobby, name=name)

@app.route('/admin')
def admin():
    lobby = request.args.get('lobby')
    if not lobby:
        return jsonify({'error': 'No lobby id'}), 400
    lobby = int(lobby)
    return render_template('admin.html', lobby=lobby)

@app.get('/status')
def status():
    lobby = request.args.get('lobby')
    name = request.args.get('name')
    if not lobby:
        return jsonify({'error': 'No lobby id'}), 400
    if not name:
        return jsonify({'error': 'No player name'}), 400
    lobby = int(lobby)
    return jsonify(Lobby.get_status(lobby, name))

@app.post('/start')
def start():
    lobby = request.args.get('lobby')
    if not lobby:
        return jsonify({'error': 'No lobby id'}), 400
    lobby = int(lobby)
    
    if Lobby.start(lobby):
        return jsonify(), 200
    else:
        return jsonify({'error': 'Minimum 3 players'}), 400

@app.post('/reset')
def reset():
    lobby = request.args.get('lobby')
    if not lobby:
        return jsonify({'error': 'No lobby id'}), 400
    lobby = int(lobby)
    
    return Lobby.reset(lobby)

@app.post('/set_category')
def set_category():
    lobby = request.args.get('lobby')
    category = request.args.get('category')
    set_to = request.args.get('set_to')
    if not lobby:
        return jsonify({'error': 'No lobby id'}), 400
    lobby = int(lobby)
    if not category:
        return jsonify({'error': 'No category'}), 400
    if not set_to:
        return jsonify({'error': 'No set_to'}), 400
    set_to = str(set_to).lower() == "true"

    Lobby.set_category(lobby, category, set_to)

    return jsonify(), 200 

@app.post('/get_categories')
def get_categories():
    lobby = request.args.get('lobby')
    if not lobby:
        return jsonify({'error': 'No lobby id'}), 400
    lobby = int(lobby)

    return jsonify({
        'active': Lobby.get_categories(lobby),
        'all': list(wordsets.WORD_SETS.keys())
        }), 200 

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5001, debug=False)
