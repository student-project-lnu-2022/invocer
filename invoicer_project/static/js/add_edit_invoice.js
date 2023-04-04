import { getUserData, obtainUserInitials } from "./request_utils.js";
import { Item } from "./item.js";
import { validateAmountInStock } from './validation_utils.js';
const addMoreItems = document.querySelector('#item_to_table');
export const invoiceTable = document.querySelector('#table');
export const itemsField = document.querySelector('#item-list');
const amountField = document.querySelector('#item_amount');
const unitField = document.querySelector('#unit-list');
const saveToTable = document.querySelector('#save_changes');
const priceField = document.querySelector('#price-field');
// const saveInvoiceButton = document.querySelectorAll('#add_invoice_button');
// const dataIdList = [0];
const itemsList = [];
//to move all the fields and selectors to other file

let clickHandler;

function arrayWithData() {
    return [(itemsField.value) ? itemsField.value : 'Name',
    (amountField.value) ? amountField.value : 'Amount',
    (unitField.value) ? unitField.value : 'Unit', 'Price', 'Total']
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

function createAndFillTableRow() {
    const tableRow = document.createElement('div');
    tableRow.classList.add('row', 'text-left', 'table-row', 'align-items-center');

    //set tablerow's data-id according to ITEM'S ID in database
    const found = findItemIdForTableRow();
    tableRow.setAttribute('data-item_id', found);
    const ValList = arrayWithData();
    for (let i = 0; i < 5; ++i) {
        const rowIdentifier = (i === 5) ? 'second_col' : 'first_col';
        const tempElem = document.createElement('div');
        tempElem.classList.add('col-2', rowIdentifier);
        tempElem.textContent = ValList[i];
        tableRow.appendChild(tempElem);
    }
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
        return;
    }


    allDropdownchildren[0].classList.add('noselection');
    allDropdownchildren[2].textContent = "Select item";
}

function loadDataToEdit(event) {
    const tableRow = event.target.parentElement;
    const columns = tableRow.querySelectorAll('div');


    amountField.value = columns[1].textContent;
    console.log(tableRow.dataset.item_id);
    loadValueToItemDropdown(tableRow.dataset.item_id);
    loadUnitBasedOnChosenItem(tableRow.dataset.item_id);
    console.log('load val to unit');
    loadValuetoUnitDropdown(columns[2].textContent);
    //loads string visually into dropdown list 


    addMoreItems.style.visibility = 'hidden';
    saveToTable.style.visibility = 'visible';
    clickHandler = function () {
        if (modifyTable(columns)) {
            saveToTable.removeEventListener('click', clickHandler);
            saveToTable.style.visibility = 'hidden';
            addMoreItems.style.visibility = 'visible';
            // modified item, amount and unit here, now get item price
            // and fill price and total columns by hands
        }

    }
    saveToTable.addEventListener('click', clickHandler);
}

function modifyTable(arrayOfColumns) {

    let validationResult = true;  //validation here!!!
    arrayOfColumns[0].textContent = itemsField.value;
    arrayOfColumns[1].textContent = amountField.value;
    arrayOfColumns[2].textContent = unitField.value;
    arrayOfColumns[0].parentElement.dataset.item_id = findItemIdForTableRow();
    clearAllFields();
    return validationResult;
}

async function createItemsList(data) {

    for (let item of data) {
        const request = await getUserData(`/items/additional_units_for_item/${item.id}`);
        //without request status ckeck for now!
        //write function for incapsulating request status check!!!
        const obj = new Item(item, request['data']['content']);
        itemsList.push(obj);
    }
}


function loadItemsToDropdown(data) {
    const menu = itemsField.parentElement.children[4];
    for (let item of data) {
        const div = document.createElement('div');
        div.classList.add('item');
        div.setAttribute('data-id', item.id);
        div.setAttribute('data-value', item.title);
        div.textContent = item.title;
        menu.appendChild(div);
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
        amountField.value = item.inStock;
        priceField.value = item.price;
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



document.addEventListener('DOMContentLoaded', async function () {
    await obtainUserInitials();

    //function for incapsulating request status check!!!
    const data = await getUserData('/items/items_list/');
    await createItemsList(data['data']['content']);
    console.log(itemsList);
    loadItemsToDropdown(itemsList);
    const itemObserver = new MutationObserver(mutationArr => {
        const neededMutation = mutationArr.find(elem => elem.attributeName === 'value');
        if (neededMutation) {
            const selectedMenuItem = itemsField.parentElement.querySelector('.menu').querySelector('.active');
            let id;
            if (selectedMenuItem) {
                id = selectedMenuItem.dataset.id;
            } else
                id = -1;
            //console.log(neededMutation, id);
            loadUnitBasedOnChosenItem(id);
        }
    });
    itemObserver.observe(itemsField, { attributes: true });
    addMoreItems.addEventListener('click', () => {

        //validate data from fields here
        hideSaveButton();
        const tableRow = createAndFillTableRow();
        const editButton = createIconButton('edit');
        const removeButton = createIconButton('remove');
        tableRow.appendChild(editButton);
        tableRow.appendChild(removeButton);
        removeButton.addEventListener('click', event1 => event1.target.parentElement.remove());
        editButton.addEventListener('click', event2 => loadDataToEdit(event2));
        invoiceTable.insertAdjacentElement('beforeend', tableRow);
        clearAllFields();
    });
    const unitObserver = new MutationObserver(unitMutations => {
        console.log(unitMutations);
        const mutationHappened = unitMutations.find(elem => elem.attributeName === 'value');
        if (mutationHappened)
        {
            const currentItemId = findItemIdForTableRow();
            const item = itemsList.find(elem => elem.id == currentItemId);
            if (item) {
                let unitQty;
                for (let key in item.additionalUnits) {
                    if (item.additionalUnits[key] == unitField.value) {
                        unitQty = item.additionalUnits[key];
                        priceField.value = unitQty * item.price;
                        break;
                    }
                }
                
            }
        }
    });
    unitObserver.observe(unitField, { attributes: true });
});


