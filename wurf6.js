function Start() {
    if (glAnz1 > 0)
        location.reload();
    // Start- Next-Button
    document.getElementById("tWurf").children[0].children[0].children[0].style.visibility = "hidden";
    document.getElementById("tWurf").children[0].children[2].children[5].style.visibility = "visible";
    nextthrow();
}
function nextthrow() {
    document.getElementById("tWurf").children[0].children[3].children[5].innerHTML = "serviert";
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
function TZettelFormat() {
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
 //   document.getElementById("tZettel").children[0].children[rnr].children[snr].innerHTML = rnr + "s" + snr;
    snr++;
    rnr++;
    let modsnr = snr % 6;
   
    if (modsnr == 6)
        return;
    if (document.getElementById("Startbutton").style.visibility != "hidden") {
        alert("Zuerst Start-Button anklicken!")
        return;
    }
    if (document.getElementById("tZettel").children[0].children[rnr - 1].children[snr-1].style.background == "red") {
        alert("Feld ist bereits beschrieben!")
        return;
    }
    if (document.getElementById("tZettel").children[0].children[rnr - 1].children[snr-1].style.background == "grey") {
        alert("1.Reihe von oben der Reihe nach,5.Reihe von unten der Reihe nach")
        return;
    }
    document.getElementById("tZettel").children[0].children[rnr - 1].children[snr-1].style.background = "red";
    if (modsnr == 1 && rnr <= 12) {
        document.getElementById("tZettel").children[0].children[rnr].children[snr-1].style.background = "white";
        if (rnr == 6)
            document.getElementById("tZettel").children[0].children[7].children[snr-1].style.background = "white";
    }
    if (modsnr == 5 && rnr > 1) {
        document.getElementById("tZettel").children[0].children[rnr - 2].children[snr-1].style.background = "white";
        if (rnr == 8)
            document.getElementById("tZettel").children[0].children[5].children[snr-1].style.background = "white";
    }

    // Festellen ob Figur und schreiben
    let Servierungsfaktor = 1;
    BestimmeZahlenAnzahl();
    let fig = figur();
    let hserv =document.getElementById("tWurf").children[0].children[3].children[5].innerHTML = "serviert";
    if (fig != "nix" && hserv == "serviert")
        Servierungsfaktor = 2;

    let summe = 0;
    if (rnr < 7) {
        for (let ii = 0; ii < 5; ii++)
            if (tds0[ii].innerHTML == rnr)
                summe = summe + rnr;
        schreiben(rnr, snr-1, summe * Servierungsfaktor);
        //document.getElementById("tZettel").children[0].children[rnr - 1].children[snr].innerHTML = summe * Servierungsfaktor;
    }
    else if (rnr == 8) {//Min
        for (let ii = 0; ii < 5; ii++) {
            let hz = document.getElementById("tWurf").children[0].children[2].children[ii].innerHTML;
            summe = summe + Number(hz);
        }
        let f9 = Number(document.getElementById("tZettel").children[0].children[9 - 1].children[snr-1].innerHTML)
        if (f9 != -1 && summe >= f9)
            schreiben(rnr, snr-1, 0);
        //document.getElementById("tZettel").children[0].children[rnr - 1].children[snr].innerHTML = 0;
        else
            schreiben(rnr, snr-1, summe);
        //document.getElementById("tZettel").children[0].children[rnr - 1].children[snr].innerHTML = summe;
    }
    else if (rnr == 9) {//Max
        for (let ii = 0; ii < 5; ii++) {
            let hz = document.getElementById("tWurf").children[0].children[2].children[ii].innerHTML;
            summe = summe + Number(hz);
        }
        let f8 = Number(document.getElementById("tZettel").children[0].children[8 - 1].children[snr-1].innerHTML)
        if (f8 != -1 && summe <= f8)
            schreiben(rnr, snr-1, 0);
        //document.getElementById("tZettel").children[0].children[rnr - 1].children[snr].innerHTML = 0;
        else
            schreiben(rnr, snr-1, summe);
        //document.getElementById("tZettel").children[0].children[rnr - 1].children[snr].innerHTML = summe;
    }
    else if (rnr == 10) {
        if (fig == "Full")
            schreiben(rnr, snr-1, 25 * Servierungsfaktor);
        //document.getElementById("tZettel").children[0].children[rnr - 1].children[snr].innerHTML = 25 * Servierungsfaktor;
        else schreiben(rnr, snr-1, 0);
        //document.getElementById("tZettel").children[0].children[rnr - 1].children[snr].innerHTML = 0;
    }
    else if (rnr == 11) {
        if (fig == "Street")
            schreiben(rnr, snr-1, 30 * Servierungsfaktor);
        //document.getElementById("tZettel").children[0].children[rnr - 1].children[snr].innerHTML = 30 * Servierungsfaktor;
        else schreiben(rnr, snr-1, 0);
        //document.getElementById("tZettel").children[0].children[rnr - 1].children[snr].innerHTML = 0;
    }
    else if (rnr == 12) {
        if (fig == "Poker")
            schreiben(rnr, snr-1, 40 * Servierungsfaktor);
        //document.getElementById("tZettel").children[0].children[rnr - 1].children[snr].innerHTML = 40 * Servierungsfaktor;
        else schreiben(rnr, snr-1, 0);
        //document.getElementById("tZettel").children[0].children[rnr - 1].children[snr].innerHTML = 0;
    }
    else if (rnr == 13) {
        if (fig == "Grande")
            schreiben(rnr, snr-1, 50 * Servierungsfaktor);
        //document.getElementById("tZettel").children[0].children[rnr - 1].children[snr].innerHTML = 50 * Servierungsfaktor;
        else schreiben(rnr, snr-1, 0);
        //document.getElementById("tZettel").children[0].children[rnr - 1].children[snr].innerHTML = 0;
    }
    // N�chsten Wurf vorbereiten
    if (glAnz1 == 180) 
        ErgebnisBerechnen();
    else
        nextthrow();
}
function ErgebnisBerechnen() {
        //document.getElementById("Nachricht").innerHTML = "Spiel beendet, Ergebnis siehe unten";
        document.getElementById("tWurf").children[0].children[0].children[0].innerHTML = "Neues Spiel";
        document.getElementById("tWurf").children[0].children[0].children[0].style.visibility = "visible";
        document.getElementById("tWurf").children[0].children[2].children[5].style.visibility = "hidden";
        for (kk = 0; kk < 3; kk++) {
            //Reihenvorschub
            let RV= kk * 6;
            for (let ii = 0; ii < 5; ii++) {
                let Summe = 0;
                for (let jj = 0; jj < 6; jj++)
                    Summe = Summe + Number(document.getElementById("tZettel").children[0].children[jj].children[ii+RV].innerHTML)
                if (Summe >= 70) {
                    Summe = Summe + 45;
                    if (ii == 1 || ii == 5)
                        Summe = Summe + 15;
                }
                document.getElementById("tZettel").children[0].children[6].children[ii+RV].innerHTML = Summe;
                document.getElementById("tZettel").children[0].children[6].children[ii+RV].style.visibility = "visible";
            }
        }
        for (kk = 0; kk < 3; kk++) {
            //Reihenvorschub
            let RV = kk * 6;
            for (let jj = 6; jj < 13; jj++) {
                let Summe = 0;
                for (let ii = 0; ii < 5; ii++)
                    Summe = Summe + Number(document.getElementById("tZettel").children[0].children[jj].children[ii+RV].innerHTML)
                document.getElementById("tZettel").children[0].children[jj].children[5+RV].innerHTML = Summe;
            }
        }
        for (kk = 0; kk < 3; kk++) {
            //Reihenvorschub
            let RV = kk * 6;
            let Summe = 0;
            for (let ii = 6; ii < 13; ii++) {
                Summe = Summe + Number(document.getElementById("tZettel").children[0].children[ii].children[5+RV].innerHTML)
                //document.getElementById("tZettel").children[0].children[ii].children[5].style.visibility = "visible";
            }
            document.getElementById("tZettel").children[0].children[13].children[5+RV].innerHTML = Summe;
        }

        let Summe1 = 0;
        for (kk = 0; kk < 3; kk++) {
            //Reihenvorschub
            let RV = kk * 6;
            Summe1 = Summe1 + document.getElementById("tZettel").children[0].children[13].children[5 + RV].innerHTML;
        }
        document.getElementById("tWurf").children[0].children[4].children[1].innerHTML = Summe1;

        //Bestenliste
        let BestenListe = localStorage.getItem("BestenListe3");
        let tim = new Date();

        let tim2 = tim.toDateString() + " " + tim.toTimeString();
        tim2 = tim2.substring(4, 21);

        if (localStorage.getItem("BestenListe3") === null) {
            BestenListe = Summe.toString() + " Punkte um: " + tim2 + ";";
        }
        else {
            BestenListe = BestenListe + Summe.toString() + " Punkte um: " + tim2 + ";";
        }

        localStorage.setItem("BestenListe3", BestenListe);
}
function BestimmeZahlenAnzahl() {
    for (let ii = 0; ii < 6; ii++)
        ZahlenAnzahl[ii] = 0
    for (let ii = 0; ii < 5; ii++) {
        let hz = document.getElementById("tWurf").children[0].children[2].children[ii].innerHTML;
        ZahlenAnzahl[hz - 1]++;
    }
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
// komplett gleiche Funktionen wie 1er Reihe
function schreiben(rnr, snr, wert) {
    document.getElementById("tZettel").children[0].children[rnr - 1].children[snr].innerHTML = wert;
}
function figur() {
    let dreier = false;
    let zweier = false;
    let possibleStreet = true;
    for (let ii = 0; ii < 6; ii++) {
        if (ZahlenAnzahl[ii] > 1)
            possibleStreet = false;

        if (ZahlenAnzahl[ii] == 5)
            return "Grande";
        else if (ZahlenAnzahl[ii] == 4)
            return "Poker";
        else if (ZahlenAnzahl[ii] == 3)
            dreier = true;
        else if (ZahlenAnzahl[ii] == 2)
            zweier = true;
    }

    if (possibleStreet && (ZahlenAnzahl[0] == 0 || ZahlenAnzahl[5] == 0))
        return "Street"
    else if (dreier && zweier)
        return "Full";
    else
        return "nix";
}


//*****************Main Prozedur **********************/
TZettelFormat();

let hoehe = window.innerHeight;   
let Weite = window.innerWidth;
let glAnz1 = 0
let glAnz2 = 0
let ZahlenAnzahl = [0, 0, 0, 0, 0, 0]

formate();
document.getElementById("tWurf").children[0].children[2].children[5].style.visibility = "hidden";

