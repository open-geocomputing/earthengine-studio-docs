---
title: Erste Schritte
description: Studio mit einem Earth-Engine-fähigen Cloud-Projekt verbinden und die erste Analyse ausführen.
permalink: /de/getting-started/
order: 1
lang: de
translation_key: getting-started
keywords: [Anmeldung, Cloud-Projekt, JavaScript, Python, ausführen]
---
## Voraussetzungen

Sie benötigen einen modernen Browser, ein Google-Konto und ein für Earth Engine registriertes Cloud-Projekt. Der [Earth-Engine-Zugangsleitfaden](https://developers.google.com/earth-engine/guides/access?hl=de) erklärt Registrierung und Berechtigungen.

## Erste Ausführung

1. Öffnen Sie [Earth Engine Studio](https://code.earthengine.studio/), melden Sie sich an und wählen Sie ein Projekt.
2. Erstellen Sie unter **Scripts** ein JavaScript- oder Python-Dokument.
3. Klicken Sie auf **Run**.
4. Prüfen Sie Layer in **Map** und Werte in **Console**.

```javascript
var zone = ee.Geometry.Rectangle([10.8, 46.4, 12.4, 47.4]);
var elevation = ee.Image("NASA/NASADEM_HGT/001").clip(zone);
Map.centerObject(zone, 8);
Map.addLayer(elevation, {min: 400, max: 3200}, "Elevation");
print("Area km²", zone.area().divide(1e6));
```

Python verwendet einen bereits authentifizierten Earth-Engine-Client; der erste Pyodide-Start kann länger dauern.

## Ergebnisse

**Map** zeigt Layer, **Console** Werte und Fehler, **Plots** Diagramme und **Tasks** noch zu bestätigende Exporte. Das ausgewählte Projekt bestimmt Anfragen, Assets und Exporte.
