---
title: Konsole & Diagramme
description: Strukturierte Ausgaben, Earth-Engine-Diagramme sowie Plotly- und Matplotlib-Grafiken untersuchen.
permalink: /de/console-and-plots/
order: 6
lang: de
translation_key: console-and-plots
keywords: [Konsole, Diagramm, Plotly, Matplotlib, ui.Chart]
---
## Konsole

`print(...)` sendet Text, Zahlen, Listen, Dictionaries und Earth-Engine-Objekte an **Console**. Strukturierte Werte lassen sich aufklappen. Lesen Sie bei einem Fehlschlag zuerst die früheste Fehlermeldung; spätere Meldungen sind oft Folgefehler.

## Diagramme

JavaScript-`ui.Chart`-Ausgaben sowie Plotly-Figuren erscheinen in **Plots**. Python kann Plotly oder Matplotlib verwenden. Diagramme können je nach Typ als Bild oder Datendatei heruntergeladen werden.

Jeder Lauf besitzt seinen Ausgabezustand. Tabs können umbenannt, verschoben oder geschlossen werden; script-erzeugte Diagramme sind nicht dauerhaft und werden durch erneute Ausführung reproduziert.

## Aktueller Ablauf

Ein Lauf kann enden, während Ausgaben noch geladen werden. Sammlungsvorschauen laden höchstens 20 Elemente; unter `features` erscheint **Load all** mit maximal 5.000. Ohne Vorschaulimit gilt sofort diese Obergrenze. Cancel stoppt laufende Vorschauen, Reset verwirft alte Arbeit. Strukturierte Werte bleiben ohne doppeltes JSON aufklappbar. Python Console und Plotly nutzen die Browser-Laufzeit; Callbacks können nach Skriptende weiter ausgeben.
