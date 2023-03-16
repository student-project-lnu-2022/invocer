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
    let responseFromServerForItem = await getItemById(itemId);
    let responseFromServerForUnit = await getUnitsByItemId(itemId);
    console.log(responseFromServerForUnit);
    console.log(responseFromServerForItem);
    document.getElementById("name").value = responseFromServerForItem["name"];
    document.getElementById("price").value = responseFromServerForItem["price"];
    document.querySelector(".dropdown_button_currency").textContent = responseFromServerForItem["currency"];
    document.querySelector(".dropdown_button_basic_unit").textContent = responseFromServerForItem["basic_unit"];
    document.getElementById("amount_in_stock").value = responseFromServerForItem["amount_in_stock"];
    document.getElementById("barcode").value = responseFromServerForItem["barcode"];
    document.querySelector("#name_val").textContent = responseFromServerForItem["name"];
    document.querySelector("#barcode_val").textContent += responseFromServerForItem["barcode"];
    document.querySelector("#price_val").textContent = responseFromServerForItem["price"];
    document.querySelector("#currency_val").textContent = responseFromServerForItem["currency"];
    document.querySelector("#basic_unit_val").textContent = responseFromServerForItem["basic_unit"];
    document.querySelector("#amount_in_stock_val").textContent = responseFromServerForItem["amount_in_stock"];
    const unitsArray = responseFromServerForUnit["content"];
    console.log(unitsArray.length);
    for (let i = 0; i < unitsArray.length; i++) {
        let additionalUnitName = unitsArray[i]["additional_unit_name"];
        let additionalUnitQuantity = unitsArray[i]["quantity"];
        console.log(additionalUnitName);
        console.log(additionalUnitQuantity);
        document.getElementById("column-2").insertAdjacentHTML('afterbegin', ` <div class="additional_unit_cell">
                                    <div class="row secondary_text table_header">Aditional unit ${i}</div>
                                    <div class="row">
                                        <div class="col-6 first_col">${additionalUnitName}</div>
                                        <div class="col-6 second_col">${additionalUnitQuantity}</div>
                                    </div>
                                </div>`);
    }

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

export function getUnitsByItemId(itemId) {
    return fetch(host + '/items/additional_units_for_item/' + itemId, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${window.localStorage.getItem('accessToken')}`
        },
    })
        .then(response => response.json())
        .catch(error => console.error(error));
}
