"use strict";

document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('.header'),
        headerLogo = document.querySelector('.header__logo-img'),
        menuBtn = document.querySelector('.header__btn-burger'),
        menuNav = document.querySelector('.header__nav'),
        mediaQuery = window.matchMedia('(max-width: 768px)'),
        buttonAccor = document.querySelectorAll('.about__accordeon-button'),
        contentAccor = document.querySelectorAll('.about__accordeon-content'),
        containerAccor = document.querySelector('.about__container'),
        productContainer = document.querySelector('.product__container');

    let activeScroll = 'active',
        activeBurger = 'active-burger',
        f = accordeonHandler.bind(),
        tabHandlerBind = tabHandler.bind(),
        // let swiper = new Swiper('.swiper'); 
        swiper;

    function tabHandler(e) {

        const productBtn = productContainer.querySelectorAll('.product__tab-button');
        productBtn.forEach((item, index) => {

            if (e.target === item) {
                item.classList.toggle('active');
                if (document.querySelectorAll('.product__tab-content')[index].style.maxHeight) {
                    document.querySelectorAll('.product__tab-content')[index].style.maxHeight = null;
                } else {
                    document.querySelectorAll('.product__tab-content')[index].style.maxHeight = document.querySelectorAll('.product__tab-content')[index].scrollHeight + "px";
                }
            }
        })
    }

    function accordeonHandler(btn, media) {
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


    const handleTabletChange = function (e) {
        const productBtn = productContainer.querySelectorAll('.product__tab-button');

        if (e.matches) {
            // productBtn[1].click();
            containerAccor.addEventListener('click', f, false);
            const settings = {
                loop: true,
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
            swiper = new Swiper('.swiper', settings);


            productBtn.forEach((item, index) => {
                item.removeAttribute('disabled')
            })
            return e;

        } else {
            if (swiper) swiper.destroy(true, true);
            removeActive();
            containerAccor.removeEventListener('click', f), false;
            for (let i = 0; i < contentAccor.length; i++) {
                if (contentAccor[i].style.maxHeight) contentAccor[i].style.maxHeight = null;
                buttonAccor[i].classList.remove('active');
            }
            for (let i = 0; i < productBtn.length; i++) {

                if (document.querySelectorAll('.product__tab-content')[i].style.maxHeight) document.querySelectorAll('.product__tab-content')[i].style.maxHeight = null;
                productBtn.forEach((item, index) => {
                    item.setAttribute("disabled", "disabled")
                    item.classList.remove('active');
                })
            }
            return e;
        }

    }

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

    document.querySelectorAll('.anchor').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth',
                block: "start"
            });
        });
    });

    productContainer.addEventListener('click', tabHandlerBind, false);
    menuBtn.addEventListener('click', burgerModify);
    window.addEventListener('scroll', scrollModify);


    mediaQuery.addListener(handleTabletChange);

    handleTabletChange(mediaQuery);
});