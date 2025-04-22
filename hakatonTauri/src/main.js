const { invoke } = window.__TAURI__.core;
const { emit } = window.__TAURI__.event;


const getAPI = "http://192.168.0.112:5000/getItems";
const addUserAPI = "http://192.168.0.112:5000/addUser?name=";

async function closeWindow() {
  await invoke("close_window");
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
};

async function add() {
  let timeAddUsAPI = addUserAPI + document.getElementById('username').value;
  await fetch(timeAddUsAPI);
  document.getElementById('username').value = "";
  fetchItems();
}

async function reloadAPI(params) {
  fetchItems();
}

window.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#closeBtn").addEventListener("click", () => {
    closeWindow();
  });
  document.querySelector("#reload").addEventListener("click", () => {
    reloadAPI();
  });
    window.onload = fetchItems;
  document.querySelector("#addUser").addEventListener("click", () => {
    add();
  });
});