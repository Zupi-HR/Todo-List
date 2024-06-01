import createTodos from "./TodoProjectCreator";
import todosItemIcon from "./assets/materials_icon.svg"
import editIconElementImage from "./assets/edit_icon.svg";
import { RenameProject, DeleteProject, GetProjects } from "./TodoProjectCreator";

// DOM Element Selections
const projectFormElement = document.getElementById('project-form');
const projectsListElement = document.getElementById('projects_ul');
const todosListElement = document.getElementById('todos-list');
const projectInputField = document.getElementById('project_input');


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
    editIconElement.addEventListener('click', () => {
        createAndAppendOptionsMenu(todoDivElement);
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

function handleDeleteClick(deleteButtonElement) {
  deleteButtonElement.addEventListener('click', (event) => {
    const clickedDeleteButton = event.currentTarget;
    clickedDeleteButton.parentNode.parentNode.remove();
    console.log(clickedDeleteButton.parentNode.parentNode.getAttribute('data-project'));
    DeleteProject.delete(clickedDeleteButton.parentNode.parentNode.getAttribute('data-project'));
  })
}


function handleFormSubmission() {
    todosListElement.innerHTML = "";
    const todosItemsArray = createTodos(projectInputField.value);
    todosItemsArray.forEach((todoItem) => {
        todosListElement.appendChild(createTodoItemElement(todoItem));
    })
    projectInputField.value = "";
    projectFormElement.classList.add('hidden');
}






export { showProjectForm, handleFormSubmission };