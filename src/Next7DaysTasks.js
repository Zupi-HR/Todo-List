const mainTitle = document.getElementById('main-title');
const todoTask = document.getElementById('todo-task');
const next7DaysTasks = document.getElementById('next-7-days');

function renderNext7DaysTasks() {
    mainTitle.textContent = next7DaysTasks.textContent;
    if (todoTask.textContent.trim() == "") {
       todoTask.textContent = 'Yay! No Tasks!';
       return;
    }
  }

  export default renderNext7DaysTasks;