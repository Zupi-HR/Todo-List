const mainTitle = document.getElementById('main-title');
const todoList = document.getElementById('todo-list');
const allTasks = document.getElementById('all-tasks');


function renderAllTasks() {
  mainTitle.textContent = allTasks.textContent;
  if (todoList.textContent.trim() == "") {
     todoList.textContent = 'Yay! No Tasks!';
     return;
  }
}

export default renderAllTasks;