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

function openEditModal(project) {
    openModal("add", project._id);

    const form = document.getElementById("addProjectForm");
    const titleElement = document.querySelector(".modal__add h2");
    const submitButton = document.querySelector(".modal__btn--primary");
    
    titleElement.textContent = "Modifier un projet";
    submitButton.textContent = "Modifier";
    
    form.alt.value = project.alt || "";
    form.title.value = project.title || "";
    form.description.value = project.description || "";
    form.skills.value = project.skills ? project.skills.join(", ") : "";
    form.github.value = project.link?.github || "";
    form.site.value = project.link?.site || "";
    form.category.value = project.category || "";
}

function closeModal() {
    modal.classList.remove("open");

    const form = document.getElementById("addProjectForm");
    const titleElement = document.querySelector(".modal__add h2");
    const submitButton = form.querySelector(".modal__btn--primary");
    const imagePreviewContainer = document.getElementById("imagePreviewContainer");

    form.reset();
    delete modal.dataset.projectId;

    titleElement.textContent = "Ajouter un projet";
    submitButton.textContent = "Ajouter";
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

    const projectId = modal.dataset.projectId;
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

    let result;
    if (projectId) {
        result = await putProject(formData, projectId);
        if (result) {
            const index = projects.findIndex(p => p._id === projectId);
            projects[index] = result;
            generateGallery(projects);
            closeModal();
            showMessage("Projet modifié avec succès !")
        } else {
            console.error("Erreur lors de l'ajout !")
            showMessage("Erreur lors de la modification !")
        }
    } else {
        result = await postProject(formData);
        if (result) {
            projects.push(result);
            generateGallery(projects);
            closeModal();
            showMessage("Projet ajouté !");
        } else {
            console.error("Erreur lors de l'ajout du projet");
            showMessage("Erreur lors de l'ajout du projet !");
        }
    }
});