import {host} from './utils_clients.js'

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
        const data = {"accessToken": token};
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
    } else {
        window.location.replace(host + '/user/login/');
    }
}

function fillInitials(userData) {
    const userFirstName = userData["first_name"];
    const userLastName = userData["last_name"];
    document.getElementById("user_name").textContent = userFirstName + " " + userLastName;
}

export async function getUserData(url) {
    let jsonResponse, response;
    try {
        const result = await fetch(host + url, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${window.localStorage.getItem('accessToken')}`
            },
        });
        response = result.status;
        jsonResponse = await result.json();
    } catch (error) {
        console.error('Going to obtain new access token!');
    }
    return {'responseStatus': response, 'data': jsonResponse};
}

export async function sendAddEditRequest(url, data, requestMethod) {
    let status;
    let headers = {
        'Authorization': `Bearer ${window.localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json'
    }
    try {
        const response = await fetch(url, {
            headers: headers,
            body: data,
            method: requestMethod
        });
        status = response.status;
        console.log(`Status code: ${status}`);

    } catch (error) {
        console.error(error);
    }
    return status;
}

export async function actionBasedOnStatusCode(statusCode, successStatusCode, data, returnAllFieldsList, successUrl, requestMethod, requestUrl) {
    if (statusCode === successStatusCode) {
        for (let field of returnAllFieldsList) {
            field.value = '';
        }
        window.location.href = host + successUrl;
    } else if (statusCode === 401) {
        const obtainedNewTokens = await obtainNewAccessToken();
        if (!obtainedNewTokens) {
            window.location.href = host + '/user/login/';
        } else {
            const status = await sendAddEditRequest(host + requestUrl, data, requestMethod);
            actionBasedOnStatusCode(status, successStatusCode, data, returnAllFieldsList, successUrl, requestMethod, requestUrl);
        }
    } else {
        console.log(`Unknown error: status code = ${statusCode}`);
    }
}


export function addCheckboxesListener(elementsIdOrClass, deleteElementsIdOrClass, deleteElementsIdOrClassWithoutPoint, deleteManyElementsIdOrClass, url) {
    let dataForServer;
    const checkboxesContainer = document.querySelector(elementsIdOrClass);
    checkboxesContainer.addEventListener('change', async (event) => {
        const clickedElement = event.target;
        if (clickedElement.classList.contains(deleteElementsIdOrClassWithoutPoint)) {
            if (getCheckedBoxes(deleteElementsIdOrClass).length > 0) {
                document.querySelector(deleteManyElementsIdOrClass).style.display = "flex";
            } else {
                document.querySelector(deleteManyElementsIdOrClass).style.display = "none";
            }
        }
    });
    document.querySelector(deleteManyElementsIdOrClass).addEventListener('click', async () => {
        dataForServer = getCheckedBoxes(deleteElementsIdOrClass);
        await sendRequestToDeleteElements(dataForServer, url);
    })
}

export function getCheckedBoxes(classOfElem) {
    let allCheckboxes = document.querySelectorAll(classOfElem);
    return Array.from(allCheckboxes).filter(checkbox => checkbox.checked).map(checkbox => parseInt(checkbox.dataset.elementId));
}

export async function sendRequestToDeleteElements(elementsIds, url) {
    try {
        const requestOptions = {
            method: 'DELETE',
            body: JSON.stringify({"elementsIds": elementsIds}),
            headers: {
                'Authorization': `Bearer ${window.localStorage.getItem('accessToken')}`,
                'Content-Type': 'application/json'
            },
        };
        const response = await fetch(host + url, requestOptions);
        if (response.ok) {
            location.reload();
        } else if (response.status === 401) {
            window.location.replace(host + '/user/login/');
        } else {
            console.error('Error with deleting client:', response.statusText);
        }
    } catch (error) {
        console.error('Error with deleting client:', error);
    }
}

export function addDeleteButtonListeners(selectorName, url) {
    const deleteButtons = document.querySelectorAll(selectorName);
    deleteButtons.forEach(span => {
        span.addEventListener('click', async () => {
            try {
                const elementIds = span.dataset.elementId;
                const requestOptions = {
                    method: 'DELETE',
                    body: JSON.stringify({"elementsIds": [parseInt(elementIds)]}),
                    headers: {
                        'Authorization': `Bearer ${window.localStorage.getItem('accessToken')}`,
                        'Content-Type': 'application/json'
                    },
                };
                const response = await fetch(host + url, requestOptions);
                if (response.ok) {
                    location.reload();
                } else if (response.status === 401) {
                    window.location.replace(host + '/user/login/');
                } else {
                    console.error('Error with deleting client:', response.statusText);
                }
            } catch (error) {
                console.error('Error with deleting client:', error);
            }
        });
    });
}

export function search(elements, elementDivs) {
    const input = document.getElementById('search_bar').value.toLowerCase();
    const elementsList = document.getElementsByClassName(elements);
    const elementsListDivs = document.getElementsByClassName(elementDivs);
    

    for (let i = 0; i < elementsList.length; i++) {
        if (!elementsList[i].innerHTML.toLowerCase().includes(input)) {
            elementsListDivs[i].style.display = "none";
        } else {
            elementsListDivs[i].style.removeProperty("display");
        }
    }
}
