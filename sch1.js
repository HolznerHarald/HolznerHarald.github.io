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
const afeld = "abcdefgh";
//afeld, ifeld, GegenPC , Ablauf , StartPositionRoch, weissUnten???
// Zugvorzurück MacheComputerZug, B_Datei_Click, B_Dreh_Click, B_Neues_Click  ???
const Farben = "wb";


function cFig(cF) {
    umwandelnhzug[4] = cF;
    document.getElementById("sd").hidden = true;
    document.getElementById("sd").close();
    Spiel1.EndeVonZug(umwandelnhzug );
}
function FeldCopy(field) {   
    var hfeld = new Array(8);

    for (var i = 0; i < hfeld.length; i++) {
        hfeld[i] = new Array(8);
    }

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {

            hfeld[i][j] = field[i][j];
        }
    }
    return hfeld;
}



/* Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu / bar icon */
function F1() {    
    var xLinks = document.getElementById("myLinks");
    var i1 = document.getElementById("ic1");
    var i2 = document.getElementById("ic2");
    xLinks.style.width = BrettHW*0.8 + "px";

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
function init(FeldArt) {
    let hFeld = new Array(8);
    for (let i = 0; i < hFeld.length; i++) {
        hFeld[i] = new Array(8);
    }
    for (let i = 0; i < 8; i++) {
        for (let jj = 0; jj < 8; jj++) {
            hFeld[i][jj] = "ll";
        }
    }
    if (FeldArt === 0) {
        hFeld[0] = ["br", "bn", "bb", "bq", "bk", "bb", "bn", "br"];
        hFeld[1] = ["bp", "bp", "bp", "bp", "bp", "bp", "bp", "bp"];
        hFeld[7] = ["wr", "wn", "wb", "wq", "wk", "wb", "wn", "wr"];
        hFeld[6] = ["wp", "wp", "wp", "wp", "wp", "wp", "wp", "wp"];
    }
    else if (FeldArt === 1) {
        //Matt in 1 mit Umwandlung
        hFeld[1][0] = "wp";
        hFeld[2][6] = "wk";
        hFeld[0][7] = "bk";
    }

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
    let stell1 = new Stellung(sFeld, 'w', 1, "ZF:", [-1, -1, -1, -1], [[false, false], [false, false]], [0,4,7]);
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
        

        for (let ii = 0; ii < 8; ii++) {
            para = document.createElement("img");
            hs = "figuren\\" + sFeld[jj][ii] + ".png";
            para.src = hs;
            if ((ii + jj) % 2 == 1)
                para.style.backgroundColor = 'sienna';
            else
                para.style.backgroundColor = 'lightgray';
            
            para.id = "ID" + jj +ii;
            para.onclick = function () { IMGClick(jj, ii) };
            para.style.width = (BrettHW / 8) + "px";
            para.style.height = (BrettHW / 8) + "px";
            para.style.position = "absolute";

            let jjj = jj;
            if (!Rmodi && !weissUnten) 
                jjj = 7 - jj;

            if (Handy) {
                para.style.top = (BrettHW / 8) * (jjj + 1) + "px";
                para.style.left = (BrettHW / 8) * ii + "px";
            }
            else {
                para.style.top = (BrettHW / 8) * jjj + 20 + "px";
                para.style.left = (BrettHW / 8) * ii + 5 + "px";
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
function IMGClick(yy, xx) {
    if (Rmodi) {
        sFeld[yy][xx] = "ll";
        if (FSmarkxx != -1) {
            let hs = Farben[FSmarkyy] + Figuren[FSmarkxx];
            sFeld[yy][xx] = hs;
        }
        IMGFill();
        FIGIMGFill();
    }
    else {
        Spiel1.MouseClick(xx, yy);
    }
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
function onchZ() {    
    let ssZ = document.getElementById("Tiefe").value;
    BewertungsTiefe = Number(ssZ[1]);
}

function Ziehe() {
    Spiel1.MacheComputerZug();
}
function Neues() {
    document.getElementById("p1").innerText = "";    
    Spiel1 = new Spiel();
}
function Drehe() {    
    Spiel1.Drehe();
}
function vonDatei() {
    document.getElementById("p1").innerText = "";
    sZuege = localStorage.getItem("Zuege");
   // document.getElementById("p1").innerText = sZuege;
    sZuege = sZuege.substring(0, sZuege.length - 1);
    
    let hstrZugFolge = sZuege.split("\n");    

    let hhZugFolge = new Array(hstrZugFolge.length);
    for (let ii = 0; ii < hstrZugFolge.length; ii++) {
        hhZugFolge[ii] = new Array(hstrZugFolge[ii].length);
    }

    for (let ii = 0; ii < hstrZugFolge.length; ii++)
        for (let jj = 0; jj < hstrZugFolge[ii].length; jj++) {
            hhZugFolge[ii][jj] = Number(hstrZugFolge[ii][jj]);
        }

    Spiel1.aktuellerZug = hhZugFolge.length;
    Spiel1.StellungAufbauen(hhZugFolge);

    for (let i = 0; i < Spiel1.aktuellerZug; i++) {
        Spiel1.Zugschreiben(Spiel1.SZugFolge[i], i + 1);
    }

}
function RRR() {
    Spiel1.Zugvorzurueck(0);
}
function RR() {
    Spiel1.Zugvorzurueck(1);
}
function VV() {
    Spiel1.Zugvorzurueck(2);
}
function VVV() {
    Spiel1.Zugvorzurueck(3);
}
function handleClick(cb) {
    if (cb.checked)
        NurSolangeNotwendig = true;  
    else
        NurSolangeNotwendig = false ;     
}
function handleClick2(cb) {
    if (cb.checked)
        GegenPC = true;
    else
        GegenPC = false;
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
function nurRaetsel() {
    
    document.getElementById("container2").style.position = "absolute";
    document.getElementById("Leeren").style.fontSize = hss;
    document.getElementById("Loesen").style.fontSize = hss;
    document.getElementById("MattIn").style.fontSize = hss;
    document.getElementById("Nur").style.fontSize = hss;
    document.getElementById("MattIn").value = "M" + MattNachTeilzuegen / 2;  
    
    document.getElementById("Leeren").style.width = hww; 
    document.getElementById("Loesen").style.width = hww;
    document.getElementById("MattIn").style.width = BrettHW * 0.38 + "px"; 
    document.getElementById("NurCh").style.width = hss;
    document.getElementById("NurCh").style.height = hss;

    if (Handy) {
        document.getElementById("container2").style.top = (BrettHW / 8) + BrettHW * 1.02 + (BrettHW / 8) * 2 + "px";
        document.getElementById("container2").style.left = BrettHW * 0.01 +"0px";
    }
    else {
        
        document.getElementById("container2").style.top = (BrettHW / 8) + 20 + "px";
        document.getElementById("container2").style.left = BrettHW + 10 + "px";
    }
}
function nurSpiel() {
    document.getElementById("container4").style.position = "absolute";
    document.getElementById("container5").style.position = "absolute";
    document.getElementById("container6").style.position = "absolute";
    document.getElementById("Neues").style.fontSize = hss;
    document.getElementById("Ziehe").style.fontSize = hss;
    document.getElementById("Drehe").style.fontSize = hss;
    document.getElementById("vonDatei").style.fontSize = hss;    
    document.getElementById("Neues").style.width = hww*1.1;
    document.getElementById("Ziehe").style.width = hww;
    document.getElementById("Drehe").style.width = hww*1.1;
    document.getElementById("vonDatei").style.width = hww; 
    document.getElementById("Tiefe").style.fontSize = hss;
    document.getElementById("PCCh").style.width = hss;
    document.getElementById("PCCh").style.height = hss;
    document.getElementById("PCL").style.fontSize = hss;
    document.getElementById("Tiefe").value = "Z" + BewertungsTiefe;
    

    if (Handy) {
        document.getElementById("container4").style.top = (BrettHW / 8) + BrettHW * 1.02 + (BrettHW / 8) + "px";
        document.getElementById("container4").style.left = BrettHW * 0.01 + "0px";
        document.getElementById("container5").style.top = (BrettHW / 8) + BrettHW * 1.02 + (BrettHW / 4) + "px";
        document.getElementById("container5").style.left = BrettHW * 0.01 + "0px";
        document.getElementById("container6").style.top = BrettHW * 1.02 + (BrettHW / 8) + "px";
        document.getElementById("container6").style.left = BrettHW * 0.27 + "px";
    }
    else {
        document.getElementById("container4").style.top = (BrettHW / 8) + 10 + "px";
        document.getElementById("container4").style.left = BrettHW + 10 + "px";
        document.getElementById("container5").style.top = (BrettHW / 8)*2 + 10 + "px";
        document.getElementById("container5").style.left = BrettHW + 10 + "px";
        document.getElementById("container6").style.top =  BrettHW * 1.01 + (BrettHW / 16) + "px";
        document.getElementById("container6").style.left = BrettHW * 0.375 + "px";
    }
}


//*****************Main Prozedur **********************/
let Hoehe = window.innerHeight;   // clientHeight ohne horizontale scrollbar 
let Weite = window.innerWidth;
let Handy = true;
let BrettHW = Math.min(Hoehe / 2, Weite);
let weissUnten = true;
let umwandelnhzug;


if (Weite > Hoehe*1.2) {
    Handy = false;
    BrettHW = 0.75 * (Hoehe-20);
}
let hss = (BrettHW / 22) + "px";
let hww = BrettHW * 0.27 + "px";

let Fehlerhaft = false;
let AnzLoesungen = 0;
let AnzVar = 0;
let MattNachTeilzuegen = 4;
let BewertungsTiefe = 2;
let NurSolangeNotwendig = true;
let GegenPC = true;
let FSmarkyy = -1;
let FSmarkxx = -1;


document.getElementById("p1").style.position = "absolute";
document.getElementById("p1").style.fontSize = hss;

document.getElementById("container").style.position = "absolute";

if (Rmodi)
    nurRaetsel();
else
    nurSpiel();


if (Handy) {
   // let hss1 = (BrettHW / 11) + "px";
    let hss1 = hss;
    document.getElementById("ic1").style.fontSize = hss1;
    document.getElementById("ic2").style.fontSize = hss1;
    document.getElementById("a1").style.fontSize = hss1;
    document.getElementById("a2").style.fontSize = hss1;
    document.getElementById("a3").style.fontSize = hss1;
    document.getElementById("ll1").style.fontSize = hss1;
    document.getElementById("ll2").style.fontSize = hss1;
    document.getElementById("ll3").style.fontSize = hss1;

    document.getElementById("container").style.top = BrettHW * 0.01 + "px";
    document.getElementById("container").style.left = BrettHW * 0.01 + "px";

    document.getElementById("p1").style.top = (BrettHW / 6) + BrettHW * 1.03 + (BrettHW / 8) * 2 + "px";
    document.getElementById("p1").style.left = "0px";

    document.getElementById("p1").style.width = BrettHW + "px";
    document.getElementById("p1").style.height = BrettHW / 2 + "px";     
    
    document.getElementById("ll1").style.display = "none";
    document.getElementById("ll2").style.display = "none";
    document.getElementById("ll3").style.display = "none";   
}
else {
    document.getElementById("container").style.top = 20 + "px";
    document.getElementById("container").style.left = BrettHW + 10 + "px";
    document.getElementById("myLinks").style.display = "inline";
    document.getElementById("myLinks").style.width = Weite + "px";
    document.getElementById("a1").style.display = "inline";
    document.getElementById("a2").style.display = "inline";
    document.getElementById("a3").style.display = "inline";
    
    document.getElementById("p1").style.top = (BrettHW / 3) + 20 + "px";
    document.getElementById("p1").style.left = BrettHW + 10 + "px";

    document.getElementById("p1").style.width = Weite - (BrettHW + 10) - 10 + "px";
    document.getElementById("p1").style.height = BrettHW / 2 + "px";

    
    document.getElementById("ic1").style.display = "none";
    document.getElementById("ic2").style.display = "none";

}

let sFeld = init(1)
let Spiel1;

IMGFill();

if (Rmodi)
    FIGIMGFill();
else
    Spiel1 = new Spiel();
    


