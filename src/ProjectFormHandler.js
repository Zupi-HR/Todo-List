import createTodos from "./TodoProjectCreator";
import todosItemIcon from "./assets/materials_icon.svg"
import editIMG from "./assets/edit_icon.svg";

const projectForm = document.getElementById('project-form');

const submitBtn = document.querySelector('submit_btn');
const projectsUl = document.getElementById('projects_ul');
const todosList = document.getElementById('todos-list');
const projectInput = document.getElementById('project_input');

function renderProjectForm() {
    projectForm.classList.remove('hidden');
}

function submitForm() {
    todosList.innerHTML = "";
    const todosItems = createTodos(projectInput.value);
    todosItems.forEach((item) => {
        const div = document.createElement('div');
        div.setAttribute("data-project", item.id);
        div.classList.add('todos-item');
        todosList.appendChild(div);

        const materialIcon = document.createElement('img');
        materialIcon.src = todosItemIcon;

        const projectName = document.createElement('p');
        projectName.textContent = item.name;

        const editIcon = document.createElement('img');
        editIcon.style.display = "inline-block";
        editIcon.style.marginLeft = "auto";
        editIcon.src = editIMG;

        editIcon.addEventListener("click", function () {
            const optionMenu = document.createElement('div');
            optionMenu.classList.add("project-option");

            const renameProject = document.createElement('p');
            renameProject.id = "rename-project";
            renameProject.textContent = "Rename";

            const deleteProject = document.createElement("p");
            deleteProject.id = "delete-project";
            deleteProject.textContent = "Delete";

            optionMenu.append(renameProject, deleteProject);

            div.appendChild(optionMenu);

        })

        div.append(materialIcon, projectName, editIcon);


    })
    projectForm.classList.add('hidden');
    console.log(todosItems);
}

export { renderProjectForm, submitForm };