import { Task } from "../classes";
import { taskList } from "../index";

const todoList = document.querySelector(".todo-list");
const newTask = document.querySelector(".new-todo");
const clearCompleted = document.querySelector(".clear-completed");
const ulFilters = document.querySelector(".filters");
const typeFilter = document.querySelectorAll(".filtro");

export const createTemplateTask = (task) => {
  const template = `<li class="${task.status ? "completed" : ""}" data-id="${
    task.id
  }">
    <div class="view">
        <input class="toggle" type="checkbox" ${task.status ? "checked" : ""}>
        <label>${task.task}</label>
        <button class="destroy"></button>
    </div>
    <input class="edit" value="Create a TodoMVC template">
</li>`;

  const div = document.createElement("div");
  div.innerHTML = template;
  todoList.append(div.firstElementChild); // Insertar solo el li, primer elemento del div
};

// Eventos

/**
 * * Evento enter
 */
newTask.addEventListener("keyup", (event) => {
  if (event.keyCode === 13 && newTask.value.length > 0) {
    const task = new Task(newTask.value);
    taskList.create(task);
    createTemplateTask(task);
    newTask.value = "";
  }
});

todoList.addEventListener("click", (event) => {
  const nameElement = event.target.localName; // Referencia del elemento seleccionado
  const taskElement = event.target.parentElement.parentElement; // Obtiene todo el li de la tarea
  const taskId = taskElement.getAttribute("data-id");

  if (nameElement.includes("input")) {
    taskList.toggleStatus(taskId);
    taskElement.classList.toggle("completed");
  }

  if (nameElement.includes("button")) {
    taskList.deleteTask(taskId);
    todoList.removeChild(taskElement);
  }
});

clearCompleted.addEventListener("click", () => {
  taskList.deleteComplete();
  for (let i = todoList.children.length - 1; i >= 0; i--) {
    const element = todoList.children[i];
    if (element.classList.contains("completed")) {
      todoList.removeChild(element);
    }
  }
});

ulFilters.addEventListener("click", (event) => {
  const filter = event.target.text;
  if (!filter) return;

  typeFilter.forEach((element) => element.classList.remove("selected"));
  event.target.classList.add("selected");

  for (const task of todoList.children) {
    task.classList.remove("hidden");
    const completed = task.classList.contains("completed");

    switch (filter) {
      case "Pendientes":
        if (completed) {
          task.classList.add("hidden");
        }
        break;

      case "Completados":
        if (!completed) {
          task.classList.add("hidden");
        }
        break;
    }
  }
});
