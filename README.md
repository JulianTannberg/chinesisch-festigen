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

## Update nach Webapp-Test

- Die obere Kicker-Zeile („Chinesisch festigen“ / „Kapitel …“) wird in der Oberfläche ausgeblendet.
- `sprechen.html` startet die Aufnahme ohne 3-Sekunden-Pause. Zusätzlich gibt es ein Eingabefeld, damit iPhone/iPad über Tastatur-Diktat oder Hanzi-Tastatur genutzt werden können.
- `schreiben.html` startet jetzt standardmäßig im Reiter „Tippen“ und zeigt dort eine geräteabhängige Hilfe zur chinesischen Eingabe. Der Hinweis kann ausgeblendet und später wieder geöffnet werden.
- Die Kapitelseite ist nun in drei Bereiche gegliedert: Lernen, Üben und Spielen.
- Neu: `nachzeichnen.html` als Lern-Nachzeichnen mit Vokabelkarte, Pinyin-Auswahl, Deutsch-Auswahl und drei Schreibstufen.
- Neu: `uebung.html` mit den drei Übungsarten Hören → Hanzi, Chinesisch → Deutsch und Deutsch → Chinesisch.
- Satz-Puzzle und Lückenspiel lesen Wortkarten beim Antippen/Einsetzen vor; bei richtiger Lösung wird der ganze Satz gesprochen.
- Das bisherige Hanzi-Writer-Nachzeichnen bleibt als Strich-Spiel über `schreiben.html?id=01&tab=trace` erreichbar.

## Fehlerbehebung: „Keine Sätze hinterlegt“

Diese korrigierte Version sammelt Übungssätze robuster aus allen bekannten Feldern in `topics.js`:

- `practiceSentences`
- `speechSentences`
- `sentencePuzzles`
- `studentDialog`
- `storyDialog`
- teilweise `gapExercises`

Wichtig: `topics.js` enthält die eigentlichen Kapitel, Vokabeln und Sätze. Diese Datei muss im Projekt erhalten bleiben. Wenn der ganze Ordner ersetzt wird und `topics.js` fehlt, können die Seiten keine Inhalte anzeigen.
