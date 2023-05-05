// todos Würfelfotos, letzten Wurf anzeigen, zurücknehmen
//Memo
/* so gehts
 let t = document.getElementById("tWurf");
 let trs = t.getElementsByTagName("tr");
 let tds = trs[0].getElementsByTagName("td");
 tds[3].innerText = 33333;*/
/* so auch
document.write(document.getElementById("tWurf").children.item(0).children.item(1).children.item(0).innerHTML)*/
/* und so auch
document.write(document.getElementById("tWurf").children[0].children[0].children[0].innerHTML)*/

// JavaScript source code
function initNurEinmal() {
 
    let hhF = hoehe / 35 + "px";    
    document.getElementsByTagName('body')[0].style.fontSize = hhF;
    document.getElementsByTagName('button')[0].style.fontSize = hhF;
    document.getElementsByTagName('button')[1].style.fontSize = hhF;
    let hhF2 = hoehe / 10 + "px";
    document.getElementById('ZReihe').style.fontSize = hhF2;
    let hhF3 = hoehe / 20 + "px";
    document.getElementById('Naechsterbutton').style.fontSize = hhF3;
    document.getElementById('Anz2').style.fontSize = hhF3;
    t = document.getElementById("tWurf");
    trs = t.getElementsByTagName("tr");
    tds = trs[1].getElementsByTagName("td");
    tds0 = trs[0].getElementsByTagName("td");
    let hh = hoehe / 15 + "px";
    for (let ii = 1; ii < 6; ii++) {      
        tds0[ii].style.height = hh;
    }
    let hh1;
    if (hoehe < Weite)
       hh1 = hoehe / 25 + "px";
    else hh1 = hoehe / 15 + "px";

    for (let ii = 0; ii < 14; ii++) {
        document.getElementById("tZettel").children[0].children[ii].style.height = hh1;
    }
    initAlle60();
    initGrau()
    glAnz2 = 0;
    document.getElementById("Anz2").innerHTML = glAnz2 + ".Wurf";
    tds[0].style.visibility = "hidden";
    tds[6].style.visibility = "hidden";
    tds0[0].style.background = "orange";
    

    /*
    if (Weite >= 768) {
        Weite = Weite * 0.7;
    }
    hhF4 = Weite / 8 + "px";
    for (let ii = 0; ii < document.getElementsByTagName('td').length; ii++) {
        //  document.getElementsByTagName('td')[ii].style.minWidth= hhF4;
    }
    hhF5 = Weite * 6 / 8 + "px";;
    // document.getElementById('Nachricht').style.maxWidth = hhF5;
    */   
 

}
function initAlle60() {
    document.getElementById("Naechsterbutton").style.background = "red"
    glAnz1 = 0;
    document.getElementById("Anz1").innerHTML = decodeURI("Anzahl W%C3%BCrfe:") + glAnz1;
 
    for (let ii = 1; ii < 6; ii++) {
        tds[ii].innerText = "not fixed";
    }
    for (let ii = 1; ii < 6; ii++) {
        for (let jj = 0; jj < 13; jj++) {
            document.getElementById("tZettel").children[0].children[jj].children[ii].innerHTML = "NNN";
            if ((ii == 1 && jj > 0) || (ii == 5 && jj < 12))
                document.getElementById("tZettel").children[0].children[jj].children[ii].style.background = "grey";
            else
                document.getElementById("tZettel").children[0].children[jj].children[ii].style.background = "white";
        }
    }
    for (let ii = 0; ii < 7; ii++) {
        document.getElementById("tZettel").children[0].children[7 - 1].children[ii].style.visibility = "hidden";
        document.getElementById("tZettel").children[0].children[14 - 1].children[ii].style.visibility = "hidden";
    }
    for (let ii = 6; ii < 13; ii++)
        document.getElementById("tZettel").children[0].children[ii].children[6].style.visibility = "hidden";
}
function initGrau() {
     for (let ii = 1; ii < 6; ii++) {
        for (let jj = 0; jj < 13; jj++) {
            document.getElementById("tZettel").children[0].children[jj].children[ii].style.background = "grey";           
        }
     }
}
function Neustart() {
    initAlle60();
    document.getElementById("Naechsterbutton").innerHTML = "Werfe!";
    document.getElementById("Nachricht").innerHTML = decodeURI("Ergebnis schreiben oder einzelne W%C3%BCrfe fixieren oder n%C3%A4chster Wurf");
    nextthrow();
}
function Testzahlen() {
    tds0[1].innerHTML = 2;
    tds0[2].innerHTML = 2;
    tds0[3].innerHTML = 3;
    tds0[4].innerHTML = 3;
    tds0[5].innerHTML = 3;
}
function nextbutton() {
    if (document.getElementById("Naechsterbutton").style.background != "red") {
        alert('zuerst schreiben!')
        return;
    } 
    if (document.getElementById("Naechsterbutton").innerHTML == "Start") {
        initAlle60();
        document.getElementById("Naechsterbutton").innerHTML = "Werfe!";
        document.getElementById("Nachricht").innerHTML = decodeURI("Ergebnis schreiben oder einzelne W%C3%BCrfe fixieren oder n%C3%A4chster Wurf");
        nextthrow();
    }    
    else if (Anz2 == 3)
        nextthrow();
    else
        nextsubthrow();
}
function nextthrow() {
    document.getElementById("Servieren").innerHTML = "serviert";
    glAnz1++;
    document.getElementById("Anz1").innerHTML = decodeURI("Anzahl W%C3%BCrfe:") + glAnz1;
    glAnz2=1;
    document.getElementById("Anz2").innerHTML = glAnz2 + ".Wurf";
 
    for (let ii = 1; ii < 6; ii++) {
        tds[ii].innerHTML = "not fixed";
        tds0[ii].style.background = "#00FFFF";
        tds[ii].style.background = "#00FFFF";
        tds0[ii].innerHTML = rand();
    }
}
function nextsubthrow() {
    glAnz2++;
    document.getElementById("Anz2").innerHTML = glAnz2 + ".Wurf";
    if (glAnz2 == 3) {
        document.getElementById("Naechsterbutton").style.background = "grey";
    }
    let serviert = true;
    for (let ii = 1; ii < 6; ii++) {
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
    if (document.getElementById("Naechsterbutton").innerHTML == "Start") {
        alert('Zuerst Start anklicken!');
        return;
    }
    snr++;
    if (document.getElementById("tZettel").children[0].children[rnr - 1].children[snr].innerHTML == "NNN" &&
        document.getElementById("tZettel").children[0].children[rnr - 1].children[snr].style.background == "grey") {        
        alert("1.Reihe von oben der Reihe nach,5.Reihe von unten der Reihe nach oben")
        return;
    }
    if (document.getElementById("tZettel").children[0].children[rnr - 1].children[snr].style.background == "grey") {
        alert("Feld ist bereits beschrieben!")
        return;unten
    }
    document.getElementById("tZettel").children[0].children[rnr - 1].children[snr].style.background = "grey";
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
    document.getElementById("Naechsterbutton").style.background = "red";
    let Servierungsfaktor = 1;
    BestimmeZahlenAnzahl();
    let fig = figur();
 
    if (fig != "nix" && document.getElementById("Servieren").innerHTML == "serviert")
        Servierungsfaktor = 2;

    let summe = 0;
    if (rnr < 7) {
        for (let ii = 1; ii < 6; ii++)
            if (tds0[ii].innerHTML == rnr)
                summe = summe + rnr;
        document.getElementById("tZettel").children[0].children[rnr - 1].children[snr].innerHTML = summe * Servierungsfaktor;
    }
    else if (rnr == 8) {//Min
        for (let ii = 1; ii < 6; ii++)
            summe = summe + Number(tds0[ii].innerHTML);
        let f9 = Number(document.getElementById("tZettel").children[0].children[9 - 1].children[snr].innerHTML)
        if (f9 != -1 && summe >= f9)
            document.getElementById("tZettel").children[0].children[rnr - 1].children[snr].innerHTML = 0;
        else
            document.getElementById("tZettel").children[0].children[rnr - 1].children[snr].innerHTML = summe;
    }
    else if (rnr == 9) {//Max
        for (let ii = 1; ii < 6; ii++)
            summe = summe + Number(tds0[ii].innerHTML);
        let f8 = Number(document.getElementById("tZettel").children[0].children[8 - 1].children[snr].innerHTML)
        if (f8 != -1 && summe <= f8)
            document.getElementById("tZettel").children[0].children[rnr - 1].children[snr].innerHTML = 0;
        else
            document.getElementById("tZettel").children[0].children[rnr - 1].children[snr].innerHTML = summe;
    }
    else if (rnr == 10) {
        if(fig == "Full")       
            document.getElementById("tZettel").children[0].children[rnr - 1].children[snr].innerHTML = 25 * Servierungsfaktor;
        else document.getElementById("tZettel").children[0].children[rnr - 1].children[snr].innerHTML = 0;
    }
    else if (rnr == 11) {
        if (fig == "Street")
            document.getElementById("tZettel").children[0].children[rnr - 1].children[snr].innerHTML = 30 * Servierungsfaktor;
        else document.getElementById("tZettel").children[0].children[rnr - 1].children[snr].innerHTML = 0;
    }
    else if (rnr == 12) {
        if (fig == "Poker")
            document.getElementById("tZettel").children[0].children[rnr - 1].children[snr].innerHTML = 40 * Servierungsfaktor;
        else document.getElementById("tZettel").children[0].children[rnr - 1].children[snr].innerHTML = 0;
    }
    else if (rnr == 13) {
        if (fig == "Grande")
            document.getElementById("tZettel").children[0].children[rnr - 1].children[snr].innerHTML = 50 * Servierungsfaktor;
        else
            document.getElementById("tZettel").children[0].children[rnr - 1].children[snr].innerHTML = 0;
    }
    // Spielende
    if (glAnz1 == 60) {
        document.getElementById("Nachricht").innerHTML = "Spiel beendet, Ergebnis siehe unten";
        document.getElementById("Naechsterbutton").innerHTML = "Start";
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
            document.getElementById("tZettel").children[0].children[jj].style.visibility = "visible";
        }
        let Summe = 0;
        for (let ii = 6; ii < 13; ii++) {
            Summe = Summe + Number(document.getElementById("tZettel").children[0].children[ii].children[6].innerHTML)
            document.getElementById("tZettel").children[0].children[ii].children[6].style.visibility = "visible";
        }
        document.getElementById("tZettel").children[0].children[13].children[5].style.visibility = "visible";
        document.getElementById("tZettel").children[0].children[13].children[6].style.visibility = "visible";
        document.getElementById("Ergebnis").innerHTML = Summe;
        initGrau();
        
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
    for (let ii = 1; ii < 6; ii++)
        ZahlenAnzahl[tds0[ii].innerHTML-1]++;
}

function tWurfclick(num) {
    if (tds[num].innerHTML == "not fixed") {
        tds[num].innerHTML = "fixed    ";
        tds0[num].style.background = "green";
        tds[num].style.background = "green";
    }
    else {
        tds[num].innerText = "not fixed";
        tds0[num].style.background = "#00FFFF";
        tds[num].style.background = "#00FFFF";
    }
}
//Testfunction
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
    glAnz2 = 1;
    document.getElementById("Anz2").innerHTML = glAnz2 + ".Wurf";

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