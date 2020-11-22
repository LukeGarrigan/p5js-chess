
import Board from '../js/Board.js';
import { SIZE, COLOUR } from '../js/constants.js';
import King from '../js/King.js';
import Rook from '../js/Rook.js';
describe('Find moves on empty board', () => {
    const board = new Board();
    let emptyTiles;
    beforeEach(() => {
        emptyTiles = board.createEmptyBoard();
    });


    test('Should find 4 moves if in centre of the board', () => {
        // given
        const king = new King(3, 3, COLOUR.WHITE);
        emptyTiles[3][3] = king;

        // when
        const upRightMoves = king.findMoves(emptyTiles);

        // then
        expect(upRightMoves.length).toBe(8);        
    });


    test('Should find 3 moves as white king at the bottom left of board', () => {
        // given
        const king = new King(0, 7, COLOUR.WHITE);
        emptyTiles[0][7] = king;

        // when
        const upRightMoves = king.findMoves(emptyTiles);

        // then
        expect(upRightMoves.length).toBe(3);
    });

    test('Should find 3 moves as white king at the bottom right of board', () => {
        // given
        const king = new King(7, 7, COLOUR.WHITE);
        emptyTiles[7][7] = king;

        // when
        const upRightMoves = king.findMoves(emptyTiles);

        // then
        expect(upRightMoves.length).toBe(3);
    });

    test('Should find 3 moves as white king at the top right of board', () => {
        // given
        const king = new King(7, 0, COLOUR.WHITE);
        emptyTiles[7][0] = king;

        // when
        const upRightMoves = king.findMoves(emptyTiles);

        // then
        expect(upRightMoves.length).toBe(3);
    });


    test('Should find 3 moves as white king at the top left of board', () => {
        // given
        const king = new King(0, 0, COLOUR.WHITE);
        emptyTiles[0][0] = king;

        // when
        const upRightMoves = king.findMoves(emptyTiles);

        // then
        expect(upRightMoves.length).toBe(3);
    });


    test('Should find 3 moves as white king at the bottom left of board blocked by a rook', () => {
        // given
        const king = new King(0, 7, COLOUR.WHITE);
        emptyTiles[0][7] = king;

        const rook = new Rook(1, 7, COLOUR.BLACK);
        emptyTiles[1][7] = rook;

        // when
        const upRightMoves = king.findMoves(emptyTiles);

        // then
        expect(upRightMoves.length).toBe(3);
    });
});

describe('Find legal moves', () => {
    const board = new Board();
    let emptyTiles;
    beforeEach(() => {
        emptyTiles = board.createEmptyBoard();
    });


    test('Should not be able to move into a checked position so should only find one attacking move on rook', () => {
        const king = new King(0, 0, COLOUR.WHITE);
        emptyTiles[0][0] = king;

        const rook = new Rook(1, 1, COLOUR.BLACK);
        emptyTiles[1][1] = rook;


        // when
        const legalMoves = king.findLegalMoves(emptyTiles);
        expect(legalMoves.length).toBe(1);
        expect(legalMoves[0].x).toBe(1);
        expect(legalMoves[0].y).toBe(1);
    });


    test('Should not be able to move into as both files are occupied by enemy player', () => {
        const king = new King(0, 0, COLOUR.WHITE);
        emptyTiles[0][0] = king;

        emptyTiles[1][2] = new Rook(1, 2, COLOUR.BLACK);
        emptyTiles[0][2] = new Rook(0, 2, COLOUR.BLACK);;


        // when
        const legalMoves = king.findLegalMoves(emptyTiles);
        expect(legalMoves.length).toBe(0);
    });


});




