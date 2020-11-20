
import Queen from '../js/Queen.js';
import Board from '../js/Board.js';
import { SIZE, COLOUR } from '../js/constants.js';
import Pawn from '../js/Pawn.js';
describe('Find moves', () => {
    const board = new Board();
    let emptyTiles;
    beforeEach(() => {
        emptyTiles = board.createEmptyBoard();
    });

    test('Should find 21 moves as white queen at the bottom left of board', () => {
        // given
        const queen = new Queen(0, 7, COLOUR.WHITE);
        emptyTiles[0][7] = queen;

        // when
        const upRightMoves = queen.findMoves(emptyTiles);

        // then
        expect(upRightMoves.length).toBe(21);
    });



    test('Should find 21 moves as white queen at the bottom right of board', () => {
        // given
        const queen = new Queen(7, 7, COLOUR.WHITE);
        emptyTiles[7][7] = queen;

        // when
        const upRightMoves = queen.findMoves(emptyTiles);

        // then
        expect(upRightMoves.length).toBe(21);
    });




    test('Should find 21 moves as white queen at the top right of board', () => {
        // given
        const queen = new Queen(7, 0, COLOUR.WHITE);
        emptyTiles[7][0] = queen;

        // when
        const upRightMoves = queen.findMoves(emptyTiles);

        // then
        expect(upRightMoves.length).toBe(21);
    });


    

    test('Should find 21 moves as white queen at the top left of board', () => {
        // given
        const queen = new Queen(0, 0, COLOUR.WHITE);
        emptyTiles[0][0] = queen;

        // when
        const upRightMoves = queen.findMoves(emptyTiles);

        // then
        expect(upRightMoves.length).toBe(21);
    });
});






