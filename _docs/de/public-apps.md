---
title: Öffentliche Apps
description: Verwaltete Zugangsdaten für öffentliche Apps bereitstellen, statisches Hosting wählen und exakte Origins verwalten.
permalink: /de/public-apps/
order: 8
lang: de
translation_key: public-apps
keywords: [öffentliche App, verwaltete App, selbstverwaltet, GitHub Pages, statisches Hosting, erlaubte Origins, CDN]
---

## Zugangsdaten und Hosting trennen

Führen Sie die App erfolgreich aus und wählen Sie in der Vorschau **Export
App**. Studio bietet zwei Modelle:

- **Managed App** erstellt ein eigenes schlüsselloses Google-Dienstkonto.
  Kurzlebige Tokens kommen von `auth.earthengine.studio`.
- **Self-managed ZIP** behält den bisherigen portablen Ablauf bei. Sie betreiben
  den enthaltenen Token-Dienst und dessen Google-Cloud-Identität.

Eine verwaltete App setzt GitHub Pages nicht voraus. Google-Berechtigungen
dienen nur der App-Identität; GitHub-Berechtigungen dienen nur dem Schreiben
statischer Dateien und der Pages-Konfiguration.

## Statisches Hosting wählen

**Download managed site bundle** erzeugt ein statisches ZIP für eine eigene
Domain, einen bestehenden Webserver oder einen anderen statischen Hoster. Die
Konfiguration verweist bereits auf den verwalteten Token-Endpunkt.

**Deploy to GitHub Pages** erscheint nur, wenn das Einstiegdokument in einem
verbundenen, beschreibbaren GitHub-Repository liegt. Dieses Repository wird zum
Ziel. Aufgelöste Module und Anhänge aus anderen Quellen werden öffentlich
gebündelt. Der erzeugte Branch enthält keine Google- oder GitHub-Zugangsdaten,
Dienstkontoschlüssel oder Token-Dienst-Quellen.

## Mehrere exakte Origins verwalten

Eine App erlaubt 1–10 exakte Origins:

```json
{
  "allowedOrigins": [
    "https://maps.example.com",
    "https://preview.example.org",
    "https://alice.github.io"
  ]
}
```

Eine Origin besteht nur aus Schema, Hostname und optionalem Port. Die Origin
von `https://alice.github.io/forest-map/` ist daher
`https://alice.github.io`. Eine Pages-Bereitstellung ergänzt ihre Origin,
anstatt eigene Domains zu ersetzen.

Alle Origins einer App teilen Dienstkonto, Quoten und Drosselung. Verwenden Sie
getrennte App IDs, wenn Quoten oder Sicherheitsgrenzen unabhängig sein sollen.

## Verwalteten Ablauf abschließen

Studio validiert die App und das Earth-Engine-Projekt, prüft erforderliche
APIs, erstellt das App-spezifische Dienstkonto und vergibt ausschließlich Earth
Engine Resource Viewer und Service Usage Consumer. Der zentrale Broker erhält
Token Creator nur auf genau diesem Konto. Anschließend prüft Studio die
Impersonation mit einem temporären Nur-Lese-Token, bereitet die statische Site
vor, speichert die Origins und aktiviert die Ausgabe.

Jede externe Änderung wird vorher erklärt und bestätigt. Abgelehnte
Zustimmung, fehlende Rechte oder Providerfehler lassen abgeschlossene Schritte
erhalten. Studio erstellt keinen Dienstkontoschlüssel und löscht angelegte
Ressourcen nicht automatisch. Danach können Sie erneut herunterladen,
bereitstellen, Origins ändern, IAM prüfen, die Ausgabe deaktivieren oder die
Broker-Impersonation widerrufen.

## Öffentliche Sicherheitsgrenze verstehen

Besucher melden sich nicht an. Exportierter Quellcode, Anhänge und Asset-IDs
sind öffentlich. Private Earth-Engine-Assets müssen dem App-Dienstkonto
ausdrücklich Lesezugriff geben.

Ein Besucher kann das Browser-Token extrahieren und bis zum Ablauf
wiederverwenden. Die Origin-Prüfung steuert nur die Ausgabe und bindet ein
Bearer-Token nicht kryptografisch an eine Website. Earth-Engine-Anfragen gehen
direkt an die Standard- und High-Volume-API. Der Broker leitet keine
Berechnung, Kachel, Inspektion, Karte oder keinen Download weiter. Drive, Cloud
Storage, Asset-Schreibzugriffe, Ingestion, Batch-Exporte und Taskverwaltung sind
gesperrt.

## CDN und Token-Broker betreiben

Die Produktionsgrenzen bleiben getrennt:

- `code.earthengine.studio`: Editor, Assistent und Management-API;
- `cdn.earthengine.studio`: unveränderlicher Player unter `/portable/v1/` und
  Python-Runtime unter `/python-runtime/314.0.2/`;
- `auth.earthengine.studio`: nur `POST`/`OPTIONS`
  `/v1/apps/{appId}/token` und `GET /healthz`.

Richten Sie DNS und TLS für jeden Host ein. Beide können auf demselben Server
enden, müssen aber getrennte virtuelle Hosts bleiben und dürfen nicht zu
`code` umleiten. Der CDN braucht öffentliches CORS, unveränderliches Caching
und korrekte MIME-Typen. Der Broker nutzt eine schlüssellose Dienstidentität und
bedingt eingeschränkten Lesezugriff ausschließlich auf die eigene
Firestore-Datenbank; Management-Routen gehören nicht auf `auth`.

Veröffentlichen und prüfen Sie zuerst den CDN, dann den Broker. Konfigurieren
Sie danach DNS/TLS, testen Sie von einer unabhängigen HTTPS-Origin und
aktivieren Sie erst anschließend Apps. Nur Token-Anfragen dürfen `auth`
erreichen; Earth-Engine-Verkehr muss direkt zu Google gehen. Siehe
[Cloud-Run-Domains](https://docs.cloud.google.com/run/docs/mapping-custom-domains)
und
[Dienstidentitäten](https://docs.cloud.google.com/run/docs/configuring/services/service-identity).

## Aktueller Ablauf

Exporte enthalten `embed-snippet.html` und `embed-loader.js` für ein HTML-Custom-Element ohne iframe. Dateien zusammenhalten und Unterverzeichnispfade anpassen. Verwaltete Bereitstellung prüft Hauptskript und erfasste `require(...)`-Module; unaufgelöste dynamische Referenzen blockieren. Das dedizierte Dienstkonto erhält Lesezugriff auf erkannte private Assets unter Erhalt anderer Rechte. Fehlgeschlagene Freigaben nennen das Asset und erlauben Fortsetzung.
