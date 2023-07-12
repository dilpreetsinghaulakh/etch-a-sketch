const container = document.getElementById("container");

const defaultGridSize = 32;

var gridSize = defaultGridSize;

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

container.style.cssText = `
grid-template-columns: repeat(${gridSize}, 1fr);
grid-template-rows: repeat(${gridSize}, 1fr);`;

createGrid(gridSize);

function createGrid(gridSize) {
  for (let i = 0; i < gridSize ** 2; i++) {
    const gridBox = document.createElement("div");
    gridBox.className = "containerItem";
    gridBox.style.height = `calc(75vh/${gridSize})`;
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

function changeColor(e) {
  if (e.type === "mouseover" && !mouseDown) return;
  e.target.style.backgroundColor = "#000";
}

const clearGrid = () => {
  container.innerHTML = "";
  createGrid(gridSize);
  // console.log('Clicked')
};
