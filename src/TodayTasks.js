const mainTitle = document.getElementById('main-title');
const todoTask = document.getElementById('todo-task');
const todayTasks = document.getElementById('today');

function renderTodayTasks() {
    mainTitle.textContent = todayTasks.textContent;
    if (todoTask.textContent.trim() == "") {
        todoTask.textContent = 'Yay! No Tasks!';
        return;
     }
}

export default renderTodayTasks;