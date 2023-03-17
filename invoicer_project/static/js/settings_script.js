let listElements = document.querySelectorAll('.dropdown');
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