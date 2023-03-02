const nameItemMaxLength = 35;
const barcodeMaxLength = 13;
const amountMaxLength = 10;
import {host, obtainNewAccessToken, obtainUserInitials, fillInitials, clearErrorAttributes, setMaxFieldContainerHeights, removeAllErrorAttributes, allAreFalse} from './utils.js'

const nameField = document.getElementById("name");
const priceField = document.getElementById("price");
const amountInStockField = document.getElementById("amount_in_stock");
const barcodeField = document.getElementById("barcode");
let additionalFieldsContainer;
let amountAdditionalFieldsContainer;

function validateAdditionalUnits() {
    additionalFieldsContainer = document.querySelectorAll('.additional_unit_field');
    let strValidationResult = [];
    for (let field of additionalFieldsContainer) {
        let res = validation(field.value, /^[A-Z][a-z]+$/);
        strValidationResult.push(res);
    }
    return strValidationResult;
}

function validateAdditionalUnitsAmount() {
    amountAdditionalFieldsContainer  = document.querySelectorAll('.amount_additional_unit_field');
    console.log(amountAdditionalFieldsContainer.length)
    let strValidationResult = [];
    for (let field of amountAdditionalFieldsContainer) {
        let res = validation(field.value, /^[0-9]+$/);
        strValidationResult.push(res);
    }
    return strValidationResult;
}

const returnAllFields =  [
        nameField, priceField,
        amountInStockField, barcodeField,
    ];

function validateClientAdd() {
    // removeAllErrorAttributes(returnAllFields);
    // setMaxFieldContainerHeights(returnAllFields);
    // removeAllErrorAttributes(additionalFieldsContainer);
    // setMaxFieldContainerHeights(additionalFieldsContainer);
    return [
        validateName(nameField.value),
        validatePrice(priceField.value),
        validateAmountInStock(amountInStockField.value),
         validateBarcode(barcodeField.value),
    ];
}


function validateName(strToValidate) {
    let strValidationResult;
    if (!strToValidate) {
        strValidationResult = "This field can't be empty";
    } else if (strToValidate.includes(' ')) {
        strValidationResult = "No whitespaces";
    } else if (strToValidate.length > nameItemMaxLength) {
        strValidationResult = `Max length – ${nameItemMaxLength} chars`;
    } else if (!(/^[a-z]+$/.test(strToValidate))) {
        strValidationResult = "Only latin letters";
    } else if (!(/[A-Z]/.test(strToValidate.charAt(0)))) {
        strValidationResult = "Has to begin with capital";
    } else if (strToValidate.replace(/[^A-Z]/g, "").length > 1) {
        strValidationResult = "No more than one capital"
    } else if (!/^[A-Z][a-z]+$/.test(strToValidate)) {
        strValidationResult = "At least one lowercase";
    } else {
        strValidationResult = '';
    }
    return strValidationResult;
}

function validation(fieldToValidate, fieldRegex) {
    let isFieldValid;
    if (fieldToValidate === '') {
        isFieldValid = "This field can't be empty";
    } else if (fieldToValidate.includes(' ')) {
        isFieldValid = "No whitespaces";
    } else if (!(fieldRegex.test(fieldToValidate))) {
        isFieldValid = "Invalid format";
    } else {
        isFieldValid = '';
    }
    console.log(fieldToValidate)
    console.log(isFieldValid)
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
    for (let i=0; i<fields.length; i++) {
        if (errorsObject[i]) {
            fields[i].setAttribute("error", "true");
            fields[i].setAttribute("errorText", errorsObject[i]);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    clearErrorAttributes(returnAllFields);
    clearErrorAttributes(additionalFieldsContainer);
    clearErrorAttributes(amountAdditionalFieldsContainer);
});

document.getElementById("btn").addEventListener("click", async () => {
    const validationFieldAdditionalUnits = validateAdditionalUnits();
    const validationFieldAdditionalUnitsAmount = validateAdditionalUnitsAmount();
    console.log(validationFieldAdditionalUnitsAmount)
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
        setErrorAttributesToFields(returnAllFields, validationFieldsList);
    }
});
