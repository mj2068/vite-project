import "./style.css";
import javascriptLogo from "./javascript.svg";
import { setupCounter } from "./counter.js";
import { loremIpsum, LoremIpsum } from "lorem-ipsum";

document.querySelector("#app").innerHTML = `
  <div>

    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`;

setupCounter(document.querySelector("#counter"));

console.log(LoremIpsum);

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

console.log(lorem.generateWords());
const app = document.querySelector("#app");

for (let index = 1; index < 6; index++) {
  const node = document.createElement("p");
  node.innerHTML = lorem.generateWords();
  app.appendChild(node);
}

const node = document.createElement("p");
node.innerText = lorem.generateSentences(10);
app.appendChild(node);
