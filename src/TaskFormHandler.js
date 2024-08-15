const { format } = require("date-fns");

const mainTitle = document.getElementById('main-title');
const taskForm = document.getElementById('task-form');
const addTaskBtn = document.getElementById('add-task');
const taskFormSubmit = document.getElementById('task-form-submit');
const taskFormCancel = document.getElementById('task-form-cancel');
const taskItemsContainer = document.querySelector('.TaskItemsContainer');
const editTaskForm = document.getElementById('editTaskForm');
const editTaskFormSubmit = document.getElementById('editTask-form-submit');
const editTaskFormCancel = document.getElementById('editTask-form-cancel');

import editIconImage from "./assets/edit_icon.svg";
import importantIconImage from "./assets/important-star.png";
import { taskManager } from "./TaskProjectCreator";
import { renderTaskItems as renderTodayTaskElements } from "./TodayTasks";
import { renderTaskItems as renderNext7DaysTaskElements } from "./Next7DaysTasks";
import { renderTaskItems as renderImportantTaskElements } from "./ImportantTasks";
let isOptionsMenuOpen = false;


class TaskFormManager {
    static showForm(formElement) {
        formElement.classList.remove('hidden');
    }

    static hideForm(formElement) {
        formElement.value = "";
        formElement.classList.add('hidden');
    }

    static handleTaskFormSubmission(event) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();

        taskItemsContainer.innerHTML = "";

        renderTaskItem();
        TaskFormManager.clearInputFields();
        TaskFormManager.hideForm(taskForm);

    }

    static handleTaskFormCancel(event) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        TaskFormManager.clearInputFields();
        taskForm.classList.add('hidden');
        refreshTaskList();
    }

    static clearInputFields() {
        const inputFields = document.querySelectorAll('.task-input-field');
        inputFields.forEach((inputField) => {
            inputField.value = "";
        })
    }
}

class TaskElementFactory {
    constructor(taskItem) {
        this.taskItem = taskItem;
    }

    createTaskElement() {
        const taskItemElement = document.createElement('li');
        taskItemElement.classList.add('task-item');
        taskItemElement.id = this.taskItem.id;

        const taskItemCheckboxInput = this.createCheckboxElement();
        const taskDetails = this.createTaskDetails();
        const taskItemDate = this.createTaskDate();
        const importantIcon = this.createImportantIcon();
        const importantIconClicked = this.createImportantIconClicked();
        const editIcon = this.createEditIcon();

        const checkboxEventHandler = new TaskEventHandler(taskItemCheckboxInput, taskItemElement);
        checkboxEventHandler.attachCheckboxEvent(taskDetails, this.taskItem);

        const importantIconEventHandler = new TaskEventHandler(importantIcon, this.taskItem);
        importantIconEventHandler.attachImportantIconEvent(importantIconClicked);

        const editIconEventHandler = new TaskEventHandler(editIcon, this.taskItem);
        editIconEventHandler.attachEditIconEvent(taskItemElement);

        isTaskFinished(this.taskItem, taskDetails, taskItemCheckboxInput);

        importantIconClicked.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
            taskManager.updateTaskImportantProperty(event.currentTarget.parentNode.id);
            importantIcon.classList.remove('hidden');
            event.currentTarget.classList.add('important-icon_clicked', 'hidden');
            refreshTaskList();
        })

        if (this.taskItem.important) {
            importantIcon.classList.add('important-icon', 'hidden');
            importantIconClicked.classList.remove('hidden');
        }

        taskItemElement.append(taskItemCheckboxInput, taskDetails, taskItemDate, importantIcon, importantIconClicked, editIcon);
        return taskItemElement;
    }

    createCheckboxElement() {
        const taskItemCheckboxInput = document.createElement('input');
        taskItemCheckboxInput.setAttribute('type', 'checkbox');
        taskItemCheckboxInput.id = "task-item-checkbox";
        return taskItemCheckboxInput;
    }

    createTaskDetails() {
        const listDetails = document.createElement('div');
        listDetails.classList.add('list-details');

        const taskItemTitle = document.createElement('h3');
        taskItemTitle.classList.add('task-title');
        taskItemTitle.textContent = this.taskItem.title;

        const taskItemDetails = document.createElement('p');
        taskItemDetails.textContent = this.taskItem.details;
        taskItemDetails.classList.add('task-details');

        listDetails.append(taskItemTitle, taskItemDetails);
        return listDetails;
    }

    createTaskDate() {
        const taskItemDate = document.createElement('div');
        taskItemDate.textContent = (this.taskItem.date !== "") ? format(this.taskItem.date, 'dd/MMM/yyyy') : "";
        console.log('formatirani datum je:', taskItemDate.textContent);
        taskItemDate.classList.add('task-date');
        return taskItemDate;
    }

    createImportantIcon() {
        const importantIcon = document.createElement('img');
        importantIcon.classList.add('important-icon');
        importantIcon.src = importantIconImage;
        const attachEventHandler = new TaskEventHandler()
        return importantIcon;
    }

    createImportantIconClicked() {
        const importantIconClicked = document.createElement('div');
        importantIconClicked.classList.add('important-icon_clicked', 'hidden');
        return importantIconClicked;
    }

    createEditIcon() {
        const editIcon = document.createElement('img');
        editIcon.classList.add('edit-icon');
        editIcon.src = editIconImage;
        return editIcon;
    }

    createAndAppendOptionsMenu(taskElement) {
        const optionsMenu = document.createElement('div');
        optionsMenu.classList.add("option", "tasks-option", "hidden");

        const editOption = document.createElement('p');
        editOption.id = `edit-option`;
        editOption.textContent = 'Edit';
        const editOptionEventHandler = new TaskEventHandler();
        editOptionEventHandler.attachTaskEditEvent(editOption);

        const deleteOption = document.createElement('p');
        deleteOption.id = `delete-option_${taskElement.id}`;
        deleteOption.textContent = 'Delete';
        const deleteEventHandler = new TaskEventHandler(deleteOption, taskElement);
        deleteEventHandler.attachTaskDeleteEvent();

        optionsMenu.append(editOption, deleteOption);
        return optionsMenu;
    }
}


class TaskEventHandler {
    constructor(element, taskItem) {
        this.element = element;
        this.taskItem = taskItem;
    }

    attachCheckboxEvent(taskDetails, taskItemArray) {
        this.element.addEventListener('change', () => {
            if (this.element.checked) {
                console.log(taskItemArray);
                taskItemArray.finished = true;
                taskDetails.classList.add('fadeColor');

            } else {
                console.log(taskItemArray);
                taskItemArray.finished = false;
                taskDetails.classList.remove('fadeColor');
            }
        })
    }

    attachImportantIconEvent(importantIconClicked) {
        this.element.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
            taskManager.updateTaskImportantProperty(event.currentTarget.parentNode.id);
            event.currentTarget.classList.add('important-icon', 'hidden');
            importantIconClicked.classList.remove('hidden');
            refreshTaskList();
        })
    }

    attachEditIconEvent(taskElement) {
        this.element.addEventListener('click', (event) => {
            event.preventDefault();
            closeOptionsMenu();

            setTimeout(() => {
                const optionsMenuFactory = new TaskElementFactory();
                const optionsMenu = optionsMenuFactory.createAndAppendOptionsMenu(taskElement);
                optionsMenu.classList.remove('hidden');
                taskElement.appendChild(optionsMenu);
                if (!isOptionsMenuOpen) {
                    document.querySelector('body').addEventListener('click', closeOptionsMenu);
                    isOptionsMenuOpen = true;
                }
            }, 300)
        })
    }

    attachTaskEditEvent(editOption) {
        editOption.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();

            const currentTaskElement = event.currentTarget.parentNode.parentNode;
            console.log("Parent element of clicked edit option is: ", currentTaskElement);
            const taskEditFormHandler = new TaskEditFormHandler(currentTaskElement);
            console.log('Edit clicked for task Element', currentTaskElement.id);
            taskEditFormHandler.showEditFormTask();
        })
    }

    attachTaskDeleteEvent() {
        this.element.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
            console.log('working with:', this.element, this.taskItem);
            const taskID = this.taskItem.id;
            console.log('id za brisat je:', taskID);
            const belongsToID = addTaskBtn.getAttribute('belongs_to');
            const belongsTo = document.querySelector(`.project-item[data-project="${belongsToID}"]`).querySelector('p').textContent;
            console.log('aktivan projekt je', belongsTo);
            taskManager.deleteTaskById(taskID);
            event.currentTarget.parentNode.parentNode.remove();
            updateTaskListIds(belongsTo);
        })
    }
}

class TaskEditFormHandler {
    constructor(currentTaskElement) {
        this.currentTaskElement = currentTaskElement;
        this.handleEditTaskFormSubmit = this.handleEditTaskFormSubmit.bind(this);
        this.handleEditTaskFormCancel = this.handleEditTaskFormCancel.bind(this);
    }

    showEditFormTask() {
        console.log('Editing task element:', this.currentTaskElement.id);
        ensureEditFormPresence();
        editTaskForm.classList.remove('hidden');
        this.populateEditFormTask();

        taskItemsContainer.insertBefore(editTaskForm, this.currentTaskElement)

        this.currentTaskElement.classList.add('hidden');

        editTaskFormSubmit.removeEventListener('click', this.handleEditTaskFormSubmit);
        editTaskFormSubmit.addEventListener('click', this.handleEditTaskFormSubmit);

        editTaskFormCancel.removeEventListener('click', this.handleEditTaskFormCancel);
        editTaskFormCancel.addEventListener('click', this.handleEditTaskFormCancel);
    }

    populateEditFormTask() {
        const editTaskTitle = document.getElementById('editTaskTitle');
        const editTaskDetails = document.getElementById('editTaskDetails');
        const editTaskDate = document.getElementById('editTaskDate');

        const tasksArray = taskManager.getAllTasks();

        console.log(tasksArray[this.currentTaskElement.id].title);
        const currentTaskTitle = tasksArray[this.currentTaskElement.id].title;
        const currentTaskDetails = tasksArray[this.currentTaskElement.id].details;
        const currentTaskDate = tasksArray[this.currentTaskElement.id].date;

        console.log(editTaskTitle);
        console.log(editTaskDetails);
        console.log(editTaskDate);

        editTaskTitle.value = currentTaskTitle;
        editTaskDetails.value = currentTaskDetails;
        editTaskDate.value = currentTaskDate;
    }

    handleEditTaskFormSubmit(event) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        console.log('Submitting Edit for task Element: ', this.currentTaskElement.id);
        const tasksArray = taskManager.getAllTasks();

        const currentTaskTitle = this.currentTaskElement.querySelector('.task-title');
        const currentTaskDetails = this.currentTaskElement.querySelector('.task-details');
        const currentTaskDate = this.currentTaskElement.querySelector('.task-date');

        const editTaskTitle = document.getElementById('editTaskTitle').value;
        const editTaskDetails = document.getElementById('editTaskDetails').value;
        const editTaskDate = document.getElementById('editTaskDate').value;
        taskManager.editTask(this.currentTaskElement.id, editTaskTitle, editTaskDetails, editTaskDate);

        currentTaskTitle.textContent = tasksArray[this.currentTaskElement.id].title;
        currentTaskDetails.textContent = tasksArray[this.currentTaskElement.id].details;
        currentTaskDate.textContent = (tasksArray[this.currentTaskElement.id].date !== "") ? format(tasksArray[this.currentTaskElement.id].date, 'dd/MMM/yyyy') : "";

        TaskFormManager.clearInputFields();
        document.getElementById('todo-task').insertBefore(editTaskForm, taskItemsContainer);
        editTaskForm.classList.add('hidden');
        this.currentTaskElement.classList.remove('hidden');
        refreshTaskList();
        editTaskFormSubmit.removeEventListener('click', this.handleEditTaskFormSubmit);
        editTaskFormCancel.removeEventListener('click', this.handleEditTaskFormCancel);
    }

    handleEditTaskFormCancel(event) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        TaskFormManager.clearInputFields();
        document.getElementById('todo-task').insertBefore(editTaskForm, taskItemsContainer);
        editTaskForm.classList.add('hidden');
        this.currentTaskElement.classList.remove('hidden');
        refreshTaskList();
        console.log('Cancel editing Task Element:', this.currentTaskElement.id);
        editTaskFormCancel.removeEventListener('click', this.handleEditTaskFormCancel);
        editTaskFormSubmit.removeEventListener('click', this.handleEditTaskFormSubmit);
        closeOptionsMenu();
    }

}

function closeOptionsMenu() {
    document.querySelectorAll('.tasks-option').forEach((element) => {
        element.remove();
    })
    document.querySelector('body').removeEventListener('click', closeOptionsMenu);
    isOptionsMenuOpen = false;
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
    console.log(taskElements);
    for (let index = 0; index < taskArray.length; index++) {
        taskElements[index].id = taskArray[index].id;
    }
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



function isTaskFinished(taskItemArray, elementToFade, checkbox) {
    if (taskItemArray.finished) {
        // document.querySelector(`task-project="${task.id}"`);
        elementToFade.classList.add('fadeColor');
        checkbox.checked = true;
    } else {
        elementToFade.classList.remove('fadeColor');
        checkbox.checked = false;
    }
}


function renderTaskItem() {
    taskItemsContainer.innerHTML = "";
    const inputTitle = document.getElementById('title').value;
    const inputDetails = document.getElementById('details').value;
    const inputDate = document.getElementById('date').value;
    const currentProject = document.querySelector(`[data-project="${taskForm.getAttribute('belongs_to')}"]`);
    const belongsTo = currentProject.querySelector('p').textContent;
    console.log(belongsTo);
    const tasksArray = taskManager.createTask(belongsTo, inputTitle, inputDetails, inputDate);
    tasksArray.forEach((taskItemElement) => {
        const newFactory = new TaskElementFactory(taskItemElement);
        taskItemsContainer.appendChild(newFactory.createTaskElement());
    })

    console.log(inputTitle, inputDetails, inputDate);
}

function displayTasksList(belongsTo) {
    taskItemsContainer.innerHTML = "";
    const tasksArray = taskManager.getTasks(belongsTo);
    if (tasksArray !== undefined) {
        tasksArray.forEach((taskItemElement) => {
            const newFactory = new TaskElementFactory(taskItemElement);
            taskItemsContainer.appendChild(newFactory.createTaskElement());
        })
    }

}

function renderProjectTasks(event) {
    event.preventDefault();
    event.stopPropagation();
    const projectID = parseInt(event.currentTarget.getAttribute('data-project'));
    mainTitle.textContent = event.currentTarget.querySelector('p').textContent;
    displayTasksList(event.currentTarget.querySelector('p').textContent);
    addTaskBtn.setAttribute('belongs_to', projectID);
    addTaskBtn.classList.remove('hidden');
}


addTaskBtn.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    TaskFormManager.showForm(taskForm);

    const addTaskCurrentID = event.currentTarget.getAttribute('belongs_to');
    taskForm.setAttribute('belongs_to', addTaskCurrentID);
})


function ensureEditFormPresence() {
    const editTaskForm = document.getElementById('editTaskForm');
    if (!editTaskForm) {
        console.error('Edit Task Form is not found in the DOM.');
        // Logic to reattach or recreate the form
    } else {
        console.log('Edit Task Form is present in the DOM.');
    }
}

taskFormSubmit.addEventListener('click', TaskFormManager.handleTaskFormSubmission);
taskFormCancel.addEventListener('click', TaskFormManager.handleTaskFormCancel);



export { renderProjectTasks, /* createTaskElement*/ TaskElementFactory, addTaskBtn }