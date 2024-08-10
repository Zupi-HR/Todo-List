const { addDays, isToday, differenceInCalendarDays } = require("date-fns");
const mainTitle = document.getElementById('main-title');
const todoTask = document.getElementById('todo-task');
const next7DaysTasks = document.getElementById('next-7-days');
const taskFormList = document.querySelector('.TaskItemsContainer');
const addTask = document.getElementById('add-task');
import { taskManager } from "./TaskProjectCreator";
import { TaskElementFactory } from "./TaskFormHandler";


export function renderTaskItems() {
   taskFormList.innerHTML = "";
   const tasksArray = taskManager.getAllTasks();
   const currentDate = new Date();
   const next7daysFromCurrentDate = addDays(currentDate, 7);

   if (tasksArray !== undefined) {
      tasksArray.forEach((task) => {
         if (differenceInCalendarDays(task.date, currentDate) > 0 && differenceInCalendarDays(task.date, currentDate) < 8) {
            const newFactory = new TaskElementFactory(task);
            taskFormList.appendChild(newFactory.createTaskElement());
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