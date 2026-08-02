# Supabase für „Chinesisch festigen“ einrichten

Die App ist bereits für eine freiwillige, passwortlose Anmeldung per E-Mail-Code und eine geräteübergreifende Fortschrittssynchronisierung vorbereitet.

## 1. Datenbank anlegen

1. Supabase-Projekt öffnen.
2. **SQL Editor** öffnen.
3. Den gesamten Inhalt von `supabase-setup.sql` ausführen.

Dadurch wird die Tabelle `user_progress` mit Row Level Security angelegt. Jeder angemeldete Nutzer darf ausschließlich seine eigenen Fortschrittszeilen lesen und verändern.

## 2. E-Mail-Code statt Anmeldelink einstellen

Unter **Authentication → Email Templates** muss die Anmelde-E-Mail den Token enthalten. Verwende im Text die Supabase-Variable:

`{{ .Token }}`

Nur wenn diese Variable in der Vorlage steht, erhält der Nutzer einen Code, den er direkt in der App eingeben kann.

## 3. Öffentliche Projektdaten eintragen

Unter **Project Settings → API** findest du:

- Project URL
- Publishable key oder den älteren öffentlichen anon key

Beides in `config.js` eintragen:

```js
window.CF_CONFIG = {
  workerUrl: "",
  supabaseUrl: "https://DEIN-PROJEKT.supabase.co",
  supabasePublishableKey: "DEIN_OEFFENTLICHER_SCHLUESSEL"
};
```

Der öffentliche Browser-Schlüssel darf in der Web-App stehen. Der `service_role`-Schlüssel darf dort niemals eingetragen werden.

## 4. App bereitstellen und testen

1. App hochladen.
2. `konto.html` öffnen oder auf der Kapitelübersicht **Profil → Konto und Synchronisierung** wählen.
3. E-Mail-Adresse eingeben und Code senden.
4. Code aus der E-Mail eingeben.
5. Eine Übung abschließen.
6. Auf einem zweiten Gerät mit derselben E-Mail-Adresse anmelden.
7. Prüfen, ob Prozente und Kapitel-Freischaltungen erscheinen.

## Verhalten ohne Internet

Die App speichert weiterhin zuerst lokal. Ohne Internet kann weitergelernt werden. Sobald das Gerät wieder online ist, werden Änderungen mit Supabase abgeglichen.

## Noch offen vor Veröffentlichung

- Datenschutzerklärung mit den echten Betreiber- und Hostingangaben vervollständigen und rechtlich prüfen.
- Kontolöschung festlegen. Die aktuelle App bietet Abmelden und lokales Zurücksetzen, aber noch keine automatische Löschung des Supabase-Auth-Kontos.
- E-Mail-Absender und Mail-Vorlage in Supabase passend gestalten.
