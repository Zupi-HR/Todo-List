import './css/index.css';
import './css/normalizer.css';
import check_logo from './assets/check_logo.png';


const header = document.querySelector('header');

const checkLogoIMG = document.createElement('img');
checkLogoIMG.classList.add('check-logo');
checkLogoIMG.src = check_logo;
header.prepend(checkLogoIMG);