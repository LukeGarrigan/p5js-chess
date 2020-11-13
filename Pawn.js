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
}