jQuery('.ui.dropdown')
    .dropdown();


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

