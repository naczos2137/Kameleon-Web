const lobbyScreen = document.getElementById("lobbyScreen");
const gameScreen = document.getElementById("gameScreen");

const playerList = document.getElementById("playerList");
const gameContent = document.getElementById("gameContent");

const copyLobbyBtn = document.getElementById("copyLobbyBtn");

copyLobbyBtn.addEventListener("click", async () => {
    try {
        await navigator.clipboard.writeText(LOBBY_ID);

        copyLobbyBtn.textContent = "Skopiowano";

        setTimeout(() => {
            copyLobbyBtn.textContent = "Kopiuj";
        }, 1500);

    } catch (e) {
        console.error(e);
    }
});

async function loadStatus() {

    try {

        const response = await fetch(
            `/status?lobby=${LOBBY_ID}&name=${encodeURIComponent(PLAYER_NAME)}`
        );

        if (!response.ok) {
            return;
        }

        const data = await response.json();

        if (data.started) {
            renderGame(data);
        } else {
            renderLobby(data);
        }

    } catch (err) {
        console.error(err);
    }
}

function renderLobby(data) {

    lobbyScreen.classList.remove("hidden");
    gameScreen.classList.add("hidden");

    playerList.innerHTML = "";

    data.players.forEach(player => {

        const li = document.createElement("li");

        li.textContent = player;

        playerList.appendChild(li);
    });
}

function renderGame(data) {

    lobbyScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");

    if (data.is_chameleon) {

        gameContent.innerHTML = `
            <div class="chameleon-box">
                <div class="chameleon-title">
                    🦎 Jesteś Kameleonem!
                </div>

                <div class="chameleon-text">
                    Nie znasz hasła.<br>
                    Spróbuj odgadnąć je na podstawie podpowiedzi innych graczy.
                </div>
            </div>
        `;

    } else {

        gameContent.innerHTML = `
            <div class="word-box">
                <div>Twoje hasło:</div>

                <div class="word">
                    ${data.word}
                </div>
            </div>
        `;
    }
}

loadStatus();

setInterval(loadStatus, 3000);