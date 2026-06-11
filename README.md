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
