// Form
let inputForm = document.getElementById("input-form");
inputForm.addEventListener("submit", function (e) {
    e.preventDefault();
});

// Update Display
const updateDisplay = () => {
    let tasks = document.querySelector(".tasks");
    tasks.innerHTML = "";
}

// Get Todos
const getTodos = () => {
    updateDisplay();
    let tasks = document.querySelector(".tasks");
    if (!localStorage.getItem("todos")) {
        localStorage.setItem("todos", "[]");
    }
    let todos = localStorage.getItem("todos");
    let todolist = JSON.parse(todos);
    todolist.length === 0 ? tasks.innerHTML = "No tasks available..." : "";
    todolist.map((todo) => {
        tasks.innerHTML += `
                <li class="task">
                <div class="meta">
                <input type="checkbox" ${todo.isCompleted ? "checked" : ""} id="toggle" class="toggleStatus" data-id="${todo.id}">
                <label for="todo-list">${todo.todo}</label>
                </div>
                <div class="meta"><button class="remove" id="removeTodo" data-id="${todo.id}" title="Remove">✕</button></div>
                </li>
                `
    });
}

// Onload Event
document.addEventListener("DOMContentLoaded", () => {
    // getTodos
    getTodos();
});

// Remove Todo
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove")) {
        console.log(e.target.dataset.id);
        let todoId = Number(e.target.dataset.id);
        let todos = localStorage.getItem("todos");
        let todolist = JSON.parse(todos);
        let filTodos = todolist.filter((todo) => todoId !== todo.id);
        console.log(filTodos)
        localStorage.setItem("todos", JSON.stringify(filTodos));
        updateDisplay();
        getTodos();
    }
});

// Add Todo
const addTodo = document.getElementById("addTodo");
addTodo.addEventListener("click", () => {
    let input = document.getElementById("inpTodo");
    let now = new Date();
    let newTodo = {
        id: Date.now(),
        todo: input.value,
        isCompleted: false
    }
    if (input.value == "") {
        alert("Please Enter The Task...");
        return;
    }

    if (!localStorage.getItem("todos")) {
        localStorage.setItem("todos", "[]");
    }
    let todos = localStorage.getItem("todos");
    let todolist = JSON.parse(todos);
    todolist.push(newTodo);
    input.value = "";
    localStorage.setItem("todos", JSON.stringify(todolist));
    updateDisplay();
    getTodos();
});

// Toggle Status
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("toggleStatus")) {
        let todoId = Number(e.target.dataset.id);
        let todos = JSON.parse(localStorage.getItem("todos"));
        todos.forEach((todo) => {
            if (todo.id === todoId) {
                todo.isCompleted = !todo.isCompleted;
            }
        });
        localStorage.setItem("todos", JSON.stringify(todos));
    }
});


// Completed todos
const completedTodos = document.getElementById("filter-complete");

completedTodos.addEventListener("click", () => {
    let tasks = document.querySelector(".tasks");
    updateDisplay();
    let todos = JSON.parse(localStorage.getItem("todos"));

    todos.forEach((todo) => {
        if (todo.isCompleted === true) {
            tasks.innerHTML += `
                <li class="task" data-id="${todo.id}">
                    <div class="meta">
                        <input type="checkbox" ${todo.isCompleted ? "checked" : ""} 
                            class="toggleStatus" data-id="${todo.id}">
                        <label>${todo.todo}</label>
                    </div>
                    <div class="meta">
                        <button class="remove" data-id="${todo.id}" title="Remove">✕</button>
                    </div>
                </li>
            `;
        }
    });
});


// Active todos
const activeTodos = document.getElementById("filter-active");
activeTodos.addEventListener("click", () => {
    let tasks = document.querySelector(".tasks");
    updateDisplay();
    let todos = JSON.parse(localStorage.getItem("todos"));
    todos.map((todo) => {
        todo.isCompleted === false ? tasks.innerHTML += `
                <li class="task">
                    <input type="checkbox" ${todo.isCompleted ? "checked" : ""} id="toggleStatus(${todo.id})" id="${todo.id}">
                    <label for="${todo.id}">${todo.todo}</label>
                    <div class="meta"><button class="remove" onclick="removeTodo" data-id="${todo.id}" title="Remove">✕</button></div>
                </li>`: ""
    });
});

// All todos
const allTodos = document.getElementById("filter-all");
allTodos.addEventListener("click", () => {
    getTodos();
});