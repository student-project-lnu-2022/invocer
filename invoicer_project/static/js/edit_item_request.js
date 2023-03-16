import { host, returnAllFields, getItemById, nameField, priceField, amountInStockField, barcodeField, currencyField, basicUnitField, additionalFieldsContainer, amountAdditionalFieldsContainer, itemId} from './utils_items.js'
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

document.getElementById("request_edit_sender").addEventListener("click", async () => {
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
})

document.addEventListener('DOMContentLoaded', () => {
    clearErrorAttributes(returnAllFields());
    obtainUserInitials();
});

fillFieldsWithData();
hideUnnecessaryElementsInMenu();

async function fillFieldsWithData() {
    let responseFromServer = await getItemById(itemId);
    document.getElementById("name").value = responseFromServer["name"];
    document.getElementById("price").value = responseFromServer["price"];
    document.getElementById("currency").value = responseFromServer["currency"];
    document.getElementById("basic_unit").value = responseFromServer["basic_unit"];
    document.getElementById("amount_in_stock").value = responseFromServer["amount_in_stock"];
    document.getElementById("barcode").value = responseFromServer["barcode"];
}
hideUnnecessaryElementsInMenu();