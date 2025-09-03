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

function buttonChange() {
    const token = localStorage.getItem("token");
    if (token) {
        connectionButton.innerText = "Déconnexion";
        connectionButton.addEventListener("click", () => {
            localStorage.removeItem("token");
            window.location.reload();
        })
    } else {
        connectionButton.addEventListener("click", () => {
            openModal("login");
        })
    }
}

buttonChange();