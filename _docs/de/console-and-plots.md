---
title: Konsole & Diagramme
description: Strukturierte Laufzeitausgaben prüfen und Plotly-, Earth-Engine-Chart- oder Matplotlib-Diagramm-Tabs erstellen.
permalink: /de/console-and-plots/
order: 7
lang: de
translation_key: console-and-plots
keywords: [Console, print, Plotly, ui.Chart, Matplotlib, Diagramme, CSV, PNG, SVG, Ereignisse]
translated_from: 9f0f2571b92a
---

## Console-Ausgaben lesen

JavaScript-`print(...)` und Python-`print(...)` senden Werte an **Console**.
Zeichenketten und Skalare erscheinen direkt. Strukturierte Objekte,
Earth-Engine-Werte und verschachtelte Collections verwenden nach Möglichkeit
aufklappbare Zeilen.

Die Console-Ausgabe bleibt über Läufe hinweg im aktuellen Arbeitsbereich
erhalten. Eine Löschen-Aktion entfernt die sichtbare Sitzung. Ist Console
verborgen, wenn eine Nachricht eintrifft, zeigt ihr Tab Aktivität an: Normale
Ausgaben verwenden eine ruhige Benachrichtigung, Fehler einen stärkeren Zustand.
Die Standardeinstellung des Arbeitsbereichs kann Console bei einem Fehler
automatisch nach vorn bringen.

Die Befehlsleiste von Console folgt dem aktuellen Day- oder Night-Design und
kann für unterstützte interaktive Laufzeiteingaben verwendet werden. Ein
Zurücksetzen des Workers oder ein Wechsel der Authentifizierung beendet die
Callbacks der vorherigen Laufzeit.

## Ein natives Plotly-Diagramm erstellen

`ui.Plotly(...)` akzeptiert Plotly-Daten- und Layout-Objekte aus JavaScript oder
Python und gibt ein Diagramm-Handle zurück. Geben Sie das Handle mit `print`
aus, rufen Sie seine Methode `show()` auf oder fügen Sie es einem Panel hinzu,
um das interaktive Diagramm zu öffnen. Verschachtelte, von Earth Engine
berechnete Werte werden aufgelöst, bevor das Diagramm angezeigt wird.

```javascript
var observations = [
  {month: "Apr", value: 0.42},
  {month: "May", value: 0.58},
  {month: "Jun", value: 0.67}
];

var figure = ui.Plotly({
  data: [{
    x: observations.map(function (item) { return item.month; }),
    y: observations.map(function (item) { return item.value; }),
    type: "scatter",
    mode: "lines+markers",
    name: "Vegetation index"
  }],
  layout: {title: "Seasonal signal", yaxis: {range: [0, 1]}}
});
print(figure);
```

Diagramm-Handles unterstützen Anzeige, Eigenschafts-Setter, serielle
Ereignis-Listener und Plotly-Update-Befehle. Nur registrierte Ereignisse
gelangen vom Diagramm-Tab zurück in den Skript-Worker. Entfernen Sie Listener,
die nicht mehr benötigt werden, in einer lang laufenden interaktiven Sitzung.

## Charts im Earth-Engine-Stil verwenden

Studio implementiert `ui.Chart(...)` und die unterstützten Factories
`ui.Chart.array`, `ui.Chart.feature` und `ui.Chart.image` auf Basis von Plotly.
Sie akzeptieren positionale und objektbasierte Konfigurationsformen und lösen
Earth-Engine-Eingaben in tabellarische Plotdaten auf.

Charts erzwingen ein Limit von 5.000 Zeilen. Erkannte Zeitspalten wandeln
plausible Unix-Sekunden oder -Millisekunden in Datumsachsen um. Jedes
unterstützte Chart behält seine Datentabelle für den CSV-Download.

`setOptions()` akzeptiert Google-Charts-Optionen aus Kompatibilitätsgründen,
gibt aber eine Warnung aus, weil Google-spezifisches visuelles Styling nicht
nach Plotly übersetzt wird. Verwenden Sie die Plotly-Layout-Oberfläche, wenn das
Erscheinungsbild genau gesteuert werden muss. Googles
[Chart-Leitfäden](https://developers.google.com/earth-engine/guides/charts_overview)
bleiben für Konzepte der Datenaufbereitung in Earth Engine nützlich; die
genauen Studio-Chart-Factories entnehmen Sie dem **Docs**-Panel in der App.

## Python-Diagramme anzeigen

Der Import von Plotly.py lädt bei der ersten Verwendung sein Browser-Paket.
Der Aufruf von `fig.show()` sendet das Ergebnis an dieselben nativen
Plotly-Tabs, die auch JavaScript verwendet.

Matplotlib-`plt.show()` und `Figure.show()` rendern statische PNG-Tabs:

```python
import matplotlib.pyplot as plt

months = ["Apr", "May", "Jun"]
signal = [0.42, 0.58, 0.67]

plt.plot(months, signal, marker="o", color="#5b8cff")
plt.ylim(0, 1)
plt.title("Seasonal signal")
plt.ylabel("Vegetation index")
plt.show()
```

## Ausgaben herunterladen und aufbewahren

Plotly-Tabs können PNG, SVG oder CSV herunterladen. Matplotlib-Tabs laden PNG
herunter. Diese Dateien sind ausdrückliche Artefakte; die Tabs selbst gelten nur
für die Sitzung und kehren nach einem vollständigen Neuladen nicht zurück.

Für große tabellarische oder Raster-Ergebnisse verwenden Sie einen Export oder
einen lokalen Studio-Download, statt die gesamte Nutzlast über ein Diagramm zu
leiten. Weiter mit [Tasks & Exporte]({{ '/de/tasks-and-exports/' | relative_url }}).

## Details und Grenzen

Ein Lauf kann abgeschlossen sein, während ausgegebene Earth-Engine-Werte noch aufgelöst werden. Collection-Vorschauen fordern anfangs bis zu 20 Elemente an; klappen Sie `features` auf, um **Load all** anzuzeigen, begrenzt auf 5.000. Das Ausschalten des Vorschau-Limits wendet diese Obergrenze sofort an. Cancel stoppt eine ausstehende Vorschau; Reset macht alte Arbeit ungültig. Arrays und strukturierte Werte bleiben aufklappbar, ohne doppeltes JSON. Python-Console und Plotly-Ausgabe verwenden die Browser-Laufzeit; asynchrone Callbacks können weiter ausgeben, nachdem das Hauptskript beendet ist.
