const mainTitle = document.getElementById('main-title');
const taskForm = document.getElementById('task-form');
const addTaskBtn = document.getElementById('add-task');
const taskFormSubmit = document.getElementById('task-form-submit');
const taskFormList = document.querySelector('.task-form-list');



function renderTodoItemDetails(event) {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    mainTitle.textContent = event.currentTarget.querySelector('p').textContent;
    addTaskBtn.classList.remove('hidden');
}

addTaskBtn.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
   taskForm.classList.remove('hidden');
})

function handleTaskFormSubmission(event) {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    const inputTitle = document.getElementById('title').value;
    const inputDetails = document.getElementById('details').value;
    const inputDate = document.getElementById('date').value;

    console.log(inputTitle, inputDetails, inputDate);
}

function createTaskElement(title, details, Date) {
   const listItem = document.createElement('li');
   
}

taskFormSubmit.addEventListener('click', handleTaskFormSubmission);


export { renderTodoItemDetails }