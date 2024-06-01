import './css/index.css';
import './css/normalizer.css';
import { image1, image2, image3, image4, image5, addCircleIMG } from './exportImages';
import renderAllTasks from './AllTasks';
import renderTodayTasks from './TodayTasks';
import renderNext7DaysTasks from './Next7DaysTasks';
import renderImportantTasks from './ImportantTasks';
import {renderProjectForm, submitForm} from './ProjectFormHandler';



const navItemsContainer = document.querySelector('ul');
const projectsContainer = document.getElementById('projects_ul');
const submitBTN = document.querySelector('.submit_btn');
const addProject = document.getElementById('add-project');
const projectInput = document.getElementById('project_input');
import createTodos from './TodoProjectCreator';


navItemsContainer.addEventListener('click', function (event) {
    switch (event.target.id) {
        case "all-tasks":
            renderAllTasks();
            break;
        case "today":
            renderTodayTasks();
            break;
        case "next-7-days":
            renderNext7DaysTasks();
            break;
        case "important":
            renderImportantTasks();
            break;
        default:
            break;

    }
})

addProject.addEventListener('click', renderProjectForm);

submitBTN.addEventListener('click', (event) => {
    event.preventDefault();
    submitForm();
});




