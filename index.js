/*let divBackground = document.createElement("div");
divBackground.classList.add("divBackground");
mainArea.append(divBackground);

let backgroundVideo = document.createElement("video");
backgroundVideo.classList.add("backgroundVideo");
backgroundVideo.autoplay = true;
backgroundVideo.loop = true;
backgroundVideo.muted = true;
divBackground.append(backgroundVideo);

let videoSource = document.createElement("source");
videoSource.src = "./src/video/jellyindex.part";
videoSource.type = "video/mp4";
backgroundVideo.append(videoSource); 

let contentDiv = document.createElement("div");
contentDiv.classList.add("contentDiv");
mainArea.append(contentDiv);

let contentBox = document.createElement("div");
contentBox.classList.add("contentBox");
contentDiv.append(contentBox);

let paraBox = document.createElement("p");
paraBox.classList.add("paraBox");
paraBox.innerHTML = "Alles ist aus dem Wasser entsprungen<br/>";
paraBox.innerHTML += "Alles wird durch das Wasser erhalten<br/>";
paraBox.innerHTML += "Ozean, gönn uns dein ewiges Walten<br/>";
paraBox.innerHTML += "<br/>";
paraBox.innerHTML += "Johann Wolfgang von Goethe<br/>";
contentBox.append(paraBox);

let contentBox2 = document.createElement("div");
contentBox2.classList.add("contentBox2");
contentDiv.append(contentBox2);

let contentBox3 = document.createElement("div");
contentBox3.classList.add("contentBox3");
contentDiv.append(contentBox3);

let contentBox4 = document.createElement("div");
contentBox4.classList.add("contentBox4");
contentDiv.append(contentBox4); */

//on click event for

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

for (let i = 0; i < navButton.length; i++) {
  menuIcon.addEventListener("click", () => {
    navButton[i].classList.toggle("navButton");
    navButton[i].classList.toggle("navButtonToggle");
    setTimeout(function () {
      navButton[i].classList.toggle("navButton");
      navButton[i].classList.toggle("navButtonToggle");
    }, 7000);
  });
}

for (let i = 0; i < navButton.length; i++) {
  navButton[i].addEventListener("touchstart", () => {
    navButton[i].classList.toggle("navButtonToggle");
  });
}

let contentBox = document.querySelectorAll(".contentBox");

window.addEventListener("scroll", () => {
for (let i = 0; i < contentBox.length; i++) {
      let rect = contentBox[i].getBoundingClientRect();
    if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
      console.log(rect);
    }
  };
}

// let contentBox = document.querySelectorAll(".contentBox");

// for (let i = 0; i < contentBox.length; i++) {
//   let rect = contentBox[i].getBoundingClientRect();
//   console.log(rect);
// }

// let observer = new IntersectionObserver(
//   function (entries) {
//     if (entries[0].isIntersecting === true)
//       console.log("Element is fully visible in screen");
//   },
//   { threshold: [1] }
// );

// observer.observe(document.querySelector("contentBox"));

// let options = {
//   root: document.querySelector("contentDiv"),
//   rootMargin: "0px",
//   threshold: 1.0,
// };

// let observer = new IntersectionObserver(callback, options);

// let target = document.querySelector("contentBox");
// observer.observe(target);

// let callback = (entries, observer) => {
//   entries.forEach((entry) => {
//     // Each entry describes an intersection change for one observed
//     // target element:
//     //   entry.boundingClientRect
//     //   entry.intersectionRatio
//     //   entry.intersectionRect
//     //   entry.isIntersecting
//     //   entry.rootBounds
//     //   entry.target
//     //   entry.time
//   });
// 
