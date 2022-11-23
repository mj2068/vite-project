import "./style.css";
import axios from "axios";
import _ from "lodash";

const app = document.getElementById("app");
const container = document.getElementById("notification-container");
const button1 = document.getElementById("button1");

const data = [];
let index = 0;

button1.addEventListener("click", function (event) {
  // console.log("button1 click");
  // event.stopPropagation();
  let n = {};
  n.id = index++;
  n.number = Math.random();
  console.log(n);
  data.push(n);
});

document.addEventListener("DOMContentLoaded", function () {
  setInterval(() => {


    console.log("data.length: ", data.length);
    if (data.length > 0) {
      let noti = document.createElement("p");
      noti.classList.add("notification");
      // noti.style.width = "90%";
      // noti.style.height = "90%";
      noti.innerText = data.shift().number;

      container.appendChild(noti);

      const animationToBefore = noti.animate(
        { top: ["100%", "50%"], translate: ["0 0", "0 70%"] },
        { duration: 500, fill: "forwards" }
      );

      animationToBefore.onfinish = () => {
        setTimeout(() => {
          // enter to display animation
          noti.animate(
            { top: ["50%"], translate: ["0 -50%"] },
            { duration: 500, fill: "forwards" }
          ).onfinish = () => {
            setTimeout(() => {
              noti.animate(
                { top: ["50%"], translate: ["0 -170%"] },
                { duration: 500, fill: "forwards" }
              ).onfinish = () => {
                setTimeout(() => {
                  noti.remove();
                }, 1000);
              };
            }, 1000);
          };
        }, 1000);
      };
    }


  }, 1000);
});
