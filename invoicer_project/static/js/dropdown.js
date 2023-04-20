jQuery('.ui.dropdown')
    .dropdown();


let dropdowns = document.querySelectorAll(".custom_dropdown");

dropdowns.forEach(dropdown => {
    dropdown.addEventListener("mouseover", () => {
        let dropdownText = dropdown.querySelector(".ui.dropdown.error>.text");
        let dropdownArrow = dropdown.querySelector(".ui.dropdown.error>.icon");

        if (dropdownText && dropdownArrow) {
            dropdownText.style.color = "rgb(73 69 79)";
            dropdownArrow.style.color = "rgb(73 69 79)";
        }
    })
});

document.querySelector(".custom_dropdown").addEventListener("mouseout", () => {
    let dropdownText = document.querySelector(".ui.dropdown.error>.text");
    let dropdownArrow = document.querySelector(".ui.dropdown.error>.icon");
    if (dropdownText && dropdownArrow) {
        dropdownText.style.color = "#b3251e";
        dropdownArrow.style.color = "#b3251e";
    }
});

export function removeStylesFromDropdownElement(element) {
    const parent = element.parentElement;
    parent.classList.remove('error');
    parent.querySelector('.text').style.color = null;
    parent.querySelector('.icon').style.color = null;
}
