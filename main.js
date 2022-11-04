import "./style.css";
import axios from "axios";
import color from "color";

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded");
});

const container = document.getElementById("container");

const button1 = document.getElementById("button1");


button1.addEventListener("click", function () {
  axios
    .get("http://localhost")
    .then(function (response) {
      console.log(response);
      if (200 === response.status) {
        let e = document.createElement("h1");
        e.innerHTML = response.data;
        container.appendChild(e);
      }
    })
    .catch(function (error) {
      console.error(error);
    });
});
