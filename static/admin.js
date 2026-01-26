const checkbox = document.getElementById('wordsFromInput');

async function startGame() {
    const res = await fetch('/start', {
        method: 'POST'
    });
    const txt = await res.text();
    document.getElementById('status').textContent = 'Gra rozpoczęta: ' + txt;
}

async function resetGame() {
    const res = await fetch('/reset', {
        method: 'POST'
    });
    const txt = await res.text();
    document.getElementById('status').textContent = 'Zresetowano: ' + txt;
}

checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
        console.log("Włączone");
    } else {
        console.log("Wyłączone");
    }
});
