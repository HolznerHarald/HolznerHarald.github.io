// JavaScript source code
class Spiel {
    constructor() {        
        this.VarAnz = 0;
        this.StartFeld = init(0);
        this.StartFarbe = 'w';
        this.StartPositionRoch = [0, 4, 7];
        this.Rochademoeglich = [[true, true], [true, true]];        
        this.Stell = new Stellung(this.StartFeld, this.StartFarbe, 1, "SZF:", [-1, -1, -1, -1], this.Rochademoeglich, this.StartPositionRoch);        
        //sFeld = this.Stell.Feld.slice();
        sFeld = FeldCopy(this.Stell.Feld);
        IMGFill();    
        this.bewerten = true;
        this.aktuellerZug = 0;
        this.SZugFolge = [];        
        this.ErstesZweitesFeld = 0;    
        this.StartEbeneBewertung = -1;
    }   

    MouseClick(xx, yy) {
        if (this.ErstesZweitesFeld === 0) {
            this.VonFeldSetzen(yy, xx);
        }
        else if (this.ErstesZweitesFeld === 1) {
            this.FeldFarbeReset(this.VonFeld);
            if (yy === this.VonFeld[0] && xx === this.VonFeld[1]) {
                this.ErstesZweitesFeld = 0;
            }
            else {
                this.VonFeldSetzen(yy, xx);
            }
        }
        else if (this.ErstesZweitesFeld === 2) {
            if (this.VonFeld[0] === yy && this.VonFeld[1] === xx) {
                this.FeldFarbeReset(this.VonFeld);
                this.ErstesZweitesFeld = 0;
            }
            else {
                this.FeldZuSetzen(yy, xx);
            }
        }
        else if (this.ErstesZweitesFeld === 3) {
            if (this.VonFeld[0] === yy && this.VonFeld[1] === xx) {
                this.FeldFarbeReset(this.VonFeld);
                this.FeldFarbeReset(this.ZuFeld);
                this.ErstesZweitesFeld = 0;
            }
            else if (this.ZuFeld[0] === yy && this.ZuFeld[1] === xx) {
                this.FeldFarbeReset(this.ZuFeld);
                this.ErstesZweitesFeld = 2;
            }
            else {
                this.FeldFarbeReset(this.ZuFeld);
                this.FeldZuSetzen(yy, xx);
            }
        }
    }

    MacheComputerZug() {
        let moveNumber;
        let possibleMoves;
        let currentTime = new Date();
        let hzug;

        if (this.Stell.lZuege.length === 0) {
            let status = this.Stell.MattPatt();
            
            if (status === "MM") {
                document.getElementById("p1").innerText += " Matt, Spiel beendet";
            } else if (status === "PP") {
                document.getElementById("p1").innerText += " Patt, Spiel beendet";
            }
            return;
        }

        if (!this.bewerten) {
            let rnd = Math.floor(Math.random() * this.Stell.lZuege.length);
            hzug = this.Stell.lZuege[rnd];
        } else {
            this.StartEbeneBewertung = this.Stell.Ebene;
            let startEbBew = this.StartEbeneBewertung;
            this.Stell.RekursivBewerten(startEbBew, -1001);

            hzug = this.Stell.lZuege[this.Stell.StatuspunkteZugNr];

            let filePath = 'C:\\C#\\DataA1.csv';
            let output = [];
            output.push("Varianten-Anzahl:" + this.VarAnz.toString());
            output.push((new Date() - currentTime).toString());

            for (let i = output.length - 1; i >= 0; i--) {
                output.push(output[i]);
            }

            //???  Datei??? fs.writeFileSync(filePath, output.join('\n'));
        }
        this.ZugVomSpielAus(hzug);
    }


    ZugVomSpielAus(hzug) {
        if (this.aktuellerZug < this.SZugFolge.length) {
            this.SZugFolge.splice(this.aktuellerZug, this.SZugFolge.length - this.aktuellerZug);
            document.getElementById("p1").innerText="";

            for (let i = 0; i < this.aktuellerZug; i++) {
                this.Zugschreiben(this.SZugFolge[i], i + 1);
            }
        }
        this.aktuellerZug++;
        this.SZugFolge.push(hzug);
        this.ZugFolgeInDatei();

        this.Zugschreiben(this.SZugFolge[this.aktuellerZug - 1], this.aktuellerZug);
        this.Zugausfuehren(hzug);
    }

    ZugFolgeInDatei() {                  
        let moveString = "";
        for (let ii = 0; ii < this.aktuellerZug; ii++) {            
            for (let jj = 0; jj < this.SZugFolge[ii].length; jj++) {
                moveString += this.SZugFolge[ii][jj].toString();
            }   
            moveString += '\n';
        }        
        localStorage.removeItem("Zuege");
        localStorage.setItem("Zuege",moveString);        
    }

    Zugvorzurueck(wohin)
    {
        if (wohin == 0) {
            this.aktuellerZug = 0;
        }
        else if (wohin == 1) {
            if (this.aktuellerZug > 0)
                this.aktuellerZug--;
        }
        else if (wohin == 2) {
            if (this.aktuellerZug < this.SZugFolge.length)
                this.aktuellerZug++;
        }
        else if (wohin == 3)
            this.aktuellerZug = this.SZugFolge.length;


        this.StellungAufbauen(this.SZugFolge);
    }

    Zugausfuehren(hzug) {
        let Farbe = 0;
        let GFarbe = 1;
        if (this.Stell.AmZug == 'w') {
            Farbe = 1;
            GFarbe = 0;
        }
        /*
        if (this.Rochademoeglich[Farbe][0] || this.Rochademoeglich[Farbe][1]) {
            if (hzug[0] == Farbe * 7) {
                if (hzug[1] == this.StartPositionRoch[0])
                    this.Rochademoeglich[Farbe][0] = false;
                else if (hzug[1] == this.StartPositionRoch[2])
                    this.Rochademoeglich[Farbe][1] = false;
                else if (hzug[1] == this.StartPositionRoch[1]) {
                    this.Rochademoeglich[Farbe][0] = false;
                    this.Rochademoeglich[Farbe][1] = false;
                }
            }
        }

        if (this.Rochademoeglich[GFarbe][0] || this.Rochademoeglich[GFarbe][1]) {
            if (hzug[2] == GFarbe * 7) {
                if (hzug[3] == this.StartPositionRoch[0])
                    this.Rochademoeglich[GFarbe][0] = false;
                else if (hzug[3] == this.StartPositionRoch[2])
                    this.Rochademoeglich[GFarbe][1] = false;
            }
        }*/
        let fFeld = this.Stell.ErzeugeFeld(hzug);
        let hRochademoeglich = this.Stell.ErzeugeRochM(hzug);
        this.Stell = new Stellung(fFeld, this.Stell.Gegner, this.Stell.Ebene + 1, this.Stell.Zugfolge, hzug, hRochademoeglich,this.StartPositionRoch);
        this.Status = this.Stell.MattPatt();

        if (this.Status == "MM")
            document.getElementById("p1").innerText += " Checkmate, game over";
        else if (this.Status == "PP")
            document.getElementById("p1").innerText += " Stalemate, game over";
        
        // ??? p1.ScrollToEnd();

        sFeld = FeldCopy(this.Stell.Feld);
        //sFeld = this.Stell.Feld.slice();
        IMGFill();
    }

    VonFeldSetzen(yy, xx) {
        this.VonFeld = [yy, xx];

        if (this.Stell.Feld[yy][xx][0] === this.Stell.AmZug) {
            this.ErstesZweitesFeld = 2;
            document.getElementById("ID" + yy + xx).style.backgroundColor = 'orange'; 
        }
        else {
            this.ErstesZweitesFeld = 1;
            document.getElementById("ID" + yy + xx).style.backgroundColor = 'red';             
        }
    }

    FeldZuSetzen(yy, xx) {
        let hzug = [this.VonFeld[0], this.VonFeld[1], yy, xx];
        hzug = this.Stell.Zuggefunden(hzug);

        // umwandeln
        if (hzug.length == 5 && hzug[4] < 5) {
            
            this.Umwandeln(hzug);
            document.getElementById("sd").showModal();
            return;            
        }

        if (hzug[0] != -1) {
            this.EndeVonZug(hzug);            
        }
        else {
            this.ErstesZweitesFeld = 3;
            this.ZuFeld = [yy, xx];
            document.getElementById("ID" + yy + xx).style.backgroundColor = 'red';  
        }
    }
    EndeVonZug(hzug) {
        this.FeldFarbeReset(this.VonFeld);
        this.ErstesZweitesFeld = 0;
        this.ZugVomSpielAus(hzug);
        if (GegenPC)
            this.MacheComputerZug();
    }   

    Zugschreiben(hzug, ZugNr) {
        let hs = "";
        for (let ii = 0; ii < hzug.length; ii++)
            hs += hzug[ii].toString();
        let hs1 = "";
        hs1 += afeld[hzug[1]];
        hs1 += (8 - hzug[0]).toString() + ":";
        hs1 += afeld[hzug[3]];
        hs1 += (8 - hzug[2]).toString();
        if (hzug.length > 4) {
            if (hzug[4] == 1)
                hs1 += 'Q';
            else if (hzug[4] == 2)
                hs1 += 'R';
            else if (hzug[4] == 3)
                hs1 += 'B';
            else if (hzug[4] == 4)
                hs1 += 'N';
            else if (hzug[4] == 6)
                hs1 = "0-0-0";
            else if (hzug[4] == 7)
                hs1 = "0-0";
        }
        if (ZugNr % 2 != 0)
            hs1 = ((ZugNr + 1) / 2).toString() + '.' + hs1;
        else
            hs1 = "  " + hs1 + "\n";

        document.getElementById("p1").innerText += hs1;
        //document.getElementById("p1").scrollTo({ top: document.getElementById("p1").scrollHeight });
        var elem= document.getElementById("p1");
        //elem.scrollTo(0, elem.scrollHeigth);
        elem.scrollTop = elem.scrollHeight;

    }    

    FeldFarbeReset(vonzuFeld) {
        if ((vonzuFeld[0] + vonzuFeld[1]) % 2 == 1)
            document.getElementById("ID" + vonzuFeld[0] + vonzuFeld[1]).style.backgroundColor = 'sienna';                         
        else
            document.getElementById("ID" + vonzuFeld[0] + vonzuFeld[1]).style.backgroundColor = 'LightGray';                         
    }    

    StellungAufbauen(hsZugFolge) {
        this.ErstesZweitesFeld = 0;
        init(0);
        this.Stell = new Stellung(this.StartFeld, this.StartFarbe, 1, "SZF:", [-1, -1, -1, -1], [[true, true],[true, true]], this.StartPositionRoch);

        for (var ii = 0; ii < this.aktuellerZug; ii++) {            
            this.Zugausfuehren(hsZugFolge[ii]);
        }
        if (this.aktuellerZug === 0) {
            //sFeld = this.Stell.Feld.slice();
            sFeld = FeldCopy(this.Stell.Feld);
            IMGFill();
        }
        this.SZugFolge = hsZugFolge;
    }
    Drehe() {
        if (weissUnten)
            weissUnten = false;
        else
            weissUnten = true;

        IMGFill();
    }

    Umwandeln(hzug) {
    umwandelnhzug = hzug;
    document.getElementById("sd").hidden = false;

    para = document.createElement("img");
    hs = "figuren\\" + "wq.png";
    para.src = hs;
    para.style.width = 50 + "px";
    para.style.height = 50 + "px";
    para.style.backgroundColor = 'sienna';
    document.getElementById("CloseB").replaceChildren();
    document.getElementById("CloseB").appendChild(para)

    para = document.createElement("img");
    hs = "figuren\\" + "wr.png";
    para.src = hs;
    para.style.width = 50 + "px";
    para.style.height = 50 + "px";
    para.style.backgroundColor = 'sienna';
    document.getElementById("CloseB2").replaceChildren();
    document.getElementById("CloseB2").appendChild(para)

    para = document.createElement("img");
    hs = "figuren\\" + "wb.png";
    para.src = hs;
    para.style.width = 50 + "px";
    para.style.height = 50 + "px";
    para.style.backgroundColor = 'sienna';
    document.getElementById("CloseB3").replaceChildren();
    document.getElementById("CloseB3").appendChild(para)

    para = document.createElement("img");
    hs = "figuren\\" + "wn.png";
    para.src = hs;
    para.style.width = 50 + "px";
    para.style.height = 50 + "px";
    para.style.backgroundColor = 'sienna';
    document.getElementById("CloseB4").replaceChildren();
    document.getElementById("CloseB4").appendChild(para)
}

}

    