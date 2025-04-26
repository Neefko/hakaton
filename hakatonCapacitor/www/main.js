const getAPI = "http://192.168.0.112:5000/getItems";
const addUserAPI = "http://192.168.0.112:5000/addUser?name=";
const addBankAPI = "http://192.168.0.112:5000/addMoney?bank=";
let btnClicked = false;

async function closeWindow() {
  await invoke("close_window");
}

async function menu() {
  let menuBarUser = document.getElementById("user-menu");
  btnClicked = !btnClicked;
  if (btnClicked) {
    menuBarUser.classList.add("show");
  } else {
    menuBarUser.classList.remove("show");
  }
}
async function loginUser() {
  const name = document.getElementById("login-name").value;
  const password = document.getElementById("login-pass").value;
  const output = document.getElementById("question");

  const response = await fetch("http://192.168.0.112:5000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, password })
  });

  const data = await response.json();

  if (response.status !== 200 || !data || data.status !== "ok") {
    output.textContent = `Ошибка: ${data?.message || "неверные данные"}`;
    output.style.color = "red";
    return;
  }

  const user_id = data.user_id;
  const username = data.name;
  output.textContent = `Вход выполнен. Имя: ${username}, ID: ${user_id}`;
  output.style.color = "green";

  // Можно сохранить user_id в localStorage, если нужно
  localStorage.setItem("user_id", user_id);
}
async function add() {
  let timeAddUsAPI = addUserAPI + document.getElementById('username').value;
  await fetch(timeAddUsAPI);
  document.getElementById('username').value = "";
}

async function reloadAPI() {
}

function toggleTheme() {
  const currentTheme = document.body.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.body.setAttribute("data-theme", newTheme);
  document.getElementById("themeToggle").textContent = newTheme === "dark" ? "🌙" : "🌞";
}

window.addEventListener("DOMContentLoaded", () => {
  const profileBtn = document.querySelector("#profile");
  const sidebar = document.querySelector("#sidebar");
  const overlay = document.createElement("div");
  overlay.id = "overlay";
  document.body.appendChild(overlay);

  profileBtn.addEventListener("click", () => {
    sidebar.classList.add("active");
    overlay.classList.add("show");
  });

  overlay.addEventListener("click", () => {
    sidebar.classList.remove("active");
    overlay.classList.remove("show");
  });

  document.querySelector("#closeBtn")?.addEventListener("click", closeWindow);
  document.querySelector("#reload").addEventListener("click", reloadAPI);
  document.getElementById("loginBtn").addEventListener("click", loginUser);
  document.querySelector("#themeToggle").addEventListener("click", toggleTheme);
  
  // Обработчик для кнопки "Зарегистрироваться"
  document.getElementById("registerBtn").addEventListener("click", () => {
    window.location.href = "login.html";  // Переход на страницу регистрации
  });
});