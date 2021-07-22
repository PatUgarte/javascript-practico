/* Constants */
const PERIMETER_CALC = "perimeter";
const AREAS_CALC = "area";
const PI = Math.PI;
const RESULT_CALCS_OBJECT = { perimeter: "perímetro", area: "área" };
const RESULT_FIGURES_OBJECT = {
  circle: "círculo",
  square: "cuadrado",
  rectangle: "rectángulo",
  triangle: "triángulo",
};
const RESULT_UNITS_OBJECT = { perimeter: "cm", area: "cm²" };

/* Getting the DOM-Elements */
const figureForms = document.querySelectorAll(".figure-section__form");
const figureSelector = document.getElementById("figure-chooser__selector");
const figureMain = document.getElementById("main-figure-page");
/* Result Container */
const resultSection = document.getElementById("result-section");
const resultMessageEl = document.getElementById("result-section__message");
const resultValueContainer = document.getElementById("result-section__value");
const resultNumberEl = document.getElementById("result-section__value--number");
const resultUnitEl = document.getElementById("result-section__value--unit");
/* Footer Sign */
const footerSignContainer = document.getElementById("footer__sign-container");
const footerSign = document.getElementById("footer__sign");

/* Reseting values and states */
figureSelector.value = figureSelector[0].value;
resultSection.style.visibility = "hidden";
resultValueContainer.classList.add("hide-section");

/* Handle first selection */
const figureSelectionHandler = (figure) => {
  const visibleSection = document.getElementById(`${figure}-section`);
  const otherSections = document.querySelectorAll(".figure-section");
  resultValueContainer.classList.add("hide-section");
  otherSections.forEach((figureSection) => {
    figureSection.style.display = "none";
  });
  visibleSection.style.display = "inline-block";
  figureMain.style.display = "flex";
  figureForms.forEach((form) => {
    form.reset();
  });
  resultSection.style.visibility = "hidden";
};

figureSelector.addEventListener("change", ({ target }) =>
  figureSelectionHandler(target.value)
);

/* Calculation Functions */
/* Circle */
const calculateCirclePerimeter = ([radius]) => 2 * PI * radius;
const calculateCircleArea = ([radius]) => PI * Math.pow(radius, 2);
/* Square */
const calculateSquarePerimeter = ([side]) => side * 4;
const calculateSquareArea = ([side]) => Math.pow(side, 2);
/* Rectangle */
const calculateRectanglePerimeter = ([firstSide, secondSide]) =>
  firstSide * 2 + secondSide * 2;
const calculateRectangleArea = ([firstSide, secondSide]) =>
  firstSide * secondSide;
/* Triangle */
const calculateTrianglePerimeter = ([base, side]) => base + side * 2;
const calculateTriangleArea = ([base, side]) =>
  (base * Math.sqrt(Math.pow(side, 2) - Math.pow(side, 2) / 4)) / 2;

/* Calculation Object */
const calculationsObj = {
  perimeter: {
    circle: calculateCirclePerimeter,
    square: calculateSquarePerimeter,
    rectangle: calculateRectanglePerimeter,
    triangle: calculateTrianglePerimeter,
  },
  area: {
    circle: calculateCircleArea,
    square: calculateSquareArea,
    rectangle: calculateRectangleArea,
    triangle: calculateTriangleArea,
  },
};

/* Result Message */
const generateResultText = (calcType, figure) =>
  `El ${calcType} del ${figure} es de:`;

const setResutlElements = (message, value, unit) => {
  resultMessageEl.innerHTML = message;
  resultNumberEl.innerHTML = value;
  resultUnitEl.innerHTML = unit;
};

/* Calculations Handler */
const handleCalculations = (e) => {
  if (e.preventDefault) e.preventDefault();
  resultValueContainer.classList.remove("hide-section");
  const calc = e.explicitOriginalTarget.value;
  const formValues = Object.values(e.target);
  const figure = formValues.shift().value;
  const values = formValues.map((value) => value.valueAsNumber);

  const calcType = RESULT_CALCS_OBJECT[calc];
  const msgFigure = RESULT_FIGURES_OBJECT[figure];
  const resultMessage = generateResultText(calcType, msgFigure);
  const resultValue = calculationsObj[calc][figure](values).toFixed(2);
  const resultUnit = RESULT_UNITS_OBJECT[calc];

  setResutlElements(resultMessage, resultValue, resultUnit);
  resultSection.style.visibility = "visible";
  return false;
};

figureForms.forEach((form) =>
  form.addEventListener("submit", handleCalculations)
);

/* Sign Animation Handler */
let animationExecuted = false;

footerSignContainer.addEventListener("mouseover", () => {
  !animationExecuted && footerSign.classList.add("animate-typing");
  animationExecuted = true;
});

footerSignContainer.addEventListener("animationend", () => {
  footerSign.classList.remove("animate-typing");
  footerSign.style.width = "100%";
});

