/*
for (let ii = 1; ii < 6; ii++) {
        for (let jj = 0; jj < 13; jj++) {
            document.getElementById("tZettel").children[0].children[jj].children[ii].innerHTML = 12;
            document.getElementById("tZettel").children[0].children[jj].children[ii].style.background = "red";
        }
    }

    if (document.getElementById("tZettel").children[0].children[rnr - 1].children[snr].style.background == "red") {
        alert("Feld ist bereits beschrieben!")
        return;
           document.getElementById("tZettel").children[0].children[6].children[ii].style.visibility = "visible";
*/

function feldclick(rnr, snr) {
}
//*****************Main Prozedur **********************/
let hoehe = window.innerHeight;   
let Weite = window.innerWidth;

let hh = hoehe / 2 + "px";
document.getElementById("container").style.margin = "0px 0px 0px 0px";
document.getElementById("tZettel").style.margin = "0px 0px 0px 0px";
document.getElementById("tZettel").style.width = "200%";
document.getElementById("tZettel").style.height = hh; 
document.getElementById("tZettel").children[0].children[1].children[1].style.border = "0";
document.getElementById("container").style.position = "fixed";

document.getElementById("tZettel").style.position = "absolute";
document.getElementById("tZettel").style.top = hoehe / 4 + "px";

let hhF = hoehe / 35 + "px";
document.getElementsByTagName('body')[0].style.fontSize = hhF;