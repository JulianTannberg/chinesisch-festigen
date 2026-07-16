STIRN-RATESPIEL – UPDATE v125
================================

Enthaltene Dateien:
- stirnspiel.html   – Stirn-Ratespiel mit neu kalibrierter Kippsteuerung
- kapitel.html      – Kapitelseite mit Zugang zum Stirn-Ratespiel
- sw.js             – Offline-Cache auf Version cf-v125 aktualisiert

Installation:
1. Alle Dateien aus diesem Ordner in das Hauptverzeichnis der Website hochladen.
2. Vorhandene Dateien gleichen Namens ersetzen.
3. Die installierte Web-App vollständig schließen.
4. Website/App neu öffnen; bei Bedarf einmal im Browser neu laden.

Korrektur v125:
- Vor jeder Runde wird die tatsächliche Nach-unten-Bewegung einmal gelernt.
- Die Steuerung verwendet einen zweidimensionalen Sensorvektor statt einer fest angenommenen Achse.
- Unterschiedliche Querformatlagen und umgekehrte Sensorvorzeichen werden dadurch berücksichtigt.
- Erst nach Rückkehr zur Ausgangslage kann die nächste Karte gewertet werden.
- Seitliche Bewegungen werden weitgehend ignoriert.
- Bei fehlendem Sensor kann die Kalibrierung übersprungen werden.

ABSCHLUSSGESCHICHTE
- Neue Lesekarte unter Kapitel 15.
- Freischaltung erst, wenn alle 15 Kapitel einmal vollständig durchgearbeitet wurden; 100 % sind nicht nötig.
- Buchähnlicher Reader mit Wisch-Navigation, 15 Lesekapiteln und gespeichertem Lesestand.
- Pinyin und Deutsch lassen sich unabhängig ein-/ausschalten.
- Jeder Absatz und Dialog sowie ganze Kapitel können angehört werden.
- Testmodus: index.html?test=1 oder geschichte.html?test=1.
