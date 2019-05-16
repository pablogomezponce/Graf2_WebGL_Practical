// vars for gameplay
var player; // player will vary between "x" and "o"
var board;  // 3x3 board of the game
var nextTurnAble; // in order to manage turns in main loop
var noTokenLeft; // boolean that indicates if the board is full

var gameover;   // when board is full

function gameVarsInit() {
    player = {
        'value' : "o", //the first player is 'x' (in the turn function, we'll always switch players)
        'col' : 1,    // player token's position (center of the board initially)
        'row' : 1,
        'moveToken' : function(goCol, goRow) { // goCol = 'x', goRow = 'y'
            this.col += (this.col + goCol < 0 || this.col + goCol > 2)? 0 : goCol;
            this.row += (this.row + goRow < 0 || this.row + goRow > 2)? 0 : goRow;
        }
    };
    board = [];     // board of the game, 3x3 matrix of '+', 'x' or 'o' ('+' = no token here)
    board[0] = ['+', '+', '+'];
    board[1] = ['+', '+', '+'];
    board[2] = ['+', '+', '+'];

    gameover = false;
}

function nextTurn() {
    player.value = (player.value == 'x')? 'o' : 'x';
    player.col = 1;
    player.row = 1;
}

function checkTokens() {
    console.log("Checking token: ("+player.col+","+player.row+");");
    
    if (board[player.row][player.col] != "+") {
        alert("There's already a token there! Pick other place.");
        return false;
    }
    else {
        board[player.row][player.col] = player.value;
    }
    return true;
}

function restartGame() {
    gameVarsInit();
    noTokenLeft = false;
    nextTurnAble = true;

}

function checkWinner() {
    // todo comprobar aqui el ganador de la partida.

}

function isBoardFull() {
    for (row = 0; row < board.length; row++) {
        for (col = 0; col < board[row].length; col++) {
            if (board[row][col] == '+') return false;
        }
    }
    return true;
}

function chivatoBoard() {
    console.log(board);
}
function chivatoToken() {
    console.log(player);
}
function chivatoFull() {
    chivatoToken();
    chivatoBoard();
}