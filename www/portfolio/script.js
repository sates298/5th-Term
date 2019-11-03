function changeBGColor(){
    var idx = Math.floor(Math.random() * 4);
    document.getElementById("bd").className= "bg" + idx;
}
window.setInterval(changeBGColor, 1000);