const contactForm = document.getElementById('contactForm');
const feedback = document.getElementById('formMessage');

function showFormMessage(text, type) {
    feedback.textContent = text;
    feedback.className = type;
}

contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const data = {
        name: contactForm['client-name'].value.trim(),
        email: contactForm['client-email'].value.trim(),
        object: contactForm['client-object'].value.trim(),
        message: contactForm['client-message'].value.trim(),
    };

    if (!data.name || !data.email || !data.message) {
        showFormMessage("Merci de remplir tout les champs obligatoires.", "error");
        return;
    }

    try {
        await sendContactMessage(data);
        showFormMessage('Merci pour votre message, je vous répondrai dans les meilleurs délais', 'success');
        contactForm.reset();
    } catch (err) {
        showFormMessage('Une erreur est survenue, veuillez réessayer plus tard', 'error');
    }
});