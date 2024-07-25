const { format } = require("date-fns");

const mainTitle = document.getElementById('main-title');
const taskForm = document.getElementById('task-form');
const addTaskBtn = document.getElementById('add-task');
const taskFormSubmit = document.getElementById('task-form-submit');
const taskFormCancel = document.getElementById('task-form-cancel');
const taskFormList = document.querySelector('.task-form-list');
const editTaskForm = document.getElementById('editTaskForm');
const editTaskFormSubmit = document.getElementById('editTask-form-submit');
const editTaskFormCancel = document.getElementById('editTask-form-cancel');

import editIconImage from "./assets/edit_icon.svg";
import importantIconImage from "./assets/important-star.png";
import { taskManager } from "./TaskProjectCreator";
import {renderTaskItems as renderTodayTaskElements} from "./TodayTasks";
import { renderTaskItems as renderNext7DaysTaskElements } from "./Next7DaysTasks";
import { renderTaskItems as renderImportantTaskElements } from "./ImportantTasks";
let isOptionsMenuOpen = false;


function createTaskElement(item) {
    const listTodo = document.createElement('li');
    listTodo.classList.add('task-item');
    listTodo.id = item.id;

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
    taskItemDate.textContent = (item.date !== "") ? format(item.date, 'dd/MMM/yyyy') : "";
    console.log('formatirani datum je:', taskItemDate.textContent);
    taskItemDate.classList.add('task-date');

    const importantIcon = document.createElement('img');
    importantIcon.classList.add('important-icon');
    importantIcon.src = importantIconImage;


    const importantIconClicked = document.createElement('div');
   importantIconClicked.classList.add('important-icon_clicked', 'hidden');



   importantIcon.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    event.currentTarget.classList.add('important-icon', 'hidden');
    importantIconClicked.classList.remove('hidden');
    item.important = !item.important;
    refreshTaskList();
})

   importantIconClicked.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    importantIcon.classList.remove('hidden');
    event.currentTarget.classList.add('important-icon_clicked', 'hidden');
    item.important = false;
    refreshTaskList();
   })

   if (item.important) {
    importantIcon.classList.add('important-icon', 'hidden');
    importantIconClicked.classList.remove('hidden');
   }
    
   

    const editIcon = document.createElement('img');
    editIcon.src = editIconImage;
    editIcon.style.display = 'inline-block';

    editIcon.addEventListener('click', (event) => {
        event.preventDefault();
        closeOptionsMenu();

        setTimeout(() => {
            createAndAppendOptionsMenu(listTodo);
            if (!isOptionsMenuOpen) {
                document.querySelector('body').addEventListener('click', closeOptionsMenu);
                isOptionsMenuOpen = true;
            }
        }, 300)
    })


    taskItemCheckboxInput.addEventListener('change', () => {
        if (taskItemCheckboxInput.checked) {
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

    listTodo.append(taskItemCheckboxInput, listDetails, taskItemDate, importantIcon, importantIconClicked, editIcon);

    return listTodo;

}

function createAndAppendOptionsMenu(tasksItem) {
    const optionMenu = document.createElement('div');
    optionMenu.classList.add("option", "tasks-option");

    const editOption = document.createElement('p');
    editOption.id = `edit-option_${tasksItem.getAttribute('task-project')}`;
    editOption.textContent = 'Edit';
    handleEditClick(editOption);

    const deleteOption = document.createElement('p');
    deleteOption.id = `delete-ootion_${tasksItem.getAttribute('task-project')}`;
    deleteOption.textContent = 'Delete';
    handleDeleteClick(deleteOption);

    optionMenu.append(editOption, deleteOption);
    tasksItem.appendChild(optionMenu);
}

function closeOptionsMenu() {
    document.querySelectorAll('.tasks-option').forEach((element) => {
        element.remove();
    })
    document.querySelector('body').removeEventListener('click', closeOptionsMenu);
    isOptionsMenuOpen = false;
}

function handleEditClick(editOption) {
    editOption.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();

        const parentTaskList = event.currentTarget.parentNode.parentNode;
        console.log(parentTaskList);
        showEditFormTask(parentTaskList)
    })
}

function handleDeleteClick(deleteOption) {
    deleteOption.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        const taskID = event.currentTarget.parentNode.parentNode.id;
        console.log('id za brisat je:', taskID);
        const belongsToID = addTaskBtn.getAttribute('belongs_to');
        const belongsTo = document.querySelector(`.todos-item[data-project="${belongsToID}"]`).querySelector('p').textContent;
        console.log('aktivan projekt je', belongsTo);
        taskManager.deleteTaskById(taskID);
        event.currentTarget.parentNode.parentNode.remove();
        updateTaskListIds(belongsTo);
    })
}

function updateTaskListIds(belongsTo) {
    const taskArray = taskManager.getTasks(belongsTo);
    console.log("taskarray filteran je", taskArray);
    const taskElements = document.querySelectorAll('.task-item');
    for (let index = 0; index < taskArray.length; index++) {
        taskElements[index].id = taskArray[index].id;

    }
}

function showEditFormTask(taskProject) {
    function handleEditTaskFormSubmit(event) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        const currentTaskTitle = taskProject.querySelector('.task-title');
        const currentTaskDetails = taskProject.querySelector('.task-details');
        const currentTaskDate = taskProject.querySelector('.task-date');

        const editTaskTitle = document.getElementById('editTaskTitle').value;
        const editTaskDetails = document.getElementById('editTaskDetails').value;
        const editTaskDate = document.getElementById('editTaskDate').value;
        console.log("id od itema za editiranje u dom je: ", taskProject.id);
        taskManager.editTask(taskProject.id, editTaskTitle, editTaskDetails, editTaskDate);

       
        console.log(tasksArray, "jeeeee");
        currentTaskTitle.textContent = tasksArray[taskProject.id].title;
        currentTaskDetails.textContent = tasksArray[taskProject.id].details;
        currentTaskDate.textContent = (tasksArray[taskProject.id].date !== "") ? format(tasksArray[taskProject.id].date, 'dd/MMM/yyyy') : "";
        
        clearInputFields();
        editTaskForm.classList.add('hidden');
        taskProject.classList.remove('hidden');
        refreshTaskList();
        editTaskFormSubmit.removeEventListener('click', handleEditTaskFormSubmit);
        console.log(taskProject);
    }

    editTaskForm.classList.remove('hidden');
    taskFormList.insertBefore(editTaskForm, taskProject);
    taskProject.classList.add('hidden');
    const tasksArray = taskManager.getAllTasks();
    populateEditFormTask(tasksArray, taskProject.id);
    editTaskFormSubmit.addEventListener('click', handleEditTaskFormSubmit);

    function handleEditTaskFormCancel() {
        clearInputFields();
        editTaskForm.classList.add('hidden');
        taskProject.classList.remove('hidden');
        refreshTaskList();
        editTaskFormCancel.removeEventListener('click', handleEditTaskFormCancel);
        
    }

    editTaskFormCancel.addEventListener('click', handleEditTaskFormCancel);
    
}

function refreshTaskList() {
    const currentHomePageTitle = document.querySelector('#main-title').textContent.trim();
    console.log(currentHomePageTitle);

    switch (currentHomePageTitle) {
        case 'Today':
            renderTodayTaskElements();
            break;

        case 'Next 7 Days':
            renderNext7DaysTaskElements();
            break;

        case 'Important':
             renderImportantTaskElements();
             break;   
        default:
            console.log("nema ništa");
            break;
    }
}


function populateEditFormTask(tasksArray, currentID) {
    const editTaskTitle = document.getElementById('editTaskTitle');
    const editTaskDetails = document.getElementById('editTaskDetails');
    const editTaskDate = document.getElementById('editTaskDate');

    const currentTaskTitle = tasksArray[currentID].title;
    const currentTaskDetails = tasksArray[currentID].details;
    const currentTaskDate = tasksArray[currentID].date;

    editTaskTitle.value = currentTaskTitle;
    editTaskDetails.value = currentTaskDetails;
    editTaskDate.value = currentTaskDate;

}



function isTaskFinished(task, elementToFade, checkbox) {
    if (task.finished) {
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
    const inputDate =  document.getElementById('date').value;
    const currentProject = document.querySelector(`[data-project="${taskForm.getAttribute('belongs_to')}"]`);
    const belongsTo = currentProject.querySelector('p').textContent;
    console.log(belongsTo);
    const tasksArray = taskManager.createTask(belongsTo, inputTitle, inputDetails, inputDate);
    tasksArray.forEach((taskItem) => {
        taskFormList.appendChild(createTaskElement(taskItem));
    })

    console.log(inputTitle, inputDetails, inputDate);
}

function displayTasksList(belongsTo) {
    taskFormList.innerHTML = "";
    const tasksArray = taskManager.getTasks(belongsTo);
    if (tasksArray !== undefined) {
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
    displayTasksList(event.currentTarget.querySelector('p').textContent);
    addTaskBtn.setAttribute('belongs_to', projectID);
    addTaskBtn.classList.remove('hidden');
}

addTaskBtn.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    taskForm.classList.remove('hidden');

    const addTaskCurrentID = event.currentTarget.getAttribute('belongs_to');
    taskForm.setAttribute('belongs_to', addTaskCurrentID);
})

function handleTaskFormSubmission(event) {
    taskForm.classList.remove('hidden');
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    taskFormList.innerHTML = "";

    renderTaskItem();
    clearInputFields();
    taskForm.classList.add('hidden');

}

function handleTaskFormCancel(event) {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    clearInputFields();
    taskForm.classList.add('hidden');

}


function clearInputFields() {
    const inputFields = document.querySelectorAll('.task-input-field');
    inputFields.forEach((inputField) => {
        inputField.value = "";
    })
}

taskFormSubmit.addEventListener('click', handleTaskFormSubmission);
taskFormCancel.addEventListener('click', handleTaskFormCancel);



export { renderTodoItemDetails, addTaskBtn, createTaskElement }