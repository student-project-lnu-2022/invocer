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

        document.getElementById("items_container").insertAdjacentHTML('afterbegin', `
            <div class="row items_list_item align-items-center justify-content-around redirect_to_item_info" data-item-id="${itemID}">
                <div class="col-xxl-5 col-xl-5 col-md-4 col-sm-2 col-3 list_item_name redirect_to_item_info list_item_name redirect_to_item_info" data-item-id="${itemID}">
                    <p class="item_name redirect_to_item_info" data-item-id="${itemID}">${itemName}</p>
                </div>
                <div class="d-flex flex-wrap flex-row justify-content-end col-xxl-7 col-xl-7 col-md-8 col-sm-8 col-7 redirect_to_item_info" data-item-id="${itemID}">
                    <div class="d-flex flex-wrap flex-column list_item_info_block redirect_to_item_info" data-item-id="${itemID}">
                        <p class="additional_text redirect_to_item_info" data-item-id="${itemID}">Price per unit</p>
                        <p class="main_text redirect_to_item_info" data-item-id="${itemID}">${priceAndCurrency}</p>
                    </div>
                    <div class="d-flex flex-wrap flex-column list_item_info_block redirect_to_item_info" data-item-id="${itemID}">
                        <p class="additional_text redirect_to_item_info" data-item-id="${itemID}">Basic unit</p>
                        <p class="main_text redirect_to_item_info" data-item-id="${itemID}">kg</p>
                    </div>
                    <div class="list_item_user_buttons">
                        <md-standard-icon-button class="edit-item" data-element-id="${itemID}">
                            <span class="material-symbols-outlined">edit</span>
                        </md-standard-icon-button>
                        <md-standard-icon-button class="delete-item" data-element-id="${itemID}">
                            <span class="material-symbols-outlined">delete</span>
                        </md-standard-icon-button>
                        <md-checkbox class="delete_items_checkbox" id="list_item_user_delete" data-element-id="${itemID}"></md-checkbox>
                    </div>
                </div>
                <div class="col-2 list_item_more_button">
                        <md-standard-icon-button class="more-item" data-element-id="${itemID}" data-contextmenu="item-context-menu-${itemID}">
                            <span class="material-symbols-outlined">more_vert</span>
                        </md-standard-icon-button>
                    </div>
                    <div id="contextmenu-${itemID}" class="contextmenu">
    <item id="context_menu_edit-${itemID}" class="context_menu_edit-${itemID}"><span class="material-symbols-outlined" style="font-size: 20px; margin-right: 5px;">edit</span>Edit</item>
    <item id="context_menu_delete-${itemID}" class="delete-item" data-element-id="${itemID}"><span class="material-symbols-outlined" style="font-size: 20px; margin-right: 5px;">delete</span>Delete</item>
</div>
            </div>
        `);
        document.querySelector(`#context_menu_edit-${itemID}`).addEventListener("click", () => {
            window.location.href = host + "/items/edit/" + itemID;
        });
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
});

document.querySelector('#add_item_mobile').addEventListener('click', () => {
    window.location.href = host + "/items/add";
});


(function () {

    window.mouseX = 0;
    window.mouseY = 0;

    document.onmousemove = function (e) {
        window.mouseX = e.clientX || 0;
        window.mouseY = e.clientY || 0;
    };

    document.onclick = function (e) {
        if (e.target.classList.contains('more-item')) {
            e.preventDefault();

            const contextMenus = document.querySelectorAll(".contextmenu");
            contextMenus.forEach(menu => {
                menu.style.display = 'none';
            });

            const elementId = e.target.getAttribute("data-element-id");
            document.querySelector(`#contextmenu-${elementId}`).style.display = 'inline-block';
            document.querySelector(`#contextmenu-${elementId}`).style.top = (window.mouseY - 55) + 'px';
            document.querySelector(`#contextmenu-${elementId}`).style.left = (window.mouseX - 130) + 'px';
        } else {
            const contextMenus = document.querySelectorAll("[id^='contextmenu-']");
            contextMenus.forEach(menu => {
                menu.style.display = 'none';
            });
        }
    };
    var context_items = document.getElementsByTagName('item'),
        i,
        context_action = function () {
            if ((this.getAttribute('state') || '').indexOf('gray') === -1 && this.getAttribute('action') in funcs) {
                funcs[this.getAttribute('action')]();
            }
        };

    for (i = 0; i < context_items.length; i += 1) {
        context_items[i].onclick = context_action;
    }

}());
