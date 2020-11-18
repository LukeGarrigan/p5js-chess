import { COLOUR } from './constants.js';
import Piece from './Piece.js';
export default class Knight extends Piece {
    constructor(x, y, colour) {
        super(x, y, colour);
    }


    findMoves(tiles) {
        let moves = [];

        moves.push(this.getMove(2, -1, tiles));
        moves.push(this.getMove(1, -2, tiles));
        moves.push(this.getMove(-1, -2, tiles));
        moves.push(this.getMove(-2, -1, tiles));
        moves.push(this.getMove(-2, 1, tiles));
        moves.push(this.getMove(-1, 2, tiles));
        moves.push(this.getMove(1, 2, tiles));
        moves.push(this.getMove(2, 1, tiles));

        return moves.filter(n => n);
    }

    getMove(xDir, yDir, tiles) {
        let newX = this.x + xDir;
        let newY = this.y + yDir; 
        if (newX > 7 || newX < 0 || newY > 7 || newY < 0) {
            return;
        }

        if (tiles[newX][newY]) {
            if (tiles[newX][newY].colour !== this.colour) {
                return {x : newX, y: newY};         
            }
        } else {
            return  {x : newX, y: newY};
        }
    }

    draw(x, y) {
        push();
        if (this.colour == COLOUR.BLACK) {
            fill(0);
            rect(x, y, 40, 20);
        } else {
            rect(x, y, 40, 20);
        }
        pop();
    }
}