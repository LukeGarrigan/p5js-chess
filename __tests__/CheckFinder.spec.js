
import Board from '../js/Board.js';
import { SIZE, COLOUR } from '../js/constants.js';
import King from '../js/King.js';
import Pawn from '../js/Pawn.js';
import Queen from '../js/Queen.js';
import CheckFinder from '../js/CheckFinder.js';


describe('Player in Check', () => {
    let board;

    beforeEach(() => {
        board = new Board();
        board.tiles = board.createEmptyBoard();
    });

    test('Should not retrieve king as king doesn\'t exist', () => {
        const king = CheckFinder.getCurrentPlayersKing(board.tiles, COLOUR.WHITE);
        expect(king).toBe(undefined);
    });

    test('Should retrieve the current king', () => {
        board.tiles[0][0] = new King(0, 0, COLOUR.WHITE);

        const king = CheckFinder.getCurrentPlayersKing(board.tiles, COLOUR.WHITE);
        expect(king instanceof King);
        expect(king.x).toBe(0);
        expect(king.y).toBe(0);
        expect(king.colour).toBe(COLOUR.WHITE);
    });

    test('White should be in check if white pawn can attack', () => {
        board.turn = COLOUR.BLACK;
        board.tiles[0][0] = new King(0, 0, COLOUR.BLACK);
        const pawn = new Pawn(1, 1, COLOUR.WHITE);
        pawn.hasMoved = true;
        board.tiles[1][1] = pawn;

        expect(CheckFinder.isCurrentPlayerInCheck(board.tiles, COLOUR.BLACK)).toBeTruthy();
    });

    test('Should only be one move if blocked in by a queen', () => {
        board.turn = COLOUR.BLACK;
        board.tiles[0][0] = new King(0, 0, COLOUR.BLACK);
        const queen = new Queen(1, 1, COLOUR.WHITE);
        board.tiles[1][1] = queen;
        expect(CheckFinder.findMovesForCheckedPlayer(board.tiles, COLOUR.BLACK).length).toBe(1);
    });

    test('Should find zero moves as move would result in being checked again', () => {
        board.turn = COLOUR.BLACK;
        board.tiles[0][0] = new King(0, 0, COLOUR.BLACK);
        const queen = new Queen(1, 1, COLOUR.WHITE);
        const queen2 = new Queen(0, 1, COLOUR.WHITE);
        board.tiles[1][1] = queen;
        board.tiles[0][1] = queen2;
        expect(CheckFinder.findMovesForCheckedPlayer(board.tiles, COLOUR.BLACK).length).toBe(0);
    });


});


