const tg = window.Telegram.WebApp;

function sendData() {
  const username = document.getElementById("username").value || "Гость";
  tg.sendData(JSON.stringify({user: username}));
}

tg.expand(); // разворачивает WebApp на весь экран
