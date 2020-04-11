const inputBinary = document.getElementById("binaryValue");
const inputResult = document.getElementById("decimalResult");
const html = document.querySelector("html");
const checkbox = document.getElementById("checkbox");

// change color mode
const getStyle = (element, style) =>
  window.getComputedStyle(element).getPropertyValue(style);

const initialColors = {
  bg: getStyle(html, "--bg"),
  bgPanel: getStyle(html, "--bg-panel"),
  bgCalculator: getStyle(html, "--bg-calculator"),
  inputText: getStyle(html, "--input-text"),
  colorText: getStyle(html, "--color-text"),
  inputFocus: getStyle(html, "--input-focus"),
};

const darkMode = {
  bg: "#333",
  bgPanel: "#222",
  bgCalculator: "#363636",
  inputText: "#fff",
  colorText: "#fff",
  inputFocus: "#fff",
};

const transformKey = (key) =>
  "--" + key.replace(/([A-Z])/, "-$1").toLowerCase();

const changeColors = (colors) => {
  Object.keys(colors).map((key) =>
    html.style.setProperty(transformKey(key), colors[key])
  );
};
checkbox.addEventListener("change", ({ target }) => {
  if (target.checked) {
    changeColors(darkMode);
    localStorage.setItem("checkbox", true);
  } else {
    changeColors(initialColors);
    localStorage.setItem("checkbox", false);
  }
});

if (localStorage.getItem("checkbox") === "true") {
  changeColors(darkMode);
  checkbox.setAttribute("checked", true);
} else {
  changeColors(initialColors);
}

// Converting the binary to decimal
function convertValue() {
  inputResult.value = "";

  let binaryDigit = inputBinary.value;
  let convertedBinary;

  if (
    isNotBinary(binaryDigit) > 0 ||
    binaryDigit.split("").length > 8 ||
    !binaryDigit
  ) {
    alert("Digite um número binário válido!");
    inputBinary.value = "";
    return;
  }

  convertedBinary = parseInt(binaryDigit, 2);

  inputResult.value = `${binaryDigit}² = ${convertedBinary}¹º`;
  inputBinary.value = "";
}

function isNotBinary(binaryValue) {
  let isNotBinary = 0;
  let binarySplitted = binaryValue.split("");
  binarySplitted.map((digit) =>
    digit === "0" || digit === "1" ? null : isNotBinary++
  );
  return isNotBinary;
}
