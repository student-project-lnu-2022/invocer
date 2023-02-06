const host = "http://127.0.0.1:8000";
const emailForm = document.getElementById("email_input_log_in_page");
const passwordForm = document.getElementById("password_input_log_in_page");


function validatePassword() {
    if (passwordForm.value === '') {
        passwordForm.setAttribute("error", "true");
        passwordForm.setAttribute("errorText", "Password can't be empty");
        return false;
    }
    return true;
}

function validateEmail() {
    let user_email = emailForm.value;
    let result = false;

    if (user_email.includes(' ')) {
        emailForm.setAttribute("errorText", "You entered an invalid email!");
        emailForm.setAttribute("error", "true");
    } else if (!(/^[a-zA-Z0-9.]{6,20}@(?:[a-zA-Z0-9]{2,20}\.){1,30}[a-zA-Z]{2,10}$/.test(user_email))) {
        emailForm.setAttribute("errorText", "You entered an invalid email!");
        emailForm.setAttribute("error", "true");
    } else {
        emailForm.removeAttribute("errorText");
        emailForm.removeAttribute("error");
        result = true;
    }
    return result;
}

function validateLoginDataOnFrontEnd() {
    const emailRes = validateEmail();
    const passwordRes = validatePassword();
    return emailRes && passwordRes;
}

const sendData = async (url, dataToSend) => {
    const res = await fetch(url, {
        method: 'POST',
        body: dataToSend
    })
    console.log(res);
    const statusCode = res.status;
    const jsonResponce = await res.json()
    return [jsonResponce, statusCode]
}

const sendDataWrap = async (url, dataToSend) => {
    try {
        const result = await sendData(url, dataToSend);

        if (result[1] === 200) {
            localStorage.setItem('refreshToken', result[0]['refresh']);
            localStorage.setItem('accessToken', result[0]['access']);
            emailForm.value = "";
            passwordForm.value = "";
            window.location = host + '/clients/list/';
            
        } else if (result[1] === 400) {
            emailForm.setAttribute("error", "true");
            passwordForm.setAttribute("error", "true");
            passwordForm.setAttribute("errorText", "Incorrect credentials!")
        } else {
            emailForm.setAttribute("error", "true");
            passwordForm.setAttribute("error", "true");
            passwordForm.setAttribute("errorText", "Unknown error");
        }
    } catch (error) {
        console.error('Error:', error);
    }

}

document.getElementById("log_in_confirmation_button_log_in_page").addEventListener("click", function (e) {
    e.preventDefault();
    if (validateLoginDataOnFrontEnd()) {
        const csrf_token = document.getElementsByName('csrfmiddlewaretoken')[0].value;
        const email = emailForm.value;
        const password = passwordForm.value;
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        formData.append('csrfmiddlewaretoken', csrf_token);

        sendDataWrap(host + '/user/login/', formData);
    }
});