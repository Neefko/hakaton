const getAPI = "http://192.168.0.112:5000/getItems";
const addUserAPI = "http://192.168.0.112:5000/addUser?name=";
let btnClicked = false;

async function menu() {
  let menuBarUser = document.getElementById("user-menu");
  btnClicked = !btnClicked;
  if (btnClicked) {
    menuBarUser.classList.add("show");
  } else {
    menuBarUser.classList.remove("show");
  }
}
async function fetchItems() {
  const response = await fetch(getAPI);
  const items = await response.json();
  const output = document.getElementById("test");
  output.textContent = "";
  items.forEach(item => {
    const text = `${item.id}: ${item.name}`;
    output.textContent += text + "\n";
  });
}

async function add() {
  let timeAddUsAPI = addUserAPI + document.getElementById('username').value;
  await fetch(timeAddUsAPI);
  document.getElementById('username').value = "";
  fetchItems();
}

async function reloadAPI() {
  fetchItems();
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
  
    document.querySelector("#reload").addEventListener("click", reloadAPI);
    document.querySelector("#addUser").addEventListener("click", add);
    document.querySelector("#themeToggle").addEventListener("click", toggleTheme);
    fetchItems();
  });