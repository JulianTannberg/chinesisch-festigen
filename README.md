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
