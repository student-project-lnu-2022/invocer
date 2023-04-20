// var coll = document.getElementsByClassName("collapsible");
// var i;

// for (i = 0; i < coll.length; i++) {
//   coll[i].addEventListener("click", function () {
//     this.classList.toggle("active");
//     var content = this.nextElementSibling;
//     if (content.style.display === "block") {
//       content.style.display = "none";
//     } else {
//       content.style.display = "block";
//     }
//   });
// }


let listElements = document.querySelectorAll('.link');

listElements.forEach(listElement => {
    listElement.addEventListener('click', () => {
        if (listElement.classList.contains('active')) {
            listElement.classList.remove('active');
        } else {
            listElements.forEach(listE => {
                listE.classList.remove('active');
            })
            listElement.classList.toggle('active');
        }
    })
});