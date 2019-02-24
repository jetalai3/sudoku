function findFirstEmpty(matrix){
  for(let i=0; i< matrix.length; i++){
    for(let j=0; j< matrix[i].length; j++){
      if(matrix[i][j]===0){
        return [i,j];
      }
    }
  }
}

function generateAvailableNumbers(size){
  let array = [];
  for(let i=0; i< size; i++){
    array.push(i+1);
  }
  return array;
}

function findPossibleNumbers(matrix, empty){
  let array=generateAvailableNumbers(matrix.length);
  let takenValues=[];
  const [row, column] = empty;
  let line=matrix[empty[0]];
  
  for(let i=0;i<line.length;i++){
    let cellValue=line[i];
    if(cellValue!==0){
      takenValues.push(cellValue); 
    }
  }

  for(let i=0; i<matrix.length; i++){
    let cellValue=matrix[i][column];
    if(cellValue!==0){
      takenValues.push(cellValue); 
    }
  }

  const squareSize = 3;
  const horizontalSquareStart = row - (row % squareSize);
  const verticalSquareStart = column - (column % squareSize);
  for(let i=horizontalSquareStart; i<horizontalSquareStart+ squareSize;i++){
    for(let j=verticalSquareStart; j<verticalSquareStart+squareSize; j++){
      let cellValue = matrix[i][j];
      if(cellValue!==0){
        takenValues.push(cellValue); 
      }
    }
  }

  let availableValues= array.filter(value => !takenValues.includes(value));
  return availableValues;
}

module.exports = function solveSudoku(matrix) {
  let empty = findFirstEmpty(matrix);
  if(!empty){
    return matrix;
  }
  let availableValues = findPossibleNumbers(matrix, empty);
  if(availableValues.length===0){
    return false;
  }
  for(let i=0;i<availableValues.length; i++){
    let clonedMatrix = JSON.parse(JSON.stringify(matrix));
    clonedMatrix[empty[0]][empty[1]]=availableValues[i];
    let result = solveSudoku(clonedMatrix);
    if(result){
      return result;
    }
  }

}
