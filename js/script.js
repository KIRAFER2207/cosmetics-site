// --- FIREBASE ІНІЦІАЛІЗАЦІЯ ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } 
    from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBpNbHDyOJhQ1tku6w8CbKszS2IEpe-baY",
    authDomain: "cosmeticsite-25bde.firebaseapp.com",
    projectId: "cosmeticsite-25bde",
    storageBucket: "cosmeticsite-25bde.firebasestorage.app",
    messagingSenderId: "630762906978",
    appId: "1:630762906978:web:7674928c1178799404383b",
    measurementId: "G-BZQLBGYLKM"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const loginBtn = document.getElementById("login-btn");
const logoutBtn = document.getElementById("logout-btn");
const loginMessage = document.getElementById("login-message");

console.log("JS підключено!");

// --- Якщо localStorage порожній — створюємо пустий список товарів ---
if (!localStorage.getItem("products")) {
    localStorage.setItem("products", "[]");
}
if (!localStorage.getItem("favourites")) {
    localStorage.setItem("favourites", "[]");
}


document.addEventListener("DOMContentLoaded", function () {
    const loginBtn = document.getElementById("login-btn");
    // Створюємо контейнер для кнопки + повідомлення
    let loginContainer = document.createElement("div");
    loginContainer.style.display = "flex";
    loginContainer.style.flexDirection = "row";
    loginContainer.style.alignItems = "center"; 
    loginContainer.style.gap = "8px"; 
    loginBtn.insertAdjacentElement('afterend', loginContainer);
    loginContainer.appendChild(loginBtn);

    // Клік на кнопку "Увійти"
    loginBtn.addEventListener("click", async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        console.log("Успішний вхід:", user.email);

        // Перевірка на адміністратора
        const adminEmails = [
            "ferchuk@s12.pp.ua",
        ];

        let role = adminEmails.includes(user.email)
            ? "Адміністратор"
            : "Користувач";

        localStorage.setItem("role", role);
        localStorage.setItem("userEmail", user.email);

        reRenderAllProducts();

        alert(`Ви увійшли як: ${role}`);

    } catch (error) {
        console.error("Помилка при вході:", error);
        alert("Не вдалося увійти через Google");
    }
});

        const homeSection = document.getElementById("home");
        const comingSoon = homeSection.querySelector(".coming-soon");

        // Видаляємо старий прямокутник, якщо він є
        const oldBox = document.querySelector(".admin-add-box");
        if (oldBox) oldBox.remove();
restoreUserState();
});

// Окрема функція модалки
function openProductModal(product, productBlock) {
    // Створюємо затемнений фон модалки
    const modal = document.createElement("div");
    modal.style.position = "fixed";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.backgroundColor = "rgba(0,0,0,0.7)";
    modal.style.display = "flex";
    modal.style.justifyContent = "center";
    modal.style.alignItems = "center";
    modal.style.zIndex = "1000";

    // Вміст модалки
    const modalContent = document.createElement("div");
    modalContent.style.backgroundColor = "#fff";
    modalContent.style.padding = "20px";
    modalContent.style.borderRadius = "12px";
    modalContent.style.width = "320px";
    modalContent.style.textAlign = "center";

    // Зображення товару
    const img = document.createElement("img");
    img.src = product.image || "";
    img.style.maxWidth = "100%";
    img.style.maxHeight = "200px";
    img.style.objectFit = "contain";
    img.style.marginBottom = "10px";
    modalContent.appendChild(img);

    // Поля для редагування
    const fields = ["title", "price", "brand", "purpose", "description"];
    const inputs = {};
    fields.forEach(f => {
        const label = document.createElement("label");
        label.textContent = f.charAt(0).toUpperCase() + f.slice(1) + ": ";
        label.style.display = "block";
        label.style.marginTop = "8px";

        const input = document.createElement("input");
        input.type = "text";
        input.value = product[f] || "";
        input.style.width = "100%";
        input.style.marginTop = "3px";

        label.appendChild(input);
        modalContent.appendChild(label);
        inputs[f] = input;
    });

    // Контейнер для кнопок
    const btnRow = document.createElement("div");
    btnRow.style.marginTop = "15px";
    btnRow.style.display = "flex";
    btnRow.style.justifyContent = "space-between";

    // Кнопка Зберегти
    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Зберегти";
    saveBtn.style.padding = "6px 10px";
    saveBtn.style.borderRadius = "5px";
    saveBtn.style.backgroundColor = "#28a745";
    saveBtn.style.color = "#fff";
    saveBtn.style.cursor = "pointer";
    saveBtn.addEventListener("click", () => {
        fields.forEach(f => {
            product[f] = inputs[f].value;
        });
        // Оновлюємо блок товару на сторінці
        const info = productBlock.querySelector("div");
        if(info) {
            info.innerHTML = `<strong>${product.title}</strong><br>
                              <small>${product.brand || ""} • ${product.purpose || ""}</small><br>
                              ${product.description || ""}<br>
                              <b>${product.price ? product.price + " грн" : ""}</b>`;
        }
        modal.remove();
    });
    btnRow.appendChild(saveBtn);

    // Кнопка Видалити
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Видалити товар";
    deleteBtn.style.padding = "6px 10px";
    deleteBtn.style.borderRadius = "5px";
    deleteBtn.style.backgroundColor = "#d9534f";
    deleteBtn.style.color = "#fff";
    deleteBtn.style.cursor = "pointer";
    deleteBtn.addEventListener("click", () => {
        productBlock.remove();
        modal.remove();
    });
    btnRow.appendChild(deleteBtn);

    // Кнопка ← Назад
    const backBtn = document.createElement("button");
    backBtn.textContent = "← Назад";
    backBtn.style.padding = "6px 10px";
    backBtn.style.borderRadius = "5px";
    backBtn.style.backgroundColor = "#555";
    backBtn.style.color = "#fff";
    backBtn.style.cursor = "pointer";
    backBtn.addEventListener("click", () => {
        modal.remove();
        showPage("home"); // повертаємо на головну
    });
    btnRow.appendChild(backBtn);

    modalContent.appendChild(btnRow);
    modal.appendChild(modalContent);
    modal.addEventListener("click", e => {
        if (e.target === modal) modal.remove();
    });
    document.body.appendChild(modal);
}
let productsContainer;
function ensureProductsContainer() {
    const home = document.getElementById("home");
    productsContainer = document.getElementById("products-container");
    if (!productsContainer) {
        productsContainer = document.createElement("div");
        productsContainer.id = "products-container";
        productsContainer.style.display = "flex";
        productsContainer.style.flexWrap = "wrap";
        productsContainer.style.gap = "15px";
        productsContainer.style.marginTop = "20px";
        home.appendChild(productsContainer);
    }
}

// === createProductCard and openEditForm (виправлені) ===
function createProductCard(product) {
    const role = localStorage.getItem("role");
    ensureProductsContainer();

    const card = document.createElement("div");
    card.className = "product-tile";
    card.style.width = "150px";
    card.style.minHeight = "180px";
    card.style.background = "#FFE4E1";
    card.style.borderRadius = "12px";
    card.style.padding = "10px";
    card.style.display = "flex";
    card.style.flexDirection = "column";
    card.style.alignItems = "center";
    card.style.textAlign = "center";
    card.style.color = "#333";
    card.style.fontWeight = "600";
    card.style.boxShadow = "0 3px 10px rgba(0,0,0,0.1)";

// --- Сердечко для КОРИСТУВАЧА ---
if (role === "Користувач") {

    const heart = document.createElement("div");
    heart.className = "heart-icon";
    heart.innerHTML = "&#10084;";
    heart.setAttribute("data-code", product.code);

    // Стилі
    heart.style.position = "absolute";
    heart.style.top = "8px";
    heart.style.right = "8px";
    heart.style.fontSize = "22px";
    heart.style.cursor = "pointer";
    heart.style.color = "transparent";               // не зафарбоване
    heart.style.webkitTextStroke = "2px #ff6b81";   // контур
    heart.style.transition = "0.25s";

    card.style.position = "relative";
    card.appendChild(heart);

    // Список збережених улюблених товарів
    let favourites = JSON.parse(localStorage.getItem("favourites") || "[]");

    // Якщо товар уже в улюблених — робимо серце однотонним
    if (favourites.includes(product.code)) {
        heart.style.color = "#ff6b81";  
    }

    // Клік — додати / прибрати з улюблених
    heart.addEventListener("click", (e) => {
        e.stopPropagation(); // щоб не відкривалась картка товару

        let list = JSON.parse(localStorage.getItem("favourites") || "[]");

        if (list.includes(product.code)) {
            // Видалити із улюблених
            list = list.filter(code => code !== product.code);
            heart.style.color = "transparent";
        } else {
            // Додати до улюблених
            list.push(product.code);
            heart.style.color = "#ff6b81";
        }

        localStorage.setItem("favourites", JSON.stringify(list));
    });
}
    // Фото
    const img = document.createElement("img");
    img.src = product.image || "";
    img.style.width = "100%";
    img.style.height = "100px";
    img.style.objectFit = "cover";
    img.style.borderRadius = "8px";
    card.appendChild(img);

    // Назва
    const title = document.createElement("p");
    title.className = "product-title";
    title.textContent = product.title || "";
    title.style.margin = "10px 0 0 0";
    card.appendChild(title);

    // --- Логіка кліку: різна для адміна і користувача ---
    card.addEventListener("click", () => {
    const role = localStorage.getItem("role");

    if (role === "Адміністратор") {
        openEditForm(product, card);
    } else {
        openProductPage(product);   // ← тепер відкривається красива сторінка товару
    }
});

    // Вставляємо картку ПІСЛЯ "+"
    const addBox = productsContainer.querySelector(".admin-add-box");
    if (addBox) {
        addBox.insertAdjacentElement("afterend", card);
    } else {
        productsContainer.appendChild(card);
    }
}

function openEditForm(product, cardElement) {
    const homeSection = document.getElementById("home");

    // прибираємо існуючу форму (якщо є)
    const oldForm = document.querySelector(".product-form-container");
    if (oldForm) oldForm.remove();

    // створюємо форму в режимі редагування
    const form = createProductForm(homeSection, true);

    // заповнюємо поля
    form.querySelector('[name="title"]').value = product.title || "";
    form.querySelector('[name="price"]').value = product.price || "";
    form.querySelector('[name="inStock"]').value = product.inStock || "yes";
    form.querySelector('[name="brand"]').value = product.brand || "";
    form.querySelector('[name="purpose"]').value = product.purpose || "";
    form.querySelector('[name="description"]').value = product.description || "";
    form.querySelector('[name="features"]').value = product.features || "";
    form.querySelector('[name="code"]').value = product.code || "";

    if (product.image) {
        const prev = form.querySelector("#preview-img");
        prev.src = product.image;
        prev.style.display = "block";
        form.dataset.pastedImage = product.image;
    }

    // змінюємо текст кнопки збереження
    const saveBtn = form.querySelector(".save-product-btn");
    saveBtn.textContent = "Оновити товар";

// === Додаємо кнопку "Видалити товар" тільки у режимі редагування ===
if (true) {  
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Видалити товар";
    deleteBtn.style.padding = "10px";
    deleteBtn.style.marginTop = "15px";
    deleteBtn.style.width = "100%";
    deleteBtn.style.background = "#d9534f";
    deleteBtn.style.color = "white";
    deleteBtn.style.border = "none";
    deleteBtn.style.borderRadius = "8px";
    deleteBtn.style.cursor = "pointer";
    deleteBtn.style.fontWeight = "600";

    form.appendChild(deleteBtn);

    deleteBtn.addEventListener("click", () => {
        // Модальне підтвердження
        const confirmBox = document.createElement("div");
        confirmBox.style.position = "fixed";
        confirmBox.style.top = "0";
        confirmBox.style.left = "0";
        confirmBox.style.width = "100%";
        confirmBox.style.height = "100%";
        confirmBox.style.background = "rgba(0,0,0,0.6)";
        confirmBox.style.display = "flex";
        confirmBox.style.justifyContent = "center";
        confirmBox.style.alignItems = "center";
        confirmBox.style.zIndex = "1500";
        const inner = document.createElement("div");
        inner.style.background = "#fff";
        inner.style.padding = "20px";
        inner.style.borderRadius = "10px";
        inner.style.textAlign = "center";
        inner.style.width = "260px";
        inner.style.boxShadow = "0 3px 12px rgba(0,0,0,0.3)";
        inner.innerHTML = `
            <p style="font-size:16px; font-weight:600;">Ви впевнені, що хочете видалити товар?</p>
            <div style="display:flex; justify-content:space-between; margin-top:15px;">
                <button id="confirm-yes" style="padding:8px 14px; background:#d9534f; color:white; border:none; border-radius:6px; cursor:pointer;">Так</button>
                <button id="confirm-no" style="padding:8px 14px; background:#555; color:white; border:none; border-radius:6px; cursor:pointer;">Ні</button>
            </div>
        `;

        confirmBox.appendChild(inner);
        document.body.appendChild(confirmBox);

        // ‼️ Якщо "Ні" — закрити вікно і нічого не робити
        inner.querySelector("#confirm-no").onclick = () => confirmBox.remove();

        // ✅ Якщо "Так" — видалити
        inner.querySelector("#confirm-yes").onclick = () => {

            // 1. Видаляємо з localStorage
            const all = JSON.parse(localStorage.getItem("products") || "[]");
            const updated = all.filter(p => p.code !== product.code);
            localStorage.setItem("products", JSON.stringify(updated));

            // 2. Видаляємо картку з екрана
            cardElement.remove();

            // 3. Закриваємо форму
            form.remove();

            // 4. Закриваємо модалку підтвердження
            confirmBox.remove();

            alert("Товар успішно видалено!");
        };
    });
}

    // перевизначаємо поведінку кнопки збереження для оновлення
    saveBtn.onclick = () => {
        // читаємо оновлені значення
        product.title = form.querySelector('[name="title"]').value.trim(); product.price = form.querySelector('[name="price"]').value.trim();
        product.inStock = form.querySelector('[name="inStock"]').value;
        product.brand = form.querySelector('[name="brand"]').value;
        product.purpose = form.querySelector('[name="purpose"]').value;
        product.description = form.querySelector('[name="description"]').value.trim();
        product.features = form.querySelector('[name="features"]').value.trim();
        product.image = form.dataset.pastedImage || product.image;

        // оновлюємо картку на сторінці
        const imgEl = cardElement.querySelector("img");
        if (imgEl) imgEl.src = product.image || "";
        const titleEl = cardElement.querySelector(".product-title");
        if (titleEl) titleEl.textContent = product.title || "";

        // оновлюємо localStorage
        const all = JSON.parse(localStorage.getItem("products") || "[]");
        const idx = all.findIndex(p => p.code === product.code);
        if (idx >= 0) {
            all[idx] = product;
            localStorage.setItem("products", JSON.stringify(all));
        }

        form.remove();
        // залишаємо плюс на місці (нічого не чіпаємо)
        alert("Товар оновлено!");
    };
}

    // Кнопка під фільтрацією
const filterSections = document.querySelectorAll(".filter-section");
const lastFilterSection = filterSections[filterSections.length - 1];

if (lastFilterSection) {
    const filterBtn = document.createElement("button");
    filterBtn.textContent = "Застосувати фільтри";
    filterBtn.style.marginTop = "10px";
    filterBtn.style.padding = "8px 15px";
    filterBtn.style.borderRadius = "8px";
    filterBtn.style.border = "none";
    filterBtn.style.backgroundColor = "#DC143C";
    filterBtn.style.color = "white";
    filterBtn.style.cursor = "pointer";
    lastFilterSection.appendChild(filterBtn);
    filterBtn.addEventListener("click", () => {
    applyFilters();
});
}

    // Перемикання сторінок
    const links = document.querySelectorAll("nav a");
    const pages = document.querySelectorAll(".page");

    function showPage(targetId) {
        pages.forEach(page => page.classList.toggle("show", page.id === targetId));
        links.forEach(link => link.classList.toggle("active", link.dataset.page === targetId));
    }
links.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            showPage(this.dataset.page);

            const mobileMenu = document.querySelector('.mobile-menu');
            if (mobileMenu.classList.contains('open')) mobileMenu.classList.remove('open');
        });
    });

    const burger = document.querySelector('.burger');
    const mobileMenu = document.querySelector('.mobile-menu');
    if (burger && mobileMenu) {
        burger.addEventListener('click', () => {
            mobileMenu.classList.toggle('open');
        });
    }

    showPage("home");
// Показати збережені товари після завантаження сторінки
(function renderSavedProducts() {
    const homeSection = document.getElementById("home");
    const saved = JSON.parse(localStorage.getItem("products") || "[]");
    saved.forEach(p => {
        createProductCard(p, homeSection);
    });
})();
restoreUserState();
function openProductPage(product) {
    // Видаляємо попередню сторінку товару, якщо вона є
    const oldPage = document.querySelector(".product-full-page");
    if (oldPage) oldPage.remove();

    const container = document.createElement("div");
    container.className = "product-full-page";
    container.style.position = "fixed";
    container.style.top = "0";
    container.style.left = "0";
    container.style.width = "100%";
    container.style.height = "100%";
    container.style.background = "rgba(0,0,0,0.6)";
    container.style.display = "flex";
    container.style.justifyContent = "center";
    container.style.alignItems = "center";
    container.style.zIndex = "2000";
    container.style.padding = "20px";

    const box = document.createElement("div");
    box.style.background = "#fff";
    box.style.borderRadius = "14px";
    box.style.width = "90%";
    box.style.maxWidth = "900px";
    box.style.display = "flex";
    box.style.gap = "25px";
    box.style.padding = "25px";
    box.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
    box.style.maxHeight = "90%";
    box.style.overflowY = "auto";

    // Фото зліва
    const img = document.createElement("img");
    img.src = product.image || "";
    img.style.width = "330px";
    img.style.height = "330px";
    img.style.objectFit = "cover";
    img.style.borderRadius = "12px";
    img.style.border = "1px solid #eee";

    // Правий блок
    const right = document.createElement("div");
    right.style.flex = "1";
    right.style.display = "flex";
    right.style.flexDirection = "column";
    right.style.gap = "8px";
    right.innerHTML = `
        <h2 style="margin:0; font-size:26px; font-weight:700; color:#222;">${product.title}</h2>

        <p style="margin:4px 0; font-size:16px; color:${product.inStock === 'yes' ? 'green' : 'red'};">
            ${product.inStock === 'yes' ? 'В наявності' : 'Немає в наявності'}
        </p>

        <p style="margin:6px 0; font-size:22px; font-weight:700; color:#e91e63;">
            ${product.price ? product.price + " грн" : ""}
        </p>

        <p style="margin:6px 0; font-size:14px;"><b>Бренд:</b> ${product.brand}</p>
        <p style="margin:6px 0; font-size:14px;"><b>Призначення:</b> ${product.purpose}</p>

        <div style="margin-top:10px;">
            <p style="font-size:15px; font-weight:600; margin-bottom:4px;">Опис:</p>
            <p style="font-size:14px; line-height:1.4;">${product.description || "—"}</p>
        </div>

        <div style="margin-top:10px;">
            <p style="font-size:15px; font-weight:600; margin-bottom:4px;">Характеристики:</p>
            <p style="font-size:14px; line-height:1.4;">${product.features || "—"}</p>
        </div>

        <p style="margin:8px 0; font-size:13px; color:#777;"><b>Код товару:</b> ${product.code}</p>
    `;

    // Кнопка Назад
    const closeBtn = document.createElement("button");
    closeBtn.textContent = "← Повернутися";
    closeBtn.style.marginTop = "20px";
    closeBtn.style.padding = "10px 18px";
    closeBtn.style.width = "180px";
    closeBtn.style.background = "#555";
    closeBtn.style.color = "white";
    closeBtn.style.border = "none";
    closeBtn.style.borderRadius = "8px";
    closeBtn.style.cursor = "pointer";
    closeBtn.style.fontSize = "15px";
    closeBtn.style.fontWeight = "600";
    closeBtn.addEventListener("click", () => container.remove());
    right.appendChild(closeBtn);

    box.appendChild(img);
    box.appendChild(right);
    container.appendChild(box);

    document.body.appendChild(container);
}
const favBtn = document.getElementById("favourites-btn");
const favPanel = document.getElementById("favourites-panel");

// Сердечко в шапці бачить лише користувач
if (localStorage.getItem("role") !== "Користувач") {
    favBtn.style.display = "none";
}

// Відкрити / закрити панель
    favBtn.addEventListener("click", () => {
    favPanel.classList.toggle("open");
    favBtn.classList.toggle("active");
    renderFavouritesList();
});
// ===== ЗАКРИВАННЯ ПАНЕЛІ ПРИ КЛІКУ ПОЗА НЕЮ =====
document.addEventListener("click", (e) => {
    const panel = document.getElementById("favourites-panel");
    const favBtn = document.getElementById("favourites-btn");

    // якщо панель закрита — нічого не робимо
    if (!panel.classList.contains("open")) return;

    // Клік по панелі або по кнопці серця — не закриває
    if (panel.contains(e.target) || favBtn.contains(e.target)) return;

    // Закрити панель
    panel.classList.remove("open");
});
function renderFavouritesList() {
    const favCodes = JSON.parse(localStorage.getItem("favourites") || "[]");
    const allProducts = JSON.parse(localStorage.getItem("products") || "[]");

    favPanel.innerHTML = "<h2>Улюблені товари</h2><hr><br>";

    if (favCodes.length === 0) {
        favPanel.innerHTML += "<p>Поки що немає улюблених товарів ❤️</p>";
        return;
    }

    favCodes.forEach(code => {
        const product = allProducts.find(p => p.code === code);
        if (!product) return;

        const item = document.createElement("div");
        item.className = "fav-item";
        item.style.display = "flex";
        item.style.alignItems = "center";
        item.style.justContent = "space-between";
        item.style.marginBottom = "12px";
        item.style.gap = "10px";
        item.innerHTML = `
            <div style="display:flex; gap:10px; align-items:center; cursor:pointer;" class="fav-click-area">
                <img src="${product.image}" alt="" style="width:55px; height:55px; border-radius:8px; object-fit:cover;">
                <div>
                    <div class="fav-title" style="font-weight:600;">${product.title}</div>
                    <div>${product.price} грн</div>
                </div>
            </div>

            <div class="fav-remove" 
                 style="font-size:22px; cursor:pointer; color:#ff4d6d; padding:5px;">
                 ✖
            </div>
       ` ;

        // Клік по товару — відкриває модалку
        item.querySelector(".fav-click-area").addEventListener("click", () => {
            openProductPage(product);
        });

        // Клік по хрестику — видаляє зі списку
        item.querySelector(".fav-remove").addEventListener("click", (e) => {
            e.stopPropagation(); 

            let list = JSON.parse(localStorage.getItem("favourites") || "[]");
            list = list.filter(c => c !== product.code);
            localStorage.setItem("favourites", JSON.stringify(list));

            renderFavouritesList(); 
            updateAllHearts();      
        });

        favPanel.appendChild(item);
    });
}
function updateAllHearts() {
    const favourites = JSON.parse(localStorage.getItem("favourites") || "[]");

    document.querySelectorAll(".heart-icon").forEach(heart => {
        const code = heart.getAttribute("data-code");
        heart.style.color = favourites.includes(code) ? "#ff6b81" : "transparent";
    });
}
function restoreUserState() {
    const role = localStorage.getItem("role");
    const loginMessage = document.getElementById("login-message");
    const favBtn = document.getElementById("favourites-btn");

    if (!role) return;
// Показати/приховати кнопку "Вийти"
if (role === "Користувач" || role === "Адміністратор") {
    logoutBtn.style.display = "block";
} else {
    logoutBtn.style.display = "none";
}

    // Відновлюємо текст “ви увійшли як…”
    loginMessage.textContent = `Ви увійшли як ${role}`;

    // Показати сердечко тільки для користувача
    if (role === "Користувач") {
        favBtn.style.display = "block";
    } else {
        favBtn.style.display = "none";
    }

    // Відновлення admin-контейнера
    const homeSection = document.getElementById("home");
    const productsContainer = document.getElementById("products-container");
    const comingSoon = homeSection.querySelector(".coming-soon");

    // Прибираємо старий admin-box
    const oldBox = document.querySelector(".admin-add-box");
    if (oldBox) oldBox.remove();

    if (role === "Адміністратор") {
        if (comingSoon) comingSoon.style.display = "none";
        productsContainer.appendChild(createAddBox());
    } else {
        if (comingSoon) comingSoon.style.display = "block";
    }
}
function reRenderAllProducts() {
    const homeSection = document.getElementById("home");
    const productsContainer = document.getElementById("products-container");

    if (!productsContainer) return;

    // 🔥 Очищаємо ВСІ картки товарів (щоб не дублювалися)
    productsContainer.innerHTML = "";

    const role = localStorage.getItem("role");

    // Якщо адміністратор — додаємо "+"
    if (role === "Адміністратор") {
        productsContainer.appendChild(createAddBox());
    }

    // Додаємо товари заново
    const saved = JSON.parse(localStorage.getItem("products") || "[]");
    saved.forEach(product => {
        createProductCard(product, homeSection);
    });
}
function applyFilters() {
    const allProducts = JSON.parse(localStorage.getItem("products") || "[]");

    // Читаємо значення фільтрів
    const priceFilter = document.querySelector("input[name='price']:checked");
    const stockFilters = [...document.querySelectorAll("input[name='inStock']:checked")].map(x => x.value);
    const brandFilters = [...document.querySelectorAll("input[name='brand']:checked")].map(x => x.value);
    const purposeFilters = [...document.querySelectorAll("input[name='purpose']:checked")].map(x => x.value);

    let filtered = allProducts;

    // Фільтр ціни
    if (priceFilter) {
        const [min, max] = priceFilter.value.split("-");
        filtered = filtered.filter(p => {
            if (max === "500") return p.price <= 500;
            if (min === "500" && max === "1500") return p.price >= 500 && p.price <= 1500;
            if (min === "1500+") return p.price >= 1500;
        });
    }

    // Фільтр наявності
    if (stockFilters.length > 0) {
        filtered = filtered.filter(p => stockFilters.includes(p.inStock));
    }

    // Фільтр бренду
    if (brandFilters.length > 0) {
        filtered = filtered.filter(p => brandFilters.includes(p.brand));
    }

    // Фільтр призначення
    if (purposeFilters.length > 0) {
        filtered = filtered.filter(p => purposeFilters.includes(p.purpose));
    }

    // Показуємо товари
    renderProducts(filtered);
restoreHeartsOnProducts();
}
function renderProducts(list) {
    const container = document.getElementById("products-container");
    if (!container) return;

    container.innerHTML = ""; // очищаємо

    const role = localStorage.getItem("role");

    // Додати плюс для адміністратора
    if (role === "Адміністратор") {
        const addBox = createAddBox();
        container.appendChild(addBox);
    }

    list.forEach(p => {
        createProductCard(p); // ти вже маєш цю функцію
    });
}
document.getElementById("reset-filters-btn").addEventListener("click", () => {
    // Скидаємо всі фільтри
    document.querySelectorAll("input[type='checkbox'], input[type='radio']")
        .forEach(el => el.checked = false);

    // Відмалювати всі товари
    const all = JSON.parse(localStorage.getItem("products") || "[]");
    renderProducts(all);
restoreHeartsOnProducts();
    // Повертаємося на сторінку Home
    showPage("home");
});
function restoreHeartsOnProducts() {
    const role = localStorage.getItem("role");
    if (role !== "Користувач") return;

    const favourites = JSON.parse(localStorage.getItem("favourites") || "[]");

    document.querySelectorAll(".product-tile").forEach(card => {
        const code = card.getAttribute("data-code");
        if (!code) return;

        // Якщо сердечко вже є – пропускаємо
        if (card.querySelector(".heart-icon")) return;

        const heart = document.createElement("div");
        heart.className = "heart-icon";
        heart.innerHTML = "&#10084;";
        heart.style.position = "absolute";
        heart.style.top = "8px";
        heart.style.right = "8px";
        heart.style.fontSize = "22px";
        heart.style.cursor = "pointer";
        heart.style.color = favourites.includes(code) ? "#ff6b81" : "transparent";
        heart.style.webkitTextStroke = "2px #ff6b81";

        card.style.position = "relative";
        card.appendChild(heart);

        heart.addEventListener("click", (e) => {
            e.stopPropagation();

            let list = JSON.parse(localStorage.getItem("favourites") || "[]");

            if (list.includes(code)) {
                list = list.filter(c => c !== code);
                heart.style.color = "transparent";
            } else {
                list.push(code);
                heart.style.color = "#ff6b81";
            }

            localStorage.setItem("favourites", JSON.stringify(list));
        });
    });
    logoutBtn.addEventListener("click", () => {
}


