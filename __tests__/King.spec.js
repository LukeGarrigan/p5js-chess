
import Board from '../js/Board.js';
import { SIZE, COLOUR } from '../js/constants.js';
import King from '../js/King.js';
import Rook from '../js/Rook.js';
import Bishop from '../js/Bishop.js';
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
    
    

    test('Should not find castle moves because king has moved', () => {
        // given
        board.turn = COLOUR.BLACK;
        const king = new King(4, 0, COLOUR.BLACK); 
        king.hasMoved = true;
        emptyTiles[4][0] = king;
        emptyTiles[0][0] = new Rook(0, 0, COLOUR.BLACK);

        // when
        const moves = king.getCastleMoves(emptyTiles);

        // then
        expect(moves.length).toBe(0);
    });


    test('Should not find castle moves because rook has moved', () => {
        // given
        board.turn = COLOUR.BLACK;
        const king = new King(4, 0, COLOUR.BLACK); 
        const rook = new Rook(0, 0, COLOUR.BLACK);
        rook.hasMoved = true;
        emptyTiles[4][0] = king;
        emptyTiles[0][0] = rook;

        // when
        const moves = king.getCastleMoves(emptyTiles);

        // then
        expect(moves.length).toBe(0);
    });


  
    test('Should not find castle if in check', () => {
        // given
        board.turn = COLOUR.BLACK;
        const king = new King(4, 0, COLOUR.BLACK); 
        const rook = new Rook(0, 0, COLOUR.BLACK);
        const enemyRook = new Rook(4, 7, COLOUR.WHITE);

        emptyTiles[4][0] = king;
        emptyTiles[0][0] = rook;
        emptyTiles[4][7] = enemyRook;

        // when
        const moves = king.findLegalMoves(emptyTiles);

        // then
        expect(moves.length).toBe(4);
    }); 

    test('Should find one castle move', () => {
        // given
        board.turn = COLOUR.BLACK;
        const king = new King(4, 0, COLOUR.BLACK); 
        const rook = new Rook(0, 0, COLOUR.BLACK);
        emptyTiles[4][0] = king;
        emptyTiles[0][0] = rook;

        // when
        const moves = king.getCastleMoves(emptyTiles);

        // then
        expect(moves.length).toBe(1);
    });

    
    test('Should find two castle moves', () => {
        // given
        board.turn = COLOUR.BLACK;
        const king = new King(4, 0, COLOUR.BLACK); 
        const rook = new Rook(0, 0, COLOUR.BLACK);
        const rook2 = new Rook(7, 0, COLOUR.BLACK);
        emptyTiles[4][0] = king;
        emptyTiles[0][0] = rook;
        emptyTiles[7][0] = rook2;

        // when
        const moves = king.getCastleMoves(emptyTiles);

        // then
        expect(moves.length).toBe(2);
    });



    test('Should not find a castle move as there is a bishop blocking', () => {
        // given
        board.turn = COLOUR.BLACK;
        const king = new King(4, 0, COLOUR.BLACK); 
        const rook = new Rook(0, 0, COLOUR.BLACK);
        const bishop = new Bishop(2, 0, COLOUR.BLACK);
        emptyTiles[4][0] = king;
        emptyTiles[0][0] = rook;
        emptyTiles[2][0] = bishop;

        // when
        const moves = king.getCastleMoves(emptyTiles);

        // then
        expect(moves.length).toBe(0);
    });


    test('If move is a long castle, should put the rook the otherside of the King', () => {
        board.turn = COLOUR.BLACK;
        const king = new King(4, 0, COLOUR.BLACK); 
        const rook = new Rook(0, 0, COLOUR.BLACK);
        emptyTiles[4][0] = king;
        emptyTiles[0][0] = rook;

        king.move(2, 0, emptyTiles);

        expect(rook.x).toBe(3);
    });

    test('If move is a short castle, should put the rook the otherside of the King', () => {
        board.turn = COLOUR.BLACK;
        const king = new King(4, 0, COLOUR.BLACK); 
        const rook = new Rook(7, 0, COLOUR.BLACK);
        emptyTiles[4][0] = king;
        emptyTiles[7][0] = rook;

        king.move(6, 0, emptyTiles);

        expect(rook.x).toBe(5);
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







