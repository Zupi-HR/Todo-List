const mainTitle = document.getElementById('main-title');
const taskForm = document.getElementById('task-form');
const addTaskBtn = document.getElementById('add-task');
const taskFormSubmit = document.getElementById('task-form-submit');
const taskFormList = document.querySelector('.task-form-list');
import { taskManager } from "./TaskProjectCreator";

function createTaskElement(item) {
    const listTodo = document.createElement('li');
    listTodo.setAttribute("task-project", item.id);
    listTodo.classList.add('task-item');
 
    const taskItemCheckboxInput = document.createElement('input');
    taskItemCheckboxInput.setAttribute('type', 'checkbox');
    taskItemCheckboxInput.id = "task-item-checkbox";
 
    const listDetails = document.createElement('div');
    listDetails.classList.add('list-details');
 
    const taskItemTitle = document.createElement('h3');
    taskItemTitle.classList.add('task-title');
    taskItemTitle.textContent = item.title;
 
    const taskItemDetails = document.createElement('p');
    taskItemDetails.textContent = item.details;
    taskItemDetails.classList.add('task-details');
 
    listDetails.append(taskItemTitle, taskItemDetails);

    const taskItemDate = document.createElement('div');
    taskItemDate.textContent = item.date;
    taskItemDate.classList.add('task-date');

    taskItemCheckboxInput.addEventListener('change', () => {
        if(taskItemCheckboxInput.checked) {
            console.log('checkboc je chekcan');
            listDetails.classList.add('fadeColor');
        } else {
            console.log('checkbox je uncheckan');
            listDetails.classList.remove('fadeColor');
        }
    })
 
    listTodo.append(taskItemCheckboxInput,listDetails, taskItemDate);
 
    return listTodo;
    
 }


function renderTaskItem() {
    const inputTitle = document.getElementById('title').value;
    const inputDetails = document.getElementById('details').value;
    const inputDate = document.getElementById('date').value;

    const tasksArray = taskManager.createTask(inputTitle, inputDetails, inputDate);

    tasksArray.forEach((taskItem) => {
        taskFormList.appendChild(createTaskElement(taskItem));
    })

    console.log(inputTitle, inputDetails, inputDate);
}

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

    taskFormList.innerHTML = "";

    renderTaskItem();
    clearInputFields();
    
}


function clearInputFields() {
    const inputFields = document.querySelectorAll('.task-input-field');
    inputFields.forEach((inputField) => {
        inputField.value = "";
    })
}

taskFormSubmit.addEventListener('click', handleTaskFormSubmission);


export { renderTodoItemDetails }