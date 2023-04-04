import {
    host,
    returnAllFields,
    nameField,
    priceField,
    amountInStockField,
    barcodeField,
    additionalFieldsContainer,
    amountAdditionalFieldsContainer,
    setErrorAttributesToFields, currencyField, basicUnitField
} from './utils_items.js'
import {
    clearErrorAttributes,
    allAreFalse,
    validateAdditionalUnits,
    validateName,
    validatePrice,
    validationDropdown,
    validateAmountInStock,
    validateBarcode, setErrorAttributeToDropdown,
} from './validation_utils.js'
import {actionBasedOnStatusCode, obtainUserInitials, sendAddEditRequest} from './request_utils.js'
import {
    countryField,
    hideUnnecessaryElementsInMenu,
} from './utils_clients.js'
import {removeStylesFromDropdownElements} from "./dropdown.js";


function validateItemAdd() {
    clearErrorAttributes(returnAllFields());
    clearErrorAttributes(additionalFieldsContainer);
    clearErrorAttributes(amountAdditionalFieldsContainer);
    return [
        validateName(nameField.value),
        validatePrice(priceField.value),
        validationDropdown("currency_input_dropdown"),
        validationDropdown("units_input_dropdown"),
        validateAmountInStock(amountInStockField.value),
        validateBarcode(barcodeField.value),

    ];
}


document.getElementById("add_item_button").addEventListener("click", async () => {
    const validationFieldAdditionalUnits = validateAdditionalUnits(additionalFieldsContainer, /^[a-zа-яіїєґA-ZA-ЯІЇЄҐ]+$/);
    const validationFieldAdditionalUnitsAmount = validateAdditionalUnits(amountAdditionalFieldsContainer, /^\d+([., ]?(\d){1,2}?)?$/);
    const validationFieldsList = validateItemAdd();

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
        if (validationFieldsList[2]) {
            setErrorAttributeToDropdown(currencyField.parentNode);
            errorDropdownCurrencyFieldText.style.display = "flex";
        }
        if (validationFieldsList[3]) {
            setErrorAttributeToDropdown(basicUnitField.parentNode);
            errorDropdownUnitFieldText.style.display = "flex";
        }
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
    const validationFieldsList = validateItemAdd();
    let currencyValue = document.getElementById("currency_input_dropdown").value;
    let basicUnitValue = document.getElementById("units_input_dropdown").value
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

const errorDropdownUnitFieldText = document.querySelector(".error_unit_dropdown");
const errorDropdownCurrencyFieldText = document.querySelector(".error_currency_dropdown");


function removeErrorAttributeFromDropdown() {
    currencyField.parentNode.addEventListener("click", () => {
        currencyField.parentNode.classList.remove('error');
        errorDropdownCurrencyFieldText.style.display = "none";
    });

    basicUnitField.parentNode.addEventListener("click", () => {
        basicUnitField.parentNode.classList.remove('error');
        errorDropdownUnitFieldText.style.display = "none";
    });
}

removeErrorAttributeFromDropdown();