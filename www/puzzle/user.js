import {init} from "./init.js";
import {shufflePuzzle} from "./setup.js";

export var button = document.getElementById("start_button");

export var PUZZLE_ROWS = 2;
export var PUZZLE_COLUMNS = 2;

var imgAddr = "imgs/wind0.jpg";


button.onclick = start;

function start(){
    PUZZLE_ROWS = document.getElementById("rows_input").value;
    PUZZLE_COLUMNS = document.getElementById("columns_input").value;

    if(PUZZLE_ROWS < 2 || PUZZLE_COLUMNS < 2){
        PUZZLE_ROWS = 2;
        PUZZLE_COLUMNS = 2;
    }
    init(imgAddr);
    document.onmouseup = shufflePuzzle;
}

export function changeImgAddr(newAddr){
    imgAddr = newAddr;
    init(imgAddr);
}

function loadImg(url){
    return new Promise((resolve, reject) => {
        let img = new Image();
        img.addEventListener('load', e => resolve(img));
        img.addEventListener('error', () => {
            reject(new Error('Failed to load image url: ${url}'));
        });
        img.src = url;
        img.className = 'picture';
        img.id = '${i}';
    });
}

export function generateGallery(){
    var gallery = document.getElementById("gallery");
    var imgs = [];
    for(let j=0; j<12; j++){
        imgs.push("imgs/wind"+j+".jpg");
    }

    for(let i =0; i<imgs.length; i++){
        loadImg(imgs[i]).then(img => {
            gallery.appendChild(img);
            img.addEventListener('click', () => changeImgAddr(img.src));
        })
    }
}

generateGallery();
