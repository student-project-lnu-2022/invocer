import { returnAllFields } from './validation_utils.js'
export const host = "http://127.0.0.1:8000";

export function setErrorAttributesToFields(errorsObject) {
    let fieldIndex = 0;
    let fields = returnAllFields();
    for (let error in errorsObject) {
        if (errorsObject[error]) {
            fields[fieldIndex].setAttribute("error", "true");
            fields[fieldIndex].setAttribute("errorText", errorsObject[error]);
        }
        fieldIndex++;
    }
}

export function clearErrorAttributes(returnAllFieldsList) {
        for (let field of returnAllFieldsList) {
            field.addEventListener('input', () => {
                field.removeAttribute("error");
                field.removeAttribute("errorText");
            })
        }
}

export function setMaxFieldContainerHeights(returnAllFieldsList) {
    for (let field of returnAllFieldsList) {
        field.shadowRoot.querySelector('.md3-text-field__field').shadowRoot.querySelector('.md3-field').querySelector('.md3-field__container').style.maxHeight = "56px";
    }
}

export function removeAllErrorAttributes(returnAllFieldsList) {
    for (let item of returnAllFieldsList) {
        item.removeAttribute("error");
        item.removeAttribute("errorText");
    }
}

export function allAreFalse(object) {
    for (let key in object) {
        if (object[key]) {
            return false;
        }
    }
    return true;
}
