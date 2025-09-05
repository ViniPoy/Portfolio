const modal = document.getElementById("modal");
const sections = modal.querySelectorAll(".modal__section");
const closeButton = modal.querySelector(".modal__header--close");

function openModal(section, projectId = null) {
    sections.forEach(sec => sec.classList.remove("active"));
    const target = modal.querySelector(`.modal__${section}`);
    if (!target) {
        console.warn(`Section .modal__${section} introuvable`);
    } else {
        target.classList.add('active');
    }
    if (projectId) {
        modal.dataset.projectId = projectId;
    } else {
        delete modal.dataset.projectId;
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


const confirmDeleteBtn = document.querySelector(".confirm-delete");
const cancelDeleteBtn = document.querySelector(".cancel-delete");

confirmDeleteBtn.addEventListener("click", () => {
    const projectId = modal.dataset.projectId;
    if (projectId) {
        deleteProject(projectId).then(() => {
            document.getElementById(`project-${projectId}`).remove();
            showMessage("Projet supprimé !");
            closeModal();
        });
    }
});

cancelDeleteBtn.addEventListener("click", () => {
    closeModal();
});


const addProjectForm = document.getElementById("addProjectForm");

addProjectForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const skillsInput = addProjectForm.skills.value.trim();
    const skillsArray = skillsInput.split(/\s*,\s*|\n/).filter(s => s.length > 0);
    const githubInput = document.getElementById("github").value.trim();
    const siteInput = document.getElementById("site").value.trim();
    const link = {
        github: githubInput || null,
        site: siteInput || null
    };

    const formData = new FormData();
    formData.append("image", addProjectForm.image.files[0]);
    formData.append("alt", addProjectForm.alt.value);
    formData.append("title", addProjectForm.title.value);
    formData.append("description", addProjectForm.description.value);
    formData.append("skills", JSON.stringify(skillsArray));
    formData.append("category", addProjectForm.category.value);
    formData.append("link", JSON.stringify(link));

    const newProject = await postProject(formData);
    if (newProject) {
        projects.push(newProject);
        generateGallery(projects);
        closeModal();
        showMessage("Projet ajouté !");
    } else {
        console.error("Erreur lors de l'ajout du projet");
        showMessage("Erreur lors de l'ajout du projet !");
    }
});