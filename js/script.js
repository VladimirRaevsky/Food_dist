'use strict';


const tabContent = document.querySelectorAll('.tabcontent');
const tabHeader = document.querySelector('.tabheader__items');
const tabItem = tabHeader.querySelectorAll('.tabheader__item');


function hideTab() {
    tabContent.forEach(tab => {
        tab.classList.add('hide');
        tab.classList.remove('show');
    });
    tabItem.forEach(tab => {
        tab.classList.remove('tabheader__item_active');
    });
}

function showTab(i = 0) {
    tabContent[i].classList.add('show');
    tabContent[i].classList.remove('hide');
    tabItem[i].classList.add('tabheader__item_active');
}

hideTab();
showTab();

tabHeader.addEventListener('click', (e) => {
    const target = e.target;
    if(target && target.classList.contains('tabheader__item')) {
        tabItem.forEach((tab, i) => {
            if(target == tab) {
                hideTab();
                showTab(i); 
            }
        });
    }
});