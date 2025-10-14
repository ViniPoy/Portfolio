
function animateOnScroll(selector, threshold = 0.2) {
    const elements = document.querySelectorAll(selector);
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold });

    elements.forEach(element => observer.observe(element));
    return observer;
}

function refreshGalleryAnimation() {
    const gallery = document.querySelector(".portfolio__gallery");
    if (!gallery) return;

    const wrapper = document.createElement("div");
    wrapper.className = "portfolio__gallery-wrapper";
    gallery.parentNode.insertBefore(wrapper, gallery);
    wrapper.appendChild(gallery);

    gallery.classList.remove("visible");
    void gallery.offsetWidth; // force reflow
    gallery.classList.add("visible");

    setTimeout(() => {
        wrapper.replaceWith(gallery);
    }, 450);
}

animateOnScroll(".prestas__gallery--card", 0.1);
animateOnScroll(".prestation__card", 0);
animateOnScroll(".portfolio__gallery", 0.2);