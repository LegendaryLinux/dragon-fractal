let rotateVectorRight = (vector) => {
    // x2=y1, y2=-x1
    return [vector[1], (vector[0]*-1)];
};

let rotateVectorLeft = (vector) => {
    // x2=-y1, y2=x1
    return [vector[1]*-1, vector[0]];
};

isLeftTurn = (turnNumber) => {
    /** From Wikipedia:
     * There is a simple one line non-recursive method of implementing the above k mod 4 method of finding the turn
     * direction in code. Treating turn n as a binary number, calculate the following boolean value:

     bool turn = (((n & −n) << 1) & n) != 0;
     "n & −n" leaves only one bit as a '1', the rightmost '1' in the binary expansion of n;
     "<< 1" shifts that bit to the left one position;
     "& n" leaves either that single bit (if k mod 4 = 3), or a zero (if k mod 4 = 1).
     so "bool turn = (((n & −n) << 1) & n) != 0" is TRUE if the nth turn is L; and is FALSE if the nth turn is R.
     */
    return (((turnNumber & -turnNumber) << 1) & turnNumber) !== 0;
};

let drawDragonCurve = () => {
    let canvasElement = document.getElementById('dragon-canvas');
    canvasElement.width = 1280;
    canvasElement.height = 720;
    let canvasContext = canvasElement.getContext('2d');
    canvasContext.strokeStyle = 'teal'; //'rgb(177,182,1)';
    let canvas = new ArtBoard(canvasContext);

    let targetSteps = 5000;

    // Setup canvas and determine step size
    canvasContext.clearRect(0,0,canvasElement.width,canvasElement.height);
    let currentVector = [10,0];
    canvas.setCursor(1050,500);
    canvas.moveCursor(currentVector[0],currentVector[1]);

    for(let i = 1; i <= targetSteps; i++){
        setTimeout(() => {
            currentVector = isLeftTurn(i) ? rotateVectorLeft(currentVector) : rotateVectorRight(currentVector);
            canvas.moveCursor(currentVector[0],currentVector[1]);
            if(i === targetSteps){drawDragonCurve();}
        }, i*100); // One second between loops
    }
};

window.onload = () => {
    drawDragonCurve();
};