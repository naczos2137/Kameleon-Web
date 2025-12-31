const playerList = document.getElementById('playerList');
const wordInfo = document.getElementById('wordInfo');
const gameDiv = document.getElementById('game');
const lobbyDiv = document.getElementById('lobby');

const params = new URLSearchParams(window.location.search);
const name = params.get('name');

async function update() {
    try {
        const res = await fetch(`/status?name=${encodeURIComponent(name)}`);
        const data = await res.json();

        // Aktualizacja listy graczy
        playerList.innerHTML = '';
        data.players.forEach(player => {
            const li = document.createElement('li');
            li.textContent = player;
            playerList.appendChild(li);
        });

        // Przełączanie widoków lobby/gra
        if (data.started) {
            lobbyDiv.classList.add('hidden');
            gameDiv.classList.remove('hidden');
            if (data.is_chameleon) {
                wordInfo.textContent = "Jesteś KAMELEONEM! Udawaj, że znasz hasło!";
            } else {
                wordInfo.textContent = "Hasło: " + data.word;
            }
        } else {
            lobbyDiv.classList.remove('hidden');
            gameDiv.classList.add('hidden');
            wordInfo.textContent = '';
        }

    } catch (e) {
        console.error("Błąd połączenia z serwerem", e);
    }
}

setInterval(update, 3000);
update();
