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

let hhF = hoehe / 35 + "px";
let hhF3 = hoehe / 25 + "px";
document.getElementsByTagName('body')[0].style.fontSize = hhF;
document.getElementsByTagName('td')[0].style.height = hhF3;
document.getElementById("container").style.position = "absolute";
document.getElementById("container1").style.position = "fixed";

let skalFaktor = 20;

document.getElementById("tWurf").style.position = "fixed";
let hs = 0*hoehe / skalFaktor + "px";
document.getElementById("tWurf").style.top = hs;

let hh = hoehe * 0.7 + "px";
let htop = hoehe * 0.3 + "px";
document.getElementById("tZettel").style.position = "absolute"
let hWeite = 4 * Weite + "px";
document.getElementById("tZettel").style.minWidth = hWeite;
document.getElementById("tZettel").style.top = htop;

