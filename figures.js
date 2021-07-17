const figureChooser = document.getElementById("figure-chooser");
const figureSelector = document.getElementById("figure-chooser__selector");
const figureMain = document.getElementById("main-figure-page");

const figureSelectionHandler = (figure) => {
    const visibleSection = document.getElementById(`${figure}-section`);
    const otherSections = document.querySelectorAll(".figure-section");
    otherSections.forEach((figureSection) => {
        figureSection.style.display = "none";
    });
    figureChooser.classList.remove("middle");
    visibleSection.style.display = "inline-block";
    figureMain.style.display = "flex";
};

figureSelector.addEventListener("change", ({ target }) =>
    figureSelectionHandler(target.value)
);
