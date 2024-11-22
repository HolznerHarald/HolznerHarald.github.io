function Start() {
    if (glAnz1 > 0)
        location.reload();
    // Start- Next-Button
    document.getElementById("tWurf").children[0].children[0].children[0].style.visibility = "hidden";
    document.getElementById("tWurf").children[0].children[2].children[5].style.visibility = "visible";
    nextthrow();
}
function nextthrow() {
    document.getElementById("tWurf").children[0].children[3].children[5].style.innerHTML = "serviert";
    glAnz1++;
    glAnz2 = 1;
    document.getElementById("tWurf").children[0].children[1].children[3].style.innerHTML = glAnz1;
    document.getElementById("tWurf").children[0].children[1].children[1].style.innerHTML = glAnz2;
    document.getElementById("tWurf").children[0].children[2].children[5].style.visibility = "visible";

    for (let ii = 0; ii < 5; ii++) {
        document.getElementById("tWurf").children[0].children[3].children[ii].innerHTML = "unfixed";
        document.getElementById("tWurf").children[0].children[3].children[ii].style.background = "white";
        document.getElementById("tWurf").children[0].children[2].children[ii].innerHTML = rand6();
    }
}
function rand6() {
    let zz = Math.floor(Math.random() * 6) + 1;
    return zz;
}
function nextbutton() {
    nextsubthrow();
}
function nextsubthrow() {
    glAnz2++;
    document.getElementById("tWurf").children[0].children[1].children[1].style.innerHTML = glAnz2;
    if (glAnz2 == 3)
        document.getElementById("tWurf").children[0].children[2].children[5].style.visibility = "hidden";
    let serviert = true;
    for (let ii = 0; ii < 5; ii++) {
        if (document.getElementById("tWurf").children[0].children[3].children[ii].innerHTML == "unfixed")
            document.getElementById("tWurf").children[0].children[2].children[ii].innerHTML = rand6();
        else
            serviert = false
    }
    if (serviert)
        document.getElementById("tWurf").children[0].children[3].children[5].innerHTML = "serviert";
    else
        document.getElementById("tWurf").children[0].children[3].children[5].innerHTML = "serviert";
}
function TabelleEinfuegen() {
    const tabelle = document.getElementById('tZettel');
    // schreibe Tabellenzeile
   /* for (var ii = 0; ii < 14; ii++) {
        const reihe = tabelle.insertRow(0);
        for (var jj = 0; jj < 18; jj++) {
            let para = document.createElement("td");
            let inhalt = 'R' + (ii + 1) + "S" + (jj + 1);            
            para.innerHTML = inhalt;
            para.id = "FIGID" + jj + ii;
            para.onclick = function () { feldclick(2,jj, ii) };
            reihe.appendChild(para);
        }
    }*/
    /*
    for (var ii = 0; ii < 14; ii++) {
        for (var jj = 0; jj < 18; jj++) {
            document.getElementById('tZettel').children[0].children[ii].children[jj].onclick=function() { feldclick(1, jj, ii) };
        }
    }*/

    for (let jj = 0; jj < 14; jj++) {
        document.getElementById("tZettel").children[0].children[jj].children[5].style.background = "grey";
        document.getElementById("tZettel").children[0].children[jj].children[11].style.background = "grey";
        document.getElementById("tZettel").children[0].children[jj].children[17].style.background = "grey";
    }
}

function feldclick(rnr, snr) {
    document.getElementById("tZettel").children[0].children[rnr].children[snr].innerHTML = rnr+"s"+snr;
}
function formate() {
    document.getElementById("container").style.position = "absolute";
    document.getElementById("container1").style.position = "fixed";

    // oberer Teil Format
    let skalFaktor = 20;

    document.getElementById("tWurf").style.position = "fixed";
    let hs = 0 * hoehe / skalFaktor + "px";
    document.getElementById("tWurf").style.top = hs;

    let hhF = hoehe / 35 + "px";
    document.getElementsByTagName('body')[0].style.fontSize = hhF;

    let hhF3 = hoehe / 15 + "px";
    document.getElementsByTagName('tr')[0].style.height = hhF3;
    document.getElementsByTagName('tr')[4].style.height = hhF3;
    hhF3 = hoehe / 12 + "px";
    document.getElementsByTagName('tr')[2].style.height = hhF3;
    hhF3 = hoehe / 25 + "px";
    document.getElementsByTagName('tr')[1].style.height = hhF3;
    document.getElementsByTagName('tr')[3].style.height = hhF3;
    //Font
    document.getElementsByTagName('tr')[2].style.fontSize = hhF3;

    // Borders
    document.getElementsByTagName('tr')[1].children[0].style.border = "none";
    document.getElementsByTagName('tr')[1].children[1].style.border = "none";
    document.getElementsByTagName('tr')[1].children[2].style.border = "none";
    document.getElementsByTagName('tr')[1].children[3].style.border = "none";
    document.getElementsByTagName('tr')[3].children[5].style.border = "none";
    document.getElementsByTagName('tr')[4].children[0].style.border = "none";
    document.getElementsByTagName('tr')[4].children[1].style.border = "none";

    for (var jj = 0; jj < 18; jj++) {
        if(jj%6 !=5 )
            document.getElementById("tZettel").children[0].children[13].children[jj].style.border = "none";
    }

    //unterer Teil Format
    let hh = hoehe * 0.7 + "px";
    let htop = hoehe * 0.3 + "px";
    document.getElementById("tZettel").style.position = "absolute"
    let hWeite = 4 * Weite + "px";
    document.getElementById("tZettel").style.minWidth = hWeite;
    document.getElementById("tZettel").style.top = htop;
}
//*****************Main Prozedur **********************/
TabelleEinfuegen();



let hoehe = window.innerHeight;   
let Weite = window.innerWidth;
let glAnz1 = 0
let glAnz2 = 0
let ZahlenAnzahl = [0, 0, 0, 0, 0, 0]

formate();
document.getElementById("tWurf").children[0].children[2].children[5].style.visibility = "hidden";

