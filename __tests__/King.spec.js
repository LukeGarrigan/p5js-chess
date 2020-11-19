
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
        expect(upRightMoves.length).toBe(4);        
    });


    test('Should find 2 moves as white king at the bottom left of board', () => {
        // given
        const king = new King(0, 7, COLOUR.WHITE);
        emptyTiles[0][7] = king;

        // when
        const upRightMoves = king.findMoves(emptyTiles);

        // then
        expect(upRightMoves.length).toBe(2);
    });


    test('Should find 2 moves as white king at the bottom left of board blocked by a rook', () => {
        // given
        const king = new King(0, 7, COLOUR.WHITE);
        emptyTiles[0][7] = king;

        const rook = new Rook(1, 7, COLOUR.BLACK);
        emptyTiles[1][7] = rook;

        // when
        const upRightMoves = king.findMoves(emptyTiles);

        // then
        expect(upRightMoves.length).toBe(2);
    });



});




