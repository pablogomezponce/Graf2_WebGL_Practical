// vars for gameplay
var player; // player will vary between "x" and "o"
var board;  // 3x3 board of the game
var nextTurnAble; // in order to manage turns in main loop
var noTokenLeft; // boolean that indicates if the board is full

var winner; // winner var (values = 'o' / 'x')
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

function isWinner() {
    x = 'x,x,x';
    o = 'o,o,o';

    // we check horizontal stripes - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    for (h = 0; h < board.length; h++) {
        if (board[h].toString() == x) {
            winner = 'x';
            break;
        }
        else if (board[h].toString() == o) {
            winner = 'o';
            break;
        }
    }

    // we check if either we already have a winner or we gotta check the vertical stripes - - - -
    if (winner != undefined) {
        return true;
    } else {
        for (v = 0; v < board[0].length; v++) {
            if ([board[0][v], board[1][v], board[2][v]].toString() == x) {
                winner = 'x';
                break;
            }
            else if ([board[0][v], board[1][v], board[2][v]].toString() == o) {
                winner = 'o';
                break;
            }
        }
    }

    // for last, we check for diagonal stripes - - - - - - - - - - - - - - - - - - - - - - - - - -
    if (winner != undefined) {
        return true;
    } else {
        opt1 = [board[0][0], board[1][1], board[2][2]].toString();
        opt2 = [board[0][2], board[1][1], board[2][0]].toString();
        if (x == opt1 || x == opt2) {
            winner = 'x';
        } else if (o == opt1 || o == opt2) {
            winner = 'o';
        }

        if (winner != undefined) return true;
    }

    return false;
}

function chivatoBoard() {
}
function chivatoToken() {
}
function chivatoFull() {
    chivatoToken();
    chivatoBoard();
}