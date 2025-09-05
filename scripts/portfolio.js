const divFilters = document.querySelector(".portfolio__filters");
const divGallery = document.querySelector(".portfolio__gallery");

let projects;

getProject()
    .then((data) => {
        projects = data;
        generateFilters();
        generateGallery(projects);
        adminMode();
    })
    .catch(error => console.error("Erreur lors de la récupération des données :", error));

function generateFilters() {
    const allButton = document.createElement("button");
    allButton.textContent = "Tous";
    allButton.classList.add("portfolio__filters--button", "portfolio__filters--button-active");
    allButton.addEventListener("click", () => {
        document.querySelectorAll(".portfolio__filters--button").forEach(btn => btn.classList.remove("portfolio__filters--button-active"));
        allButton.classList.add("portfolio__filters--button-active");
        generateGallery(projects);
    });
    divFilters.appendChild(allButton);

    const categories = [...new Set(projects.map(project => project.category))];
    categories.forEach(category => {
        const button = document.createElement("button");
        button.textContent = category;
        button.classList.add("portfolio__filters--button");
        button.addEventListener("click", () => {
            document.querySelectorAll(".portfolio__filters--button").forEach(btn => btn.classList.remove("portfolio__filters--button-active"));
            button.classList.add("portfolio__filters--button-active");
            generateGallery(projects.filter(project => project.category === category));
        });
        divFilters.appendChild(button);
    });
}

function generateGallery(projectToShow) {
    divGallery.innerHTML = "";
    projectToShow.forEach((card) => {
        generateProject(card);
    });
    adminMode();
}

function generateProject(card) {
    const cardElement = document.createElement("div");
    cardElement.id = `project-${card._id}`;
    cardElement.classList.add("portfolio__card");
    
    const imageElement = document.createElement("img");
    imageElement.src = card.imageUrl;
    imageElement.alt = card.alt;
    imageElement.classList.add("portfolio__card--image");

    const titleElement = document.createElement("h3");
    titleElement.textContent = card.title;

    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = card.description;
    descriptionElement.classList.add("portfolio__card--description");

    const skillsElement = document.createElement("p");
    skillsElement.textContent = card.skills.join("\n");
    skillsElement.style.whiteSpace = "pre-line";
    skillsElement.classList.add("portfolio__card--skills");

    const linksContainer = document.createElement("div");
    linksContainer.classList.add("portfolio__card--links-container");
    const links = card.link;
    if (links.github) {
        const githubLink = document.createElement("a");
        githubLink.href = card.link.github;
        githubLink.textContent = "GitHub";
        githubLink.target = "_blank";
        githubLink.rel = "noopener noreferrer";
        githubLink.classList.add("portfolio__card--link");
        linksContainer.appendChild(githubLink);
    }
    if (links.site) {
        const siteLink = document.createElement("a");
        siteLink.href = card.link.site;
        siteLink.textContent = "Visiter le site";
        siteLink.target = "_blank";
        siteLink.rel = "noopener noreferrer";
        siteLink.classList.add("portfolio__card--link");
        linksContainer.appendChild(siteLink);
    }

    cardElement.append(imageElement, titleElement, descriptionElement, skillsElement, linksContainer);
    divGallery.appendChild(cardElement);
}