---
title: Assets
description: Earth-Engine-Assets in Studio durchsuchen, untersuchen, hochladen, teilen, verschieben, verknüpfen und sicher löschen.
permalink: /de/assets/
order: 10
lang: de
translation_key: assets
keywords: [Assets, Upload, IAM, Teilen, Löschen, Verschieben, Footprint, Bänder, verknüpfte Assets, Deep Link]
translated_from: 0e636dcdf0d0
---

## Zugängliche Projekte durchsuchen

Das **Assets**-Panel ermittelt die Earth-Engine-Projektwurzeln, die dem
ausgewählten Google-Konto und Cloud-Projekt zur Verfügung stehen. Ordner und
Image-Collections werden verzögert aufgeklappt, sodass große Bäume reaktionsfähig
bleiben.

Wählen Sie eine Zeile für kompakte Details. Doppelklicken Sie auf ein Asset, um
einen größeren Tab im mittleren Bereich zu öffnen. Die Details können Typ,
Kennungen, Systemmetadaten, benutzerdefinierte Eigenschaften, Inhalte von
Collections und für dieses Asset passende Aktionen enthalten.

Image-Bänder verwenden eine kompakte Zeile für Name, CRS und die
Pyramiding-Richtlinie von Earth Engine. Klappen Sie **Details** auf, um
Abmessungen, Datentyp, numerischen Bereich und Werte für fehlende Daten aller
Bänder gemeinsam anzuzeigen.

## Den Footprint eines Assets in der Vorschau anzeigen

Liefert Earth Engine einen GeoJSON-Footprint, passt die Aktion zur
Kartenvorschau die Hauptkarte an und zeichnet einen neutralen Umriss. Das ist
eine temporäre Vorschau, keine gespeicherte Analyseebene und kein
Geometriedatensatz.

Schalten Sie die Aktion erneut um oder wählen Sie ein anderes Asset, um den
Umriss zu entfernen. Andere Kartenebenen und gespeicherte Geometrie bleiben
unberührt.

## Daten hochladen

Der Upload-Ablauf akzeptiert unterstützte Dateien, Verzeichnisse und
Earth-Engine-Manifeste. Studio stellt lokale Dateien nach Bedarf bereit und
zeigt vor dem Senden den resultierenden Upload-Plan an. Prüfen Sie Ziel-Kennungen,
erkannte Dateirollen und die Anzahl der Tasks, bevor Sie fortfahren.

Uploads gehen in Earth-Engine-Operationen über. Das Schließen der lokalen Seite
kann die Bereitstellung vor dem Senden unterbrechen, eine gesendete Operation
läuft jedoch dienstseitig. Googles
[Dokumentation zur Asset-Ingestion](https://developers.google.com/earth-engine/guides/image_upload)
ist maßgeblich für unterstützte Rasterformate und Manifestfelder.

## Zugriff teilen

Die Asset-IAM-Steuerung unterstützt Benutzer, Gruppen, Domains, öffentlichen
Lesezugriff sowie Leser- oder Schreiberrollen. Eine rekursive Ordneroption wendet
die gewünschte Änderung auf untergeordnete Elemente an und lässt unabhängige
Richtlinienbindungen unberührt.

Prüfen Sie den rekursiven Geltungsbereich sorgfältig. Eine erfolgreiche
Richtlinienänderung betrifft die Earth-Engine-Ressource selbst, nicht nur ihre
Sichtbarkeit in Studio.

Studio-Asset-Links verwenden eine URL der aktuellen Domain mit einer
`?asset=`-Kennung. Ein Empfänger löst dieses Asset mit seinem aktiven Projekt
auf und kann es unter **Linked assets** behalten, auch wenn das besitzende
Projekt in seinem normalen Projektbaum fehlt. Der Link gewährt keine fehlende
IAM-Berechtigung.

## Mehrere Assets verschieben und auswählen

Command/Ctrl-Klick fügt Zeilen der aktuellen Auswahl hinzu oder entfernt sie.
Ziehen Sie ein oder mehrere ausgewählte Assets auf einen Ordner, eine
Image-Collection oder eine Projektwurzel, um ein Verschieben über den offiziellen
Earth-Engine-Endpunkt zu planen.

Das Verschieben ändert Asset-Kennungen. Aktualisieren Sie Skripte, Manifeste,
Dashboards und geteilte Links, die auf den alten Pfad verweisen.

## Sicher löschen

Das Löschen ist endgültig und erfordert stets eine Bestätigung. Gewöhnliche
Blatt-Assets verwenden eine direkte Bestätigung. Ordner und Image-Collections
können untergeordnete Elemente aufzählen, den Gesamtfortschritt melden,
Kindelemente zuerst löschen und erlauben, die verbleibende Arbeit zu stoppen.

Das Stoppen einer rekursiven Löschung stellt bereits entfernte Elemente nicht
wieder her. Prüfen Sie Ziel und Auswahl vor der Bestätigung erneut,
insbesondere nach einer Mehrfachauswahl oder einer Ziehen-Aktion.

Details zu Speicher, Kontingent und Berechtigungen auf Plattformebene finden Sie
in Googles [Leitfaden zur Asset-Verwaltung](https://developers.google.com/earth-engine/guides/manage_assets).

## Details und Grenzen

Die Suche filtert geladene Assets unter Beibehaltung des Ordnerkontexts; sortieren Sie jede Ebene nach Name oder nach der neuesten Aktualisierung, wobei Assets ohne Datum zuletzt stehen. Ziehen Sie Dateien, Ordner oder ein lokales Manifest in den Upload-Bereich und prüfen Sie Ziel und Manifest vor dem Senden. Lose Shapefiles erfordern, dass `.shp`, `.dbf`, `.shx` und optional `.prj` gemeinsam ausgewählt werden. Der Fortschritt trennt die Dateiübertragung vom Senden der Ingestion. Die Schaltfläche zum Schließen blendet den Upload-Bereich aus; Tasks verfolgt die resultierende Ingestion-Operation und das Ziel-Asset.
