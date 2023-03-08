export const host = "http://127.0.0.1:8000";
export const nameField = document.getElementById("name");
export const priceField = document.getElementById("price");
export const amountInStockField = document.getElementById("amount_in_stock");
export const barcodeField = document.getElementById("barcode");
export const currencyField = document.getElementById("currency").parentElement;
export const basicUnitField = document.getElementById("basic_unit").parentElement;
export const additionalFieldsContainer = document.querySelectorAll('.additional_unit_field');
export const amountAdditionalFieldsContainer = document.querySelectorAll('.amount_additional_unit_field');


export const returnAllFields = function () {
    return [
        nameField, priceField, currencyField, basicUnitField,
        amountInStockField, barcodeField,
    ];
}

export function setErrorAttributesToFields(fields, errorsObject) {
    for (let i = 0; i < fields.length; i++) {
        if (errorsObject[i]) {
            if (fields[i].classList.contains("dropdown_list")) {
                fields[i].querySelector(".dropdown__button").classList.add("dropdown__button_error");
            }
            fields[i].setAttribute("error", "true");
            fields[i].setAttribute("errorText", errorsObject[i]);
        }
    }
}