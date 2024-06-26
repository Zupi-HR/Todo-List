const mainTitle = document.getElementById('main-title');
const taskForm = document.getElementById('task-form');
const addTaskBtn = document.getElementById('add-task');
const taskFormSubmit = document.getElementById('task-form-submit');
const taskFormList = document.querySelector('.task-form-list');
import editIconImage from "./assets/edit_icon.svg";
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
    isTaskFinished(item, listDetails, taskItemCheckboxInput);

    const taskItemDate = document.createElement('div');
    taskItemDate.textContent = item.date;
    taskItemDate.classList.add('task-date');

    const editIcon = document.createElement('img');
    editIcon.src = editIconImage;
    editIcon.style.display = 'inline-block';
    
    

    taskItemCheckboxInput.addEventListener('change', () => {
        if(taskItemCheckboxInput.checked) {
            item.finished = true;
            console.log('checkboc je chekcan');
            console.log(item.finished);
            listDetails.classList.add('fadeColor');
        } else {
            item.finished = false;
            console.log('checkbox je uncheckan');
            console.log(item.finished);
            listDetails.classList.remove('fadeColor');
        }
    })
 
    listTodo.append(taskItemCheckboxInput,listDetails, taskItemDate, editIcon);
 
    return listTodo;
    
 }

 function isTaskFinished(task, elementToFade, checkbox) {
    if(task.finished) {
       // document.querySelector(`task-project="${task.id}"`);
      elementToFade.classList.add('fadeColor');
      checkbox.checked = true;
    } else {
        elementToFade.classList.remove('fadeColor');
        checkbox.checked = false;
    }
 }


function renderTaskItem() {
    taskFormList.innerHTML = "";
    const inputTitle = document.getElementById('title').value;
    const inputDetails = document.getElementById('details').value;
    const inputDate = document.getElementById('date').value;

    const tasksArray = taskManager.createTask(addTaskBtn.getAttribute('belongs_to'), inputTitle, inputDetails, inputDate);

    tasksArray.forEach((taskItem) => {
        taskFormList.appendChild(createTaskElement(taskItem));
    })

    console.log(inputTitle, inputDetails, inputDate);
}

function displayTasksList(projectID) {
    taskFormList.innerHTML = "";
    const tasksArray = taskManager.getTasks(projectID);
    if(tasksArray !== undefined) {
        tasksArray.forEach((taskItem) => {
            taskFormList.appendChild(createTaskElement(taskItem));
        })
    } 
    
}

function renderTodoItemDetails(event) {
    event.preventDefault();
    event.stopPropagation();
    const projectID = parseInt(event.currentTarget.getAttribute('data-project'));
    console.log("projectID je:", projectID);
    mainTitle.textContent = event.currentTarget.querySelector('p').textContent;
    displayTasksList(projectID);
    addTaskBtn.setAttribute('belongs_to', projectID);
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