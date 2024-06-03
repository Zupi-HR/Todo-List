//import createTodos from "./TodoProjectCreator";
import todosItemIcon from "./assets/materials_icon.svg"
import editIconElementImage from "./assets/edit_icon.svg";
//import { RenameProject, DeleteProject, GetProjects } from "./TodoProjectCreator";
import { todoManager } from "./TodoProjectCreator";

// DOM Element Selections
const projectFormElement = document.getElementById('project-form');
const projectsListElement = document.getElementById('projects_ul');
const todosListElement = document.getElementById('todos-list');
const projectInputField = document.getElementById('project_input');
const submitBTN = document.querySelector('.submit_btn');
const cancelBTN = document.querySelector('.cancel_btn');


let isOptionsMenuOpen = false;


function showProjectForm() {
    projectFormElement.classList.remove('hidden');
}

function hideProjectForm() {
    projectFormElement.classList.add('hidden');
}

submitBTN.addEventListener('click', (event) => {
    event.preventDefault();
    handleFormSubmission();
});

cancelBTN.addEventListener('click', (event) => {
    event.preventDefault();
   handleFormCancel();
})



function createTodoItemElement(item) {
    const todoDivElement = document.createElement('div');
    todoDivElement.setAttribute("data-project", item.id);
    todoDivElement.classList.add('todos-item');

    const iconElement = document.createElement('img');
    iconElement.src = todosItemIcon;

    const projectNameElement = document.createElement('p');
    projectNameElement.textContent = item.name;

    const editIconElement = document.createElement('img');
    editIconElement.style.display = "inline-block";
    editIconElement.style.marginLeft = "auto";
    editIconElement.src = editIconElementImage;
    editIconElement.addEventListener('click', (event) => {
        event.stopPropagation();
        createAndAppendOptionsMenu(todoDivElement);
        if (!isOptionsMenuOpen) {
            document.querySelector('body').addEventListener('click', closeOptionsMenu);
            isOptionsMenuOpen = true;
        }
    })

    todoDivElement.append(iconElement, projectNameElement, editIconElement);
    return todoDivElement;
}

function createAndAppendOptionsMenu(todoDivElement) {
    const optionMenu = document.createElement('div');
    optionMenu.classList.add("project-option");

    const renameProject = document.createElement('p');
    renameProject.id = "rename-project";
    renameProject.textContent = "Rename";
    handleRenameClick(renameProject);


    const deleteProject = document.createElement("p");
    deleteProject.id = "delete-project";
    deleteProject.textContent = "Delete";
    optionMenu.append(renameProject, deleteProject);
    todoDivElement.appendChild(optionMenu);
    handleDeleteClick(deleteProject);
}

function closeOptionsMenu() {
    document.querySelectorAll('.project-option').forEach((element) => {
        element.remove();
    })
    document.querySelector('body').removeEventListener('click', closeOptionsMenu)
    isOptionsMenuOpen = false;
}

function handleRenameClick(renameButtonElement) {
    renameButtonElement.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        const clickedRenameButton = event.currentTarget;
        const projectId = clickedRenameButton.parentNode.parentNode.getAttribute('data-project');
        showProjectForm();
        projectInputField.value += clickedRenameButton.parentNode.parentNode.querySelector('p').innerText;
        todoManager.renameTodoById(projectId, projectInputField.value);
        updateTodoListElements();
      confirmRenamedElement();
    })
}


function confirmRenamedElement() {
    
        submitBTN.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopImmediatePropagation();
            event.stopPropagation();
           
        })
}

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
        updateTodoListElementsIDs();
    })
}

function updateTodoListElements() {
    todosListElement.innerHTML = "";
    const todosItemsArray = todoManager.getTodos();
    todosItemsArray.forEach(todoItem => {
        todosListElement.appendChild(createTodoItemElement(todoItem));
    });
}


function updateTodoListElementsIDs() {
    const todosArray = todoManager.getTodos();
    const todoElements = document.querySelectorAll('.todos-item');
    console.log(todoElements);
    for (let index = 0; index < todosArray.length; index++) {
        todoElements[index].setAttribute("data-project", todosArray[index].id);
    }
}



function handleFormSubmission() {
    todosListElement.innerHTML = "";
    const todosItemsArray = todoManager.createTodo(projectInputField.value);
    todosItemsArray.forEach((todoItem) => {
        todosListElement.appendChild(createTodoItemElement(todoItem));
    })
    projectInputField.value = "";
    projectFormElement.classList.add('hidden');
}

function handleFormCancel() {
    projectInputField.value = "";
    hideProjectForm();
}




export { showProjectForm, handleFormSubmission, handleFormCancel };