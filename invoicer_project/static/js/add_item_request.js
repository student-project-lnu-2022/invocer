const barcodeMaxLength = 13;
const amountMaxLength = 10;
import { host, obtainNewAccessToken, obtainUserInitials, fillInitials, validateName, validation, clearErrorAttributes, setMaxFieldContainerHeights, allAreFalse } from './utils.js'

const nameField = document.getElementById("name");
const priceField = document.getElementById("price");
const amountInStockField = document.getElementById("amount_in_stock");
const barcodeField = document.getElementById("barcode");
const currencyField = document.getElementById("currency").parentElement;
const basicUnitField = document.getElementById("basic_unit").parentElement;
let additionalFieldsContainer;
let amountAdditionalFieldsContainer;

function validateAdditionalUnits() {
    additionalFieldsContainer = document.querySelectorAll('.additional_unit_field');
    let strValidationResult = [];
    for (let i =0; i< num_of_rows; i++) {
        let res = validationDropdown(`AU${i+1}`);
        strValidationResult.push(res);
    }
    return strValidationResult;
}

function validateAdditionalUnitsAmount() {
    amountAdditionalFieldsContainer = document.querySelectorAll('.amount_additional_unit_field');
    let strValidationResult = [];
    for (let field of amountAdditionalFieldsContainer) {
        let res = validation(field.value, /^[0-9]+$/);
        strValidationResult.push(res);
    }
    return strValidationResult;
}

const returnAllFields = function () {
    return [
        nameField, priceField, currencyField, basicUnitField,
        amountInStockField, barcodeField,
    ];
}

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

function validationDropdown(dropdownId) {
    let isFieldValid;
    let dropdownElement = document.querySelector('#' + dropdownId);
    if (dropdownElement.value === "") {
        isFieldValid = "This field can't be empty";
    }
    return isFieldValid;
}

function validatePrice(priceToValidate) {
    let isPriceValid;
    if (priceToValidate === '') {
        isPriceValid = "This field can't be empty";
    } else if (priceToValidate.includes(' ')) {
        isPriceValid = "No whitespaces";
    } else if (!(/^(\d*([.,](?=\d{3}))?\d+)+((?!\2)[.,]\d\d)?$/.test(priceToValidate))) {
        isPriceValid = "Invalid format";
    } else {
        isPriceValid = '';
    }
    return isPriceValid;
}

function validateAmountInStock(amountToValidate) {
    let isAmountValid;
    if (amountToValidate === '') {
        isAmountValid = "This field can't be empty";
    } else if (amountToValidate.length > amountMaxLength) {
        isAmountValid = `Max length – ${amountMaxLength} chars`;
    } else if (!/^[0-9]+$/.test(amountToValidate)) {
        isAmountValid = "Invalid format";
    } else {
        isAmountValid = '';
    }
    return isAmountValid;
}

function validateBarcode(barcodeToValidate) {
    let isBarcodeValid;
    if (barcodeToValidate === '') {
        isBarcodeValid = "This field can't be empty";
    } else if (barcodeToValidate.length !== barcodeMaxLength) {
        isBarcodeValid = `Length must be – ${barcodeMaxLength} numbers`;
    } else if (!/^[0-9]+$/.test(barcodeToValidate)) {
        isBarcodeValid = "Invalid format";
    } else {
        isBarcodeValid = '';
    }
    return isBarcodeValid;
}

function setErrorAttributesToFields(fields, errorsObject) {
    for (let i = 0; i < fields.length; i++) {
        if (errorsObject[i]) {
            if (fields[i].classList.contains("dropdown_list")) {
                fields[i].querySelector(".dropdown__button").classList.add("dropdown__button_error");
            }
            fields[i].setAttribute("error", "true");
            fields[i].setAttribute("errorText", errorsObject[i]);
        }
    }
}


document.addEventListener('DOMContentLoaded', () => {
    obtainUserInitials();
    clearErrorAttributes(returnAllFields());
});

document.getElementById("btn").addEventListener("click", async () => {
    const validationFieldAdditionalUnits = validateAdditionalUnits();
    const validationFieldAdditionalUnitsAmount = validateAdditionalUnitsAmount();
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
