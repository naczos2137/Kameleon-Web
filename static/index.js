const nameInput = document.getElementById('name');
const savedName = localStorage.getItem('kameleonName');
if (savedName) nameInput.value = savedName;

document.getElementById('joinForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    if (name) {
        localStorage.setItem('kameleonName', name);
        window.location.href = `/game?name=${encodeURIComponent(name)}`;
    }
});
