document.getElementById("search_bar").addEventListener('keyup', ()=> {
    let input = document.getElementById('search_bar').value;
    input = input.toLowerCase();
    let x = document.getElementsByClassName('item_name');
    let y = document.getElementsByClassName('client_list_item');
    

    for (let i = 0; i < x.length; i++) {
        if (!x[i].innerHTML.toLowerCase().includes(input)) {
            y[i].style.display = "none";
        } else {
            y[i].style.removeProperty("display");
        }
    }
});

document.getElementById("adder").addEventListener('click', ()=> {
    window.location.href = host+'/items/add/';
})


document.querySelector("#sort_asc").addEventListener("click", ()=> {
    const parent = document.querySelector("#items_container");
    const divs = parent.querySelectorAll('.client_list_item');
    const sortedDivs = Array.from(divs).sort((a, b) => a.querySelector(".item_name").textContent.localeCompare(b.querySelector(".item_name").textContent));
    parent.innerHTML = '';
    for (const div of sortedDivs) {
      parent.appendChild(div);
    }
})