import { COLOUR } from './constants.js';
import King from './King.js';
export default class CheckFinder {
  
    static isCurrentPlayerInCheck(tiles, player) {
        const kingPosition = this.getCurrentPlayersKing(tiles, player);        
        const moves = this.getAllMovesForEnemyPlayer(tiles, player);

        for (let move of moves) {
            if (move.x == kingPosition.x && move.y == kingPosition.y) {
                console.log('Checked');
                return true;
            }
        }
        return false;
    }

    static getCurrentPlayersKing(tiles, player) {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) { 
                if (tiles[i][j] instanceof King && tiles[i][j].colour === player) {
                    return tiles[i][j];
                }
            }
        }
    }

    static getAllMovesForEnemyPlayer(tiles, player) {
        let enemy = player === COLOUR.WHITE ? COLOUR.BLACK : COLOUR.WHITE;
        let moves = [];

        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) { 
                if (tiles[i][j] && tiles[i][j].colour === enemy) {
                    moves.push(...tiles[i][j].findMoves(tiles));
                }
            }
        }
        return moves;
    }

    static findMovesForCheckedPlayer(tiles, player) {
        
        let legalMoves = [];
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) { 
                if (tiles[i][j] && tiles[i][j].colour === player) {
                    const moves = tiles[i][j].findMoves(tiles);
                    for (let move of moves) {
                        if (this.moveTakesPlayerOutOfCheck(i, j, move.x, move.y, tiles, player)) {
                            legalMoves.push(move);
                        }
                    }
                }
            }
        }
        return legalMoves;
    }

    static moveTakesPlayerOutOfCheck(fromX, fromY, toX, toY, tiles, player) {
        const toTile = tiles[toX][toY];
        tiles[fromX][fromY].move(toX, toY, tiles);
        let isOutOfCheck = false;
        if (!this.isCurrentPlayerInCheck(tiles, player)) {
            isOutOfCheck = true;
        }
        tiles[toX][toY].move(fromX, fromY, tiles); // move back
        tiles[toX][toY] = toTile;
        return isOutOfCheck;
    }
}