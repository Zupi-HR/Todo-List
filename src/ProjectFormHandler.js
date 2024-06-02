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

let isOptionsMenuOpen = false;


function showProjectForm() {
    projectFormElement.classList.remove('hidden');
}


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
        updateTodoListElements();
    })
}


function updateTodoListElements() {
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






export { showProjectForm, handleFormSubmission };