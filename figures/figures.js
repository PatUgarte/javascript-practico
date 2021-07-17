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
const figureChooser = document.getElementById("figure-chooser");
const figureSelector = document.getElementById("figure-chooser__selector");
const figureMain = document.getElementById("main-figure-page");
/* Figure-forms */
const circleForm = document.getElementById("circle-section__form");
const squareForm = document.getElementById("circle-section__form");
const rectangleForm = document.getElementById("circle-section__form");
const triangleForm = document.getElementById("circle-section__form");
/* Result container */
const resultSection = document.getElementById("result-section");
const resultMessageEl = document.getElementById("result-section__message");
const resultNumberEl = document.getElementById("result-section__value--number");
const resultUnitEl = document.getElementById("result-section__value--unit");

/* Reseting values and states */
figureSelector.value = figureSelector[0].value;
figureForms.forEach((form) => {
  form.reset();
});
resultSection.style.display = "none";

/* Handle first selection */
const figureSelectionHandler = (figure) => {
  const visibleSection = document.getElementById(`${figure}-section`);
  const otherSections = document.querySelectorAll(".figure-section");
  otherSections.forEach((figureSection) => {
    figureSection.style.display = "none";
  });
  figureChooser.classList.remove("middle");
  visibleSection.style.display = "inline-block";
  figureMain.style.display = "flex";
  resultSection.style.display = "none";
};

figureSelector.addEventListener("change", ({ target }) =>
  figureSelectionHandler(target.value)
);

/* Result Message */
let resultMessage;
let resultNumber;
let resultUnit;
const generateResultText = (calcType, figure) =>
  `El ${calcType} del ${figure} es de:`;

/* Handle calculations */
const calculateCirclePerimeter = (radius) => {
  return (2 * PI * radius).toFixed(2);
};

const calculateCircleArea = (radius) => {
  return (PI * radius * radius).toFixed(2);
};

const setResutlElements = () => {
    resultMessageEl.innerHTML = resultMessage;
    resultNumberEl.innerHTML = resultNumber;
    resultUnitEl.innerHTML = resultUnit;
}

const handleCircleCalculation = (e) => {
  if (e.preventDefault) e.preventDefault();
  const calc = e.explicitOriginalTarget.value;
  const figure = e.target[0].value;
  const radius = e.target[1].valueAsNumber;
  const calcType = RESULT_CALCS_OBJECT[calc];
  resultUnit = RESULT_UNITS_OBJECT[calc];
  resultMessage = generateResultText(calcType, RESULT_FIGURES_OBJECT[figure]);

  if (calc === PERIMETER_CALC) {
    resultNumber = calculateCirclePerimeter(radius);
  } else {
    resultNumber = calculateCircleArea(radius);
  }
  setResutlElements();
  resultSection.style.display = "flex";
  return false;
};

circleForm.addEventListener("submit", handleCircleCalculation);
