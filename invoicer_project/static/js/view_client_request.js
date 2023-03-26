import {
    clientId,
    fillFieldsWithClientsData,
    hideUnnecessaryElementsInMenu,
    host,
} from "./utils_clients.js";
import {obtainUserInitials} from "./request_utils.js";

document.addEventListener('DOMContentLoaded', () => {
    obtainUserInitials();
    fillFieldsWithClientsData();
    hideUnnecessaryElementsInMenu();
});

document.querySelector("#edit_client_page_button_redirect").addEventListener('click', () =>{
    window.location.replace(host + "/clients/edit/" + clientId);
})

document.querySelector(".ui.selection.dropdown").style.pointerEvents = "none";
document.querySelector(".ui.fluid.dropdown>.dropdown.icon").style.display = "none";




