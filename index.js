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
                    <input type="checkbox" ${todo.isCompleted ? "checked" : ""} onclick="status(${todo.id})" id="${todo.id}">
                    <label for="${todo.id}">${todo.todo}</label>
                    <div class="meta"><button class="remove" onclick="removeTodo(${todo.id})" title="Remove">✕</button></div>
                    </li>
                    `
    });
}
getTodos();

// Remove Todo
const removeTodo = (todoId) => {
    let todos = localStorage.getItem("todos");
    let todolist = JSON.parse(todos);
    let filTodos = todolist.filter((todo) => todo.id !== todoId);
    updateDisplay();
    localStorage.setItem("todos", JSON.stringify(filTodos));
    getTodos();
}

// Add Todo
let now = new Date();
const addTodo = () => {
    let input = document.getElementById("inpTodo");
    let newTodo = {
        id: Date.now(),
        todo: input.value,
        isCompleted: false
    }
    if(input.value == ""){
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
}

// Status
const status = (todoId) => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    todos.filter((todo) => {
        if (todo.id === todoId) {
            todo.isCompleted = !todo.isCompleted;
            localStorage.setItem("todos", JSON.stringify(todos));
        }
    });
}

// Completed todos
const completedTodos = () => {
    let tasks = document.querySelector(".tasks");
    updateDisplay();
    let todos = JSON.parse(localStorage.getItem("todos"));
    todos.map((todo) => {
        todo.isCompleted === true ? tasks.innerHTML += `
                <li class="task">
                    <input type="checkbox" ${todo.isCompleted ? "checked" : ""} onclick="status(${todo.id})" id="${todo.id}">
                    <label for="${todo.id}">${todo.todo}</label>
                    <div class="meta"><button class="remove" onclick="removeTodo(${todo.id})" title="Remove">✕</button></div>
                </li>`: "";
    })
}

// Active todos
const activeTodos = () => {
    let tasks = document.querySelector(".tasks");
    updateDisplay();
    let todos = JSON.parse(localStorage.getItem("todos"));
    todos.map((todo) => {
        todo.isCompleted === false ? tasks.innerHTML += `
                <li class="task">
                    <input type="checkbox" ${todo.isCompleted ? "checked" : ""} onclick="status(${todo.id})" id="${todo.id}">
                    <label for="${todo.id}">${todo.todo}</label>
                    <div class="meta"><button class="remove" onclick="removeTodo(${todo.id})" title="Remove">✕</button></div>
                </li>`: ""
    })

}
