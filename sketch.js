function make2DArray (cols, rows) {
  let arrayBase = new Array(cols);
  for (let i = 0; i < arrayBase.length; i++) {
    arrayBase[i] = new Array(rows);
  }
  return arrayBase;
}

let grid;
let cols;
let rows;
let res = 10;

function setup() {
  createCanvas(600, 400);
  cols = width / res;
  rows = height / res;
  
  fill(256);
  
  grid = make2DArray(cols, rows);
  
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = floor(random(2));
    }
  }
}

function mousePressed() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (mouseX > i * res && mouseX < (i + 1) * res && mouseY > j * res && mouseY < (j + 1) * res) {
            if (grid[i][j] === 0) {
            grid[i][j] = 1;
          } else {
            grid[i][j] = 0;
          }
      }
    }
  }
}


function draw() {
  background(255);
  
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (grid[i][j] === 0) {
        fill(255);
        stroke(0);
        rect(i * res, j * res, res - 1, res - 1);
      } else {
        fill(0);
        stroke(0);
        rect(i * res, j * res, res - 1, res - 1);
      }
      
    }
  }
  
  let newState = make2DArray(cols, rows);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let neighbours = countNeighbours(grid, i, j);
      
      if (grid[i][j] === 0 && neighbours === 3) {
        newState[i][j] = 1;
      } else if (grid[i][j] === 1 && (neighbours < 2 || neighbours > 3)) {
        newState[i][j] = 0;
      } else {
        newState[i][j] = grid[i][j];
      }
    }
  }
  grid = newState;
}


function countNeighbours(grid, x, y) {
  let neighbours = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (cols + x + i) % cols;
      let row = (rows + y + j) % rows;
      neighbours += grid[col][row];
    }
  }
  neighbours -= grid[x][y];
  return neighbours;
}
