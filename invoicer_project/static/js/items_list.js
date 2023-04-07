import {host} from "./utils_clients.js";
import {search} from './request_utils.js';

document.getElementById("search_bar").addEventListener('keyup', ()=> { search('item_name', 'client_list_item')});

document.getElementById("adder").addEventListener('click', ()=> {
    window.location.href = host+'/items/add/';
})

function addDivItemListener() {
    const itemsList = document.querySelector('#items_container');
    itemsList.addEventListener('click', async (event) => {
        const clickedElement = event.target;
        if (clickedElement.classList.contains('redirect_to_item_info')) {
            const itemId = clickedElement.dataset.itemId;
            window.location.href = host + "/items/view/" + itemId;
        }
    });
}

document.getElementById("adder").addEventListener('click', () => {
    window.location.href = host + '/items/add/';
});

document.querySelector("#sort_asc").addEventListener("click", () => {
    const parent = document.querySelector("#items_container");
    const divs = parent.querySelectorAll('.items_list_item');
    const sortedDivs = Array.from(divs).sort((a, b) => a.querySelector(".item_name").textContent.localeCompare(b.querySelector(".item_name").textContent));
    parent.innerHTML = '';
    for (const div of sortedDivs) {
      parent.appendChild(div);
    }
});

addDivItemListener();