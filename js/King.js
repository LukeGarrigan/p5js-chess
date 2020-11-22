import CheckFinder from './CheckFinder.js';
import { COLOUR } from './constants.js';
import Piece from './Piece.js';
import Rook from './Rook.js';
export default class King extends Piece {
    constructor(x, y, colour, sprite) {
        super(x, y, colour, sprite);
        this.type = 'king';
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
        moves.push(...this.getCastleMoves(tiles));

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
                return { x: newX, y: newY };
            }
        } else {
            return { x: newX, y: newY };
        }
    }

    getCastleMoves(tiles) {
        let moves = [];
        if (this.hasMoved || CheckFinder.isCurrentPlayerInCheck(tiles, this.colour)) {
            return moves;
        }

        const longRook = tiles[0][this.y];
        if (longRook instanceof Rook && !longRook.hasMoved) {
            if (!this.isPiecesBetween(true, tiles)) {
                moves.push({ x: this.x - 2, y: this.y });
            }
        }
        const shortRook = tiles[7][this.y];
        if (shortRook instanceof Rook && !shortRook.hasMoved) {
            if (!this.isPiecesBetween(false, tiles)) {
                moves.push({ x: this.x + 2, y: this.y });
            }
        }
        return moves;
    }


    isPiecesBetween(isLongCastle, tiles) {

        if (isLongCastle) {
            for (let i = 1; i < this.x; i++) {
                if (tiles[i][this.y]) {
                    return true;
                }
            }
        } else {
            for (let i = this.x + 1; i < 7; i++) {
                if (tiles[i][this.y]) {
                    return true;
                }
            }
        }
    }

    move(toX, toY, tiles) {
        if (this.moveIsCastle(toX)) {
            if (toX < this.x) {
                // long castle
                tiles[0][this.y].move(toX + 1, this.y, tiles);

            } else {
                // short castle 
                tiles[7][this.y].move(toX - 1, this.y, tiles);
            }
        }
        super.move(toX, toY, tiles);
    }


    moveIsCastle(toX) {
        return toX == (this.x - 2) || toX == (this.x + 2);
    }
}