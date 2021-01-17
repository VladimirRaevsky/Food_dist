'use strict';
window.addEventListener('DOMContentLoaded', ()=> {

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



    const dedline = '2021-10-25';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date());

        const days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor((t / (1000 * 60 * 60) % 24)),
              minutes = Math.floor((t / 1000 / 60) % 60),
              second = Math.floor((t / 1000) % 60);


        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'second': second
        };
    }


    function getZero(num){
        if(num >= 0 && num < 10) {
            return `0${num}`;
        }else {
			return num;
		}
    }


    function setClock(selector, endtime) {

        const timer = document.querySelector(selector),
		      days = timer.querySelector('#days'),
		      hours = timer.querySelector('#hours'),
		      minutes = timer.querySelector('#minutes'),
              second = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);
        
        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

                  days.innerHTML = getZero(t.days);
                  hours.innerHTML = getZero(t.hours);
                  minutes.innerHTML = getZero(t.minutes);
                  second.innerHTML = getZero(t.second);
                
            if(t.total <= 0){
                clearInterval(timeInterval);
            }
        }
        
    }

    setClock('.timer', dedline); 

    //modal

    const btnOpen = document.querySelectorAll('[data-modal');
    const close = document.querySelector('[data-close]');
    const modal = document.querySelector('.modal');

    function modalOpen() {
        modal.classList.toggle('show');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    function modalClose() {
        modal.classList.toggle('show');
        document.body.style.overflow = '';
    }

    const modalTimerId = setTimeout(modalOpen, 10000);

    btnOpen.forEach( btn => {
        btn.addEventListener('click', modalOpen);
    });

    modal.addEventListener('click', (e)=> {
        if(e.target === modal) {
            modalClose();
        }
    });

    close.addEventListener('click', modalClose); 

    function showModalByScroll() {
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            modalOpen();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);


});

