
export default class Piece {
    constructor(x, y, colour, sprite) {
        this.x = x;
        this.y = y;
        this.colour = colour;
        this.hasMoved = false;
        this.sprite = sprite;
    }

    move(toX, toY, tiles) {
        const fromX = this.x;
        const fromY = this.y;

        tiles[toX][toY] = this;
        
        
        this.x = toX;
        this.y = toY;
        this.hasMoved = true;
        tiles[fromX][fromY] = undefined; 
    }

    draw(x, y) {
        text(this.sprite, x, y);
    }
}