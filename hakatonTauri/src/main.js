const { invoke } = window.__TAURI__.core;
const { emit } = window.__TAURI__.event;




async function closeWindow() {
  await invoke("close_window");
}

async function fetchItems() {
  const API_URL = "http://192.168.0.112:5000/items";
  const response = await fetch(API_URL);
  const items = await response.json();
  const output = document.getElementById("test");
  output.textContent = "";
  items.forEach(item => {
    const text = `${item.id}: ${item.name}`;
    output.textContent += text + "\n";
  });
};

window.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#close-btn").addEventListener("click", () => {
    closeWindow();
  });
    window.onload = fetchItems;
});