import {makeVisibilityOff} from "./validation_utils.js";

let listElements = document.querySelectorAll('.dropdown_settings');
listElements.forEach(listElement => {
    const parentEl = listElement.parentNode;
    listElement.addEventListener('click', () => {
        if (parentEl.classList.contains('active')) {
            parentEl.classList.remove('active');
        } else {
            listElements.forEach(listE => {
                listE.classList.remove('active');
            })
            parentEl.classList.toggle('active');
        }
    })
});

let lowerCaseCheck = document.getElementById('lower');
let upperCaseCheck = document.getElementById('upper');
let digitCheck = document.getElementById('digit');
let lengthCheck = document.getElementById('length');

const input = document.getElementById('new_password_input_settings');
input.addEventListener('input', function() {
    const password = input.value;
    const lower = new RegExp('(?=.*[a-z])');
    const upper = new RegExp('(?=.*[A-Z])');
    const digit = new RegExp('(?=.*[0-9])');
    const length = new RegExp('^(?=.{8,15}$)');

    if (lower.test(password)) {
      lowerCaseCheck.classList.add('valid');
    } else {
      lowerCaseCheck.classList.remove('valid');
    }

    if (upper.test(password)) {
      upperCaseCheck.classList.add('valid');
    } else {
      upperCaseCheck.classList.remove('valid');
    }

    if (digit.test(password)) {
      digitCheck.classList.add('valid');
    } else {
      digitCheck.classList.remove('valid');
    }

    if (length.test(password)) {
      lengthCheck.classList.add('valid');
    } else {
      lengthCheck.classList.remove('valid');
    }
  });

const passwordInput = document.getElementById('new_password_input_settings');
const repeatPasswordInput = document.getElementById('repeat_new_password_input_settings');
const passwordVisibilityToggleButton = document.getElementById('new_password_visibility_toggle_button');
const repeatPasswordVisibilityToggleButton = document.getElementById('repeat_password_visibility_toggle_button');
makeVisibilityOff(passwordVisibilityToggleButton, passwordInput);
makeVisibilityOff(repeatPasswordVisibilityToggleButton, repeatPasswordInput);