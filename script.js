const todoInput = document.getElementById("todoInput");
const addButton = document.getElementById("addButton");
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("todoCount");

let todos = [];

function renderTodos() {
todoList.innerHTML = "";
for (let i = 0; i < todos.length; i++) {
const todo = todos[i];
const li = document.createElement("li");
li.innerHTML = `<input type="checkbox" ${todo.completed ? "checked" : ""}> <span>${todo.title}
</span> <button id="delete-button" >Delete</button>`;
const deleteButton = li.querySelector("button");
deleteButton.addEventListener("click", () => {
todos.splice(i, 1);
localStorage.setItem("todos", JSON.stringify(todos));
renderTodos();
});
const checkbox = li.querySelector("input[type='checkbox']");
checkbox.addEventListener("change", () => {
todo.completed = !todo.completed;
localStorage.setItem("todos", JSON.stringify(todos));
renderTodos();
});
if (todo.completed) {
li.classList.add("completed");
}
todoList.appendChild(li);
}
todoCount.textContent = `Total: ${todos.length}`;
}

addButton.addEventListener("click", () => {
const title = todoInput.value.trim();
if (title) {
todos.push({ title, completed: false });
localStorage.setItem("todos", JSON.stringify(todos));
renderTodos();
todoInput.value = "";
}
});

// Retrieve todos from local storage on page load
if (localStorage.getItem("todos")) {
todos = JSON.parse(localStorage.getItem("todos"));
renderTodos();
}