import axios from "axios";
import _ from "lodash";

const app = document.getElementById("app");
const container = document.getElementById("notification-container");
const button1 = document.getElementById("button1");

let data = [];
const processingData = [];
let index = 0;
let busy = false;

// this button is only for push one new random number to the data array
button1.addEventListener("click", function (event) {
  // console.log("button1 click");
  // event.stopPropagation();
  let n = {};
  n.id = index++;
  n.number = Math.random();
  console.log(n);
  data.push(n);
});

// this event listener is only responsible for check the data array
document.addEventListener("DOMContentLoaded", function () {
  // data acquiring
  setInterval(() => {
    if (data.length > 0) {
      data.forEach((element) => processingData.push(element));
      console.log("data pushed");
      data = [];
    }
  }, 1000);

  // processing new data
  setInterval(() => {
    if (processingData.length > 0 && !busy) {
      console.log(processingData.length)
      busy = true;
      animateNotification(processingData.shift());
    }
  }, 100);
});

function animateNotification(dataElement) {
  let htmlElement = makeHTML(dataElement);
  container.appendChild(htmlElement);
  let animation = htmlElement.animate({ translate: ["0 -100%"] }, 1000);
  animation.addEventListener("finish", (e) => {
    e.target.effect.target.remove();
    busy = false;
  });
}

function makeHTML(dataElement, type = "div") {
  let div = document.createElement(type);
  div.innerText = dataElement.number;
  div.classList.add("notification");
  return div;
}
