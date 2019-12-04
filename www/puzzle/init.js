import { buildPieces, _pieces, initPieces } from "./setup.js";
import { _currentPiece, _mouse, initMouseAndPiece } from "./game.js";
import {PUZZLE_ROWS, PUZZLE_COLUMNS} from "./user.js"

export var _canvas;
export var _stage;

var _img;
export var _ocImg;

export var _puzzleWidth;
export var _puzzleHeight;
export var _pieceWidth;
export var _pieceHeight;
export var _spuzzleWidth;
export var _spuzzleHeight;
export var _spieceWidth;
export var _spieceHeight;

function setCanvas() {
    _canvas = document.getElementById('canvas');
    _stage = _canvas.getContext('2d');
    _canvas.style.border = "1px solid black";

    var x = window.matchMedia("(max-width: 800px)")
    if(x.matches){
        _canvas.width = 300;
    }
}


export function init(imgAddr) {
    _img = new Image();
    _img.addEventListener('load', onImage, false);
    _img.src = imgAddr;
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
    _stage.drawImage(_ocImg, 0, 0, _spuzzleWidth, _spuzzleHeight, 0, 0, _puzzleWidth, _puzzleHeight);
    createTitle("Click to Shuffle Puzzle");
    buildPieces();
}

function onImage(e) {

    setCanvas();

    _canvas.height = _canvas.width * (_img.height / _img.width);

    var oc = document.createElement('canvas'), octx = oc.getContext('2d');

    oc.width = _img.width * 0.5;
    oc.height = _img.height * 0.5;
    octx.drawImage(_img, 0, 0, oc.width, oc.height);
    octx.drawImage(oc, 0, 0, oc.width, oc.height);
    _stage.drawImage(oc, 0, 0, oc.width, oc.height, 0, 0, _canvas.width, _canvas.height);

    _spieceWidth = Math.floor(oc.width / PUZZLE_COLUMNS);
    _spieceHeight = Math.floor(oc.height / PUZZLE_ROWS);
    _spuzzleWidth = _spieceWidth * PUZZLE_COLUMNS;
    _spuzzleHeight = _spieceHeight * PUZZLE_ROWS;


    _pieceWidth = Math.floor(_canvas.width / PUZZLE_COLUMNS);
    _pieceHeight = Math.floor(_canvas.height / PUZZLE_ROWS);
    _puzzleWidth = _pieceWidth * PUZZLE_COLUMNS;
    _puzzleHeight = _pieceHeight * PUZZLE_ROWS;


    _ocImg = oc;
    initPuzzle();
}

init("imgs/wind0.jpg")
