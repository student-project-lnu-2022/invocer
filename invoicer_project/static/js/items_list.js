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