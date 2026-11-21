---
title: Erste Schritte
description: Verbinden Sie Earth Engine Studio mit einem aktivierten Cloud-Projekt und führen Sie Ihre erste Analyse in JavaScript oder Python aus.
permalink: /de/getting-started/
order: 1
lang: de
translation_key: getting-started
keywords: [Anmeldung, Cloud-Projekt, erstes Skript, ausführen, JavaScript, Python, Authentifizierung]
translated_from: 935c99744348
---

[Lokaler Speichermodus]({{ '/de/local-storage/' | relative_url }}) — Skripte auf der Festplatte speichern, Google verbinden, optional Git nutzen und den Ordnerzugriff wiederherstellen.


## Was Sie benötigen

Studio läuft in einem modernen Browser. Um Earth-Engine-Anfragen auszuführen,
benötigen Sie außerdem ein Google-Konto und ein Google-Cloud-Projekt, das für
die Nutzung von Earth Engine registriert ist. Der
[Earth-Engine-Zugriffsleitfaden](https://developers.google.com/earth-engine/guides/access)
von Google erklärt Registrierung, Projekttypen, Abrechnung und Berechtigungen.

Sie können die Oberfläche ohne Anmeldung öffnen und Aufbau, Beispiele und
Dokumentation erkunden. Anfragen, die Earth-Engine-Daten lesen, Assets
untersuchen oder Exporte erstellen, erfordern ein authentifiziertes Projekt.

<div class="notice" markdown="1">
**Über die Plattform**

Earth Engine Studio stellt den Arbeitsbereich bereit. Google Earth Engine
liefert den Katalog, den Berechnungsdienst und die Earth-Engine-APIs. Studio
ist unabhängig und kein offizielles Google-Produkt.
</div>

## Konto und Projekt verbinden

1. Öffnen Sie [Earth Engine Studio](https://code.earthengine.studio/) und
   wählen Sie **Local** mit einem Ordner oder **Online**.
2. Melden Sie sich über das Konto-Steuerelement oben rechts mit Google an.
3. Wählen Sie ein Cloud-Projekt, für das Earth Engine aktiviert ist und das Ihr
   Konto verwenden darf.
4. Warten Sie, bis der Verbindungsstatus das ausgewählte Projekt bestätigt.

Das Projekt ist mehr als eine Anzeigeeinstellung. Es wird für
Earth-Engine-Anfragen, die Asset-Suche, Exporte und die Studio-Dienste
verwendet, die Repository-Einstellungen oder Zugangsdaten speichern. Ein
Wechsel macht aktive Laufzeit-Callbacks ungültig und aktualisiert
projektbezogene Bereiche.

Studio hält Google-Zugriffstokens im Arbeitsspeicher und nicht im lokalen
Browser-Speicher. Die serverseitige Sitzung kann die Autorisierung erneuern,
solange der Arbeitsbereich geöffnet ist.

## Ein erstes Skript öffnen

Wählen Sie im linken Bereich **Scripts**, klappen Sie **Built-in examples**
auf und öffnen Sie ein kompaktes Beispiel. Jede geöffnete Datei erhält einen
eigenen Editor-Tab. Mit dem Steuerelement für neue Dateien können Sie auch ein
ungespeichertes Dokument beginnen.

Als eigenständigen JavaScript-Ausgangspunkt fügen Sie Folgendes in einen leeren
Editor ein. Das Skript zeichnet eine Geländeansicht über einem Teil der
Ostalpen und gibt die Fläche des Analysegebiets aus.

```javascript
var region = ee.Geometry.Rectangle([10.8, 46.4, 12.4, 47.4]);
var elevation = ee.Image("NASA/NASADEM_HGT/001").clip(region);

Map.centerObject(region, 8);
Map.addLayer(
  elevation,
  {min: 400, max: 3200, palette: ["17324d", "5fa67a", "f0d28b", "f7f7f2"]},
  "Alpine elevation"
);

print("Region area in km²", region.area().divide(1e6));
```

Wählen Sie im Sprachsteuerelement des Editors **JavaScript**, falls der
Dateiname nicht bereits auf `.js` oder `.ee.js` endet, und klicken Sie dann auf
**Run**. Die Ebene erscheint in **Map**, und der berechnete Wert erscheint in
**Console**.

## Denselben Ablauf in Python ausprobieren

Erstellen Sie ein weiteres leeres Dokument, wählen Sie **Python** und
verwenden Sie einen Dateinamen mit `.py` oder `.ee.py`. Studio stellt den
authentifizierten Earth-Engine-Client in seiner Python-Laufzeit im Browser
bereit, sodass ein normales Studio-Skript keinen separaten
Authentifizierungsablauf starten muss.

```python
import ee

region = ee.Geometry.Rectangle([10.8, 46.4, 12.4, 47.4])
elevation = ee.Image("NASA/NASADEM_HGT/001").clip(region)

Map.centerObject(region, 8)
Map.addLayer(
    elevation,
    {"min": 400, "max": 3200,
     "palette": ["17324d", "5fa67a", "f0d28b", "f7f7f2"]},
    "Alpine elevation",
)

print("Region area in km²", region.area().divide(1e6))
```

Der erste Python-Lauf kann länger dauern, während Studio die fest versionierte
Browser-Laufzeit vorbereitet. Spätere Läufe verwenden sie weiter, bis der
Worker oder der Authentifizierungskontext zurückgesetzt wird.

## Das Ergebnis lesen

Ein Skript kann mehrere Teile des Arbeitsbereichs aktualisieren:

- **Map** zeigt Ebenen an und bietet Steuerelemente für Sichtbarkeit,
  Deckkraft, Basiskarte, Zeichnen und Inspektion.
- **Console** zeigt die Ausgabe von `print()`, Warnungen und Fehler an.
  Strukturierte Earth-Engine-Werte lassen sich aufklappen.
- **Plots** öffnen sich als Tabs im mittleren Bereich, wenn Code Plotly-,
  Chart- oder Matplotlib-Ausgaben erzeugt.
- **Tasks** nimmt Exportdefinitionen auf. Sie bleiben ungesendet, bis Sie sie
  ausdrücklich prüfen und starten.

Wenn Code im Editor markiert ist, werten Sie mit **Run selection** nur dieses
Fragment aus. Verwenden Sie einen vollständigen Lauf, wenn spätere Anweisungen
von zuvor im Dokument erzeugten Bindungen abhängen.

## Wie es weitergeht

Im [Arbeitsbereich-Leitfaden]({{ '/de/workspace/' | relative_url }}) erfahren
Sie, wie Bereiche und Persistenz funktionieren. Der
[Editor-Leitfaden]({{ '/de/editor/' | relative_url }}) behandelt Dateien,
Module, Speichern und Teilen. Für Earth-Engine-Datentypen und
Analysekonzepte sind die [Entwicklerleitfäden](https://developers.google.com/earth-engine/guides)
von Google die maßgebliche Referenz.

## Details und Grenzen

Wählen Sie beim Start Local mit einem Ordner oder Online. Google ist für die Ausführung von Earth Engine erforderlich, nicht für die Bearbeitung lokaler Dateien. Die Projektauswahl bleibt nach Zugriffsfehlern nutzbar; wählen Sie ein anderes Projekt oder versuchen Sie es erneut und rechnen Sie mit bis zu einer Minute für die Überprüfung. Anzeigen zum monatlichen Kontingent erscheinen nur, wenn Nutzung und Zuteilung gelesen werden können; fehlende Anzeigen bedeuten nicht, dass keine Nutzung vorliegt. Die Zustimmung zu Local Monitoring ist optional. Sitzungen versuchen nach Ruhezustand oder erneuter Verbindung, sich wiederherzustellen, bevor eine interaktive Anmeldung erforderlich wird.
