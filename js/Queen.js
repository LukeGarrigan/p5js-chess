import { COLOUR } from './constants.js';
import Piece from './Piece.js';
export default class Queen extends Piece {
    constructor(x, y, colour) {
        super(x, y, colour);
    }


    findMoves(tiles) {
        let moves = [];
        moves.push(...this.findAllMoves(1, -1, tiles));
        moves.push(...this.findAllMoves(-1, -1, tiles));
        moves.push(...this.findAllMoves(1, 1, tiles));
        moves.push(...this.findAllMoves(-1, 1, tiles));
        moves.push(...this.findAllMoves(1, 0, tiles));
        moves.push(...this.findAllMoves(0, -1, tiles));
        moves.push(...this.findAllMoves(-1, 0, tiles));
        moves.push(...this.findAllMoves(0, 1, tiles));
        return moves;
    }

    findAllMoves(xDir, yDir, tiles) {
        let moves = [];
        for (let i = 1; i < 8; i++) {
            let newX = this.x + (xDir * i);
            let newY = this.y + (yDir * i);

            if (newX > 7 || newX < 0 || newY > 7 || newY < 0) {
                return moves;
            }

            if (tiles[newX][newY]) {
                if (tiles[newX][newY].colour !== this.colour) {
                    moves.push({x : newX, y: newY});         
                }
                return moves;
            }
            moves.push({x : newX, y: newY});
        }
        return moves;
    }

    draw(x, y) {
        push();
        if (this.colour == COLOUR.BLACK) {
            fill(0);
            rect(x, y, 20, 40);
        } else {
            rect(x, y, 20, 40);
        }
        pop();
    }
}