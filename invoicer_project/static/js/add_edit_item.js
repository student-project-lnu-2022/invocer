
document.querySelectorAll('.dropdown_list').forEach(function (dropdownWrapper) {
    const dropdownBtn = dropdownWrapper.querySelector('.dropdown__button');
    const dropdownList = dropdownWrapper.querySelector('.dropdown__list');
    const dropdownItems = dropdownList.querySelectorAll('.dropdown__list-item');
    const dropdownInput = dropdownWrapper.querySelector('.dropdown__input_hidden')
    dropdownBtn.addEventListener('click', function () {
      dropdownList.classList.toggle('dropdown__list_visible');
      this.classList.toggle('dropdown__button_active');
    });
    
    dropdownItems.forEach(function(listItem) {
      listItem.addEventListener('click', function (e) {
        dropdownItems.forEach(function(el) {
          el.classList.remove('dropdown__list-item_active');
        })
        e.target.classList.add('dropdown__list-item_active');
        dropdownBtn.innerText = this.innerText;
        dropdownInput.setAttribute("value", this.dataset.value);
        input_currency_table();
        input_basic_unit_table();
        dropdownList.classList.remove('dropdown__list_visible');
      })
    });
    
    document.addEventListener('click', function (e) {
      if ( e.target !== dropdownBtn ){
        dropdownBtn.classList.remove('dropdown__button_active');
        dropdownList.classList.remove('dropdown__list_visible');
      }
    });
  })


const input_price = document.getElementById("price");
const input_currency = document.getElementById("currency");
const input_basic_unit = document.getElementById("basic_unit");
const input_amount_in_stock = document.getElementById("amount_in_stock");
const input_name = document.getElementById("name");
const input_barcode = document.getElementById("barcode");

const input_price_val = document.getElementById("price_val");
const input_currency_val = document.getElementById("currency_val");
const input_basic_unit_val = document.getElementById("basic_unit_val");
const input_amount_in_stock_val = document.getElementById("amount_in_stock_val");
const input_name_val = document.getElementById("name_val");
const input_barcode_val = document.getElementById("barcode_val");

num_of_rows = 0;
const max_num_of_units = 5;


function addLabels() {
    let data;
    if (num_of_rows >= max_num_of_units) {
        alert(`You can't add more than ${max_num_of_units} additional units!`);
        return;
    }
    ++num_of_rows;
    const newLabel1 = document.createElement("md-outlined-text-field");
    const newLabel2 = document.createElement("md-outlined-text-field");
    newLabel1.setAttribute('label', 'Additional unit ' + num_of_rows);
    newLabel2.setAttribute('label', 'Amount in additional unit ' + num_of_rows);
    newLabel1.className = "input_field";
    newLabel2.className = "input_field";
    newLabel1.className = "additional_unit_field";
    newLabel2.className = "amount_additional_unit_field";


    let headerRow = document.createElement("div");
    headerRow.className="row secondary_text";
    headerRow.style.padding = "5px";
    headerRow.style.borderTop = "1px solid rgba(0, 68, 255, 0.11)";
    headerRow.innerHTML = newLabel1.label;

    let newRow = document.createElement("div");
    newRow.className="row";
    newRow.innerHTML = `<div class="col-6 first_col" id="${newLabel1.label}">${newLabel1.label}</div>
    <div class="col-6 second_col" id="${newLabel2.label}_val"></div>`;
    const table = document.getElementById('table');
    table.insertBefore(headerRow, document.getElementById("endline"));
    table.insertBefore(newRow, document.getElementById("endline"));

    let idOfNameOfUnit = newLabel1.label;
    const input_row = document.getElementById(idOfNameOfUnit);
    newLabel1.addEventListener('input', () => {
        data = newLabel1.value;
        if (data === "") {
            data = newLabel1.label;
        }
        setTextToTable(input_row, data);
    });

    let idOfAmountInUnit = newLabel2.label + "_val";
    const input_row_val = document.getElementById(idOfAmountInUnit);
    newLabel2.addEventListener('input', () => {
        data = input_basic_unit.value;
        if (data === "Basic unit") {
            data = "";
        }
        setTextToTable(input_row_val, newLabel2.value + " " + data);
    });

    const secondCol = document.querySelector('#column-2');
    secondCol.appendChild(newLabel1);
    secondCol.appendChild(newLabel2);
    const button = document.getElementById("additional_item_button");
    button.remove();
    secondCol.appendChild(button);
}

function setTextToTable(inputElement, inputData) {
    inputElement.setAttribute('data-text', inputData);
    inputElement.innerHTML = inputElement.getAttribute('data-text');
}


function isFieldEmpty(input_field, fieldLabel, resultValue)
{
let data = input_field.value;
    if (data === fieldLabel) {
        data = resultValue;
    }
    return data;
}

input_price.addEventListener('input', () => {setTextToTable(input_price_val, input_price.value)});

function input_currency_table() {
    let data = isFieldEmpty(input_currency,"Currency", "");
    setTextToTable(input_currency_val, data);
}


input_amount_in_stock.addEventListener('input', () => {
    let data = isFieldEmpty(input_basic_unit, "Basic unit", "");
    setTextToTable(input_amount_in_stock_val, input_amount_in_stock.value + " " + data);
});

input_name.addEventListener('input', () => {
    let data = isFieldEmpty(input_name,"", "Name of item");
    setTextToTable(input_name_val, data);
});

input_barcode.addEventListener('input', () => {setTextToTable(input_barcode_val, `Barcode: ${input_barcode.value}`)});


function input_basic_unit_table()  {
    let data1 = isFieldEmpty(input_basic_unit,"Basic unit", "");

    setTextToTable(input_basic_unit_val, data1);
    setTextToTable(input_amount_in_stock_val, input_amount_in_stock.value + " " + data1);

    if (num_of_rows > 0) {
        let field, data;
        for (let i = 0; i < num_of_rows; i++) {
            field = document.getElementById(`Amount in aditional unit ${i + 1}_val`);
            data = field.getAttribute('data-text');
            if (data===null) {
                data="";
            } else {
                data=data.split(" ")[0];
            }
            setTextToTable(field, data + " " + data1);
        }
    }
}
