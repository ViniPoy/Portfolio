async function getProject() {
    const responseProject = await fetch(`${API_URL}/portfolio`);
    const project = await responseProject.json();
    return project;
};

async function postProject(data) {
    try {
        const response = await fetch(`${API_URL}/portfolio`, {
            method: "POST",
            headers: { "Authorization" : `Bearer ${token}` },
            body: data
        });
        if (response.ok) {
            return await response.json();
        } else {
            console.error("Erreur lors de l'envoi :", response.status);
            return null;
        }
    } catch (error) {
        console.error("Erreur réseau :", error);
        return null;
    }
}

async function putProject(data, id) {
    try {
        const response = await fetch(`${API_URL}/portfolio/${id}`, {
            method: "PUT",
            headers: { 
                "Authorization" : `Bearer ${token}`,
                "Content-Type" : "application/json"
            },
            body: data
        });
        if (response.ok) {
            return await response.json();
        } else {
            console.error("Erreur lors de l'envoi :", response.status);
            return null;
        }
    } catch (error) {
        console.error("Erreur réseau :", error);
        return null;
    }
}

async function deleteProject(id) {
    try {
        const response = await fetch(`${API_URL}/portfolio/${id}`, {
            method: "DELETE",
            headers: { 
                "Authorization" : `Bearer ${token}`,
                "Content-Type" : "application/json"
            }
        });
        return { success: response.ok, status: response.status };
    } catch (error) {
        console.error("Erreur réseau :", error);
        return false;
    }
}



async function postAdmin(email, password) {
    try{
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({ email, password })
        });
        if (response.ok) {
            return await response.json();
        } else {
            console.error("Erreur lors de l'envoie :", response.status);
            return null;
        }
    } catch (error) {
        showMessage(error.message);
    }
}