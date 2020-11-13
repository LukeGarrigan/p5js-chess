import {COLOUR, SIZE} from "./constants.js";
import Pawn from "./Pawn.js";

export default class Board {

    constructor() {
        this.sizeOfSquare = SIZE / 8;
        this.tiles = this.createTiles();
    }


    createTiles() {
        let tiles = [];
        for (let i = 0; i < 8; i++) {
            tiles[i] = [];
            for (let j = 0; j < 8; j++) {

                if (j == 1) {
                    tiles[i][j] = new Pawn(i, j, COLOUR.BLACK);
                } else if (j == 6) {
                    tiles[i][j] = new Pawn(i, j, COLOUR.WHITE);
                } else {
                    tiles[i][j] = undefined;
                }
            }
        }
        return tiles;
    }

    draw() {
        rectMode(CENTER);
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const currentTile = this.tiles[i][j];
                const x =  this.getPos(i);
                const y = this.getPos(j);
                rect(x, y, this.sizeOfSquare, this.sizeOfSquare);

                if (currentTile instanceof Pawn) {
                    currentTile.draw(x, y);
                }
            }
        }
        this.displaySelected();
    }

    displaySelected() {
        if (this.selected) {
            const tile = this.tiles[this.selected.x][this.selected.y];
            if (tile) {
                const legalMoves = tile.findLegalMoves(this.tiles);
                push();
                fill(255,100,50);
                rect(this.getPos(legalMoves[0].x), this.getPos(legalMoves[0].y), this.sizeOfSquare, this.sizeOfSquare)
                pop(); 
            }
        }
    }

    getPos(index) {
        let offset = this.sizeOfSquare/2;
        return index * this.sizeOfSquare + offset
    }

    select(clientX, clientY) {
        const x = Math.floor(clientX / 100);
        const y = Math.floor(clientY / 100);

        if (this.tiles[x][y]) {

            if (!this.selected) {
                this.selected = {x, y}
            } else {
                this.selected.x = x;
                this.selected.y = y;
            }
        }
    }

}