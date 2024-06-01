const mainTitle = document.getElementById('main-title');
const todoList = document.getElementById('todo-list');
const todayTasks = document.getElementById('today');

function renderTodayTasks() {
    mainTitle.textContent = todayTasks.textContent;
    if (todoList.textContent.trim() == "") {
        todoList.textContent = 'Yay! No Tasks!';
        return;
     }
}

export default renderTodayTasks;