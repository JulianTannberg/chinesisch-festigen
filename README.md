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

## Änderungen Etappe 27

- **Aussprache:** Aufnehmen jetzt per Gedrückthalten (Push-to-Talk) – Knopf halten zum Sprechen, loslassen beendet und spielt direkt ab. Sicherheitslimit 10 s.
- Vermerk: „Aussprache" ist die kostenlose Version. Sobald Aufnahme + Prüfung über den Worker läuft, kann „Sätze sprechen" beides (aufnehmen/zurückhören UND prüfen) – dann kann der Reiter „Aussprache" wieder entfernt werden.
- Service-Worker-Version erhöht.

## Änderungen Etappe 28

- **Ansichts-Fix global:** Der iPad/iOS-Tastatur-Fix liegt jetzt in common.js und greift auf allen festen Seiten (auch Sprechen) – nach dem Tippen rutscht die Ansicht nicht mehr.
- **Chat-Profilbilder:** Sū Rán und Lín Yuè haben Bilder (in Kontaktliste, Kopf und an jeder Nachricht). Herkunft („aus Beijing/Shanghai") entfernt – nur Bild, Name (Hanzi) und Pinyin.
- **Eigenes Profilbild:** In der Kontaktliste „Bild wählen" → wird lokal (verkleinert, im Browser) gespeichert und erscheint an den eigenen Nachrichten. Bleibt nur auf dem Gerät.
- Avatare: avatars/suran.jpg, avatars/linyue.jpg (klein gerechnet), im Service-Worker-Cache.
- Service-Worker-Version erhöht.
- OFFEN (nächster Schritt): Schreibtraining zeichenbasiert (jedes Zeichen einmal, Wort darüber, aktuelles Zeichen farbig, Pinyin im Training) + dortige Ansicht.

## Änderungen Etappe 29 (Funktionsfixes)

- **Chat:** Zwei Partnersätze hintereinander werden jetzt in Reihe gesprochen (erster wird nicht mehr abgebrochen). Lín Yuè/Sū Rán stellen sich nicht mehr mit „我叫…" vor; nach der Begrüßung kommt direkt „你是北京人吗？" bzw. „你是德国人吗？".
- **Memory:** Ton läuft über die gemeinsame Sprachausgabe (cfSpeakZh) – auch auf dem iPad.
- **Hören am Handy:** Vokabeln einspaltig, lange Texte brechen um – Reiter nicht mehr zu breit, wenn Pinyin + Deutsch an sind.
- **Sprechen überall per Gedrückthalten:** „Sätze sprechen", Üben (Deutsch→Chinesisch) und Aussprache – Knopf halten zum Sprechen, loslassen beendet.
- Üben-Antippton bleibt wie gewünscht am Schalter (unverändert).
- Service-Worker-Version erhöht.
- OFFEN: Menü/Einstellungen + Fehlermeldung (Vorlage, mailto an info@memyo.de), Icons heller/abgerundet, großer Schreibtraining-Umbau, ElevenLabs-Dateinamen, rechtlicher Block (Cookie/Datenschutz/AGB/Altersbestätigung).

## Änderungen Etappe 30 (Menü/Einstellungen)

- Neue Seite **einstellungen.html**: Name ändern, Profilbild (Chat) wählen/entfernen, Fortschritt zurücksetzen (Kapitel auswählen oder „Alle Kapitel"), Rechtliches (Datenschutz/AGB/Impressum).
- Einstieg über **Zahnrad-Icon**: oben rechts auf der Übersicht (index) und auf jeder Kapitelseite (neben dem Chat-Icon).
- Verstreute Knöpfe entfernt: Name/Fortschritt-Zeile auf der Kapitelseite ist weg (jetzt im Menü). Der Profilbild-Upload im Chat ist weg (jetzt im Menü); die Avatare an den Nachrichten bleiben.
- Onboarding-Namensfeld (nur wenn noch kein Name) bleibt auf Übersicht und Kapitelseite.
- Rechtliche Seiten als ehrliche Platzhalter („wird noch ergänzt").
- Service-Worker-Version auf cf-v34 erhöht, neue Seiten in den Offline-Cache aufgenommen.
- OFFEN: Fehlermeldung (Vorlage, mailto an info@memyo.de), Icons heller/abgerundet, Schreibtraining-Umbau, ElevenLabs-Dateinamen, rechtlicher Block (Cookie/Datenschutz/AGB/Altersbestätigung mit echten Texten).

## Änderungen Etappe 31 (Schreibtraining: Zeichen-Bausteine)

- Neue Datendatei **bausteine.js** (App-Ebene, Buch unangetastet): Kapitel-1-Vokabeln in 34 eindeutige Zeichen zerlegt, jedes mit eigener Übersetzung, eigenem Pinyin (silbenweise) und dem Wort, in dem es vorkommt.
- „Zeichen lernen" und „Schreibtraining" laufen jetzt **zeichenbasiert mit Dedup** (jedes Zeichen nur einmal über alle Wörter) statt wortbasiert.
- „Zeichen lernen": das ganze Wort steht oben, das aktuelle Zeichen ist farbig (gold); Bedeutung zeigt zusätzlich „in <Wort> (<Bedeutung>)".
- „Schreibtraining": oben steht jetzt das **Pinyin** als Aufgabe (kein Hanzi-Abschreiben), darunter Bedeutung + Pinyin-Wortkontext.
- ⚑ markiert Zeichen, deren Einzelbedeutung der/die Beijing-Kontakt noch prüfen soll (德, 什, 么, 起, 关, 系).
- Andere Kapitel ohne bausteine.js fallen automatisch auf das alte wortbasierte Verhalten zurück.
- Service-Worker auf cf-v35; bausteine.js im Offline-Cache.
- OFFEN: Fehlermeldung (mailto-Vorlage), Icons heller/abgerundet, ElevenLabs-Dateinamen, rechtlicher Block.

## Änderungen Etappe 32 (ElevenLabs-Audios)

- Zentrale Sprachausgabe cfSpeakZh spielt jetzt zuerst eine echte Audiodatei und nutzt die Browserstimme nur als Fallback, wenn die Datei fehlt → reines „Datei-Drop".
- Dateischema: `audio/audio_<kapitel>_<typ>_<hanzi>.<ext>`, typ = `vocable` oder `story`, z. B. `audio/audio_01_vocable_人.mp3`. Konfigurierbar oben in common.js (CF_AUDIO: enabled, base-Ordner, ext, name-Funktion).
- Zuordnung automatisch aus topics.js (vocab/understandingVocab → vocable, storyDialog → story); aktuelles Kapitel wird in applyTheme als window.CF_CHAPTER gemerkt und bevorzugt.
- Seiten mit eigener Sprachausgabe (hoeren inkl. „Geschichte abspielen", flashkarten, sprechen) laufen jetzt über cfSpeakZh, damit die echten Dateien überall greifen. „Slow"-Tempo wirkt auch auf Dateien (playbackRate, Tonhöhe bleibt).
- Datei `audio/DATEINAMEN_Kapitel01.txt`: exakte Soll-Dateinamen zum Abgleich.
- Service-Worker erhöht. Audiodateien werden NICHT in die Shell gecacht (kommen erst nach und nach dazu).
- OFFEN/zu bestätigen: Dateiendung (.mp3?), Ordner (audio/?), Satzzeichen in Namen (你呢？, 啊！…). Außerdem: Einzelzeichen im Schreibtraining haben kein vocable-File → dort Browserstimme.

## Änderungen Etappe 33 (Story-Sprecher + Einzelzeichen-Audio)

- Story-Dateien enthalten jetzt den Sprecher: `audio_<kap>_story_<sprecher>_<hanzi>.mp3` (苏然→suran, 林月→linyue; Mapping in common.js CF_AUDIO.speakerId, erweiterbar). Verhindert Verwechslungen und passt zu den zwei Stimmen.
- „Hören" reicht den Sprecher je Story-Zeile an die Audioauswahl weiter (Einzelantippen und „Geschichte abspielen").
- Einzelzeichen aus dem Schreibtraining sind als vocable im Such-Index: `audio_01_vocable_海.mp3` usw.
- Satzzeichen sind Teil des Dateinamens (wie vom Nutzer bestätigt).
- DATEINAMEN_Kapitel01.txt neu: Vokabeln, Einzelzeichen, Geschichte (mit Sprecher).
- Service-Worker erhöht.

## Änderungen Etappe 34 (Geschichte in Einzelsätzen + untere Leiste)

- Geschichte Kapitel 1: fünf mehrsatzige Zeilen in einzelne Sätze geteilt (16 → 21 Einträge). „啊！对不起！" bewusst als eine Einheit gelassen. Wirkt auf Hören (kürzere Häppchen + je eine Audiodatei), Üben (je ein Satz) und Audio-Dateinamen.
- DATEINAMEN_Kapitel01.txt neu: Geschichte jetzt als Einzelsätze (21 Dateien).
- Untere Reiter (Lernen/Üben/Spielen) wurden auf manchen Android-PWAs abgeschnitten: noScroll-Höhe von 100dvh auf 100svh umgestellt, bottomTabs flex-shrink:0 – untere Leiste bleibt sichtbar.
- Hinweis: Für künftige Kapitel Dialogzeilen gleich als Einzelsätze anlegen (keine mehreren Sätze in einer Zeile).

## Änderungen Etappe 35 (maximale Wiederverwendung der Audios)

- Ergebnis: Vokabeln + Story decken Hören, Üben, Spielen (inkl. Lückenspiel) UND „Sätze sprechen" ab – alles greift per exakter Text-Übereinstimmung auf dieselben Dateien zu. Keine zusätzlichen Dateien dafür nötig.
- Chat gibt jetzt den Sprecher mit (partner.key). Verhindert falsche Stimmen.
- cfAudioUrlFor: bei angegebenem Sprecher wird NUR eine gleiche Stimme (Story) oder eine sprecherneutrale Vokabel verwendet – sonst Browserstimme (kein Rückgriff auf fremde Stimme).
- Browserstimme bleibt nur bei: Chat-eigenen Sätzen ohne passende Datei und beim KI-Schülerdialog (Platzhalter „……", Rollen A/B – für feste Dateien ungeeignet).
- Service-Worker erhöht.

## Änderungen Etappe 36 (Chat raus, Menü ohne Profilbild)

- Chat-Einstieg (Icon auf der Kapitelseite) entfernt – Chat ist vorerst raus. Die Dateien (chat.html, chatdata.js) bleiben im Projekt, falls er später zurückkommt.
- „Profilbild (Chat)" aus dem Einstellungen-Menü entfernt (wurde nur im Chat gebraucht). Reset-Hinweis angepasst.
- Übungen: jeder Story-Satz behält die Stimme seiner Sprecherin/seines Sprechers (Lín Yuè bleibt Lín Yuè).
- Service-Worker erhöht.
- OFFEN/zu klären: Behandlung des Selbstvorstellungs-Satzes „我叫 [Name des Nutzers]" (kein festes Audio möglich).

## Änderungen Etappe 37 (Selbstvorstellung mit eigenem Namen, Variante A)

- Sprechübung: Der Satz „你好，我叫苏然。" wird zur Selbstvorstellung „你好，我叫 [dein Name]。" personalisiert (Anzeige + deutscher Hinweis mit deinem Namen, bei fehlendem Namen „… deinen Namen einsetzen").
- Vorbild-Audio bleibt Sū Ráns Originalaufnahme „你好，我叫苏然。" (audioZh) – kein neues Audio nötig, kein deutscher Name in chinesischer TTS.
- Erkennung akzeptiert weiterhin alles mit „我叫" (dein Name zählt).
- Hören/Üben/Lückenspiel zeigen denselben Satz weiter als Story (Sū Rán) mit seiner Aufnahme – die Sätze bleiben über die Modi identisch, Audios werden wiederverwendet.
- Service-Worker erhöht.

## Änderungen Etappe 38 (Fehler melden)

- Neue Seite fehler.html: geführte Vorlage Kapitel → Bereich (Lernen/Üben/Spielen/Allgemein) → Unterpunkt → Freitext. „Senden“ öffnet die E-Mail-App via mailto an info@memyo.de mit vorbereitetem Betreff „Chinesisch festigen – Fehler: Kapitel X · Bereich · Unterpunkt“ und strukturiertem Text; danach Dankesseite.
- Stufe 1 (ohne Server). Später leicht auf echten Versand (Worker) umstellbar – nur der „Senden“-Teil ändert sich.
- Verlinkt im Einstellungen-Menü („Fehler melden“).
- Service-Worker erhöht, fehler.html im Offline-Cache.

## Änderungen Etappe 39 (Aussprache-Vorbild + Fehler-Vorlage mit Reiter)

- Sprechen → Aussprache: bei der Selbstvorstellung wird jetzt das Vorbild „你好，我叫苏然。" angezeigt UND abgespielt (Sū Ráns Aufnahme), nicht mehr „我叫 [Name]". Personalisierung bleibt nur in „Sätze sprechen".
- Fehler melden: dritte Ebene ergänzt. Lernen → Hören/Schreiben/Sprechen haben Unterreiter (z. B. Hören: Vokabeln/Geschichte). Üben (Chinesisch hören / Chinesisch→Deutsch / Deutsch→Chinesisch) und Spielen-Memory/Lückenspiel haben keinen → dort steht „—". Flashkarten hat Chinesisch→Deutsch / Deutsch→Chinesisch.
- Betreff/Text der Mail enthält jetzt zusätzlich den Reiter.
- Service-Worker erhöht.

## Änderungen Etappe 40 (keine Textauswahl in der ganzen App)

- Globale Sperre: in der gesamten Web-App ist kein Text mehr markierbar (verhindert versehentliches Markieren beim Gedrückthalten der Aufnahme-Buttons und das Long-Press-Menü).
- Ausgenommen sind Eingabefelder (Name, Fehlertext, Tippen, Lückenspiel) – dort kann weiter getippt und markiert werden.
- Service-Worker erhöht.

## Änderungen Etappe 41 (Einzelzeichen-Audio für Übungs-Kärtchen)

- Audio-Index deckt jetzt ALLE Hanzi des Kapitels als Einzelzeichen (vocable) ab, nicht nur die 34 Bausteine. Damit greift beim Antippen der Kärtchen in „Üben" (und im Schreibtraining) jede aufgenommene Einzelzeichen-Datei.
- DATEINAMEN_Kapitel01.txt erweitert: Block 3 listet jetzt alle Einzelzeichen (ohne Dubletten zu Block 1/2). Hinweis ergänzt, dass Block 3 optional ist (isolierte Partikel/Namen klingen teils unnatürlich; sonst Browserstimme).
- Service-Worker erhöht.

## Änderungen Etappe 42 (Altersbestätigung 16+)

- Beim ersten Öffnen erscheint eine Bestätigung „Ich bin mindestens 16 Jahre alt“. Ohne Bestätigung ist die App gesperrt. Wird in localStorage (cf_age_ok) gemerkt und bleibt beim Fortschritt-Zurücksetzen erhalten.
- Auf den Rechtsseiten (Datenschutz/AGB/Impressum) erscheint die Sperre nicht, damit man die Texte lesen kann.
- „Jünger als 16“ → freundlicher Hinweis, App bleibt gesperrt.
- Hinweis: Schwelle (16) und Wortlaut sollten rechtlich geprüft werden.
- Service-Worker erhöht.

## Änderungen Etappe 43 (iOS-Hinweis + Rechtstexte als Entwurf)

- Altersbestätigung zeigt auf iPhone/iPad zusätzlich einen Hinweis, dass die automatische Spracherkennung in den Sprechübungen dort derzeit nicht möglich ist (Hören/Kärtchen/Aussprache funktionieren).
- AGB enthält denselben iOS-Hinweis als eigenen Abschnitt (auch übers Menü erreichbar).
- datenschutz.html, agb.html, impressum.html mit echten ENTWURFS-Texten gefüllt (deutlich als Entwurf markiert, Platzhalter in [Klammern]). Impressum weist auf Pflicht zu echtem Namen/Anschrift hin und nennt HanziWriter / Make Me a Hanzi (Arphic Public License).
- Hinweis: alle Rechtstexte sind ungeprüfte Entwürfe – bitte rechtlich prüfen lassen.
- Service-Worker erhöht.

## Änderungen Etappe 44 (Altersbestätigung deaktiviert)

- cfAgeGate() wird nicht mehr aufgerufen – beim Öffnen erscheint keine Altersbestätigung mehr. Die Funktion bleibt im Code erhalten (auskommentierter Aufruf), falls sie später wieder gebraucht wird (z. B. gekoppelt an den Transkriptions-Worker).
- Rechtsseiten angepasst: kein Verweis mehr auf eine aktive Altersbestätigung. Datenschutz und AGB erwähnen den Mikrofonzugriff (freiwillig, nur nach Freigabe, lokale Verarbeitung) und markieren die Altersfrage als offen für die rechtliche Prüfung.
- Service-Worker erhöht.
