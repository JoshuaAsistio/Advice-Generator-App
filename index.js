const adviceNumberElement = document.querySelector("#advice-number");
const adviceElement = document.querySelector("#advice");
const diceButton = document.querySelector("#give-random-advice");

document.addEventListener("DOMContentLoaded", () => generateRandomAdvice());

diceButton.addEventListener("click", () => {
  addContent("", 0);
  generateRandomAdvice();
});

const generateRandomAdvice = () => {
  fetch("https://api.adviceslip.com/advice")
    .then((res) => res.json())
    .then((data) => {
      addContent(data.slip.advice, data.slip.id);
    });
};

const addContent = (adviceElementContent, adviceNumberElementContent) => {
  adviceElement.textContent =
    adviceElementContent === ""
      ? "Please wait a moment..."
      : `"${adviceElementContent}"`;
  adviceNumberElement.innerHTML =
    adviceNumberElementContent === 0
      ? "Generating your advice"
      : `ADVICE #${adviceNumberElementContent}`;
};
