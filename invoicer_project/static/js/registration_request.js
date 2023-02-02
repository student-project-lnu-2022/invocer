csrf_token = document.getElementsByName('csrfmiddlewaretoken')[0].value;
const sendData = async (url, dataToSend) => {
    if (dataToSend.get('password') !== dataToSend.get('repeat_password')) {
        throw new Error('Passwords don\'t match!!!')
    }
console.log(dataToSend);
    const res = await fetch(url, {
        method: 'POST',
        body: dataToSend
    })

    const jsonResponce = await res.json()
    return jsonResponce
}

const sendDataWrap = async (url, dataToSend) => {
    try {
        const result = await sendData(url, dataToSend);
        document.getElementById("name_input_registration_page").value = "";
        document.getElementById("surname_input_registration_page").value = "";
        document.getElementById("email_input_registration_page").value = "";
        document.getElementById("password_input_registration_page").value = "";
        document.getElementById("repeat_password_input_registration_page").value = "";

        console.log('Sent successfully: ', result);
    } catch (error) {
        console.error('Error:', error);
    }

}

    document.getElementById("sign_up_confirmation_button_registration_page").addEventListener("click", function (e) {
    e.preventDefault();
    const name = document.getElementById("name_input_registration_page").value;
    const surname = document.getElementById("surname_input_registration_page").value;
    const email = document.getElementById("email_input_registration_page").value;
    const password = document.getElementById("password_input_registration_page").value;
    const repeat_password = document.getElementById("repeat_password_input_registration_page").value;
    const formData = new FormData();

    formData.append('first_name', name);
    formData.append('last_name', surname);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('repeat_password', repeat_password);
    formData.append('csrfmiddlewaretoken', csrf_token);

    sendDataWrap('http://127.0.0.1:8000/user/register/', formData)
});