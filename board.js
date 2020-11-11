import {COLOUR, SIZE} from "./constants.js";
import Pawn from "./Pawn.js";

export default class Board {

    constructor() {
        this.sizeOfSquare = SIZE / 8;
        this.tiles = this.createTiles();
    }


    createTiles() {
        let offset = this.sizeOfSquare/2;
        let tiles = [];
        for (let i = 0; i < 8; i++) {
            tiles[i] = [];
            for (let j = 0; j < 8; j++) {

                if (j == 1) {
                    tiles[i][j] = { x: i * this.sizeOfSquare + offset, y: j * this.sizeOfSquare + offset , piece: new Pawn(i, j, COLOUR.BLACK, this.tiles) };
                } else if (j == 6) {
                    tiles[i][j] = { x: i * this.sizeOfSquare + offset, y: j * this.sizeOfSquare + offset , piece: new Pawn(i, j, COLOUR.WHITE, this.tiles) };
                } else {
                    tiles[i][j] = { x: i * this.sizeOfSquare + offset, y: j * this.sizeOfSquare + offset };
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
                
                rect(currentTile.x, currentTile.y, this.sizeOfSquare, this.sizeOfSquare);

                if (currentTile.piece && currentTile.piece.type == "pawn") {
                    ellipse(currentTile.x, currentTile.y, 40, 40);
                }
            }
        }
    }

}