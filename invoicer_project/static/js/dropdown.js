jQuery('.ui.dropdown')
    .dropdown()
    ;


document.querySelector(".custom_dropdown").addEventListener("mouseover", () => {
    let dropdownText = document.querySelector(".ui.dropdown.error>.text");
    let dropdownArrow = document.querySelector(".ui.dropdown.error>.icon");

    if (dropdownText && dropdownArrow) {
        dropdownText.style.color = "rgb(73 69 79)";
        dropdownArrow.style.color = "rgb(73 69 79)";
    }

});

document.querySelector(".custom_dropdown").addEventListener("mouseout", () => {
    let dropdownText = document.querySelector(".ui.dropdown.error>.text");
    let dropdownArrow = document.querySelector(".ui.dropdown.error>.icon");
    if (dropdownText && dropdownArrow) {
        dropdownText.style.color = "#b3251e";
        dropdownArrow.style.color = "#b3251e";
    }

});

export function removeStylesFromDropdownElements() {
    let dropdownText = document.querySelector(".ui.dropdown>.text");
    let dropdownArrow = document.querySelector(".ui.dropdown>.icon");
    if (dropdownText && dropdownArrow) {
        document.querySelector(".ui.dropdown>.text").style.color = null;
        document.querySelector(".ui.dropdown>.icon").style.color = null;
    }
}

export function loadValuetoDropdown(dropdownElement, loadedValue, defaultText) {
    dropdownElement.value = loadedValue;
    const allDropdownchildren = dropdownElement.parentElement.children;
    const allMenuRows = allDropdownchildren[4].children;
    for (let row of allMenuRows) {
        if (row.dataset.value === loadedValue) {
            row.classList.add('active', 'selected');
            allDropdownchildren[0].setAttribute('value', loadedValue);
            allDropdownchildren[3].textContent = loadedValue;
            return;
        }
    }
    allDropdownchildren[0].classList.add('noselection');
    allDropdownchildren[2].textContent = defaultText;

}