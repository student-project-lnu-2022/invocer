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
                "add_item": "Add item",
                "new_item": "New item",
                "edit_item": "Edit item",
                "item_edit": "Item edit",
                "save_changes": "Save changes",
                "item_info": "Client info",
                "name": "Name",
                "price": "Price",
                "currency": "Currency",
                "basic_unit": "Basic unit",
                "amount_in_stock": "Amount is stock",
                "barcode": "Barcode",
                "add_new_additional_unit": "Add new additional unit",
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
                "add_item": "Додати продукт",
                "new_item": "Новий продукт",
                "edit_item": "Внести зміни",
                "item_edit": "Редагування продукту",
                "save_changes": "Зберегти",
                "item_info": "Інформація про продукт",
                "name": "Імʼя",
                "price": "Ціна",
                "currency": "Валюта",
                "basic_unit": "Основна одиниця",
                "amount_in_stock": "Кількість в наявності",
                "barcode": "Артикул",
                "add_new_additional_unit": "Створити додаткову одиницю кількості",
            }
        }
    }
}, function (err, t) {
    updateContent();
});

function updateContent() {
    translateMenu();

    translateItemsList();

}

function getI18NDataFromAttribute(element) {
    if (element) {
        return i18next.t(element.getAttribute("data-i18n"));
    }
}

function translateMenu() {
    const menuItemsList = document.querySelectorAll("span.translation");
    if (menuItemsList) {
        for (let menuItem of menuItemsList) {
            menuItem.textContent = getI18NDataFromAttribute(menuItem);
        }
    }

    let addItemButton = document.querySelector("#adder");
    console.log(addItemButton);
    if (addItemButton) {
        console.log("Inside");
        console.log(addItemButton.label);
        console.log(i18next.t("add_item"));
        addItemButton.label = i18next.t("add_item");
    }
}

function translateItemsList() {
    const searchInput = document.querySelector("#search_bar");
    if (searchInput) {
        searchInput.placeholder = getI18NDataFromAttribute(searchInput);
    }

    const sortAscendingOrder = document.querySelector("#sort_asc");
    if (sortAscendingOrder) {
        sortAscendingOrder.textContent = getI18NDataFromAttribute(sortAscendingOrder);
    }

    let addItemButton = document.querySelector("#adder");
    if (addItemButton) {
        addItemButton.label = i18next.t("add_item");
    }
}

function translateClientAdd() {
    const addClientHeaderText = document.querySelector("#client_new_text");
    if (addClientHeaderText) {
        addClientHeaderText.textContent = getI18NDataFromAttribute(addClientHeaderText);
    }

    const nameInput = document.querySelector("#name_input_client_edit_page");
    if (nameInput) {
        nameInput.label = getI18NDataFromAttribute(nameInput);
    }

    const surnameInput = document.querySelector("#surname_input_client_edit_page");
    if (surnameInput) {
        surnameInput.label = getI18NDataFromAttribute(surnameInput);
    }

    const telephoneInput = document.querySelector("#telephone_input_client_edit_page");
    if (telephoneInput) {
        telephoneInput.label = getI18NDataFromAttribute(telephoneInput);
    }

    const zipInput = document.querySelector("#zip_input_client_edit_page");
    if (zipInput) {
        zipInput.label = getI18NDataFromAttribute(zipInput);
    }

    const countryInput = document.querySelector("#country_input_client_edit_page");
    if (countryInput) {
        countryInput.label = getI18NDataFromAttribute(countryInput);
    }

    const cityInput = document.querySelector("#city_input_client_edit_page");
    if (cityInput) {
        cityInput.label = getI18NDataFromAttribute(cityInput);
    }

    const addressInput = document.querySelector("#address_input_client_edit_page");
    if (addressInput) {
        addressInput.label = getI18NDataFromAttribute(addressInput);
    }

    const addClientButton = document.querySelector("#request_sender");
    if (addClientButton) {
        addClientButton.label = getI18NDataFromAttribute(addClientButton);
    }
}

function translateClientInfo() {
    const infoClientHeaderText = document.querySelector("#client_info_text");
    if (infoClientHeaderText) {
        infoClientHeaderText.textContent = getI18NDataFromAttribute(infoClientHeaderText);
    }

    const editClientButton = document.querySelector("#request_edit_sender");
    if (editClientButton) {
        editClientButton.label = getI18NDataFromAttribute(editClientButton);
    }
}

function translateClientEdit() {
    const editClientHeaderText = document.querySelector("#client_edit_text");
    if (editClientHeaderText) {
        editClientHeaderText.textContent = getI18NDataFromAttribute(editClientHeaderText);
    }
}