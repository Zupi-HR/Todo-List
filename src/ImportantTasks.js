const mainTitle = document.getElementById('main-title');
const todoList = document.getElementById('todo-list');
const importantTasks = document.getElementById('important');

function renderImportantTasks() {
    mainTitle.textContent = importantTasks.textContent;
    if (todoList.textContent.trim() == "") {
       todoList.textContent = 'Yay! No Tasks!';
       return;
    }
  }

  export default renderImportantTasks;