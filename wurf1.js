// <button onclick="window.location.href='/css_page.html'">CSS page</button>
// statt next58()

// todos Würfelfotos, letzten Wurf anzeigen, zurücknehmen

// JavaScript source code
//  geht erstnach def.! document.getElementById("f1").innerHTML = "not";
function F2() {
    var i1 = document.getElementById("ic1");
    var i2 = document.getElementById("ic2");
    var x = document.getElementById("myLinks");

    if (x.style.display === "block") {
        x.style.display = "none";
        i1.style.display = "block";
        i2.style.display = "none";
    } else {
        x.style.display = "block";
        i2.style.display = "block";
        i1.style.display = "none";
    }
}
function Start() {
    if (glAnz1 > 0)
        location.reload();
    document.getElementById("Startbutton").style.visibility = "hidden";
    document.getElementById("Naechsterbutton").style.visibility = "visible";
    document.getElementById("Nachricht").innerHTML = decodeURI("Ergebnis schreiben oder einzelne W%C3%BCrfe fixieren oder n%C3%A4chster Wurf");
    nextthrow()
}
function nextbutton() {
        nextsubthrow();
}
function next58() {

   // const myWindow = window.open("BestenListe.html", "", "width=2000,height=1000");
   // myWindow.focus();
   // return;   // for test remove !!!

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
    document.getElementById("Anz2").innerHTML = "Anzahl im Wurf:" + glAnz2;
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
    document.getElementById("Anz2").innerHTML = "Anzahl im Wurf:" + glAnz2;
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
    if (document.getElementById("Startbutton").style.visibility != "hidden") {
        alert("Zuerst Start-Button anklicken!")
        return;
    }
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
    BestimmeZahlenAnzahl();
    let fig = figur();    
    if (fig != "nix" && document.getElementById("Servieren").innerHTML == "serviert")
        Servierungsfaktor = 2;

    let summe = 0;
    if (rnr < 7) {
        for (let ii = 0; ii < 5; ii++)
            if (tds0[ii].innerHTML == rnr)
                summe = summe + rnr;
        schreiben(rnr, snr, summe * Servierungsfaktor);
        //document.getElementById("tZettel").children[0].children[rnr - 1].children[snr].innerHTML = summe * Servierungsfaktor;
    }
    else if (rnr == 8) {//Min
        for (let ii = 0; ii < 5; ii++)
            summe = summe + Number(tds0[ii].innerHTML);
        let f9 = Number(document.getElementById("tZettel").children[0].children[9 - 1].children[snr].innerHTML)
        if (f9 != -1 && summe >= f9)
            schreiben(rnr, snr, 0);
            //document.getElementById("tZettel").children[0].children[rnr - 1].children[snr].innerHTML = 0;
        else
            schreiben(rnr, snr, summe);
            //document.getElementById("tZettel").children[0].children[rnr - 1].children[snr].innerHTML = summe;
    }
    else if (rnr == 9) {//Max
        for (let ii = 0; ii < 5; ii++)
            summe = summe + Number(tds0[ii].innerHTML);
        let f8 = Number(document.getElementById("tZettel").children[0].children[8 - 1].children[snr].innerHTML)
        if (f8 != -1 && summe <= f8)
            schreiben(rnr, snr, 0);
            //document.getElementById("tZettel").children[0].children[rnr - 1].children[snr].innerHTML = 0;
        else
            schreiben(rnr, snr, summe);
            //document.getElementById("tZettel").children[0].children[rnr - 1].children[snr].innerHTML = summe;
    }
    else if (rnr == 10) {
        if (fig =="Full")
            schreiben(rnr, snr, 25 * Servierungsfaktor);
            //document.getElementById("tZettel").children[0].children[rnr - 1].children[snr].innerHTML = 25 * Servierungsfaktor;
        else schreiben(rnr, snr, 0);
            //document.getElementById("tZettel").children[0].children[rnr - 1].children[snr].innerHTML = 0;
    }
    else if (rnr == 11) {
        if (fig == "Street")
            schreiben(rnr, snr, 30 * Servierungsfaktor);
            //document.getElementById("tZettel").children[0].children[rnr - 1].children[snr].innerHTML = 30 * Servierungsfaktor;
        else schreiben(rnr, snr,0);
            //document.getElementById("tZettel").children[0].children[rnr - 1].children[snr].innerHTML = 0;
    }
    else if (rnr == 12) {
        if (fig == "Poker")        
            schreiben(rnr, snr, 40 * Servierungsfaktor);
            //document.getElementById("tZettel").children[0].children[rnr - 1].children[snr].innerHTML = 40 * Servierungsfaktor;
        else schreiben(rnr, snr, 0);
            //document.getElementById("tZettel").children[0].children[rnr - 1].children[snr].innerHTML = 0;
    }
    else if (rnr == 13) {
        if (fig == "Grande")
            schreiben(rnr, snr, 50 * Servierungsfaktor);
            //document.getElementById("tZettel").children[0].children[rnr - 1].children[snr].innerHTML = 50 * Servierungsfaktor;
        else schreiben(rnr, snr, 0);
            //document.getElementById("tZettel").children[0].children[rnr - 1].children[snr].innerHTML = 0;
    }
    // Nächsten Wurf vorbereiten
    if (glAnz1 == 60) {
        document.getElementById("Nachricht").innerHTML = "Spiel beendet, Ergebnis siehe unten";
        document.getElementById("Startbutton").innerHTML = "Neues Spiel";
        document.getElementById("Startbutton").style.visibility = "visible";
        document.getElementById("Naechsterbutton").style.visibility = "hidden";
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
        //Bestenliste
        let BestenListe = localStorage.getItem("BestenListe");
        let tim = new Date();        

        let tim2 = tim.toDateString() + " " + tim.toTimeString();
        tim2 = tim2.substring(4, 21);
       
        if (localStorage.getItem("BestenListe") === null) {            
            BestenListe = Summe.toString() + " Punkte um: " + tim2 + ";";
        }
        else {
            BestenListe = BestenListe + Summe.toString() + " Punkte um: " + tim2 + ";";
        }    
        
        localStorage.setItem("BestenListe", BestenListe);    
    }
    else
        nextthrow();
    
    //  document.getElementById(rnr).style.background = "red";
}

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
    let hh = hoehe / 15 + "px";


    for (let ii = 0; ii < 5; ii++) {
        tds[ii].innerText = "not fixed";
        tds0[ii].style.height = hh;
    }
    for (let ii = 0; ii < 6; ii++) {
        document.getElementById("tZettel").children[0].children[7 - 1].children[ii].style.visibility = "hidden";
    }
    for (let ii = 6; ii < 13; ii++)
        document.getElementById("tZettel").children[0].children[ii].children[6].style.visibility = "hidden";
    for (let ii = 1; ii < 6; ii++) {
        for (let jj = 0; jj < 13; jj++) {
            if ((ii == 1 && jj > 0) || (ii == 5 && jj < 12))
                document.getElementById("tZettel").children[0].children[jj].children[ii].style.background = "grey";
            else
                document.getElementById("tZettel").children[0].children[jj].children[ii].style.background = "white";
        }
    }

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
//*****************Main Prozedur **********************/
let hoehe = window.innerHeight;   // clientHeight ohne horizontale scrollbar
let Weite = window.innerWidth;
document.getElementById("tWurf").style.width = Weite;
document.getElementById("tWurf").style.height = hoehe;
//document.getElementById("wei").innerText = "W:" + Weite;

let t
let trs
let tds
let tds0
let glAnz1 = 0
let glAnz2 = 0
let ZahlenAnzahl = [0, 0, 0, 0, 0, 0]
//document.getElementById("tZettel").style.fontSize = hhF;
let hhF = hoehe / 35 + "px";
document.getElementsByTagName('body')[0].style.fontSize = hhF;
document.getElementsByTagName('button')[0].style.fontSize = hhF;
document.getElementsByTagName('button')[1].style.fontSize = hhF;
document.getElementsByTagName('button')[2].style.fontSize = hhF;
document.getElementsByTagName('button')[3].style.fontSize = hhF;
let hhF2 = hoehe / 10 + "px";

let BrettHW = Math.min(hoehe / 2, Weite);
if (Weite > hoehe * 1.2)
    BrettHW = 0.75 * (hoehe - 20);
let hss1 = (BrettHW / 11) + "px";

document.getElementById("myLinks").style.width = BrettHW * 0.8 + "px";

document.getElementById("ic1").style.fontSize = hss1;
document.getElementById("ic2").style.fontSize = hss1;
document.getElementById("a1").style.fontSize = hss1;
document.getElementById("a2").style.fontSize = hss1;
document.getElementById("a3").style.fontSize = hss1;
document.getElementById("a4").style.fontSize = hss1;

document.getElementById("container").style.position = "absolute";

document.getElementById('ZReihe').style.fontSize = hhF2;
init();

