const addMoreItems = document.querySelector('#item_to_table');
const invoiceTable = document.querySelector('#table');
const itemsField = document.querySelector('#item-list');
const amountField = document.querySelector('#amount');
const unitField = document.querySelector('#unit-list');
const saveToTable = document.querySelector('#save_changes');
const saveInvoiceButton = document.querySelectorAll('#add_invoice_button');
const dataIdList = [0];
//to move all the fields and selectors to other file
let clickHandler;

function arrayWithData() {
    return [(itemsField.value) ? itemsField.value : 'Name',
    (amountField.value) ? amountField.value : 'Amount',
    (unitField.value) ? unitField.value : 'Unit', 'Price', 'Total']
}

addMoreItems.addEventListener('click', () => {
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
    unitField.value = columns[2].textContent;
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

    return validationResult;
}


