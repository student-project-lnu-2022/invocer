const host = "http://127.0.0.1:8000";
csrf_token = document.getElementsByName('csrfmiddlewaretoken')[0].value;
const sendData = async (url, dataToSend) => {
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
        document.getElementById("email_input_log_in_page").value = "";
        document.getElementById("password_input_log_in_page").value = "";

        console.log('Sent successfully: ', result);
        window.location = host + '/clients/list/';
    } catch (error) {
        console.error('Error:', error);
    }

}

    document.getElementById("log_in_confirmation_button_log_in_page").addEventListener("click", function (e) {
    e.preventDefault();

    const email = document.getElementById("email_input_log_in_page").value;
    const password = document.getElementById("password_input_log_in_page").value;
    const formData = new FormData();
    console.log(csrf_token);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('csrfmiddlewaretoken', csrf_token);

    sendDataWrap(host + '/user/login/', formData);
});