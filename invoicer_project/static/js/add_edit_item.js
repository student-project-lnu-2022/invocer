import {nameField, priceField, amountInStockField, barcodeField, additionalFieldsContainer, amountAdditionalFieldsContainer,
    maxNumOfUnits, additionalUnitCell, additionalUnits, amountAdditionalUnitField, inputBarcodeVal, inputNameVal, inputAmountInStockVal,
    inputBasicUnitVal, inputCurrencyVal, inputPriceVal, inputBasicUnit, inputCurrency} from './utils_items.js'
import { removeAllErrorAttributes } from './validation_utils.js';
let numOfRows = 0;

document.querySelectorAll('.dropdown_list').forEach(function (dropdownWrapper) {
    const dropdownBtn = dropdownWrapper.querySelector('.dropdown__button');
    const dropdownArrow = dropdownWrapper.querySelector(".arrow-up");
    const dropdownList = dropdownWrapper.querySelector('.dropdown__list');
    const dropdownInput = dropdownWrapper.querySelector('.dropdown__input_hidden');
    dropdownWrapper.addEventListener('click', function (e) {
        const target = e.target;
        if(target.nodeName === 'BUTTON') {
            dropdownArrow.classList.toggle("arrow-up");
            dropdownArrow.classList.toggle("arrow-up-active");
            dropdownList.classList.toggle('dropdown__list_visible');
            dropdownBtn.classList.toggle('dropdown__button_active');
        }
        if(target.nodeName === 'LI') {
            target.classList.add('dropdown__list-item_active');
            dropdownBtn.innerText = target.innerText;
            dropdownInput.setAttribute("value", target.dataset.value);
            input_currency_table();
            input_basic_unit_table();
            dropdownArrow.classList.add("arrow-up");
            dropdownArrow.classList.remove("arrow-up-active");
            dropdownList.classList.remove('dropdown__list_visible');
        }
        if (target !== dropdownBtn) {
            dropdownArrow.classList.add("arrow-up");
            dropdownArrow.classList.remove("arrow-up-active");
            dropdownBtn.classList.remove('dropdown__button_active');
            dropdownList.classList.remove('dropdown__list_visible');
        }
        });
    })


for (let i = 0; i < maxNumOfUnits; i++) {
    amountAdditionalUnitField[i].addEventListener("input", () => {
        const inputRowVal = document.querySelector(`#AU${i + 1}_val`);
        setTextToTable(inputRowVal, amountAdditionalUnitField[i].value + " " + inputBasicUnit.value);
    });
    additionalUnits[i].addEventListener("input", ()=> {
        let data1 = document.querySelector(`#AU${i + 1}`).value;
        setTextToTable(document.querySelector(`#Aditional_unit_${i + 1}`), data1);
});
}

function addLabels() {
    if (numOfRows >= maxNumOfUnits) {
        alert(`You can't add more than ${maxNumOfUnits} additional units!`);
        return;
    }
    removeAllErrorAttributes(additionalFieldsContainer);
    removeAllErrorAttributes(amountAdditionalFieldsContainer);
    let index = 0;
    for (let i = 0; i <= numOfRows; i++) {
        if (additionalUnitCell[i].classList.contains("hidden")) {
            index = i;
            break;
        }
    }
    additionalUnitCell[index].classList.remove("hidden");
    additionalUnits[index].parentNode.classList.remove("d-none");
    additionalUnits[index].parentNode.classList.add("d-flex");
    ++numOfRows;
}

function removeLabels(index) {
    additionalUnitCell[index].classList.add("hidden");
    additionalUnits[index].parentNode.classList.add("d-none");
    additionalUnits[index].parentNode.classList.remove("d-flex");
    removeTextFromTable(document.querySelector(`#Aditional_unit_${index + 1}`), `Aditional unit ${index + 1}`);
    removeTextFromTable(document.querySelector(`#AU${index + 1}_val`), "");
    additionalUnits[index].value = "";
    amountAdditionalUnitField[index].value = "";
    --numOfRows;
}

const closeButton = document.querySelectorAll(".close_btn");
for (let i=0; i<closeButton.length; i++) {
    closeButton[i].addEventListener('click', ()=>{removeLabels(i)});
}

document.querySelector("#additional_item_button").addEventListener("click", () => { addLabels() });

function setTextToTable(inputElement, inputData) {
    inputElement.setAttribute('data-text', inputData);
    inputElement.innerHTML = inputElement.getAttribute('data-text');
}

function removeTextFromTable(inputElement, data) {
    inputElement.removeAttribute('data-text');
    inputElement.innerHTML = data;
}

function isFieldEmpty(input_field, fieldLabel, resultValue) {
    let data = input_field.value;
    if (data === fieldLabel) {
        data = resultValue;
    }
    return data;
}

priceField.addEventListener('input', () => { setTextToTable(inputPriceVal, priceField.value) });

function input_currency_table() {
    let data = isFieldEmpty(inputCurrency, "Currency", "");
    setTextToTable(inputCurrencyVal, data);
}


amountInStockField.addEventListener('input', () => {
    let data = isFieldEmpty(inputBasicUnit, "Basic unit", "");
    setTextToTable(inputAmountInStockVal, amountInStockField.value + " " + data);
});

nameField.addEventListener('input', () => {
    let data = isFieldEmpty(nameField, "", "Name of item");
    setTextToTable(inputNameVal, data);
});

barcodeField.addEventListener('input', () => { setTextToTable(inputBarcodeVal, `Barcode: ${barcodeField.value}`) });


function input_basic_unit_table() {
    let basicUnitData = isFieldEmpty(inputBasicUnit, "Basic unit", "");

    setTextToTable(inputBasicUnitVal, basicUnitData);
    setTextToTable(inputAmountInStockVal, amountInStockField.value + " " + basicUnitData);

    if (numOfRows <= 0) return;
    let field, data;
    for (let i = 0; i < numOfRows; i++) {
        field = document.getElementById(`AU${i + 1}_val`);
        data = field.getAttribute('data-text');
        if (data === null) {
            data = "";
        } else {
            data = data.split(" ")[0];
        }
        setTextToTable(field, data + " " + basicUnitData);
    }
}
