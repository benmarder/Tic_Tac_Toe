   
   const constants = {
        PLAYER_1: 0,
        PLAYER_2: 1,
        P_1_PLAY: 2,
        P_2_PLAY: 3,
        BLANK:    4,
    }
    const draw = [
        "X",
        "O",
    ]
    const winningPositions  = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
   
    /*-----------------DOM elements-------------------------------------------- */
    const board             = document.querySelector("#game-board");
    const elements          = document.querySelectorAll(".column > div");
    const winnerDiv         = document.querySelector(".flappy-dialog");
    const winnerHeadline    = document.querySelector(".flappy-dialog>h1");
    const player1           = document.querySelector("#player1 > span");
    const player2           = document.querySelector("#player2 > span");
    const newGameButton     = document.querySelector("#new-game");
    const resetScoreButton  = document.querySelector("#reset-score");
    const yesButton         = document.querySelector(".flappy-dialog button");
    const noButton          = document.querySelectorAll(".flappy-dialog button")[1];
    /*-------------------------------------------------------------------------- */
    let activePlayer;
    let gameIsActive;    
    let gameState;
    let movesCounter;
    let player1Score = 0;
    let player2Score = 0;
    addListeners();
    newGame();

    function addListeners(){
        noButton.onclick = () => {
            winnerDiv.classList.toggle('hidden');
        }
        yesButton.onclick = () => {
            winnerDiv.classList.toggle('hidden');
            newGame();
        }
        newGameButton.onclick = newGame;
        resetScoreButton.onclick = resetScore;
        //add listener for each cell on board.
        for(let i=0;i<elements.length;i++){
            elements[i].id = i;
            elements[i].onclick = handlePlay;
        }
    }

    function handlePlay(){
        const tappedPos = event.target.id;
        const islegalClick = gameState[tappedPos] === constants.BLANK
        if(islegalClick)
            movesCounter++;
        if (gameIsActive && islegalClick) {       
            gameState[tappedPos] = activePlayer;
            event.target.innerText = draw[activePlayer];
            checkBoard();
            activePlayer = !activePlayer+0;
            board.classList.toggle('circleCursur');
        }
    }

    function checkBoard(){
        console.log(movesCounter);
        for(let winningPosition of winningPositions){
            if (gameState[winningPosition[0]] !==  constants.BLANK &&
                gameState[winningPosition[0]] === gameState[winningPosition[1]] &&
                gameState[winningPosition[1]] === gameState[winningPosition[2]]){
                    gameIsActive = false;
                    const winner = activePlayer === constants.PLAYER_1 ? "Player 1":"player 2";
                    declareWinner(`${winner} Wins!`); 
                    updateScore();
                    return;
            }
        }
        if(movesCounter === 9){
            declareWinner("It's A Draw!");
        }
    }
    function newGame(){
        const BLANK = constants.BLANK;
        gameState = [
            BLANK, BLANK, BLANK,
            BLANK, BLANK, BLANK,
            BLANK, BLANK, BLANK
        ];
        for(let element of elements){
            element.innerText = "";
        }
        activePlayer = constants.PLAYER_1;
        movesCounter = 0;
        board.classList.remove("circleCursur");
        gameIsActive = true; 
    }

    function declareWinner(winnerText){
        winnerHeadline.innerText = winnerText;
        winnerDiv.classList.toggle('hidden');
    }
    function updateScore(){
        if(activePlayer === constants.PLAYER_1)
            player1.innerText = ++player1Score
        else
            player2.innerText = ++player2Score
    }
    function resetScore(){
        player1Score = 0;    
        player2Score = 0;
        player1.innerText = "0";
        player2.innerText = "0";
    }


