
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

    test("Should create tiles", () => {
        const firstTile = board.tiles[0][0];
        const lastTile = board.tiles[7][7];

        expect(firstTile.x).toBe(50);
        expect(firstTile.y).toBe(50);

        expect(lastTile.x).toBe((SIZE / 8) * 7 + 50);
        expect(lastTile.y).toBe((SIZE / 8) * 7 + 50);
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
            expect(tileWithPawn.piece).toStrictEqual(new Pawn(i, 1, COLOUR.BLACK));
        }
    });

    test('Should create white players pawns', () => {
        for (let i = 0; i < 8; i++) {
            const tileWithPawn = board.tiles[i][6];
            expect(tileWithPawn.piece).toStrictEqual(new Pawn(i, 6, COLOUR.WHITE));
        }
    });
})



