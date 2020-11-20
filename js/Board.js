import Bishop from './Bishop.js';
import {COLOUR, SIZE} from './constants.js';
import Pawn from './Pawn.js';
import Rook from './Rook.js';
import Knight from './Knight.js';
import King from './King.js';
import Queen from './Queen.js';

export default class Board {

    constructor() {
        this.sizeOfSquare = SIZE / 8;
        this.tiles = this.createTiles();
        this.turn = COLOUR.WHITE;
    }

    createTiles() {
        textAlign(CENTER, CENTER);
        textSize(60);
        let tiles = this.createEmptyBoard();

        for (let i = 0; i < 8; i++) { 
            tiles[i][1] = new Pawn(i, 1, COLOUR.BLACK);
            tiles[i][6] = new Pawn(i, 6, COLOUR.WHITE);
        }

        tiles[0][0] = new Rook(0, 7, COLOUR.BLACK);
        tiles[7][0] = new Rook(7, 0, COLOUR.BLACK);
        tiles[0][7] = new Rook(0, 7, COLOUR.WHITE);
        tiles[7][7] = new Rook(7, 7, COLOUR.WHITE);

        tiles[2][0] = new Bishop(2, 0, COLOUR.BLACK);
        tiles[5][0] = new Bishop(5, 0, COLOUR.BLACK);
        tiles[2][7] = new Bishop(2, 7, COLOUR.WHITE);
        tiles[5][7] = new Bishop(5, 7, COLOUR.WHITE);


        tiles[1][0] = new Knight(1, 0, COLOUR.BLACK);
        tiles[6][0] = new Knight(6, 0, COLOUR.BLACK);
        tiles[1][7] = new Knight(1, 7, COLOUR.WHITE);
        tiles[6][7] = new Knight(6, 7, COLOUR.WHITE);

        tiles[4][0] = new King(4, 0, COLOUR.BLACK);
        tiles[4][7] = new King(4, 7, COLOUR.WHITE);

        tiles[3][0] = new Queen(3, 0, COLOUR.BLACK);
        tiles[3][7] = new Queen(3, 7, COLOUR.WHITE);

        return tiles;
    }
    
    createEmptyBoard() {
        let board = [];
        for (let i = 0; i < 8; i++) {
            board[i] = [];
            for (let j = 0; j < 8; j++) {
                board[i][j] = undefined;
            }
        }
        return board;
    }

    draw() {
        rectMode(CENTER);
        for (let i = 0; i < 8; i++) {
            
            for (let j = 0; j < 8; j++) {
                const currentTile = this.tiles[i][j];
                const x =  this.getPos(i);
                const y = this.getPos(j);

                if ((i + j) % 2 != 0) {
                    push();
                    fill(205, 205, 205);
                    rect(x, y, this.sizeOfSquare, this.sizeOfSquare);
                    pop();
                } else {
                    push();
                    fill(255, 255, 255);
                    rect(x, y, this.sizeOfSquare, this.sizeOfSquare);
                    pop();
                }
                

                if (currentTile)  {
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
                this.legalMoves = tile.findMoves(this.tiles);
                push();
                fill(100,255,100, 100);

                for (const move of this.legalMoves) {
                    rect(this.getPos(move.x), this.getPos(move.y), this.sizeOfSquare, this.sizeOfSquare);
                }
                pop(); 
            }
        }
    }

    getPos(index) {
        let offset = this.sizeOfSquare/2;
        return index * this.sizeOfSquare + offset;
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