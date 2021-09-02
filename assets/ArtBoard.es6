class ArtBoard{
    constructor(canvasContext){
        this.canvas = canvasContext;
        this.canvas.beginPath();
        this.isDrawing = true;
        this.x = 0;
        this.y = 0;
    }

    getX(){
        return this.x;
    }

    setX(coord){
        this.x = coord;
    }

    getY(){
        return this.y;
    }

    setY(coord){
        this.y = coord;
    }

    startDrawing(){
        this.canvas.beginPath();
        this.isDrawing = true;
    }

    stopDrawing(){
        this.isDrawing = false;
    }

    getCursor(){
        return [this.getX(), this.getY()];
    }

    setCursor(newX, newY){
        this.setX(newX);
        this.setY(newY);
        this.canvas.beginPath();
        this.canvas.moveTo(this.x, this.y);
    }

    moveCursor(xOffset, yOffset){
        this.setX(this.x += xOffset);
        this.setY(this.y += yOffset);
        this.canvas.lineTo(this.x, this.y);
        if(this.isDrawing){
            this.canvas.stroke();
        }
    }
}