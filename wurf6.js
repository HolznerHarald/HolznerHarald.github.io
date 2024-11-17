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
//document.getElementsByTagName('body')[0].style.fontSize = hhF;
document.getElementById("Servieren").style.fontSize = hhF;


let hh = hoehe*0.7 + "px";
let htop = hoehe * 0.3   + "px";
document.getElementById("container").style.position = "absolute";
document.getElementById("tZettel").style.position = "absolute"
let hWeite = 2 * Weite + "px";
document.getElementById("tZettel").style.width = hWeite;
document.getElementById("tZettel").style.top = htop;
document.getElementById("tZettel").style.height = hh;

let skalFaktor = 20;
document.getElementById("Servieren").style.position = "fixed";
document.getElementById("Servieren").style.top = "0px";
document.getElementById("Servieren2").style.position = "fixed";
let hs = hoehe / skalFaktor + "px";
document.getElementById("Servieren2").style.top = hs;
document.getElementById("Servieren3").style.position = "fixed";
hs = 2*hoehe / skalFaktor + "px";
document.getElementById("Servieren3").style.top = hs;
document.getElementById("Servieren4").style.position = "fixed";
hs = 3*hoehe / skalFaktor + "px";
document.getElementById("Servieren4").style.top = hs;
document.getElementById("Servieren5").style.position = "fixed";
hs = 4*hoehe / skalFaktor + "px";
document.getElementById("Servieren5").style.top = hs;
document.getElementById("Servieren6").style.position = "fixed";
hs = 5*hoehe / skalFaktor + "px";
document.getElementById("Servieren6").style.top = hs;