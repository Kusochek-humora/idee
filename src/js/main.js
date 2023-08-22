"use strict";

// const swiper = new Swiper('.swiper', {
//     // speed: 400,
//     // spaceBetween: 100, slidesPerView: 1,
//     // spaceBetween: 10,
//     // Responsive breakpoints
//     breakpoints: {
//         // when window width is >= 320px
//         320: {
//             slidesPerView: 1,
//             // spaceBetween: 20
//             // init: function () {},
//         },
//         // 768: {
//         //     on: {
//         //         destroy: true,
//         //     }
//         // }
//     },

//     pagination: {
//         el: '.swiper-pagination',
//         clickable: true
//     },
//     autoplay: {
//         delay: 4000,
//     },
// });




//   document.addEventListener('DOMContentLoaded', function () {})

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
// let swiper = new Swiper('.swiper'); 
let swiper;
const settings = {
    breakpoints: {
        320: {
            slidesPerView: 1,
        },
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },
    autoplay: {
        delay: 4000,
    },
}
const handleTabletChange = function (e) {
    if (e.matches) {
        containerAccor.addEventListener('click', f, false);
        swiper = new Swiper('.swiper', settings);

    } else {
        swiper.destroy(true, true);
        removeActive();
        containerAccor.removeEventListener('click', f), false;
        for (let i = 0; i < contentAccor.length; i++) {
            if (contentAccor[i].style.maxHeight) contentAccor[i].style.maxHeight = null;

            buttonAccor[i].classList.remove('active');
        }
    }

}

// Слушать события
mediaQuery.addListener(handleTabletChange);

// Начальная проверка
handleTabletChange(mediaQuery);