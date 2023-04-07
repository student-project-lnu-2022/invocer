import {host} from "./utils_clients.js";
import {obtainUserInitials, obtainNewAccessToken} from "./request_utils.js";

document.querySelector("#menu-toggle").addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector("#wrapper").classList.toggle("toggled");
});

document.querySelector("#menu-toggle-2").addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector("#wrapper").classList.toggle("toggled-2");
});

function initMenu() {
    const menuUl = document.querySelectorAll('#menu ul');
    menuUl.forEach(function (menu) {
        menu.style.display = "none";
        const current = menu.querySelector('.current');
        if (current) {
            current.parentNode.style.display = "block";
        } else {
            menu.querySelector(':first-child').style.display = "block";
        }
    });
}

window.addEventListener('DOMContentLoaded', function () {
    initMenu();
    checkMenuItemBasedOnSection();
    window.addEventListener('resize', setNavMobileDisplay);
    window.addEventListener('load', setNavMobileDisplay);
});

document.querySelector("#log_out_button").addEventListener("click", async () => {
    try {
        const refreshToken = window.localStorage.getItem('refreshToken');
        const response = await fetch(host + '/user/logout/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${window.localStorage.getItem('accessToken')}`,
                'Refresh-Token': `Bearer ${refreshToken}`
            },
        });

        if (response.ok) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            window.location.href = host + '/user/login';
        } else if (response.status === 400) {
            const obtainedNewTokens = await obtainNewAccessToken();
            if (!obtainedNewTokens) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = host + '/user/login/';
            } else {
                await obtainUserInitials();
            }
        } else {
            throw new Error(response.statusText);
        }

    } catch (error) {
        console.error(error);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.replace(host + '/user/login/');
    }
});

function checkMenuItemBasedOnSection() {
    const urlSection = new URL(window.location.href).pathname.split("/")[1];
    const menuItems = document.querySelectorAll("#menu li");
    const menuItemsMobile = document.querySelectorAll(".nav_mobile a");

    menuItems.forEach((item) => {
        item.classList.remove("active");
    });

    menuItemsMobile.forEach((item) => {
        item.classList.remove("nav__link_mobile--active");
    });

    const urlSections = ['', 'clients', 'items', 'statistics', 'settings'];
    menuItems[urlSections.indexOf(urlSection)].classList.add('active');
    menuItemsMobile[urlSections.indexOf(urlSection)].classList.add('nav__link_mobile--active');
}

const navMobile = document.querySelector('.nav_mobile');
const sidebarWrapper = document.querySelector("#wrapper");
const searchAndAddButton = document.querySelector(".additional_navigation_elements");
const userNameAndIcon = document.querySelector('#user_name_and_icon_column');

function setNavMobileDisplay() {

    if (window.innerWidth <= 940) {
        searchAndAddButton.classList.remove("col-7");
        searchAndAddButton.classList.add("col-8");
    } else {
        searchAndAddButton.classList.remove("col-8");
        searchAndAddButton.classList.add("col-7");
    }

    if (window.innerWidth <= 830) {
        navMobile.style.display = 'flex';
        searchAndAddButton.classList.remove("col-7");
        searchAndAddButton.classList.add("col-12");
        searchAndAddButton.classList.add("justify-content-center")
    } else {
        navMobile.style.display = 'none';
        searchAndAddButton.classList.add("col-7");
        searchAndAddButton.classList.remove("col-12");
        searchAndAddButton.classList.remove("justify-content-center")
    }


}





