import {SIZE} from "./constants.js";
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

                if (j == 1 || j == 6) {
                    tiles[i][j] = { x: j * this.sizeOfSquare, y: i * this.sizeOfSquare, piece: new Pawn() };
                } else {
                    tiles[i][j] = { x: j * this.sizeOfSquare, y: i * this.sizeOfSquare };
                }
                
            }
        }
        return tiles;
    }

    draw() {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const currentTile = this.tiles[i][j];
                
                rect(currentTile.x, currentTile.y, this.sizeOfSquare, this.sizeOfSquare);

                if (currentTile.piece && currentTile.piece.type == "pawn") {
                    ellipseMode(CENTER);
                    ellipse(currentTile.x, currentTile.y, 40, 40);
                }

                
            }
        }
    }
}