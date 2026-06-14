# Chinesisch festigen – neue Website-Struktur

Diese Version nutzt die neue 15-Kapitel-Struktur ohne Grundlagen/Erweiterungen.

## Einstieg

Öffne `index.html`.

Ablauf:

1. Kapitel auswählen
2. Lernbereich oder Spiel auswählen
3. Übung starten

## Wichtige Funktionen

### Hören

- Zuerst wird nur Chinesisch angezeigt.
- Pinyin und Deutsch können getrennt ein- und ausgeblendet werden.
- Vokabeln und Sprechblasen sind direkt anklickbar.
- Das Sprechtempo geht nur bis Normalgeschwindigkeit `1.0`, nicht schneller.

### Schreiben

- Die Vokabeln kommen der Reihe nach.
- Der Übungsstand wird pro Kapitel und Richtung in `localStorage` gespeichert.
- Mit „Von vorne starten“ wird die aktuelle Schreibübung neu begonnen.
- Richtungen:
  - Deutsch → Chinesisch
  - Chinesisch → Deutsch
- Hilfe/Lösung erscheint erst nach einer falschen Antwort.
- Weiter erscheint erst nach richtiger Antwort.
- Falsche Wörter werden wiederholt, bis sie direkt richtig sind.
- Die Serie/Streak zählt kapitelübergreifend.

### Sprechen

- Der Prompt bleibt eng beim Schülerdialog.
- Die KI soll zuerst nur mit `你好！` beginnen.
- Danach übt sie Rolle A, die Lernende übernimmt Rolle B.
- Neue schwierige Wörter und freie Zusatzfragen sind im Prompt ausdrücklich ausgeschlossen.
- Bei Spracheingabe soll die KI auch auf Aussprache und Töne achten, aber maximal einen Ton-/Aussprachefehler pro Antwort korrigieren.

## Spiele

### Flashkarten

`flashkarten.html?id=01` nutzt die aktiven Vokabeln aus `topics.js`. Die Richtung ist umschaltbar: Deutsch → Chinesisch oder Chinesisch → Deutsch. Schwierige Karten können mit „Noch üben“ erneut in die Runde gelegt werden.

### Memory

`memory.html?id=01` nutzt die aktiven Vokabeln aus `topics.js`. Es werden Hanzi und deutsche Bedeutung als Paare gesucht. Pro Runde werden maximal 8 Paare verwendet, damit das Spielfeld auf Handy und Tablet übersichtlich bleibt.

### Satz-Puzzle

`satzpuzzle.html?id=01` nutzt die Sätze aus `topics.js` im Feld `sentencePuzzles`. Die Wortkarten können geschoben oder angetippt werden.

### Lückenspiel

`luecken.html?id=01` nutzt die Aufgaben aus `topics.js` im Feld `gapExercises`. Die Lernenden wählen das passende Wort für die Lücke.

## Dateien

- `index.html` – Kapitelübersicht
- `kapitel.html` – Kapitelseite mit Lernen und Spielen
- `hoeren.html` – Hörübung
- `schreiben.html` – Schreibübung
- `sprechen.html` – KI-Sprechübung
- `flashkarten.html` – Flashkarten-Spiel
- `memory.html` – Memory-Spiel
- `satzpuzzle.html` – Satz-Puzzle
- `luecken.html` – Lückenspiel
- `style.css` – Gestaltung
- `topics.js` – zentrale Kapiteldaten


## Schreiben

Die Schreibseite enthält Tippen und Nachzeichnen. Das Nachzeichnen nutzt Hanzi Writer; dafür wird die Bibliothek per CDN geladen.


Neu: `sprechsatz.html` prüft gesprochene chinesische Sätze über die Browser-Spracherkennung. Das funktioniert am zuverlässigsten in Chrome/Safari über HTTPS.


## Benutzername für Übungen

Die Datei `profile.js` speichert einen frei gewählten Namen lokal im Browser (`localStorage`). Dieser Name wird in Namensübungen automatisch eingesetzt, zum Beispiel in Sprechsätzen und Satz-Puzzles. Es wird kein Konto angelegt und nichts an einen Server gesendet.

## Benutzername

Der Name wird nur abgefragt, wenn noch kein Name im Browser gespeichert ist. Sobald ein Name gespeichert wurde, verschwindet das große Eingabefeld. Unten auf der Start- und Kapitelseite bleibt nur eine kleine Möglichkeit „Name ändern“.

## PWA (WebApp)

Die Seite ist als Progressive Web App eingerichtet:

- `manifest.webmanifest` – Name, Farben und Icons. Auf dem Handy erscheint „Zum Startbildschirm hinzufügen“; die Seite startet dann im Vollbild wie eine App.
- `sw.js` – Service Worker, speichert alle Dateien lokal. Die Übungen funktionieren danach auch offline. Ausnahmen: Spracherkennung und Sprachausgabe brauchen Internet. Hanzi-Writer-Zeichendaten werden beim ersten Nachzeichnen mitgespeichert.
- `icons/` – App-Icons (Ausschnitt aus dem Buchcover, ohne Text).
- **Wichtig bei Updates:** In `sw.js` die Versionsnummer `CACHE` erhöhen (z. B. `cf-v2`), sonst behalten Geräte alte Dateien.
- Funktioniert nur über HTTPS (z. B. GitHub Pages oder gehostete Domain), nicht als lokale Datei.

## Weitere Änderungen

- `common.js` – gemeinsame Hilfsfunktionen (vorher in jeder Seite doppelt).
- Helle Kapitelfarben (z. B. Kapitel 7) bekommen automatisch dunkle Texte, Rahmen und Buttons (`theme-light`).
- Kapitel ohne Inhalt sind in der Übersicht gesperrt und zeigen „Bald verfügbar“.
- Memory nutzt auf schmalen Bildschirmen 6 statt 8 Paare.

## Startseite für Buchkäufer (`start.html`)

`start.html` ist die empfohlene Zielseite für den QR-Code im Buch. Sie erkennt automatisch
das Gerät (iPhone, iPad, Android, Windows) und zeigt die passende Installationsanleitung.
Über die Schalter lässt sich das Gerät auch manuell umstellen. Buttons führen direkt zu den
Kapiteln. Wird die Seite bereits als installierte App geöffnet, springt sie direkt zur
Kapitelübersicht.

QR-Code im Buch am besten auf `…/start.html` zeigen lassen (statischer QR-Code, kein
dynamischer Tracking-Dienst).

## Änderungen Etappe 1 (Testfeedback)

- Kicker-Zeilen („Chinesisch festigen“ / „Kapitel XX · …“) oben entfernt; der Zurück-Link bleibt.
- Sprechen: 3-Sekunden-Countdown entfernt, Aufnahme startet sofort.
- Sprechen auf iPhone/iPad: Statt Aufnahme-Button erscheint ein Eingabefeld mit Hinweis auf das Tastatur-Diktat (Mikrofon auf der Tastatur, chinesische Tastatur nötig). Geprüft wird der diktierte/getippte Text.
- Schreiben → Tippen: Wegklickbarer Hinweis, wie man die chinesische Tastatur einrichtet (iPhone, iPad, Android, Windows, Mac; Gerät wird automatisch erkannt, manuell umschaltbar). Nach dem Ausblenden erscheint unten ein kleiner Link zum Wiederöffnen.
- Satz-Puzzle: Wortkarten werden beim Einfügen vorgelesen; bei richtiger Prüfung wird der ganze Satz vorgelesen. Es liegen jetzt 3 zusätzliche Karten dabei, die nicht in den Satz gehören.
- Lückenspiel: Angeklicktes Wort wird vorgelesen; bei richtiger Wahl anschließend der ganze Satz.
- Service-Worker-Version: cf-v3.

## Änderungen Etappe 2

- **Zeichen lernen** (Schreiben, erster Reiter): Alle Vokabeln als Karten. Pro Wort 5 Schritte:
  1) Anhören + Pinyin wählen, 2) Bedeutung wählen (ohne Audio),
  3) Zeichnen mit Vorlage und vorgezeigten Strichen (2 Durchgänge, Fehler stoppen nicht),
  4) Zeichnen ohne Vorlage, Striche werden weiter vorgezeigt (2 Durchgänge),
  5) Aus dem Kopf – Hilfe-Strich erst nach 2 Fehlern, Zeichen erscheint nicht mehr im Hintergrund.
  Gelernte Wörter werden mit ✓ markiert (pro Kapitel in localStorage, zurücksetzbar).
- **Nachzeichnen** (das bisherige mit Anfänger/Mit Zeichen/Profi) ist nach „Spielen“ umgezogen: `zeichnen.html`.
- **Neuer Bereich „Üben“** auf der Kapitelseite (zwischen Lernen und Spielen), Seite `ueben.html` mit drei Modi (`?mode=`):
  - `hoeren`: Satz nur anhören (normal/langsam) und aus Hanzi-Karten bauen, mit 4 zusätzlichen falschen Zeichen.
  - `zhde`: Chinesischen Satz lesen, deutsche Übersetzung aus Wortkarten bauen, mit 4 zusätzlichen Wörtern.
  - `dezh`: Deutschen Satz auf Chinesisch bauen, ebenfalls mit Extra-Karten; auf Geräten mit Spracherkennung kann der Satz alternativ gesprochen werden (auf iPhone/iPad ausgeblendet).
  Alle Sätze stammen aus dem Story-Dialog des Kapitels.
- Service-Worker-Version: cf-v4.

## Änderungen Etappe 3 (Testfeedback)

- **Steckenbleiben behoben:** Beim „Zeichen lernen“ (alle drei Zeichnen-Stufen) und beim Nachzeichnen-Spiel (Anfänger) wird der aktuelle Strich jetzt zuverlässig nach jeweils 2 Fehlversuchen vorgezeigt. In Stufe „Aus dem Kopf“ erscheint nur der Hilfsstrich, nie das ganze Zeichen.
- **iPhone/iPad:** Die Browser-Spracherkennung wird auf iOS-Geräten gar nicht mehr benutzt (Safari meldet sie als vorhanden, sie hängt aber). Sprechen-Seite zeigt dort immer das Diktat-Eingabefeld; in „Deutsch → Chinesisch“ ist der Sprechen-Knopf auf iOS ausgeblendet.
- **Feedback-Töne:** Kurzer Bestätigungston bei richtig, tieferer Ton bei falsch (Sprechen, Satz-Puzzle, Lückenspiel, Üben, Zeichen lernen). Ohne Audiodateien, funktioniert offline.
- **Kärtchen-Färbung:** Beim Prüfen färben sich die gelegten Karten grün (richtig) oder rot (falsch) – Satz-Puzzle und alle drei Üben-Modi.
- **Weiter-Knopf statt Auto-Sprung:** Nach richtiger Lösung in Satz-Puzzle und Üben bleibt der Satz stehen (und wird vorgelesen); weiter geht es erst mit „Weiter →“.
- **Zeichen lernen:** Das Wort wird im Pinyin-Schritt nicht mehr automatisch vorgesprochen (▶ bleibt als freiwillige Hilfe). Fehlerfreie Wörter färben die ganze Wortkarte grün („perfekt“), Wörter mit Fehlern bekommen nur die grüne Umrandung. Einmal „perfekt“ bleibt erhalten.
- Service-Worker-Version: cf-v5.

## Änderungen Etappe 4

- **Struktur jetzt 3×3:** Lernen (Hören, Schreiben, Sprechen) · Üben (Chinesisch hören, Chinesisch→Deutsch, Deutsch→Chinesisch) · Spielen (Flashkarten, Memory, Lückenspiel).
- **Satz-Puzzle entfernt** (Doppelung mit Üben „Deutsch → Chinesisch“). `satzpuzzle.html` gelöscht.
- **Nachzeichnen-Spiel in Schreiben integriert** als mittlerer Reiter **„Wiederholen“** (Zeichen lernen · Wiederholen · Tippen). `zeichnen.html` gelöscht.
- **Hilfsstrich überall:** Auch unter „Wiederholen“ wird in allen drei Stufen (Anfänger, Mit Zeichen, Profi) der aktuelle Strich nach jeweils 2 Fehlversuchen vorgezeigt – wie beim Zeichen lernen.
- **Hören:** Reiter heißt jetzt „Geschichte“; „Stopp“ und „Geschichte abspielen“ erscheinen nur in diesem Reiter.
- **Feste Ansicht (noScroll):** Flashkarten, Sprechen und ein geöffnetes Wort im Zeichen lernen halten die Seite fest (kein Mitscrollen/Verschieben); passt der Inhalt auf sehr kleinen Bildschirmen nicht, scrollt nur die Karte innen. Vokabel-Übersicht u. ä. scrollen weiter normal.
- **Offline-Fix:** Seitenaufrufe mit `?id=…` (z. B. `kapitel.html?id=01`) wurden offline nicht im Cache gefunden – behoben (ignoreSearch). Hinweis: Die Seite muss einmal **online** besucht worden sein, damit der Service Worker alles speichert; danach klappt die Navigation offline.
- **Zeichen lernen:** ✓-Haken entfernt – nur noch grüne Umrandung (gelernt) bzw. ganz grüne Karte (fehlerfrei).
- Service-Worker-Version: cf-v6.

## Änderungen Etappe 5

- **Schreibtraining** (vorher „Wiederholen“): komplett neu, jetzt exakt die drei Zeichnen-Stufen aus „Zeichen lernen“ – als Stufen **Anfänger** (mit Vorlage, Striche vorgezeigt), **Fortgeschritten** (ohne Vorlage, Striche vorgezeigt), **Profi** (aus dem Kopf, Hilfsstrich nach 2 Fehlern). „Zeig mir“ und „Neu üben“ entfernt. Nur noch: Stufenwahl, ▶ Anhören, „Wort überspringen ›“. Wörter laufen automatisch durch und beginnen am Ende wieder von vorn; Stufe und Position werden gemerkt. Reiter ist fest (noScroll).
- **Sprechen:** „KI sprechen“ scrollt wieder normal; nur „Sätze sprechen“ bleibt fest.
- **Üben (alle 3 Modi):** „Von vorne starten“, „Letzte Karte zurück“ und „Satz zurücksetzen“ entfernt (Karten wandern per Antippen zurück in die Reihe). „Prüfen“, „🎤 Stattdessen sprechen“ und „Weiter →“ stehen jetzt **über** den Karten. Seiten sind fest.
- **Memory:** Runde · Paare · Züge · Ton in einer Kopfzeile. Alles unter den Karten entfernt. 5 Paare (10 Karten) pro Runde; die nächste Runde startet automatisch, bis alle Vokabeln dran waren. Seite ist fest.
- **Kapitelseite:** Untere Reiter **Lernen / Üben / Spielen** zeigen jeweils nur die drei zugehörigen Karten; Seite ist fest. Der zuletzt gewählte Reiter wird gemerkt.
- Service-Worker-Version: cf-v7.

## Änderungen Etappe 6

- **Fest jetzt überall** (Lückenspiel und Tippen ergänzt). Auf Seiten mit Reitern (Schreiben, Sprechen) bleiben Reiter und Kopf stehen; nur der aktive Bereich scrollt bei Bedarf innen. „KI sprechen“ bleibt dadurch bedienbar (Inhalt scrollt im Bereich).
- **Einheitliche Aktionsleiste** über dem Eingabe-/Kartenbereich, Prüfen immer rechts:
  - Üben (alle 3 Modi): links „▶ Anhören“ (+ „Langsam“ beim Hören) oder „🎤 Stattdessen sprechen“ – rechts „Prüfen“, das bei richtiger Lösung an derselben Stelle zu „Weiter →“ wird. Der große runde Abspielknopf ist durch die einheitliche Leiste ersetzt. Nach der Eingabe verschiebt sich nichts mehr (Lösung erscheint unterhalb im Innenbereich).
  - Tippen: „Hilfe / Lösung“ links, „Prüfen/Weiter“ rechts – beide über dem Eingabefeld. „Von vorne starten“ entfernt (Neustart wie bei Memory über den Abschluss-Bildschirm).
  - Lückenspiel: „Weiter →“ oben rechts neben dem Aufgaben-Zähler. „Von vorne starten“ entfernt.
- Service-Worker-Version: cf-v8.

## Änderungen Etappe 7

- **Weiter-Knopf einheitlich oben rechts:** Wo es „Prüfen“ gibt (Üben, Tippen), wird es bei richtig zu „Weiter →“. Ohne Prüfen (Memory, Lückenspiel, Sprechen) ist „Weiter →“ vorhanden, aber inaktiv, bis es weitergehen kann. Memory springt nicht mehr automatisch zur nächsten Runde – „Weiter →“ wird nach der Runde aktiv. Sprechen: „Weiter“ erst nach richtigem Satz (oder zur Not nach 3 Fehlversuchen, damit niemand feststeckt).
- **Lückenspiel:** Falsch beantwortete Aufgaben kommen hinten noch einmal dran.
- **Hören:** Seite ist fest, Reiter (Vokabeln | Geschichte) und Werkzeuge bleiben stehen, nur die Liste scrollt innen. Hinweis-Text entfernt.
- **Stufe „Fortgeschritten“/Schritt 4 geändert:** Zeichen grau als Vorlage, aber keine vorgezeigten Striche mehr (Zeichen lernen und Schreibtraining). Hilfsstrich kommt jetzt überall erst nach **3** Fehlversuchen (vorher 2).
- **Tippen:** „Erstversuche“ entfernt; Runde · Direkt richtig · Quote · Serie nebeneinander unten in der Karte, Fortschrittsbalken direkt darüber.
- **Sprechen (Sätze):** „Lösung zeigen“ und „Von vorne starten“ entfernt. Leiste: Aufnehmen · Lösung anhören · (rechts) Weiter →. Es zählt nur noch der **komplette** Satz, keine Teil-Treffer. Fortschritt unten.
- **Üben:** Lösung erscheint kompakt **über** den Karten direkt unter dem Fragesatz (nichts verschiebt sich nach unten weg); Fortschritt unten; Prozent „Richtig“ im Zähler.
- **Punktestände:** Jede Übung speichert die Richtig-Quote (kann auch wieder sinken). Auf der Kapitelseite füllen sich die Karten anteilig grün und zeigen die Prozentzahl: Tippen, Sprechen, alle 3 Üben-Modi, Flashkarten, Memory, Lückenspiel.
- Service-Worker-Version: cf-v9.

## Änderungen Etappe 8

- **Reiter immer nebeneinander:** Eine alte Handy-Regel stapelte alle Reiter untereinander (z. B. Vokabeln/Geschichte beim Hören) – entfernt.
- **Karten reichen überall bis zum unteren Rand**, auch in Reiter-Seiten (Tippen usw.); Fortschritt im Lückenspiel jetzt ebenfalls unten angepinnt.
- **Memory-Kopfzeile:** Runde · Paare · Züge links, Ton + Weiter → rechts in einer Zeile; wird es zu eng, rutschen Ton + Weiter gemeinsam um – nie einzeln.
- **Schreibtraining:** „Wort überspringen“ entfernt. Oben steht jetzt **Deutsch** (plus Pinyin) statt des Hanzi – sonst könnte man abschreiben.
- **Zeichen lernen:** „Aus dem Kopf“ wird jetzt ebenfalls **zweimal** abgefragt.
- **Hören:** Pinyin ohne Hinweis-Zusätze (z. B. „x → ch“) auf den Vokabelkarten.
- **iPad / Diktat-Modus (Sätze sprechen):** Nur noch ein Knopf – „Prüfen“ wird bei richtigem Satz (oder nach 3 Fehlversuchen) zu „Weiter →“.
- Service-Worker-Version: cf-v11.

## Änderungen Etappe 9

- **Tippen:** Bei richtiger Antwort wird das chinesische Wort vorgelesen.
- **Schreiben-Prozent** auf der Kapitelseite = Mittel aus „Zeichen lernen“ und „Tippen“; Schreibtraining zählt nicht mit.
- **Schreibtraining:** Statistikzeile unten wie beim Tippen (Runde · Direkt richtig · Quote · Serie). „Direkt richtig“ = Wort ohne Fehler geschafft.
- **Sätze sprechen:** gleiche Statistikzeile (Runde · Direkt richtig · Quote · Serie), Werte bleiben gespeichert.
- **Memory:** unter den Karten „Züge dieses Spiel“ samt Niedrigste/Höchste (Rekorde pro Kapitel gespeichert); der Abschluss-Text nennt die Zügezahl.
- **Hören & alle Puzzle-Übungen (Üben):** Angetippte Karten werden **nicht** automatisch vorgelesen. Stattdessen Ton-Schalter, standardmäßig **aus**, anschaltbar – so verrät der Ton nicht die Lösung.
- **Flashkarten:** „Aufdecken/Verbergen“-Knopf entfernt (Karte antippen genügt).
- **Kapitelübersicht:** Gesamt-Prozent in Grün (Mittel aller gezählten Übungs-Quoten) plus Fortschrittsleiste; bei 100 % grüner Rahmen um die Kapitelkarte.
- Service-Worker-Version: cf-v12.

## Änderungen Etappe 10

- **Untere Reiter (Lernen / Üben / Spielen)** werden anteilig grün gefüllt – nach dem Mittel der jeweiligen Gruppe.
- **In-Page-Reiter** ebenfalls grün nach ihrem eigenen Prozentwert: Schreiben (Zeichen lernen / Schreibtraining / Tippen) und Sprechen (Sätze sprechen). „KI sprechen", „Hören", „Vokabeln/Geschichte" bleiben ungefärbt (kein richtig/falsch).
- **Zeichen-lernen-Prozent** zählt jetzt fertige Wörter (alle Schritte durchlaufen) ÷ alle Wörter; veraltete Einträge werden ignoriert.
- **Schreibtraining** speichert einen eigenen Prozentwert (Quote Direkt richtig) und ist – vorläufig – Teil der Schreiben-Rechnung und grün gefärbt.
- **Schreiben-Kachel** = Mittel aus Zeichen lernen + Tippen + Schreibtraining (Fix für den fehlenden Fortschritt).
- **Gesamt-Prozent** auf der Übersicht bezieht Schreibtraining mit ein.
- Service-Worker-Version: cf-v13.

## Änderungen Etappe 11

- **Hören zählt jetzt mit:** Ein Wort (Vokabel) oder Satz (Geschichte) gilt als „gehört", sobald es angetippt oder im Geschichte-Durchlauf abgespielt wurde. Prozent = gehörte (Wörter + Sätze) ÷ alle. Wird pro Kapitel gespeichert.
- Die Hören-Karte und die Reiter Vokabeln/Geschichte färben sich entsprechend grün (Vokabeln nach Wörtern, Geschichte nach Sätzen).
- Hören fließt in die **Lernen-Gruppe** (untere Reiter) und ins **Gesamt-Prozent** der Kapitelübersicht ein.
- Schreibtraining bleibt Teil der Rechnung und grün gefärbt.
- Service-Worker-Version: cf-v14.

## Änderungen Etappe 12

- **Lückenspiel:** Das angetippte Wort erscheint direkt in der Lücke im Satz. Bei richtiger Wahl grün; bei falscher Wahl wird das korrekte Wort in die Lücke gesetzt (rötlich), damit der ganze Satz stimmt. Die separate „Richtiger Satz"-Box darunter ist entfernt.
- Service-Worker-Version: cf-v15.

## Änderungen Etappe 13

- **Lückenspiel, falsche Wahl:** Nur das angetippte Wort wird rot; die Lücke bleibt leer und das richtige Wort muss noch gefunden werden. Erst die richtige Wahl füllt die Lücke (grün) und gibt „Weiter" frei. „Direkt richtig" zählt nur, wenn ohne Fehlversuch gelöst; die Aufgabe kommt nach einem Fehler später noch einmal dran.
- Service-Worker-Version: cf-v16.

## Änderungen Etappe 14

- **„Fortschritt zurücksetzen"** neben „Name ändern" (unten auf der Kapitelseite). Mit Sicherheitsabfrage (Ja/Nein). Setzt alle Prozente und Statistiken aller Kapitel zurück; der gespeicherte Name und Einstellungen (Ton, Richtung, Hinweise) bleiben erhalten. Danach lädt die Seite neu.
- Service-Worker-Version: cf-v17.

## Änderungen Etappe 15

- **„Fortschritt zurücksetzen"** sitzt jetzt rechts neben „Name ändern" (zusammen als Knopf-Gruppe) und setzt nur das **aktuelle Kapitel** zurück (per ?id aus der Adresse). Sicherheitsabfrage angepasst auf „dieses Kapitel". Name, Einstellungen und andere Kapitel bleiben unberührt.
- Service-Worker-Version: cf-v18.

## Änderungen Etappe 16

- **Fix: unterer Rand abgeschnitten.** viewport-fit=cover auf allen Seiten + Sicherheitsabstand (env safe-area-inset) oben und unten in der festen App. Dadurch sitzt die Profilzeile (Name ändern / Fortschritt zurücksetzen) nicht mehr hinter der iPhone-Home-Leiste. Profilabstand leicht verkleinert.
- Service-Worker-Version: cf-v19.

## Änderungen Etappe 17

- **Zeichen lernen – Prozent:** Ein Wort zählt erst, wenn es komplett fehlerfrei gemeistert wurde (Karte ganz grün = „perfect"). Mit Fehlern abgeschlossene Wörter („done") zählen nicht mehr mit.
- Service-Worker-Version: cf-v20.

## Änderungen Etappe 18

- **Updates greifen jetzt sofort:** Sobald eine neue Version aktiv wird, lädt die Seite automatisch einmal neu (controllerchange) und sucht beim Öffnen aktiv nach Updates (reg.update()). Damit ist das frühere „zweimal von Hand laden" nicht mehr nötig.
- Hinweis: Der Zeichen-lernen-Score zählt seit v20 nur „perfect" (komplett grün); der zuvor gesehene 4-%-Effekt bei „done" (nur Umriss) war eine noch nicht aktive alte Version.
- Service-Worker-Version: cf-v21.

## Änderungen Etappe 19 – Messenger/Chat (Prototyp)

- **Messenger-Symbol** oben rechts auf der Kapitelseite → Kontaktliste (Lín Yuè, Sū Rán) → Chat mit der gewählten Person.
- **Geführter Chat** mit vielen Antwortvarianten pro Schritt (Reihenfolge/Satzzeichen egal, eigener Name aus dem Profil). Nur Kapitel-1-Wortschatz. Partner reagiert passend; bei Nicht-Treffer wird kurz „gewackelt" und Vorschläge bleiben sichtbar.
- **Eingabe:** antippbare Vorschläge, Tippen, und Mikrofon (Sprachnachricht). Mikrofon nur, wo die Spracherkennung läuft (Chrome/Edge unter Windows/macOS/Linux/ChromeOS, Chrome Android); auf iOS und Firefox ausgeblendet.
- **Sprachnachrichten:** Sendet man per Mikrofon, erscheint nur die Sprachblase (Text liegt unsichtbar dahinter, für den Abgleich/das Vorlesen). Der Partner antwortet dann ebenfalls als Sprachnachricht (wird vorgelesen). Bei Tippen/Antippen antwortet der Partner als Textblase (mit Pinyin/Deutsch und Abspielknopf).
- **Farben pro Kapitel:** eigene Blasen in der Kapitel-Akzentfarbe. Neutraler Messenger-Look (kein WeChat).
- Dateien: chat.html, chatdata.js. Service-Worker-Version: cf-v22.

## Änderungen Etappe 20 (Fix)

- **Chat-Seite war leer & „Zurück" ging zur Übersicht:** Ursache war eine Namenskollision – `chat.html` deklarierte `qs`, das es in `common.js` schon global gibt. Dadurch stürzte das ganze Chat-Skript ab (keine Kontakte, „Zurück"-Adresse nicht gesetzt). Lokale Variable in `params` umbenannt. Jetzt erscheinen die Kontakte und „Zurück" führt zum Kapitel.
- Service-Worker-Version: cf-v23.

## Änderungen Etappe 21 (Chat-Feinschliff)

- **Unten nicht mehr abgeschnitten:** Die Chat-Karte füllt jetzt die Höhe, die Nachrichten scrollen innen, Eingabe + Mikrofon bleiben sichtbar (über der Home-Leiste).
- **Text-Modus wie echter Chat:** Partner-Nachrichten zeigen nur Hanzi, kein Ton, kein Pinyin/Deutsch. Tippt man eine Partner-Blase an, werden Pinyin + Deutsch lautlos als Hilfe eingeblendet.
- **Vorschläge nur auf Wunsch:** Die Beispiel-Antworten sind standardmäßig versteckt; Knopf „💡 Vorschläge anzeigen" blendet sie ein (bei jeder neuen Runde wieder versteckt).
- **Modus folgt der Eingabe:** Schreibst du, kommen Hanzi-Textnachrichten; sprichst du, kommen ab da Sprachnachrichten – wechselt jederzeit mit, je nachdem wie du zuletzt geantwortet hast.
- **Name per Sprache:** „我叫…" genügt zum Fortfahren (der Name selbst muss nicht erkannt werden), analog zu den Sprechübungen.
- **Echte Aufnahme:** Sprachnachrichten nehmen jetzt dein Mikrofon auf (MediaRecorder) – Antippen der eigenen Blase spielt deine echte Aufnahme ab. Klappt die Aufnahme nicht, wird ersatzweise der hinterlegte Satz vorgelesen.
- Service-Worker-Version: cf-v24.

## Änderungen Etappe 22 (Fix Mikrofon + Rand)

- **Mikrofon hängt nicht mehr:** Aufnahme und Spracherkennung gleichzeitig blockierten sich auf dem Gerät. Jetzt nur noch Spracherkennung (wie bei „Sätze sprechen"); das Mikrofon schaltet bei Ergebnis, Fehler oder Ende sicher ab. Die eigene Sprachblase wird per Sprachausgabe abgespielt (kein echtes Aufnehmen mehr – das ließ sich auf dem Gerät nicht zuverlässig mit der Erkennung kombinieren).
- **Unterer Rand:** Sicherheitsabstand unten erhöht (mindestens ~26px bzw. Safe-Area, falls größer), zusätzlich Luft unter der Eingabeleiste – Eingabe/Mikrofon sollten nun frei stehen.
- Service-Worker-Version: cf-v25.

## Änderungen Etappe 23 (Chat: echte Aufnahme + Groq-Transkription)

- **Chat, alle Geräte:** Mikrofon nimmt frei gesprochen auf (max. 10 s) → die eigene Aufnahme erscheint sofort als abspielbare Voice-Bubble → die Aufnahme geht an den Cloudflare Worker → Groq transkribiert → der erkannte Text wird wie bisher gegen die erlaubten Antworten geprüft. Nie gleichzeitig Aufnahme + Erkennung; erst aufnehmen, dann transkribieren.
- **Fallback ohne Worker:** Ist in `config.js` keine Worker-URL eingetragen, nutzt der Chat weiter die kostenlose Browser-Erkennung (nicht iOS); die eigene Blase wird dann vorgelesen.
- **Neu:** `config.js` (öffentliche Worker-URL, KEIN Key), Helfer `cfTranscribe`/`cfWorkerReady` in `common.js`.
- **Worker separat:** Ordner `cf-worker/` (transcribe-worker.js, wrangler.toml, ANLEITUNG.md). API-Key nur als Cloudflare-Secret. Worker speichert nichts.
- Service-Worker-Version: cf-v27.
- OFFEN (Etappe 24): Sprechübungen – nur iPhone/iPad über Worker→Groq, Android/PC weiter Browser-Erkennung.

## Änderungen Etappe 24 (Chat: Verzweigungen + Antwort-Abgleich)

- Gespräche jetzt als **verzweigter Knoten-Graph** (statt starrer Reihenfolge) – Grundlage für mehr Wege.
- **Satzzeichen** werden im Abgleich ignoriert (Punkt setzen, anderes Zeichen oder weglassen – alles gilt). Reihenfolge/Varianten wie gehabt.
- **Neue Abzweigungen Lín Yuè:**
  - „你是北京人吗？" → wer nur „我不是北京人" sagt, wird gefragt „那你是哪国人？" (statt sofort „啊，德国人！"). „我是德国人/我从德国来" führt direkt zur Willkommens-Antwort.
  - „你在北京吗？" → jetzt auch „我不在北京。" möglich (Antwort „啊，好。").
- Sū Rán parallel mit „我不在北京"-Zweig.
- Service-Worker-Version erhöht.
- ZUR PRÜFUNG (Beijing): „那你是哪国人？" (那 als „dann"), „啊，好。" als Reaktion auf „我不在北京".

## Änderungen Etappe 25 (Chat-Zweige + iOS-Sprechübung)

- **Chat, reichere Wege:** „我不在北京" führt jetzt zu „那你在哪里？" (wo bist du?) → „我在德国"/„我在上海" → „你来北京吗？" (kommst du nach Beijing?) → „我来北京"/„我不来北京". Damit sind „wo bist du", „in Deutschland" und ein A1-nahes „kommst du nach Beijing" abgedeckt. („möchten/wollen" = 想/要 ist erst in späteren Kapiteln möglich.)
- **iOS-Sprechübung:** Im Diktat-Modus wird der „Erkannt:"-Block ausgeblendet (er zeigte nur dieselbe Eingabe); die redundante Transcript-Zuweisung entfernt.
- ZUR PRÜFUNG (Beijing): 那你在哪里？ · 你来北京吗？ · 我来北京/我不来北京 · 啊，好！欢迎！ · 啊，上海！ · 啊，上海！我也是！
- Service-Worker-Version erhöht.

## Änderungen Etappe 26

- **Lückenspiel:** Bei richtiger Antwort wird jetzt der GANZE Satz vorgelesen (vorher nur das eingesetzte Wort).
- **Memory:** 6 Paare / 12 Karten pro Runde (4×3) – ausgewogener, besonders auf dem iPad.
- **Chat/iPad:** Nach dem Schließen der Tastatur wird die Ansicht wieder nach oben fixiert (Kopf/Zurück nicht mehr halb verdeckt).
- **Sprechen – neuer Reiter „Aussprache":** Vorbild links anhören (Hanzi/Pinyin/Deutsch), rechts selbst aufnehmen und zum Vergleich anhören. Funktioniert auf allen Geräten (auch iOS). Bewertung folgt später (wenn Worker + ergänzte Inhalte stehen).
- Service-Worker-Version erhöht.
- OFFEN (nächster Schritt): Schreibtraining – zeichenbasiert (jedes Zeichen nur einmal), ganzes Wort darüber, aktuelles Zeichen farbig; im Schreibtraining Pinyin darüber (kein Abschreiben); Wertung pro Zeichen, Fortschritt wird dabei einmalig zurückgesetzt.
