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

document.querySelector("#edit_item_page_button_redirect").addEventListener('click', () =>{
    window.location.replace(host + "/items/edit/" + itemId);
})

