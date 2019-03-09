let columns, rows, stop = false, maxCell, win = false;
let data, data1, stop1, done, iteration, test, works1, direction, newCurrentCell;
let works = [], failures = [], blockCells = [];

// works with all of these input:
data = [6, 10, 11, 2, 23, 37];
//data = [4, 9, 10, 2, 23, 26];
//data = [5, 9, 1, 2, 13, 26];
//data = [4, 10, 40, 1, 27];
//data = [5, 15, 75, 1, 58];

rows = data[0];
columns = data[1];
maxCell = [columns + 1, rows];
currentCell = ConvertToCell(data[2]);
cellArray = [currentCell];
blockCellsLength = data[3];
for(let n = 0; n < blockCellsLength; n ++) {
    blockCells.push(ConvertToCell(data[n + 4]));
}

direction = (currentCell[0] == 1) ? "R" : "L";
for (let l = 0; l < 6 && win == false; l ++) {
    if (LayAPiece(currentCell,direction) != false && win == false) {
        currentCell = LayAPiece(currentCell,direction);
        works.push("A");
        cellArray.push(currentCell);
    }
    win = TestWin(currentCell);
    if (LayBPiece(currentCell,direction) != false && win == false) {
        currentCell = LayBPiece(currentCell,direction);
        works.push("B");
        cellArray.push(currentCell);
    }
    win = TestWin(currentCell);
    if (LayCPiece(currentCell,direction) != false && win == false) {
        currentCell = LayCPiece(currentCell,direction);
        works.push("C");
        cellArray.push(currentCell);
    }
    win = TestWin(currentCell);
}

if (direction == "L") {
    works.reverse();
}

console.log(works);


function TestWin(currentCell) {
    if (currentCell[0] == columns + 1 || currentCell[0] == 0) {
        return true;
    } else {
        return false;
    }
}

function LayAPiece(currentCell,direction) {
    works1 = true;
    multiplier = (direction == "R") ? 1 : -1;
    for (let i = 0; i < blockCells.length; i ++) {
        if (EqualToArray(AddArray(currentCell,[1 * multiplier,0]),blockCells[i]) || EqualToArray(AddArray(currentCell,[2 * multiplier,0]), blockCells[i]) || EqualToArray(AddArray(currentCell,[3 * multiplier,0]),blockCells[i])) {
            works1 = false;
        }
    }
    newCurrentCell = AddArray(currentCell,[3 * multiplier,0]);
    if (works1 && LessThanArray(newCurrentCell,maxCell) && GreaterThanArray(newCurrentCell, [0,0])) {
        return newCurrentCell;
    } else {
        return false;
    }
}

function LayBPiece(currentCell,direction) {
    works1 = true;
    if (direction == "R") {
        for (let i = 0; i < blockCells.length; i ++) {
            if (EqualToArray(AddArray(currentCell,[0,1]),blockCells[i]) || EqualToArray(AddArray(currentCell,[1,1]), blockCells[i]) || EqualToArray(AddArray(currentCell,[2,1]),blockCells[i])) {
                works1 = false;
            }
        }
        newCurrentCell = AddArray(currentCell,[2 * multiplier,1 * multiplier]);
    } else {
        for (let i = 0; i < blockCells.length; i ++) {
            if (EqualToArray(AddArray(currentCell,[-1,0]),blockCells[i]) || EqualToArray(AddArray(currentCell,[-1,-1]), blockCells[i]) || EqualToArray(AddArray(currentCell,[2,1]),blockCells[i])) {
                works1 = false;
            }
        }
        newCurrentCell = AddArray(currentCell,[2 * multiplier,1 * multiplier]);
    }
    if (works1 && LessThanArray(newCurrentCell,maxCell) && GreaterThanArray(newCurrentCell, [0,0])) {
        return newCurrentCell;
    } else {
        return false;
    }
}

function LayCPiece(currentCell,direction) {
    works1 = true;
    if (direction == "R") {
        for (let i = 0; i < blockCells.length; i ++) {
            if (EqualToArray(AddArray(currentCell,[1,0]), blockCells[i]) || EqualToArray(AddArray(currentCell,[1,1]), blockCells[i]) || EqualToArray(AddArray(currentCell,[1,2]), blockCells[i]) || EqualToArray(AddArray(currentCell,[2,2]), blockCells[i])) {
                works1 = false;
            }
        }          
        newCurrentCell = AddArray(currentCell,[2 * multiplier,2 * multiplier]);
    } else {
        for (let i = 0; i < blockCells.length; i ++) {
            if (EqualToArray(AddArray(currentCell,[0,-1]), blockCells[i]) || EqualToArray(AddArray(currentCell,[0,-2]), blockCells[i]) || EqualToArray(AddArray(currentCell,[-1,-2]), blockCells[i]) || EqualToArray(AddArray(currentCell,[-2,-2]), blockCells[i])) {
                works1 = false;
            }
        }          
        newCurrentCell = AddArray(currentCell,[2 * multiplier,2 * multiplier]);
    } 
    if (works1 && LessThanArray(newCurrentCell,maxCell) && GreaterThanArray(newCurrentCell, [0,0])) {
        return newCurrentCell;
    } else {
        return false;
    }
}

function AddArray(array1, array2) {
    return [array1[0] + array2[0], array1[1] + array2[1]]
}

function LessThanArray(array1, array2) {
    if (array1[0] <= array2[0] && array1[1] <= array2[1]) {
        return true
    } else {
        return false
    }
}

function GreaterThanArray(array1, array2) {
    if (array1[0] >= array2[0] && array1[1] > array2[1]) {
        return true
    } else {
        return false
    }
}

function EqualToArray(array1, array2) {
    if (array1[0] == array2[0] && array1[1] == array2[1]) {
        return true;
    } else {
        return false;
    }
}

function ConvertToCell(cellNumber) {
    if (cellNumber - (columns * Math.floor(cellNumber/columns)) == 0) {
        return [columns, Math.ceil(cellNumber/columns)];
    } else {
        return [cellNumber - (columns * Math.floor(cellNumber/columns)), Math.ceil(cellNumber/columns)];
    }
}