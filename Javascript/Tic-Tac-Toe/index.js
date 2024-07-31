function Cell() {
    let value = 0;

    const addToken = (player) => {
        value = player;
    };

    const getValue = () => value;

    return {
        addToken,
        getValue
    };
}

function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    const placeToken = (row, column, player) => {
        if (board[row][column].getValue() === 0) {
            board[row][column].addToken(player);
            return true;
        }
        return false;
    };

    const filled = () => {
        fill = false;
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                if (board[i][j].getValue() === 0) {
                    return false;
                }
            }
        }
        return true;
    }

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithCellValues);
    };

    const checkWin = (player) => {
        const winPatterns = [
            // Rows (these represent coordinate values)
            [[0, 0], [0, 1], [0, 2]],
            [[1, 0], [1, 1], [1, 2]],
            [[2, 0], [2, 1], [2, 2]],
            // Columns
            [[0, 0], [1, 0], [2, 0]],
            [[0, 1], [1, 1], [2, 1]],
            [[0, 2], [1, 2], [2, 2]],
            // Diagonals
            [[0, 0], [1, 1], [2, 2]],
            [[0, 2], [1, 1], [2, 0]],
        ];

        return winPatterns.some(pattern =>
            pattern.every(([r, c]) => board[r][c].getValue() === player)
        );
    }

    return { getBoard, placeToken, printBoard, checkWin, filled };
}

function GameController(
    playerOneName = "Player One",
    playerTwoName = "Player Two"
) {
    const board = Gameboard();

    const players = [
        {
            name: playerOneName,
            token: 1
        },
        {
            name: playerTwoName,
            token: 2
        }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };
    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    };

    const playRound = (row, column) => {
        console.log(
            `Place ${getActivePlayer().name}'s token into row ${row}, column ${column}...`
        );

        if (board.placeToken(row, column, getActivePlayer().token)) {
            if (board.checkWin(activePlayer.token)) {
                board.printBoard();
                console.log(`${getActivePlayer().name} wins!`);
                return `${getActivePlayer().name} wins!`;
            }
            else if (board.filled()) {
                console.log("It's a tie! Press Restart to play again!");
                return `It's a tie! Press Restart to play again!`;
            }

            switchPlayerTurn();
            printNewRound();
        }
        else {
            console.log("Cell is already occupied. Try a different move.");
            printNewRound();
        }
    }

    return {
        playRound,
        getActivePlayer,
        printNewRound,
        getBoard: board.getBoard
    };
};


function ScreenController(playerOneName = "Player One",
    playerTwoName = "Player Two") {
    const game = GameController(playerOneName, playerTwoName);
    const playerTurnDiv = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');
    let gameDone = false;

    // const playAgain = () => {
    //     console.log("here")
    //     const game = GameController();
    //     updateScreen(null);
    // }

    const updateScreen = (result) => {
        boardDiv.textContent = "";

        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();

        if (result) {
            console.log(result);
            playerTurnDiv.textContent = result;
            gameDone = true;
        }
        else if (!gameDone) {
            playerTurnDiv.textContent = `${activePlayer.name}'s turn...`;
        }
        // let input = prompt("Play again (Y, N)?");
        // if (input === "Y") {
        //     boardDiv.textContent = "";
        //     playerTurnDiv.textContent = ""
        //     playAgain();
        // }
        // return;
        // }


        board.forEach((row, rowIndex) => {
            row.forEach((cell, index) => {
                // Anything clickable should be a button!!
                const cellButton = document.createElement("button");
                cellButton.classList.add("cell");

                cellButton.dataset.row = rowIndex;
                cellButton.dataset.column = index;
                if (cell.getValue() === 1) {
                    cellButton.textContent = "X";
                }
                else if (cell.getValue() === 2) {
                    cellButton.textContent = "O";
                }
                else {
                    cellButton.textContent = "";
                }

                // cellButton.textContent = cell.getValue();
                boardDiv.appendChild(cellButton);
            })
        })
    }

    // Add event listener for the board
    function clickHandlerBoard(e) {
        // console.log('Clicked element:', e.target);
        // console.log('Row:', e.target.dataset.row);
        // console.log('Column:', e.target.dataset.column);
        const selectedColumn = e.target.dataset.column;
        const selectedRow = e.target.dataset.row;
        if (!selectedColumn || !selectedRow) return;
        if (!gameDone) {
            let result = game.playRound(selectedRow, selectedColumn);
            updateScreen(result);
        }
        else {
            updateScreen();
        }


    }

    boardDiv.addEventListener("click", clickHandlerBoard);

    updateScreen();

}

function restart() {
    ScreenController(player1.value, player2.value);
}

const player1 = document.querySelector(".player1");
const player2 = document.querySelector(".player2");

ScreenController();

