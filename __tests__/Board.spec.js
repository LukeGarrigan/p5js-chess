
import Board from "../Board.js";
import { SIZE, COLOUR } from "../constants.js";
import Pawn from "../Pawn.js";

describe('Creating the tiles', () => {
    let board;
    beforeEach(() => {
        board = new Board();
    })
    test("Should create tiles", () => {

        expect(board.tiles.length).toBe(8);
        for (let i = 0; i < 8; i++) {
            expect(board.tiles[i].length).toBe(8);
        }
    });
})


describe('Creating the pieces', () => {
    let board;
    beforeEach(() => {
        board = new Board();
    })
    test('Should create black players pawns', () => {
        for (let i = 0; i < 8; i++) {
            const tileWithPawn = board.tiles[i][1];
            expect(tileWithPawn).toStrictEqual(new Pawn(i, 1, COLOUR.BLACK));
        }
    });

    test('Should create white players pawns', () => {
        for (let i = 0; i < 8; i++) {
            const tileWithPawn = board.tiles[i][6];
            expect(tileWithPawn).toStrictEqual(new Pawn(i, 6, COLOUR.WHITE));
        }
    });
})



