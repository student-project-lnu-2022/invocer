// const passwordMinLength = 8;
// const passwordMaxLength = 15;
// const nameSurnMaxLength = 35;

// const emailForm = document.getElementById("email_input_registration_page");
// const nameForm = document.getElementById("name_input_registration_page");
// const surnameForm = document.getElementById("surname_input_registration_page");
// const passForm = document.getElementById("password_input_registration_page");
// const repeatPassForm = document.getElementById("repeat_password_input_registration_page");


// function validateRegistration() {
//     removeMaxHeightAttribute();
    
//     let email = validate_email();
//     let passwords = validate_passwords();
//     let names = validate_name_and_surname();
//     checkAndSetNormalHeightNameAndSurnameInput();
//     checkAndSetNormalHeightPasswordAndRepeatPasswordInput();
   
//     return (email && passwords && names)
// }

// function setNormalStateNameInput() {
//     nameForm.removeAttribute("errorText");
//     nameForm.removeAttribute("error");
//     removeMaxHeightAttribute();
//     checkAndSetNormalHeightNameAndSurnameInput();
// }

// function setNormalStateSurnameInput() {
//     surnameForm.removeAttribute("errorText");
//     surnameForm.removeAttribute("error");
//     removeMaxHeightAttribute();
//     checkAndSetNormalHeightNameAndSurnameInput();
// }

// function setNormalStatePasswordInput() {
//     passForm.removeAttribute("errorText");
//     passForm.removeAttribute("error");
//     checkAndSetNormalHeightPasswordAndRepeatPasswordInput();
// }

// function setNormalStateRepeatPasswordInput() {
//     repeatPassForm.removeAttribute("errorText");
//     repeatPassForm.removeAttribute("error");
//     checkAndSetNormalHeightPasswordAndRepeatPasswordInput();
// }

// function setNormalStateEmailInput() {
//     emailForm.removeAttribute("errorText");
//     emailForm.removeAttribute("error");
// }

// function checkAndSetNormalHeightNameAndSurnameInput() {
//     if (nameForm.hasAttribute("error") && !(surnameForm.hasAttribute("error"))) {
//         surnameForm.style.maxHeight = "56px";
//     }
//     if (!(nameForm.hasAttribute("error")) && surnameForm.hasAttribute("error")) {
//         nameForm.style.maxHeight = "56px";
//     }
// }

// function checkAndSetNormalHeightPasswordAndRepeatPasswordInput() {
//     if (passForm.hasAttribute("error") && !(repeatPassForm.hasAttribute("error"))) {
//         repeatPassForm.style.maxHeight = "56px";
//     }
//     if (!(passForm.hasAttribute("error")) && repeatPassForm.hasAttribute("error")) {
//         passForm.style.maxHeight = "56px";
//     }
// }

// function removeMaxHeightAttribute() {
//     surnameForm.style.maxHeight = null;
//     nameForm.style.maxHeight = null;
//     passForm.style.maxHeight = null;
//     repeatPassForm.style.maxHeight = null;
// }


// function validate_email() {
//     let user_email = emailForm.value;
//     if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user_email))) {
//         emailForm.setAttribute("errorText", "You entered an invalid email!");
//         emailForm.setAttribute("error", "true");
//         return true;
//     } else {
//         emailForm.removeAttribute("errorText");
//         emailForm.removeAttribute("error");
//         return false;
//     }
// }

// function validate_passwords() {
//     let userPassword = passForm.value;
//     let userPasswordRepeat = repeatPassForm.value;
    
//     let passwordResult = false;
//     let repeatPasswordResult = false;
//     let match = true;

    
//     if (userPassword.length < passwordMinLength) {
//         passForm.setAttribute("error", "true");
//         passForm.setAttribute("errorText", `Password must have at least ${passwordMinLength} characters`);
//     } else if (userPassword.length > passwordMaxLength) {
//         passForm.setAttribute("error", "true");
//         passForm.setAttribute("errorText", `Password must have at most ${passwordMaxLength} characters`);
//     } else if (!(/^[a-z0-9]+$/i.test(userPassword))) {
//         passForm.setAttribute("error", "true");
//         passForm.setAttribute("errorText", "Only latin letters and numbers are allowed");
//     }
//     else if (!(/\d/.test(userPassword))) {
//         passForm.setAttribute("error", "true");
//         passForm.setAttribute("errorText", "Password must contain number");
//     } else if (!(/[A-Z]/.test(userPassword))) {
//         passForm.setAttribute("error", "true");
//         passForm.setAttribute("errorText", "Password must contain capital letter");
//     } else {
//         passForm.removeAttribute("errorText");
//         passForm.removeAttribute("error");
//         passwordResult = true;
//     }
    
//     if (userPasswordRepeat.length < passwordMinLength) {
//         repeatPassForm.setAttribute("error", "true");
//         repeatPassForm.setAttribute("errorText", `Password must have at least ${passwordMinLength} characters`);
//     } else if (userPasswordRepeat.length > passwordMaxLength) {
//         repeatPassForm.setAttribute("error", "true");
//         repeatPassForm.setAttribute("errorText", `Password must have at most ${passwordMaxLength} characters`);
//     } else if (!(/^[a-z0-9]+$/i.test(userPasswordRepeat))) {
//         repeatPassForm.setAttribute("error", "true");
//         repeatPassForm.setAttribute("errorText", "Only latin letters and numbers are allowed");
//     } else if (!(/\d/.test(userPasswordRepeat))) {
//         repeatPassForm.setAttribute("error", "true");
//         repeatPassForm.setAttribute("errorText", "Password must contain number");
//     } else if (!(/[A-Z]/.test(userPasswordRepeat))) {
//         repeatPassForm.setAttribute("error", "true");
//         repeatPassForm.setAttribute("errorText", "Password must contain capital letter");
//     } else {
//         repeatPassForm.removeAttribute("errorText");
//         repeatPassForm.removeAttribute("error");
//         repeatPasswordResult = true;
//     }
//     if (userPassword !== userPasswordRepeat) { 
//         match = false;
//         passForm.setAttribute("error", "true");
//         passForm.setAttribute("errorText", "Passwords don't match");
       
//         repeatPassForm.setAttribute("error", "true");
//         repeatPassForm.setAttribute("errorText", "Passwords don't match");
//         console.log(userPassword, userPasswordRepeat);
//     }

//     // console.log("match:", match);
//     // console.log("pass", passwordResult);
//     // console.log("repeat", repeatPasswordResult);
//     return (match && passwordResult && repeatPasswordResult) 
// }

// function validate_name_and_surname() {
//     let nameInput = nameForm.value;
//     let surnameInput = surnameForm.value;
//     let nameResult = false;
//     let surnameResult = false;

//     if (!nameInput) {
//         nameForm.setAttribute("error", "true");
//         nameForm.setAttribute("errorText", "This field can't be empty");
//     } else if (nameInput.length > nameSurnMaxLength) {
//         nameForm.setAttribute("error", "true");
//         nameForm.setAttribute("errorText", `Name can't be longer than ${nameSurnMaxLength} characters`);
//     } else if (!(/^[a-z]+$/i.test(nameInput))) {
//         nameForm.setAttribute("error", "true");
//         nameForm.setAttribute("errorText", "Only latin letters are allowed");
//     } else {
//         nameForm.removeAttribute("errorText");
//         nameForm.removeAttribute("error");
//         nameResult = true;
//     }

//     if (!surnameInput) {
//         surnameForm.setAttribute("error", "true");
//         surnameForm.setAttribute("errorText", "This field can't be empty");
//     } else if (surnameInput.length > nameSurnMaxLength) {
//         surnameForm.setAttribute("error", "true");
//         surnameForm.setAttribute("errorText", `Surname can't be longer than ${nameSurnMaxLength} characters`);
//     } else if (!(/^[a-z]+$/i.test(surnameInput))) {
//         surnameForm.setAttribute("error", "true");
//         surnameForm.setAttribute("errorText", "Only latin letters are allowed");
//     } else {
//         surnameForm.removeAttribute("errorText");
//         surnameForm.removeAttribute("error");
//         surnameResult = true;
//     }
//     return (nameResult && surnameResult)
// }

