import { COLOUR } from "./constants";

export default class Pawn {
    constructor(x, y, colour, tiles) {
        this.x = x;
        this.y = y;
        this.type = "pawn";
        this.colour = colour;
        this.tiles = tiles;
    }


    findLegalMoves() {
        if (this.colour == COLOUR.BLACK) {
            return [
                {
                    x: this.x,
                    y: this.y + 1
                }
            ] 
        }
    }
}