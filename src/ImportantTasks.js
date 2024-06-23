const mainTitle = document.getElementById('main-title');
const todoTask = document.getElementById('todo-task');
const importantTasks = document.getElementById('important');

function renderImportantTasks() {
    mainTitle.textContent = importantTasks.textContent;
    if (todoTask.textContent.trim() == "") {
       todoTask.textContent = 'Yay! No Tasks!';
       return;
    }
  }

  export default renderImportantTasks;