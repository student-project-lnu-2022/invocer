function changeMenu(){
document.getElementById("vertical_menu").style.width = "24vh";
document.getElementById("vertical_menu").style.alignItems = "flex-start";
document.getElementById("vertical_menu").style.alignContent = "flex-start";
// document.getElementById("fab_element").style.marginTop = "20px";
// document.getElementById("fab_element").style.paddingLeft = "22px";

const fabIcon = document.getElementById("fab_element")
fabIcon.style.marginTop = "20px";
fabIcon.style.paddingLeft = "3%";
fabIcon.innerHTML = "<md-fab-extended></md-fab-extended>";
document.getElementsByTagName("md-fab-extended")[0].setAttribute("icon", "add");
document.getElementsByTagName("md-fab-extended")[0].setAttribute("label", "New invoice");


const menuNavItems = document.getElementsByClassName("menu_nav_items");
for (var i = 0; i < menuNavItems.length; i++) {
    menuNavItems[i].style.width="-webkit-fill-available";
}

const menuItem = document.getElementsByClassName("menu_item");
for (var i = 0; i < menuItem.length; i++) {
    menuItem[i].style.marginRight="0px";
    menuItem[i].style.width="93%";
}

const navItems = document.getElementsByClassName("nav_items");
for (var i = 0; i < navItems.length; i++) {
    navItems[i].style.display="inline-flex";
    navItems[i].style.alignItems="center";
    navItems[i].style.marginLeft="5%";
    navItems[i].style.paddingLeft="28px";
}

document.getElementById("invoice_icon_text").style.marginRight = "0px";
document.getElementById("invoice_icon_text").style.marginLeft = "15px";
document.getElementById("invoice_icon_text").style.marginTop = "0px";
document.getElementById("invoice_icon_text").style.marginBottom = "0px";
const invoiceIcon = document.getElementById("invoice_icon_text");
invoiceIcon.removeAttribute('hidden');

document.getElementById("clients_icon_text").style.marginRight = "0px";
document.getElementById("clients_icon_text").style.marginLeft = "15px";
document.getElementById("clients_icon_text").style.marginTop = "0px";
document.getElementById("clients_icon_text").style.marginBottom = "0px";
const clientsIcon = document.getElementById("clients_icon_text");
clientsIcon.removeAttribute('hidden');

document.getElementById("items_icon_text").style.marginRight = "0px";
document.getElementById("items_icon_text").style.marginLeft = "15px";
document.getElementById("items_icon_text").style.marginTop = "0px";
document.getElementById("items_icon_text").style.marginBottom = "0px";
const itemsIcon = document.getElementById("items_icon_text");
itemsIcon.removeAttribute('hidden');

document.getElementById("statistics_icon_text").style.marginRight = "0px";
document.getElementById("statistics_icon_text").style.marginLeft = "15px";
document.getElementById("statistics_icon_text").style.marginTop = "0px";
document.getElementById("statistics_icon_text").style.marginBottom = "0px";
const statisticsIcon = document.getElementById("statistics_icon_text");
statisticsIcon.removeAttribute('hidden');

document.getElementById("settings_icon_text").style.marginRight = "0px";
document.getElementById("settings_icon_text").style.marginLeft = "15px";
document.getElementById("settings_icon_text").style.marginTop = "0px";
document.getElementById("settings_icon_text").style.marginBottom = "0px";
const settingsIcon = document.getElementById("settings_icon_text");
settingsIcon.removeAttribute('hidden');
}


function revertMenu(){
document.getElementById("vertical_menu").style.width = "8vh";
document.getElementById("vertical_menu").style.alignItems = "center";
document.getElementById("vertical_menu").style.alignContent = "center";
const fabIcon = document.getElementById("fab_element")
fabIcon.style.marginTop = "20px";
fabIcon.style.paddingLeft = "0px";
fabIcon.innerHTML = "<md-fab></md-fab>";
document.getElementsByTagName("md-fab")[0].setAttribute("icon", "add");



const menuNavItems = document.getElementsByClassName("menu_nav_items");
for (var i = 0; i < menuNavItems.length; i++) {
    menuNavItems[i].style.width="auto";
}

const menuItem = document.getElementsByClassName("menu_item");
for (var i = 0; i < menuItem.length; i++) {
    menuItem[i].style.marginRight=null;
    menuItem[i].style.width="auto";
}

const navItems = document.getElementsByClassName("nav_items");
for (var i = 0; i < navItems.length; i++) {
    navItems[i].style.display=null;
    navItems[i].style.alignItems=null;
    navItems[i].style.marginLeft=null;
    navItems[i].style.paddingLeft=null;
}

document.getElementById("invoice_icon_text").style.marginRight = null;
document.getElementById("invoice_icon_text").style.marginLeft = null;
document.getElementById("invoice_icon_text").style.marginTop = null;
document.getElementById("invoice_icon_text").style.marginBottom = "0px";
document.getElementById("invoice_icon_text").style.paddingBottom = "0px"
const invoiceIcon = document.getElementById("invoice_icon_text");
invoiceIcon.setAttribute('hidden', true);

document.getElementById("clients_icon_text").style.marginRight = null;
document.getElementById("clients_icon_text").style.marginLeft = null;
document.getElementById("clients_icon_text").style.marginTop = null;
document.getElementById("clients_icon_text").style.marginBottom = "0px";
document.getElementById("clients_icon_text").style.paddingBottom = "0px"
const clientsIcon = document.getElementById("clients_icon_text");
clientsIcon.setAttribute('hidden', true);

document.getElementById("items_icon_text").style.marginRight = null;
document.getElementById("items_icon_text").style.marginLeft = null;
document.getElementById("items_icon_text").style.marginTop = null;
document.getElementById("items_icon_text").style.marginBottom = "0px";
document.getElementById("items_icon_text").style.paddingBottom = "0px"
const itemsIcon = document.getElementById("items_icon_text");
itemsIcon.setAttribute('hidden', true);

document.getElementById("statistics_icon_text").style.marginRight = null;
document.getElementById("statistics_icon_text").style.marginLeft = null;
document.getElementById("statistics_icon_text").style.marginTop = null;
document.getElementById("statistics_icon_text").style.marginBottom = "0px";
document.getElementById("statistics_icon_text").style.paddingBottom = "0px"
const statisticsIcon = document.getElementById("statistics_icon_text");
statisticsIcon.setAttribute('hidden', true);

document.getElementById("settings_icon_text").style.marginRight = null;
document.getElementById("settings_icon_text").style.marginLeft = null;
document.getElementById("settings_icon_text").style.marginTop = null;
document.getElementById("settings_icon_text").style.marginBottom = "0px";
document.getElementById("settings_icon_text").style.paddingBottom = "0px"
const settingsIcon = document.getElementById("settings_icon_text");
settingsIcon.setAttribute('hidden', true);
}


const mouseTarget = document.getElementById("vertical_menu");
mouseTarget.addEventListener('mouseenter', event => changeMenu());
mouseTarget.addEventListener("mouseleave", event => revertMenu());


const invoicesMenuButton = document.getElementById("invoices_nav_items");
const clientsMenuButton = document.getElementById("clients_nav_items");
const itemsMenuButton = document.getElementById("items_nav_items");
const statisticsMenuButton = document.getElementById("statistics_nav_items");
const settingsMenuButton = document.getElementById("settings_nav_items");



function hoverOnButton(element){
    if (!(element.classList.contains("bg_outline_menu_item"))) {
        element.classList.toggle("bg_outline_dark_menu_item");
    }
}

function returnDefStateOfButton(element){
    if (!(element.classList.contains("bg_outline_menu_item"))) {
        element.classList.toggle("bg_outline_dark_menu_item");
    }
}


invoicesMenuButton.addEventListener('mouseover', event=>hoverOnButton(invoicesMenuButton))
invoicesMenuButton.addEventListener('mouseout', event=>returnDefStateOfButton(invoicesMenuButton))

clientsMenuButton.addEventListener('mouseover', event=>hoverOnButton(clientsMenuButton))
clientsMenuButton.addEventListener('mouseout', event=>returnDefStateOfButton(clientsMenuButton))

itemsMenuButton.addEventListener('mouseover', event=>hoverOnButton(itemsMenuButton))
itemsMenuButton.addEventListener('mouseout', event=>returnDefStateOfButton(itemsMenuButton))

statisticsMenuButton.addEventListener('mouseover', event=>hoverOnButton(statisticsMenuButton))
statisticsMenuButton.addEventListener('mouseout', event=>returnDefStateOfButton(statisticsMenuButton))

settingsMenuButton.addEventListener('mouseover', event=>hoverOnButton(settingsMenuButton))
settingsMenuButton.addEventListener('mouseout', event=>returnDefStateOfButton(settingsMenuButton))




