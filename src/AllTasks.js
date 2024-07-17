const mainTitle = document.getElementById('main-title');
const todoTask = document.getElementById('todo-task');
const allTasks = document.getElementById('all-tasks');
const taskFormList = document.querySelector('.task-form-list');
const addTask = document.getElementById('add-task');
import { taskManager } from "./TaskProjectCreator";
import { createTaskElement } from "./TaskFormHandler";



function renderTaskItem() {
  taskFormList.innerHTML = "";
  const tasksArray = taskManager.getAllTasks();

  if (tasksArray !== undefined) {
    for (let i = 0; i < tasksArray.length; i++) {
      for (let j = 0; j < tasksArray[i].length; j++) {
       taskFormList.appendChild(createTaskElement(tasksArray[i][j]));
      
      }
    }
  }

}

function renderAllTasks() {
  mainTitle.textContent = allTasks.textContent;
  addTask.classList.add('hidden');
  if (todoTask.textContent.trim() == "") {
    todoTask.textContent = 'Yay! No Tasks!';
    return;
  } else {
    renderTaskItem();
  }
}

export default renderAllTasks;