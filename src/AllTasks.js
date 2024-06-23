const mainTitle = document.getElementById('main-title');
const todoTask = document.getElementById('todo-task');
const allTasks = document.getElementById('all-tasks');


function renderAllTasks() {
  mainTitle.textContent = allTasks.textContent;
  if (todoTask.textContent.trim() == "") {
     todoTask.textContent = 'Yay! No Tasks!';
     return;
  }
}

export default renderAllTasks;