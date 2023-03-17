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
import {obtainNewAccessToken, obtainUserInitials, actionBasedOnStatusCode, sendAddEditRequest} from './request_utils.js'

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
    let statusCodesOfResponses = [];
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
        let additionalUnitsFields = document.querySelectorAll(".d-flex.additional_unit");
        const updateItemServerResponseStatus = await sendAddEditRequest(host + "/items/items_list/" + itemId, data, "PATCH");
        statusCodesOfResponses.push(updateItemServerResponseStatus);
        const listOfNewAdditionalUnits = getListOfNewAdditionalUnits(additionalUnitsFields);
        if (listOfNewAdditionalUnits.length > 0) {
            for (const currentAdditionalBlock of listOfNewAdditionalUnits) {
                const additionalUnitData = JSON.stringify({
                    item: itemId,
                    additional_unit_name: currentAdditionalBlock.children[0].value,
                    quantity: parseFloat(currentAdditionalBlock.children[1].value),
                });
                const addAdditionalUnitServerResponseStatus = await sendAddEditRequest(host + "/items/additional_units/", additionalUnitData, "POST");
                statusCodesOfResponses.push(addAdditionalUnitServerResponseStatus);
            }
        }
        const listOfExistAdditionalUnits = getListOfExistAdditionalUnits(additionalUnitsFields);
        if (listOfExistAdditionalUnits.length > 0) {
            for (const currentAdditionalBlock of listOfExistAdditionalUnits) {
                const additionalUnitData = JSON.stringify({
                    item: itemId,
                    additional_unit_name: currentAdditionalBlock.children[0].value,
                    quantity: parseFloat(currentAdditionalBlock.children[1].value),
                });
                const updateAdditionalUnitServerResponseStatus = await sendAddEditRequest(host + "/items/additional_units/", additionalUnitData, "PATCH");
                statusCodesOfResponses.push(updateAdditionalUnitServerResponseStatus);
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
    let listOfNewAdditionalUnits = [];
    for (let i = 0; i < listOfAdditionalUnitsFields.length; i++) {
        if (listOfAdditionalUnitsFields[i].getAttribute("data-additional-unit-id") != null) {
            listOfNewAdditionalUnits.push(listOfAdditionalUnitsFields[i]);
        }
    }
    return listOfNewAdditionalUnits;
}

document.addEventListener('DOMContentLoaded', () => {
    clearErrorAttributes(returnAllFields());
    obtainUserInitials();
});

fillFieldsWithData();
hideUnnecessaryElementsInMenu();
deleteAdditionalUnit();


function addLabels() {
    if (numOfRowsObject.numOfRows >= maxNumOfUnits) {
        alert(`You can't add more than ${maxNumOfUnits} additional units!`);
        return;
    }
    removeAllErrorAttributes(additionalFieldsContainer);
    removeAllErrorAttributes(amountAdditionalFieldsContainer);
    let index = 0;
    for (let i = 0; i <= numOfRowsObject.numOfRows; i++) {
        if (additionalUnitCell[i].classList.contains("hidden")) {
            index = i;
            break;
        }
    }
    additionalUnitCell[index].classList.remove("hidden");
    additionalUnits[index].parentNode.classList.remove("d-none");
    additionalUnits[index].parentNode.classList.add("d-flex");
    ++numOfRowsObject.numOfRows;
}


hideUnnecessaryElementsInMenu();

document.querySelector("#additional_item_button").addEventListener("click", () => {
    addLabels();
    console.log("Button is clicked");
});
