import checkLogoIMG from './assets/check_logo.png';
import allTasksIMG from './assets/allTasks-img.png';
import todayIMG from './assets/today-img.png';
import next7DaysIMG from './assets/next7Days-img.png';
import importantIMG from './assets/important-img.png';
import addCircleIMG from './assets/add_circle_24dp_FILL0_wght400_GRAD0_opsz24.svg';
import densityIMG from './assets/density_small_24dp_FILL0_wght400_GRAD0_opsz24.svg';


const image1 = document.querySelector('.check-logo');
image1.src = checkLogoIMG;

const image2 = document.querySelector('.all-tasks_img');
image2.src = allTasksIMG;

const image3 = document.querySelector('.today_img');
image3.src = todayIMG;

const image4 = document.querySelector('.next-7-days_img');
image4.src = next7DaysIMG;

const image5 = document.querySelector('.important_img');
image5.src = importantIMG;

const densityIconElement = document.querySelector('.density-icon');
densityIconElement.src = densityIMG;

const addProjectIcon = document.querySelector('.add-project_icon');
addProjectIcon.src = addCircleIMG;


export {image1, image2, image3, image4, image5, addCircleIMG, densityIMG};