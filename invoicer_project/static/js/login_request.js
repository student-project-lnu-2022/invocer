const host = "http://127.0.0.1:8000";
const emailForm = document.getElementById("email_input_log_in_page");
const passwordForm = document.getElementById("password_input_log_in_page");


function validatePassword() {
    return passwordForm.value !== '';
}

function validateEmail() {
    let user_email = emailForm.value;
    return !(user_email.includes(' ') || !(/^[a-zA-Z0-9.]{3,20}@(?:[a-zA-Z0-9]{2,20}\.){1,30}[a-zA-Z]{2,10}$/.test(user_email))) 

}

// function validateEmail() {
//     let user_email = emailForm.value;
//     let result = false;

//     if (user_email.includes(' ')) {
//         emailForm.setAttribute("errorText", "You entered an invalid email!");
//         emailForm.setAttribute("error", "true");
//     } else if (!(/^[a-zA-Z0-9.]{6,20}@(?:[a-zA-Z0-9]{2,20}\.){1,30}[a-zA-Z]{2,10}$/.test(user_email))) {
//         passwordForm.setAttribute("errorText", "Incorrect credentials!");
//         emailForm.setAttribute("error", "true");
//     } else {
//         emailForm.removeAttribute("errorText");
//         emailForm.removeAttribute("error");
//         result = true;
//     }
//     return result;
// }

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


//click on a button 
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
            if (await authorization()) {
                console.log('GOT INSIDE!');
            }
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
        const jsonResponce = await res.json(); //tokens here (if status ok), else error message
        console.log(jsonResponce);
        statusCode = res.status;
        
        if (statusCode === 200) {
            console.log('TokenChange');
            window.localStorage.setItem('accessToken', jsonResponce['access']);
            window.localStorage.setItem('refreshToken', jsonResponce['refresh']);
            return true;
        } else if (statusCode === 400) {
            emailForm.setAttribute("error", "true");
            passwordForm.setAttribute("error", "true");
            passwordForm.setAttribute("errorText", "Incorrect credentianls!");
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

async function authorization() {
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${window.localStorage.getItem('accessToken')}`);
    let response
    try {
        const result = await fetch(host + '/clients/list/', {
        method: "GET",
        headers: headers
        })
        response = result.status;
        console.log(result);    
    } catch (error) {
        console.error(error);
    }
    return response === 200;
}

