export const host = "http://127.0.0.1:8000";

export async function obtainNewAccessToken() {
    let response;
    const data = {refresh: window.localStorage.getItem('refreshToken')};
    try {
        response = await fetch(host + '/user/refresh/', {
            method: "POST",
            body: JSON.stringify(data)
        });
        const newToken = await response.json();
        const accessToken = newToken['access'];
        window.localStorage.setItem('accessToken', accessToken);
    } catch (error) {
        console.error(error);
    }
    return response.status === 200;
}

export async function obtainUserInitials() {
    let responseCode;
    const token = window.localStorage.getItem('accessToken');
    if (token) {
        const data = { "accessToken": token };
        try {
            const serverReply = await fetch(host + '/user/decode/', {
                method: "POST",
                body: JSON.stringify(data)
            });
            responseCode = serverReply.status;
            const initials = await serverReply.json();
            if (responseCode === 200) {
                fillInitials(initials);
            } else if (responseCode === 400) {
                const obtainedNewTokens = await obtainNewAccessToken();
                if (!obtainedNewTokens) {
                    window.location.href = host + '/user/login/';
                } else {
                    await obtainUserInitials();
                }
            } else {
                window.location.replace(host + '/user/login/');
            }
        } catch (error) {
            console.error(error);
        }
    }
    else {
        window.location.replace(host + '/user/login/');
    }
}

export function fillInitials(userData) {
    const userFirstName = userData["first_name"];
    const userLastName = userData["last_name"];
    document.getElementById("user_name").textContent = userFirstName + " " + userLastName;
}


export function clearErrorAttributes(returnAllFieldsList) {
    if (returnAllFieldsList !== undefined) {
        for (let field of returnAllFieldsList) {
            field.addEventListener('input', () => {
                field.removeAttribute("error");
                field.removeAttribute("errorText");
            })
        }
    }
}


export function setMaxFieldContainerHeights(returnAllFieldsList) {
    if (typeof  returnAllFieldsList !== undefined) {
    for (let field of returnAllFieldsList) {
        field.shadowRoot.querySelector('.md3-text-field__field').shadowRoot.querySelector('.md3-field').querySelector('.md3-field__container').style.maxHeight = "56px";
    }
}
}

export function removeAllErrorAttributes(returnAllFieldsList) {
    if (typeof  returnAllFieldsList !== undefined) {
    for (let item of returnAllFieldsList) {
        item.removeAttribute("error");
        item.removeAttribute("errorText");
    }
}
}

export function allAreFalse(object) {
    for (let key in object) {
        if (object[key]) {
            return false;
        }
    }
    return true;
}

export function search(fieldToSearch, item) {
    let inputFromSearchbar = document.getElementById('search_bar').value;
    inputFromSearchbar = inputFromSearchbar.toLowerCase();
    const clientUsername = document.getElementsByClassName(fieldToSearch);
    const clientListItem = document.getElementsByClassName(item);

    for (let i = 0; i < clientUsername.length; i++) {
        if (!clientUsername[i].innerHTML.toLowerCase().includes(inputFromSearchbar)) {
            clientListItem[i].style.display = "none";
        } else {
            clientListItem[i].style.removeProperty("display");
        }
    }
}