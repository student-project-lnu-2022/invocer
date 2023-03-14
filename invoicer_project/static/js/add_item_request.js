import {
    host,
    returnAllFields,
    nameField,
    priceField,
    amountInStockField,
    barcodeField,
    currencyField,
    basicUnitField,
    additionalFieldsContainer,
    amountAdditionalFieldsContainer,
    setErrorAttributesToFields
} from './utils_items.js'
import {
    clearErrorAttributes,
    setMaxFieldContainerHeights,
    allAreFalse,
    validateAdditionalUnits,
    validateName,
    validatePrice,
    validationDropdown,
    validateAmountInStock,
    validateBarcode
} from './validation_utils.js'
import {actionBasedOnStatusCode, obtainNewAccessToken, obtainUserInitials, sendAddEditRequest} from './request_utils.js'
import {
    addressField,
    cityField,
    countryField,
    emailField,
    hideUnnecessaryElementsInMenu,
    surnameField,
    telephoneField,
    zipField
} from './utils_clients.js'


function validateClientAdd() {
    clearErrorAttributes(returnAllFields());
    clearErrorAttributes(additionalFieldsContainer);
    clearErrorAttributes(amountAdditionalFieldsContainer);
    return [
        validateName(nameField.value),
        validatePrice(priceField.value),
        validationDropdown("currency"),
        validationDropdown("basic_unit"),
        validateAmountInStock(amountInStockField.value),
        validateBarcode(barcodeField.value),

    ];
}


document.getElementById("add_item_button").addEventListener("click", async () => {
    const validationFieldAdditionalUnits = validateAdditionalUnits(additionalFieldsContainer, /^[a-zа-яіїєґA-ZA-ЯІЇЄҐ]+$/);
    const validationFieldAdditionalUnitsAmount = validateAdditionalUnits(amountAdditionalFieldsContainer, /^\d+([., ]?(\d){1,2}?)?$/);
    const validationFieldsList = validateClientAdd();
    if (allAreFalse(validationFieldAdditionalUnitsAmount)) {
    } else {
        setErrorAttributesToFields(amountAdditionalFieldsContainer, validationFieldAdditionalUnitsAmount);
    }
    if (allAreFalse(validationFieldAdditionalUnits)) {
    } else {
        setErrorAttributesToFields(additionalFieldsContainer, validationFieldAdditionalUnits);
    }
    if (allAreFalse(validationFieldsList)) {
    } else {
        setErrorAttributesToFields(returnAllFields(), validationFieldsList);
    }
});

function areAdditionalItemsSelected() {
    const additionalUnits = document.querySelector("#column-2").querySelectorAll(".additional_unit");
    for (let i = 0; i < additionalUnits.length; i++) {
        if (additionalUnits[i].classList.contains('d-flex')) {
            return true
        }
    }
    return false;
}


document.getElementById("add_item_button").addEventListener("click", async () => {
    const validationFieldsList = validateClientAdd();
    let currencyValue = document.getElementById("currency").value;
    let basicUnitValue = document.getElementById("basic_unit").value
    if (allAreFalse(validationFieldsList)) {
        const data = JSON.stringify({
            name: nameField.value,
            price: parseFloat(priceField.value),
            currency: currencyValue,
            basic_unit: basicUnitValue,
            amount_in_stock: parseFloat(amountInStockField.value),
            barcode: barcodeField.value,
        });

        if (!areAdditionalItemsSelected()) {
            const addItemServerResponseStatus = await sendAddEditRequest(host + "/items/items_list/", data, "POST");
            await actionBasedOnStatusCode(addItemServerResponseStatus, 201, data, returnAllFields(), "/items/list/", "POST", "/items/items_list/");
        } else {
            const addItemWithAdditionalUnitsServerResponseStatus = await sendAddItemRequest(host + "/items/items_list/", data, "POST");
            const additionalUnits = document.querySelector("#column-2").querySelectorAll(".additional_unit");
            let responseStatusAdditionalUnit = [];
            for (let i = 0; i < additionalUnits.length; i++) {
                if (additionalUnits[i].classList.contains('d-flex')) {
                    let additionalUnitName = additionalUnits[i].querySelector(".additional_unit_field").value;
                    let additionalUnitAmount = additionalUnits[i].querySelector(".amount_additional_unit_field").value;
                    const additionalUnitData = JSON.stringify({
                        item: addItemWithAdditionalUnitsServerResponseStatus["id"],
                        additional_unit_name: additionalUnitName,
                        quantity: parseFloat(additionalUnitAmount),
                    });
                    const addAdditionalUnitServerResponseStatus = await sendAddEditRequest(host + "/items/additional_units/", additionalUnitData, "POST");
                    responseStatusAdditionalUnit.push(addAdditionalUnitServerResponseStatus);
                }
            }
            if (responseStatusAdditionalUnit.every((elem) => elem === 201)) {
                await actionBasedOnStatusCode(201, 201, data, returnAllFields(), "/items/list/", "POST", "/items/items_list/")
            } else if (responseStatusAdditionalUnit.some((elem) => elem === 401)) {
                await actionBasedOnStatusCode(401, 201, data, returnAllFields(), "/items/list/", "POST", "/items/items_list/")
            } else {
                await actionBasedOnStatusCode(400, 201, data, returnAllFields(), "/items/list/", "POST", "/items/items_list/")
            }
        }
    } else {
        setErrorAttributesToFields(returnAllFields(), validationFieldsList);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    obtainUserInitials();
    clearErrorAttributes(returnAllFields());
    hideUnnecessaryElementsInMenu();
});

async function sendAddItemRequest(url, data, requestMethod) {
    let status;
    let responseData;
    let headers = {
        'Authorization': `Bearer ${window.localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json'
    }
    try {
        const response = await fetch(url, {
            headers: headers,
            body: data,
            method: requestMethod
        });
        responseData = await response.json();
        status = response.status;
        console.log(`Status code: ${status}`);

    } catch (error) {
        console.error(error);
    }
    return responseData;
}