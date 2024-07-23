import { formatDistance, subDays, compareAsc, isToday } from "date-fns";
const mainTitle = document.getElementById('main-title');
const todoTask = document.getElementById('todo-task');
const todayTasks = document.getElementById('today');
const taskFormList = document.querySelector('.task-form-list');
const addTask = document.getElementById('add-task');
import { taskManager } from "./TaskProjectCreator";
import { createTaskElement } from "./TaskFormHandler";


export function renderTaskItems() {
    taskFormList.innerHTML = "";
    const tasksArray = taskManager.getAllTasks();


    if (tasksArray !== undefined) {
        tasksArray.forEach((taskArray) => {
            if (isToday(taskArray.date)) {
                taskFormList.appendChild(createTaskElement(taskArray));
            }
        })
    }
}



function renderTodayTasks() {
    mainTitle.textContent = todayTasks.textContent;
    addTask.classList.add('hidden');
    if (todoTask.textContent.trim() == "") {
        todoTask.textContent = 'Yay! No Tasks!';
        return;
    } else {
        renderTaskItems();
    }
}

export default renderTodayTasks;