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
const noUnitsText = document.querySelector('#not_enough_text');
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
const totalInBasicInInvoice = {};
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
    Math.round((priceField.value * amountField.value + Number.EPSILON) * 100) / 100];
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
    const foundItemId = findItemIdForTableRow();
    const foundItem = itemsList.find(item => item.id == foundItemId);
    let amountInBasic;
    if (foundItem.basicUnit === valList[2]){
        amountInBasic = Math.round((parseFloat(valList[1]) + Number.EPSILON) * 100) / 100;
    } else {
        for (let additionalUnit in foundItem.additionalUnits){
            if (additionalUnit === valList[2]){
                amountInBasic = Math.round(parseFloat((valList[1]) * foundItem.additionalUnits[additionalUnit] + Number.EPSILON) * 100) / 100; 
                break;
            }
        }
    }
    if (amountInBasic > Math.round((foundItem.inStock - totalInBasicInInvoice[foundItemId] + Number.EPSILON) * 100) / 100){
        return false;
    }
    tableRow.setAttribute('data-item_id', foundItemId);
    tableRow.setAttribute('data-total_in_basic', amountInBasic);
    totalInBasicInInvoice[foundItemId] += amountInBasic;
    for (let i = 0; i < 5; ++i) {
        const rowIdentifier = (i === 4) ? 'second_col' : 'first_col';
        const tempElem = document.createElement('div');
        tempElem.classList.add('col-2', rowIdentifier);
        tempElem.textContent = valList[i];
        tableRow.appendChild(tempElem);
    }
    totalPrice.textContent = parseFloat(totalPrice.textContent) + parseFloat(Math.round((valList.at(-1) + Number.EPSILON) * 100) / 100);
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
    setDefaultToDropdown(itemsField, i18next.t("select_item"));
    setDefaultToDropdown(unitField, i18next.t("Select unit"));
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
    allDropdownchildren[3].textContent = i18next.t("Select unit");
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
    allDropdownchildren[2].textContent = i18next.t("select_item");
}

function loadDataToEdit(event) {
    const tableRow = event.target.parentElement;
    totalInBasicInInvoice[tableRow.dataset.item_id] -= parseFloat(tableRow.dataset.total_in_basic);
    const columns = tableRow.querySelectorAll('div');
    loadValueToItemDropdown(tableRow.dataset.item_id);
    loadValuetoUnitDropdown(columns[2].textContent);
    removeAllErrorAttributes(returnAllItemsFields());
    addMoreItems.style.visibility = 'hidden';
    saveToTable.style.visibility = 'visible';
    clickHandler = function () {
        if (modifyTable(columns)) {
            displayNoUnitsError(false);
            saveToTable.removeEventListener('click', clickHandler);
            saveToTable.style.visibility = 'hidden';
            addMoreItems.style.visibility = 'visible';
        } else {
            displayNoUnitsError(true);
        }
    }
    saveToTable.addEventListener('click', clickHandler);
}

function modifyTable(arrayOfColumns) {
    const validationResult = validateAddingItemToTable(returnAllItemsFields());
    if (allAreFalse(validationResult)) {
        const tableRow = arrayOfColumns[0].parentElement;
        const amountBackup = parseFloat(tableRow.dataset.total_in_basic);
        const foundItem = itemsList.find(item => item.id == findItemIdForTableRow()); 
        let amountInBasic;
        if (unitField.value === foundItem.basicUnit){
            amountInBasic = Math.round((parseFloat(amountField.value) + Number.EPSILON) * 100) / 100;
        } else {
            for (let additionalUnit in foundItem.additionalUnits){
                if (additionalUnit === unitField.value){
                    amountInBasic = Math.round((parseFloat(amountField.value * foundItem.additionalUnits[additionalUnit]) + Number.EPSILON) * 100) / 100; 
                    break;
                }
            }
        }
        if (amountInBasic > Math.round((foundItem.inStock - totalInBasicInInvoice[foundItem.id] + Number.EPSILON) * 100) / 100) {
            return false;
        }
        
        totalInBasicInInvoice[foundItem.id] += amountInBasic;
        tableRow.setAttribute('data-item_id', foundItem.id);
        tableRow.setAttribute('data-total_in_basic', amountInBasic);
        totalPrice.textContent = Math.round((parseFloat(totalPrice.textContent) - (parseFloat(arrayOfColumns[4].textContent) - parseFloat(amountField.value * priceField.value)) + Number.EPSILON) * 100) / 100;
        arrayOfColumns[0].textContent = itemsField.value;
        arrayOfColumns[1].textContent = amountField.value;
        arrayOfColumns[2].textContent = unitField.value;
        arrayOfColumns[3].textContent = priceField.value;
        arrayOfColumns[4].textContent = Math.round((amountField.value * priceField.value + Number.EPSILON) * 100) / 100;
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
            setDefaultToDropdown(unitField, i18next.t("Select unit"));
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
            amountField.value = item.inStock - totalInBasicInInvoice[currentItemId];
            removeAllErrorAttributes([unitField, amountField, priceField]);
        } else if (item) {
            for (let key in item.additionalUnits) {
                if (key === unitField.value) {
                    priceField.value = Math.round((item.additionalUnits[key] * item.price + Number.EPSILON) * 100) / 100;
                    amountField.value = parseInt((item.inStock - totalInBasicInInvoice[currentItemId]) / item.additionalUnits[key]);
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
        clientNameDisplay.textContent = `${i18next.t("client_name")}: ${elem.textContent}`;
        clientPhoneDisplay.textContent = `${i18next.t("telephone_number")}: ${elem.dataset.phone}`;
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
        let invoiceDateText = i18next.t("date_invoice")+': ';
        if (!isNaN(invoiceDate) && String(invoiceDate.getFullYear()).length <= 4){
            invoiceDateText += invoiceDate.toLocaleDateString(); 
        } else {
            invoiceDateText += i18next.t("invalid_date");
        }
        dateOfInvoiceDisplay.textContent = invoiceDateText;
    });
    dateOfPaymentField.addEventListener('change', () => {
        let paymentDateText =  i18next.t("date_payment")+': ';
        const paymentDate = new Date(dateOfPaymentField.value);
        if (!isNaN(paymentDate) && String(paymentDate.getFullYear()).length <= 4) {
            paymentDateText += paymentDate.toLocaleDateString();
        } else {
            paymentDateText += i18next.t("invalid_date");
        }
        dateOfPaymentDisplay.textContent = paymentDateText;
    });
}

async function createItemsList(data) {
    for (let item of data) {
        let request = await getUserData(`/items/additional_units_for_item/${item.id}`);
        if (request.responseStatus === 200){
            itemsList.push(new Item(item, request['data']['content']));
            totalInBasicInInvoice[itemsList.at(-1).id] = 0;
        } else if (request.responseStatus === 401) {
            const obtainedToken = await obtainNewAccessToken();
            if (obtainedToken){
                request = await getUserData(`/items/additional_units_for_item/${item.id}`);
                if (request.responseStatus !== 200){
                    window.location.href = host + '/user/login/';
                }
                itemsList.push(new Item(item, request['data']['content']));
                totalInBasicInInvoice[itemsList.at(-1).id] = 0;
            }
        } else {
            window.location.href = host + '/user/login/';
        }
    }
}

async function obtainDataWithCheks(endPointLink, createFromData)
{
    let responseFromServer = await getUserData(endPointLink);
    const response = responseFromServer.responseStatus;
    if (response === 200) {
        await createFromData(responseFromServer['data']['content']);
    } else if (response === 401) {
        const obtainedToken = await obtainNewAccessToken();
        if (obtainedToken) {
            responseFromServer = await getUserData('/items/items_list/');
            if (responseFromServer.responseStatus !== 200) {
                window.location.href = host + '/user/login/';
            }
            await createFromData(responseFromServer['data']['content']);
        } else {
            window.location.href = host + '/user/login/';
        }
    } else {
        alert("Unknown error happened");
        window.location.href = host + '/user/login/';
    }      
}

async function obtainUserItems()
{
    await obtainDataWithCheks('/items/items_list/', createItemsList);
}

async function obtainUserClients() 
{
    await obtainDataWithCheks('/clients/client/', createClientList);
}

async function obtainAll()
{
    await obtainUserInitials();
    await obtainUserItems();
    await obtainUserClients();
}

function displayNoUnitsError(flag)
{
    noUnitsText.style.display = flag? "block" : "none";
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
        displayNoUnitsError(false);
        const validationResult = validateAddingItemToTable();
        if (allAreFalse(validationResult)) {
            document.querySelector('.empty_invoice').style.visibility = 'hidden';
            const tableRow = createAndFillTableRow(arrayWithData());
            if (tableRow) {
                const editButton = createIconButton('edit');
            const removeButton = createIconButton('remove');
            tableRow.appendChild(editButton);
            tableRow.appendChild(removeButton);
            removeButton.addEventListener('click', event1 => {
                    totalInBasicInInvoice[event1.target.parentElement.dataset.item_id] -= parseFloat(event1.target.parentElement.dataset.total_in_basic);
                    totalPrice.textContent = parseFloat(totalPrice.textContent) - parseFloat(event1.target.parentElement.children[4].textContent);
                    event1.target.parentElement.remove();
                });
            editButton.addEventListener('click', event2 => loadDataToEdit(event2));
            invoiceTable.insertAdjacentElement('beforeend', tableRow);
            clearAllFields();
            displayNoUnitsError(false);
            } else {
                displayNoUnitsError(true);   
            }
        } else {
            setErrorAttributesToFields(validationResult, returnAllItemsFields());
        }
    });
});


