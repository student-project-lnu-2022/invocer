import {search} from './utils.js'
document.getElementById("search_bar").addEventListener('keyup', () => { search('list_client_username', 'client_list_item')});
