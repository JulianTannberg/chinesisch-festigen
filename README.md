# Chinesisch festigen – neue Website-Grundstruktur

Dateien:
- `index.html` – Kapitelübersicht mit 15 Kapiteln
- `kapitel.html?id=01` – Kapitelseite mit Hören, Schreiben, Sprechen
- `hoeren.html?id=01` – Hörübung mit anklickbaren Vokabeln und Sprechblasen
- `schreiben.html?id=01` – Schreibübung mit globaler Streak, Erstversuchquote und automatischer Wiederholung
- `sprechen.html?id=01` – KI-Prompt aus dem Schülerdialog
- `topics.js` – zentrale Kapiteldaten
- `style.css` – gemeinsame Gestaltung

Nächster Schritt:
In `topics.js` pro Kapitel `vocab`, `storyDialog` und `studentDialog` füllen.


## Stand nach Einbau Kapitel 1

Kapitel 1 „Ankunft“ ist als erstes echtes Testkapitel eingetragen:

- `vocab`: 28 aktive Vokabeln für Hören und Schreiben
- `understandingVocab`: 18 zusätzliche Verstehensvokabeln für Hören
- `storyDialog`: Dialogzeilen aus der Geschichte als Sprechblasen
- `studentDialog`: Schülerdialog für den KI-Prompt in Sprechen

Zum Testen lokal öffnen:

- `index.html`
- dann Kapitel 1 wählen
- Hören / Schreiben / Sprechen testen
