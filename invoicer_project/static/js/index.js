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
});