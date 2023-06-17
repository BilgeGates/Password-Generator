const lengthSlider = document.querySelector(".head_length input");
const options = document.querySelectorAll(".option input");
const passwordResult = document.querySelector(".result input");
const copyIcon = document.querySelector(".result button");
const generateBtn = document.querySelector(".btn-large");
const lowercaseCheckbox = document.querySelector("#lowercase");

const characters = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  number: "0123456789",
  symbol: "^!$%&|[](){}:;.,*+=#@<>~",
};

let previousSliderValue = lengthSlider.value;

const generatePassword = () => {
  let staticPassword = "";
  let randomPassword = "";
  let exclude = false;
  let headLength = previousSliderValue;

  options.forEach((option) => {
    if (option.checked) {
      if (option.id !== "exclude" && option.id !== "include") {
        staticPassword += characters[option.id];
      } else if (option.id === "include") {
        staticPassword += ` ${staticPassword} `;
      } else {
        exclude = true;
      }
    }
  });

  for (let i = 0; i < headLength; i++) {
    let randomChar =
      staticPassword[Math.floor(Math.random() * staticPassword.length)];
    if (exclude) {
      !randomPassword.includes(randomChar) || randomChar === " "
        ? (randomPassword += randomChar)
        : i--;
    } else {
      randomPassword += randomChar;
    }
  }
  passwordResult.value = randomPassword;
};

const updateSlider = () => {
  document.querySelector(".head_length span").innerHTML = lengthSlider.value;
  previousSliderValue = lengthSlider.value;
};

updateSlider();

const copyPassword = () => {
  if (passwordResult.value !== "") {
    navigator.clipboard.writeText(passwordResult.value);
    const errorDiv = document.querySelector(".error");
    errorDiv.style.display = "block";
    errorDiv.textContent = "Password copied!";
    errorDiv.style.background = "";
    copyIcon.innerHTML = '<i class="fas fa-check"></i>';

    setTimeout(() => {
      errorDiv.style.display = "none";
      copyIcon.innerHTML = '<i class="far fa-clipboard"></i>';
    }, 2000);
  } else {
    const errorDiv = document.querySelector(".error");
    errorDiv.textContent = "No password to copy!";
    errorDiv.style.display = "block";
    errorDiv.style.background = "red";
    setTimeout(() => {
      errorDiv.style.display = "none";
    }, 2000);
  }
};

lowercaseCheckbox.addEventListener("click", () => {
  if (!lowercaseCheckbox.checked) {
    const alertMessage = document.createElement("div");
    alertMessage.classList.add("alert-message");
    alertMessage.textContent = "Lowercase option cannot be unchecked!";

    document.body.appendChild(alertMessage);

    lowercaseCheckbox.checked = true;

    setTimeout(() => {
      alertMessage.remove();
    }, 2000);
  }
});

copyIcon.addEventListener("click", copyPassword);
lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);
