class Board {

    constructor() {
        this.sizeOfSquare = size / 8;
        this.tiles = this.createTiles();
    }


    createTiles() {
        let tiles = [];
        for (let i = 0; i < 8; i++) {
            tiles[i] = [];
            for (let j = 0; j < 8; j++) {
                tiles[i][j] = { x: j * this.sizeOfSquare, y: i * this.sizeOfSquare };
            }
        }
        return tiles;
    }

    draw() {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const currentTile = this.tiles[i][j];
                rect(currentTile.x, currentTile.y, this.sizeOfSquare, this.sizeOfSquare);
            }
        }
    }
    
}