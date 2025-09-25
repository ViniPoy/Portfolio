const burger = document.querySelector(".burger");
const inside = document.querySelector(".inside");

burger.addEventListener("click", () => {
    inside.classList.toggle("inside-active");
    burger.classList.toggle("open");
});