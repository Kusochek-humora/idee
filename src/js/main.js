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
        console.log(check)

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

function resizeWindow() {
    if (window.outerWidth > 768) {
        removeActive();
    }
}
menuBtn.addEventListener('click', burgerModify);
window.addEventListener('scroll', scrollModify);
window.addEventListener('resize', resizeWindow);