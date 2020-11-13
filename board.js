import {COLOUR, SIZE} from "./constants.js";
import Pawn from "./Pawn.js";

export default class Board {

    constructor() {
        this.sizeOfSquare = SIZE / 8;
        this.tiles = this.createTiles();
        this.selected = {x: 1, y: 1};
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
        let offset = this.sizeOfSquare/2;
        rectMode(CENTER);
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const currentTile = this.tiles[i][j];
                const x =  i * this.sizeOfSquare + offset;
                const y = j * this.sizeOfSquare + offset;
                rect(x, y, this.sizeOfSquare, this.sizeOfSquare);

                if (currentTile instanceof Pawn) {
                    push();
                    if (currentTile.colour == COLOUR.BLACK) {
                        ellipse(x, y, 40, 40);
                    } else {
                        fill(0);
                        ellipse(x, y, 40, 40);
                    }
                    pop();
                }
            }
        }

/*         const selectedTile = this.tiles[this.selected.x][this.selected.y];
        let legalMoves = selectedTile.piece.findLegalMoves(this.tiles);
        push();
        fill(255,100,50);
        const legalMoveTile = this.tiles[legalMoves[0].x][legalMoves[0].y];
        
        rect(legalMoveTile.x, legalMoveTile.y, this.sizeOfSquare, this.sizeOfSquare)
        pop(); */
    }

}