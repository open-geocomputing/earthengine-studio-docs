---
title: Öffentliche Apps
description: Zugangsdaten für verwaltete öffentliche Apps bereitstellen, statisches Hosting wählen, exakte Origins verwalten oder selbstverwaltet exportieren.
permalink: /de/public-apps/
order: 9
lang: de
translation_key: public-apps
keywords: [öffentliche App, verwaltete App, selbstverwaltet, GitHub Pages, statisches Hosting, erlaubte Origins, Token-Broker, CDN, Servicekonto]
translated_from: af8798a3b421
---

## Zugangsdaten vom Hosting trennen

Führen Sie die App erfolgreich aus und wählen Sie dann in ihrer Vorschau
**Export App**. Studio bietet zwei Modelle für Zugangsdaten:

- **Managed App** richtet für die App ein eigenes, schlüsselloses
  Google-Servicekonto ein. Earth Engine Studio betreibt den Aussteller
  kurzlebiger Zugangsdaten unter `auth.earthengine.studio`.
- **Self-managed ZIP** behält den bestehenden portablen Workflow bei. Sie
  betreiben die mitgelieferte Vorlage für den Token-Dienst und ihre
  Google-Cloud-Identität.

Managed App bedeutet nicht GitHub Pages. Zugangsdaten und statisches Hosting
sind getrennte Entscheidungen, und die Autorisierung bei Google und bei GitHub
bleibt voneinander unabhängig.

## Wählen, wo die statische Website läuft

Nach der Auswahl von Managed App wählen Sie einen dieser Hosting-Wege:

- **Download managed site bundle** erstellt ein statisches ZIP, das auf eine
  eigene Domain, einen bestehenden Webserver oder einen anderen statischen Host
  hochgeladen werden kann. Seine Konfiguration verwendet bereits den verwalteten
  Token-Endpunkt.
- **Deploy to GitHub Pages** ist eine optionale Komfortfunktion, die nur
  angezeigt wird, wenn das Einstiegsdokument der App zu einem verbundenen,
  beschreibbaren GitHub-Repository gehört. Studio schreibt einen vollständig
  generierten Branch und konfiguriert branchbasierte Pages erst nach
  ausdrücklicher Bestätigung.

Für GitHub Pages ist das Repository des Einstiegsdokuments das
Bereitstellungsziel. Aufgelöste Module und Anhänge aus anderen Quellen werden in
die öffentliche Website gebündelt. Der generierte Branch enthält keine
Google-Zugangsdaten, kein GitHub-Token, keinen Servicekonto-Schlüssel und keinen
Quelltext des Token-Dienstes.

## Exakte erlaubte Origins konfigurieren

Der öffentliche Broker stellt nur dann Tokens aus, wenn der exakte normalisierte
`Origin` des Browsers im vertrauenswürdigen App-Datensatz steht. Eine App
unterstützt 1–10 Origins:

```json
{
  "allowedOrigins": [
    "https://maps.example.com",
    "https://preview.example.org",
    "https://alice.github.io"
  ]
}
```

Ein Origin enthält nur Schema, Hostnamen und optional einen Port. Er hat keinen
Pfad; der Origin für `https://alice.github.io/forest-map/` ist daher
`https://alice.github.io`. Das Hinzufügen einer Pages-Bereitstellung führt
diesen Origin mit der bestehenden Liste zusammen, statt eigene Domains zu
ersetzen.

Alle Origins einer App teilen sich deren Servicekonto, Kontingent, Drosselungen
und Token-Cache. Erstellen Sie getrennte App-IDs, wenn Bereitstellungen
unabhängige Kontingente oder Sicherheitsisolierung benötigen.

## Den verwalteten Workflow abschließen

Studio bewahrt den abgeschlossenen Zustand, sodass eine abgelehnte
Einwilligung, eine fehlende Berechtigung oder ein Fehler des Anbieters
wiederholt werden kann, ohne erfolgreiche Änderungen zu wiederholen. Der
Workflow:

1. validiert die App und prüft die Google-Autorisierung;
2. prüft die Earth-Engine-Projektregistrierung und die erforderlichen APIs;
3. erstellt das App-spezifische Servicekonto oder verwendet es wieder;
4. gewährt nur Earth Engine Resource Viewer und Service Usage Consumer;
5. gewährt dem zentralen Broker Token Creator nur für genau dieses Konto;
6. verifiziert die Impersonation mit einem temporären schreibgeschützten Token;
7. bereitet die statische Website und das gewählte Hosting vor;
8. speichert die exakten erlaubten Origins, prüft IAM erneut und aktiviert die
   Ausstellung.

Jede externe Änderung wird beschrieben, bevor sie erfolgt. Studio erstellt nie
einen Servicekonto-Schlüssel und löscht nach einem späteren Fehler nicht
stillschweigend Ressourcen. Die abschließenden Steuerelemente können erneut
herunterladen, Pages bereitstellen oder erneut bereitstellen, Origins
verwalten, IAM verifizieren, die Ausstellung deaktivieren oder die
Broker-Impersonation widerrufen.

## Die öffentliche Sicherheitsgrenze verstehen

Öffentliche Besucher melden sich nicht an. Exportierter Quelltext, Inhalt von
Anhängen und Asset-Kennungen sind öffentlich. Private Earth-Engine-Assets
müssen dem Servicekonto der App ausdrücklich Lesezugriff gewähren.

Das Zugriffstoken verbleibt nur im Speicher von Browser und Worker, doch ein
Besucher kann es bis zum Ablauf extrahieren und wiederverwenden. Die
Origin-Validierung steuert die Ausstellung; sie bindet ein Bearer-Token nicht
kryptografisch an eine Website. Verwenden Sie getrennte Servicekonten mit
minimalen Rechten, schreibgeschütztes IAM, Kontingent, Drosselung und getrennte
App-IDs für eine aussagekräftige Isolierung.

Portable Apps rufen die Standard- und die High-Volume-Earth-Engine-APIs direkt
auf. Drive, Cloud Storage, Asset-Schreibzugriffe, Ingestion, Batch-Exporte und
Task-Verwaltung sind blockiert. Keine Earth-Engine-Berechnungs-, Kachel-,
Karten-, Inspektions- oder Download-Anfrage wird über den Aussteller der
Zugangsdaten weitergeleitet.

## CDN und Aussteller der Zugangsdaten betreiben

Die Produktion verwendet getrennte Host-Grenzen:

| Host | Zuständigkeit |
| --- | --- |
| `code.earthengine.studio` | Authentifizierter Editor, Bereitstellungsassistent und Verwaltungs-API |
| `cdn.earthengine.studio` | Unveränderlicher portabler Player und fest versionierte Python-Laufzeit |
| `auth.earthengine.studio` | Ausschließlich Aussteller der Zugangsdaten für öffentliche Apps |

Richten Sie `cdn.earthengine.studio` und `auth.earthengine.studio` mit DNS und
TLS auf ihre Auslieferungs-Endpunkte. Sie dürfen auf demselben physischen Server
enden, müssen aber getrennte virtuelle Hosts bleiben; leiten Sie keinen der
beiden Namen auf `code.earthengine.studio` um.

Veröffentlichen Sie diese unveränderlichen CDN-Präfixe:

- `/portable/v1/`
- `/python-runtime/314.0.2/`

CDN-Antworten benötigen öffentlichen Cross-Origin-GET-Zugriff, langlebiges
unveränderliches Caching und korrekte MIME-Typen für JavaScript, JSON, CSS, WASM
und Wheels. Führen Sie im Studio-Quell-Repository `npm run cdn-release:prepare`
aus, um einen frischen versionierten Release-Baum zusammenzustellen.

Der Auth-Host stellt nur bereit:

- `POST` und `OPTIONS /v1/apps/{appId}/token`
- `GET /healthz`

Stellen Sie den Broker mit seiner dedizierten, vom Benutzer verwalteten
Cloud-Run-Dienstidentität und schlüssellosen Application Default Credentials
bereit oder betreiben Sie ihn auf Loopback hinter einem separaten virtuellen
Reverse-Proxy-Host auf einer Maschine mit gleichwertiger schlüsselloser
Identität. Geben Sie ihm schreibgeschützten bedingten Zugriff nur auf die
dedizierte Firestore-Datenbank für öffentliche Apps. Legen Sie keine
Verwaltungsrouten auf diesen Host.

Führen Sie den Rollout in dieser Reihenfolge durch: CDN veröffentlichen und
verifizieren, Broker bereitstellen und per Health-Check prüfen, DNS/TLS
konfigurieren, von einem unabhängigen HTTPS-Origin testen, dann verwaltete Apps
aktivieren. Die Netzwerkinspektion darf nur Token-Anfragen zeigen, die
`auth.earthengine.studio` erreichen; Earth-Engine-Verkehr muss direkt zu Google
gehen. Setzen Sie den Broker bei Bedarf auf seine vorherige Revision zurück und
deaktivieren Sie betroffene App-Datensätze. Ändern Sie niemals eine bereits
veröffentlichte unveränderliche CDN-Version.

Googles aktuelle Produktionsempfehlung sieht für eine eigene Cloud-Run-Domain
einen globalen externen Application Load Balancer vor; die direkte
Cloud-Run-Domain-Zuordnung ist eine Preview mit eingeschränkter Verfügbarkeit.
Siehe
[Benutzerdefinierte Domains für Cloud Run](https://docs.cloud.google.com/run/docs/mapping-custom-domains)
und
[Dienstidentitäten](https://docs.cloud.google.com/run/docs/configuring/services/service-identity).

## Details und Grenzen

App-Exporte enthalten `embed-snippet.html` und `embed-loader.js` für eine Inline-Einbettung als Custom Element ohne iframe. Halten Sie Bundle und Anhänge zusammen und passen Sie die Pfade für Hosting in einem Unterverzeichnis an. Die verwaltete Bereitstellung durchsucht das Einstiegsskript und erfasste `require(...)`-Module nach Assets; ungelöste dynamische Referenzen blockieren die Bereitstellung. Nach dem Erstellen oder Wiederverwenden des dedizierten Servicekontos gewährt sie Lesezugriff auf erkannte private Assets und lässt unabhängige Berechtigungen unberührt. Fehlgeschlagene Berechtigungen nennen das Asset und lassen die Bereitstellung fortsetzbar.
