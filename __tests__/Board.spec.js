
import Board from '../js/Board.js';
import { SIZE, COLOUR } from '../js/constants.js';
import King from '../js/King.js';
import Pawn from '../js/Pawn.js';
import Rook from '../js/Rook.js';
import Queen from '../js/Queen.js';

describe('Creating the tiles', () => {
    let board;
    beforeEach(() => {
        board = new Board();
    });
    test('Should create tiles', () => {

        expect(board.tiles.length).toBe(8);
        for (let i = 0; i < 8; i++) {
            expect(board.tiles[i].length).toBe(8);
        }
    });

    test('Should return the x position of the tile', () => {
        let count = 50;
        for (let i = 0; i < 8; i++) {
            expect(board.getPos(i)).toBe(count);
            count += 100;
        }
    });


    test('Should create empty board', () => {

        const emptyBoard = board.createEmptyBoard();

        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                expect(emptyBoard[i][j]).toBeUndefined();
            }
        }
    });
});


describe('Creating the pieces', () => {
    let board;
    beforeEach(() => {
        board = new Board();
    });
    test('Should create black players pawns', () => {
        for (let i = 0; i < 8; i++) {
            const tileWithPawn = board.tiles[i][1];
            expect(tileWithPawn).toStrictEqual(new Pawn(i, 1, COLOUR.BLACK, '♟' ));
        }
    });

    test('Should create white players pawns', () => {
        for (let i = 0; i < 8; i++) {
            const tileWithPawn = board.tiles[i][6];
            expect(tileWithPawn).toStrictEqual(new Pawn(i, 6, COLOUR.WHITE, '♙'));
        }
    });

    test('Should create black rooks', () => {
        expect(board.tiles[0][0] instanceof Rook).toBeTruthy();
        expect(board.tiles[7][0] instanceof Rook).toBeTruthy();
    });

    test('Should create white rooks', () => {
        expect(board.tiles[0][7] instanceof Rook).toBeTruthy();
        expect(board.tiles[7][7] instanceof Rook).toBeTruthy();
    });
});

describe('Selecting pieces', () => {
    let board;
    beforeEach(() => {
        board = new Board();
    });

    test('No tile should be selected to begin with', () => {
        expect(board.selected).toBe(undefined);
    });
    
    test('Should select first pawn', () => {
        board.turn = COLOUR.BLACK;

        board.userClick(100, 100);

        expect(board.selected.x).toBe(1);
        expect(board.selected.y).toBe(1);

    });
    
    test('Should not select as piece doesnt exist', () => {
        board.userClick(300, 300);
        expect(board.selected).toBe(undefined);
    });

    test('Should deselect if clicked off of the board', () => {
        board.turn = COLOUR.BLACK;

        board.userClick(100, 100);

        // when
        board.userClick(900, 900);

        // then
        expect(board.selected).toBe(undefined);
    });

    test('Should deselect if on another tile that isnt a valid move', () => {
        board.turn = COLOUR.BLACK;

        board.userClick(100, 100);
        

        // when
        board.userClick(300, 300);

        // then
        expect(board.selected).toBe(undefined);
    });
    
});


describe('Moving pieces', () => {
    let board;
    beforeEach(() => {
        board = new Board();
    });
    test('Should move selected piece to the selected possible move', () => {
        // select first pawn
        board.turn = COLOUR.BLACK;
        board.userClick(100, 100);
        board.legalMoves = [{x:1, y:2}];
        // select the possible move
        board.userClick(100, 200);

        // should reset selection
        expect(board.selected).toBe(undefined);

        expect(board.tiles[1][2] instanceof Pawn).toBeTruthy();
    });

    test('First move should be white', () => {
        expect(board.turn).toBe(COLOUR.WHITE);
    });

    test('When a move has happened should switch players', () => {
        const pawnToMove = board.tiles[0][6];
        board.move(pawnToMove, {x: 0, y: 7});
        expect(board.turn).toBe(COLOUR.BLACK);
    });

    test('Should move king out of check', () => {
        board.tiles = board.createEmptyBoard();

        const king = new King(0, 0, COLOUR.WHITE, '♔');
        const blackKing = new King(7, 7, COLOUR.BLACK, '♚');
        const rook = new Rook(0, 1, COLOUR.BLACK);

        board.tiles[0][0] = king;
        board.tiles[0][1] = rook;
        board.tiles[7][7] = blackKing;

        board.move({x: 0, y: 0}, {x: 1, y : 0});

        expect(board.tiles[1][0] instanceof King).toBeTruthy();
    });


    // this test will change when I have a proper ending screen
    test('Should log when checkmate', () => {
        // given
        board.tiles = board.createEmptyBoard();
        console.log = jest.fn();
        const blackKing = new King(0, 0, COLOUR.BLACK, '♚');
        const whiteRook = new Rook(2, 1, COLOUR.WHITE);
        const whiteRook2 = new Rook(5, 5, COLOUR.WHITE);

        board.tiles[0][0] = blackKing;
        board.tiles[2][1] = whiteRook;
        board.tiles[5][5] = whiteRook2;

        // when
        board.move({x: 5, y: 5}, {x: 5, y: 0});

        // then
        expect(console.log).toHaveBeenCalledWith('Checkmate');
    });



});



