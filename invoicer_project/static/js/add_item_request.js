import { host, returnAllFields, nameField, priceField, amountInStockField, barcodeField, currencyField, basicUnitField, additionalFieldsContainer, amountAdditionalFieldsContainer, setErrorAttributesToFields} from './utils_items.js'
import {clearErrorAttributes, setMaxFieldContainerHeights, allAreFalse, validateAdditionalUnits, validateName, validatePrice, validationDropdown, validateAmountInStock, validateBarcode} from './validation_utils.js'
import { obtainNewAccessToken, obtainUserInitials} from './request_utils.js'
import {hideUnnecessaryElementsInMenu} from './utils_clients.js'


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


document.getElementById("btn").addEventListener("click", async () => {
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


document.addEventListener('DOMContentLoaded', () => {
    obtainUserInitials();
    clearErrorAttributes(returnAllFields());
    hideUnnecessaryElementsInMenu();
});