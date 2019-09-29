

var pegs = [...document.querySelectorAll('.peg')];
var holes = [...document.querySelectorAll('.hole')];
var currentMouseLocation = {x:0,y:0}
var gameState = {
    currentPeg: null,
    currentPegPossibleMove: null,
    isMakingMove: false,
}

document.body.addEventListener('mousemove', (evt) => {
    currentMouseLocation.x = evt.clientX;
    currentMouseLocation.y = evt.clientY;
})

document.body.addEventListener('click', evt => {
    if(gameState.currentPegPossibleMove && !gameState.isMakingMove){
        gameState.isMakingMove = true;
        movePeg().then(() => gameState.isMakingMove = false);
    }
})

/**
 * animate moving the peg, return a promise when the animation is complete and the 
 * peg is in its new hole
 */
function movePeg() {
    let fromRect = gameState.currentPeg.getBoundingClientRect();
    gameState.currentPegPossibleMove.appendChild(gameState.currentPeg);
    let toRect = gameState.currentPeg.getBoundingClientRect();

    return Promise.resolve();
}

function getPegUnderMouse() {
    if(gameState.isMakingMove){
        return null;
    }
    gameState.currentPeg = pegs.find(p => {
        let rect = p.getBoundingClientRect();
        return rect.top <= currentMouseLocation.y &&
            rect.bottom >= currentMouseLocation.y &&
            rect.left <= currentMouseLocation.x &&
            rect.right >= currentMouseLocation.x;
    })
}

function getCurrentPegPossibleMove() {
    gameState.currentPegPossibleMove = null;

    if(!gameState.currentPeg){
        return null;
    }
    let currentHole = gameState.currentPeg.parentElement;
    let nextHole = null;
    if (gameState.currentPeg.matches('.green')) {
        //can move left if hole is empty
        nextHole = currentHole.previousElementSibling;
        if(nextHole && nextHole.querySelectorAll('.peg').length === 0) {
            gameState.currentPegPossibleMove = nextHole;
            return;
        }
        if(nextHole && nextHole.querySelectorAll('.red').length === 1) {
            //if the hole to the left is filled with a red peg 
            nextHole = nextHole.previousElementSibling;
            //and the one after that is empty, it can jump into it.
            if(nextHole && nextHole.querySelectorAll('.peg').length === 0) {
                gameState.currentPegPossibleMove = nextHole;
                return ;
            }
        }
    }
    else if (gameState.currentPeg.matches('.red')) {
        //can move right if hole is empty
        nextHole = currentHole.nextElementSibling;
        if(nextHole && nextHole.querySelectorAll('.peg').length === 0) {
            gameState.currentPegPossibleMove = nextHole;
            return;
        }
        if(nextHole && nextHole.querySelectorAll('.green').length === 1) {
            //if the hole to the right is filled with a green peg 
            nextHole = nextHole.nextElementSibling;
            //and the one after that is empty, it can jump into it.
            if(nextHole && nextHole.querySelectorAll('.peg').length === 0) {
                gameState.currentPegPossibleMove = nextHole;
                return ;
            }
        }
    }

}

function gameLoop() {

    getPegUnderMouse();
    getCurrentPegPossibleMove();
    if(gameState.currentPegPossibleMove && !gameState.isMakingMove){
        document.body.style.cursor = 'pointer';
    }
    else {
        document.body.style.cursor = '';
    }


    requestAnimationFrame(gameLoop);
}




gameLoop();