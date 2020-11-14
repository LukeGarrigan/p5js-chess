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
                this.legalMoves = tile.findLegalMoves(this.tiles);
                push();
                fill(100,255,100);

                for (const move of this.legalMoves) {
                    rect(this.getPos(move.x), this.getPos(move.y), this.sizeOfSquare, this.sizeOfSquare)
                }
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
            this.selected = JSON.parse(JSON.stringify(this.tiles[x][y]));
        } else if (this.selected) {
            const potentialMove = this.legalMoves.find(e => e.x == x && e.y == y);
            if (potentialMove) {
                this.move(potentialMove);
            }
        } 
    }

    move(endTile) {
        this.tiles[endTile.x][endTile.y] = this.tiles[this.selected.x][this.selected.y];
        this.tiles[endTile.x][endTile.y].move(endTile.x, endTile.y);

        this.tiles[endTile.x][endTile.y].x = endTile.x;
        this.tiles[endTile.x][endTile.y].y = endTile.y;
        this.tiles[this.selected.x][this.selected.y] = undefined;
        this.selected = undefined;
    }

}