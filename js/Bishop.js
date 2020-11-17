import { COLOUR } from './constants.js';
import Piece from './Piece.js';
export default class Bishop extends Piece {
    constructor(x, y, colour) {
        super(x, y, colour);
    }


    findMoves(tiles) {
        let moves = [];

        moves.push(...this.findUpRightMoves(tiles));
        moves.push(...this.findUpLeftMoves(tiles));
        moves.push(...this.findDownRightMoves(tiles));
        moves.push(...this.findDownLeftMoves(tiles));
        return moves;
    }

    findUpRightMoves(tiles) {
        let moves = [];
        for (let i = 1; i < 8; i++) {
            let newX = this.x + i;
            let newY = this.y - i;

            if (newX > 7 || newY < 0) {
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


    findUpLeftMoves(tiles) {
        let moves = [];
        for (let i = 1; i < 8; i++) {
            let newX = this.x - i;
            let newY = this.y - i;

            if (newY > 7 || newX < 0) {
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


    
    findDownRightMoves(tiles) {
        let moves = [];
        for (let i = 1; i < 8; i++) {
            let newX = this.x + i;
            let newY = this.y + i;

            if (newY > 7 || newX > 7) {
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

        
    findDownLeftMoves(tiles) {
        let moves = [];
        for (let i = 1; i < 8; i++) {
            let newX = this.x - i;
            let newY = this.y + i;

            if (newY > 7 || newX < 0) {
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