import { host, returnAllFields, nameField, priceField, amountInStockField, barcodeField, currencyField, basicUnitField, additionalFieldsContainer, amountAdditionalFieldsContainer, setErrorAttributesToFields} from './utils_items.js'
import {clearErrorAttributes, setMaxFieldContainerHeights, allAreFalse, validateAdditionalUnits, validateName, validatePrice, validationDropdown, validateAmountInStock, validateBarcode} from './validation_utils.js'
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
    // setMaxFieldContainerHeights(returnAllFields());
    // setMaxFieldContainerHeights(additionalFieldsContainer);
    // setMaxFieldContainerHeights(amountAdditionalFieldsContainer);
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
    const validationFieldAdditionalUnits = validateAdditionalUnits(additionalFieldsContainer, /^[A-Za-z\s]+$/);
    const validationFieldAdditionalUnitsAmount = validateAdditionalUnits(amountAdditionalFieldsContainer, /^[0-9]+$/);
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

document.getElementById("add_item_button").addEventListener("click", async () => {
    const validationFieldsList = validateClientAdd();
    console.log(currencyField);
    console.log(currencyField.value);
    let currencyValue = document.getElementById("currency").value;
    let basicUnitValue = document.getElementById("basic_unit").value
    if (allAreFalse(validationFieldsList)) {
        const data = JSON.stringify({
            name: nameField.value,
            price: parseFloat(priceField.value),
            currency: currencyValue,
            basic_unit: basicUnitValue,
            amount_in_stock: parseInt(amountInStockField.value),
            barcode: barcodeField.value,
        });
        const serverResponseStatus = await sendAddEditRequest(host + "/items/item/", data, "POST");
        actionBasedOnStatusCode(serverResponseStatus, 201, data, returnAllFields(), "/items/list/", "POST", "/items/item/");
    } else {
        setErrorAttributesToFields(validationFieldsList, returnAllFields());
    }
});

document.addEventListener('DOMContentLoaded', () => {
    obtainUserInitials();
    clearErrorAttributes(returnAllFields());
    hideUnnecessaryElementsInMenu();
});