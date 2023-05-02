// todos Würfelfotos, letzten Wurf anzeigen, zurücknehmen

// JavaScript source code
//  geht erstnach def.! document.getElementById("f1").innerHTML = "not";
function Start() {
    document.getElementById("Nachricht").innerHTML = decodeURI("Ergebnis schreiben oder einzelne W%C3%BCrfe fixieren oder n%C3%A4chster Wurf");
    init2();
    nextthrow();
}
function nextbutton() {
    if (document.getElementById("Naechsterbutton").innerHTML == "Start") {
        document.getElementById("Naechsterbutton").innerHTML = "Werfe!";
        Start();
        return;
    }
    
    if (Anz2 == 0 || Anz2 == 3)
        nextthrow();
    else
        nextsubthrow();
}
function next58() {
    for (let ii = 1; ii < 6; ii++) {
        for (let jj = 0; jj < 13; jj++) {
            document.getElementById("tZettel").children[0].children[jj].children[ii].innerHTML = 12;
            document.getElementById("tZettel").children[0].children[jj].children[ii].style.background = "red";
        }
    }

    document.getElementById("tZettel").children[0].children[0].children[1].style.background = "blue";
    glAnz1 = 60;
    document.getElementById("Anz1").innerHTML = decodeURI("Anzahl W%C3%BCrfe:") + glAnz1;
    
}
function nextthrow() {
    document.getElementById("Servieren").innerHTML = "serviert";
    glAnz1++;
    document.getElementById("Anz1").innerHTML = decodeURI("Anzahl W%C3%BCrfe:") + glAnz1;
    glAnz2=1;
    document.getElementById("Anz2").innerHTML = glAnz2 + ".Wurf";
    document.getElementById("Naechsterbutton").style.visibility = "visible";
   // document.getElementById("tWurf").style.fontSize = "50px";
    //document.getElementById("tWurf").style.height = "330px";

    for (let ii = 0; ii < 5; ii++) {
        tds[ii].innerHTML = "not fixed";
        tds0[ii].style.background = "white";
         //tds0[ii].style.fontSize = "10px";
        tds0[ii].innerHTML = rand();
    }
}
function nextsubthrow() {
    glAnz2++;
    document.getElementById("Anz2").innerHTML = glAnz2 + ".Wurf";
    if (glAnz2 == 3)
        document.getElementById("Naechsterbutton").style.visibility = "hidden";
    let serviert = true;
    for (let ii = 0; ii < 5; ii++) {
        if (tds[ii].innerHTML == "not fixed")
            tds0[ii].innerHTML = rand();
        else
            serviert = false
    }
    if (serviert)
        document.getElementById("Servieren").innerHTML = "serviert";
    else
        document.getElementById("Servieren").innerHTML = "nicht serviert";
    
}
function rand() {  
    let zz = Math.floor(Math.random() * 6) + 1;
    return zz;
}
function feldclick(rnr, snr) {
    snr++;
    if (document.getElementById("tZettel").children[0].children[rnr - 1].children[snr].style.background == "red") {
        alert("Feld ist bereits beschrieben!")
        return;
    }
    if (document.getElementById("tZettel").children[0].children[rnr - 1].children[snr].style.background == "grey") {
        alert("1.Reihe von oben der Reihe nach,5.Reihe von unten der Reihe nach")
        return;
    }
    document.getElementById("tZettel").children[0].children[rnr - 1].children[snr].style.background = "red";
    if (snr == 1 && rnr <=12) {
        document.getElementById("tZettel").children[0].children[rnr].children[snr].style.background = "white";      
        if (rnr == 6)
            document.getElementById("tZettel").children[0].children[7].children[snr].style.background = "white";
    }
    if (snr == 5 && rnr > 1) {
        document.getElementById("tZettel").children[0].children[rnr - 2].children[snr].style.background = "white";
        if (rnr == 8)
            document.getElementById("tZettel").children[0].children[5].children[snr].style.background = "white";

    }

    // Festellen ob Figur und schreiben
    let Servierungsfaktor = 1;
    let fig = figur();
    BestimmeZahlenAnzahl();
    if (fig != "nix" && document.getElementById("Servieren").innerHTML == "serviert")
        Servierungsfaktor = 2;

    let summe = 0;
    if (rnr < 7) {
        for (let ii = 0; ii < 5; ii++)
            if (tds0[ii].innerHTML == rnr)
                summe = summe + rnr;
        document.getElementById("tZettel").children[0].children[rnr - 1].children[snr].innerHTML = summe * Servierungsfaktor;
    }
    else if (rnr == 8) {//Min
        for (let ii = 0; ii < 5; ii++)
            summe = summe + Number(tds0[ii].innerHTML);
        let f9 = Number(document.getElementById("tZettel").children[0].children[9 - 1].children[snr].innerHTML)
        if (f9 != -1 && summe >= f9)
            document.getElementById("tZettel").children[0].children[rnr - 1].children[snr].innerHTML = 0;
        else
            document.getElementById("tZettel").children[0].children[rnr - 1].children[snr].innerHTML = summe;
    }
    else if (rnr == 9) {//Max
        for (let ii = 0; ii < 5; ii++)
            summe = summe + Number(tds0[ii].innerHTML);
        let f8 = Number(document.getElementById("tZettel").children[0].children[8 - 1].children[snr].innerHTML)
        if (f8 != -1 && summe <= f8)
            document.getElementById("tZettel").children[0].children[rnr - 1].children[snr].innerHTML = 0;
        else
            document.getElementById("tZettel").children[0].children[rnr - 1].children[snr].innerHTML = summe;
    }
    else if (rnr == 10) {
        let dreier = false;
        let zweier = false;
        BestimmeZahlenAnzahl();
        for (let ii = 0; ii < 5; ii++) {
            if (ZahlenAnzahl[ii] == 3)
                dreier = true;
            else if (ZahlenAnzahl[ii] == 2)
                zweier = true;
        }
        if (dreier && zweier)
            document.getElementById("tZettel").children[0].children[rnr - 1].children[snr].innerHTML = 25 * Servierungsfaktor;
        else document.getElementById("tZettel").children[0].children[rnr - 1].children[snr].innerHTML = 0;
    }
    else if (rnr == 11) {
        let possibleStreet= true;
        BestimmeZahlenAnzahl()
        for (let ii = 0; ii < 5; ii++)
            if (ZahlenAnzahl[ii] > 1)
                possibleStreet = false;

        if (possibleStreet && (ZahlenAnzahl[0] == 0 || ZahlenAnzahl[5]==0))
            document.getElementById("tZettel").children[0].children[rnr - 1].children[snr].innerHTML = 30 * Servierungsfaktor;
        else document.getElementById("tZettel").children[0].children[rnr - 1].children[snr].innerHTML = 0;
    }
    else if (rnr == 12) {
        let vierer = false;
        BestimmeZahlenAnzahl()
        for (let ii = 0; ii < 5; ii++)
            if (ZahlenAnzahl[ii] == 4)
                vierer = true;
            
        if (vierer)
            document.getElementById("tZettel").children[0].children[rnr - 1].children[snr].innerHTML = 40 * Servierungsfaktor;
        else document.getElementById("tZettel").children[0].children[rnr - 1].children[snr].innerHTML = 0;
    }
    else if (rnr == 13) {
        let funfer = false;
        BestimmeZahlenAnzahl()
        for (let ii = 0; ii < 5; ii++)
            if (ZahlenAnzahl[ii] == 5)
                funfer = true;

        if (funfer)
            document.getElementById("tZettel").children[0].children[rnr - 1].children[snr].innerHTML = 50 * Servierungsfaktor;
        else
            document.getElementById("tZettel").children[0].children[rnr - 1].children[snr].innerHTML = 0;
    }
    // Nächsten Wurf vorbereiten
    if (glAnz1 == 60) {
        document.getElementById("Nachricht").innerHTML = "Spiel beendet, Ergebnis siehe unten";
        document.getElementById("Naechsterbutton").innerHTML = "Start";
        document.getElementById("Naechsterbutton").style.background = "blue";
        for (let ii = 1; ii < 6; ii++) {
            let Summe = 0;
            for (let jj = 0; jj < 6; jj++)
                Summe = Summe + Number(document.getElementById("tZettel").children[0].children[jj].children[ii].innerHTML)
            if (Summe >= 70) {
                Summe = Summe + 45;
                if (ii == 1 || ii == 5)
                    Summe = Summe + 15;
            }
            document.getElementById("tZettel").children[0].children[6].children[ii].innerHTML = Summe;
            document.getElementById("tZettel").children[0].children[6].children[ii].style.visibility = "visible";
        }
        for (let jj = 6; jj < 13; jj++) {
            let Summe = 0;
            for (let ii = 1; ii < 6; ii++)
                Summe = Summe + Number(document.getElementById("tZettel").children[0].children[jj].children[ii].innerHTML)
            document.getElementById("tZettel").children[0].children[jj].children[6].innerHTML = Summe;
        }
        let Summe = 0;
        for (let ii = 6; ii < 13; ii++) {
            Summe = Summe + Number(document.getElementById("tZettel").children[0].children[ii].children[6].innerHTML)
            document.getElementById("tZettel").children[0].children[ii].children[6].style.visibility = "visible";
        }
        document.getElementById("Ergebnis").innerHTML = "Ergebnis: " + Summe;
        init();
    }
    else
        nextthrow();
    
    //  document.getElementById(rnr).style.background = "red";
}
function figur() {
    BestimmeZahlenAnzahl()
    
    let vierer = false;
    let dreier = false;
    let zweier = false;
    let possibleStreet = true;
    for (let ii = 0; ii < 5; ii++) {
        if (ZahlenAnzahl[ii] > 1)
            possibleStreet = false;

        if (ZahlenAnzahl[ii] == 5)
            return "Grande";
        else if (ZahlenAnzahl[ii] == 4)
            vierer = true;
        else if (ZahlenAnzahl[ii] == 3)
            dreier = true;
        else if (ZahlenAnzahl[ii] == 2)
            zweier = true;        
    }
 
    if (possibleStreet && (ZahlenAnzahl[0] == 0 || ZahlenAnzahl[5] == 0))
        return "Street"
    else if (vierer)
        return "Poker";
    else if (dreier && zweier)
        return "Full";
    else
        return "nix";
}
function BestimmeZahlenAnzahl() {
    for (let ii = 0; ii < 6; ii++)
        ZahlenAnzahl[ii] = 0
    for (let ii = 0; ii < 5; ii++)
        ZahlenAnzahl[tds0[ii].innerHTML-1]++;
}

function init() {
    glAnz1 = 0;
    document.getElementById("Anz1").innerHTML = decodeURI("Anzahl W%C3%BCrfe:") + glAnz1;
    t = document.getElementById("tWurf");
    trs = t.getElementsByTagName("tr");
    tds = trs[1].getElementsByTagName("td");
    tds0 = trs[0].getElementsByTagName("td");
    let hh = hoehe / 15 + "px";
    for (let ii = 0; ii < 5; ii++) {
        tds[ii].innerText = "not fixed";
        tds0[ii].style.height = hh;
    }

    for (let ii = 1; ii < 6; ii++) {
        for (let jj = 0; jj < 13; jj++) {
            if ((ii == 1 && jj > 0) || (ii == 5 && jj < 12))
                document.getElementById("tZettel").children[0].children[jj].children[ii].style.background = "grey";
            else
                document.getElementById("tZettel").children[0].children[jj].children[ii].style.background = "white";
        }
    }
}
function init2() {    
    for (let ii = 0; ii < 6; ii++) {
        document.getElementById("tZettel").children[0].children[7 - 1].children[ii].style.visibility = "hidden";
    }
    for (let ii = 6; ii < 13; ii++)
        document.getElementById("tZettel").children[0].children[ii].children[6].style.visibility = "hidden";
}
function tWurfclick(num) {
    if (tds[num - 1].innerHTML == "not fixed") {
        tds[num - 1].innerHTML = "fixed    ";
        tds0[num - 1].style.background = "green";
    }
    else {
        tds[num - 1].innerText = "not fixed";
        tds0[num - 1].style.background = "white";
    }
}

/*



document.getElementById('Zahl1').innerHTML = rand()
document.getElementById('Zahl2').innerHTML = rand()
document.getElementById('Zahl3').innerHTML = rand()
document.getElementById('Zahl4').innerHTML = rand()
document.getElementById('Zahl5').innerHTML = rand()
let A1 = document.getElementById('Anz1').innerHTML;
A1++;
document.getElementById('Anz1').innerHTML = A1;
let A2 = document.getElementById('Anz2').innerHTML;
A2++;
document.getElementById('Anz2').innerHTML = A2;

*/