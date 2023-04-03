const host = "http://127.0.0.1:8000";
import {
    obtainUserInitials,
    obtainNewAccessToken,
    getUserData,
    addCheckboxesListener,
    addDeleteButtonListeners,
    addEditButtonListeners
} from "./request_utils.js";


function createItemListContent(data) {
    for (let item of data) {
        let itemName = item['name'];
        let priceAndCurrency = item['price'] + " " + item['currency'];
        let itemID = item['id']

        document.getElementById("items_container").insertAdjacentHTML('afterbegin', `<div class="row client_list_item align-items-center justify-content-around redirect_to_item_info" data-item-id="${itemID}">
                        <div class="col-md-5 col-sm-4 col-6 list_item_name redirect_to_item_info list_item_name redirect_to_item_info" data-item-id="${itemID}">
                            <p class="item_name redirect_to_item_info" data-item-id="${itemID}">${itemName}</p>
                        </div>
                        <div class="d-flex flex-wrap flex-row justify-content-end col-md-7 col-sm-8 col-6 redirect_to_item_info" data-item-id="${itemID}">
                            <div class="d-flex flex-wrap flex-column list_item_info_block redirect_to_item_info" data-item-id="${itemID}">
                                <p class="additional_text redirect_to_item_info" data-item-id="${itemID}">Price per unit</p>
                                <p class="main_text redirect_to_item_info" data-item-id="${itemID}">${priceAndCurrency}</p>
                            </div>
                            <div class="d-flex flex-wrap flex-column list_item_info_block redirect_to_item_info" data-item-id="${itemID}">
                                <p class="additional_text redirect_to_item_info" data-item-id="${itemID}">Basic unit</p>
                                <p class="main_text redirect_to_item_info" data-item-id="${itemID}">kg</p>
                            </div>
                            <div class="list_item_user_buttons">
                                 <md-standard-icon-button class="edit-item" data-element-id="${itemID}"><span class="material-symbols-outlined">edit</span></md-standard-icon-button>
                                <md-standard-icon-button class="delete-item" data-element-id="${itemID}"><span class="material-symbols-outlined">delete</span></md-standard-icon-button>
                                <md-checkbox class="delete_items_checkbox" id="list_item_user_delete"  data-element-id="${itemID}"></md-checkbox>
                            </div>
                        </div>
                    </div>`)
    }
}


async function addElementsDynamically() {
    let responseFromServer = await getUserData('/items/items_list/');
    const response = responseFromServer["responseStatus"];
    if (response === 200) {
        createItemListContent(responseFromServer["data"]["content"]);
        addDeleteButtonListeners('.delete-item', `/items/items_list/`);
        addEditButtonListeners('#items_container', 'edit-item', "/items/edit/");
        addCheckboxesListener('#items_container', ".delete_items_checkbox", "delete_items_checkbox", "#delete_many_clients", "/items/items_list", 'itemId');
    } else if (response === 401) {
        const successfulTokenObtaining = await obtainNewAccessToken();
        if (!successfulTokenObtaining) {
            window.location.replace(host + '/user/login/');
        } else {
            responseFromServer = await getUserData('/items/items_list/');
            createItemListContent(responseFromServer["data"]["content"]);
            addDeleteButtonListeners('.delete-item', `/items/items_list/`);
            addEditButtonListeners('#items_container', 'edit-item', "/items/edit/");
            addCheckboxesListener('#items_container', ".delete_items_checkbox", "delete_items_checkbox", "#delete_many_clients", "/items/items_list", 'itemId');
        }
    } else {
        window.location.replace(host + '/user/login/');
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    await obtainUserInitials();
    addElementsDynamically();
    document.querySelector("#adder").label = "Add item";
});

document.querySelector('#adder').addEventListener('click', () => {
    window.location.href = host + "/items/add";
})