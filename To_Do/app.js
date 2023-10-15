document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("task");
    const addButton = document.getElementById("add");
    const taskList = document.getElementById("taskList");

    addButton.addEventListener("click", function() {
        const taskText = taskInput.value;
        if (taskText.trim() !== "") {
            const li = document.createElement("li");
            li.innerHTML = `
                <span class="task">${taskText}</span>
                <span class="edit">Edit</span>
                <span class="delete">Delete</span>
            `;
            taskList.appendChild(li);
            taskInput.value = "";

            li.querySelector(".delete").addEventListener("click", function() {
                taskList.removeChild(li);
            });

            li.querySelector(".edit").addEventListener("click", function() {
                const taskSpan = li.querySelector(".task");
                const newText = prompt("Edit task:", taskSpan.textContent);
                if (newText !== null) {
                    taskSpan.textContent = newText;
                }
            });
        }
    });

    taskInput.addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            addButton.click();
        }
    });
});
