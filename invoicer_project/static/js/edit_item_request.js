import {
    host,
    returnAllFields,
    getItemById,
    nameField,
    priceField,
    amountInStockField,
    barcodeField,
    currencyField,
    basicUnitField,
    additionalFieldsContainer,
    amountAdditionalFieldsContainer,
    itemId,
    fillFieldsWithData,
    deleteAdditionalUnit,
    numOfRowsObject,
    maxNumOfUnits,
    additionalUnitCell,
    additionalUnits,
    amountAdditionalUnitField
} from './utils_items.js'
import {
    addressField,
    cityField, clientId,
    countryField,
    emailField,
    hideUnnecessaryElementsInMenu,
    surnameField,
    telephoneField,
    zipField
} from './utils_clients.js'
import {
    removeAllErrorAttributes,
    setErrorAttributesToFields,
    clearErrorAttributes,
    setMaxFieldContainerHeights,
    allAreFalse,
    validateName, validatePrice, validateAmountInStock, validateBarcode, validationDropdown,
} from './validation_utils.js'
import {
    obtainNewAccessToken,
    obtainUserInitials,
    actionBasedOnStatusCode,
    checkUserSessionStatus,
    sendAddEditRequest
} from './request_utils.js'

function validateItemEdit() {
    removeAllErrorAttributes(returnAllFields());
    setMaxFieldContainerHeights(returnAllFields());
    return {
        'nameValidationResult': validateName(nameField.value),
        'priceValidationResult': validatePrice(priceField.value),
        'currencyValidationResult': validationDropdown("currency"),
        'basicUnitValidationResult': validationDropdown("basic_unit"),
        'amountInStockValidationResult': validateAmountInStock(amountInStockField.value),
        'barcodeValidationResult': validateBarcode(barcodeField.value)
    };
}

document.getElementById("edit_item_button").addEventListener("click", async () => {
    // const validationFieldsList = validateItemEdit();
    let currencyValue = document.getElementById("currency").value;
    let basicUnitValue = document.getElementById("basic_unit").value
    if (true) {
        const data = JSON.stringify({
            name: nameField.value,
            price: parseFloat(priceField.value),
            currency: currencyValue,
            basic_unit: basicUnitValue,
            amount_in_stock: parseFloat(amountInStockField.value),
            barcode: barcodeField.value,
        });

        const updateItemServerResponseStatus = await sendAddEditRequest(host + "/items/items_list/" + itemId, data, "PATCH");
        await checkUserSessionStatus(200, updateItemServerResponseStatus, data, "PATCH", host + "/items/items_list/" + itemId);


        let additionalUnitsFields = document.querySelectorAll(".d-flex.additional_unit");

        const listOfNewAdditionalUnits = getListOfNewAdditionalUnits(additionalUnitsFields);

        if (listOfNewAdditionalUnits.length > 0) {
            for (let currentAdditionalBlock of listOfNewAdditionalUnits) {
                const additionalUnitData = JSON.stringify({
                    item: itemId,
                    additional_unit_name: currentAdditionalBlock.children[0].value,
                    quantity: parseFloat(currentAdditionalBlock.children[1].value),
                });
                const addAdditionalUnitServerResponseStatus = await sendAddEditRequest(host + "/items/additional_units/", additionalUnitData, "POST");
                await checkUserSessionStatus(201, addAdditionalUnitServerResponseStatus, data, "PATCH", host + "/items/items_list/" + itemId);
            }
        }

        const listOfExistAdditionalUnits = getListOfExistAdditionalUnits(additionalUnitsFields);

        if (listOfExistAdditionalUnits.length > 0) {
            for (const currentAdditionalBlock of listOfExistAdditionalUnits) {
                const additionalUnitId = currentAdditionalBlock.getAttribute("data-additional-unit-id")
                const additionalUnitData = JSON.stringify({
                    additional_unit_name: currentAdditionalBlock.children[0].value,
                    quantity: parseFloat(currentAdditionalBlock.children[1].value),
                });

                const updateAdditionalUnitServerResponseStatus = await sendAddEditRequest(host + "/items/additional_units/" + additionalUnitId, additionalUnitData, "PATCH");
                await checkUserSessionStatus(201, updateAdditionalUnitServerResponseStatus, data, "PATCH", host + "/items/items_list/" + itemId);
            }
        }
    } else {
        setErrorAttributesToFields(validationFieldsList, returnAllFields());
    }
});

function getListOfNewAdditionalUnits(listOfAdditionalUnitsFields) {
    let listOfNewAdditionalUnits = [];
    for (let i = 0; i < listOfAdditionalUnitsFields.length; i++) {
        if (listOfAdditionalUnitsFields[i].getAttribute("data-additional-unit-id") == null) {
            listOfNewAdditionalUnits.push(listOfAdditionalUnitsFields[i]);
        }
    }
    return listOfNewAdditionalUnits;
}

function getListOfExistAdditionalUnits(listOfAdditionalUnitsFields) {
    let listOfExistAdditionalUnits = [];
    for (let i = 0; i < listOfAdditionalUnitsFields.length; i++) {
        if (listOfAdditionalUnitsFields[i].getAttribute("data-additional-unit-id") != null) {
            listOfExistAdditionalUnits.push(listOfAdditionalUnitsFields[i]);
        }
    }
    return listOfExistAdditionalUnits;
}

document.addEventListener('DOMContentLoaded', () => {
    clearErrorAttributes(returnAllFields());
    obtainUserInitials();
});

fillFieldsWithData();
hideUnnecessaryElementsInMenu();
deleteAdditionalUnit();
hideUnnecessaryElementsInMenu();
