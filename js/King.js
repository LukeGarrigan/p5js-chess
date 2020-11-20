import { COLOUR } from './constants.js';
import Piece from './Piece.js';
export default class King extends Piece {
    constructor(x, y, colour) {
        super(x, y, colour);
    }


    findMoves(tiles) {
        let moves = [];

        
        moves.push(this.getMove(1, 0, tiles));
        moves.push(this.getMove(-1, 0, tiles));
        moves.push(this.getMove(0, 1, tiles));
        moves.push(this.getMove(0, -1, tiles));
        moves.push(this.getMove(1, -1, tiles));
        moves.push(this.getMove(-1, -1, tiles));
        moves.push(this.getMove(-1, 1, tiles));
        moves.push(this.getMove(1, 1, tiles));

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
            text('♚', x, y);
        } else {
            text('♔', x, y);
        }
        pop();
    }
}