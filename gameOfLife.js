const rows = 10;
const columns = 10;
const seedQty = 20;

const createGrid = (rows, columns) => {
  const columnArray = [];
  for (let i = 0; i < rows; i++) {
    const rowArray = [];
    for (let j = 0; j < columns; j++) {
      rowArray.push('□ ');
    }
    columnArray.push(rowArray);
  }
  return columnArray;
};

const seedGrid = (qty, grid) => {
  const livingCell = '■ ';
  const emptyCells = []; // Store the indices of empty cells

  // Find all the indices of empty cells
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === '□ ') {
        emptyCells.push({row: i, column: j});
      }
    }
  }

  // Randomly change qty number of empty cells to living cells
  for (let i = 0; i < qty; i++) {
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const randomCell = emptyCells[randomIndex];
    grid[randomCell.row][randomCell.column] = livingCell;
    emptyCells.splice(randomIndex, 1);
  }

  return grid;
};

const printGrid = (grid) => {
  for (let i = 0; i < grid.length; i++) {
    console.log(grid[i].join(''));
  }
};

// Create a 10x10 empty square grid
const grid = createGrid(rows, columns);

// Randomly change 20 cells into filled squares
const filledGrid = seedGrid(seedQty, grid);

// Print the filled grid
printGrid(filledGrid);
