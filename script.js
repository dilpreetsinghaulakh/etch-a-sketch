const container = document.getElementById("container");

const defaultGridSize = 16;

var gridSize = defaultGridSize;

container.style.cssText = `
grid-template-columns: repeat(${gridSize}, 1fr);
grid-template-rows: repeat(${gridSize}, 1fr);`;

for (let i = 0; i < defaultGridSize ** 2; i++) {
  const div = document.createElement("div");
  div.className = "containerItem";
  div.style.height = `calc(75vh/${gridSize})`;
  container.appendChild(div);
}
const boxes = document.querySelectorAll('.containerItem');
container.addEventListener('mouseenter', function() {
  boxes.forEach(function(box) {
    box.style.outline = '0.5px solid #808080';
  });
})

container.addEventListener('mouseleave', function() {
  boxes.forEach(function(box) {
    box.style.outline = '0.5px solid #80808000'
  })
})

