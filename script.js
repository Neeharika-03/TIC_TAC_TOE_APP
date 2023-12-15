let currentPlayer, player1, player2;
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = false;

function startGame() {
    player1 = document.getElementById("player1").value;
    player2 = document.getElementById("player2").value;

    if (player1 === "" || player2 === "") {
        alert("Please enter names for both players.");
        return;
    }

    currentPlayer = player1;
    document.getElementById("player-names").style.display = "none";
    document.getElementById("restart-btn").disabled = false;
    gameActive = true;

    createBoard();
    displayTurnMessage();
}

function createBoard() {
    const boardContainer = document.getElementById("board-container");
    boardContainer.innerHTML = "";

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.setAttribute("data-index", i);
        cell.addEventListener("click", cellClick);
        boardContainer.appendChild(cell);
    }
}

function cellClick(event) {
    const index = event.target.getAttribute("data-index");

    if (board[index] === "" && gameActive) {
        board[index] = currentPlayer;
        event.target.innerText = currentPlayer;
        
        if (checkWin()) {
            showWinner();
            gameActive = false;
        } else if (checkDraw()) {
            showDraw();
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === player1 ? player2 : player1;
            displayTurnMessage();
        }
    }
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return winPatterns.some(pattern =>
        board[pattern[0]] !== "" &&
        board[pattern[0]] === board[pattern[1]] &&
        board[pattern[1]] === board[pattern[2]]
    );
}

function checkDraw() {
    return !board.includes("");
}

function showWinner() {
    const winner = currentPlayer === player1 ? player1 : player2;
    const symbol = currentPlayer === player1 ? "X" : "O";
    
    showDialog(`Congratulations! ${winner} (${symbol}) wins!`);
}


function showDraw() {
    showDialog("It's a draw!");
}

function displayTurnMessage() {
    const turnMessage = document.getElementById("turn-message");
    const symbol = currentPlayer === player1 ? "X" : "O";

    turnMessage.innerText = `It's ${currentPlayer}'s turn (${symbol}).`;
}

function showDialog(message) {
    const dialogBox = document.createElement("div");
    dialogBox.className = "dialog-box";
    dialogBox.innerHTML = `<p>${message}</p>`;
    document.body.appendChild(dialogBox);

    setTimeout(() => {
        document.body.removeChild(dialogBox);
    }, 2000);
}

function restartGame() {
    currentPlayer = player1;
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;

    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        cell.innerText = "";
    });

    displayTurnMessage();
}
