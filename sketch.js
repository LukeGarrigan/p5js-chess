const size = 800;
let board;
function setup() {
    createCanvas(size, size);
    board = new Board();


}

function draw() {
    background(220);
    board.draw();
}