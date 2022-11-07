import "./style.css";
import axios from "axios";
import color from "color";

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded");
});

const app = document.getElementById("app");
const container = document.getElementById("container");
const button1 = document.getElementById("button1");

const data = [];

const kfs = [{ rotate: "360deg", scale: 0, opacity: 0 }];
const timing = { easing: "cubic-bezier(1,-0.46,.82,0)", duration: 300 };

// document.querySelectorAll(".box1").forEach((element) => {
//   element.animate(kfs, timing);
// });

button1.addEventListener("click", function (event) {
  console.log("button1 click");
  // event.stopPropagation();
  axios
    .get("http://localhost")
    .then(function (response) {
      // console.log(response);
      if (200 === response.status) {
        let e = document.createElement("h1");
        e.innerHTML = response.data;
        container.appendChild(e);
        e.animate(
          { translate: ["0 150px", "0 0"] },
          { duration: 800, easing: "ease-in" }
        ).onfinish = () => {
          setTimeout(() => {
            e.animate({ translate: ["0 150px"] }, 800).onfinish = () =>
              e.remove();
          }, 1000);
        };
      }
    })
    .catch(function (error) {
      console.error(error);
    });
});

document.addEventListener("click", (event) => {
  // append only if it's the body element that's being clicked on
  if (event.target === app) {
    let div = document.createElement("div");
    div.className = "box1";
    div.style.position = "absolute";
    div.style.left = event.clientX - app.offsetLeft - 50 + "px";
    div.style.top = event.clientY - app.offsetTop - 50 + "px";
    app.append(div);
    div.animate({ scale: [0, 1] }, { duration: 100, easing: "ease-in" });
  } else if (event.target.classList.contains("box1")) {
    animateThenRemove(event.target);
  }
});

function animateThenRemove(e) {
  e.animate(kfs, timing).onfinish = () => e.remove();
}
