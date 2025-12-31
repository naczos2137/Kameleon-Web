from flask import Flask, render_template, request, redirect, session, jsonify
import random

CHAMELEON_AMOUNT = 1

app = Flask(__name__)
app.secret_key = 'tajny_klucz'

# Globalne zmienne (dla jednej gry)
players = []
chameleon = []
last_chameleon = []
with open('hasla.txt', 'r', encoding='utf-8') as f:
    hasla = f.read().splitlines()
current_word = random.choice(hasla)
game_started = False

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/game')
def game():
    name = request.args.get('name')
    if not name:
        return redirect('/')

    if name not in players:
        players.append(name)

    return render_template('game.html', name=name)

@app.route('/admin')
def admin():
    return render_template('admin.html')

@app.route('/status')
def status():
    name = request.args.get('name')
    if not name:
        return jsonify({'error': 'Brak nazwy gracza'}), 400
    if name not in players:
        players.append(name)

    is_chameleon = (name in chameleon)
    return jsonify({
        'players': players,
        'started': game_started,
        'is_chameleon': is_chameleon,
        'word': None if is_chameleon else current_word
    })

@app.route('/start')
def start():
    global chameleon, game_started, last_chameleon
    print(last_chameleon)
    if len(players) < CHAMELEON_AMOUNT + 2:
        return f"Potrzeba co najmniej {CHAMELEON_AMOUNT + 2} graczy", 400
    if not game_started:
        if random.random() < 0.01:
            chameleon = list(players)
            chameleon = [x for x in chameleon if x not in last_chameleon]
        while len(set(chameleon)) < CHAMELEON_AMOUNT:
            new_chameleon = random.choice(players)
            if new_chameleon in last_chameleon:
                continue
            chameleon.append(new_chameleon)
        last_chameleon = list(chameleon)
        game_started = True
    return f"Gracze {players}"

@app.route('/reset')
def reset():
    global players, chameleon, current_word, game_started, last_chameleon
    players = []
    chameleon = []
    current_word = random.choice(hasla)
    game_started = False
    return f"Zresetowano {last_chameleon}"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
