import { Task } from "./Task";

export class TaskList {
  constructor() {
    this.getLocalStorage();
  }

  create(task) {
    this.tasks.push(task);
    this.saveLocalStorage();
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter((task) => task.id !== +id);
    this.saveLocalStorage();
  }

  toggleStatus(id) {
    for (const task of this.tasks) {
      if (task.id === +id) {
        task.status = !task.status;
        this.saveLocalStorage();
        break;
      }
    }
  }

  deleteComplete() {
    this.tasks = this.tasks.filter((task) => !task.status);
    this.saveLocalStorage();
  }

  saveLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  getLocalStorage() {
    this.tasks = localStorage.getItem("tasks")
      ? JSON.parse(localStorage.getItem("tasks"))
      : [];

    this.tasks = this.tasks.map(Task.fromJSON);
  }
}
