const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const message = document.getElementById("message");
const categoriesList = document.getElementById("categoriesList");

function showMessage(text, success = true) {
    message.textContent = text;
    message.className = success ? "success" : "error";
}

startBtn.addEventListener("click", async () => {

    try {

        const response = await fetch(
            `/start?lobby=${LOBBY_ID}`,
            {
                method: "POST"
            }
        );

        if (response.ok) {
            showMessage("Gra rozpoczęta");
            return;
        }

        const data = await response.json();

        showMessage(
            data.error || "Nie udało się rozpocząć gry",
            false
        );

    } catch (err) {

        showMessage(
            "Błąd połączenia",
            false
        );
    }
});

resetBtn.addEventListener("click", async () => {

    try {

        const response = await fetch(
            `/reset?lobby=${LOBBY_ID}`,
            {
                method: "POST"
            }
        );

        if (response.ok) {
            showMessage("Gra zresetowana");
        } else {
            showMessage("Nie udało się zresetować gry", false);
        }

    } catch (err) {

        showMessage(
            "Błąd połączenia",
            false
        );
    }
});

async function loadCategories() {

    try {

        const response = await fetch(
            `/get_categories?lobby=${LOBBY_ID}`,
            {
                method: "POST"
            }
        );

        if (!response.ok) {
            return;
        }

        const data = await response.json();

        renderCategories(
            data.all,
            data.active
        );

    } catch (err) {
        console.error(err);
    }
}

function renderCategories(allCategories, activeCategories) {

    categoriesList.innerHTML = "";

    allCategories.forEach(category => {

        const row = document.createElement("div");
        row.className = "category-item";

        const label = document.createElement("span");
        label.className = "category-name";
        label.textContent = category;

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "category-switch";

        checkbox.checked =
            activeCategories.includes(category);

        checkbox.addEventListener(
            "change",
            () => updateCategory(
                category,
                checkbox.checked
            )
        );

        row.appendChild(label);
        row.appendChild(checkbox);

        categoriesList.appendChild(row);
    });
}

async function updateCategory(category, enabled) {

    try {

        const response = await fetch(
            `/set_category?lobby=${LOBBY_ID}&category=${encodeURIComponent(category)}&set_to=${enabled}`,
            {
                method: "POST"
            }
        );

        if (response.ok) {

            showMessage(
                `${category}: ${enabled ? "włączona" : "wyłączona"}`
            );

        } else {

            showMessage(
                "Nie udało się zmienić kategorii",
                false
            );
        }

    } catch (err) {

        showMessage(
            "Błąd połączenia",
            false
        );
    }
}

loadCategories();