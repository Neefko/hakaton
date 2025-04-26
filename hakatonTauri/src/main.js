const { invoke } = window.__TAURI__.core;
const { emit } = window.__TAURI__.event;

const getAPI = "http://192.168.0.14:5000/getItems";
const addUserAPI = "http://192.168.0.14:5000/addUser?name=";
const addBankAPI = "http://192.168.0.14:5000/addMoney?bank=";
const chatAPI = "http://192.168.0.14:5000/chat";
const anonChatAPI = "http://192.168.0.14:5000/anon_chat";

let btnClicked = false;
let currentChat = "common"; // "common" или "anon"

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

  const response = await fetch("http://192.168.0.14:5000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, password })
  });

  const data = await response.json();

  if (response.status !== 200 || !data || data.status !== "ok") {
    output.textContent = `Ошибка: ${data?.message || "неверные данные"}`;
    output.style.color = "red";
    return;
  }

  const user_id = data.user_id;
  output.textContent = `Вход выполнен. Ваш ID: ${user_id}`;
  output.style.color = "green";

  localStorage.setItem("user_id", user_id);
}

async function add() {
  let timeAddUsAPI = addUserAPI + document.getElementById('username').value;
  await fetch(timeAddUsAPI);
  document.getElementById('username').value = "";
}

async function reloadAPI() {}

function toggleTheme() {
  const currentTheme = document.body.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.body.setAttribute("data-theme", newTheme);
  document.getElementById("themeToggle").textContent = newTheme === "dark" ? "🌙" : "🌞";
}

// ====================== ЧАТ ====================== //

async function sendMessage() {
  const messageInput = document.getElementById("messageInput");
  const chatBox = document.getElementById("chatBox");
  const message = messageInput.value.trim();
  const userId = localStorage.getItem("user_id");

  if (!message) return;

  let url = currentChat === "common" ? chatAPI : anonChatAPI;
  let body = currentChat === "common" ? { user_id: userId, message } : { message };

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  const data = await response.json();

  if (response.status === 200 && data.status === "ok") {
    const newMessage = document.createElement("div");
    newMessage.className = "chat-message";
    newMessage.textContent = `Вы: ${message}`;
    chatBox.appendChild(newMessage);
    chatBox.scrollTop = chatBox.scrollHeight;
    messageInput.value = "";
  } else {
    alert(data.message || "Ошибка при отправке сообщения.");
  }
}

function displayMessages(messages) {
  const chatBox = document.getElementById("chatBox");
  chatBox.innerHTML = ""; // Очищаем старые сообщения

  messages.forEach(msg => {
    const messageElement = document.createElement("div");
    messageElement.className = "chat-message";

    // Для анонимного чата нет user_id
    if (msg.user_id) {
      messageElement.textContent = `ID ${msg.user_id}: ${msg.message}`;
    } else {
      messageElement.textContent = `Аноним: ${msg.message}`;
    }

    chatBox.appendChild(messageElement);
  });

  chatBox.scrollTop = chatBox.scrollHeight; // Прокрутить вниз
}

async function loadMessages(endpoint) {
  try {
    const response = await fetch(endpoint);
    const data = await response.json();

    if (data && data.messages) {
      displayMessages(data.messages);
    }
  } catch (error) {
    console.error("Ошибка загрузки сообщений:", error);
  }
}

  chatBox.scrollTop = chatBox.scrollHeight;


function switchChat(type) {
  currentChat = type; // "common" или "anon"
  loadMessages();
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
  document.getElementById("registerBtn").addEventListener("click", () => {
    window.location.href = "login.html";
  });

  document.getElementById("sendBtn").addEventListener("click", sendMessage);
  document.getElementById("commonChatBtn").addEventListener("click", () => switchChat("common"));
  document.getElementById("anonChatBtn").addEventListener("click", () => switchChat("anon"));

  const storedUserId = localStorage.getItem("user_id");
  if (storedUserId) {
    const output = document.getElementById("question");
    output.textContent = `Вы уже вошли. Ваш ID: ${storedUserId}`;
    output.style.color = "green";

    const sidebar = document.getElementById("sidebar");
    sidebar.classList.remove("active");
    document.getElementById("overlay").classList.remove("show");
  }

  loadMessages();
  setInterval(loadMessages, 2000); // Автообновление сообщений каждые 2 секунды
});