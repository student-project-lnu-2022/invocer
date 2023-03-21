// import i18next from 'i18next';

i18next.init({
    lng: 'uk',
    resources: {
        en: {
            translation: {
                "invoices": "Invoices",
                "clients": "Clients",
                "items": "Items",
                "statistics": "Statistics",
                "settings": "Settings",
                "search_input_text": "Search...",
                "a_z_sort": "A-Z by name",
                "add_client": "Add client"
            }
        },
        uk: {
            translation: {
                "invoices": "Накладні",
                "clients": "Клієнти",
                "items": "Товари",
                "statistics": "Статистика",
                "settings": "Налаштування",
                "search_input_text": "Пошук...",
                "a_z_sort": "А-Я",
                "add_client": "Додати клієнта"
            }
        }
    }
}, function (err, t) {
    updateContent();
});

function updateContent() {
    const menuItemsList = document.querySelectorAll("span.translation");
    for (let menuItem of menuItemsList) {
        menuItem.textContent = i18next.t(menuItem.getAttribute("data-i18n"));
    }

    const searchInput = document.querySelector("#search_bar");
    searchInput.placeholder = i18next.t(searchInput.getAttribute("data-i18n"));

    const sortAscendingOrder = document.querySelector("#sort_asc");
    sortAscendingOrder.textContent = i18next.t(sortAscendingOrder.getAttribute("data-i18n"));

    const addClientButton = document.querySelector("#adder");
    addClientButton.label =  i18next.t(addClientButton.getAttribute("data-i18n"));
}