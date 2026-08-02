(function(){
  "use strict";

  window.CF_HELP = {
    version: 1,
    categories: [
      { id:"start", label:"Erste Schritte", topics:["erste-schritte","kapitel-freischalten","fortschritt"] },
      { id:"lernen", label:"Lernen & Üben", topics:["hoeren","schreiben","sprechen","satzuebungen"] },
      { id:"spiele", label:"Spiele", topics:["spiele","stirnspiel","bonusspiel"] },
      { id:"zeichen", label:"Schriftzeichen", topics:["zeichen-wiederholen","chinesisch-tipps"] },
      { id:"technik", label:"Technik & Installation", topics:["installieren","offline","apple-sprechen","ton-audio"] },
      { id:"konto", label:"Daten & Einstellungen", topics:["konto-datenschutz","name","fortschritt-zuruecksetzen","fehler-melden"] },
      { id:"geschichte", label:"Geschichte & KI-Dialog", topics:["abschlussgeschichte","ki-sprechen","hilfe-ohne-ki"] }
    ],
    entries: [
      {
        id:"erste-schritte",
        title:"Wie fange ich am besten an?",
        aliases:["erste schritte","wo anfangen","reihenfolge","wie lerne ich","starten"],
        keywords:["anfangen","start","buch","reihenfolge","lernen","kapitel"],
        answer:[
          "Lies zuerst das passende Kapitel im Buch. Öffne danach dasselbe Kapitel in der App.",
          "Eine sinnvolle Reihenfolge ist: Hören, Schreiben, Sprechen, Sätze festigen und Vokabeln festigen. Jede Übung lässt sich direkt aus der fünfteiligen Kapitelansicht öffnen.",
          "Das nächste Kapitel öffnet sich, sobald du alle fortschrittsrelevanten Übungen des aktuellen Kapitels mindestens einmal vollständig durchgearbeitet hast."
        ],
        actions:[{label:"Zur Kapitelübersicht", href:"index.html"}],
        related:["kapitel-freischalten","fortschritt","hoeren"]
      },
      {
        id:"kapitel-freischalten",
        title:"Wann wird das nächste Kapitel freigeschaltet?",
        aliases:["kapitel öffnen","kapitel gesperrt","nächstes kapitel","freischaltung","schloss"],
        keywords:["kapitel","freischalten","gesperrt","schloss","durchgearbeitet","100"],
        answer:[
          "Das nächste Kapitel wird freigeschaltet, sobald du im vorherigen Kapitel alle Übungen, die zum Fortschritt zählen, mindestens einmal vollständig beendet hast.",
          "Du brauchst dafür keine 100 %. Fehler sind erlaubt. 100 % zeigen nur, dass du die Aufgaben besonders sicher geschafft hast."
        ],
        related:["fortschritt","erste-schritte","abschlussgeschichte"]
      },
      {
        id:"fortschritt",
        title:"Wie entstehen die Prozente?",
        aliases:["prozent","punkte","fortschritt","warum keine 100","bewertung","grün"],
        keywords:["prozent","fortschritt","100","punkte","grün","wertung","erster versuch"],
        answer:[
          "Noch nicht begonnene Übungen zählen im Kapitel zunächst mit 0 %. Deshalb steigt der Gesamtwert nach und nach.",
          "Die genaue Wertung unterscheidet sich je Übung. Entscheidend ist jeweils, wie viele Aufgaben du korrekt geschafft hast. Fehler kannst du wiederholen; bei manchen Übungen kann sich der Wert dadurch noch verbessern.",
          "Für die Freischaltung des nächsten Kapitels ist nicht die Prozentzahl entscheidend, sondern ob du alles einmal vollständig durchgearbeitet hast."
        ],
        related:["kapitel-freischalten","fortschritt-zuruecksetzen"]
      },
      {
        id:"hoeren",
        title:"Wie funktioniert Hören?",
        aliases:["vokabeln anhören","geschichte hören","dialog hören","sprechtempo"],
        keywords:["hören","audio","vokabel","dialog","geschichte","tempo","langsam"],
        answer:[
          "Hören ist in drei eigene Seiten aufgeteilt: Vokabeln, einzelne Sätze und die ganze Geschichte. Tippe Wörter oder Sätze an, um sie gezielt anzuhören; auf der Geschichtsseite wird alles zusammenhängend abgespielt.",
          "Das Sprechtempo lässt sich verändern. Hören zählt zum Kapitel-Fortschritt, sobald du den vorgesehenen Durchgang beendet hast."
        ],
        related:["ton-audio","erste-schritte","sprechen"]
      },
      {
        id:"schreiben",
        title:"Was gehört zum Bereich Schreiben?",
        aliases:["zeichen lernen","schreibtraining","tippen","hanzi schreiben","schriftzeichen lernen"],
        keywords:["schreiben","zeichen","hanzi","lernen","schreibtraining","tippen","anfänger","fortgeschritten","profi"],
        answer:[
          "Unter „Zeichen lernen“ lernst du Wörter Schritt für Schritt: anhören, Pinyin erkennen, Bedeutung wählen und die Zeichen nachzeichnen.",
          "Im „Schreibtraining“ gibt es Anfänger, Fortgeschritten und Profi. Für den Kapitel-Fortschritt genügt eine vollständig geschaffte Stufe. Fehlerhafte Wörter werden innerhalb der Stufe erneut geübt.",
          "Unter „Tippen“ gibst du chinesische Wörter über die Tastatur ein. Eine Anleitung zum Einrichten der chinesischen Tastatur wird direkt in der App angezeigt."
        ],
        related:["zeichen-wiederholen","chinesisch-tipps"]
      },
      {
        id:"sprechen",
        title:"Wie funktioniert Sprechen?",
        aliases:["sätze sprechen","spracherkennung","aussprache","mikrofon","sprechen üben"],
        keywords:["sprechen","mikrofon","spracherkennung","aussprache","satz","diktat"],
        answer:[
          "Unter „Sätze sprechen“ sprichst du vorgegebene chinesische Sätze. Unter „Geschichte nachsprechen“ hörst du jeden Satz einzeln und vergleichst ihn mit deiner Aufnahme. Beide Bereiche zeigen ihren eigenen Fortschritt.",
          "„Mit KI sprechen“ ist eine freiwillige Zusatzübung. Sie wird in der Übersicht angezeigt, ist aber nicht für die Freischaltung des nächsten Kapitels erforderlich.",
          "Auf Geräten ohne direkte Browser-Spracherkennung kannst du das Mikrofon der chinesischen Bildschirmtastatur verwenden und den erkannten Text prüfen lassen."
        ],
        related:["apple-sprechen","ki-sprechen","chinesisch-tipps"]
      },
      {
        id:"apple-sprechen",
        title:"Warum funktioniert die Spracherkennung auf iPhone oder iPad anders?",
        aliases:["iphone sprechen","ipad sprechen","apple mikrofon","safari spracherkennung","diktieren"],
        keywords:["iphone","ipad","apple","safari","spracherkennung","mikrofon","diktat"],
        answer:[
          "Safari stellt der Website auf iPhone und iPad keine direkte Spracherkennung für diese Übung bereit.",
          "Wechsle deshalb zur chinesischen Tastatur und tippe dort auf das Mikrofon-Symbol. Der diktierte Satz erscheint im Eingabefeld und kann anschließend geprüft werden.",
          "Hören, Nachzeichnen, Satzbau und die übrigen Spiele funktionieren davon unabhängig."
        ],
        related:["sprechen","chinesisch-tipps","installieren"]
      },
      {
        id:"satzuebungen",
        title:"Wie funktioniert „Sätze festigen“?",
        aliases:["sätze bauen","chinesisch deutsch","deutsch chinesisch","wortkarten","satz zusammensetzen"],
        keywords:["üben","satz","karten","hören","deutsch","chinesisch","zusammensetzen"],
        answer:[
          "Du baust vollständige Sätze aus Wortkarten. Dabei liegen auch Karten bereit, die nicht gebraucht werden.",
          "Es gibt drei Richtungen: chinesischen Satz hören und Hanzi bauen, Chinesisch nach Deutsch übertragen sowie Deutsch nach Chinesisch übertragen."
        ],
        related:["sprechen","fortschritt","erste-schritte"]
      },
      {
        id:"spiele",
        title:"Welche Spiele gibt es?",
        aliases:["flashkarten","memory","lückenspiel","spielen","lernspiele"],
        keywords:["spiel","flashkarten","memory","lücke","lückenspiel","wiederholen"],
        answer:[
          "Auf der Startseite führt „Spiele“ zu Jump & Run, Stirnraten und Memory. Stirnraten und Memory verwenden Vokabeln aus den Kapiteln, die du vorher auswählst.",
          "Flashkarten und „Lücken ergänzen“ findest du nicht unter Spiele, sondern direkt im Bereich „Vokabeln festigen“ des jeweiligen Kapitels."
        ],
        related:["stirnspiel","bonusspiel","fortschritt"]
      },
      {
        id:"stirnspiel",
        title:"Wie funktioniert das Stirn-Ratespiel?",
        aliases:["heads up","stirn ratespiel","handy an stirn","vokabeln erraten","zeitspiel"],
        keywords:["stirn","ratespiel","heads","kapitel","zeit","erraten","handy"],
        answer:[
          "Wähle ein oder mehrere bereits freigeschaltete Kapitel und eine Spielzeit. Danach hält eine Person das Handy an die Stirn, während die anderen das angezeigte Wort erklären.",
          "Die Anzeige kann zwischen Chinesisch und Deutsch wechseln. Das Spiel dient der gemeinsamen Wiederholung und zählt nicht zum Kapitel-Fortschritt."
        ],
        actions:[{label:"Spiele öffnen", href:"spiele.html"}],
        related:["spiele","kapitel-freischalten"]
      },
      {
        id:"bonusspiel",
        title:"Was ist „Su Rans Reise“?",
        aliases:["bonusspiel","jump and run","su rans reise","laufen","u bahn spiel"],
        keywords:["bonus","spiel","suran","reise","jump","run","wörter","sätze"],
        answer:[
          "„Su Rans Reise“ ist ein zusätzliches Lauf- und Sammelspiel. Du sammelst passende Wörter und setzt daraus Sätze zusammen.",
          "Derzeit ist dieses Bonusspiel für Kapitel 1 vorgesehen. Es ist eine freiwillige Ergänzung und zählt nicht zur Kapitel-Freischaltung."
        ],
        actions:[{label:"Spiele öffnen", href:"spiele.html"}],
        related:["spiele","fortschritt"]
      },
      {
        id:"zeichen-wiederholen",
        title:"Wie funktioniert „Zeichen wiederholen“ (汉字)?",
        aliases:["hanzi wiederholen","zeichen wiederholen","schriftzeichen wiederholen","汉字","grüne zeichen"],
        keywords:["hanzi","zeichen","wiederholen","grün","pinyin","bedeutung","aus kopf"],
        answer:[
          "Hier wiederholst du Wörter aus bereits freigeschalteten Kapiteln. Du siehst Pinyin und Bedeutung, aber keine Hanzi-Vorlage.",
          "Ein Wort wird nur dann grün markiert, wenn du es ohne Fehler aus dem Kopf geschrieben hast. Du kannst es beliebig oft wiederholen."
        ],
        actions:[{label:"Zeichen wiederholen", href:"wiederholen.html"}],
        related:["schreiben","kapitel-freischalten"]
      },
      {
        id:"chinesisch-tipps",
        title:"Wie richte ich die chinesische Tastatur ein?",
        aliases:["chinesische tastatur","pinyin tastatur","chinesisch eingeben","weltkugel","gboard"],
        keywords:["tastatur","chinesisch","pinyin","iphone","ipad","android","windows","weltkugel","gboard"],
        answer:[
          "Die genaue Anleitung hängt vom Gerät ab. In der Schreibübung zeigt die App passende Schritte für iPhone, iPad, Android, Windows oder Mac an.",
          "Nach der Einrichtung tippst du das Pinyin ohne Tonzeichen und wählst anschließend das gewünschte chinesische Wort aus der Vorschlagsleiste."
        ],
        related:["schreiben","apple-sprechen"]
      },
      {
        id:"installieren",
        title:"Wie installiere ich die Website als App?",
        aliases:["app installieren","zum startbildschirm","pwa","startseite","android installieren","iphone installieren","windows installieren"],
        keywords:["installieren","app","startbildschirm","pwa","safari","chrome","edge","iphone","android","windows"],
        answer:[
          "Auf iPhone und iPad öffnest du die Website in Safari, tippst auf Teilen und wählst „Zum Home-Bildschirm“.",
          "Auf Android erscheint in Chrome häufig „App installieren“. Alternativ findest du die Funktion im Browser-Menü. Unter Windows kannst du die Installation in Chrome oder Edge über das Installieren-Symbol beziehungsweise das Browser-Menü starten.",
          "Die ausführlichen Geräteschritte stehen auf der Installationsseite."
        ],
        actions:[{label:"Installationsanleitung öffnen", href:"start.html#install"}],
        related:["offline","apple-sprechen"]
      },
      {
        id:"offline",
        title:"Funktioniert die App ohne Internet?",
        aliases:["offline","ohne wlan","ohne internet","flugmodus","unterwegs"],
        keywords:["offline","internet","wlan","cache","geladen","audio","zeichendaten"],
        answer:[
          "Die eigentliche Lern-App wird für die Offline-Nutzung zwischengespeichert. Bereits geladene Seiten, Audios und Zeichendaten können danach auch ohne Verbindung funktionieren.",
          "Neue Audiodateien oder Zeichendaten müssen mindestens einmal mit Internet geladen worden sein. Der externe KI-Dialog in ChatGPT benötigt weiterhin eine Internetverbindung."
        ],
        related:["installieren","ton-audio","ki-sprechen"]
      },
      {
        id:"ton-audio",
        title:"Warum höre ich keinen Ton?",
        aliases:["kein ton","audio geht nicht","stumm","lautsprecher","vokabel nicht hören"],
        keywords:["ton","audio","lautstärke","stumm","lautsprecher","browser","geladen"],
        answer:[
          "Prüfe zuerst die Medienlautstärke und ob das Gerät stummgeschaltet ist. Tippe danach erneut auf die Vokabel oder den Abspielknopf.",
          "Manche Browser erlauben Ton erst nach einer Berührung des Bildschirms. Für bisher nicht geladene Audiodateien wird beim ersten Mal außerdem Internet benötigt.",
          "Bleibt das Problem bestehen, kannst du es über „Fehler melden“ mit Kapitel und Übungsbereich weitergeben."
        ],
        actions:[{label:"Fehler melden", href:"fehler.html"}],
        related:["hoeren","offline","fehler-melden"]
      },
      {
        id:"abschlussgeschichte",
        title:"Wann öffnet sich die Abschlussgeschichte?",
        aliases:["geschichte gesperrt","komplette geschichte","nach kapitel 15","lesegeschichte","完整的故事"],
        keywords:["geschichte","abschluss","kapitel 15","freischalten","lesen","pinyin","deutsch"],
        answer:[
          "Die zusammenhängende Geschichte wird freigeschaltet, sobald alle 15 Kapitel mindestens einmal vollständig durchgearbeitet wurden. 100 % in jedem Kapitel sind dafür nicht nötig.",
          "Beim Lesen kannst du Pinyin und die deutsche Übersetzung ein- oder ausblenden. Die App speichert außerdem deine letzte Lesestelle auf diesem Gerät."
        ],
        actions:[{label:"Zur Kapitelübersicht", href:"index.html"}],
        related:["kapitel-freischalten","fortschritt"]
      },
      {
        id:"name",
        title:"Wo wird mein Name gespeichert?",
        aliases:["name ändern","mein name","profil","vanessa","name speichern"],
        keywords:["name","profil","speichern","ändern","löschen","gerät","browser"],
        answer:[
          "Dein Name wird zunächst lokal in diesem Browser gespeichert und kann in passenden Übungen und Dialogen eingesetzt werden.",
          "Wenn du dich freiwillig mit einem Konto anmeldest, wird der Name zusammen mit deinem Lernfortschritt auf deine angemeldeten Geräte übertragen."
        ],
        actions:[{label:"Konto verwalten", href:"konto.html"}],
        related:["konto-datenschutz","fortschritt-zuruecksetzen"]
      },
      {
        id:"fortschritt-zuruecksetzen",
        title:"Wie setze ich meinen Fortschritt zurück?",
        aliases:["fortschritt löschen","alles zurücksetzen","kapitel reset","punkte löschen","neustart"],
        keywords:["fortschritt","zurücksetzen","löschen","kapitel","alle","einstellungen","reset"],
        answer:[
          "Öffne die Einstellungen und wähle unter „Fortschritt zurücksetzen“ entweder ein einzelnes Kapitel oder alle Kapitel.",
          "Dabei werden Prozente und Statistiken gelöscht. Dein gespeicherter Name bleibt erhalten. Das Zurücksetzen kann nicht rückgängig gemacht werden."
        ],
        actions:[{label:"Einstellungen öffnen", href:"einstellungen.html"}],
        related:["fortschritt","name"]
      },
      {
        id:"konto-datenschutz",
        title:"Brauche ich ein Konto und wo liegen meine Daten?",
        aliases:["konto","anmelden","login","datenschutz","meine daten","cloud"],
        keywords:["konto","login","anmelden","daten","datenschutz","lokal","browser","cloud"],
        answer:[
          "Ein Konto ist nicht erforderlich. Ohne Anmeldung bleiben Name, Fortschritt und Einstellungen lokal im Browser des verwendeten Geräts.",
          "Mit der freiwilligen Anmeldung per E-Mail-Code kannst du deinen Fortschritt über Supabase sichern und auf mehreren Geräten verwenden. Ohne Internet lernst du lokal weiter; der Abgleich erfolgt beim nächsten Online-Zugriff.",
          "Der freiwillige KI-Dialog öffnet ChatGPT außerhalb der Lern-App und unterliegt den dortigen Bedingungen."
        ],
        actions:[{label:"Konto verwalten", href:"konto.html"},{label:"Datenschutz öffnen", href:"datenschutz.html"}],
        related:["name","offline","ki-sprechen"]
      },
      {
        id:"fehler-melden",
        title:"Wie melde ich einen Fehler?",
        aliases:["fehler melden","problem melden","etwas stimmt nicht","bug","kontakt"],
        keywords:["fehler","problem","bug","melden","kapitel","bereich","kontakt"],
        answer:[
          "Öffne „Fehler melden“, wähle nach Möglichkeit Kapitel und Übungsbereich und beschreibe kurz, was passiert ist.",
          "Die App bereitet daraus eine E-Mail vor. Sende keine vertraulichen Daten und ergänze bei Bedarf Gerät und Browser in deiner Beschreibung."
        ],
        actions:[{label:"Fehler melden", href:"fehler.html"}],
        related:["ton-audio","hilfe-ohne-ki"]
      },
      {
        id:"ki-sprechen",
        title:"Was ist „KI sprechen“?",
        aliases:["chatgpt sprechen","ki dialog","schülerdialog mit ki","sprachmodus","prompt"],
        keywords:["ki","chatgpt","sprechen","dialog","prompt","sprachmodus","internet"],
        answer:[
          "„KI sprechen“ erstellt einen vorbereiteten Übungsauftrag für ChatGPT. Dort kannst du den Schülerdialog im Sprachmodus mit einer festgelegten Rolle üben.",
          "Diese Zusatzübung öffnet ChatGPT außerhalb der Lern-App, benötigt Internet und zählt nicht zum Kapitel-Fortschritt.",
          "Der Hilfe-Chat, in dem du dich gerade befindest, ist dagegen keine KI und arbeitet ausschließlich mit fest hinterlegten Antworten."
        ],
        related:["sprechen","hilfe-ohne-ki","offline"]
      },
      {
        id:"hilfe-ohne-ki",
        title:"Ist diese Hilfe eine KI?",
        aliases:["hilfe chatbot","chatbot ohne ki","wie funktioniert hilfe","kann hilfe erfinden","hilfe offline"],
        keywords:["hilfe","chatbot","ki","offline","antwort","wissen","lokal"],
        answer:[
          "Nein. Diese Hilfe verwendet keine KI und sendet deine Frage nicht an einen externen Anbieter.",
          "Sie vergleicht deine Eingabe nur mit fest hinterlegten Themen und Suchbegriffen. Deshalb kann sie nichts frei erfinden. Findet sie keine sichere Antwort, zeigt sie passende Themen oder verweist auf die Fehlermeldung."
        ],
        related:["konto-datenschutz","fehler-melden","ki-sprechen"]
      }
    ]
  };
})();
