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
    fillFieldsWithData, deleteAdditionalUnit
} from './utils_items.js'
import {hideUnnecessaryElementsInMenu} from './utils_clients.js'
import {
    removeAllErrorAttributes,
    setErrorAttributesToFields,
    clearErrorAttributes,
    setMaxFieldContainerHeights,
    allAreFalse,
    validateName, validatePrice, validateAmountInStock, validateBarcode, validationDropdown,
} from './validation_utils.js'
import { obtainNewAccessToken, obtainUserInitials, actionBasedOnStatusCode, sendAddEditRequest} from './request_utils.js'
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
    const validationFieldsList = validateItemEdit();
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
        const serverResponseStatus = await sendAddEditRequest(host + "/items/items_list/" + itemId, data, "PATCH");
        actionBasedOnStatusCode(serverResponseStatus, 200, data, returnAllFields(), "/items/list/", "PATCH", "/items/items_list/");
    } else {
        setErrorAttributesToFields(validationFieldsList, returnAllFields());
    }
});
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

function removeLabels(index) {
    additionalUnitCell[index].classList.add("hidden");
    additionalUnits[index].parentNode.classList.add("d-none");
    additionalUnits[index].parentNode.classList.remove("d-flex");
    removeTextFromTable(document.querySelector(`#Aditional_unit_${index + 1}`), `Aditional unit ${index + 1}`);
    removeTextFromTable(document.querySelector(`#AU${index + 1}_val`), "");
    additionalUnits[index].value = "";
    amountAdditionalUnitField[index].value = "";
    --numOfRowsObject.numOfRows;
}

hideUnnecessaryElementsInMenu();

document.querySelector("#additional_item_button").addEventListener("click", () => {
    addLabels();
    console.log("Button is clicked");
});
