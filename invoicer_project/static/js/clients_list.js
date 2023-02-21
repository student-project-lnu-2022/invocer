document.getElementById("search_bar").addEventListener('keyup', () => {
    const inputFromSearchbar = document.getElementById('search_bar').value;
    inputFromSearchbar = inputFromSearchbar.toLowerCase();
    const clientUsername = document.getElementsByClassName('list_client_username');
    const clientListItem = document.getElementsByClassName('client_list_item');

    for (let i = 0; i < clientUsername.length; i++) {
        if (!clientUsername[i].innerHTML.toLowerCase().includes(inputFromSearchbar)) {
            clientListItem[i].style.display = "none";
        } else {
            clientListItem[i].style.removeProperty("display");
        }
    }
});