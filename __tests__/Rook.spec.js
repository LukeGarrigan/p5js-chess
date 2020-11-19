
import Board from '../js/Board.js';
import { SIZE, COLOUR } from '../js/constants.js';
import Pawn from '../js/Pawn.js';
import Rook from '../js/Rook.js';

describe('Finding moves', () => {
    let tiles;
    beforeEach(() => {
        tiles = new Board().tiles;
    });

    test('Should find no forward moves as a pawn is in the way', () => {
        expect(tiles[0][7].findForwardMoves(tiles).length).toBe(0);
    });

    test('Should find 5 legal moves if the pawn in front is not there', () => {
        tiles[0][6] = undefined;
        expect(tiles[0][7].findBackwardMoves(tiles).length).toBe(6);
    });

    test('Should find 4 legal moves when blocked by black pawn so can go back and go right', () => {
        tiles[0][2] = new Rook(0, 2, COLOUR.WHITE);
        expect(tiles[0][2].findMoves(tiles).length).toBe(11);
    });

    test('Should find one attacking move if the pawn in front is enemy', () => {
        tiles[0][6].colour = COLOUR.BLACK;
        expect(tiles[0][7].findBackwardMoves(tiles).length).toBe(1);
    });
});


describe('Attacking moves', () => {
    let tiles;
    beforeEach(() => {
        const board = new Board();
        tiles = board.createEmptyBoard();
    });

    test('Should find two attacking moves if trapped in the top-left corner by two enemy pieces', () => {
        const rook = new Rook(0, 0, COLOUR.WHITE);
        const enemyPawn = new Pawn(0, 1, COLOUR.BLACK);
        const enemyKnight = new Pawn(1, 0, COLOUR.BLACK);

        tiles[0][0] = rook;
        tiles[0][1] = enemyPawn;
        tiles[1][0] = enemyKnight;

        expect(rook.findMoves(tiles).length).toBe(2);
    });

    
    test('Should find two attacking moves if trapped in the top-right corner by two enemy pieces', () => {
        const rook = new Rook(0, 7, COLOUR.WHITE);
        const enemyPawn = new Pawn(0, 6, COLOUR.BLACK);
        const enemyKnight = new Pawn(1, 7, COLOUR.BLACK);

        tiles[0][7] = rook;
        tiles[0][6] = enemyPawn;
        tiles[1][7] = enemyKnight;

        expect(rook.findMoves(tiles).length).toBe(2);
    });


});






