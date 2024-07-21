const { addDays, isToday, differenceInCalendarDays } = require("date-fns");
const mainTitle = document.getElementById('main-title');
const todoTask = document.getElementById('todo-task');
const next7DaysTasks = document.getElementById('next-7-days');
const taskFormList = document.querySelector('.task-form-list');
const addTask = document.getElementById('add-task');
import { taskManager } from "./TaskProjectCreator";
import { createTaskElement } from "./TaskFormHandler";


function renderTaskItems() {
   taskFormList.innerHTML = "";
   const tasksArray = taskManager.getAllTasks();
   const currentDate = new Date();
   const next7daysFromCurrentDate = addDays(currentDate, 7);

   if (tasksArray !== undefined) {
      tasksArray.forEach((taskArray) => {
         if (differenceInCalendarDays(taskArray.date, currentDate) > 0 && differenceInCalendarDays(taskArray.date, currentDate) < 8) {
            taskFormList.appendChild(createTaskElement(taskArray));
         }
      })
   }
}


function renderNext7DaysTasks() {
   mainTitle.textContent = next7DaysTasks.textContent;
   addTask.classList.add('hidden');
   if (todoTask.textContent.trim() == "") {
      todoTask.textContent = 'Yay! No Tasks!';
      return;
   } else {
      renderTaskItems();
   }
}

export default renderNext7DaysTasks;