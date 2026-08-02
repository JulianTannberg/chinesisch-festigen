# GitHub-Update v137 – vereinfachte Navigation

Diese Fassung baut auf der Supabase-Version der App auf und ordnet die Navigation neu.

## Neue Hauptnavigation

Die untere Navigationsleiste erscheint nur auf der Kapitelübersicht:

- **Kapitel**
- **Zeichen**
- **Spiele**
- **Profil**

Auf der fünfteiligen Kapitelansicht führt ein Home-Button zurück zur Kapitelübersicht. Einzelne Lernseiten besitzen nur einen Zurück-Button.

## Neue Kapitelansicht

Jedes Kapitel zeigt fünf Lernbereiche mit jeweils drei direkt anklickbaren Seiten und eigenem Fortschritt:

1. **Hören:** Vokabeln, Sätze, Geschichte
2. **Schreiben:** Zeichen lernen, Schreibtraining, Tippen
3. **Sprechen:** Sätze sprechen, Geschichte nachsprechen, Mit KI sprechen
4. **Sätze festigen:** Chinesisch hören, Chinesisch → Deutsch, Deutsch → Chinesisch
5. **Vokabeln festigen:** Flashkarten Deutsch → Chinesisch, Flashkarten Chinesisch → Deutsch, Lücken ergänzen

Vorhandener lokaler Fortschritt wird beim ersten Öffnen soweit möglich auf die neuen Teilbereiche übertragen.

## Kapitelübergreifende Bereiche

- **Zeichen wiederholen** bleibt erhalten.
- **Eigene Zeichen nachzeichnen** wurde aus der App entfernt.
- Unter **Spiele** befinden sich Jump & Run, Stirnraten und Memory.
- Memory erlaubt die Auswahl mehrerer Kapitel und erstellt fortlaufend neue Runden aus deren Vokabeln.
- Jump & Run startet über den Spiele-Bereich immer von vorne.

## Konto und Synchronisierung

Die zuvor ergänzte Supabase-Anmeldung und Synchronisierung bleiben enthalten. Vor dem Einsatz müssen weiterhin die Schritte aus `SUPABASE-EINRICHTUNG.md` durchgeführt und `config.js` mit der eigenen Projekt-URL sowie dem öffentlichen Schlüssel eingerichtet werden.

## Noch nicht enthalten

Online-Mehrspielerpartien für Memory und Stirnraten sind noch nicht umgesetzt. Diese Version enthält die übersichtliche Spiele-Seite und die lokale Kapitelauswahl als Grundlage.

## Technische Prüfung

- JavaScript-Syntax aller externen und eingebetteten Skripte geprüft
- lokale Verweise auf Seiten, Skripte, Styles und Medien geprüft
- Service-Worker-Cache auf `cf-v137-navigation` erhöht

Ein vollständiger Browser-Test gegen das persönliche Supabase-Projekt ist nach dem Hochladen und Eintragen der Projektdaten erforderlich.
