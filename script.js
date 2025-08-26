// ============================
// Telegram WebApp API
// ============================
const tg = window.Telegram.WebApp;
tg.expand(); // разворачиваем окно на весь экран

// Получаем юзернейм
const username = tg.initDataUnsafe?.user?.username || "гость";
document.querySelector(".username").textContent = "@" + username;

// ============================
// Прогресс-бар
// ============================
function setProgress(currentXP, maxXP) {
  const percent = Math.min(100, (currentXP / maxXP) * 100);
  document.querySelector(".progress-fill").style.width = percent + "%";
  document.querySelector(".progress-info span:first-child").textContent = "XP: " + currentXP;
  document.querySelector(".progress-info span:last-child").textContent = "lvl " + Math.floor(currentXP / 1000);
}

// Тестовое обновление прогресса
setProgress(3500, 5000);

// ============================
// Отправка данных обратно боту
// ============================
function sendTestData() {
  const data = {
    action: "settings_click",
    user: username,
    xp: 3500
  };
  tg.sendData(JSON.stringify(data));
}

// Привязка кнопки ⚙
document.querySelector(".settings").addEventListener("click", sendTestData);

// ============================
// Навигация (нижнее меню)
// ============================
// Берём все ссылки в навигации
const navLinks = document.querySelectorAll(".bottom-nav a");

// Берём все "экраны"
const screens = {
  home: document.querySelector("body > .cards").parentElement, // основной блок
  achievements: createScreen("Достижения", "Здесь будут твои ачивки 🏆"),
  tasks: createScreen("Задачи", "Список квестов 📋"),
  history: createScreen("История", "История битв и действий 📜"),
  shop: createScreen("Магазин", "Скоро: магазин предметов 🛒")
};

// Функция для создания новых экранов
function createScreen(title, content) {
  const div = document.createElement("div");
  div.classList.add("screen");
  div.style.display = "none";
  div.innerHTML = `<h2>${title}</h2><p>${content}</p>`;
  document.body.insertBefore(div, document.querySelector(".bottom-nav"));
  return div;
}

// Переключение вкладок
navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    // убираем active у всех
    navLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");

    // скрываем все экраны
    Object.values(screens).forEach(s => s.style.display = "none");

    // показываем нужный
    if (link.textContent.includes("Главная")) {
      screens.home.style.display = "block";
    }
    if (link.textContent.includes("Достижения")) {
      screens.achievements.style.display = "block";
    }
    if (link.textContent.includes("Задачи")) {
      screens.tasks.style.display = "block";
    }
    if (link.textContent.includes("История")) {
      screens.history.style.display = "block";
    }
    if (link.textContent.includes("Магазин")) {
      screens.shop.style.display = "block";
    }
  });
});

// По умолчанию — главная
screens.home.style.display = "block";
