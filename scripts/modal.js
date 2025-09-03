const modal = document.getElementById("modal");
const sections = modal.querySelectorAll(".modal__section");
const closeButton = modal.querySelector(".modal__header--close");

function openModal(section) {
    sections.forEach(sec => sec.classList.remove("active"));
    const target = modal.querySelector(`.modal__${section}`);
    if (!target) {
    console.warn(`Section .modal__${section} introuvable`);
  } else {
    target.classList.add('active');
  }
    modal.classList.add("open");
}

function closeModal() {
    modal.classList.remove("open");
}

function showMessage(message) {
    const overlay = document.createElement("section");
    overlay.classList.add("overlay");
    document.body.appendChild(overlay);

    const messageBox = document.createElement("div");
    messageBox.classList.add("overlay__message");
    messageBox.textContent = message;
    overlay.appendChild(messageBox);

    const okButton = document.createElement("button");
    okButton.classList.add("overlay__message--button");
    okButton.textContent= "OK";
    okButton.addEventListener("click", () => {
        overlay.remove();
        window.location.reload();
    });
    messageBox.appendChild(okButton);
}

window.addEventListener("click", (event) => {
    if (event.target === modal && modal.classList.contains("open")) {
        closeModal();
    };
})

closeButton.addEventListener("click", () => closeModal());