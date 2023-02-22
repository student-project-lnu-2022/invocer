// Menu toggle 1
document.querySelector("#menu-toggle").addEventListener("click", function(e) {
  e.preventDefault();
  document.querySelector("#wrapper").classList.toggle("toggled");
});

// Menu toggle 2
document.querySelector("#menu-toggle-2").addEventListener("click", function(e) {
  e.preventDefault();
  document.querySelector("#wrapper").classList.toggle("toggled-2");
  //document.querySelector('#menu ul').style.display = "none";
});

// Initialize menu
function initMenu() {
  const menuUl = document.querySelectorAll('#menu ul');
  menuUl.forEach(function(menu) {
    menu.style.display = "none";
    const current = menu.querySelector('.current');
    if (current) {
      current.parentNode.style.display = "block";
    } else {
      menu.querySelector(':first-child').style.display = "block";
    }
  });
  const menuLinks = document.querySelectorAll('#menu li a');
  menuLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      const checkElement = this.nextElementSibling;
      if (checkElement && checkElement.classList.contains('ul') && checkElement.style.display === 'block') {
        e.preventDefault();
      } else if (checkElement && checkElement.classList.contains('ul')) {
        e.preventDefault();
        const visibleMenu = document.querySelector('#menu ul:visible');
        if (visibleMenu) {
          visibleMenu.style.display = "none";
        }
        checkElement.style.display = "block";
      }
    });
  });
}
document.addEventListener('DOMContentLoaded', function() {
  initMenu();
});