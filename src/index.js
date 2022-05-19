import "./styles.css";
import { TaskList } from "./classes";
import  {createTemplateTask} from  "./components/components";

export const taskList = new TaskList();

taskList.tasks.forEach(createTemplateTask);
console.log(taskList);


