console.log("JS підключено!");

document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll("nav a"); // всі посилання
    const pages = document.querySelectorAll(".page"); // всі сторінки

    // Початкова сторінка
    pages.forEach(page => {
        if(page.id === "home") page.classList.add("show");
        else page.classList.remove("show");
    });

    // Функція для виділення активного пункту меню
    function setActiveLink(targetId) {
        links.forEach(link => {
            if(link.dataset.page === targetId) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    }

    // Перемикання сторінок
    links.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const targetId = this.dataset.page;

            // Показати потрібну сторінку
            pages.forEach(page => {
                if(page.id === targetId) {
                    page.classList.add("show");
                } else {
                    page.classList.remove("show");
                }
            });

            // Виділити активний пункт меню
            setActiveLink(targetId);

            // Закрити мобільне меню після кліку (для мобільних)
            const menu = document.querySelector('.mobile-menu');
            if(menu.classList.contains('open')) {
                menu.classList.remove('open');
            }
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

    // На старті виділимо активний пункт
    setActiveLink("home");
});

