
import projectItemIcon from "./assets/materials_icon.svg"
import editIconImage from "./assets/edit_icon.svg";
import { projectManager } from "./ProjectLogic";
import { renderTodoItemDetails, addTaskBtn } from "./TaskFormHandler";
import { taskManager } from "./ProjectLogic";

const projectForm = document.getElementById('project-form');
const projectsList = document.getElementById('projects-list');

const projectFormInput = document.getElementById('project_input');
const projectFormSubmitBTN = document.getElementById('submit-btn');
const projectFormCancelBTN = document.getElementById('cancel-btn');

const renameForm = document.getElementById('rename-form');
const renameProjectInput = document.getElementById('rename-input');
const renameSubmitButton = document.getElementById('rename-submit-btn');
const renameCancelButton = document.getElementById('rename-cancel-btn');
const mainTitle = document.getElementById('main-title');
const taskFormList = document.querySelector('.task-form-list');

let domElements = [];
let isOptionsMenuOpen = false;


class ProjectFormManager {
    static showForm(formElement) {
        formElement.classList.remove('hidden');
    }

    static hideForm(formElement) {
        formElement.value = "";
        formElement.classList.add('hidden');
    }
}

/*
class ProjectDOMHandler {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.element;
    }
    createProjectElement() {
        const projectElement = document.createElement('div');
        projectElement.setAttribute("data-project", this.id);
        projectElement.classList.add('project-item');

        const projectIcon = document.createElement('img');
        projectIcon.src = projectItemIcon;

        const projectName = document.createElement('p');
        projectName.textContent = this.name;

        const editIcon = document.createElement('img');
        editIcon.style.display = "inline-block";
        editIcon.style.marginLeft = "auto";
        editIcon.src = editIconImage;

        editIcon.removeEventListener('click', this.handleEditProject.bind(this));
        editIcon.addEventListener('click', this.handleEditProject.bind(this));

        projectElement.append(projectIcon, projectName, editIcon);
        this.element = projectElement;
    }

    insertProjectElement() {
        projectsList.appendChild(this.element);
    }

    renameProjectElement(newName) {
        console.log(this.element.querySelector('p'));
        this.element.querySelector('p').textContent = newName;
    };

    hideProjectElement() {
        this.element.classList.add('hidden');
        console.log(this.element);
    }

    showProjectElement() {
        this.element.classList.remove('hidden');
    }

    handleEditProject(event) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        this.closeAllOptionsMenu();
        setTimeout(() => {
            isOptionsMenuOpen = true;
            this.element.appendChild(this.createAndAttachOptionsMenu());
            if (isOptionsMenuOpen) {
                console.log(this.element);
                document.querySelector('body').addEventListener('click', this.closeAllOptionsMenu);
                isOptionsMenuOpen = false;
            }
        }, 300)

        console.log(domElements);
        // domElements[event.currentTarget.parentNode.getAttribute('data-project')].renameProjectElement(`Projekt broj ${event.currentTarget.parentNode.getAttribute('data-project')}`);
    }

    createAndAttachOptionsMenu() {
        const optionsMenu = document.createElement('div');
        optionsMenu.classList.add("option", "project-option");

        const renameOption = document.createElement('p');
        renameOption.id = `rename-project`;
        renameOption.textContent = "Rename";
        renameOption.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
            ProjectFormManager.showForm(renameForm);
            projectsList.insertBefore(renameForm, this.element);
            renameProjectInput.value = this.element.querySelector('p').textContent;
            this.hideProjectElement();
        })

        const deleteOption = document.createElement("p");
        deleteOption.id = `delete-project`;
        deleteOption.textContent = "Delete";

        optionsMenu.append(renameOption, deleteOption);
        return optionsMenu;

    };

    closeAllOptionsMenu() {
        console.log('close up opcija radi');
        document.querySelectorAll('.project-option').forEach((element) => {
            element.remove();
        })
        document.querySelector('body').removeEventListener('click', this.closeAllOptionsMenu);
        isOptionsMenuOpen = false;
    }
};

function handleProjectFormSubmission(event) {
    event.preventDefault();
    domElements = [];
    projectsList.innerHTML = "";
    const projects = projectManager.addProject(projectFormInput.value);
    projects.forEach(({ id, name }) => {
        const createdProjectDOM = new ProjectDOMHandler(id, name);
        domElements.push(createdProjectDOM);
        domElements[id].createProjectElement();
        domElements[id].insertProjectElement();
    });
    console.log(domElements);
    projectFormInput.value = "";
    ProjectFormManager.hideForm(projectForm);
}

projectFormSubmitBTN.removeEventListener('click', handleProjectFormSubmission);
projectFormSubmitBTN.addEventListener('click', handleProjectFormSubmission);

renameSubmitButton.addEventListener('click', (event) => {
    event.preventDefault();
    const inputValue = renameProjectInput.value;
    console.log(inputValue);
    const projects = document.querySelectorAll('.project-item');
    console.log(projects);
    projects.forEach((project) => {
        if (project.classList.contains('hidden')) {
            console.log('bfddfsfd');
            projectManager.updateProjectName(project.getAttribute('data-project'), inputValue);
            domElements[project.getAttribute('data-project')].renameProjectElement(inputValue);
            project.classList.remove('hidden');
            projectsList.insertBefore(project, renameForm);
            domElements[project.getAttribute('data-project')].closeAllOptionsMenu();
        };
    });
    renameProjectInput.value = "";
    ProjectFormManager.hideForm(renameForm);
});
*/

//OOP version



class ProjectElementFactory {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    createProjectElement() {
        const projectElement = document.createElement('div');
        projectElement.setAttribute("data-project", this.id);
        projectElement.classList.add('project-item');

        const projectIcon = document.createElement('img');
        projectIcon.src = projectItemIcon;

        const projectName = document.createElement('p');
        projectName.textContent = this.name;

        const editIcon = document.createElement('img');
        editIcon.style.display = "inline-block";
        editIcon.style.marginLeft = "auto";
        editIcon.src = editIconImage;
        editIcon.classList.add('projectEditIcon');

        projectElement.append(projectIcon, projectName, editIcon);
        projectElement.addEventListener('click', renderTodoItemDetails);
        return projectElement;
    }
}

class ProjectElementHandler {
    constructor(element) {
        this.element = element;
    }
    renameProjectElement(newName) {
        this.element.querySelector('p').textContent = newName;
    }

    attachEditIconEventListeners() {
        this.element.querySelector('.projectEditIcon').addEventListener('click', this.handleEditProject.bind(this));
    }

    handleEditProject(event) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        this.closeAllOptionsMenu();
        setTimeout(() => {
            isOptionsMenuOpen = true;
            this.element.appendChild(this.createAndAttachOptionsMenu());
            if (isOptionsMenuOpen) {
                console.log(this.element);
                document.querySelector('body').addEventListener('click', this.closeAllOptionsMenu);
                isOptionsMenuOpen = false;
            }
        }, 300)
        console.log(domElements);
        // domElements[event.currentTarget.parentNode.getAttribute('data-project')].renameProjectElement(`Projekt broj ${event.currentTarget.parentNode.getAttribute('data-project')}`);
    }

    createAndAttachOptionsMenu() {
        const optionsMenu = document.createElement('div');
        optionsMenu.classList.add("option", "project-option");

        const renameOption = document.createElement('p');
        renameOption.id = `rename-project`;
        renameOption.textContent = "Rename";
        renameOption.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
            ProjectFormManager.showForm(renameForm);
            projectsList.insertBefore(renameForm, this.element);
            renameProjectInput.value = this.element.querySelector('p').textContent;
            this.hideProjectElement();
        })

        const deleteOption = document.createElement("p");
        deleteOption.id = `delete-project`;
        deleteOption.textContent = "Delete";

        optionsMenu.append(renameOption, deleteOption);
        return optionsMenu;

    };

    

    closeAllOptionsMenu() {
        console.log('close up opcija radi');
        document.querySelectorAll('.project-option').forEach((element) => {
            element.remove();
        })
        document.querySelector('body').removeEventListener('click', this.closeAllOptionsMenu);
        isOptionsMenuOpen = false;
    }

    hideProjectElement() {
        this.element.classList.add('hidden');
        console.log(this.element);
    }

    showProjectElement() {
        this.element.classList.remove('hidden');
    }

}

function handleProjectFormSubmission(event) {
    event.preventDefault();
    domElements = [];
    projectsList.innerHTML = "";
    const projects = projectManager.addProject(projectFormInput.value);
    projects.forEach(({ id, name }) => {
        const newFactory = new ProjectElementFactory(id, name);
        domElements.push(newFactory.createProjectElement());
        const projectElementHandler = new ProjectElementHandler(domElements[id]);
        projectElementHandler.attachEditIconEventListeners();
        projectsList.appendChild(domElements[id]);
    });
    console.log(domElements);
    projectFormInput.value = "";
    ProjectFormManager.hideForm(projectForm);
}

projectFormSubmitBTN.addEventListener('click', handleProjectFormSubmission);

renameSubmitButton.addEventListener('click', (event) => {
    event.preventDefault();
    const inputValue = renameProjectInput.value;
    console.log(inputValue);
    const projects = document.querySelectorAll('.project-item');
    console.log(projects);
    projects.forEach((project) => {
        if (project.classList.contains('hidden')) {
            console.log('bfddfsfd');
            projectManager.updateProjectName(project.getAttribute('data-project'), inputValue);
            const projectElementHandler = new ProjectElementHandler(project);
            projectElementHandler.renameProjectElement(inputValue);
            projectElementHandler.showProjectElement();
            projectsList.insertBefore(project, renameForm);
            projectElementHandler.closeAllOptionsMenu();
        };
    });
    renameProjectInput.value = "";
    ProjectFormManager.hideForm(renameForm);
});

/*
function closeAllOptionsMenu() {
    console.log('close up opcija radi');
    document.querySelectorAll('.project-option').forEach((element) => {
        element.remove();
    })
    document.querySelector('body').removeEventListener('click', closeAllOptionsMenu);
    isOptionsMenuOpen = false;
}
 */

///////////////////////////////// //////////
/*
//State variable to track if the options menu is open
let isOptionsMenuOpen = false;

class ProjectFormManager {
    static showForm() {
        projectForm.classList.remove('hidden');
    }

    static hideForm() {
        projectFormInput.value = "";
        projectForm.classList.add('hidden');
    }
}

class todoRenameManager {
    static currentTodoTextElement;
    static currentTodoProjectElement;

    static displayRenameForm(currentTodoTextElement) {
        todoRenameManager.currentTodoTextElement = currentTodoTextElement;
        renameSubmitButton.removeEventListener('click', todoRenameManager.submitRenameForm);
        renameForm.classList.remove('hidden');
        renameProjectInput.value = todoRenameManager.currentTodoTextElement.textContent;
        todoRenameManager.currentTodoProjectElement = todoRenameManager.currentTodoTextElement.parentNode;

        projectsList.insertBefore(renameForm, todoRenameManager.currentTodoProjectElement);
        todoRenameManager.currentTodoProjectElement.classList.add('hidden');
        renameSubmitButton.addEventListener('click', todoRenameManager.submitRenameForm);
        renameCancelButton.removeEventListener('click', todoRenameManager.cancelRenameForm);
        renameCancelButton.addEventListener('click', todoRenameManager.cancelRenameForm);
    }

    static submitRenameForm(event) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        const todoItemID = todoRenameManager.currentTodoTextElement.parentNode.getAttribute('data-project');
        const relatedTasks = taskManager.getTasks(todoRenameManager.currentTodoTextElement.textContent);
        //Rename the todo item using the input value
        todoManager.renameTodoById(todoItemID, renameProjectInput.value);

        //Get the updated list of todos and update tasks belongTo property
        const allTodos = todoManager.getTodos();
        todoRenameManager.currentTodoTextElement.textContent = allTodos[todoItemID].name;
        mainTitle.textContent = allTodos[todoItemID].name;
        relatedTasks.forEach((task) => {
            task.belongsTo = todoRenameManager.currentTodoTextElement.textContent;
        })
        //Clear the input field and hide the form
        renameProjectInput.value = "";
        renameForm.classList.add('hidden');
        todoRenameManager.currentTodoProjectElement.classList.remove('hidden');
        renameSubmitButton.removeEventListener('click', todoRenameManager.submitRenameForm);
        renameCancelButton.removeEventListener('click', todoRenameManager.cancelRenameForm);
    }
    static cancelRenameForm(event) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        renameProjectInput.value = "";
        renameForm.classList.add('hidden');
        todoRenameManager.currentTodoProjectElement.classList.remove('hidden');
        renameCancelButton.removeEventListener('click', todoRenameManager.cancelRenameForm);
        renameSubmitButton.removeEventListener('click', todoRenameManager.submitRenameForm);
        closeOptionsMenu();
    }

    //Function to handle the rename button click event
    static initializeRenameButtonListener(renameButtonElement) {
        renameButtonElement.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
            const clickedRenameButton = event.currentTarget;
            const todoItemText = clickedRenameButton.parentNode.parentNode.querySelector('p');

            todoRenameManager.displayRenameForm(todoItemText);

            console.log("text content od parrent node je: " + todoItemText);
            const projectID = clickedRenameButton.parentNode.parentNode.getAttribute('data-project');
            console.log("id je" + projectID);

            console.log("div je :" + clickedRenameButton.parentNode.parentNode.getAttribute('data-project'));
        })
    }
}

//Function to create a new todo item element
function createTodoItemElement(item) {
    const todoItem = document.createElement('div');
    todoItem.setAttribute("data-project", item.id);
    todoItem.classList.add('todos-item');

    const todoIcon = document.createElement('img');
    todoIcon.src = projectItemIcon;

    const todoName = document.createElement('p');
    todoName.textContent = item.name;

    const editIcon = document.createElement('img');
    editIcon.style.display = "inline-block";
    editIcon.style.marginLeft = "auto";
    editIcon.src = editIconSrc;
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
    todoRenameManager.initializeRenameButtonListener(renameOption);

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
    while (taskFormList.firstChild) {
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

projectFormSubmitButton.addEventListener('click', (event) => {
    event.preventDefault();
    handleFormSubmission();
});

projectFormCancelButton.addEventListener('click', (event) => {
    event.preventDefault();
    ProjectFormManager.hideForm();
})


//Function to handle form submission
function handleFormSubmission() {
    projectsList.innerHTML = "";
    const todosArray = todoManager.createTodo(projectFormInput.value);
    todosArray.forEach((todoItem) => {
        projectsList.appendChild(createTodoItemElement(todoItem));
    })
    projectFormInput.value = "";
    projectForm.classList.add('hidden');
}


export { ProjectFormManager };
*/

export { ProjectFormManager };