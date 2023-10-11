const userInputBox = document.getElementById("userInputBox");
const insertButton = document.getElementById("insertButton");
const listsDiv = document.getElementById("lists");

// Initialize todos from local storage
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Function to add a task
function addTask(taskText, timeText) {
    const listItem = document.createElement("div");
    listItem.className = "list";

    const taskDiv = document.createElement("div");
    listItem.appendChild(taskDiv);

    const taskPara = document.createElement("p");
    taskPara.textContent = taskText;
    taskDiv.appendChild(taskPara);

    const timeElement = document.createElement("i");
    timeElement.textContent = timeText;
    taskDiv.appendChild(timeElement);

    const deleteButton = createButton("Delete", "delete-button");
    deleteButton.addEventListener("click", () => deleteTask(taskText));
    listItem.appendChild(deleteButton);

    const editButton = createButton("Edit", "edit-button");
    editButton.addEventListener("click", () => editTask(taskText));
    listItem.appendChild(editButton);

    listsDiv.appendChild(listItem);
}

// Function to create a button
function createButton(text, className) {
    const button = document.createElement("button");
    button.textContent = text;
    button.className = className;
    return button;
}

// Function to delete a task
function deleteTask(taskText) {
    todos = todos.filter((todo) => todo.task !== taskText);
    updateLocalStorage();
    updateTasks();
}

// Function to edit a task
function editTask(taskText) {
    const task = todos.find((todo) => todo.task === taskText);
    if (task) {
        userInputBox.value = task.task;
        deleteTask(taskText);
    }
}

// Function to update local storage
function updateLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Function to update tasks displayed on the page
function updateTasks() {
    listsDiv.innerHTML = "";
    todos.forEach((todo) => addTask(todo.task, todo.time));
}

// Event listener for adding a new task
insertButton.addEventListener("click", () => {
    const taskText = userInputBox.value.trim();
    if (taskText) {
        const currentTime = new Date().toLocaleString();
        todos.push({ task: taskText, time: currentTime });
        updateLocalStorage();
        updateTasks();
        userInputBox.value = "";
    }
});

// Event listener for Enter key press
document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        insertButton.click();
    }
});

// Initial display of tasks from local storage
updateTasks();
