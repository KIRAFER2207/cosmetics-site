console.log("JS підключено!");

document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll("nav a");
    const pages = document.querySelectorAll(".page");

    // Встановлюємо початково видиму сторінку
    pages.forEach(page => {
        if(page.id === "home") {
            page.style.display = "block";
        } else {
            page.style.display = "none";
        }
    });

    // Перемикання сторінок
    links.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const targetId = this.dataset.page;

            pages.forEach(page => {
                if(page.id === targetId) {
                    page.style.display = "block"; // показати
                } else {
                    page.style.display = "none"; // сховати
                }
            });
        });
    });

    // Бургер-меню
    const burger = document.querySelector('.burger');
    const menu = document.querySelector('.mobile-menu');
    if(burger && menu) {
        burger.addEventListener('click', () => {
            menu.classList.toggle('open');
        });
    }
});