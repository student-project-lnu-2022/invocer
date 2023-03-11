import {host} from "./utils_clients.js";

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

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = host + '/user/login';
    } catch (error) {
        console.error(error);
    }
});

function checkMenuItemBasedOnSection() {
    const urlSection = new URL(window.location.href).pathname.split("/")[1];
    const menuItems = document.querySelectorAll("#menu li");
    menuItems.forEach((item) => {
        item.classList.remove("active");
    });
    switch (urlSection) {
        case "invoices":
            menuItems[0].classList.add("active");
            break;
        case "clients":
            menuItems[1].classList.add("active");
            break;
        case "items":
            menuItems[2].classList.add("active");
            break;
        case "statistics":
            menuItems[3].classList.add("active");
            break;
        case "settings":
            menuItems[4].classList.add("active");
            break;
        default:
            menuItems[1].classList.add("active");
    }
}

