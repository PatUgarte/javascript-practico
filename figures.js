const figureChooser = document.getElementById("figure-chooser__selector");
const figureMain = document.getElementById("main-figure-page");

const figureChooserHandler = (figure) => {
    const visibleSection = document.getElementById(`${figure}-section`);
    const otherSections = document.querySelectorAll(".figure-section");
    otherSections.forEach((figureSection) => {
        figureSection.style.display = "none";
    });
    visibleSection.style.display = "inline-block";
    figureMain.style.display = "flex";
};

figureChooser.addEventListener("change", ({ target }) =>
    figureChooserHandler(target.value)
);
