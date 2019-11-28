import { PUZZLE_COLUMNS, PUZZLE_ROWS , _puzzleWidth, _puzzleHeight, _pieceHeight, _pieceWidth, _stage, _img} from "./init.js";
import {  updatePuzzle, onPuzzleClick, swapWithRed} from "./game.js";

const PUZZLE_START_SHUFFLE = 10;

export var _pieces;
export var _red;

export function initPieces() {
    _pieces = [];
} 

export function buildPieces() {
    var i;
    var piece;
    var xPos = 0;
    var yPos = 0;
    for (i = 0; i < PUZZLE_COLUMNS * PUZZLE_ROWS; i++) {
        piece = {};
        piece.sx = xPos;
        piece.sy = yPos;
        piece.xPos = xPos;
        piece.yPos = yPos;
        if (i == 0) {
            _red = piece;
        }
        _pieces.push(piece);
        xPos += _pieceWidth;
        if (xPos >= _puzzleWidth) {
            xPos = 0;
            yPos += _pieceHeight;
        }
    }
    document.onmousedown = shufflePuzzle;
}

function shufflePuzzle() {
    _stage.clearRect(0, 0, _puzzleWidth, _puzzleHeight);
    var i;
    var j;
    var piece;
    for(j = 0; j < PUZZLE_START_SHUFFLE*PUZZLE_COLUMNS*PUZZLE_ROWS; j++){
        randomCorrectPiece();
    }

    for (i = 0; i < _pieces.length; i++) {
        piece = _pieces[i];
        if (piece == _red) {
            _stage.fillStyle = 'red';
            _stage.fillRect(piece.xPos, piece.yPos, _pieceWidth, _pieceHeight)
        } else {
            _stage.drawImage(_img, piece.sx, piece.sy, _pieceWidth, _pieceHeight, piece.xPos, piece.yPos, _pieceWidth, _pieceHeight);
            _stage.strokeRect(piece.xPos, piece.yPos, _pieceWidth, _pieceHeight);
        }
    }

    document.onmousedown = onPuzzleClick;
    document.onmousemove = updatePuzzle;
}

function randomCorrectPiece(){
    var i;
    var piece;
    var ngbrs = [];
    for(i = 0; i < _pieces.length; i++){
        piece = _pieces[i];
        if (((piece.xPos + _pieceWidth == _red.xPos || piece.xPos - _pieceWidth == _red.xPos) && piece.yPos == _red.yPos) ||
            ((piece.yPos - _pieceHeight == _red.yPos || piece.yPos + _pieceHeight == _red.yPos) && piece.xPos == _red.xPos)) {
                ngbrs.push(piece);
            }
    }
    var tmp = null;
    var c;
    while(tmp == null){
        c = Math.floor(Math.random()*ngbrs.length);
        tmp = ngbrs[c];
    }
    swapWithRed(tmp);
}




