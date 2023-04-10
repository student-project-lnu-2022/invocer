window.onload = function () {
    updateContentClients();
}

export function updateContentClients() {
    translateMenu();

    translateClientAdd();

    translateClientInfo();

    translateClientEdit();
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
}

export function translateClientsList() {
    const searchInput = document.querySelector("#search_bar");
    if (searchInput) {
        searchInput.placeholder = getI18NDataFromAttribute(searchInput);
    }

    const sortAscendingOrder = document.querySelector("#sort_asc");
    if (sortAscendingOrder) {
        sortAscendingOrder.textContent = getI18NDataFromAttribute(sortAscendingOrder);
    }

    const addClientButton = document.querySelector("#adder");
    if (addClientButton) {
        addClientButton.label = getI18NDataFromAttribute(addClientButton);
    }

    let contextMenuEditButtons = document.querySelectorAll(".context-menu-edit-button");
    if (contextMenuEditButtons) {
        for (let contextMenuEditButton of contextMenuEditButtons) {
            contextMenuEditButton.childNodes[1].nodeValue = i18next.t("edit");
        }
    }

    let contextMenuDeleteButtons = document.querySelectorAll(".context-menu-delete-button");
    if (contextMenuDeleteButtons) {
        for (let contextMenuDeleteButton of contextMenuDeleteButtons) {
            contextMenuDeleteButton.childNodes[1].nodeValue = i18next.t("delete");
        }
    }

    const addClientMobileButton = document.querySelector("#add_client_mobile");
    if (addClientMobileButton) {
        addClientMobileButton.label = getI18NDataFromAttribute(addClientMobileButton);
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

    const countryDivs = document.querySelectorAll('.item');

    if (countryDivs) {
        for (let i = 0; i < countryDivs.length; i++) {
            countryDivs[i].childNodes[1].textContent = i18next.t(countryDivs[i].getAttribute('data-value'));
        }
    }

    const selectCountryText = document.querySelector("#select_country_div");
    if (selectCountryText) {
        selectCountryText.textContent = getI18NDataFromAttribute(selectCountryText)
    }

    const dropdownCountryErrorText = document.querySelector('.error_country_dropdown');
    if (dropdownCountryErrorText) {
        dropdownCountryErrorText.textContent = getI18NDataFromAttribute(dropdownCountryErrorText);
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