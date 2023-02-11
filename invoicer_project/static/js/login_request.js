const host = "http://127.0.0.1:8000";
const emailForm = document.getElementById("email_input_log_in_page");
const passwordForm = document.getElementById("password_input_log_in_page");


function validatePassword() {
    return passwordForm.value !== '';
}

function validateEmail() {
    let userEmail = emailForm.value;
    return !(userEmail.includes(' ') || !(/^[a-zA-Z0-9.]{3,20}@(?:[a-zA-Z0-9]{2,20}\.){1,30}[a-zA-Z]{2,10}$/.test(userEmail))) 
}

function validateLoginDataOnFrontEnd() {
    const emailRes = validateEmail();
    const passwordRes = validatePassword();
    return emailRes && passwordRes;
}


function visualEffects() {
    emailForm.setAttribute('error', 'true');
    passwordForm.setAttribute('error', 'true');
    passwordForm.setAttribute('errorText', 'Invalid data');
}

function cancelVisualEffects() {
    emailForm.removeAttribute('error');
    passwordForm.removeAttribute('error');
    passwordForm.removeAttribute('errorText');
}



document.getElementById("log_in_confirmation_button_log_in_page").addEventListener("click", async function (e) {
    e.preventDefault();
    if (validateLoginDataOnFrontEnd()) {
        cancelVisualEffects();
        const csrf_token = document.getElementsByName('csrfmiddlewaretoken')[0].value;
        const email = emailForm.value;
        const password = passwordForm.value;
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        formData.append('csrfmiddlewaretoken', csrf_token);

        
        const gotToken = await checkAndSaveTokens(host + '/user/authentication/', formData);
        if (gotToken) {
            emailForm.value = '';
            passwordForm.value = '';
            window.location.replace(host + '/clients/home/');
        } 
    } else {
        visualEffects();
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
            emailForm.setAttribute("error", "true");
            passwordForm.setAttribute("error", "true");
            passwordForm.setAttribute("errorText", "Incorrect credentials!");
        } else {
            emailForm.setAttribute("error", "true");
            passwordForm.setAttribute("error", "true");
            passwordForm.setAttribute("errorText", "Unknown error");
        }
    } catch (error) {
        console.error(error);
    }   
    return flag;
}

