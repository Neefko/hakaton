const { invoke } = window.__TAURI__.core;
const { emit } = window.__TAURI__.event;

// Функция переключения темы
function toggleTheme() {
  const currentTheme = document.body.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.body.setAttribute("data-theme", newTheme);
  document.getElementById("themeToggle").textContent = newTheme === "dark" ? "🌙" : "🌞";
}

// Функция регистрации пользователя
async function registerUser() {
    const name = document.getElementById("login-name").value;
    const password = document.getElementById("login-pass").value;
    const output = document.getElementById("question");
  
    console.log("Имя:", name);
    console.log("Пароль:", password);
  
    // Отправляем запрос на сервер
    const response = await fetch("http://192.168.0.112:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, password })
    });
  
    const data = await response.json();
    console.log("Ответ от API:", data);  // Логируем ответ
  
    if (response.status === 200 && data.status === "ok") {
      output.textContent = "Регистрация успешна!";
      output.style.color = "green";
  
      // Переход на main.html после успешной регистрации
      setTimeout(() => {
        window.location.href = "main.html";
      }, 2000);  // Переход через 2 секунды
    } else {
      output.textContent = `Ошибка регистрации: ${data.message || "Неизвестная ошибка"}`;
      output.style.color = "red";
    }
  }

// Обработчик событий после загрузки страницы
window.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#themeToggle").addEventListener("click", toggleTheme);
  
  // Обработчик для кнопки "Зарегистрироваться"
  document.getElementById("registerBtn").addEventListener("click", registerUser);
});