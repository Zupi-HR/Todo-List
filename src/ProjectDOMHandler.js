
import projectItemIcon from "./assets/materials_icon.svg"
import editIconImage from "./assets/edit_icon.svg";
import { projectManager } from "./ProjectLogic";
import { renderProjectTasks, addTaskBtn } from "./TaskFormHandler";
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

function storageAvailable(type) {
    let storage;
    try {
      storage = window[type];
      const x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return (
        e instanceof DOMException &&
        e.name === "QuotaExceededError" &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage &&
        storage.length !== 0
      );
    }
  }
  
  if (storageAvailable("localStorage")) {
    console.log('Yippee! We can use localStorage awesomeness');
  } else {
    console.log('Too bad, no localStorage for us');
  }
  


class ProjectFormManager {
    static showForm(formElement) {
        formElement.classList.remove('hidden');
    }

    static hideForm(formElement) {
        formElement.value = "";
        formElement.classList.add('hidden');
    }
}


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
        projectElement.addEventListener('click', renderProjectTasks);
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
    mainTitle.textContent = inputValue;
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

renameCancelButton.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    renameProjectInput.value = "";
    renameForm.classList.add('hidden');
    const projects = document.querySelectorAll('.project-item');
    projects.forEach((project) => {
        if (project.classList.contains('hidden')) {
            project.classList.remove('hidden');
        }
    })
    const projectElementHandler = new ProjectElementHandler();
    projectElementHandler.closeAllOptionsMenu();

})



export { ProjectFormManager };