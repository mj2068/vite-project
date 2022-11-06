import "./style.css";
import axios from "axios";
import color from "color";

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded");
});

const container = document.getElementById("container");
const button1 = document.getElementById("button1");

const data = [];

const kfs = [{}, { opacity: 0 }];
const timing = { duration: 1000 };

// document.querySelectorAll(".box1").forEach((element) => {
//   element.animate(kfs, timing);
// });

button1.addEventListener("click", function (event) {
  console.log("button1 click");
  // event.stopPropagation();
  axios
    .get("http://localhost")
    .then(function (response) {
      console.log(response);
      if (200 === response.status) {
        let e = document.createElement("h1");
        e.innerHTML = response.data;
        container.appendChild(e);
        setTimeout(() => {
          container.removeChild(e);
        }, 3000);
      }
    })
    .catch(function (error) {
      console.error(error);
    });
});

document.addEventListener("click", (event) => {
  // append only if it's the body element that's being clicked on
  if (event.target === document.body) {
    let div = document.createElement("div");
    div.className = "box1";
    div.style.cssText = `position: absolute; top: ${
      event.clientY - container.offsetTop - 50
    }px; left: ${event.clientX - container.offsetLeft - 50}px`;
    container.append(div);
  } else if (event.target.classList.contains("box1")) {
    animatedRemove(event.target);
  }
});

function animatedRemove(elmt) {
  elmt.animate(kfs, 500).onfinish = () => elmt.remove();
}
