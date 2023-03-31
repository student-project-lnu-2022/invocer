import {
    host,
    returnAllFields,
    nameField,
    priceField,
    amountInStockField,
    barcodeField,
    additionalFieldsContainer,
    currencyField,
    basicUnitField,
    amountAdditionalFieldsContainer,
    itemId,
    fillFieldsWithData,
    deleteAdditionalUnit,
} from './utils_items.js'
import {
    hideUnnecessaryElementsInMenu,
} from './utils_clients.js'
import {
    removeAllErrorAttributes,
    setErrorAttributesToFields,
    clearErrorAttributes,
    allAreFalse,
    validateName, validatePrice, validateAmountInStock, validateBarcode, validationDropdown, validation,
} from './validation_utils.js'
import {
    obtainUserInitials,
    checkUserSessionStatus,
    sendAddEditRequest
} from './request_utils.js'

function validateItemEdit() {
    removeAllErrorAttributes(returnAllFields());
    clearErrorAttributes(additionalFieldsContainer);
    clearErrorAttributes(amountAdditionalFieldsContainer);
    return {
        'nameValidationResult': validateName(nameField.value),
        'priceValidationResult': validatePrice(priceField.value),
        'currencyValidationResult': validationDropdown("currency_input_dropdown"),
        'basicUnitValidationResult': validationDropdown("units_input_dropdown"),
        'amountInStockValidationResult': validateAmountInStock(amountInStockField.value),
        'barcodeValidationResult': validateBarcode(barcodeField.value)
    };
}

function validateAdditionalUnits() {
    clearErrorAttributes(additionalFieldsContainer);
    clearErrorAttributes(amountAdditionalFieldsContainer);
    const additionalUnitsFields = document.querySelectorAll(".d-flex.additional_unit");
    const validationResults = [];

    for (let i = 0; i < additionalUnitsFields.length; i++) {
        const additionalUnitName = additionalUnitsFields[i].querySelector('.additional_unit_field').value;
        const additionalUnitQuantity = additionalUnitsFields[i].querySelector('.amount_additional_unit_field').value;

        const validationResult = {
            'additionalUnitNameValidationResult': validation(additionalUnitName, /^[a-zа-яіїєґA-ZA-ЯІЇЄҐ]+$/),
            'additionalUnitQuantityValidationResult': validateAmountInStock(additionalUnitQuantity)
        };
        validationResults.push(validationResult);
    }
    return validationResults;
}


document.getElementById("edit_item_button").addEventListener("click", async () => {
    const validationFieldsList = validateItemEdit();
    const validationAdditionalUnitsFieldsList = validateAdditionalUnits();

    let currencyValue = currencyField.value;
    let basicUnitValue = basicUnitField.value;

    console.log(validationAdditionalUnitsFieldsList);
    console.log(validationAdditionalUnitsFieldsList.every(allAreFalse));

    console.log("FIELDS: " + validationFieldsList);
    console.log("ADDITONAL FIELDS: " + validationAdditionalUnitsFieldsList);


    if (allAreFalse(validationFieldsList) && validationAdditionalUnitsFieldsList.every(allAreFalse)) {
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
            for (const currentAdditionalBlock of listOfNewAdditionalUnits) {
                if (validationAdditionalUnitsFieldsList.every(allAreFalse)) {
                    const additionalUnitData = JSON.stringify({
                        item: itemId,
                        additional_unit_name: currentAdditionalBlock.children[0].value,
                        quantity: parseFloat(currentAdditionalBlock.children[1].value),
                    });
                    const addAdditionalUnitServerResponseStatus = await sendAddEditRequest(host + "/items/additional_units/", additionalUnitData, "POST");
                    await checkUserSessionStatus(201, addAdditionalUnitServerResponseStatus, data, "PATCH", host + "/items/items_list/" + itemId);

                } else {
                    for (let i = 0; i < validationAdditionalUnitsFieldsList.length; i++) {
                        let additionalUnitFields = [];
                        additionalUnitFields.push(document.getElementById(`AU${i + 1}`));
                        additionalUnitFields.push(document.getElementById(`amount_AU${i + 1}`));
                        setErrorAttributesToFields(validationAdditionalUnitsFieldsList[i], additionalUnitFields);
                    }
                    return;
                }
            }
        }


        const listOfExistAdditionalUnits = getListOfExistAdditionalUnits(additionalUnitsFields);
        if (listOfExistAdditionalUnits.length > 0) {
            for (const currentAdditionalBlock of listOfExistAdditionalUnits) {
                if (validationAdditionalUnitsFieldsList.every(allAreFalse)) {
                    const additionalUnitId = currentAdditionalBlock.getAttribute("data-additional-unit-id")
                    const additionalUnitData = JSON.stringify({
                        additional_unit_name: currentAdditionalBlock.children[0].value,
                        quantity: parseFloat(currentAdditionalBlock.children[1].value),
                    });

                    const updateAdditionalUnitServerResponseStatus = await sendAddEditRequest(host + "/items/additional_units/" + additionalUnitId, additionalUnitData, "PATCH");
                    await checkUserSessionStatus(201, updateAdditionalUnitServerResponseStatus, data, "PATCH", host + "/items/items_list/" + itemId);
                } else {
                    for (let i = 0; i < validationAdditionalUnitsFieldsList.length; i++) {
                        let additionalUnitFields = [];
                        additionalUnitFields.push(document.getElementById(`AU${i + 1}`));
                        additionalUnitFields.push(document.getElementById(`amount_AU${i + 1}`));
                        setErrorAttributesToFields(validationAdditionalUnitsFieldsList[i], additionalUnitFields);
                    }
                    return;
                }
            }
        }
        window.location.href = host + "/items/list/";
    } else {
        setErrorAttributesToFields(validationFieldsList, returnAllFields());
        for (let i = 0; i < validationAdditionalUnitsFieldsList.length; i++) {
            let additionalUnitFields = [];
            additionalUnitFields.push(document.getElementById(`AU${i + 1}`));
            additionalUnitFields.push(document.getElementById(`amount_AU${i + 1}`));
            setErrorAttributesToFields(validationAdditionalUnitsFieldsList[i], additionalUnitFields);
        }
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
