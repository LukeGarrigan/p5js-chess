import {COLOUR, SIZE} from "./constants.js";
import Pawn from "./Pawn.js";

export default class Board {

    constructor() {
        this.sizeOfSquare = SIZE / 8;
        this.tiles = this.createTiles();
        this.turn = COLOUR.WHITE;
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
                fill(100,255,100, 100);

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

    userClick(clientX, clientY) {
        const x = Math.floor(clientX / 100);
        const y = Math.floor(clientY / 100);
        this.select(x, y);
    }

    select(x, y) {
        if (this.tiles[x][y] && this.tiles[x][y].colour === this.turn) {
            this.selected = JSON.parse(JSON.stringify(this.tiles[x][y]));
        } else if (this.selected) {
            const potentialMove = this.legalMoves.find(e => e.x == x && e.y == y);
            if (potentialMove) {
                this.move(this.selected, potentialMove);
            }
        } 
    }

    move(from, to) {
        this.turn = this.turn === COLOUR.WHITE ? COLOUR.BLACK : COLOUR.WHITE;
        this.tiles[to.x][to.y] = this.tiles[from.x][from.y];
        this.tiles[to.x][to.y].move(to.x, to.y);

        this.tiles[to.x][to.y].x = to.x;
        this.tiles[to.x][to.y].y = to.y;
        this.tiles[from.x][from.y] = undefined;
        this.selected = undefined;
    }

}