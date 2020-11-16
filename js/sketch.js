import Board from './Board.js';
import {SIZE} from './constants.js';
let board;

window.setup = () => {
    createCanvas(SIZE, SIZE);
    board = new Board();
};

window.draw = () => {
    background(220);
    board.draw();
};

window.onclick = function(evt) {
    const x = evt.clientX;
    const y = evt.clientY;
    board.userClick(x, y);
};