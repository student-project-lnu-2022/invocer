window.onload = function () {
    updateContentItems();
}

export function updateContentItems() {
    translateMenu();
    translateItemsList();
    translateItemAdd();
    translateItemEdit();
    translateItemView();
}

function getI18NDataFromAttribute(element) {
    if (element) {
        return i18next.t(element.getAttribute("data-i18n"));
    }
}

export function translateMenu() {
    const menuItemsList = document.querySelectorAll("span.translation");
    if (menuItemsList) {
        for (let menuItem of menuItemsList) {
            menuItem.textContent = getI18NDataFromAttribute(menuItem);
        }
    }

    let addItemButton = document.querySelector("#adder");
    if (addItemButton) {
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

    const addItemMobileButton = document.querySelector("#add_item_mobile");
    if (addItemMobileButton) {
        addItemMobileButton.label = getI18NDataFromAttribute(addItemMobileButton);
    }
}


function translateItemAdd() {
    const addItemHeaderText = document.querySelector("#new_item_text");
    if (addItemHeaderText) {
        addItemHeaderText.textContent = getI18NDataFromAttribute(addItemHeaderText);
    }

    const nameInput = document.querySelector(".name_item_input");
    if (nameInput) {
        nameInput.label = getI18NDataFromAttribute(nameInput);
    }
    const priceInput = document.querySelector(".price_item_input");
    if (priceInput) {
        priceInput.label = getI18NDataFromAttribute(priceInput);
    }

    const amountInStockInput = document.querySelector("#amount_in_stock");
    if (amountInStockInput) {
        amountInStockInput.label = getI18NDataFromAttribute(amountInStockInput);
    }

    const barcodeInput = document.querySelector("#barcode");
    if (barcodeInput) {
        barcodeInput.label = getI18NDataFromAttribute(barcodeInput);
    }

    const addItemButton = document.querySelector("#add_item_button");
    if (addItemButton) {
        addItemButton.label = getI18NDataFromAttribute(addItemButton);
    }

    const addAdditionalUnitButton = document.querySelector("#additional_item_button")
    if (addAdditionalUnitButton) {
        addAdditionalUnitButton.label = getI18NDataFromAttribute(addAdditionalUnitButton);
    }

    const nameOfTheItemP = document.querySelector("#name_val");
    if (nameOfTheItemP) {
        nameOfTheItemP.textContent = getI18NDataFromAttribute(nameOfTheItemP);
    }

    const barcodeOfTheItemP = document.querySelector("#barcode_val");
    if (barcodeOfTheItemP) {
        barcodeOfTheItemP.textContent = getI18NDataFromAttribute(barcodeOfTheItemP);
    }

    const priceOfTheItemP = document.querySelector("#price_table_p");
    if (priceOfTheItemP) {
        priceOfTheItemP.textContent = getI18NDataFromAttribute(priceOfTheItemP);
    }

    const currencyOfTheItemP = document.querySelector("#currency_table_p");
    if (currencyOfTheItemP) {
        currencyOfTheItemP.textContent = getI18NDataFromAttribute(currencyOfTheItemP);
    }

    const basicUnitOfTheItemP = document.querySelector("#basic_unit_table_p");
    if (basicUnitOfTheItemP) {
        basicUnitOfTheItemP.textContent = getI18NDataFromAttribute(basicUnitOfTheItemP);
    }


    const amountOfTheItemP = document.querySelector("#amount_table_p");
    if (amountOfTheItemP) {
        amountOfTheItemP.textContent = getI18NDataFromAttribute(amountOfTheItemP);
    }

    const additionalUnitTableHeaders = document.querySelectorAll(".table_header.additional_unit");
    for (let additionalUnitTableHeader of additionalUnitTableHeaders) {
        additionalUnitTableHeader.textContent = i18next.t("additional_unit");
    }

    const additionalUnitNameTableParagraphs = document.querySelectorAll(".additional_unit_name_table_p");
    for (let additionalUnitNameTableP of additionalUnitNameTableParagraphs) {
        additionalUnitNameTableP.textContent = i18next.t("name");
    }

    const additionalUnitNameInputs = document.querySelectorAll(".additional_unit_field.name");
    for (let additionalUnitNameInput of additionalUnitNameInputs) {
        additionalUnitNameInput.label = i18next.t("name_of_the_additional_unit");
    }

    const additionalUnitAmountInputs = document.querySelectorAll(".amount_additional_unit_field");
    for (let additionalUnitAmountInput of additionalUnitAmountInputs) {
        additionalUnitAmountInput.label = i18next.t("amount_of_the_additional_unit_in_basic");
    }

    const dropdownCurrencyErrorText = document.querySelector('.error_currency_dropdown');
    if (dropdownCurrencyErrorText) {
        dropdownCurrencyErrorText.textContent = getI18NDataFromAttribute(dropdownCurrencyErrorText);
    }

    const dropdownUnitErrorText = document.querySelector('.error_unit_dropdown');
    if (dropdownUnitErrorText) {
        dropdownUnitErrorText.textContent = getI18NDataFromAttribute(dropdownUnitErrorText);
    }

    const selectCurrencyText = document.querySelector("#select_currency_div");
    if (selectCurrencyText) {
        selectCurrencyText.textContent = getI18NDataFromAttribute(selectCurrencyText)
    }

    const selectUnitText = document.querySelector("#select_unit_div");
    if (selectUnitText) {
        selectUnitText.textContent = getI18NDataFromAttribute(selectUnitText)
    }

    const unitDivs = document.querySelectorAll('.units_item');

    if (unitDivs) {
        for (let i = 0; i < unitDivs.length; i++) {
            unitDivs[i].textContent = i18next.t(unitDivs[i].getAttribute('data-value'));
        }
    }

    const currencyDivs = document.querySelectorAll('.currency_menu .item');

    if (currencyDivs) {
        for (let i = 0; i < currencyDivs.length; i++) {
            currencyDivs[i].childNodes[1].textContent = i18next.t(currencyDivs[i].getAttribute('data-value'));
        }
    }
}

export function initializeI18NextOnDynamicList() {
    const basicUnitParagraphs = document.querySelectorAll(".basic_unit_text");
    for (let basicUnitP of basicUnitParagraphs) {
        if (basicUnitP) {
            basicUnitP.textContent = getI18NDataFromAttribute(basicUnitP);
        }
    }
    const pricePerUnitParagraphs = document.querySelectorAll(".price_per_unit_text");
    for (let pricePerUnitP of pricePerUnitParagraphs) {
        if (pricePerUnitP) {
            pricePerUnitP.textContent = getI18NDataFromAttribute(pricePerUnitP);
        }
    }

}

function translateItemEdit() {
    const additionalUnitNameInputs = document.querySelectorAll(".additional_unit_field");
    if (additionalUnitNameInputs) {
        for (let additionalUnitNameInput of additionalUnitNameInputs) {
            additionalUnitNameInput.label = i18next.t("name_of_the_additional_unit");
        }
    }

    const additionalUnitAmountInputs = document.querySelectorAll(".amount_additional_unit_field");
    if (additionalUnitAmountInputs) {
        for (let additionalUnitAmountInput of additionalUnitAmountInputs) {
            additionalUnitAmountInput.label = i18next.t("amount_of_the_additional_unit_in_basic");
        }
    }
    const saveChangesButton = document.querySelector("#edit_item_button");
    if (saveChangesButton) {
        saveChangesButton.label = getI18NDataFromAttribute(saveChangesButton);
    }
}

function translateItemView() {
    const editItemButton = document.querySelector("#edit_item_page_button_redirect");
    if (editItemButton) {
        editItemButton.label = getI18NDataFromAttribute(editItemButton);
    }
}