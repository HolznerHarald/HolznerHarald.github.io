const SprZug = [
    [2, 1],
    [1, 2],
    [-2, 1],
    [-1, 2],
    [-2, -1],
    [-1, -2],
    [2, -1],
    [1, -2]
];
const Figuren = "kqrbnp";
//afeld, ifeld, GegenPC , Ablauf , StartPositionRoch, weissUnten???
// Zugvorzurück MacheComputerZug, B_Datei_Click, B_Dreh_Click, B_Neues_Click  ???
const Farben = "wb";

/* Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu / bar icon */
function F1() {    
    var xLinks = document.getElementById("myLinks");
    var i1 = document.getElementById("ic1");
    var i2 = document.getElementById("ic2");
    xLinks.style.width = BrettHW*1.5 + "px";

    if (xLinks.style.display === "block") {
        xLinks.style.display = "none";
        i1.style.display = "block";
        i2.style.display = "none";
    } else {
        xLinks.style.display = "block";      
        i2.style.display = "block";
        i1.style.display = "none";
    }
}
function init() {
    let hFeld = new Array(8);
    for (let i = 0; i < hFeld.length; i++) {
        hFeld[i] = new Array(8);
    }
    for (let i = 0; i < 8; i++) {
        for (let jj = 0; jj < 8; jj++) {
            hFeld[i][jj] = "ll";
        }
    }
//Matt in 1 mit Umwandlung
    hFeld[1][0] = "wp";
    hFeld[2][6] = "wk";
    hFeld[0][7] = "bk";

/* das Matt in 3
   hFeld[6][5] = "wk";
   hFeld[2][7] = "wb";
   hFeld[4][6] = "wp";
   hFeld[0][3] = "wr";
   hFeld[4][4] = "bk";
   hFeld[3][4] = "bp";
   hFeld[1][4] = "bp";*/

/* das Matt in 6
    hFeld[2][6] = "wk";
    hFeld[1][7] = "wn"; 
    hFeld[5][0] = "wp";
    hFeld[0][7] = "bk";*/
/*
    hFeld[0][0] = "wk";
    hFeld[0][1] = "wn";
    hFeld[1][0] = "bk";
    hFeld[1][1] = "bn";*/

    return hFeld;
} 
function Loesen() {
    Fehlerhaft = false;
    AnzLoesungen = 0;
    AnzVar = 0;
    document.getElementById("p1").innerText = "";
    let stell1 = new Stellung(sFeld, 'w', 1, "ZF:");
    let currentTime = new Date();
    
    stell1.RekursivStatusBestimmenNachfolgeStellungen();
    if (Fehlerhaft)
        return;
    document.getElementById("p1").innerText = "Berechnete Varianten:" + AnzVar + document.getElementById("p1").innerText;
    stell1.MattAnzeigen();

    document.getElementById("p1").innerText = "Anzahl L\u00f6sungen:" + AnzLoesungen + "\n" + document.getElementById("p1").innerText;

    document.getElementById("p1").innerText += "\n" + "Rechenzeit:" + (new Date() - currentTime).toString() + "ms";
    //document.getElementById("p1").innerText += "\n" + "F";
}
function Leeren() {
    for (let jj = 0; jj < 8; jj++) {
        for (let ii = 0; ii < 8; ii++) {
            sFeld[jj][ii] = "ll";
        }
    }
    IMGFill();
    FIGIMGFill();
}
function IMGFill() {
    document.getElementById("ctest").replaceChildren();    
    for (let jj = 0; jj < 8; jj++) {
        for (let i = 0; i < 8; i++) {
            para = document.createElement("img");
            hs = "figuren\\" + sFeld[jj][i] + ".png";
            para.src = hs;
            if ((i + jj) % 2 == 1)
                para.style.backgroundColor = 'sienna';
            else
                para.style.backgroundColor = 'lightgray';
            z = i + jj * 8;
            para.id = "ID" + z;
            para.onclick = function () { f1(jj, i) };
            para.style.width = (BrettHW / 8) + "px";
            para.style.height = (BrettHW / 8) + "px";
            para.style.position = "absolute";
            
            if (Handy) {
                para.style.top = (BrettHW / 8) * (jj + 1) + "px";
                para.style.left = (BrettHW / 8) * i + "px";
            }
            else {
                para.style.top = (BrettHW / 8) * jj + 20 + "px";
                para.style.left = (BrettHW / 8) * i + 5 + "px";
            }
            document.getElementById("ctest").appendChild(para);
        }
    }
}

function FIGIMGFill() {
    // Auswahl Figuren
    for (let jj = 0; jj < 2; jj++) {
        for (let ii = 0; ii < 6; ii++) {
            para = document.createElement("img");
            hs = "figuren\\" + Farben[jj] + Figuren[ii] + ".png";
            para.src = hs;
            para.style.backgroundColor = 'lightgray';
            para.id = "FIGID" + jj + ii;
            para.onclick = function () { f2(jj, ii) };
            para.style.width = (BrettHW / 8) + "px";
            para.style.height = (BrettHW / 8) + "px";
            para.style.position = "absolute";
            
            para.style.left = (BrettHW / 8) * ii + "px";
            if (Handy) {
                para.style.top = BrettHW * 1.01 + (BrettHW / 8) * (jj + 1) + "px";
            }
            else {
                para.style.top = BrettHW * 1.01 + (BrettHW / 8) * jj + 20 + "px";
            }
            document.getElementById("ctest").appendChild(para);
        }
    }
    if (FSmarkyy != -1) 
        document.getElementById("FIGID" + FSmarkyy + FSmarkxx).style.backgroundColor = 'yellow';

}
function f1(yy,xx) {
    sFeld[yy][xx] = "ll";    
    if (FSmarkxx != -1) {
        let hs = Farben[FSmarkyy] + Figuren[FSmarkxx];
        sFeld[yy][xx] = hs;
    }
    IMGFill();
    FIGIMGFill();
}

function f2(yy, xx) {
    if (FSmarkyy == -1) {
        FSmarkyy = yy;
        FSmarkxx = xx;
        document.getElementById("FIGID" + yy + xx).style.backgroundColor = 'yellow';
    }
    else if (FSmarkxx == xx && FSmarkyy == yy) {
        FSmarkyy = -1;
        FSmarkxx = -1;
        document.getElementById("FIGID" + yy + xx).style.backgroundColor = 'lightgray';
    }
    else {
        document.getElementById("FIGID" + FSmarkyy + FSmarkxx).style.backgroundColor = 'lightgray';
        FSmarkyy = yy;
        FSmarkxx = xx;
        document.getElementById("FIGID" + yy + xx).style.backgroundColor = 'yellow';
    } 
}
function onch()
{
    //MattNachTeilzuegen = document.getElementById("MattIn")*2;
    let ss = document.getElementById("MattIn").value;
    MattNachTeilzuegen = 2 * ss[1];
}
function handleClick(cb) {
    if (cb.checked)
        NurSolangeNotwendig = true;  
    else
        NurSolangeNotwendig = false ; 
    //document.getElementById("p1").innerText = "Clicked, new value = " + cb.checked;
}
function FeldaufBrett3(xy, v1, v2) {
    if (xy[0] + v1 < 0 || xy[0] + v1 > 7)
        return false;

    if (xy[1] + v2 < 0 || xy[1] + v2 > 7)
        return false;

    return true;
}

function FeldaufBrett2(v1, v2) {
    if (v1 < 0 || v1 > 7)
        return false;

    if (v2 < 0 || v2 > 7)
        return false;

    return true;
}

//*****************Main Prozedur **********************/
Hoehe = window.innerHeight;   // clientHeight ohne horizontale scrollbar 
let Weite = window.innerWidth;
let Handy = true;
let BrettHW = Math.min(Hoehe / 2, Weite);

if (Weite > Hoehe) {
    Handy = false;
    BrettHW = 0.75 * (Hoehe-20);
}
let hss = (BrettHW / 22) + "px";
let hww = BrettHW * 0.27 + "px";

document.getElementById("container").style.position = "absolute";
document.getElementById("p1").style.position = "absolute";
document.getElementById("p1").style.fontSize = hss;
document.getElementById("Leeren").style.fontSize = hss;
document.getElementById("Loesen").style.fontSize = hss;
document.getElementById("MattIn").style.fontSize = hss;
document.getElementById("c2i").style.fontSize = hss;


if (Handy) {
    
    document.getElementById("container").style.top = BrettHW * 0.01 + "px";
    document.getElementById("container").style.left = BrettHW * 0.01 + "px";
    document.getElementById("container2").style.top = (BrettHW / 8) + BrettHW * 1.02 + (BrettHW / 8) * 2 + "px";
    document.getElementById("container2").style.left = "0px";
    document.getElementById("p1").style.top = (BrettHW / 6) + BrettHW * 1.03 + (BrettHW / 8) * 2 + "px";
    document.getElementById("p1").style.left = "0px";

    document.getElementById("p1").style.width = BrettHW + "px";
    document.getElementById("p1").style.height = BrettHW / 2 + "px";
    document.getElementById("Leeren").style.width = hww;    
    document.getElementById("Loesen").style.width = hww;    
    document.getElementById("MattIn").style.width = BrettHW * 0.38 + "px";    
    document.getElementById("c2").style.width = hss;
    document.getElementById("c2").style.height = hss;
    document.getElementById("ll1").style.display = "none";
    document.getElementById("ll2").style.display = "none";
    document.getElementById("ll3").style.display = "none";   
}
else {
    document.getElementById("myLinks").style.display = "inline";
    document.getElementById("myLinks").style.width = Weite + "px";
    document.getElementById("a1").style.display = "inline";
    document.getElementById("a2").style.display = "inline";
    document.getElementById("a3").style.display = "inline";
    
    document.getElementById("container").style.top = 20 + "px";
    document.getElementById("container").style.left = BrettHW + 10 + "px";
    document.getElementById("container2").style.top = (BrettHW / 8) + 20 + "px";
    document.getElementById("container2").style.left = BrettHW + 10 + "px";
    document.getElementById("p1").style.top = (BrettHW / 3) + 20 + "px";
    document.getElementById("p1").style.left = BrettHW + 10 + "px";

    document.getElementById("p1").style.width = Weite - (BrettHW + 10) - 10 + "px";
    document.getElementById("p1").style.height = BrettHW / 2 + "px";

    document.getElementById("Leeren").style.width = hww;
    document.getElementById("Loesen").style.width = hww;
    document.getElementById("MattIn").style.width = BrettHW * 0.38 + "px";
    document.getElementById("c2").style.width = hss;
    document.getElementById("c2").style.height = hss;
    document.getElementById("ic1").style.display = "none";
    document.getElementById("ic2").style.display = "none";

}

// SFeld 8 x 8 initialisieren mit "l"  (leer) für Farbe und "l" für Figur
//<div id="ctest" onclick="f1(2)">
let sFeld = init()

// die 64 img-Felder erstellen und füllen mit sFeld
let Fehlerhaft = false;
let AnzLoesungen = 0;
let AnzVar = 0;
let MattNachTeilzuegen = 4;
let NurSolangeNotwendig = true;
let FSmarkyy = -1;
let FSmarkxx = -1;
document.getElementById("MattIn").value = "M" + MattNachTeilzuegen / 2;

//document.getElementsByTagName('img').style.width = BrettHW / 8 + "px";
//document.getElementsByTagName('img').style.height = "20px";

IMGFill();
FIGIMGFill();


