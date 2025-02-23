document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("task-input");
    const addTaskButton = document.getElementById("add-task");
    const taskList = document.getElementById("task-list");
    const themeToggle = document.getElementById("theme-toggle");

    // Betöltés localStorage-ból
    loadTasks();

    addTaskButton.addEventListener("click", addTask);
    taskInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") addTask();
    });

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        themeToggle.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
        localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
    });

    // Sötét mód beállítás visszatöltése
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
        themeToggle.textContent = "☀️";
    }

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === "") return;

        const li = document.createElement("li");
        li.innerHTML = `
            <span>${taskText}</span>
            <button class="delete">❌</button>
        `;

        li.addEventListener("click", () => {
            li.classList.toggle("completed");
            saveTasks();
        });

        li.querySelector(".delete").addEventListener("click", (e) => {
            e.stopPropagation();
            li.remove();
            saveTasks();
        });

        taskList.appendChild(li);
        taskInput.value = "";
        saveTasks();
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll("#task-list li").forEach((li) => {
            tasks.push({
                text: li.querySelector("span").textContent,
                completed: li.classList.contains("completed"),
            });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach((task) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${task.text}</span>
                <button class="delete">❌</button>
            `;

            if (task.completed) li.classList.add("completed");

            li.addEventListener("click", () => {
                li.classList.toggle("completed");
                saveTasks();
            });

            li.querySelector(".delete").addEventListener("click", (e) => {
                e.stopPropagation();
                li.remove();
                saveTasks();
            });

            taskList.appendChild(li);
        });
    }
});
