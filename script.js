const container = document.getElementById("container");
const fgColorInput = document.getElementById("fgColorInput");
const bgColorInput = document.getElementById("bgColorInput");
const randomColorToggle = document.getElementById("randomColorToggle");
const eraserToggle = document.getElementById("eraserToggle");
const gridSlider = document.getElementById("gridSlider");
const sliderLabel = document.getElementById("sliderLabel");

var gridSize = 24;

sliderLabel.textContent = "24";

gridSlider.addEventListener("change", function () {
  gridSize = this.value;
  sliderLabel.textContent = gridSize;
  clearGrid();
});

let mouseDown = false;
document.body.onmousedown = () => {mouseDown = true};
document.body.onmouseup = () => {mouseDown = false};

var bgColor = "#ffffff";
console.log(bgColor);
bgColorInput.addEventListener("input", (event) => {
  bgColor = event.target.value;
  clearGrid();
});

var eraserEnable = false;
eraserToggle.addEventListener("click", () => {
  eraserToggle.classList.toggle("eraserActive");
  eraserEnable == false ? (eraserEnable = true) : (eraserEnable = false);
});

var randomizeColor = false;
randomColorToggle.addEventListener("click", function () {
  randomColorToggle.classList.toggle("randomColorActive");
  if (randomizeColor == false) randomizeColor = true;
  else randomizeColor = false;
});

function randomColor() {
  var color = `#${Math.floor(Math.random() * 16581376).toString(16)}`;
  return color;
}

var stableColor = "#000000";
fgColorInput.addEventListener("input", (event) => {
  stableColor = event.target.value;
});

const fgColor = () => {
  var returnColor = "";
  if (eraserEnable) returnColor = bgColor;
  else if (randomizeColor) returnColor = randomColor();
  else returnColor = stableColor;
  return returnColor;
};

function changeColor(e) {
  if (e.type === "mouseover" && !mouseDown) return;
  e.target.style.backgroundColor = fgColor();
}

createGrid(gridSize);

function createGrid(size) {
  container.style.cssText = `
  grid-template-columns: repeat(${gridSize}, 1fr); 
  grid-template-rows: repeat(${gridSize}, 1fr);`;
  for (let i = 0; i < size ** 2; i++) {
    const gridBox = document.createElement("div");
    gridBox.style.backgroundColor = bgColor;
    gridBox.className = "containerItem";
    gridBox.style.height = `calc(75vh/${size})`;
    gridBox.addEventListener("mousedown", changeColor);
    gridBox.addEventListener("mouseover", changeColor);
    container.appendChild(gridBox);

    // Need to find a better way of doing this. (on hover outline) START-->

    container.addEventListener("mouseenter", function () {
      gridBox.style.outlineColor = "#808080";
    });
    container.addEventListener("mouseleave", function () {
      gridBox.style.outlineColor = "#00000000";
    });

    // <--END
  }
}

const clearGrid = () => {
  container.innerHTML = "";
  createGrid(gridSize);
};
