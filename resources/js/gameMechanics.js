// vars for gameplay
var player; // player will vary between "x" and "o"
var board;  // 3x3 board of the game
var nextTurnAble; // in order to manage turns in main loop
var noTokenLeft; // boolean that indicates if the board is full

var winner; // winner var (values = 'o' / 'x')
var gameover;   // when board is full

var audioPlayer;    // audio player -acceso al objeto del html-
var commandsIcon;   // imagen de commands del html
var audioIcon;    // audio icon -objeto del html, para cambiarlo cuando muteemos el audio y tal-
var isMusicPlaying; // boolean in order to manage music playing

function gameVarsInit() {
    player = {
        'value' : "o", //the first player is 'x' (in the turn function, we'll always switch players)
        'col' : 1,    // player token's position (center of the board initially)
        'row' : 1,
        'moveToken' : function(goCol, goRow) { // goCol = 'x', goRow = 'y'
            gameAssetLoader.deleteObject(turn);
            this.col += (this.col + goCol < 0 || this.col + goCol > 2)? 0 : goCol;
            this.row += (this.row + goRow < 0 || this.row + goRow > 2)? 0 : goRow;
        }
    };
    board = [];     // board of the game, 3x3 matrix of '+', 'x' or 'o' ('+' = no token here)
    board[0] = ['+', '+', '+'];
    board[1] = ['+', '+', '+'];
    board[2] = ['+', '+', '+'];
    winner = '+';
    
    audioPlayer = $("#music")[0];
    
    commandsIcon = document.createElement("img");
    commandsIcon.src = "../assets/img/commands.png";
    commandsIcon.style = "height:50%;position:absolute;left:25px;top:50px;";
    document.body.appendChild(commandsIcon);

    audioIcon = document.createElement("img");
    audioIcon.src = "../assets/img/audio_init.png";
    audioIcon.style = "height:15%;position:absolute;right:25px;bottom:50px;";
    document.body.appendChild(audioIcon);

    isMusicPlaying = false;
    gameover = false;

}

function nextTurn() {
    player.value = (player.value == 'x')? 'o' : 'x';
    player.col = 1;
    player.row = 1;

    if(board[player.row][player.col] == '+'){
        gameAssetLoader.loadObject(player.col, player.row,player.value,turn);
    } else {
        gameAssetLoader.loadObject(player.col, player.row,"busy",turn);
    }
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

function isBoardFull() {
    for (row = 0; row < board.length; row++) {
        for (col = 0; col < board[row].length; col++) {
            if (board[row][col] == '+') return false;
        }
    }
    return true;
}

function checkWinner() {
    x = 'x,x,x';
    o = 'o,o,o';

    if (winner == '+') {
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
        if (winner == '+') {
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

            if (winner == '+') {
                // for last, we check for diagonal stripes - - - - - - - - - - - - - - - - - - - - - - - -
                opt1 = [board[0][0], board[1][1], board[2][2]].toString();
                opt2 = [board[0][2], board[1][1], board[2][0]].toString();
                if (x == opt1 || x == opt2) {
                    winner = 'x';
                } else if (o == opt1 || o == opt2) {
                    winner = 'o';
                }
            }
        }
    }
}


function chivatoBoard() {

}

function chivatoToken() {

}

function chivatoFull() {
    chivatoToken();
    chivatoBoard();
}
