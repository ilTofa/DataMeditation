<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
    <title>Data Meditation _ HER: She Loves Data</title>
    <!-- This is a wide open CSP declaration. To lock this down for production, see below. -->
    <!--meta http-equiv="Content-Security-Policy" content="default-src * 'unsafe-inline'; style-src 'self' 'unsafe-inline'; media-src *" /-->
    <!-- Good default declaration:
    * gap: is required only on iOS (when using UIWebView) and is needed for JS->native communication
    * https://ssl.gstatic.com is required only on Android and is needed for TalkBack to function properly
    * Disables use of eval() and inline scripts in order to mitigate risk of XSS vulnerabilities. To change this:
        * Enable inline JS: add 'unsafe-inline' to default-src
        * Enable eval(): add 'unsafe-eval' to default-src
    * Create your own at http://cspisawesome.com
    -->
    <!-- <meta http-equiv="Content-Security-Policy" content="default-src 'self' data: gap: 'unsafe-inline' https://ssl.gstatic.com; style-src 'self' 'unsafe-inline'; media-src *" /> -->
    <link rel="stylesheet" href="css/style.css?v=2" />
    <link rel="stylesheet" href="css/rangeslider.css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
</head>
<body>

    <div id="loginpanel" class="panelcover">
        <div class="hero">
            <img src="images/smallicon-01.png" width="120" height="120" boder="0" />
        </div>
        <div class="formcontainer">
            <div class="fieldcontainer">
                <div class="fieldlabel">Login</div>
                <div class="fielditem"><input type="text" id="login" name="login" /></div>
            </div>
            <div class="fieldcontainer">
                <div class="fieldlabel">Password</div>
                <div class="fielditem"><input type="password" id="password" name="password" /></div>
            </div>
            <!--div class="fieldcontainer"-->
                <!--div class="fieldlabel">Group ID</div-->
                <!--div class="fielditem"-->
                    <input type="hidden" id="groupid" name="groupid" />
                <!--/div-->
            <!--/div-->
            <div class="fieldcontainer">
                <div class="fielditem"><button id="submitlogin" class="menuitem">ENTRA</button></div>
            </div>
            <div class="logocontainer">
                
            <!-- Inizio: Sezione aggiunta con le immagini e i titolini -->
            <div class="image-section">
                <!-- Prima riga: Due immagini con titolini -->
                <div class="image-row">
                    <div class="image-item">
                        <div class="image-title">Un progetto di</div>
                        <img src="images/HERSLD.png" class="partner-image" alt="Progetto" />
                    </div>
                    <div class="image-item">
                        <div class="image-title">Promosso da</div>
                        <img src="images/fb.png" class="partner-image" alt="Promosso" />
                    </div>
                </div>

                <!-- Seconda riga: Quattro immagini con un titolo sopra -->
                <div class="image-title">In collaborazione con</div>
                <div class="image-row">
                    <div class="image-item">
                        <img src="images/senseable.png" class="small-partner-image" alt="Collaborazione 1" />
                    </div>
                    <div class="image-item">
                        <img src="images/oikos.png" class="small-partner-image" alt="Collaborazione 2" />
                    </div>
                    <div class="image-item">
                        <img src="images/abarc.png" class="small-partner-image" alt="Collaborazione 3" />
                    </div>
                    <div class="image-item">
                        <img src="images/educi.png" class="small-partner-image" alt="Collaborazione 4" />
                    </div>
                </div>
            </div>
            <!-- Fine: Sezione aggiunta -->

            </div>

        </div>
    </div>

    <div id="menupanel" class="panel">
        <div id="gotodata" class="menuitem">genera i tuoi dati</div>
        <div class="hero">
            <br />
            <img src="images/smallicon-01.png" width="120" height="120" boder="0" />
            <br />
MERAVIGLIA! :)
            <br />
        </div>
        <div id="gotoritualwaitroom" class="menuitem">MEDITAZIONE</div>
        <div id="gotocouples" class="menuitem">incontra il TUO ALTRO</div>
        <div id="gotoassembly" class="menuitem">entra nell'assemblea</div>
        <div id="gotoinstructions" class="menuitem menusec">guarda le istruzioni</div>
        <div id="gotologin" class="menuitem menusec">torna al login</div>
    </div>

    <div id="datacollectionpanel" class="panel">
       
    </div>

    <div id="instructionspanel" class="panel">

        <br />
        <a class="menulink" href="https://docs.google.com/presentation/d/1cOaAhiyUxY5pM1VxgpUAH1SUiDl8Sf2T-zw_7ZuLTQk/edit?usp=sharing" target="_blank" >Guida pratica alla Datameditation sull'amore</a>
        <br />
        <a class="menulink" href="https://docs.google.com/document/d/1BYUTY-lFB-xRyHJN2rEg9J2OpSPCDuYTzB6-bs7E6JI/edit#heading=h.4vib503n9ok1" target="_blank" >Letture consigliate</a>
        <br />
        <a class="menulink" href="https://youtu.be/X19BHYdtFsE" target="_blank" >Tributo a Salvatore: la sua intro al DM sull'ambiente (2021)</a>
       
    </div>

    <div id="ritualwaitroompanel" class="panel">
        <div id="watingmessage"></div>
        <div class="menuitem" id="joinritualbutton">ENTRA NELLA MEDITAZIONE</div>
        <div id="peopleintheroom"></div>
    </div>

    <div id="ritualinterfacepanel" class="panelcover">
        <div id="yourtextpanel"></div>
        <div id="yourothertextpanel"></div>
        <div id="vizpanel"></div>
    </div>

    <div id="couplespanel" class="panel"></div>

    <div id="assemblypanel" class="panel"></div>

    <div id="notification"></div>

    <div id="toMenu"></div>



    <div id="dataokpanel" class="panel">
        <div class="hero">
            <img src="images/smallicon-01.png" width="120" height="120" boder="0" />
        </div>
        <div class="formcontainer">
            <div class="fieldcontainer">
                <div class="fieldlabel">Il dato è stato condiviso! Bene!</div>
            </div>
            <div class="fieldcontainer">
                <div class="fielditem"><button id="backfromdataok" class="menuitem">INDIETRO</button></div>
            </div>
        </div>
    </div>


    <div id="datanokpanel" class="panel">
        <div class="hero">
            <img src="images/smallicon-01.png" width="120" height="120" boder="0" />
        </div>
        <div class="formcontainer">
            <div class="fieldcontainer">
                <div class="fieldlabel">C'è stato un errore! Probabilmente stiamo già intervenendo, però se vuoi chiamaci e faccelo sapere. In ogni caso puoi provare più tardi. Grazie e scusa del disagio!</div>
            </div>
            <div class="fieldcontainer">
                <div class="fielditem"><button id="backfromdatanok" class="menuitem">INDIETRO</button></div>
            </div>
        </div>
    </div>

    
    <script src="js/jquery.js"></script>
    <script src="js/rangeslider.min.js"></script>
    <script src="js/d3.min.js"></script>
    <script src="js/p5.js"></script>
    <script src="js/p5.sound.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
    <script src="js/luxon.min.js"></script>
    <script src="js/lz-string.min.js"></script>
    <script src="js/script.js?v=<?= time() ?>"></script>
</body>
</html>
