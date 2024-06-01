const mainTitle = document.getElementById('main-title');
const todoList = document.getElementById('todo-list');
const next7DaysTasks = document.getElementById('next-7-days');

function renderNext7DaysTasks() {
    mainTitle.textContent = next7DaysTasks.textContent;
    if (todoList.textContent.trim() == "") {
       todoList.textContent = 'Yay! No Tasks!';
       return;
    }
  }

  export default renderNext7DaysTasks;