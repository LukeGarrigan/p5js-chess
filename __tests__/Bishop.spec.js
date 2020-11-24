
import Bishop from '../js/Bishop.js';
import Board from '../js/Board.js';
import { SIZE, COLOUR } from '../js/constants.js';
import Pawn from '../js/Pawn.js';
describe('Diagonal up moves', () => {
    const board = new Board();
    let emptyTiles;
    beforeEach(() => {
        emptyTiles = board.createEmptyBoard();
    });

    test('Should find 7 moves as white bishop at the bottom left of board', () => {
        // given
        const bishop = new Bishop(0, 7, COLOUR.WHITE);
        emptyTiles[0][7] = bishop;

        // when
        const upRightMoves = bishop.findMoves(emptyTiles);

        // then
        expect(upRightMoves.length).toBe(7);
    });

    test('Should find 8 moves as white bishop one up from bottom left of board', () => {
        // given
        const bishop = new Bishop(1, 6, COLOUR.WHITE);
        emptyTiles[1][6] = bishop;

        // when
        const upRightMoves = bishop.findMoves(emptyTiles);

        // then
        expect(upRightMoves.length).toBe(9);
    });
    
    test('Should find 7 moves as white bishop at the bottom right of board', () => {
        // given
        const bishop = new Bishop(7, 7, COLOUR.WHITE);
        emptyTiles[7][7] = bishop;

        // when
        const diagonalRightMoves = bishop.findMoves(emptyTiles);

        // then
        expect(diagonalRightMoves.length).toBe(7);
    });

    
    test('Should only find one attacking move when a pawn diagonal to it', () => {
        // given
        const bishop = new Bishop(0, 7, COLOUR.WHITE);
        emptyTiles[0][7] = bishop;
        emptyTiles[1][6] = new Pawn(1, 6, COLOUR.BLACK);

        // when
        const upRightMoves = bishop.findMoves(emptyTiles);

        // then
        expect(upRightMoves.length).toBe(1);
    });

});


describe('Diagonal down moves', () => {
    const board = new Board();
    let emptyTiles;
    beforeEach(() => {
        emptyTiles = board.createEmptyBoard();
    });

    test('Should find 7 moves as black bishop at the top left of board', () => {
        // given
        const bishop = new Bishop(0, 0, COLOUR.BLACK);
        emptyTiles[0][0] = bishop;

        // when
        const downRightMoves = bishop.findMoves(emptyTiles);

        // then
        expect(downRightMoves.length).toBe(7);
    });

    test('Should find 7 moves as black bishop at the top right of board', () => {
        // given
        const bishop = new Bishop(0, 7, COLOUR.BLACK);
        emptyTiles[0][7] = bishop;

        // when
        const downLeftMoves = bishop.findMoves(emptyTiles);

        // then
        expect(downLeftMoves.length).toBe(7);
    });
});


describe('All directions', () => {
    const board = new Board();
    let emptyTiles;
    beforeEach(() => {
        emptyTiles = board.createEmptyBoard();
    });

    
    test('Should find 13 moves if near center of board', () => {
        // given
        const bishop = new Bishop(3, 3, COLOUR.BLACK);
        emptyTiles[3][3] = bishop;

        // when
        const moves = bishop.findMoves(emptyTiles);

        // then
        expect(moves.length).toBe(13);
    });
});






