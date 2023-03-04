
document.querySelectorAll('.dropdown_list').forEach(function (dropdownWrapper) {
    const dropdownBtn = dropdownWrapper.querySelector('.dropdown__button');
    const dropdownArrow = dropdownWrapper.querySelector(".arrow-up");
    const dropdownList = dropdownWrapper.querySelector('.dropdown__list');
    const dropdownItems = dropdownList.querySelectorAll('.dropdown__list-item');
    const dropdownInput = dropdownWrapper.querySelector('.dropdown__input_hidden')
    dropdownBtn.addEventListener('click', function () {
        dropdownArrow.classList.toggle("arrow-up");
        dropdownArrow.classList.toggle("arrow-up-active");
        dropdownList.classList.toggle('dropdown__list_visible');
        this.classList.toggle('dropdown__button_active');
        this.parentElement.classList.toggle('border_dropdown');
    });

    dropdownItems.forEach(function (listItem) {
        listItem.addEventListener('click', function (e) {
            dropdownItems.forEach(function (el) {
                el.classList.remove('dropdown__list-item_active');
            })
            e.target.classList.add('dropdown__list-item_active');
            dropdownBtn.innerText = this.innerText;
            dropdownInput.setAttribute("value", this.dataset.value);
            input_currency_table();
            input_basic_unit_table();
            input_additionalUnit();
            dropdownArrow.classList.add("arrow-up");
            dropdownArrow.classList.remove("arrow-up-active");
            dropdownList.classList.remove('dropdown__list_visible');
        })
    });

    document.addEventListener('click', function (e) {
        if (e.target !== dropdownBtn) {
            dropdownArrow.classList.add("arrow-up");
            dropdownArrow.classList.remove("arrow-up-active");
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


let num_of_rows = 0;
const max_num_of_units = 5;

function input_additionalUnit() {
    for (let i = 0; i < max_num_of_units; i++) {
        let data1 = document.querySelector(`#AU${i + 1}`).value;
        if (data1 !== "") {
            setTextToTable(document.querySelector(`#Aditional_unit_${i + 1}`), data1);
        }
    }
};


const amount_additional_unit_field = document.querySelectorAll(".amount_additional_unit_field");
console.log(amount_additional_unit_field[i])
for (let i = 0; i < max_num_of_units; i++) {
    amount_additional_unit_field[i].addEventListener('input', () => {
        const input_row_val = document.querySelector(`#AU${i + 1}_val`);
        data = isFieldEmpty(input_basic_unit, "Basic unit", "");
        setTextToTable(input_row_val, amount_additional_unit_field[i].value + data);
    });
}

function addLabels() {
    if (num_of_rows >= max_num_of_units) {
        alert(`You can't add more than ${max_num_of_units} additional units!`);
        return;
    }
    document.querySelector(".hidden").classList.remove("hidden");
    document.querySelector(".hidden").classList.remove("hidden");
    document.querySelectorAll(".additional_unit_field")[num_of_rows].style.display = "block";
    document.querySelectorAll(".amount_additional_unit_field")[num_of_rows].style.display = "flex";
    ++num_of_rows;
    
}

document.querySelector("#additional_item_button").addEventListener("click", () => { addLabels() });

function setTextToTable(inputElement, inputData) {
    inputElement.setAttribute('data-text', inputData);
    inputElement.innerHTML = inputElement.getAttribute('data-text');
}


function isFieldEmpty(input_field, fieldLabel, resultValue) {
    let data = input_field.value;
    if (data === fieldLabel) {
        data = resultValue;
    }
    return data;
}

input_price.addEventListener('input', () => { setTextToTable(input_price_val, input_price.value) });

function input_currency_table() {
    let data = isFieldEmpty(input_currency, "Currency", "");
    setTextToTable(input_currency_val, data);
}


input_amount_in_stock.addEventListener('input', () => {
    let data = isFieldEmpty(input_basic_unit, "Basic unit", "");
    setTextToTable(input_amount_in_stock_val, input_amount_in_stock.value + " " + data);
});

input_name.addEventListener('input', () => {
    let data = isFieldEmpty(input_name, "", "Name of item");
    setTextToTable(input_name_val, data);
});

input_barcode.addEventListener('input', () => { setTextToTable(input_barcode_val, `Barcode: ${input_barcode.value}`) });


function input_basic_unit_table() {
    let data1 = isFieldEmpty(input_basic_unit, "Basic unit", "");

    setTextToTable(input_basic_unit_val, data1);
    setTextToTable(input_amount_in_stock_val, input_amount_in_stock.value + " " + data1);

    if (num_of_rows > 0) {
        let field, data;
        for (let i = 0; i < num_of_rows; i++) {
            field = document.getElementById(`AU${i + 1}_val`);
            data = field.getAttribute('data-text');
            if (data === null) {
                data = "";
            } else {
                data = data.split(" ")[0];
            }
            setTextToTable(field, data + " " + data1);
        }
    }
}
