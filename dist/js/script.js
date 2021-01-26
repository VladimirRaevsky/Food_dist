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



    //using classes for cards


    class MenuCard {
        constructor(src, alt, title, desc, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.desc  = desc;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 50;
            this.changeToUan();
        }

        changeToUan() {
            this.price = this.price * this.transfer;
        }
        render() {
            const element = document.createElement('div');
            if(this.classes.length === 0){
                this.element = 'menu__item';
                element.classList.add(this.element);
            }else {
                this.classes.forEach(className => element.classList.add(className));
            }
            
            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.desc}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span>грн/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }
    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        10,
        '.menu .container'
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        15,
        '.menu .container'
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        13,
        '.menu .container'
    ).render();

    
       
      
});

