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
                    const currentPiece = tiles[i][j];
                    const moves = tiles[i][j].findMoves(tiles);

                    for (let move of moves) {
                        const toTile = tiles[move.x][move.y];
                        currentPiece.move(move.x, move.y, tiles);
                        if (!this.isCurrentPlayerInCheck(tiles, player)) {
                            legalMoves.push(move);
                        }
                        tiles[move.x][move.y].move(i, j, tiles); // move back
                        tiles[move.x][move.y] = toTile;
                    }
                }
            }
        }
        return legalMoves;
    }
}