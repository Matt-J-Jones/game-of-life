const rows = 10;
const columns = 10;
const seedQty = 35;
const ticks = 5;

const createGrid = (rows, columns) => {
  const columnArray = [];
  for (let i = 0; i < rows; i++) {
    const rowArray = [];
    for (let j = 0; j < columns; j++) {
      rowArray.push(0);
    }
    columnArray.push(rowArray);
  }
  return columnArray;
};

const seedGrid = (qty, grid) => {
  const livingCell = 1;
  const emptyCells = [];

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === 0) {
        emptyCells.push({row: i, column: j});
      }
    }
  }

  for (let i = 0; i < qty; i++) {
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const randomCell = emptyCells[randomIndex];
    grid[randomCell.row][randomCell.column] = livingCell;
    emptyCells.splice(randomIndex, 1);
  }

  return grid;
};

const updateGrid = (grid) => {
  const newGrid = [];

  for (let i = 0; i < grid.length; i++) {
    const newRow = [];
    for (let j = 0; j < grid[i].length; j++) {
      const neighbors = countNeighbors(grid, i, j);
      // Apply the rules of the game to update the cell
      // If neighbors > 3 or neighbors < 2,
      // the cell dies (set to 0)
      // If neighbors === 3, the cell becomes alive (set to 1)
      // Otherwise, the cell remains the same
      const newValue = (neighbors > 3 || neighbors < 2) ? 0 :
      (neighbors === 3 ? 1 : grid[i][j]);
      newRow.push(newValue);
    }
    newGrid.push(newRow);
  }

  return newGrid;
};

const countNeighbors = (grid, x, y) => {
  const rows = grid.length;
  const columns = grid[0].length;
  let count = 0;

  if (x + 1 < columns && grid[y][x + 1] === 1) {
    count += 1;
  }

  if (x - 1 >= 0 && grid[y][x - 1] === 1) {
    count += 1;
  }

  if (y + 1 < rows && grid[y + 1][x] === 1) {
    count += 1;
  }

  if (y - 1 >= 0 && grid[y - 1][x] === 1) {
    count += 1;
  }

  return count;
};


const printGrid = (grid) => {
  for (let i = 0; i < grid.length; i++) {
    let row = '';
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === 0) {
        row += '□ ';
      } else if (grid[i][j] === 1) {
        row += '■ ';
      }
    }
    console.log(row);
  }
};

const grid = createGrid(rows, columns);
const filledGrid = seedGrid(seedQty, grid);
console.log('-------------------');
console.log(`Staring Board`);
console.log('-------------------');
printGrid(filledGrid);
let newGrid = updateGrid(filledGrid);

for (let i = 0; i < ticks; i++) {
  console.log('-------------------');
  console.log(`Tick: ${i+1}`);
  console.log('-------------------');
  printGrid(newGrid);
  newGrid = updateGrid(newGrid);
}

console.log('-------------------');
