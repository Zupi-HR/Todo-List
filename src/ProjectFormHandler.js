
import todosItemIcon from "./assets/materials_icon.svg"
import editIconImage from "./assets/edit_icon.svg";
import { todoManager } from "./TodoProjectCreator";
import { renderTodoItemDetails, addTaskBtn } from "./TaskFormHandler";
import { taskManager } from "./TaskProjectCreator";

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
const mainTitle = document.getElementById('main-title');
const taskFormList = document.querySelector('.task-form-list');


//State variable to track if the options menu is open
let isOptionsMenuOpen = false;


function showProjectForm() {
    projectForm.classList.remove('hidden');
}

function hideProjectForm() {
    projectInput.value = "";
    projectForm.classList.add('hidden');
}

function showRenameForm(todoItemText) {
    function handleRenameSubmit(event) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        const todoItemID = todoItemText.parentNode.getAttribute('data-project');
    
        //Rename the todo item using the input value
        todoManager.renameTodoById(todoItemID, renameProjectInput.value);

        //Get the updated list of todos
        const todosArray = todoManager.getTodos();
        todoItemText.textContent = todosArray[todoItemID].name;
        mainTitle.textContent = todosArray[todoItemID].name;
        console.log(todosArray[todoItemID].name);

        //Clear the input field and hide the form
        renameProjectInput.value = "";
        renameForm.classList.add('hidden');
        currentProject.classList.remove('hidden');
        renameSubmitButton.removeEventListener('click', handleRenameSubmit);
        renameCancelButton.removeEventListener('click', handleRenameCancel);
    }

    function handleRenameCancel(event) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        renameProjectInput.value = "";
        renameForm.classList.add('hidden');
        currentProject.classList.remove('hidden');
        renameCancelButton.removeEventListener('click', handleRenameCancel);
        renameSubmitButton.removeEventListener('click', handleRenameSubmit);
        closeOptionsMenu();
    }

    renameSubmitButton.removeEventListener('click', handleRenameSubmit);
    renameForm.classList.remove('hidden');
    renameProjectInput.value = todoItemText.textContent;
    const currentProject = todoItemText.parentNode;
    todoList.insertBefore(renameForm, currentProject);
    currentProject.classList.add('hidden');

    renameSubmitButton.addEventListener('click', handleRenameSubmit);

    renameCancelButton.removeEventListener('click', handleRenameCancel);
    renameCancelButton.addEventListener('click', handleRenameCancel);


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
        event.preventDefault();
        closeOptionsMenu();
        setTimeout(() => {
            createAndAppendOptionsMenu(todoItem);
            if (!isOptionsMenuOpen) {
                document.querySelector('body').addEventListener('click', closeOptionsMenu);
                isOptionsMenuOpen = true;
            }
        }, 300)
    })

    todoItem.append(todoIcon, todoName, editIcon);
    todoItem.removeEventListener('click', renderTodoItemDetails);
    todoItem.addEventListener('click', renderTodoItemDetails);
    return todoItem;
}
//Function to create and append the options menu to a todo item element
function createAndAppendOptionsMenu(todoItem) {
    const optionsMenu = document.createElement('div');
    optionsMenu.classList.add("option", "project-option");

    const renameOption = document.createElement('p');
    renameOption.id = `rename-project_${todoItem.getAttribute('data-project')}`;
    renameOption.textContent = "Rename";
    handleRenameClick(renameOption);

    console.log("id od rename option" + renameOption.id);
    const deleteOption = document.createElement("p");
    deleteOption.id = `delete-project_${todoItem.getAttribute('data-project')}`;
    deleteOption.textContent = "Delete";
    handleDeleteClick(deleteOption);

    optionsMenu.append(renameOption, deleteOption);
    todoItem.appendChild(optionsMenu);

}

function closeOptionsMenu() {
    document.querySelectorAll('.project-option').forEach((element) => {
        element.remove();
    })
    document.querySelector('body').removeEventListener('click', closeOptionsMenu);
    isOptionsMenuOpen = false;
}



//Function to handle the rename button click event
function handleRenameClick(renameButtonElement) {
    renameButtonElement.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        const clickedRenameButton = event.currentTarget;
        const todoItemText = clickedRenameButton.parentNode.parentNode.querySelector('p');
        
        showRenameForm(todoItemText);

        console.log("text content od parrent node je: " + todoItemText);
        const projectID = clickedRenameButton.parentNode.parentNode.getAttribute('data-project');
        console.log("id je" + projectID);

        console.log("div je :" + clickedRenameButton.parentNode.parentNode.getAttribute('data-project'));
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
        const textContent = clickedDeleteButton.parentNode.parentNode.querySelector('p').textContent;
        todoManager.deleteTodoById(projectId, textContent);
        console.log(projectId);
        clickedDeleteButton.parentNode.parentNode.remove();
        deleteAllTasks();
        mainTitle.textContent = "No Project Selected";
      //  addTaskBtn.removeAttribute('belongs_to');
        addTaskBtn.classList.add('hidden');
        updateTodoListIDs();
    })
}

function deleteAllTasks() {
    while(taskFormList.firstChild) {
        taskFormList.removeChild(taskFormList.firstChild);
    }
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