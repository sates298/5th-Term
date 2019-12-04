import { initPuzzle, _stage, _canvas, _pieceWidth, _pieceHeight, _puzzleHeight, _puzzleWidth, _spieceWidth, _spieceHeight, _spuzzleHeight, _spuzzleWidth, _ocImg} from "./init.js";
import { _red, _pieces } from "./setup.js";

const PUZZLE_HOVER_TINT = '#009900';

export var _mouse;
export var _currentPiece;

export function initMouseAndPiece() {
    _mouse = { x: 0, y: 0 };
    _currentPiece = null;
}

export function onPuzzleClick(e) {
    if (e.layerX || e.layerX == 0) {
        _mouse.x = e.layerX - _canvas.offsetLeft;
        _mouse.y = e.layerY - _canvas.offsetTop;
    }
    else if (e.offsetX || e.offsetX == 0) {
        _mouse.x = e.offsetX - _canvas.offsetLeft;
        _mouse.y = e.offsetY - _canvas.offsetTop;
    }
    _currentPiece = checkPiece();
    if (_currentPiece != null) {
        document.onmouseup = pieceDropped;
    }
}

function checkPiece() {
    var i;
    var piece;
    for (i = 0; i < _pieces.length; i++) {
        piece = _pieces[i];
        if (((piece.xPos + _pieceWidth == _red.xPos || piece.xPos - _pieceWidth == _red.xPos) && piece.yPos == _red.yPos) ||
            ((piece.yPos - _pieceHeight == _red.yPos || piece.yPos + _pieceHeight == _red.yPos) && piece.xPos == _red.xPos)) {
            if (_mouse.x < piece.xPos || _mouse.x > (piece.xPos + _pieceWidth) || _mouse.y < piece.yPos || _mouse.y > (piece.yPos + _pieceHeight)) {
                //PIECE NOT HIT
            }
            else {
                return piece;
            }
        }
    }
    return null;
}

export function updatePuzzle(e) {
    if (e.layerX || e.layerX == 0) {
        _mouse.x = e.layerX - _canvas.offsetLeft;
        _mouse.y = e.layerY - _canvas.offsetTop;
    }
    else if (e.offsetX || e.offsetX == 0) {
        _mouse.x = e.offsetX - _canvas.offsetLeft;
        _mouse.y = e.offsetY - _canvas.offsetTop;
    }
    _stage.clearRect(0, 0, _puzzleWidth, _puzzleHeight);
    var i;
    var piece;
    for (i = 0; i < _pieces.length; i++) {
        piece = _pieces[i];
        if (piece == _red) {
            _stage.fillStyle = 'red';
            _stage.fillRect(piece.xPos, piece.yPos, _pieceWidth, _pieceHeight);
        } else {
            _stage.drawImage(_ocImg, piece.sx, piece.sy, _spieceWidth, _spieceHeight, piece.xPos, piece.yPos, _pieceWidth, _pieceHeight);
            _stage.strokeRect(piece.xPos, piece.yPos, _pieceWidth, _pieceHeight);
        }
        if (piece == checkPiece()) {
            _stage.save();
            _stage.globalAlpha = .4;
            _stage.fillStyle = PUZZLE_HOVER_TINT;
            _stage.fillRect(piece.xPos, piece.yPos, _pieceWidth, _pieceHeight);
            _stage.restore();
        }
    }
}

function pieceDropped(e) {
    document.onmouseup = null;
    swapWithRed(_currentPiece);
    resetPuzzleAndCheckWin();
}

export function swapWithRed(piece){
    var tmp = { xPos: piece.xPos, yPos: piece.yPos };
    piece.xPos = _red.xPos;
    piece.yPos = _red.yPos;
    _red.xPos = tmp.xPos;
    _red.yPos = tmp.yPos;
}

function resetPuzzleAndCheckWin() {
    _stage.clearRect(0, 0, _puzzleWidth, _puzzleHeight);
    var gameWin = true;
    var i;
    var piece;
    for (i = 0; i < _pieces.length; i++) {
        piece = _pieces[i];
        if (piece != _red) {
            _stage.drawImage(_ocImg, piece.sx, piece.sy, _spieceWidth, _spieceHeight, piece.xPos, piece.yPos, _pieceWidth, _pieceHeight);
            _stage.strokeRect(piece.xPos, piece.yPos, _pieceWidth, _pieceHeight);
        } else {
            _stage.fillStyle = 'red';
            _stage.fillRect(piece.xPos, piece.yPos, _pieceWidth, _pieceHeight)
        }
        if (piece.xPos != piece.fx || piece.yPos != piece.fy) {
            gameWin = false;
        }
    }
    if (gameWin) {
        setTimeout(gameOver, 500);
    }
}

function gameOver() {
    document.onmousedown = null;
    document.onmousemove = null;
    document.onmouseup = null;
    initPuzzle();
}
