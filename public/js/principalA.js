$(document).ready(function () {
    $(".action").on("click", function () {
      $(".menu").toggleClass("active");
    });
  });


let list = document.querySelectorAll(".navigation li");

function activeLink() {
  list.forEach((item) => {
    item.classList.remove("hovered");
  });
  this.classList.add("hovered");
}



