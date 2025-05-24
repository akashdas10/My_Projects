let boxes = document.querySelectorAll(".box");
let resetButton = document.querySelector("#reset-button");
let newGameButton = document.querySelector("#new-game");
let newGameWinnerButton = document.querySelector("#new-game-winner");
let winnerScreen = document.querySelector(".winner-screen");
let winnerText = document.querySelector(".winner-text");

let playerO = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(playerO){
            box.innerText = "O";
            playerO = false;
        }
        else{
            box.innerText = "X";
            playerO = true;
        }
        box.disabled = true;
        checkWinner();
    });
});

const checkWinner = () => {
    for(let pattern of winningConditions){
        let position1 = boxes[pattern[0]].innerText;
        let position2 = boxes[pattern[1]].innerText;
        let position3 = boxes[pattern[2]].innerText;

        if(position1 != "" && position2 != "" && position3 != ""){
            if(position1 == position2 && position2 == position3){
                showWinner(position1);
            }
        }
    }
}

const showWinner = (winner) => {
    winnerText.innerText = `Player ${winner} Wins!`;
    winnerScreen.style.display = "flex";
}

const resetGame = () => {
    playerO = true;
    boxes.forEach(box => {
        box.innerText = "";
        box.disabled = false;
    });
    winnerScreen.style.display = "none";
}

resetButton.addEventListener("click", resetGame);
newGameButton.addEventListener("click", resetGame);
newGameWinnerButton.addEventListener("click", resetGame);
