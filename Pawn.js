import { COLOUR } from "./constants.js";

export default class Pawn {
    constructor(x, y, colour) {
        this.x = x;
        this.y = y;
        this.colour = colour;
    }


    findLegalMoves(tiles) {
        let legalMoves = [];

        if (this.colour == COLOUR.BLACK) {
            const forwardMove = { x: this.x, y: this.y + 1}
            if (!tiles[forwardMove.x][forwardMove.y]) {
                legalMoves.push(forwardMove);
            }
        } else {
            const forwardMove = { x: this.x, y: this.y - 1}
            if (!tiles[forwardMove.x][forwardMove.y]) {
                legalMoves.push(forwardMove);
            }
        }

        return legalMoves;
    }

    draw(x, y) {
        push();
        if (this.colour == COLOUR.BLACK) {
            ellipse(x, y, 40, 40);
        } else {
            fill(0);
            ellipse(x, y, 40, 40);
        }
        pop();
    }
}