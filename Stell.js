//RochM durchschauen , bewerten?
// JavaScript source code
class Stellung {
    constructor(Feld, AmZug, eben, sZug, letzterZug, bools, StartPositionRoch) {
        this.Feld = FeldCopy(Feld);
        this.AmZug = AmZug;
        this.Ebene = eben;
        this.Zugfolge = sZug;
        this.letzterZug = letzterZug;
        this.RochM = [[bools[0][0], bools[0][1]], [bools[1][0], bools[1][1]]];        
        this.StartPositionRoch = StartPositionRoch;

        this.Status = "NN";
        this.Statuspunkte;
        this.StatuspunkteZugNr = -1;
        this.lZuege = [];
        this.lStell = [];
        //Hilfsfelder um nicht jedesmal zu berechnen
        
        if (AmZug === 'w') {
            this.Gegner = 'b';
            this.iFarbe = 1;
            this.iGFarbe = 0;
        }
        else {
            this.Gegner = 'w';
            this.iFarbe = 0;
            this.iGFarbe = 1;
        }
        this.wk = [-1, -1];
        this.bk = [-1, -1];
        this.ek = [-1, -1];

        //init
        if (!this.feldcheck())
            return;

        if (AmZug === 'w')
            this.ek = this.wk;
        else
            this.ek = this.bk;

        this.FindeZuege();
        this.LoescheUngueltige();        
    }
    FindeZuege() {
        let hk = [-1, -1];
        if (this.AmZug == 'w') {
            hk = this.bk;
        } else {
            hk = this.wk;
        }

        if (this.feldImSchach(hk, this.AmZug, this.Feld)) {
            document.getElementById("p1").innerText += "Error: K\u00f6nig des Gegners bereits im Schach";
            Fehlerhaft = true;
            return false;
        }

        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (this.Feld[i][j][0] == this.AmZug) {
                    this.hFindeZuege(i, j);
                }
            }
        }
        return true;
    }
    LoescheUngueltige() {
        let eigk = [-1, -1];
        let hFeld = new Array(8);
        for (let i = 0; i < hFeld.length; i++) {
            hFeld[i] = new Array(8);
        }

        let kk = 0;
        while (kk < this.lZuege.length) {
            hFeld = this.ErzeugeFeld(this.lZuege[kk]);
            if (this.lZuege[kk][0] == this.ek[0] && this.lZuege[kk][1] == this.ek[1]) {
                eigk[0] = this.lZuege[kk][2];
                eigk[1] = this.lZuege[kk][3];
            } else {
                eigk[0] = this.ek[0];
                eigk[1] = this.ek[1];
            }

            if (this.feldImSchach(eigk, this.Gegner, hFeld)) {
                this.lZuege.splice(kk, 1);    // List is changing
            } else {
                kk++;
            }
        }
    }
    hFindeZuege(ii, jj) {
        if (this.Feld[ii][jj][1] == 'p') {   //Pawn
            this.BauernZuege(ii, jj);
        } else if (this.Feld[ii][jj][1] == 'r') {   //Rook
            this.TurmZuege(ii, jj);
        } else if (this.Feld[ii][jj][1] == 'b') {   //Bishop
            this.LaeuferZuege(ii, jj);
        } else if (this.Feld[ii][jj][1] == 'q') {   //Queen
            this.TurmZuege(ii, jj);
            this.LaeuferZuege(ii, jj);
        } else if (this.Feld[ii][jj][1] == 'n') {   //Knight
            this.SpringerZuege(ii, jj);
        } else if (this.Feld[ii][jj][1] == 'k') {   //King
            this.KoenigZuege(ii, jj);
        }
    }
    ErzeugeFeld(ints) {
        let hFeld = FeldCopy(this.Feld);
                
        hFeld[ints[2]][ints[3]] = hFeld[ints[0]][ints[1]];
        hFeld[ints[0]][ints[1]] = "ll";
        // Umwandel mit 5.Feld
        if (ints.length > 4) {
            if (ints[4] === 1) {
                hFeld[ints[2]][ints[3]] = hFeld[ints[2]][ints[3]][0] + 'q';
            } else if (ints[4] === 2) {
                hFeld[ints[2]][ints[3]] = hFeld[ints[2]][ints[3]][0] + "r";
            } else if (ints[4] === 3) {
                hFeld[ints[2]][ints[3]] = hFeld[ints[2]][ints[3]][0] + "b";
            } else if (ints[4] === 4) {
                hFeld[ints[2]][ints[3]] = hFeld[ints[2]][ints[3]][0] + "n";
            }
            else if (ints[4] == 5) { //en passe
                if (ints[2] == 2)
                    hFeld[3][ints[3]] = "ll";
                else
                    hFeld[4][ints[3]] = "ll";
            }
            else if (ints[4] == 6) { //Rochade gr0ß
                if (this.AmZug == 'w') {
                    hFeld[7][0] = "ll";
                    hFeld[7][3] = "wr";
                }
                else {
                    hFeld[0][0] = "ll";
                    hFeld[0][3] = "br";
                }
            }
            else if (ints[4] == 7) { //Rochade klein
                if (this.AmZug == 'w') {
                    hFeld[7][7] = "ll";
                    hFeld[7][5] = "wr";
                }
                else {
                    hFeld[0][7] = "ll";
                    hFeld[0][5] = "br";
                }
            }
        }
        return hFeld;
    };
    Zuggefunden(hzug) {
        let ZugGueltig = false;;
        for (let ii = 0; ii < this.lZuege.length; ii++) {
            ZugGueltig = true;
            for (let jj = 0; jj < 4; jj++)
                if (this.lZuege[ii][jj] != hzug[jj])
                ZugGueltig = false;
            if (ZugGueltig) {
                return this.lZuege[ii];
            }
        }
        return [-1, -1, -1, -1];
    }

    MattPatt() {
        let hStatus = "UU";
        if (this.lZuege.length === 0) {
            AnzVar++;
            if (this.feldImSchach(this.ek, this.Gegner, this.Feld)) {
                hStatus = "MM";
            } else {
                hStatus = "PP";
            }
        }
        return hStatus;
    }

    RekursivStatusBestimmenNachfolgeStellungen() {
        if (this.lZuege.length == 0) {
            AnzVar++;
            if (this.feldImSchach(this.ek, this.Gegner, this.Feld))
                this.Status = "MM";
            else
                this.Status = "PP";
        }
        else if (this.Ebene == MattNachTeilzuegen) {
            this.Status = "UU";
            AnzVar++;
        }
        else {   // Mögliche Folge-Objekte Stellung erzeugen und daraus this.Status berechnen
            for (let ii = 0; ii < this.lZuege.length; ii++)

            {     
                let fFeld = this.ErzeugeFeld(this.lZuege[ii]); 
                let SZug = this.fZugfolge(this.lZuege[ii]);
                let hRochademoeglich = this.ErzeugeRochM(this.lZuege[ii]);                                        
                let hstell = new Stellung(fFeld, this.Gegner, this.Ebene + 1, SZug, this.lZuege[ii], hRochademoeglich, this.StartPositionRoch);
                hstell.RekursivStatusBestimmenNachfolgeStellungen();
                this.lStell.push(hstell);
                if (NurSolangeNotwendig) {
                    if (this.AmZug == 'b' && hstell.Status[0] != 'M')
                        break;
                }
            }
            //Status bestimmen
            if (this.AmZug == 'w') {
                this.Status = "NM";
                for (let ii = 0; ii < this.lStell.length; ii++)
                {
                    if (this.lStell[ii].Status[0] == 'M')
                        this.Status = "M0";

                    else
                        this.lStell[ii] = null;
                }
            }
            else  // 'b'
            {
                this.Status = "M0";
                for (let ii = 0; ii < this.lStell.length; ii++)
                {
                    if (this.lStell[ii].Status[0] != 'M')
                        this.Status = "NM";
                }
            }
            if (this.Status == "NM") {
                for (let ii = 0; ii < this.lStell.length; ii++)
                    this.lStell[ii] = null;
            }
            //in Dateischreiben ???
        }        
    }
    MattAnzeigen() {
        if (this.Status === "M0") {
            for (let ii = 0; ii < this.lStell.length; ii++) {
                if (this.lStell[ii] !== null) {
                    this.lStell[ii].MattAnzeigen();
                }
            }
        } else if (this.Status === "MM") {
            AnzLoesungen = AnzLoesungen + 1;
            document.getElementById("p1").innerText = this.Zugfolge.substring(3) + "\n" + document.getElementById("p1").innerText;
        }
    }
    fZugfolge(hzug) {
        let zug = this.Zugfolge + this.AmZug + hzug[0].toString() + hzug[1].toString() + hzug[2].toString() + hzug[3].toString();

        if (hzug.length > 4) {
            switch (hzug[4]) {
                case 1:
                    zug += 'Q';
                    break;
                case 2:
                    zug += 'R';
                    break;
                case 3:
                    zug += 'B';
                    break;
                case 4:
                    zug += 'N';
                    break;
            }
        }

        return zug;
    }
    //InSchachSyntax
    AddMitUmwandeln(hZug) {
        if (hZug[2] == 0 || hZug[2] == 7) {
            for (let ii = 1; ii < 5; ii++) {
                let h2Zug = [hZug[0], hZug[1], hZug[2], hZug[3], ii];
                this.lZuege.push(h2Zug);
            }
        } else {
            this.lZuege.push(hZug);
        }
    }
    BauernZuege(ii, jj) {
        var hZug;

        var Richtung = 0;
        if (this.AmZug == 'w')
            Richtung = -1;
        else
            Richtung = 1;

        if (this.Feld[ii + Richtung][jj] == "ll") {
            hZug = [ii, jj, ii + Richtung, jj];  //umwandeln mit 9
            this.AddMitUmwandeln(hZug);
        }
        if ((this.AmZug == 'w' && ii == 6) || (this.AmZug == 'b' && ii == 1)) {
            if (this.Feld[ii + Richtung][jj] == "ll" && this.Feld[ii + 2 * Richtung][jj] == "ll") {
                hZug = [ii, jj, ii + 2 * Richtung, jj];
                this.lZuege.push(hZug);
            }
        }
        if (jj > 0 && this.Feld[ii + Richtung][jj - 1][0] == this.Gegner) {
            hZug = [ii, jj, ii + Richtung, jj - 1];
            this.AddMitUmwandeln(hZug);
        }
        if (jj < 7 && this.Feld[ii + Richtung][jj + 1][0] == this.Gegner) {
            hZug = [ii, jj, ii + Richtung, jj + 1];
            this.AddMitUmwandeln(hZug);
        }
        //en passe  
        if ((this.AmZug == 'w' && ii == 3) || (this.AmZug == 'b' && ii == 4)) {
            if (this.letzterZug[2] == ii && this.Feld[ii][this.letzterZug[3]] == this.Gegner + "p" &&
                (this.letzterZug[0] == 1 || this.letzterZug[0] == 6)) {
                hZug = [ii, jj, ii + Richtung, this.letzterZug[3], 5 ];
                this.lZuege.push(hZug);
            }
        }
    }
    LaeuferZuege(yy, xx) {
        this.hTurmZuege(yy, xx, 1, 1);
        this.hTurmZuege(yy, xx, -1, 1);
        this.hTurmZuege(yy, xx, 1, -1);
        this.hTurmZuege(yy, xx, -1, -1);
    }
    TurmZuege(yy, xx) {
        this.hTurmZuege(yy, xx, 1, 0);
        this.hTurmZuege(yy, xx, -1, 0);
        this.hTurmZuege(yy, xx, 0, 1);
        this.hTurmZuege(yy, xx, 0, -1);
    }
    hTurmZuege(yy, xx, ry, rx) {
        for (let ii = 1; ii < 8; ii++) {
            if (!FeldaufBrett2(yy + ii * ry, xx + ii * rx)) {
                break;
            }
            if (this.Feld[yy + ii * ry][xx + ii * rx][0] == 'l' ||
                this.Feld[yy + ii * ry][xx + ii * rx][0] == this.Gegner) {
                let hZug = [yy, xx, yy + ii * ry, xx + ii * rx];
                this.lZuege.push(hZug);
            }
            if (this.Feld[yy + ii * ry][xx + ii * rx][0] != 'l') {
                break;
            }
        }
    }
    SpringerZuege(yy, xx) {
        for (let ii = 0; ii < 8; ii++) {
            if (FeldaufBrett3([yy, xx], SprZug[ii][0], SprZug[ii][1])) {
                let hf = this.Feld[yy + SprZug[ii][0]][xx + SprZug[ii][1]];
                if (hf === "ll" || hf[0] === this.Gegner) {
                    let hZug = [yy, xx, yy + SprZug[ii][0], xx + SprZug[ii][1]];
                    this.lZuege.push(hZug);
                }
            }
        }
    }
    KoenigZuege(yy, xx) {
        if (this.RochM[this.iFarbe][0])  //Rochade groß
        {
            let bm = true;
            for (let ii = 2; ii < this.StartPositionRoch[1]; ii++)
            {                            
                if (this.Feld[this.iFarbe * 7][ii] != "ll") {
                    bm = false;
                    break;
                }
            }
            for (let ii = 2; ii <= this.StartPositionRoch[1]; ii++) {
                if (this.feldImSchach([this.iFarbe * 7, ii ], this.Gegner, this.Feld)) {
                    bm = false;
                    break;
                }
            }
            if (bm) {
                let hZug = [this.iFarbe * 7, this.StartPositionRoch[1], this.iFarbe * 7, 2, 6 ];
                this.lZuege.push(hZug);
            }
        }
        if (this.RochM[this.iFarbe][1])  //Rochade klein
        {
            let bm = true;
            for (let ii = this.StartPositionRoch[1] + 1; ii < 7 ; ii++)
            {
                if (this.Feld[this.iFarbe * 7][ ii] != "ll") {
                    bm = false;
                    break;
                }
            }
            for (let ii = this.StartPositionRoch[1]; ii < 7; ii++)
            {
                if (this.feldImSchach([this.iFarbe * 7, ii], this.Gegner, this.Feld)) {
                    bm = false;
                    break;
                }
            }
            if (bm) {
                let hZug = [this.iFarbe * 7, this.StartPositionRoch[1], this.iFarbe * 7, 6, 7 ];
                this.lZuege.push(hZug);
            }
        }
        //Rochade end

        for (let ii = -1; ii <= 1; ii++) {
            for (let jj = -1; jj <= 1; jj++) {
                if (ii === 0 && jj === 0)
                    continue;

                if (FeldaufBrett2(yy + ii, xx + jj)) {
                    if (this.Feld[yy + ii][xx + jj] === "ll" || this.Feld[yy + ii][xx + jj][0] === this.Gegner) {
                        let hZug = [yy, xx, yy + ii, xx + jj];
                        this.lZuege.push(hZug);
                    }
                }
            }
        }
    }  
    feldcheck() {
        for (let ii = 0; ii < 8; ii++) {
            for (let jj = 0; jj < 8; jj++) {
                if (this.Feld[ii][jj] === "ll") {
                    continue;
                } else if (this.Feld[ii][jj][0] == "w" || this.Feld[ii][jj][0] == "b"){
                    let validPieces = "r,n,b,k,q,p";
                    if (validPieces.indexOf(this.Feld[ii][jj][1]) < 0) {
                        document.getElementById("p1").innerText += "Error1 Field:" + ii.toString() + jj.toString();
                        Fehlerhaft = true;
                        return false;
                    }
                } else {
                    document.getElementById("p1").innerText += "Error2 Field:" + ii.toString() + jj.toString();
                    Fehlerhaft = true;
                    return false;
                }
                if (this.Feld[ii][jj] === "wk") {
                    if (this.wk[0] > -1) {
                        document.getElementById("p1").innerText += "Error3 Field 2. K\u00f6nig:" + ii.toString() + jj.toString();
                        Fehlerhaft = true;
                        return false;
                    } else {
                        this.wk[0] = ii;
                        this.wk[1] = jj;
                    }
                }
                if (this.Feld[ii][jj] === "bk") {
                    if (this.bk[0] > -1) {
                        document.getElementById("p1").innerText += "Error4 Field 2. K\u00f6nig:" + ii.toString() + jj.toString();
                        Fehlerhaft = true;
                        return false;
                    } else {
                        this.bk[0] = ii;
                        this.bk[1] = jj;
                    }
                }
            }
        }

        if (this.wk[0] < 0 || this.bk[0] < 0) {
            document.getElementById("p1").innerText += "Error: K\u00f6nig fehlt";
            Fehlerhaft = true;
            return false;
        }
        return true;
    }
    feldImSchach(xy, durchwen, Feld) {
    if (this.KK(xy, durchwen, Feld))
        return true;
    if (this.NN(xy, durchwen, Feld))
        return true;
    if (this.PP(xy, durchwen, Feld))
        return true;
    if (this.QRB(xy, durchwen, Feld))
        return true;

    return false;
    }
    KK(xy, durchwen, Feld) {
        let hs = durchwen + "k";   //König
        for (let ii = -1; ii <= 1; ii++) {
            for (let jj = -1; jj <= 1; jj++) {
                if (ii == 0 && jj == 0)
                    continue;

                if (FeldaufBrett3(xy, ii, jj)) {
                    if (Feld[xy[0] + ii][xy[1] + jj] == hs)
                        return true;
                }
            }
        }
        return false;
    }
    NN(xy, durchwen, Feld) {
    let hs = durchwen + "n";   // Knight
    for (let ii = 0; ii < 8; ii++) {
        if (FeldaufBrett3(xy, SprZug[ii][0], SprZug[ii][1])) {
            if (Feld[xy[0] + SprZug[ii][0]][xy[1] + SprZug[ii][1]] == hs)
                return true;
        }
    }
    return false;
    }
    PP(xy, durchwen, Feld) {
        let hs = durchwen + "p";
        if (durchwen === 'w') {
            if (FeldaufBrett3(xy, 1, -1)) {
                if (Feld[xy[0] + 1][xy[1] - 1] === hs) {
                    return true;
                }
            }
            if (FeldaufBrett3(xy, 1, 1)) {
                if (Feld[xy[0] + 1][xy[1] + 1] === hs) {
                    return true;
                }
            }
        } else {
            if (FeldaufBrett3(xy, -1, -1)) {
                if (Feld[xy[0] - 1][xy[1] - 1] === hs) {
                    return true;
                }
            }
            if (FeldaufBrett3(xy, -1, 1)) {
                if (Feld[xy[0] - 1][xy[1] + 1] === hs) {
                    return true;
                }
            }
        }
        return false;
    }
    QRB(xy, durchwen, Feld) {
        if (this.hQRB(xy, durchwen, Feld, 1, 0))
            return true;
        else if (this.hQRB(xy, durchwen, Feld, 1, 1))
            return true;
        else if (this.hQRB(xy, durchwen, Feld, 0, 1))
            return true;
        else if (this.hQRB(xy, durchwen, Feld, -1, 1))
            return true;
        else if (this.hQRB(xy, durchwen, Feld, -1, 0))
            return true;
        else if (this.hQRB(xy, durchwen, Feld, -1, -1))
            return true;
        else if (this.hQRB(xy, durchwen, Feld, 0, -1))
            return true;
        else if (this.hQRB(xy, durchwen, Feld, 1, -1))
            return true;

        return false;
    }
    hQRB(xy, durchwen, Feld, ry, rx) {
        let sQ = durchwen + "q";
        let sR = durchwen + "r";
        let sB = durchwen + "b";

        for (let ii = 1; ii < 8; ii++) {
            if (!FeldaufBrett3(xy, ii * ry, ii * rx))
                break;
            if (Feld[xy[0] + ii * ry][xy[1] + ii * rx] === "ll")
                continue;

            if (Math.abs(ry) === Math.abs(rx)) {  // Q B
                if (Feld[xy[0] + ii * ry][xy[1] + ii * rx] === sQ ||
                    Feld[xy[0] + ii * ry][xy[1] + ii * rx] === sB)
                    return true;
            } else {   // Q R
                if (Feld[xy[0] + ii * ry][xy[1] + ii * rx] === sQ ||
                    Feld[xy[0] + ii * ry][xy[1] + ii * rx] === sR)
                    return true;
            }
            break;
        }
        return false;
    }
    RekursivBewerten(startEbBew,AbbruchkritVorStellung)
    {
        if (this.lZuege.length == 0) {
           // SpielX.VarAnz++;
            if (this.feldImSchach(this.ek, this.Gegner, this.Feld)) {
                this.Status = "MM";   //kkk
                this.Statuspunkte = -1000;
            }
            else {
                this.Status = "PP";    //kkk
                this.Statuspunkte = 0;
            }
        }
        else if (this.Ebene === startEbBew + BewertungsTiefe) {
            this.Status = "UU";
            this.Statuspunkte = this.StellBewerten(); // Die STellung wurde mit einem weißen Zug erzeugt, daher amzug schwarz und aus schwarzer Sicht wird bewertet, und Zug Anzahl ja auch für Schwarz
            //SpielX.VarAnz++;
        }
        else {   // Mögliche Folge-Objekte Stellung erzeugen und daraus this.Status, Statuspunkte berechnen                
            this.Status = "NM";
            this.Statuspunkte = -1001;

            for (let ii = 0; ii < this.lZuege.length; ii++)
            {
                let fFeld = this.ErzeugeFeld(this.lZuege[ii]);                    
                let SZug = this.fZugfolge(this.lZuege[ii]);//Umwandeln ZugFolge
                let hRochademoeglich = this.ErzeugeRochM(this.lZuege[ii]);
                let hstell = new Stellung(fFeld, this.Gegner, this.Ebene + 1, SZug, this.lZuege[ii], hRochademoeglich, this.StartPositionRoch);
               
                hstell.RekursivBewerten(startEbBew, this.Statuspunkte);

                if (-hstell.Statuspunkte > this.Statuspunkte) {
                    this.Statuspunkte = -hstell.Statuspunkte;
                    this.StatuspunkteZugNr = ii;
                }

                if (NurSolangeNotwendig && hstell.Statuspunkte <= AbbruchkritVorStellung)
                    break;

                this.lStell.push(hstell);
            }

        }
        // in datei schreiben ???
    }

    ErzeugeRochM(hzug) {
        //let hRochM = this.RochM.slice();
        //let hRochM = Array.from(this.RochM);
       let hRochM = [[this.RochM[0][0], this.RochM[0][1]], [this.RochM[1][0], this.RochM[1][1]]];
        //let hRochM = [...this.RochM];

        if (this.RochM[this.iFarbe][0] || this.RochM[this.iFarbe][1]) {
            if (hzug[0] == this.iFarbe * 7) {
                if (hzug[1] == this.StartPositionRoch[0])
                    hRochM[this.iFarbe][0] = false;
                else if (hzug[1] == this.StartPositionRoch[2])
                    hRochM[this.iFarbe][1] = false;
                else if (hzug[1] == this.StartPositionRoch[1]) {
                    hRochM[this.iFarbe][ 0] = false;
                    hRochM[this.iFarbe][ 1] = false;
                }
            }
        }

        if (this.RochM[this.iGFarbe][0] || this.RochM[this.iGFarbe][1]) {
            if (hzug[2] == this.iGFarbe * 7) {
                if (hzug[3] == this.StartPositionRoch[0])
                    hRochM[this.iGFarbe][0] = false;
                else if (hzug[3] == this.StartPositionRoch[2])
                    hRochM[this.iGFarbe][1] = false;
            }
        }
        return hRochM;
    }

    StellBewerten() {
        let Wert = 0;
        for (let ii = 0; ii < 8; ii++)
        {
            for (let jj = 0; jj < 8; jj++)
            {
                if (this.Feld[ii][jj] != "ll" && this.Feld[ii][jj][1] != 'k') {
                    if (this.Feld[ii][jj][0] == this.AmZug)
                        Wert += this.FeldWert(this.Feld[ii][jj]);
                    else
                        Wert -= this.FeldWert(this.Feld[ii][jj]);
                }
            }
        }

        Wert += this.lZuege.length / 100;

        return Wert;
    }
    FeldWert( Figur) {
        let FigWert = [ 9, 5, 3, 3, 1 ];
        let hs = "qrbnp";
        let FigNr = -1;
        FigNr = hs.indexOf(Figur[1]);
        let hFigWert = FigWert[FigNr];
        return hFigWert;
    }    
}
