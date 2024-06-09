
import todosItemIcon from "./assets/materials_icon.svg"
import editIconImage from "./assets/edit_icon.svg";
import { todoManager } from "./TodoProjectCreator";

// DOM Element Selections
const projectForm = document.getElementById('project-form');
const projectList = document.getElementById('projects_ul');
const todoList = document.getElementById('todos-list');

const projectInput = document.getElementById('project_input');
const submitButton = document.getElementById('submit-btn');
const cancelButton = document.getElementById('cancel-btn');

const renameForm = document.getElementById('rename-form');
const renameProjectInput = document.getElementById('rename-input');
const renameSubmitButton = document.getElementById('rename-submit-btn');
const renameCancelButton = document.getElementById('rename-cancel-btn');

//State variable to track if the options menu is open
let isOptionsMenuOpen = false;


function showProjectForm() {
    projectForm.classList.remove('hidden');
}

function hideProjectForm() {
    projectInput.value = "";
    projectForm.classList.add('hidden');
}


function submitRenameHandler(todoItemSelected) {
    renameForm.classList.remove('hidden');
    renameProjectInput.value = "";
    todoList.insertBefore(renameForm, todoItemSelected);
    todoItemSelected.classList.add('hidden');
    const todoItemSelectedID = todoItemSelected.getAttribute('data-project');
    const TodoContentElement = todoItemSelected.querySelector('p');
    renameProjectInput.value = TodoContentElement.textContent;
    function onRenameSubmit(event) {
        event.preventDefault();
        
        todoManager.renameTodoById(todoItemSelectedID, renameProjectInput.value);
        renameForm.classList.add('hidden');
        projectList.prepend(renameForm);
        todoItemSelected.classList.remove('hidden');
        const arrayItems = todoManager.getTodos();
        console.log(arrayItems.length);
        arrayItems.forEach((item, index) => {
            console.log(item.name);
        });
        updateTodoList();
    }
    renameSubmitButton.removeEventListener('click', onRenameSubmit);
    renameSubmitButton.addEventListener('click', onRenameSubmit)
}






function hideRenameProjectForm() {
    renameForm.classList.add('hidden');
}


//Function to create a new todo item element
function createTodoItemElement(item) {
    const todoItem = document.createElement('div');
    todoItem.setAttribute("data-project", item.id);
    todoItem.classList.add('todos-item');

    const todoIcon = document.createElement('img');
    todoIcon.src = todosItemIcon;

    const todoName = document.createElement('p');
    todoName.textContent = item.name;

    const editIcon = document.createElement('img');
    editIcon.style.display = "inline-block";
    editIcon.style.marginLeft = "auto";
    editIcon.src = editIconImage;
    editIcon.addEventListener('click', (event) => {
        event.stopPropagation();
        createAndAppendOptionsMenu(todoItem);
        if (!isOptionsMenuOpen) {
            document.querySelector('body').addEventListener('click', closeOptionsMenu);
            isOptionsMenuOpen = true;
        }
    })

    todoItem.append(todoIcon, todoName, editIcon);
    return todoItem;
}
//Function to create and append the options menu to a todo item element
function createAndAppendOptionsMenu(todoItem) {
    const optionsMenu = document.createElement('div');
    optionsMenu.classList.add("project-option");

    const renameOption = document.createElement('p');
    renameOption.id = "rename-project";
    renameOption.textContent = "Rename";


    const deleteOption = document.createElement("p");
    deleteOption.id = "delete-project";
    deleteOption.textContent = "Delete";
    optionsMenu.append(renameOption, deleteOption);
    todoItem.appendChild(optionsMenu);
    handleRenameClick(renameOption);
    handleDeleteClick(deleteOption);
}

function closeOptionsMenu() {
    document.querySelectorAll('.project-option').forEach((element) => {
        element.remove();
    })
    document.querySelector('body').removeEventListener('click', closeOptionsMenu)
    isOptionsMenuOpen = false;
}

//Function to handle the rename button click event
function handleRenameClick(renameButtonElement) {
    renameButtonElement.addEventListener('click', (event) => {
        event.preventDefault();
       // event.stopPropagation();
       // event.stopImmediatePropagation();
        const todoItemSelected = event.currentTarget.parentNode.parentNode;
        console.log(todoItemSelected);
        submitRenameHandler(todoItemSelected);
        console.log("vbsdds");


    })
    // confirmRenameSubmission();
}

//Function to handle the form submission for renaming
function confirmRenameSubmission() {
    submitButton.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();
        event.stopPropagation();
        console.log('rename submit clicked');
    })
}

//Function to handle the delete button click event
function handleDeleteClick(deleteButtonElement) {
    deleteButtonElement.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        const clickedDeleteButton = event.currentTarget;
        const projectId = clickedDeleteButton.parentNode.parentNode.getAttribute('data-project');
        todoManager.deleteTodoById(projectId);
        console.log(projectId);
        clickedDeleteButton.parentNode.parentNode.remove();
        updateTodoListIDs();
    })
}

//function to update the todo list elements
function updateTodoList() {
    todoList.innerHTML = "";
    const todosArray = todoManager.getTodos();
    todosArray.forEach(todoItem => {
        todoList.appendChild(createTodoItemElement(todoItem));
    });
}

//Function to update the IDs of the todo list elements
function updateTodoListIDs() {
    const todosArray = todoManager.getTodos();
    const todoElements = document.querySelectorAll('.todos-item');
    console.log(todoElements);
    for (let index = 0; index < todosArray.length; index++) {
        todoElements[index].setAttribute("data-project", todosArray[index].id);
    }
}

submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    handleFormSubmission();
});

cancelButton.addEventListener('click', (event) => {
    event.preventDefault();
    hideProjectForm();
})


//Function to handle form submission
function handleFormSubmission() {
    todoList.innerHTML = "";
    const todosArray = todoManager.createTodo(projectInput.value);
    todosArray.forEach((todoItem) => {
        todoList.appendChild(createTodoItemElement(todoItem));
    })
    projectInput.value = "";
    projectForm.classList.add('hidden');
}


export { showProjectForm };