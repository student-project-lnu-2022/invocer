import { getUserData, obtainUserInitials } from "./request_utils.js";
import { Item } from "./item.js";
import { loadValuetoDropdown } from "./dropdown.js";
const addMoreItems = document.querySelector('#item_to_table');
const invoiceTable = document.querySelector('#table');
const itemsField = document.querySelector('#item-list');
const amountField = document.querySelector('#amount');
const unitField = document.querySelector('#unit-list');
const saveToTable = document.querySelector('#save_changes');
const saveInvoiceButton = document.querySelectorAll('#add_invoice_button');
const dataIdList = [0];
const itemsList = [];
//to move all the fields and selectors to other file
let clickHandler;

function arrayWithData() {
    return [(itemsField.value) ? itemsField.value : 'Name',
    (amountField.value) ? amountField.value : 'Amount',
    (unitField.value) ? unitField.value : 'Unit', 'Price', 'Total']
}

addMoreItems.addEventListener('click', () => {

    //validate data from fields here
    saveToTable.style.visibility = 'hidden';
    saveToTable.removeEventListener('click', clickHandler);

    const tableRow = document.createElement('div');
    tableRow.classList.add('row', 'text-left', 'table-row', 'align-items-center');
    dataIdList.push(dataIdList.at(-1) + 1);
    tableRow.setAttribute('data-id', dataIdList.at(-1));

    const ValList = arrayWithData();
    for (let i = 0; i < 5; ++i) {
        const rowIdentifier = (i === 5) ? 'second_col' : 'first_col';
        const tempElem = document.createElement('div');
        tempElem.classList.add('col-2', rowIdentifier);
        tempElem.textContent = ValList[i];
        tableRow.appendChild(tempElem);
    }
    itemsField.value = "";
    amountField.value = "";
    unitField.value = "";
    document.querySelector('.ui.dropdown>.text').textContent = "Select unit";
    const editButton = document.createElement('md-standard-icon-button');
    const removeButton = document.createElement('md-standard-icon-button');
    const editIcon = document.createElement('md-icon');
    const removeIcon = document.createElement('md-icon');

    editButton.classList.add('col-1');
    removeButton.classList.add('col-1');
    editButton.style.maxHeight = '30px';
    removeButton.style.maxHeight = '30px';
    editIcon.innerText = 'edit';
    removeIcon.innerText = 'remove';
    editButton.appendChild(editIcon);
    removeButton.appendChild(removeIcon);


    tableRow.appendChild(editButton);
    tableRow.appendChild(removeButton);
    removeButton.addEventListener('click', e => e.target.parentElement.remove());
    editButton.addEventListener('click', e => loadDataToEdit(e));
    invoiceTable.insertAdjacentElement('beforeend', tableRow);
});


function loadDataToEdit(event) {
    const tableRow = event.target.parentElement;
    const columns = tableRow.querySelectorAll('div');
    itemsField.value = columns[0].textContent;
    amountField.value = columns[1].textContent;
    loadValuetoDropdown(unitField, columns[2].textContent, "Select unit");
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
    itemsField.value = "";
    amountField.value = "";
    unitField.value = "";
    unitField.parentElement.children[3].textContent = "Search unit";
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

document.addEventListener('DOMContentLoaded', async function () {
    await obtainUserInitials();

    //function for incapsulating request status check!!!
    const data = await getUserData('/items/items_list/');
    await createItemsList(data['data']['content']);
    console.log(itemsList);
});

