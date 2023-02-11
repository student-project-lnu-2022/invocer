const host = "http://127.0.0.1:8000";
const emailInput = document.getElementById("email_input_lg_pg");
const passwordForm = document.getElementById("password_input_lg_pg");


function validatePassword() {
    return passwordForm.value !== '';
}

function validateEmail() {
    let userEmail = emailInput.value;
    return !(userEmail.includes(' ') || !(/^[a-zA-Z0-9.]{3,20}@(?:[a-zA-Z0-9]{2,20}\.){1,30}[a-zA-Z]{2,10}$/.test(userEmail))) 
}

function validateLoginDataOnFrontEnd() {
    const emailInputValRes = validateEmail();
    const passwordInputValRes = validatePassword();
    return emailInputValRes && passwordInputValRes;
}


function SettingErrorAttributesToInputs() {
    emailInput.setAttribute('error', 'true');
    passwordForm.setAttribute('error', 'true');
    passwordForm.setAttribute('errorText', 'Invalid data');
}

function cancelVisualEffects() {
    emailInput.removeAttribute('error');
    passwordForm.removeAttribute('error');
    passwordForm.removeAttribute('errorText');
}



document.getElementById("log_in_confirmation_button_log_in_page").addEventListener("click", async function (e) {
    e.preventDefault();
    if (validateLoginDataOnFrontEnd()) {
        cancelVisualEffects();
        const csrf_token = document.getElementsByName('csrfmiddlewaretoken')[0].value;
        const email = emailInput.value;
        const password = passwordForm.value;
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        formData.append('csrfmiddlewaretoken', csrf_token);

        
        const gotToken = await checkAndSaveTokens(host + '/user/authentication/', formData);
        if (gotToken) {
            emailInput.value = '';
            passwordForm.value = '';
            window.location.replace(host + '/clients/home/');
        } 
    } else {
        SettingErrorAttributesToInputs();
    }
});


const checkAndSaveTokens = async (url, dataToSend) => {
    let flag = false, statusCode;
    try {
         const res = await fetch(url, {
             method: 'POST',
             body: dataToSend
         })
        const jsonResponce = await res.json(); 
        statusCode = res.status;
        
        if (statusCode === 200) {
            window.localStorage.setItem('accessToken', jsonResponce['access']);
            window.localStorage.setItem('refreshToken', jsonResponce['refresh']);
            return true;
        } else if (statusCode === 400) {
            emailInput.setAttribute("error", "true");
            passwordForm.setAttribute("error", "true");
            passwordForm.setAttribute("errorText", "Incorrect credentials!");
        } else {
            emailInput.setAttribute("error", "true");
            passwordForm.setAttribute("error", "true");
            passwordForm.setAttribute("errorText", "Unknown error");
        }
    } catch (error) {
        console.error(error);
    }   
    return flag;
}

