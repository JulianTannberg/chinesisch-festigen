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
