function checkMenuItemBasedOnSection() {
    const urlSection = new URL(window.location.href).pathname.split("/")[1];
    const menuItems = document.querySelectorAll("#menu li");
    menuItems.forEach((item) => {
        item.classList.remove("active");
    });

    const urlSections = ['invoices', 'clients', 'items', 'statistics', 'settings'];
    menuItems[urlSections.indexOf(urlSection)].classList.add('active');
}
checkMenuItemBasedOnSection();