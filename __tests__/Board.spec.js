
import Board from "../Board.js";
import {SIZE} from "../constants.js";

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
    
        expect(firstTile.x).toBe(0);
        expect(firstTile.y).toBe(0);
    
        expect(lastTile.x).toBe((SIZE /  8) * 7);
        expect(lastTile.y).toBe((SIZE /  8) * 7);
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
            expect(tileWithPawn.piece.type).toBe("pawn");
        }
    });

    test('Should create white players pawns', () => {
        for (let i = 0; i < 8; i++) {
            const tileWithPawn = board.tiles[0][6];
            expect(tileWithPawn.piece.type).toBe("pawn");
        }
    });
})



