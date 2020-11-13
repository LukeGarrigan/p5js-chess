
import Board from "../Board.js";
import { SIZE, COLOUR } from "../constants.js";
import Pawn from "../Pawn.js";

describe('Finding moves', () => {
    let tiles;
    beforeEach(() => {
        tiles = new Board().tiles;
    })

    test("Should find legal move for black in starting position", () => {
        const pawn = new Pawn(1, 1, COLOUR.BLACK);
        const legalMoves = pawn.findLegalMoves(tiles);
        expect(legalMoves.length).toBe(1);

        expect(legalMoves[0].x).toBe(pawn.x);
        expect(legalMoves[0].y).toBe(pawn.y+1);
    });

    test("Should find legal move for white in starting position", () => {
        const pawn = new Pawn(1, 6, COLOUR.WHITE);
        const legalMoves = pawn.findLegalMoves(tiles);
        expect(legalMoves.length).toBe(1);

        expect(legalMoves[0].x).toBe(pawn.x);
        expect(legalMoves[0].y).toBe(pawn.y-1);
    });

    test("Should not find a legal move if there is a piece in front of black", () => {
        tiles[1][2] = new Pawn(1, 2, COLOUR.BLACK);

        const pawn = new Pawn(1, 1, COLOUR.BLACK);
        const legalMoves = pawn.findLegalMoves(tiles);
        expect(legalMoves.length).toBe(0);
    });

    test("Should not find a legal move if there is a piece in front of white", () => {
        tiles[1][5] = new Pawn(1, 5, COLOUR.WHITE);

        const pawn = new Pawn(1, 6, COLOUR.WHITE);
        const legalMoves = pawn.findLegalMoves(tiles);
        expect(legalMoves.length).toBe(0);
    });


})






