import { buildPieces, _pieces, initPieces } from "./setup.js";
import { _currentPiece, _mouse, initMouseAndPiece } from "./game.js";

export const PUZZLE_ROWS = 2;
export const PUZZLE_COLUMNS = 3;

export var _canvas;
export var _stage;

export var _img;

export var _puzzleWidth;
export var _puzzleHeight;
export var _pieceWidth;
export var _pieceHeight;


function setCanvas() {
    _canvas = document.getElementById('canvas');
    _stage = _canvas.getContext('2d');
    _canvas.width = _puzzleWidth;
    _canvas.height = _puzzleHeight;
    _canvas.style.border = "1px solid black";
}


function init() {
    _img = new Image();
    _img.addEventListener('load', onImage, false);
    _img.src = "wind.jpg";
}

function createTitle(msg) {
    _stage.fillStyle = "#000000";
    _stage.globalAlpha = .4;
    _stage.fillRect(100, _puzzleHeight - 40, _puzzleWidth - 200, 40);
    _stage.fillStyle = "#FFFFFF";
    _stage.globalAlpha = 1;
    _stage.textAlign = "center";
    _stage.textBaseline = "middle";
    _stage.font = "20px Arial";
    _stage.fillText(msg, _puzzleWidth / 2, _puzzleHeight - 20);
}


export function initPuzzle() {
    initPieces();
    initMouseAndPiece();
    _stage.drawImage(_img, 0, 0, _puzzleWidth, _puzzleHeight, 0, 0, _puzzleWidth, _puzzleHeight);
    createTitle("Click to Start Puzzle");
    buildPieces();
}

function onImage(e) {
    _pieceWidth = Math.floor(_img.width / PUZZLE_COLUMNS)
    _pieceHeight = Math.floor(_img.height / PUZZLE_ROWS)
    _puzzleWidth = _pieceWidth * PUZZLE_COLUMNS;
    _puzzleHeight = _pieceHeight * PUZZLE_ROWS;
    setCanvas();
    initPuzzle();
}



init();