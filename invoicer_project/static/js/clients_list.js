function search_item() {
    let input = document.getElementById('searchbar').value;
    input = input.toLowerCase();
    let x = document.getElementsByClassName('list_item_user_name_text');
    let y = document.getElementsByClassName('client_list_item');

    for (i = 0; i < x.length; i++) {
        if (!x[i].innerHTML.toLowerCase().includes(input)) {
            y[i].style.display = "none";
        } else {
            y[i].style.removeProperty("display");
        }
    }
}