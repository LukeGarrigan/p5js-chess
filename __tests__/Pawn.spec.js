
import Board from '../js/Board.js';
import { SIZE, COLOUR } from '../js/constants.js';
import Pawn from '../js/Pawn.js';

describe('Finding moves', () => {
    let tiles;
    beforeEach(() => {
        tiles = new Board().tiles;
    });

    test('Should find legal move for black in starting position', () => {
        const pawn = new Pawn(1, 1, COLOUR.BLACK);
        pawn.hasMoved = true;
        const legalMoves = pawn.findMoves(tiles);
        expect(legalMoves.length).toBe(1);

        expect(legalMoves[0].x).toBe(pawn.x);
        expect(legalMoves[0].y).toBe(pawn.y+1);
    });

    test('Should find legal move for white in starting position', () => {
        const pawn = new Pawn(1, 6, COLOUR.WHITE);
        pawn.hasMoved = true;
        const legalMoves = pawn.findMoves(tiles);
        expect(legalMoves.length).toBe(1);

        expect(legalMoves[0].x).toBe(pawn.x);
        expect(legalMoves[0].y).toBe(pawn.y-1);
    });

    test('Should not find a legal move if there is a piece in front of black', () => {
        tiles[1][2] = new Pawn(1, 2, COLOUR.BLACK);
        const pawn = new Pawn(1, 1, COLOUR.BLACK);
        pawn.hasMoved = true;
        const legalMoves = pawn.findMoves(tiles);
        expect(legalMoves.length).toBe(0);
    });

    test('Should not find a legal move if there is a piece in front of white', () => {
        tiles[1][5] = new Pawn(1, 5, COLOUR.WHITE);
        const pawn = new Pawn(1, 6, COLOUR.WHITE);
        pawn.hasMoved = true;
        const legalMoves = pawn.findMoves(tiles);
        expect(legalMoves.length).toBe(0);
    });

    test('Should find two possible moves if the white pawn hasn\'t yet moved', () => {
        const pawn = new Pawn(1, 6, COLOUR.WHITE);
        const legalMoves = pawn.findMoves(tiles);
        expect(legalMoves.length).toBe(2);

        expect(legalMoves[0].x).toBe(1);
        expect(legalMoves[1].x).toBe(1);
        expect(legalMoves[0].y).toBe(5);
        expect(legalMoves[1].y).toBe(4);
    });

    test('Should find two possible moves if the black pawn hasn\'t yet moved', () => {
        const pawn = new Pawn(1, 1, COLOUR.BLACK);
        const legalMoves = pawn.findMoves(tiles);
        expect(legalMoves.length).toBe(2);

        expect(legalMoves[0].x).toBe(1);
        expect(legalMoves[1].x).toBe(1);
        expect(legalMoves[0].y).toBe(2);
        expect(legalMoves[1].y).toBe(3);
    });

    test('Should find no legal moves if enemy pawn in front', () => {
        // given
        const pawnInFront = new Pawn(1, 5, COLOUR.BLACK);
        tiles[1][5] = pawnInFront;
        const pawn = new Pawn(1, 6, COLOUR.WHITE);

        // when
        const legalMoves = pawn.findMoves(tiles);

        // then 
        expect(legalMoves.length).toBe(0);
    });


    test('Should not be able to jump over pieces on the first move', () => {
        // given
        const pawnInFront = new Pawn(1, 5, COLOUR.WHITE);
        tiles[1][5] = pawnInFront;
        const pawn = new Pawn(1, 6, COLOUR.WHITE);

        // when
        const legalMoves = pawn.findMoves(tiles);

        // then 
        expect(legalMoves.length).toBe(0);
    });

    test('Should show 3 legal moves if enemy pawn diagonal to current pawn that hasnt yet move', () => {
        // given
        const diagonalPawn = new Pawn(2, 5, COLOUR.BLACK);
        tiles[2][5] = diagonalPawn;
        const pawn = new Pawn(1, 6, COLOUR.WHITE);

        // when
        const legalMoves = pawn.findMoves(tiles);

        // then 
        expect(legalMoves.length).toBe(3);
    });


    test('Should show 2 legal if a side pawn', () => {
        // given
        const pawn = new Pawn(0, 6, COLOUR.WHITE);

        // when
        const legalMoves = pawn.findMoves(tiles);

        // then 
        expect(legalMoves.length).toBe(2);
    });



});






