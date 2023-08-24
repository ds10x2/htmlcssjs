document.addEventListener('DOMContentLoaded', function () {
    const gridSize = 9;
    const solveButton= document.getElementById("solve-btn");
    solveButton.addEventListener('click', solveSudoku);

    const sudokuGrid = document.getElementById("sudoku-grid");
    //스도쿠 그리드를 생성하고 cell을 넣음
    for(let row = 0; row < gridSize; row++){
        const newRow = document.createElement("tr");
        for(let col = 0; col < gridSize; col++){
            const cell = document.createElement("td");
            const input = document.createElement("input");
            input.type = "number";
            input.className = "cell";
            input.id = `cell-${row}-${col}`;
            cell.appendChild(input);
            newRow.appendChild(cell);
        }
        sudokuGrid.appendChild(newRow);
    }
});


async function solveSudoku(){
    const gridSize = 9;
    const sudokuArray = [];

    //스도쿠 배열에 그리드에서 받은 인풋값을 넣음
    for(let row = 0; row < gridSize; row++){
        sudokuArray[row] = [];
        for(let col = 0; col < gridSize; col++){
            const cellId = `cell-${row}-${col}`;
            const cellValue = document.getElementById(cellId).value;
            sudokuArray[row][col] = cellValue !== "" ? parseInt(cellValue) : 0;
        }
    }

    //사용자가 값을 넣는 셀을 지정하고 표시함
    for(let row = 0; row < gridSize; row++){
        for(let col = 0; col < gridSize; col++){
            const cellId = `cell-${row}-${col}`;
            const cell = document.getElementById(cellId);

            if(sudokuArray[row][col] !== 0){
                cell.classList.add("user-input");
            }
        }
    }


    //스도쿠를 해결하고 해답을 보여줌
    if(solveSudokuHelper(sudokuArray)){
        for(let row = 0; row < gridSize; row++){
            for(let col = 0; col < gridSize; col++){
                const cellId = `cell-${row}-${col}`;
                const cell = document.getElementById(cellId);

                //해결됨 값들을 채워넣고 애니메이션을 등록
                if(!cell.classList.contains("user-input")){
                    cell.value = sudokuArray[row][col];
                    cell.classList.add("solved");
                    await sleep(20); //시각화에 딜레이를 넣음
                }
            }
        }
    }else{
        alert("No solution exists for the given Sudoku puzzle.");
    }
}

function solveSudokuHelper(board){
    const gridSize = 9;
    for(let row = 0; row < gridSize; row++){
        for(let col = 0; col < gridSize; col++){
            if(board[row][col] === 0){
                for(let num = 1; num <= 9; num++){
                    if(isValidMove(board, row, col, num)){
                        board[row][col] = num;

                        if(solveSudokuHelper(board)){
                            return true; //퍼즐이 해결됐을 때
                        }

                        board[row][col] = 0; //백트레킹
                    }
                }
                return false; //답이 없는 경우
            }
        }
    }
    return true; //모든 칸이 채워짐
}

function isValidMove(board, row, col, num){
    const gridSize = 9;

    //중복된 값이 있는지 확인
    for(let i = 0; i < gridSize; i++){
        if(board[row][i] === num || board[i][col] === num){
            return false;
        }
    }
    
    //3*3 검사
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;

    for(let i = startRow; i < startRow + 3; i++){
        for(let j = startCol; j < startCol + 3; j++){
            if(board[i][j] === num){
                return false;
            }
        }
    }
    return true; //중복된 값이 없음
}


function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}