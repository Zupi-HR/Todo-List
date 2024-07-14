const mainTitle = document.getElementById('main-title');
const taskForm = document.getElementById('task-form');
const addTaskBtn = document.getElementById('add-task');
const taskFormSubmit = document.getElementById('task-form-submit');
const taskFormList = document.querySelector('.task-form-list');
const editTaskForm = document.getElementById('editTaskForm');
const editTaskFormSubmit = document.getElementById('editTask-form-submit');
const editTaskFormCancel = document.getElementById('editTask-form-cancel');

import editIconImage from "./assets/edit_icon.svg";
import { taskManager } from "./TaskProjectCreator";
let isOptionsMenuOpen = false;


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

    listTodo.append(taskItemCheckboxInput, listDetails, taskItemDate, editIcon);

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
        const taskID = event.currentTarget.parentNode.parentNode.getAttribute('task-project');
        const belongsTo = addTaskBtn.getAttribute('belongs_to');
        taskManager.deleteTaskById(belongsTo, taskID);
        event.currentTarget.parentNode.parentNode.remove();
        updateTaskListIds(belongsTo);
    })
}

function updateTaskListIds(position) {
  const taskArray = taskManager.getTasks(position);
  console.log(taskArray);
  const taskElements = document.querySelectorAll('.task-item');
  for (let index = 0; index < taskArray.length; index++) {
    taskElements[index].setAttribute('task-project', taskArray[index].id);
    
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

        taskManager.editTask(addTaskBtn.getAttribute('belongs_to'), taskProject.getAttribute('task-project'), editTaskTitle, editTaskDetails, editTaskDate);

        const tasksArray = taskManager.getTasks(addTaskBtn.getAttribute('belongs_to'));
        currentTaskTitle.textContent = tasksArray[taskProject.getAttribute('task-project')].title;
        currentTaskDetails.textContent = tasksArray[taskProject.getAttribute('task-project')].details;
        currentTaskDate.textContent = tasksArray[taskProject.getAttribute('task-project')].date;
        console.log(tasksArray[taskProject.getAttribute('task-project')]);

        clearInputFields();
        editTaskForm.classList.add('hidden');
        taskProject.classList.remove('hidden');
        editTaskFormSubmit.removeEventListener('click', handleEditTaskFormSubmit);
        
        console.log(taskProject);
    }

    editTaskForm.classList.remove('hidden');
    taskFormList.insertBefore(editTaskForm, taskProject);
    taskProject.classList.add('hidden');
    populateEditFormTask(taskProject);
    editTaskFormSubmit.addEventListener('click', handleEditTaskFormSubmit);
  
}


function populateEditFormTask(taskProject) {
    const editTaskTitle = document.getElementById('editTaskTitle');
    const editTaskDetails = document.getElementById('editTaskDetails');
    const editTaskDate = document.getElementById('editTaskDate');

    const currentTaskTitle = taskProject.querySelector('.task-title').textContent;
    const currentTaskDetails = taskProject.querySelector('.task-details').textContent;
    const currentTaskDate = taskProject.querySelector('.task-date').textContent;

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
    taskForm.classList.remove('hidden');
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    taskFormList.innerHTML = "";

    renderTaskItem();
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



export { renderTodoItemDetails }