i18next.init({
    lng: navigator.language,
    fallbackLng: 'en',
    resources: {
        en: {
            translation: {
                "invoices":
                    "Invoices",
                "clients":
                    "Clients",
                "items":
                    "Items",
                "statistics":
                    "Statistics",
                "settings":
                    "Settings",
                "search_input_text":
                    "Search...",
                "a_z_sort":
                    "A-Z by name",
                "add_item":
                    "Add item",
                "new_item":
                    "New item",
                "edit_item":
                    "Edit item",
                "item_edit":
                    "Item edit",
                "save_changes":
                    "Save changes",
                "item_info":
                    "Client info",
                "name":
                    "Name",
                "name_of_the_item":
                    "Name of the item",
                "price":
                    "Price",
                "currency":
                    "Currency",
                "basic_unit":
                    "Basic unit",
                "amount_in_stock":
                    "Amount in stock",
                "barcode":
                    "Barcode",
                "barcode_":
                    "Barcode: ",
                "add_new_additional_unit":
                    "Add new additional unit",
                "price_per_unit_text":
                    "Price per unit",
                "additional_unit":
                    "Additional unit",
                "name_of_the_additional_unit":
                    "Name of the additional unit",
                "amount_of_the_additional_unit_in_basic":
                    "Amount in basic unit",
                "empty_field_error":
                    "This field can't be empty",
                "no_whitespaces_error":
                    "No whitespaces",
                "max_length_error":
                    "Max length – {{maxLength}} chars",
                "capital_letter_error":
                    "Has to begin with capital",
                "lowercase_error":
                    "At least one lowercase",
                "special_characters_error":
                    "Special characters aren't allowed",
                "invalid_format_error":
                    "Invalid format",
                "range_error":
                    "Amount of digits must be in [{{min}}, {{max}}]",
                "add_invoice":
                    "Add invoice"
            }
        }
        ,
        uk: {
            translation: {
                "invoices":
                    "Накладні",
                "clients":
                    "Клієнти",
                "items":
                    "Товари",
                "statistics":
                    "Статистика",
                "settings":
                    "Налаштування",
                "search_input_text":
                    "Пошук...",
                "a_z_sort":
                    "А-Я",
                "add_item":
                    "Додати продукт",
                "new_item":
                    "Новий продукт",
                "edit_item":
                    "Внести зміни",
                "item_edit":
                    "Редагування продукту",
                "save_changes":
                    "Зберегти",
                "item_info":
                    "Інформація про продукт",
                "name":
                    "Назва",
                "name_of_the_item":
                    "Назва продукту",
                "price":
                    "Ціна",
                "currency":
                    "Валюта",
                "basic_unit":
                    "Основна одиниця",
                "amount_in_stock":
                    "К-cть в наявності",
                "barcode":
                    "Артикул",
                "barcode_":
                    "Артикул: ",
                "add_new_additional_unit":
                    "Створити додаткову одиницю к-сті",
                "price_per_unit_text":
                    "Ціна за од.",
                "additional_unit":
                    "Додаткова одиниця кількості",
                "name_of_the_additional_unit":
                    "Назва додаткової одиниці",
                "amount_of_the_additional_unit_in_basic":
                    "Кількість в основній одиниці",
                "empty_field_error":
                    "Поле не може бути порожнім",
                "no_whitespaces_error":
                    "Без пробілів",
                "max_length_error":
                    "Максимальна довжина – {{maxLength}} символів",
                "capital_letter_error":
                    "Повинно починатися з великої літери",
                "lowercase_error":
                    "Повинно містити хоча б одну малу літеру",
                "special_characters_error":
                    "Спецсимволи заборонені",
                "invalid_format_error":
                    "Некоректний формат",
                "range_error":
                    "Кількість цифр має бути від {{min}} до {{max}}",
                "add_invoice":
                    "Додати накладну"
            }
        }
    }
},

function (err, t) {
    document.addEventListener('DOMContentLoaded', function () {
        updateContent();
    });
}

)
;

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

    console.log(document.querySelector("#adder"));
    let addItemButton = document.querySelector("#adder");
    if (addItemButton) {
        addItemButton.label = i18next.t("add_invoice");
    }
}