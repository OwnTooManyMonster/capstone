let menuIcon = document.querySelector(".menuIcon");

let navButton = document.querySelectorAll(".navButton");

menuIcon.addEventListener("click", () => {
  menuIcon.classList.toggle("menuIcon");
  menuIcon.classList.toggle("menuIconToggle");
  setTimeout(function () {
    menuIcon.classList.toggle("menuIcon");
    menuIcon.classList.toggle("menuIconToggle");
  }, 7000);
});

// EventListener Burger Menu icons

// menuIcon.addEventListener("click", () => {
//   for (let i = 0; i < navButton.length; i++) {
//     navButton[i].classList.toggle("navButton");
//     navButton[i].classList.toggle("navButtonToggle");
//     setTimeout(function () {
//       navButton[i].classList.toggle("navButton");
//       navButton[i].classList.toggle("navButtonToggle");
//     }, 7000);
//   }
// });
//       menuIcon.addEventListener("click", () => {
//        navButton.length.forEach((Button,index) =>{
//         navButton[i].classList.toggle("navButton");
//         navButton[i].classList.toggle("navButtonToggle");
//         setTimeout(function () {
//           navButton[i].classList.toggle("navButton");
//           navButton[i].classList.toggle("navButtonToggle");
//         }, 7000);

// });

// Text change for text Animation in ContentBox

//       menuIcon.addEventListener("click", () => {
//        navButton.length.forEach((Button,index) =>{
//         navButton[i].classList.toggle("navButton");
//         navButton[i].classList.toggle("navButtonToggle");
//         setTimeout(function () {
//           navButton[i].classList.toggle("navButton");
//           navButton[i].classList.toggle("navButtonToggle");
//         }, 7000);

// });

// for each
// on click

menuIcon.addEventListener("click", () => {
  for (let i = 0; i < navButton.length; i++) {
    navButton[i].classList.toggle("navButton");
    navButton[i].classList.toggle("navButtonToggle");
    setTimeout(function () {
      navButton[i].classList.toggle("navButton");
      navButton[i].classList.toggle("navButtonToggle");
    }, 7000);
  }
});

// for (let i = 0; i < navButton.length; i++) {
//   navButton[i].addEventListener("touchstart", () => {
//     navButton[i].classList.toggle("navButtonToggle");
//   });
// }

// let contentBox = document.querySelectorAll(".contentBox");

// window.addEventListener("scroll", () => {
//   for (let i = 0; i < contentBox.length; i++) {
//     let rect = contentBox[i].getBoundingClientRect();
//     if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
//       console.log(rect);
//     }
//   }
// });
