const Player = (symbol) => {
    const getSymbol = () => symbol;
    let turnToPlay = false;
    let squareControl = [];
    const winningSquares = [[1,2,3], [4,5,6], [7,8,9], [1,5,9], [3,5,7], [1,4,7], [2,5,8], [3,6,9]];
    let win = false;
    //setter and getter
    const getTurn = () => turnToPlay;
    const setTurn = (boolValue) => {
        turnToPlay = boolValue;
    }
    const addSquareControl = (squareIndex) => {
        squareControl.push(squareIndex);
        console.log("adding index: " + squareIndex);
        console.log(squareControl);
    }
    const resetSquareControl = () => {
        squareControl = [];
    }
    const setWin = () => {
        winningSquares.forEach(x => {
            if(x.every(y => squareControl.includes(y))) win = true;
        });
        //console.log(squareControl);
    }
    const getWin = () => {
        setWin();
        if (win) {
            win = false
            return true;
        }
    }
     
    return {
        getSymbol,
        getTurn,
        setTurn,
        addSquareControl,
        getWin,
        resetSquareControl,
    }
}
const gameController = (() => {
    const player1 = Player('o');
    const player2 = Player('x');
    let thereIsAWinner = false;
    //whose turn to play now?
    const addMarker = (playingNow,notPlayingNow,index) => {
        playingNow.setTurn(true);
        notPlayingNow.setTurn(false);
        playingNow.addSquareControl(index);
        //console.log(playingNow.squareControl);
    }
    const determineTurn = (squareIndex) => {
        if (!player1.getTurn() && !player2.getTurn()) {
            addMarker(player1,player2,squareIndex);
            return player1.getSymbol();
        }
        else if (!player2.getTurn()) {
            addMarker(player2,player1,squareIndex)
            return player2.getSymbol();
        }
        else {
            addMarker(player1,player2,squareIndex);
            return player1.getSymbol();
        }
    }
    //who's winning?
    const resetAllSquareControl = () => {
        player1.resetSquareControl();
        player2.resetSquareControl();
        player1.setTurn(false);
        player2.setTurn(false);
    }
    const determineWinner = () => {
        if (player1.getWin()) {
            thereIsAWinner = true;
            return 'Player 1';
        }
        else if (player2.getWin()) {
            thereIsAWinner = true;
            return 'Player 2';
        }
        else return false;
    }
    //is there a winner?
    const getIsThereAWinner = () => {
        let winner = determineWinner();
        if (thereIsAWinner) {
            resetAllSquareControl();
            thereIsAWinner = false;
            return winner;
        }
    }
    const draw = () => {
        resetAllSquareControl();
    }

    return {
        determineTurn,
        getIsThereAWinner,
        draw,
    }
})();
const gameBoard = (() => {
    let boardStore = document.querySelectorAll('.game-board-element');
    let i = 1;
    let boardMark = Array(9).fill(false);
    let counter = 0;
    let winningFlag = false;
    const boardAndCounterReset = (r) => {
        boardMark = Array(9).fill(false);
        boardStore.forEach(el => el.textContent = '');
        counter = 0;
        winningFlag = false;
        //console.log(winner);
    }
    const displayWinner = (winner) => {
        let resultBoard = document.getElementById('result-board');
        let myButton = document.getElementById('button');
        let text = '';
        switch (winner){
            case 'Player 1':
                text = "Player 1 wins!";
                break;
            case 'Player 2':
                text = "Player 2 wins!";
                break;
            case 'draw':
                text = "Draw!";
                break;
        }
        resultBoard.textContent = text;
        myButton.style.display = 'inline';
        button.addEventListener('click', () => {
            boardAndCounterReset();
            button.style.display = 'none';
            resultBoard.textContent = '';
        })
    }
    const markBoard = (() => {
        boardStore.forEach(el => {
            el.value = i;
            let markIndex = el.value - 1;
            el.addEventListener('click', () => {
                console.log(winningFlag);
                if(!boardMark[markIndex] && !winningFlag) {
                    el.textContent = gameController.determineTurn(el.value); 
                    counter++;
                    boardMark[markIndex] = true;
                }
                let a = gameController.getIsThereAWinner();
                if(a) {
                    displayWinner(a);
                    winningFlag = true;
                }
                else if (counter==9) {
                    gameController.draw();
                    displayWinner('draw');
                }
            });
            i++;
        });
        console.log("marking board done");
    })();
    return {
    }
})();