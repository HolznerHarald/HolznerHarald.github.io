// JavaScript source code
//  geht erstnach def.! document.getElementById("f1").innerHTML = "not";
function Start() {
    document.getElementById("Startbutton").style.visibility = "hidden";
    document.getElementById("Naechsterbutton").style.visibility = "visible";
    document.getElementById("Nachricht").innerHTML = "Ergebnis schreiben oder einzelne Würfe fixieren, nächster Wurf";
    nextthrow()
}
function nextbutton() {
    if (Anz2 == 0 || Anz2 == 3)
        nextthrow();
    else
        nextsubthrow();
}
function nextthrow() {
    glAnz1++;
    document.getElementById("Anz1").innerHTML = decodeURI("Anzahl W%C3%BCrfe:") + glAnz1;
    glAnz2=1;
    document.getElementById("Anz2").innerHTML = "Anzahl im Wurf:" + glAnz2;
    document.getElementById("Naechsterbutton").style.visibility = "visible";
    for (let ii = 0; ii < 5; ii++) {
        tds[ii].innerHTML = "not fixed";
        tds0[ii].style.background = "white";
        tds0[ii].innerHTML = rand();
    }
}
function nextsubthrow() {
    glAnz2++;
    document.getElementById("Anz2").innerHTML = "Anzahl im Wurf:" + glAnz2;
    if (glAnz2 == 3)
        document.getElementById("Naechsterbutton").style.visibility = "hidden";

    for (let ii = 0; ii < 5; ii++) {
        if (tds[ii].innerHTML == "not fixed")
            tds0[ii].innerHTML = rand();
    }
}
function rand() {  
    let zz = Math.floor(Math.random() * 6) + 1;
    return zz;
}
function feldclick(fnr) {
    if (document.getElementById("Startbutton").style.visibility != "hidden") {
        alert("Zuerst Start-Button anklicken!")
        return;
    }
    if (document.getElementById("tZettel").children[0].children[fnr - 1].children[0].style.background == "red") {
        alert("Feld ist bereits beschrieben!")
        return;
    }
    document.getElementById("tZettel").children[0].children[fnr - 1].children[0].style.background = "red";
    let summe = 0;
    if (fnr < 7) {
        for (let ii = 0; ii < 5; ii++)
            if (tds0[ii].innerHTML == fnr)
                summe = summe + fnr;
        document.getElementById("tZettel").children[0].children[fnr - 1].children[0].innerHTML = summe;
    }
    else if (fnr == 8) {//Min
        for (let ii = 0; ii < 5; ii++)
            summe = summe + Number(tds0[ii].innerHTML);
        let f9 = Number(document.getElementById("tZettel").children[0].children[9 - 1].children[0].innerHTML)
        if (f9 != -1 && summe >= f9)
            document.getElementById("tZettel").children[0].children[fnr - 1].children[0].innerHTML = 0;
        else
            document.getElementById("tZettel").children[0].children[fnr - 1].children[0].innerHTML = summe;
    }
    else if (fnr == 9) {//Max
        for (let ii = 0; ii < 5; ii++)
            summe = summe + Number(tds0[ii].innerHTML);
        let f8 = Number(document.getElementById("tZettel").children[0].children[8 - 1].children[0].innerHTML)
        if (f8 != -1 && summe <= f8)
            document.getElementById("tZettel").children[0].children[fnr - 1].children[0].innerHTML = 0;
        else
            document.getElementById("tZettel").children[0].children[fnr - 1].children[0].innerHTML = summe;
    }
    else if (fnr == 10) {
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
            document.getElementById("tZettel").children[0].children[fnr - 1].children[0].innerHTML = 25;
        else document.getElementById("tZettel").children[0].children[fnr - 1].children[0].innerHTML = 0;
    }
    else if (fnr == 11) {
        let possibleStreet= true;
        BestimmeZahlenAnzahl()
        for (let ii = 0; ii < 5; ii++)
            if (ZahlenAnzahl[ii] > 1)
                possibleStreet = false;

        if (possibleStreet && (ZahlenAnzahl[0] == 0 || ZahlenAnzahl[5]==0))
            document.getElementById("tZettel").children[0].children[fnr - 1].children[0].innerHTML = 30;
        else document.getElementById("tZettel").children[0].children[fnr - 1].children[0].innerHTML = 0;
    }
    else if (fnr == 12) {
        let vierer = false;
        BestimmeZahlenAnzahl()
        for (let ii = 0; ii < 5; ii++)
            if (ZahlenAnzahl[ii] == 4)
                vierer = true;
            
        if (vierer)
            document.getElementById("tZettel").children[0].children[fnr - 1].children[0].innerHTML = 40;
        else document.getElementById("tZettel").children[0].children[fnr - 1].children[0].innerHTML = 0;
    }
    else if (fnr == 13) {
        let funfer = false;
        BestimmeZahlenAnzahl()
        for (let ii = 0; ii < 5; ii++)
            if (ZahlenAnzahl[ii] == 5)
                funfer = true;

        if (funfer)
            document.getElementById("tZettel").children[0].children[fnr - 1].children[0].innerHTML = 50;
        else document.getElementById("tZettel").children[0].children[fnr - 1].children[0].innerHTML = 0;
    }
    // Nächsten Wurf vorbereiten
    if (glAnz1 == 12) {
        document.getElementById("Nachricht").innerHTML = "Spiel beendet, Ergebnis siehe unten";
        document.getElementById("Startbutton").style.visibility = "visible";
        document.getElementById("Naechsterbutton").style.visibility = "hidden";
        let Summe = 0;
        for (let ii = 0; ii < 13; ii++)
            if (ii!=6)
                Summe = Summe + Number(document.getElementById("tZettel").children[0].children[ii].children[0].innerHTML)
        document.getElementById("Ergebnis").innerHTML = Summe;
    }
    else
        nextthrow();
    
    //  document.getElementById(fnr).style.background = "red";
}
function BestimmeZahlenAnzahl() {
    for (let ii = 0; ii < 6; ii++)
        ZahlenAnzahl[ii] = 0
    for (let ii = 0; ii < 5; ii++)
        ZahlenAnzahl[tds0[ii].innerHTML-1]++;
}

function init() {
    t = document.getElementById("tWurf");
    trs = t.getElementsByTagName("tr");
    tds = trs[1].getElementsByTagName("td");
    tds0 = trs[0].getElementsByTagName("td");
    for (let ii = 0; ii <5;ii++)
        tds[ii].innerText = "not fixed";
    document.getElementById("tZettel").children[0].children[7 - 1].children[0].style.visibility = "hidden";

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