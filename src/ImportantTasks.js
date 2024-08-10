const mainTitle = document.getElementById('main-title');
const todoTask = document.getElementById('todo-task');
const importantTasks = document.getElementById('important');
const taskFormList = document.querySelector('.TaskItemsContainer');
const addTask = document.getElementById('add-task');
import { taskManager } from "./TaskProjectCreator";
import { TaskElementFactory } from "./TaskFormHandler";


export function renderTaskItems() {
   taskFormList.innerHTML = "";
   const tasksArray = taskManager.getAllTasks();
   if (tasksArray !== undefined) {
      tasksArray.forEach((task) => {
         if (task.important) {
            const newFactory = new TaskElementFactory(task);
            taskFormList.appendChild(newFactory.createTaskElement());
         }
      })
   }
}


function renderImportantTasks() {
   mainTitle.textContent = importantTasks.textContent;
   addTask.classList.add('hidden');
   if (todoTask.textContent.trim() == "") {
      todoTask.textContent = 'Yay! No Tasks!';
      return;
   } else {
      renderTaskItems();
   }
}

export default renderImportantTasks;