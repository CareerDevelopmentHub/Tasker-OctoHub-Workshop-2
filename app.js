const textBox = document.getElementById("userInputBox");
const addButton = document.getElementById("insertButton");

// * Add event listener to the button

addButton.addEventListener("click", () => {
  if (!textBox.value) return;
  const currentTime = new Date().toLocaleString();
  user_input = textBox.value;
  textBox.value = "";
  addListItem(user_input, currentTime);
  saveLocalTodos({ task: user_input, time: currentTime });
  getTodos();
});

const deleteTodo = (e) => {
  const item = e.target;
  if (item.classList[0] === "deleteButton") {
    const todo = item.parentElement;
    todo.remove();
    const todos = JSON.parse(localStorage.getItem("todos"));
    const newTodos = todos.filter(
      (todo) => todo.task !== item.parentElement.querySelector("p").textContent
    );
    localStorage.setItem("todos", JSON.stringify(newTodos));
    getTodos();
  }
};

const editTodo = (e) => {
  const item = e.target;
  if (item.classList[0] === "editButton") {
    const todo = item.parentElement;
    const task = todo.querySelector("p");
    const taskText = task.textContent;
    textBox.value = taskText;
    todo.remove();
    const todos = JSON.parse(localStorage.getItem("todos"));
    const newTodos = todos.filter((todo) => todo.task !== taskText);
    localStorage.setItem("todos", JSON.stringify(newTodos));
    getTodos();
  }
};

document.addEventListener("click", deleteTodo);
document.addEventListener("click", editTodo);

// * Value holders

let user_input = "";

// * Function to add the user input to the list

function addListItem(taskText, timeText) {
  // Create new list item
  let listItem = document.createElement("div");
  listItem.className = "list";

  // Create task div
  let taskDiv = document.createElement("div");
  listItem.appendChild(taskDiv);

  // Create task paragraph
  let taskPara = document.createElement("p");
  taskPara.textContent = taskText;
  taskDiv.appendChild(taskPara);

  // Create time element
  let timeElement = document.createElement("i");
  timeElement.textContent = timeText;
  taskDiv.appendChild(timeElement);

  // Create delete button
  let deleteButton = document.createElement("button");
  deleteButton.className = "deleteButton";
  deleteButton.textContent = "Delete";
  listItem.appendChild(deleteButton);

  // Create edit button
  let editButton = document.createElement("button");
  editButton.className = "editButton";
  editButton.textContent = "Edit";
  listItem.appendChild(editButton);

  // Append new list item to the lists div
  let listsDiv = document.querySelector(".lists");
  listsDiv.appendChild(listItem);
}

const saveLocalTodos = (todo) => {
  // Check if there is already a todo list
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    // If there is already a todo list, get it
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  // Add the new todo to the list
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
};

const getTodos = () => {
  // clear the list

  let listsDiv = document.querySelector(".lists");
  listsDiv.innerHTML = "";
  // Check if there is already a todo list
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    // If there is already a todo list, get it
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach((todo) => {
    addListItem(todo?.task, todo?.time);
  });
};

// on enter press

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addButton.click();
  }
});

document.addEventListener("DOMContentLoaded", getTodos);

Shery.mouseFollower({
    //Parameters are optional.
    
    skew: false,
    ease : "cubic-bezier(0.23, 1, 0.320, 1)",
    duration: 0,
  });
  Shery.makeMagnet(".magnet-target" /* Element to target.*/, {
    //Parameters are optional.
    ease: "cubic-bezier(0.23, 1, 0.320, 1)",
    duration: 1,
  });
 






