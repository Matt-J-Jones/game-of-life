const rows = 5;
const columns = 5;

for (let i = 0; i < rows; i++) {
  let row = '';
  for (let j = 0; j < columns; j++) {
    row += '□ ';
  }
  console.log(row);
}
