
function adminMode() {
    const token = localStorage.getItem("token");
    if (!token) return;

    const divFilters = document.querySelector(".portfolio__filters");
    if (divFilters && !document.querySelector(".add-project-btn")) {
        const addButton = document.createElement("button");
        addButton.innerText = "Ajouter un projet";
        addButton.type = "button";
        addButton.classList.add("portfolio__filters--button", "add-project-btn");
        addButton.addEventListener("click", () => {
            openModal("add");
        });
        divFilters.appendChild(addButton);
    };

    const cards = document.querySelectorAll(".portfolio__card");
    cards.forEach(card => {
        if (!card.querySelector(".delete-btn")) {
            const divButton = card.querySelector(".portfolio__card--links-container");
            const deleteBtn = document.createElement("button");
            deleteBtn.innerText = "Supprimer";
            deleteBtn.classList.add("portfolio__card--link", "delete-btn");
            deleteBtn.addEventListener("click", () => {
                const projectId = card.id.replace("project-", "");
                openModal("delete", projectId);
            });
            divButton.appendChild(deleteBtn);
            const modifyBtn = document.createElement("button");
            modifyBtn.innerText = "Modifier";
            modifyBtn.classList.add("portfolio__card--link", "modify-btn");
            modifyBtn.addEventListener("click", () => {
                const projectId = card.id.replace("project-", "");
                const project = projects.find(p => p._id === projectId);
                openEditModal(project);
            });
            divButton.appendChild(modifyBtn);
        }
    })
}