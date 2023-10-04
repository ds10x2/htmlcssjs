var board;
var score = 0;
var rows = 4;
var columns = 4;

window.onload = function(){
    setGame();
}

function setGame(){
    // board = [
    //     [0, 0, 0, 0],
    //     [0, 0, 0, 0],
    //     [0, 0, 0, 0],
    //     [0, 0, 0, 0]
    // ]

    board = [
        [2, 2, 2, 2],
        [2, 2, 2, 2],
        [4, 4, 8, 8],
        [4, 4, 8, 8]
    ]

    for(let r = 0; r < rows; r++){
        for(let c = 0; c < columns; c++){
            //<div></div>
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString(); //해당 타일의 아이디는 좌표 번호(좌측 상단이 0-0)
            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById("board").append(tile);
        }
    }
}

function updateTile(tile, num){
    tile.innerText  = "";
    tile.classList.value = ""; //클래스 리스트를 초기화 
    tile.classList.add("tile");
    if(num > 0){ //타일에 해당하는 수가 0보다 클 때만 수를 표시함
        tile.innerText = num;
        if(num <= 4096){
            tile.classList.add("x"+num.toString());
        }else{
            tile.classList.add("x8192"); //8192 이상의 수는 백그라운드 색 고정하기 위함
        }
    }
}

document.addEventListener("keyup", (e) =>{
    if(e.code == "ArrowLeft"){
        slideLeft();
    }
    else if(e.code == "ArrowRight"){
        slideRight();
    }
    else if(e.code == "ArrowUp"){
        slideUp();
    }
    else if(e.code == "ArrowDown"){
        slideDown();
    }
})

function filterZero(row){
    return row.filter((num) => num != 0); //0을 제외하고 새로운 배열을 만들어서 return 
}

function slide(row){
    row = filterZero(row);
    
    for(let i = 0; i < row.length; i++){
        if(row[i] == row[i + 1]){
            row[i] *= 2;
            row[i + 1] = 0;
            score += row[i];
        }
    }

    row = filterZero(row);

    while(row.length < columns){
        row.push(0);
    }

    return row;
}

function slideLeft(){

    /*
    [0, 2, 2, 2]
    1. 0을 지운다. [2, 2, 2] 
    2. 더할 수 있는 수를 더한다 [4, 0, 2]
    3. 다시 0을 지운다. [4, 2]
    4. 빈 공간에 0을 채워 넣는다. [4, 2, 0, 0]
    
    */

    for(let r = 0; r < rows; r++){
        let row = board[r];
        row = slide(row);
        board[r] = row;

        for(let c = 0; c < columns; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);

        }
    }

}

function slideRight(){

    for(let r = 0; r < rows; r++){
        let row = board[r];
        row.reverse();
        row = slide(row);
        row.reverse();
        board[r] = row;

        for(let c = 0; c < columns; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);

        }
    }

}

function slideUp(){
    for(let c = 0; c < columns; c++){
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);

        for(let r = 0; r < rows; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideDown(){
    for(let c = 0; c < columns; c++){
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();

        for(let r = 0; r < rows; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}