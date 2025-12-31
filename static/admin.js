async function startGame() {
    const res = await fetch('/start');
    const txt = await res.text();
    document.getElementById('status').textContent = 'Gra rozpoczęta: ' + txt;
}

async function resetGame() {
    const res = await fetch('/reset');
    const txt = await res.text();
    document.getElementById('status').textContent = 'Zresetowano: ' + txt;
}
