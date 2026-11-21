---
title: Fehlerbehebung
description: Probleme mit Konto, Projekt, Laufzeit, Browser, Repositories, Karten und lokalen Downloads in Earth Engine Studio diagnostizieren.
permalink: /de/troubleshooting/
order: 12
lang: de
translation_key: troubleshooting
keywords: [Fehler, Authentifizierung, Berechtigungen, Laufzeit-Reset, Browser, Module, Downloads, Karten, Support]
translated_from: 4bac00d13c25
---

[Lokaler Speichermodus]({{ '/de/local-storage/' | relative_url }}) — Skripte auf der Festplatte speichern, Google verbinden, optional Git nutzen und den Ordnerzugriff wiederherstellen.


## Probleme bei Anmeldung oder Projekt

Wenn sich die Oberfläche öffnet, Earth-Engine-Anfragen aber fehlschlagen:

1. Prüfen Sie, ob das Konto-Steuerelement die gewünschte Google-Identität zeigt.
2. Prüfen Sie, ob ein Cloud-Projekt ausgewählt ist.
3. Prüfen Sie, ob das Projekt aktiviert und für die Nutzung von Earth Engine
   registriert ist.
4. Prüfen Sie, ob Ihr Konto Earth Engine über dieses Projekt nutzen darf.
5. Melden Sie sich ab und wieder an, wenn die serverseitige Sitzung den Zugriff
   nicht mehr erneuern kann.

Google dokumentiert die aktuellen Projektanforderungen im
[Earth-Engine-Zugriffsleitfaden](https://developers.google.com/earth-engine/guides/access)
und die aktuellen Rollenkombinationen im
[Leitfaden zum Ressourcenzugriff](https://developers.google.com/earth-engine/guides/access_control).

Ein Wechsel von Konto oder Projekt setzt projektbezogene Clients zurück und
macht alte Laufzeit-Callbacks ungültig. Führen Sie Skripte erneut aus, sobald
die neue Verbindung bereit ist.

## Ein Skript funktioniert nicht mehr

Lesen Sie den ersten Fehler in **Console**, nicht nur das abschließende
Symptom. Häufige Ursachen sind:

- ein privates Asset oder entferntes Modul ist für das aktuelle Konto nicht
  lesbar;
- ein dynamischer GeoJSON-Pfad kann vor der Ausführung nicht aufgelöst werden;
- ein Earth-Engine-Ausdruck überschreitet die Grenzen interaktiver Anfragen;
- ein Callback gehört zu einem Worker, der zurückgesetzt wurde;
- entferntes Python wurde nicht als vertrauenswürdig bestätigt oder verletzte die
  Grenzen des Modulgraphen;
- ein Wert kann nicht zwischen JavaScript und Python übertragen werden und
  verbleibt daher in seiner ursprünglichen Laufzeit.

Führen Sie eine kleinere Auswahl aus, um den fehlschlagenden Ausdruck
einzugrenzen. Bei serverseitigen Earth-Engine-Fehlern erklärt Googles
[Debugging-Leitfaden](https://developers.google.com/earth-engine/guides/debugging)
Client-/Server-Objekte, Skalierung, Speicher und Timeout-Muster.

## Console-, Diagramm- oder Karten-Tabs sind verschwunden

Diagramm-Tabs und von Skripten erzeugte Karten-Tabs sind Sitzungszustand. Das
Neuladen der Seite rekonstruiert sie nicht automatisch; führen Sie das Skript
erneut aus, das sie erzeugt hat.

Der Ausschnitt der Hauptkarte, die Editor-Dokumente und das Layout werden lokal
gespeichert. Ist nur ein Bereich nicht geladen worden, verwenden Sie dessen
Wiederholen-Aktion. Setzen Sie den gesamten Arbeitsbereich erst zurück, nachdem
Sie wichtige Entwürfe gespeichert und ein normales Neuladen versucht haben.

## Kartenebenen werden nicht gerendert

Prüfen Sie den eigenen Status der Ebene und lassen Sie Console sichtbar. Eine
fehlgeschlagene Ebene sollte unabhängige Ebenen nicht blockieren.

- Schalten Sie eine experimentelle Compute-Pixel-Ebene zurück auf normale
  Earth-Engine-Kacheln.
- Verringern Sie die Pixel pro Kachel oder vereinfachen Sie einen aufwendigen
  Ausdruck.
- Verwenden Sie MapLibre für Vektorfelder und andere Erweiterungen, die nur
  MapLibre bietet.
- Verwenden Sie in älteren Skripten `Map.create()` oder `provider: "maplibre"`;
  andere Renderer-Werte werden nicht mehr unterstützt.
- Earth-Engine-HTTP-429-Kachelantworten werden automatisch wiederholt.
  Erschöpfte Ratenbegrenzungen für Vektorkacheln werden bewusst aus dem Rauschen
  von Studio und der Browser-Console ausgelassen; prüfen Sie daher den
  Ebenenstatus und versuchen Sie es später erneut, auch wenn keine
  429-Meldung erscheint.
- Beachten Sie, dass Basiskarten-Anbieter unabhängige Zoomgrenzen und eine
  eigene Dienstverfügbarkeit haben.

Wenn Inspector einige Ebenen sieht, eine andere aber nicht, unterstützt diese
Ebene möglicherweise den aktuellen Abfragepfad nicht.

## Repository-Speichern schlägt fehl

Unterscheiden Sie zuerst ein Berechtigungs- oder Verbindungsproblem von einem
Revisionskonflikt.

- Verbinden Sie den Provider neu, wenn seine Sitzung abgelaufen ist.
- Prüfen Sie, ob Repository und Branch für das verbundene Konto beschreibbar
  sind.
- Zeigen Sie das Repository in Scripts an, bevor Sie es als Ziel für neue
  Dateien verwenden.
- Bei einem Konflikt: lokale Arbeit sichern, die neueste Revision laden,
  abgleichen und erneut speichern.
- Öffentliche Repositories im Web sind bewusst schreibgeschützt.

Studio benötigt im Browser nie ein Client-Secret. Fordert eine Bereitstellung
Nutzer auf, Provider-Secrets in Frontend-Einstellungen einzufügen, melden Sie
das dem Betreiber dieser Bereitstellung.

## Lokale Downloads schlagen fehl

Die Ordnerausgabe erfordert eine kompatible File System Access API der
Chromium-Familie und eine Benutzergeste. Verwenden Sie die ZIP-Ausgabe, wenn die
Verzeichnisauswahl nicht verfügbar ist, halten Sie das Ergebnis aber klein genug,
um es im Browser-Speicher zusammenzustellen.

Lassen Sie die Seite geöffnet und den gewählten Ordner beschreibbar. Eine
Änderung der Browser-Berechtigung, ein Worker-Reset, ein Fehler bei der
Erneuerung der Authentifizierung oder eine unterbrochene Verbindung können die
lokale Ausgabe unterbrechen. Verwenden Sie das Manifest, um kompatible
Ordnerarbeit fortzusetzen; ZIP-Arbeit ist nicht fortsetzbar.

## Weitere Hilfe erhalten

Bei Fragen zu Earth-Engine-API, Kontingent, Daten oder Berechnung verwenden Sie
Googles [Earth-Engine-Hilfeverzeichnis](https://developers.google.com/earth-engine/help).
Reduzieren Sie das Problem, wenn Sie um Hilfe bitten, auf ein kleines Skript und
machen Sie jedes erforderliche Asset für die Personen lesbar, die es
untersuchen.

Bei einem Studio-spezifischen Problem mit Oberfläche oder Integration melden Sie
Browser, gewählten Renderer oder Provider, den betroffenen Bereich,
reproduzierbare Schritte und den ersten Console-Fehler im
[Issue-Tracker des Earth Engine Studio Editors](https://github.com/open-geocomputing/earthengine-studio-editor/issues).
Geben Sie keine Zugriffstokens, OAuth-Secrets, Servicekonto-Schlüssel oder
privaten Dataset-Inhalte an.
