import {
    itemId,
    fillFieldsWithData,
    host,
} from "./utils_items.js";
import {hideUnnecessaryElementsInMenu} from './utils_clients.js'
import {obtainUserInitials} from "./request_utils.js";

document.addEventListener('DOMContentLoaded', () => {
    obtainUserInitials();
    fillFieldsWithData();
    hideUnnecessaryElementsInMenu();
});

document.querySelector("#edit_item_page_button_redirect").addEventListener('click', () => {
    window.location.replace(host + "/items/edit/" + itemId);
})

document.querySelector(".ui.selection.dropdown").style.pointerEvents = "none";
document.querySelector(".ui.selection.units_dropdown").style.pointerEvents = "none";

const dropdownArrowIcons = document.querySelectorAll(".ui.fluid.dropdown>.dropdown.icon");

for (let dropdownArrowIcon of dropdownArrowIcons) {
    dropdownArrowIcon.style.display = "none";
}