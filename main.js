import axios from "axios";
import _ from "lodash";

const app = document.getElementById("app");
const container = document.getElementById("notification-container");
const button1 = document.getElementById("button1");

let data = [];
const processingData = [];
let index = 0;
let busyEnter = false;

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
      data.forEach((element) => {
        let notification = makeNotification(element);
        container.appendChild(notification);
        processingData.push(notification);
      });
      console.log(`${data.length} new data item(s)`);
      data = [];
    }
  }, 1000);

  // processing new data
  setInterval(() => {
    if (processingData.length > 0 && !busyEnter) {
      console.log(processingData.length);
      animateNotification(processingData.shift());
    }
  }, 100);
});

function animateNotification(notification) {
  busyEnter = true;
  let animation = notification.animate({ translate: ["0 0"] }, 1000);
  animation.addEventListener("finish", () => {
    notification.classList.remove("before-enter");
    notification.classList.add("display");
    setTimeout(() => {
      removeNotification(notification);
      busyEnter = false;
    }, 2000);
  });
}

function makeNotification(dataElement, type = "div") {
  let div = document.createElement(type);
  div.innerText = dataElement.number;
  div.classList.add(...["notification", "before-enter"]);
  return div;
}

function removeNotification(notification) {
  let removeAnimation = notification.animate({ translate: ["0 -120%"] }, 1000);
  removeAnimation.addEventListener("finish", () => {
    notification.remove();
  });
}
