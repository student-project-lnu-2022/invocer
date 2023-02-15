document.getElementById("search_bar").addEventListener('keyup', () => {
    let inputFromSearchbar = document.getElementById('search_bar').value;
    inputFromSearchbar = inputFromSearchbar.toLowerCase();
    let clientUsername = document.getElementsByClassName('list_client_username');
    let clientListItem = document.getElementsByClassName('client_list_item');

    for (i = 0; i < clientUsername.length; i++) {
        if (!clientUsername[i].innerHTML.toLowerCase().includes(inputFromSearchbar)) {
            clientListItem[i].style.display = "none";
        } else {
            clientListItem[i].style.removeProperty("display");
        }
    }
});