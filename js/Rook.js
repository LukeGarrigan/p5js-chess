import { COLOUR } from './constants.js';
import Piece from './Piece.js';
export default class Rook extends Piece {
    constructor(x, y, colour) {
        super(x, y, colour);
    }


    findMoves(tiles) {
        let moves = [];

        // forward for black
        moves.push(...this.findForwardMoves(tiles));
        moves.push(...this.findBackwardMoves(tiles));
        moves.push(...this.findRightMoves(tiles));
        moves.push(...this.findLeftMoves(tiles));
        return moves;
    }

    findForwardMoves(tiles) {
        let moves = [];
        for (let i = this.y + 1; i < 8; i++) {
            if (tiles[this.x][i]) {
                if (tiles[this.x][i].colour !== this.colour) {
                    moves.push({x : this.x, y: i});         
                }
                return moves;
            }
            moves.push({x : this.x, y: i});
        }
        return moves;
    }

    findBackwardMoves(tiles) {
        let moves = [];
        for (let i = this.y - 1; i >= 0; i--) {
            if (tiles[this.x][i]) {
                if (tiles[this.x][i].colour !== this.colour) {
                    moves.push({x: this.x, y: i});                    
                }
                return moves;
            }
            moves.push({x: this.x, y: i});
        }
        return moves;
    }

    findLeftMoves(tiles) {
        let moves = [];
        for (let i = this.x - 1; i >= 0; i--) {
            if (tiles[i][this.y]) {
                if (tiles[i][this.y].colour !== this.colour) {
                    moves.push({x: i, y: this.y});     
                }
                return moves;
            }
            moves.push({x: i, y: this.y});
        }
        return moves;
    }

    findRightMoves(tiles) {
        let moves = [];
        for (let i = this.x + 1; i < 8; i++) {
            if (tiles[i][this.y]) {
                if (tiles[i][this.y].colour !== this.colour) {
                    moves.push({x: i, y: this.y});   
                }
                return moves;
            }
            moves.push({x: i, y: this.y});
        }
        return moves;
    }

    draw(x, y) {
        push();
        if (this.colour == COLOUR.BLACK) {
            fill(0);
            rect(x, y, 40, 40);
        } else {
            rect(x, y, 40, 40);
        }
        pop();
    }
}