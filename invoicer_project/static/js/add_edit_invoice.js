import { getUserData, obtainNewAccessToken, obtainUserInitials } from "./request_utils.js";
import { Item } from "./item.js";
import {
    validateAmountInStock as validateAmount, validatePrice,
    allAreFalse, setErrorAttributesToFields,
    clearErrorAttributes, validationDropdown,
    removeAllErrorAttributes, removeStylesFromDropdownElement
} from './validation_utils.js';
import { hideUnnecessaryElementsInMenu } from "./utils_clients.js";
import { host } from "./utils_clients.js";

const addMoreItems = document.querySelector('#item_to_table');
const saveToTable = document.querySelector('#save_changes');
const invoiceNameDisplay = document.querySelector('#invoice_name_display');
const clientPhoneDisplay = document.querySelector('#client_phone_display');
const clientNameDisplay = document.querySelector('#client_name_display');
const clientEmailDisplay = document.querySelector('#client_email_display');
const invoiceCurrencyDisplay = document.querySelector('#invoice_currency_display');
const totalPrice = document.querySelector('#total_price');
const dateOfInvoiceDisplay = document.querySelector('#inv_date_display');
const dateOfPaymentDisplay = document.querySelector('#payment_date_display');
export const dateOfInvoiceField = document.querySelector('#date_of_invoice');
export const dateOfPaymentField = document.querySelector('#date_of_payment');
export const itemsField = document.querySelector('#item-list');
export const priceField = document.querySelector('#price-field');
export const unitField = document.querySelector('#unit-list');
export const amountField = document.querySelector('#item_amount');

export const invoiceTable = document.querySelector('#table');
export const clientNameField = document.querySelector("#client-field");
export const currencyField = document.querySelector("#currency_input_dropdown");
export const invoiceNameField = document.querySelector("#invoice_name");

export const itemsList = [];
let clickHandler;

function returnAllItemsFields() {
    return [itemsField, unitField, amountField, priceField];
}

function returnAllFieldsList() {
     return [invoiceNameField, clientNameField, currencyField,
        dateOfInvoiceField, dateOfPaymentField,
        itemsField, unitField, amountField, priceField];
}

function validateAmountInStock(amountValue)
{
    const firstValidation = validateAmount(amountValue);
    if (firstValidation) return firstValidation;
    return (amountValue != 0) ? '' : "Amount can't be 0";
}

function validateAddingItemToTable() {
    removeAllErrorAttributes(returnAllItemsFields());
    return [
        validationDropdown("item-list"),
        validationDropdown("unit-list"),
        validateAmountInStock(amountField.value),
        validatePrice(priceField.value)
    ];
}

function arrayWithData() {
    return [itemsField.value,
    amountField.value,
    unitField.value,
    priceField.value,
    priceField.value * amountField.value]
}

function hideSaveButton() {
    saveToTable.style.visibility = 'hidden';
    saveToTable.removeEventListener('click', clickHandler);
}

function findItemIdForTableRow() {
    const items = itemsField.parentElement.lastElementChild;
    let found = items.querySelector('.active');
    return found ? found.dataset.id : -1;
}

function createAndFillTableRow(valList) {
    const tableRow = document.createElement('div');
    tableRow.classList.add('row', 'text-left', 'table-row', 'align-items-center');
    const found = findItemIdForTableRow();
    tableRow.setAttribute('data-item_id', found);
    for (let i = 0; i < 5; ++i) {
        const rowIdentifier = (i === 5) ? 'second_col' : 'first_col';
        const tempElem = document.createElement('div');
        tempElem.classList.add('col-2', rowIdentifier);
        tempElem.textContent = valList[i];
        tableRow.appendChild(tempElem);
    }
    totalPrice.textContent = parseFloat(totalPrice.textContent) + valList.at(-1);
    return tableRow;
}

function createIconButton(text) {
    const button = document.createElement('md-standard-icon-button');
    const icon = document.createElement('md-icon');
    button.classList.add('col-1');
    button.style.maxHeight = '30px';
    icon.innerText = text;
    button.appendChild(icon);
    return button;
}

function setDefaultToDropdown(element, text) {
    const allFromdropdown = element.parentElement.children;
    element.parentElement.removeAttribute('value');
    element.removeAttribute('value');
    allFromdropdown[3].textContent = text;
    element.classList.add('noselection');
    const selectedItem = allFromdropdown[4].querySelector('.active');
    if (selectedItem !== null)
        selectedItem.classList.remove('active', 'selected');
}

function clearAllFields() {
    amountField.value = "";
    priceField.value = "";
    setDefaultToDropdown(itemsField, "Select item");
    setDefaultToDropdown(unitField, "Select unit");
}


function loadValuetoUnitDropdown(loadedValue) {
    const allDropdownchildren = unitField.parentElement.children;
    const attributedRow = allDropdownchildren[4].querySelector(`[data-value="${loadedValue}"]`);
    if (attributedRow) {
        attributedRow.classList.add('active', 'selected');
        unitField.setAttribute('value', attributedRow.dataset.value);
        allDropdownchildren[0].setAttribute('value', loadedValue);
        allDropdownchildren[3].textContent = attributedRow.textContent;
        return;
    }
    allDropdownchildren[0].classList.add('noselection');
    allDropdownchildren[3].textContent = "Select unit";
}

function loadValueToItemDropdown(itemId) {
    const allDropdownchildren = itemsField.parentElement.children;
    const attributedRow = allDropdownchildren[4].querySelector(`[data-id="${itemId}"]`);
    if (attributedRow) {
        attributedRow.classList.add('active', 'selected');
        itemsField.setAttribute('value', attributedRow.textContent);
        allDropdownchildren[0].setAttribute('value', itemsField.value);
        allDropdownchildren[3].textContent = itemsField.value;
        loadUnitBasedOnChosenItem(itemId);
        return;
    }
    allDropdownchildren[0].classList.add('noselection');
    allDropdownchildren[2].textContent = "Select item";
}

function loadDataToEdit(event) {
    const tableRow = event.target.parentElement;
    const columns = tableRow.querySelectorAll('div');
    loadValueToItemDropdown(tableRow.dataset.item_id);
    loadValuetoUnitDropdown(columns[2].textContent);
    removeAllErrorAttributes(returnAllItemsFields());
    addMoreItems.style.visibility = 'hidden';
    saveToTable.style.visibility = 'visible';
    clickHandler = function () {
        if (modifyTable(columns)) {
            saveToTable.removeEventListener('click', clickHandler);
            saveToTable.style.visibility = 'hidden';
            addMoreItems.style.visibility = 'visible';
        }
    }
    saveToTable.addEventListener('click', clickHandler);
}

function modifyTable(arrayOfColumns) {
    const validationResult = validateAddingItemToTable(returnAllItemsFields());
    if (allAreFalse(validationResult)) {
        totalPrice.textContent = parseFloat(totalPrice.textContent) - (parseFloat(arrayOfColumns[4].textContent) - parseFloat(amountField.value * priceField.value));
        arrayOfColumns[0].textContent = itemsField.value;
        arrayOfColumns[1].textContent = amountField.value;
        arrayOfColumns[2].textContent = unitField.value;
        arrayOfColumns[3].textContent = priceField.value;
        arrayOfColumns[4].textContent = amountField.value * priceField.value;
        arrayOfColumns[0].parentElement.dataset.item_id = findItemIdForTableRow();
        clearAllFields();
    } else {
        setErrorAttributesToFields(validationResult, returnAllItemsFields());
    }
    return allAreFalse(validationResult);
}

function loadItemsToDropdown(data, currency) {
    const menu = itemsField.parentElement.children[4];
    while (menu.firstChild) {
        menu.lastChild.remove();
    }
    for (let item of data) {
        if(item.currency === currency){
            const div = document.createElement('div');
            div.classList.add('item');
            div.setAttribute('data-id', item.id);
            div.setAttribute('data-value', item.title);
            div.textContent = item.title;
            menu.appendChild(div);
        }  
    }
}

function loadUnitBasedOnChosenItem(itemId) {
    const unitMenu = unitField.parentElement.querySelector('.menu');
    while (unitMenu.firstChild) {
        unitMenu.lastChild.remove();
    }
    const item = itemsList.find(element => element.id == itemId);
    if (item) {
        unitMenu.appendChild(createUnitDropdownRow(item.basicUnit, -1, '', false));
        for (let key in item.additionalUnits) {
            unitMenu.appendChild(createUnitDropdownRow(key, item.additionalUnits[key], item.basicUnit, true));
        }
    }
}

function createUnitDropdownRow(unitName, numInUnit, basicUnitName, notFirst) {
    const row = document.createElement('div');
    row.classList.add('item');
    row.setAttribute('data-value', unitName);
    if (notFirst) {
        row.textContent = `${unitName} ${numInUnit} ${basicUnitName}`;
    } else {
        row.textContent = unitName;
    }
    return row;
}

async function observeUnitAndItemField() {
    const itemObserver = new MutationObserver(() => {
        const selectedMenuItem = itemsField.parentElement.querySelector('.menu').querySelector('.active');
        let id;
        if (selectedMenuItem) {
            id = selectedMenuItem.dataset.id;
            removeStylesFromDropdownElement(itemsField);
            setDefaultToDropdown(unitField, 'Select unit');
        } else {
          id = -1;
        }
        loadUnitBasedOnChosenItem(id);
  });
  itemObserver.observe(itemsField, { attributeFilter: ["value"] });
   
    const unitObserver = new MutationObserver(() => {
    const currentItemId = findItemIdForTableRow();
    const item = itemsList.find(elem => elem.id == currentItemId);
    if (item && unitField.value === item.basicUnit) {
            priceField.value = item.price;
            amountField.value = item.inStock;
            removeAllErrorAttributes([unitField, amountField, priceField]);
        } else if (item) {
            for (let key in item.additionalUnits) {
                if (key === unitField.value) {
                    priceField.value = Math.round((item.additionalUnits[key] * item.price + Number.EPSILON) * 100) / 100;
                    amountField.value = Math.round(item.inStock / item.additionalUnits[key]);
                }
            }
        }        
    });
    unitObserver.observe(unitField, { attributeFilter: ["value"] });
}

function createClientList(data) {
    const menu = clientNameField.parentElement.querySelector('.menu');
    for (let client of data) {
        const div = document.createElement('div');
        div.classList.add('item');
        let stringName = `${client['first_name']} ${client['last_name']}`;
        div.setAttribute('data-value', client.id);
        div.setAttribute('data-phone', client.phone_number);
        div.setAttribute('data-email', client.email);
        div.textContent = stringName;
        menu.appendChild(div);
    }
}

async function obtainUserClients() {
    let responseFromServer = await getUserData("/clients/client/");
    const response = responseFromServer.responseStatus;
    if (response === 200) {
        createClientList(responseFromServer['data']['content']);
    }
}

function updateInvoiceName()
{
    invoiceNameField.addEventListener('input', ()=>{
        let text;
        if (invoiceNameField.value){
            text = invoiceNameField.value;
        } else {
            text = 'Invoice';
        }
        invoiceNameDisplay.textContent = text;
    });
}

function observeClientAndCurrencyField()
{
    const clientObserver = new MutationObserver(() =>{
        const elem = clientNameField.parentElement.querySelector('.menu').querySelector(`[data-value="${clientNameField.value}"]`);
        clientNameDisplay.textContent = `Client name: ${elem.textContent}`;
        clientPhoneDisplay.textContent = `Telephone: ${elem.dataset.phone}`;
        clientEmailDisplay.textContent = `Email: ${elem.dataset.email}`;
        removeStylesFromDropdownElement(clientNameField);
    });
    clientObserver.observe(clientNameField, {attributeFilter: ["value"]});

    const currencyObserver = new MutationObserver(()=> {
        clearAllFields();
        loadItemsToDropdown(itemsList, currencyField.value);
        const flagElement = currencyField.parentElement.querySelector('.menu').querySelector(`[data-value="${currencyField.value}"]`);
        invoiceCurrencyDisplay.innerHTML = `${currencyField.value}<i class="${flagElement.firstElementChild.className}"></i>`;
        removeStylesFromDropdownElement(currencyField);
    }); 
    currencyObserver.observe(currencyField, {attributeFilter: ["value"]});
}

function manageDateFunctionality()
{
    dateOfInvoiceField.addEventListener('change', ()=>{
        const invoiceDate = new Date(dateOfInvoiceField.value);
        let invoiceDateText = 'Date of invoice: ';
        if (!isNaN(invoiceDate) && String(invoiceDate.getFullYear()).length <= 4){
            invoiceDateText += invoiceDate.toLocaleDateString(); 
        } else {
            invoiceDateText += 'Invalid date';
        }
        dateOfInvoiceDisplay.textContent = invoiceDateText;
    });
    dateOfPaymentField.addEventListener('change', () => {
        let paymentDateText = 'Date of payment: ';
        const paymentDate = new Date(dateOfPaymentField.value);
        if (!isNaN(paymentDate) && String(paymentDate.getFullYear()).length <= 4) {
            paymentDateText += paymentDate.toLocaleDateString();
        } else {
            paymentDateText += 'Invalid date';
        }
        dateOfPaymentDisplay.textContent = paymentDateText;
    });
}

async function createItemsList(data) {
    console.log(data);
    for (let item of data) {
        const request = await getUserData(`/items/additional_units_for_item/${item.id}`);
        console.log(request);
        //without request status ckeck for now!
        //write function for incapsulating request status check!!!
        const obj = new Item(item, request['data']['content']);
        itemsList.push(obj);
    }
}

async function obtainUserItems()
{
    let responseFromServer = await getUserData('/items/items_list/');
    const response = responseFromServer.responseStatus;
    if (response === 200) {
        await createItemsList(responseFromServer['data']['content']);
    } else if (response === 401) {
        const obtainedToken = await obtainNewAccessToken();
        if (obtainedToken) {
            responseFromServer = await getUserData('/items/items_list/');
            if (responseFromServer.responseStatus !== 200) {
                window.location.href = host + '/user/login/';
            }
            await createItemsList(responseFromServer['data']['content']);
        } else {
            window.location.href = host + '/user/login/';
        }
    } else {
        alert();
        window.location.href = host + '/user/login/';
    }    
}

async function obtainAll()
{
    await obtainUserInitials();
    await obtainUserItems();
    await obtainUserClients();
}

document.addEventListener('DOMContentLoaded', async function () {
    await obtainAll();
    hideUnnecessaryElementsInMenu();
    clearErrorAttributes(returnAllFieldsList());
    manageDateFunctionality();
    updateInvoiceName();
    
    observeUnitAndItemField();
    observeClientAndCurrencyField();
    addMoreItems.addEventListener('click', () => {  
        hideSaveButton();
        const validationResult = validateAddingItemToTable();
        if (allAreFalse(validationResult)) {
            document.querySelector('.empty_invoice').style.visibility = 'hidden';
            const tableRow = createAndFillTableRow(arrayWithData());
            const editButton = createIconButton('edit');
            const removeButton = createIconButton('remove');
            tableRow.appendChild(editButton);
            tableRow.appendChild(removeButton);
            removeButton.addEventListener('click', event1 => {
                    totalPrice.textContent = parseFloat(totalPrice.textContent) - parseFloat(event1.target.parentElement.children[4].textContent);
                    event1.target.parentElement.remove();
                });
            editButton.addEventListener('click', event2 => loadDataToEdit(event2));
            invoiceTable.insertAdjacentElement('beforeend', tableRow);
            clearAllFields();
        } else {
            setErrorAttributesToFields(validationResult, returnAllItemsFields());
        }
    });
});


