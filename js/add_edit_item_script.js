// Menu
$("#menu-toggle").click(function (e) {
    e.preventDefault();
    console.log("menu_toggle")
    $("#wrapper").toggleClass("toggled");
});

$("#menu-toggle-2").click(function (e) {
    e.preventDefault();
    console.log("menu_toggle_2")
    $("#wrapper").toggleClass("toggled-2");
    $('#menu ul').hide();
});

function initMenu() {
    $('#menu ul').hide();
    $('#menu ul').children('.current').parent().show();
    $('#menu ul:first').show();
    $('#menu li a').click(
        function () {
            let checkElement = $(this).next();
            if ((checkElement.is('ul')) && (checkElement.is(':visible'))) {
                return false;
            }
            if ((checkElement.is('ul')) && (!checkElement.is(':visible'))) {
                $('#menu ul:visible').slideUp('normal');
                checkElement.slideDown('normal');
                return false;
            }
        }
    );
}
$(document).ready(function () {
    console.log("Init menu")
    initMenu();
});


 var x, i, j, l, ll, selElmnt, a, b, c;
        /*look for any elements with the class "custom-select":*/
        x = document.getElementsByClassName("custom-select");
        l = x.length;
        for (i = 0; i < l; i++) {
          selElmnt = x[i].getElementsByTagName("select")[0];
          ll = selElmnt.length;
          /*for each element, create a new DIV that will act as the selected item:*/
          a = document.createElement("DIV");
          a.setAttribute("class", "select-selected");
          if(i == 0){
            a.setAttribute("id", "currency");
          }else{
            a.setAttribute("id", "basic_unit");
          }
          a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
          x[i].appendChild(a);
          /*for each element, create a new DIV that will contain the option list:*/
          b = document.createElement("DIV");
          b.setAttribute("class", "select-items select-hide");
          for (j = 1; j < ll; j++) {
            /*for each option in the original select element,
            create a new DIV that will act as an option item:*/
            c = document.createElement("DIV");
            c.innerHTML = selElmnt.options[j].innerHTML;
            c.addEventListener("click", function(e) {
                /*when an item is clicked, update the original select box,
                and the selected item:*/
                var y, i, k, s, h, sl, yl;
                s = this.parentNode.parentNode.getElementsByTagName("select")[0];
                sl = s.length;
                h = this.parentNode.previousSibling;
                for (i = 0; i < sl; i++) {
                  if (s.options[i].innerHTML == this.innerHTML) {
                    s.selectedIndex = i;
                    h.innerHTML = this.innerHTML;
                    y = this.parentNode.getElementsByClassName("same-as-selected");
                    yl = y.length;
                    for (k = 0; k < yl; k++) {
                      y[k].removeAttribute("class");
                    }
                    this.setAttribute("class", "same-as-selected");
                    break;
                  }
                }
                h.click();
            });
            b.appendChild(c);
          }
          x[i].appendChild(b);
          a.addEventListener("click", function(e) {
              /*when the select box is clicked, close any other select boxes,
              and open/close the current select box:*/
              e.stopPropagation();
              closeAllSelect(this);
              a.style.border = "2px solid rgb(0, 68, 255)";
              this.nextSibling.classList.toggle("select-hide");
              this.classList.toggle("select-arrow-active");
            });
        }
        function closeAllSelect(elmnt) {
          /*a function that will close all select boxes in the document,
          except the current select box:*/
          var x, y, i, xl, yl, arrNo = [];
          x = document.getElementsByClassName("select-items");
          y = document.getElementsByClassName("select-selected");
          xl = x.length;
          yl = y.length;
          for (i = 0; i < yl; i++) {
            if (elmnt == y[i]) {
              arrNo.push(i)
            } else {
              y[i].classList.remove("select-arrow-active");
            }
          }
          for (i = 0; i < xl; i++) {
            if (arrNo.indexOf(i)) {
              x[i].classList.add("select-hide");
            }
          }
          a.style.border = "1px solid #79747e";
        }
        /*if the user clicks anywhere outside the select box,
        then close all select boxes:*/
        document.addEventListener("click", closeAllSelect);


// Add new item
const input_price = document.getElementById("price");
let input_currency = document.getElementById("currency");
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

// Updating table in real time
num_of_rows = 0;
const max_num_of_units = 10;

function addLabels() {
  let data;
    if (num_of_rows >= max_num_of_units) {
        alert(`You can't add more than ${max_num_of_units} additional units!`);
        return;
    }
    ++num_of_rows;
    const newLabel1 = document.createElement("md-outlined-text-field");
    const newLabel2 = document.createElement("md-outlined-text-field");
    newLabel1.setAttribute('label', 'Aditional unit ' + num_of_rows);
    newLabel2.setAttribute('label', 'Amount in aditional unit ' + num_of_rows);
    newLabel1.className = "input_field";
    newLabel2.className = "input_field";

    let headerRow = document.createElement("tr");
    headerRow.innerHTML = `<td class="secondary_text" style="padding: 5px;">${newLabel1.label}</td>`;
    let newRow = document.createElement("tr");
    newRow.innerHTML = `<td class="first_col" id="${newLabel1.label}">Name of ${newLabel1.label}</td>
                        <td class="second_col" id="${newLabel2.label}_val"></td>`;
    const table = document.getElementById('table');
    table.appendChild(headerRow);
    table.appendChild(newRow);

    let idOfNameOfUnit = newLabel1.label;
    const input_row = document.getElementById(idOfNameOfUnit);
    newLabel1.addEventListener('input', () => {
        data = newLabel1.value;
        if (data === "") { data = `Name of ${newLabel1.label}`; }
        input_row.setAttribute('data-text', data);
        input_row.innerHTML = input_row.getAttribute('data-text');
    });

    let idOfAmountInUnit = newLabel2.label + "_val";
    const input_row_val = document.getElementById(idOfAmountInUnit);
    newLabel2.addEventListener('input', () => {
      data = input_basic_unit.innerHTML;
    if (data === "Basic unit") { data = ""; }
        input_row_val.setAttribute('data-text', newLabel2.value + " " + data);
        input_row_val.innerHTML = input_row_val.getAttribute('data-text');
    });

    const secondCol = document.querySelector('#column-2');
    secondCol.appendChild(newLabel1);
    secondCol.appendChild(newLabel2);
    const button = document.getElementById("additional_item_button");
    button.remove();
    secondCol.appendChild(button);
}

input_price.addEventListener('input', () => {
    input_price_val.setAttribute('data-text', input_price.value);
    input_price_val.innerHTML = input_price_val.getAttribute('data-text');
});

input_currency.addEventListener('click', () => {
    let data = input_currency.innerHTML;
    if (data === "Currency") { data = ""; }
    input_currency_val.setAttribute('data-text', data);
    input_currency_val.innerHTML = input_currency_val.getAttribute('data-text');
});

input_basic_unit.addEventListener('click', () => {
  let data1 = input_basic_unit.innerHTML;
    if (data1 === "Basic unit") { data1 = ""; }
    input_basic_unit_val.setAttribute('data-text', data1);

    input_amount_in_stock_val.setAttribute('data-text', input_amount_in_stock.value + " " + data1);
    input_amount_in_stock_val.innerHTML = input_amount_in_stock_val.getAttribute('data-text');

    if (num_of_rows > 0) {
        let field, data;
        for (let i=0; i<num_of_rows; i++) {
            field = document.getElementById(`Amount in aditional unit ${i+1}_val`);
            data = field.getAttribute('data-text').split(" ")[0];
            field.setAttribute('data-text', data + " " + data1);
            field.innerHTML = field.getAttribute('data-text');
        }
    }

    input_basic_unit_val.innerHTML = input_basic_unit_val.getAttribute('data-text');
});

input_amount_in_stock.addEventListener('input', () => {
    data = input_basic_unit.innerHTML;
    if (data === "Basic unit") { data = ""; }
    input_amount_in_stock_val.setAttribute('data-text', input_amount_in_stock.value + " " + data)
    input_amount_in_stock_val.innerHTML = input_amount_in_stock_val.getAttribute('data-text')
});

input_name.addEventListener('input', () => {
    data = input_name.value;
    if (data === "") { data = "Name of item" }
    input_name_val.setAttribute('data-text', data)
    input_name_val.innerHTML = input_name_val.getAttribute('data-text')
});

input_barcode.addEventListener('input', () => {
    input_barcode_val.setAttribute('data-text', "Barcode: " + input_barcode.value)
    input_barcode_val.innerHTML = input_barcode_val.getAttribute('data-text')
});


