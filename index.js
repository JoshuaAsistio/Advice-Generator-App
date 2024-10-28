const adviceNumberElement = document.querySelector("#advice-number");
const adviceElement = document.querySelector("#advice");
const diceButton = document.querySelector("#give-random-advice");

document.addEventListener("DOMContentLoaded", () => generateRandomAdvice());

diceButton.addEventListener("click", () => {
  addContent("", 0);
  generateRandomAdvice();
});

const generateRandomAdvice = () => {
  const timeoutId = setTimeout(() => {
    showError();
  }, 5000);

  fetch("https://api.adviceslip.com/advice")
    .then((res) => {
      if (!res.ok) {
        showError();
        clearTimeout(timeoutId); // Clear the timeout if there's an error
      }
      return res.json();
    })
    .then((data) => {
      addContent(data.slip.advice, data.slip.id);
      clearTimeout(timeoutId); // Clear the timeout if advice is successfully added
    })
    .catch((error) => {
      showError();
      clearTimeout(timeoutId); // Clear the timeout on catch
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

const showError = () => {
  adviceElement.textContent = '"Please try again..."';
  adviceNumberElement.innerHTML = "Failed to generate advise";
};
