"use strict";
const header = document.querySelector('.header'),
    headerLogo = document.querySelector('.header__logo-img'),
    menuBtn = document.querySelector('.header__btn-burger'),
    menuNav = document.querySelector('.header__nav');
let activeScroll = 'active',
    activeBurger = 'active-burger';

function checkBurger() {
    return menuBtn.classList.contains('active');
}

function burgerModify() {
    let check = checkBurger();
    if (check) {
        menuBtn.classList.remove('active');
        menuNav.classList.remove('active');
        headerNotActive(check);

    } else {
        menuBtn.classList.add('active');
        menuNav.classList.add('active');
        headerActive(check);
    }

}

function headerActive(check) {
    if (!check) {
        header.classList.add(activeBurger);
        headerLogo.classList.add(activeBurger);

    } else {
        header.classList.add(activeScroll);
        headerLogo.classList.add(activeScroll);
    }
}

function headerNotActive(check) {

    if (check) {
        header.classList.remove(activeBurger);
        headerLogo.classList.remove(activeBurger);

    } else {
        header.classList.remove(activeScroll);
        headerLogo.classList.remove(activeScroll);
    }
}

function removeActive() {
    header.classList.remove(activeBurger);
    headerLogo.classList.remove(activeBurger);
    header.classList.remove(activeScroll);
    headerLogo.classList.remove(activeScroll);
    menuBtn.classList.remove('active');
    menuNav.classList.remove('active');
}

function scrollModify() {
    let scroll = false;
    if (window.scrollY > 114) {
        scroll = true;
        headerActive(scroll);

    } else if (window.scrollY < 114) {
        scroll = false;
        headerNotActive(scroll);
    }
}


menuBtn.addEventListener('click', burgerModify);
window.addEventListener('scroll', scrollModify);
// window.addEventListener('resize', resizeWindow);


const mediaQuery = window.matchMedia('(max-width: 768px)'),
    buttonAccor = document.querySelectorAll('.about__accordeon-button'),
    contentAccor = document.querySelectorAll('.about__accordeon-content'),
    containerAccor = document.querySelector('.about__container');


function accordeonHandler(btn, media) {
    console.log('btn')
    buttonAccor.forEach((item, index) => {

        if (btn.target === item) {
            item.classList.toggle('active');
            if (contentAccor[index].style.maxHeight) {
                contentAccor[index].style.maxHeight = null;
            } else {
                contentAccor[index].style.maxHeight = contentAccor[index].scrollHeight + "px";
            }
        }
    })
}
let f = accordeonHandler.bind();
const handleTabletChange = function (e) {

    // Проверить, что media query будет true
    if (e.matches) {
        // Вывести сообщение в консоль
        containerAccor.addEventListener('click', f, false);
        console.log('qwe')

    } else {
        removeActive();
        containerAccor.removeEventListener('click', f), false;
        for (let i = 0; i < contentAccor.length; i++) {
            if (contentAccor[i].style.maxHeight) contentAccor[i].style.maxHeight = null;

            buttonAccor[i].classList.remove('active');
        }
        console.log('123123')
    }

}

// Слушать события
mediaQuery.addListener(handleTabletChange);

// Начальная проверка
handleTabletChange(mediaQuery);