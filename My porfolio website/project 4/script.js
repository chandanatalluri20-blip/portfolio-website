const taskInput = document.getElementById("taskInput");
const timeInput = document.getElementById("timeInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

const popup = document.getElementById("popup");
const popupMessage = document.getElementById("popupMessage");
const closePopup = document.getElementById("closePopup");

window.onload = loadTasks;

addBtn.addEventListener("click", addTask);
closePopup.addEventListener("click", () => {
  popup.classList.add("hidden");
});

function addTask() {
  const taskText = taskInput.value.trim();
  const reminderTime = timeInput.value;

  if (taskText === "") {
    showPopup("⚠️ Please enter a task!");
    return;
  }

  createTaskElement(taskText, false, reminderTime);
  saveTask(taskText, false, reminderTime);

  taskInput.value = "";
  timeInput.value = "";
}

function createTaskElement(taskText, isDone, reminderTime) {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = taskText + (reminderTime ? ` ⏰ (${reminderTime})` : "");

  if (isDone) li.classList.add("done");

  span.addEventListener("click", () => {
    li.classList.toggle("done");
    updateTaskStatus(taskText, li.classList.contains("done"));
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";
  deleteBtn.style.border = "none";
  deleteBtn.style.background = "transparent";
  deleteBtn.style.cursor = "pointer";
  deleteBtn.addEventListener("click", () => {
    taskList.removeChild(li);
    deleteTask(taskText);
  });

  li.appendChild(span);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

function saveTask(taskText, isDone, reminderTime) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text: taskText, done: isDone, time: reminderTime, reminded: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => createTaskElement(task.text, task.done, task.time));
}

// Update status
function updateTaskStatus(taskText, isDone) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.map(task =>
    task.text === taskText ? { ...task, done: isDone } : task
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Delete task
function deleteTask(taskText) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(task => task.text !== taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Show popup
function showPopup(message) {
  popupMessage.textContent = message;
  popup.classList.remove("hidden");
}

// Reminder check every 20 seconds
setInterval(() => {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const now = new Date();

  tasks.forEach((task, index) => {
    if (task.time && !task.done && !task.reminded) {
      let reminderDate = new Date(task.time);
      if (now >= reminderDate) {
        showPopup(`⏰ Reminder: ${task.text}`);
        tasks[index].reminded = true; // mark as reminded
      }
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}, 20000);
