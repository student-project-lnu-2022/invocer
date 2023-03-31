i18next.init({
    lng: 'uk',
    debug: 'true',
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
                "name_of_the_item": "Name of the item",
                "price": "Price",
                "currency": "Currency",
                "basic_unit": "Basic unit",
                "amount_in_stock": "Amount in stock",
                "barcode": "Barcode",
                "barcode_": "Barcode: ",
                "add_new_additional_unit": "Add new additional unit",
                "price_per_unit_text": "Price per unit",
                "additional_unit": "Additional unit",
                "name_of_the_additional_unit": "Name of the additional unit",
                "amount_of_the_additional_unit_in_basic": "Amount in basic unit",
                "empty_field_error": "This field can't be empty",
                "no_whitespaces_error": "No whitespaces",
                "max_length_error": "Max length – {{maxLength}} chars",
                "capital_letter_error": "Has to begin with capital",
                "lowercase_error": "At least one lowercase",
                "special_characters_error": "Special characters aren't allowed",
                "invalid_format_error": "Invalid format",
                "range_error": "Amount of digits must be in [{{min}}, {{max}}]",
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
                "name": "Назва",
                "name_of_the_item": "Назва продукту",
                "price": "Ціна",
                "currency": "Валюта",
                "basic_unit": "Основна одиниця",
                "amount_in_stock": "К-cть в наявності",
                "barcode": "Артикул",
                "barcode_": "Артикул: ",
                "add_new_additional_unit": "Створити додаткову одиницю к-сті",
                "price_per_unit_text": "Ціна за од.",
                "additional_unit": "Додаткова одиниця кількості",
                "name_of_the_additional_unit": "Назва додаткової одиниці",
                "amount_of_the_additional_unit_in_basic": "Кількість в основній одиниці",
                "empty_field_error": "Поле не може бути порожнім",
                "no_whitespaces_error": "Без пробілів",
                "max_length_error": "Максимальна довжина – {{maxLength}} символів",
                "capital_letter_error": "Повинно починатися з великої літери",
                "lowercase_error": "Повинно містити хоча б одну малу літеру",
                "special_characters_error": "Спецсимволи заборонені",
                "invalid_format_error": "Некоректний формат",
                "range_error": "Кількість цифр має бути від {{min}} до {{max}}"
            }
        }
    }
}, function (err, t) {
    document.addEventListener('DOMContentLoaded', function () {
        updateContent();
    });
});

function updateContent() {
    translateMenu();
    translateItemsList();
    translateItemAdd();
    translateItemEdit();
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
}

function translateItemAdd() {
    const addItemHeaderText = document.querySelector("#new_item_text");
    if (addItemHeaderText) {
        addItemHeaderText.textContent = getI18NDataFromAttribute(addItemHeaderText);
    }

    const nameInput = document.querySelector(".name_item_input");
    console.log(nameInput);
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
    console.log(amountOfTheItemP);
    if (amountOfTheItemP) {
        console.log(amountOfTheItemP.textContent);
        console.log(getI18NDataFromAttribute(amountOfTheItemP));
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
}

export function initializeI18NextOnDynamicList() {
    i18next.init({
        lng: 'uk',
        resources: {
            en: {
                translation: {
                    "price_per_unit_text": "Price per unit",
                    "basic_unit_text": "Basic unit",
                }
            },
            uk: {
                translation: {
                    "price_per_unit_text": "Ціна за од.",
                    "basic_unit_text": "Одиниця к-сті",
                }
            }
        }
    }, function (err, t) {
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

    });
}

function translateItemEdit() {
    const additionalUnitNameInputs = document.querySelectorAll(".additional_unit_field");
    for (let additionalUnitNameInput of additionalUnitNameInputs) {
        additionalUnitNameInput.label = i18next.t("name_of_the_additional_unit");
    }

    const additionalUnitAmountInputs = document.querySelectorAll(".amount_additional_unit_field");
    for (let additionalUnitAmountInput of additionalUnitAmountInputs) {
        additionalUnitAmountInput.label = i18next.t("amount_of_the_additional_unit_in_basic");
    }

    const saveChangesButton = document.querySelector("#edit_item_button");
    saveChangesButton.label = getI18NDataFromAttribute(saveChangesButton);
}
