export const host = "http://127.0.0.1:8000";
export const nameField = document.getElementById("name");
export const priceField = document.getElementById("price");
export const amountInStockField = document.getElementById("amount_in_stock");
export const barcodeField = document.getElementById("barcode");
export const currencyField = document.getElementById("currency").parentElement;
export const basicUnitField = document.getElementById("basic_unit").parentElement;
export const additionalFieldsContainer = document.querySelectorAll('.additional_unit_field');
export const amountAdditionalFieldsContainer = document.querySelectorAll('.amount_additional_unit_field');
export const itemId = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);

export const inputCurrency = document.getElementById("currency");
export const inputBasicUnit = document.getElementById("basic_unit");
export const inputPriceVal = document.getElementById("price_val");
export const inputCurrencyVal = document.getElementById("currency_val");
export const inputBasicUnitVal = document.getElementById("basic_unit_val");
export const inputAmountInStockVal = document.getElementById("amount_in_stock_val");
export const inputNameVal = document.getElementById("name_val");
export const inputBarcodeVal = document.getElementById("barcode_val");
export const amountAdditionalUnitField = document.querySelectorAll(".amount_additional_unit_field");
export const additionalUnits = document.querySelectorAll(".additional_unit_field");
export const additionalUnitCell = document.querySelectorAll(".additional_unit_cell");

export const maxNumOfUnits = 5;

export const returnAllFields = function () {
    return [
        nameField, priceField, currencyField, basicUnitField,
        amountInStockField, barcodeField,
    ];
}

let numOfRows = 0;

export const numOfRowsObject = {
    numOfRows
  };

export async function fillFieldsWithData() {
    let responseFromServer = await getItemById(itemId);
    document.getElementById("name").value = responseFromServer["name"];
    document.getElementById("price").value = responseFromServer["price"];
    document.getElementById("currency").value = responseFromServer["currency"];
    document.getElementById("basic_unit").value = responseFromServer["basic_unit"];
    document.getElementById("amount_in_stock").value = responseFromServer["amount_in_stock"];
    document.getElementById("barcode").value = responseFromServer["barcode"];
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

export function getItemById(itemId) {
    return fetch(host + '/items/items_list/' + itemId, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${window.localStorage.getItem('accessToken')}`
        },
    })
        .then(response => response.json())
        .catch(error => console.error(error));
}