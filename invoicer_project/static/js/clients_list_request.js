const host = "http://127.0.0.1:8000";
import {
    obtainUserInitials,
    obtainNewAccessToken,
    addCheckboxesListener,
    getUserData,
    addDeleteButtonListeners,
    addEditButtonListeners
} from './request_utils.js';

function createClientListContent(data) {
    for (let i = 0; i < data.length; i++) {
        let fullName = data[i]['last_name'] + " " + data[i]['first_name'];
        let clientInitials = data[i]['last_name'][0] + data[i]['first_name'][0];
        let clientID = data[i]['id'];
        let clientDebt = data[i]['debt'];
        document.getElementById("other_elements").insertAdjacentHTML('afterbegin', `<div class="row client_list_item clickable_item align-items-center justify-content-between" data-element-id="${clientID}">
                <div class="col-xxl-1 col-xl-1 col-1 clickable_item list_item_user_icon_initials" data-element-id="${clientID}">
                    <p class="list_item_user_icon_initials_text" data-element-id="${clientID}">${clientInitials}</p>
                </div>
                <div class="col-xxl-3 col-xl-3 col-md-3 col-sm-3 col-4 clickable_item list_item_user_name" data-element-id="${clientID}">
                    <p class="list_client_username"  data-element-id="${clientID}" >${fullName}</p>
                </div>
                <div class="col-xxl-4 col-xl-3 col-md-2 col-1 clickable_item list_item_empty_block"  data-client-id="${clientID}"></div>
                <div class="col-xxl-2 col-xl-2 col-md-3 col-sm-2 col-4 clickable_item list_item_user_debt" data-client-id="${clientID}">
                    <p class="list_item_user_debt_text" data-element-id="${clientID}">${clientDebt} UAH</p>
                </div>
                <div class="col-xxl-2 col-xl-3 col-md-3 col-sm-5 col-3 list_item_user_buttons" data-client-id="${clientID}">
                    <md-standard-icon-button class="client-info edit-client" data-element-id="${clientID}"><span class="material-symbols-outlined">edit</span></md-standard-icon-button>
                    <md-standard-icon-button class="client-info delete-client" data-element-id="${clientID}"><span class="material-symbols-outlined">delete</span></md-standard-icon-button>
                    <md-checkbox class="delete_clients_checkbox" id="list_item_user_delete" data-element-id="${clientID}"></md-checkbox>
                </div>
                <div class="col-2 list_item_more_button">
                    <md-standard-icon-button class="client-info more-client" data-element-id="${clientID}" data-contextmenu="client-context-menu-${clientID}"><span class="material-symbols-outlined">more_vert</span></md-standard-icon-button>
                </div>
<div id="contextmenu-${clientID}" class="contextmenu">
    <item id="context_menu_edit-${clientID}" class="context_menu_edit-${clientID}"><span class="material-symbols-outlined" style="font-size: 20px; margin-right: 5px;">edit</span>Edit</item>
    <item id="context_menu_delete-${clientID}" class="delete-client" data-element-id="${clientID}"><span class="material-symbols-outlined" style="font-size: 20px; margin-right: 5px;">delete</span>Delete</item>
</div>
                         </div>`);
        document.querySelector(`#context_menu_edit-${clientID}`).addEventListener("click", () => {
            window.location.href = host + "/clients/edit/" + clientID;
        });
    }
}

async function addElementsDynamically() {
    let responseFromServer = await getUserData("/clients/client/");
    const response = responseFromServer["responseStatus"];
    if (response === 200) {
        createClientListContent(responseFromServer["data"]["content"]);
        addDeleteButtonListeners('.delete-client', `/clients/client`);
        addEditButtonListeners('#other_elements', 'edit-client', "/clients/edit/");
        addCheckboxesListener('#other_elements', '.delete_clients_checkbox', 'delete_clients_checkbox',"#delete_many_clients", `/clients/client`);
    } else if (response === 401) {
        const successfulTokenObtaining = await obtainNewAccessToken();
        if (!successfulTokenObtaining) {
            window.location.replace(host + '/user/login/');
        } else {
            responseFromServer = await getUserData("/clients/client/");
            createClientListContent(responseFromServer["data"]["content"]);
            addDeleteButtonListeners('.delete-client', `/clients/client`);
            addEditButtonListeners('#other_elements', 'edit-client', "/clients/edit/");
            addCheckboxesListener('#other_elements', '.delete_clients_checkbox', 'delete_clients_checkbox',"#delete_many_clients", `/clients/client`);
        }
    } else {
        window.location.replace(host + '/user/login/');
    }
}


document.querySelector('#adder').addEventListener('click', () => {
    window.location.href = host + "/clients/add";
})

document.querySelector('#add_client_mobile').addEventListener('click', () => {
    window.location.href = host + "/clients/add";
})


document.addEventListener('DOMContentLoaded', async () => {
    await obtainUserInitials();
    addElementsDynamically();
});


(function () {

    window.mouseX = 0;
    window.mouseY = 0;

    document.onmousemove = function (e) {
        window.mouseX = e.clientX || 0;
        window.mouseY = e.clientY || 0;
    };

    document.onclick = function (e) {
        if (e.target.classList.contains('more-client')) {
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
