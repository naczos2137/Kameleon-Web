const nicknameInput = document.getElementById("nickname");
const lobbyInput = document.getElementById("lobby");
const errorDiv = document.getElementById("error");

const joinBtn = document.getElementById("joinBtn");
const createBtn = document.getElementById("createBtn");

function showError(message) {
    errorDiv.textContent = message;
}

function clearError() {
    errorDiv.textContent = "";
}

function validateNickname() {
    return nicknameInput.value.trim().length >= 1;
}

function validateLobby() {
    return /^\d{6}$/.test(lobbyInput.value.trim());
}

joinBtn.addEventListener("click", () => {
    clearError();

    const name = nicknameInput.value.trim();
    const lobby = lobbyInput.value.trim();

    if (!validateNickname()) {
        return showError("Podaj nick.");
    }

    if (!validateLobby()) {
        return showError("Lobby musi mieć dokładnie 6 cyfr.");
    }

    window.location.href =
        `/game?name=${encodeURIComponent(name)}&lobby=${lobby}`;
});

createBtn.addEventListener("click", () => {
    clearError();

    const name = nicknameInput.value.trim();

    if (!validateNickname()) {
        return showError("Podaj nick.");
    }

    const lobby = Math.floor(Math.random() * 1000000)
        .toString()
        .padStart(6, "0");

    window.location.href =
        `/game?name=${encodeURIComponent(name)}&lobby=${lobby}`;
});

lobbyInput.addEventListener("input", () => {
    lobbyInput.value = lobbyInput.value.replace(/\D/g, "");
});