
import Board from '../js/Board.js';
import { SIZE, COLOUR } from '../js/constants.js';
import Rook from '../js/Rook.js';

describe('Finding moves', () => {
    let tiles;
    beforeEach(() => {
        tiles = new Board().tiles;
    });

    test('Should find no forward moves as a pawn is in the way', () => {
        expect(tiles[0][7].findForwardMoves(tiles).length).toBe(0);
    });

    test('Should find 5 legal moves if the pawn in front is not there', () => {
        tiles[0][6] = undefined;
        expect(tiles[0][7].findBackwardMoves(tiles).length).toBe(5);
    });
    
    test('Should find 4 legal moves when blocked by black pawn so can go back and go right', () => {
        tiles[0][2] = new Rook(0, 2, COLOUR.WHITE);
        expect(tiles[0][2].findMoves(tiles).length).toBe(10);
    });
});






