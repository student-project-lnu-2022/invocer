export const host = "http://127.0.0.1:8000";
export const nameField = document.getElementById("name");
export const priceField = document.getElementById("price");
export const amountInStockField = document.getElementById("amount_in_stock");
export const barcodeField = document.getElementById("barcode");
export const currencyField = document.getElementById("currency_input_dropdown");
export const basicUnitField = document.getElementById("units_input_dropdown");
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
    document.getElementById("name").value = responseFromServerForItem["name"];
    document.getElementById("price").value = responseFromServerForItem["price"];
    document.querySelector("#currency_input_dropdown").value = responseFromServerForItem["currency"];
    document.querySelector("#units_input_dropdown").value = responseFromServerForItem["basic_unit"];


    const currenciesDivList = document.querySelectorAll('.currency_menu div');
    currenciesDivList.forEach(div => {
        if (div.getAttribute("data-value") === responseFromServerForItem["currency"]) {
            const dropdownCurrencyContainer = document.querySelector('.default.text');
            dropdownCurrencyContainer.textContent = "";
            dropdownCurrencyContainer.insertAdjacentHTML("afterbegin", div.innerHTML);
            dropdownCurrencyContainer.classList.remove("default");
        }
    });

    const unitsDivList = document.querySelectorAll('.units_menu div');
    unitsDivList.forEach(div => {
        if (div.getAttribute("data-value") === responseFromServerForItem["basic_unit"]) {
            const dropdownUnitContainer = document.querySelector('.default.text');
            dropdownUnitContainer.textContent = "";
            dropdownUnitContainer.insertAdjacentHTML("afterbegin", div.innerHTML);
            dropdownUnitContainer.classList.remove("default");
        }
    });

    document.getElementById("amount_in_stock").value = responseFromServerForItem["amount_in_stock"];
    document.getElementById("barcode").value = responseFromServerForItem["barcode"];
    document.querySelector("#name_val").textContent = responseFromServerForItem["name"];
    document.querySelector("#barcode_val").textContent += responseFromServerForItem["barcode"];
    document.querySelector("#price_val").textContent = responseFromServerForItem["price"];
    document.querySelector("#currency_val").textContent = responseFromServerForItem["currency"];
    document.querySelector("#basic_unit_val").textContent = i18next.t(responseFromServerForItem["basic_unit"]);

    document.querySelector("#amount_in_stock_val").textContent = responseFromServerForItem["amount_in_stock"];
    const unitsArray = responseFromServerForUnit["content"];
    numOfRowsObject.numOfRows += unitsArray.length;
    const additionalUnitFields = document.querySelectorAll(".additional_unit");
    for (let i = 0; i < unitsArray.length; i++) {
        let additionalUnitId = unitsArray[i]["id"];
        let additionalUnitName = unitsArray[i]["additional_unit_name"];
        let additionalUnitQuantity = unitsArray[i]["quantity"];
        additionalUnitFields[i].classList.remove("d-none");
        additionalUnitFields[i].classList.add("d-flex");

        document.getElementById(`AU${i + 1}`).value = additionalUnitName;
        document.getElementById(`amount_AU${i + 1}`).value = additionalUnitQuantity;
        document.getElementById(`Aditional_unit_${i + 1}`).textContent = additionalUnitName;
        document.getElementById(`AU${i + 1}_val`).textContent = additionalUnitQuantity;
        document.getElementById(`Aditional_unit_${i + 1}`).setAttribute("data-text", additionalUnitName);
        document.getElementById(`AU${i + 1}_val`).setAttribute("data-text", additionalUnitQuantity);
        document.querySelectorAll(".additional_unit")[i].setAttribute("data-additional-unit-id", additionalUnitId);
        document.querySelectorAll(".close_btn")[i].setAttribute("data-additional-unit-id", additionalUnitId);
        document.querySelectorAll(".additional_unit_cell")[i].classList.remove("hidden");
    }
}

export function deleteAdditionalUnit() {
    const closeButtons = document.querySelectorAll('.close_btn');
    closeButtons.forEach((element) => {
        element.addEventListener('click', async (event) => {
            const clickedButton = event.target;
            const additionalUnitId = clickedButton.getAttribute('data-additional-unit-id');
            if (additionalUnitId) {
                try {
                    const requestOptions = {
                        method: 'DELETE',
                        body: JSON.stringify({"additional_unit_id": additionalUnitId}),
                        headers: {
                            'Authorization': `Bearer ${window.localStorage.getItem('accessToken')}`,
                            'Content-Type': 'application/json'
                        },
                    };
                    const response = await fetch(host + "/items/additional_units/" + additionalUnitId, requestOptions);
                    if (response.ok) {
                        clickedButton.removeAttribute('data-additional-unit-id');
                        clickedButton.parentNode.parentNode.removeAttribute('data-additional-unit-id');
                    } else if (response.status === 401) {
                        window.location.replace(host + '/user/login/');
                    } else {
                        console.error('Error with deleting additional unit:', response.statusText);
                    }
                } catch (error) {
                    console.error('Error with deleting additional unit:', error);
                }
            } else {
            }
        });
    });
}

export function setErrorAttributesToFields(fields, errorsObject) {
    console.log(fields);
    for (let i = 0; i < fields.length; i++) {
        if (errorsObject[i]) {
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
