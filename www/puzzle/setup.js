import {  _puzzleWidth, _puzzleHeight, _pieceHeight, _pieceWidth, _spuzzleWidth, _spuzzleHeight, _spieceHeight, _spieceWidth, _stage, _ocImg} from "./init.js";
import {  updatePuzzle, onPuzzleClick, swapWithRed} from "./game.js";
import {PUZZLE_COLUMNS, PUZZLE_ROWS , button} from "./user.js";

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
    var sx = 0;
    var sy = 0;
    for (i = 0; i < PUZZLE_COLUMNS * PUZZLE_ROWS; i++) {
        piece = {};
        piece.sx = sx;
        piece.sy = sy;
        piece.fx = xPos;
        piece.fy = yPos;
        piece.xPos = xPos;
        piece.yPos = yPos;
        if (i == 0) {
            _red = piece;
        }
        _pieces.push(piece);

        sx += _spieceWidth;
        if (sx >= _spuzzleWidth) {
            sx = 0;
            sy += _spieceHeight;
        }
        xPos += _pieceWidth;
        if (xPos >= _puzzleWidth) {
            xPos = 0;
            yPos += _pieceHeight;
        }
    }
}

export function shufflePuzzle() {
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
            _stage.drawImage(_ocImg, piece.sx, piece.sy, _spieceWidth, _spieceHeight, piece.xPos, piece.yPos, _pieceWidth, _pieceHeight);
            _stage.strokeRect(piece.xPos, piece.yPos, _pieceWidth, _pieceHeight);
        }
    }
    document.onmouseup = null;
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
