
export default class Piece {
    constructor(x, y, colour, sprite) {
        this.x = x;
        this.y = y;
        this.colour = colour;
        this.hasMoved = false;
        this.sprite = sprite;
    }

    move(x, y) {
        this.x = x;
        this.y = y;
        this.hasMoved = true;
    }

    draw(x, y) {
        text(this.sprite, x, y);
    }
}