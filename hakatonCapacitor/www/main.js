const getAPI = "http://192.168.0.112:5000/getItems";
const addUserAPI = "http://192.168.0.112:5000/addUser?name=";

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
  const name = document.getElementById('username').value;
  document.getElementById('username').value = "";
  fetchItems();
}

window.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#closeBtn").addEventListener("click", () => {
    alert("Close window not supported in Capacitor browser app.");
  });
  document.querySelector("#reload").addEventListener("click", fetchItems);
  document.querySelector("#addUser").addEventListener("click", add);
  fetchItems();
});