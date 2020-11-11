
import Board from "../Board.js";
import { SIZE, COLOUR } from "../constants.js";
import Pawn from "../Pawn.js";

describe('Finding moves', () => {
    let board;
    beforeEach(() => {
        board = new Board();
    })
    test("Should find legal move", () => {
        const firstPawn = board.tiles[0][1].piece;

        const legalMoves = firstPawn.findLegalMoves();

        expect(legalMoves.length).toBe(1);

        expect(legalMoves[0].x).toBe(firstPawn.x);
        expect(legalMoves[0].y).toBe(firstPawn.y+1);
    });
})






