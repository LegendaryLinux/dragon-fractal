let rotateVectorRight = (vector) => {
    // x2=y1, y2=-x1
    return [vector[1], (vector[0]*-1)];
};

let rotateVectorLeft = (vector) => {
    // x2=-y1, y2=x1
    return [vector[1]*-1, vector[0]];
};

let arrayShuffle = (array) => {
    // Fisher-Yates Shuffle (https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle)
    let itemCount = array.length;
    while(itemCount > 0){
        let index = Math.floor(Math.random()*itemCount);
        --itemCount;

        let temp = array[itemCount];
        array[itemCount] = array[index];
        array[index] = temp;
    }
    return array;
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

let drawDragonCurve = (canvasElement, forceRedraw = false, useGradient = true) => {
    let canvasContext = canvasElement.getContext('2d');

    // Determine colors for the line
    let colors = ['white','lightblue','teal','gold','green','red','lightcyan'];
    let gradientColors = ['lightblue','teal','gold','green','red','lightcyan'];

    // Flip a coin to decide if we use gradient colors or a solid line
    if(!useGradient){
        // Solid color line
        canvasContext.strokeStyle = colors[Math.floor(Math.random()*colors.length)];
    }else{
        // Gradient color
        let shuffledColors = arrayShuffle(gradientColors);
        let linearGradient = canvasContext.createLinearGradient(1280,720,0,0);
        for(let i = 0; i < shuffledColors.length; ++i){
            linearGradient.addColorStop((i / (shuffledColors.length -1)),shuffledColors[i]);
        }
        canvasContext.strokeStyle = linearGradient;
    }

    // Use the class I wrote to make life easier
    let canvas = new ArtBoard(canvasContext);

    // How many steps (lines) we want to draw
    let targetSteps = 5000;

    if(forceRedraw){
        canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height);
    }

    // Setup canvas and determine step size
    let currentVector = [10,0];
    canvas.setCursor(1050,460);
    canvas.moveCursor(currentVector[0],currentVector[1]);

    for(let i = 1; i <= targetSteps; i++){
        setTimeout(() => {
            currentVector = isLeftTurn(i) ? rotateVectorLeft(currentVector) : rotateVectorRight(currentVector);
            canvas.moveCursor(currentVector[0],currentVector[1]);
            if(i === targetSteps){drawDragonCurve(canvasElement, forceRedraw, useGradient);}
        }, i*40); // One second between loops
    }
};
