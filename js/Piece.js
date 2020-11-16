
export default class Piece {
    constructor(x, y, colour) {
        this.x = x;
        this.y = y;
        this.colour = colour;
        this.hasMoved = false;
    }

    move(x, y) {
        this.x = x;
        this.y = y;
        this.hasMoved = true;
    }

}