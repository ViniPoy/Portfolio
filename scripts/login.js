const connectionButton = document.querySelector(".inside__connection");
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault()
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    try {
        const data = await postAdmin(email, password);
        if (data && data.token) {
            localStorage.setItem("token", data.token);
            showMessage("Connexion réussie");
            console.log("Connexion réussie, token :", data.token);
            closeModal();
        } else {
            throw new Error("Identifiants incorrects ou token manquant");
        }
    } catch (err) {
        console.error(err);
        showMessage(err)
    }
})

document.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.key.toLowerCase() === "l") {
        event.preventDefault();
        handleLoginShortcut();
    }
})

function handleLoginShortcut() {
    const token = localStorage.getItem("token");
    if (token) {
        localStorage.removeItem("token");
        updateHeaderState(false);
        showMessage("Déconnecté !")
    } else {
        openModal("login");
    }
}

function updateHeaderState(isLoggedIn) {
    const header = document.querySelector("header");
    if (!header) return;
    if (isLoggedIn) {
        header.classList.add("logged");
    } else {
        header.classList.remove("logged");
    }
}

window.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    updateHeaderState(!!token)
})