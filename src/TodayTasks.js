import { formatDistance, subDays, compareAsc, isToday } from "date-fns";
const mainTitle = document.getElementById('main-title');
const todoTask = document.getElementById('todo-task');
const todayTasks = document.getElementById('today');
const taskFormList = document.querySelector('.TaskItemsContainer');
const addTask = document.getElementById('add-task');
import { taskManager } from "./TaskProjectCreator";
import { TaskElementFactory } from "./TaskFormHandler";

export function renderTaskItems() {
    taskFormList.innerHTML = "";
    const tasksArray = taskManager.getAllTasks();


    if (tasksArray !== undefined) {
        tasksArray.forEach((task) => {
            if (isToday(task.date)) {
                const newFactory = new TaskElementFactory(task);
                taskFormList.appendChild(newFactory.createTaskElement());
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