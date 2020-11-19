
import Board from '../js/Board.js';
import { SIZE, COLOUR } from '../js/constants.js';
import Knight from '../js/Knight.js';
describe('Find moves on empty board', () => {
    const board = new Board();
    let emptyTiles;
    beforeEach(() => {
        emptyTiles = board.createEmptyBoard();
    });

    test('Should find 2 moves as white knight at the bottom left of board', () => {
        // given
        const knight = new Knight(0, 7, COLOUR.WHITE);
        emptyTiles[0][7] = knight;

        // when
        const upRightMoves = knight.findMoves(emptyTiles);

        // then
        expect(upRightMoves.length).toBe(2);
    });

    
    test('Should find 2 moves as white knight at the bottom right of board', () => {
        // given
        const knight = new Knight(7, 7, COLOUR.WHITE);
        emptyTiles[7][7] = knight;

        // when
        const upRightMoves = knight.findMoves(emptyTiles);

        // then
        expect(upRightMoves.length).toBe(2);
    });

        
    test('Should find 2 moves as white knight at the top right of board', () => {
        // given
        const knight = new Knight(7, 0, COLOUR.WHITE);
        emptyTiles[7][0] = knight;

        // when
        const upRightMoves = knight.findMoves(emptyTiles);

        // then
        expect(upRightMoves.length).toBe(2);
    });


        
    test('Should find 2 moves as white knight at the top left of board', () => {
        // given
        const knight = new Knight(0, 0, COLOUR.WHITE);
        emptyTiles[0][0] = knight;

        // when
        const upRightMoves = knight.findMoves(emptyTiles);

        // then
        expect(upRightMoves.length).toBe(2);
    });

    
    test('Should find 2 moves as white knight at the top left of board and one possible move is an attack', () => {
        // given
        const knight = new Knight(0, 0, COLOUR.WHITE);
        emptyTiles[0][0] = knight;

        const enemyKnight = new Knight(1, 2, COLOUR.BLACK);
        emptyTiles[1][2] = enemyKnight;

        // when
        const upRightMoves = knight.findMoves(emptyTiles);

        // then
        expect(upRightMoves.length).toBe(2);
    });

});




