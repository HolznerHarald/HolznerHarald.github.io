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
function zeileEinfuegen() {
    const tabelle = document.getElementById('tZettel');
    // schreibe Tabellenzeile
    for (var ii = 0; ii < 13; ii++) {
        const reihe = tabelle.insertRow(0);
        for (var jj = 0; jj < 18; jj++) {
            let inhalt = 'R' + (ii + 1) + "S" + (jj + 1);
            zelle = reihe.insertCell();
            zelle.innerHTML = inhalt;
        }
    }
}

function feldclick(rnr, snr) {
}

zeileEinfuegen();
//*****************Main Prozedur **********************/
let hoehe = window.innerHeight;   
let Weite = window.innerWidth;

let hhF = hoehe / 35 + "px";
document.getElementsByTagName('body')[0].style.fontSize = hhF;

let hhF3 = hoehe / 15 + "px";
document.getElementsByTagName('tr')[0].style.height = hhF3;
document.getElementsByTagName('tr')[4].style.height = hhF3;
hhF3 = hoehe / 10 + "px";
document.getElementsByTagName('tr')[2].style.height = hhF3;
hhF3 = hoehe / 25 + "px";
document.getElementsByTagName('tr')[1].style.height = hhF3;
document.getElementsByTagName('tr')[3].style.height = hhF3;
//Font
document.getElementsByTagName('tr')[2].style.fontSize = hhF3;


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

