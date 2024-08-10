const mainTitle = document.getElementById('main-title');
const todoTask = document.getElementById('todo-task');
const allTasks = document.getElementById('all-tasks');
const taskFormList = document.querySelector('.TaskItemsContainer');
const addTask = document.getElementById('add-task');
import { taskManager } from "./TaskProjectCreator";
import { TaskElementFactory } from "./TaskFormHandler";



function renderTaskItem() {
  taskFormList.innerHTML = "";
  const tasksArray = taskManager.getAllTasks();

  if (tasksArray !== undefined) {
   tasksArray.forEach((task) => {
    const newFactory = new TaskElementFactory(task);
    taskFormList.appendChild(newFactory.createTaskElement());
   })
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