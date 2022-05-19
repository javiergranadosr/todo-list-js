export class Task {
  static fromJSON({ id, task, status, createdAt }) {
    const tempTask = new Task(task);
    tempTask.id = id;
    tempTask.status = status;
    tempTask.createdAt = createdAt;

    return tempTask;
  }

  constructor(task) {
    this.id = new Date().getTime();
    this.task = task;
    this.status = false;
    this.createdAt = new Date();
  }
}
