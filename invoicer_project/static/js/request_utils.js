import { host } from './utils_clients.js'

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

function fillInitials(userData) {
    const userFirstName = userData["first_name"];
    const userLastName = userData["last_name"];
    document.getElementById("user_name").textContent = userFirstName + " " + userLastName;
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
    } else if (statusCode === 400) {
    } else {
        console.log(`Unknown error: status code = ${statusCode}`);
    }
}