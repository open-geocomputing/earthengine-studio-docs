---
title: Arbeitsbereich
description: Studio-Bereiche anordnen, lokalen Kontext bewahren, Einstellungen des Arbeitsbereichs ändern und lokale Zustandsprobleme beheben.
permalink: /de/workspace/
order: 2
lang: de
translation_key: workspace
keywords: [Layout, Bereiche, Tabs, Popout, Design, Persistenz, Einstellungen, Zurücksetzen, Wiederherstellung]
translated_from: 3afc6a807054
---

[Lokaler Speichermodus]({{ '/de/local-storage/' | relative_url }}) — Skripte auf der Festplatte speichern, Google verbinden, optional Git nutzen und den Ordnerzugriff wiederherstellen.


## Das Standardlayout verstehen

Studio beginnt mit vier Arbeitsbereichen:

- Die linke Tab-Gruppe enthält **Scripts**, **Docs**, **Assets** und
  **Settings**.
- Die Mitte nimmt Editor-Dokumente, Dataset-Details, Asset-Details und
  Diagramm-Tabs auf.
- Die rechte Tab-Gruppe enthält **Inspector**, **Console** und **Tasks**.
- Der untere Bereich enthält die Haupt-**Map** und alle von Skripten erzeugten
  Karten.

Ziehen Sie die Trennlinien, um die Größe eines Bereichs zu ändern. Ziehen Sie
einen Tab in eine andere Tab-Gruppe, um den Arbeitsbereich neu zu ordnen.
Maximieren Sie eine Tab-Gruppe, wenn eine Aufgabe mehr Platz braucht, und
stellen Sie sie anschließend wieder her, ohne die übrige Anordnung zu verlieren.

## Mit Tabs arbeiten

Ein Editor-Tab steht für ein lokal gespeichertes Dokument. Entfernte Dateien
behalten ihr Repository, ihren Branch, ihren Pfad und die geöffnete Revision.
Dataset- und Asset-Detail-Tabs halten Referenzinformationen neben der Analyse
bereit, statt sie zu ersetzen.

Über das Kontextmenü eines Tabs können Sie verwandte Tabs schließen, kürzlich
geschlossene Editor-Dokumente erneut öffnen oder den Fokus in einem überfüllten
Layout wiederherstellen. Das Schließen eines lokalen Editors verwirft den
zugehörigen Wiederherstellungsdatensatz nicht sofort. Studio schützt stets
einen Editor-Tab: Eine Schaltfläche zum Schließen oder die Sammelaktionen
**Close**, **Close Other Tabs** oder **Close Tabs to the Right** können das
letzte Editor-Dokument nicht entfernen und so den Code-Arbeitsbereich zum
Verschwinden bringen. Schließbare Tabs, die keine Editoren sind, etwa Settings,
bleiben von dieser Schutzmaßnahme unabhängig.

Map- und Editor-Tabs, die Popout unterstützen, lassen sich in ein separates
Browserfenster lösen. Das ist für einen zweiten Monitor nützlich, aber das
abgelöste Fenster gehört weiterhin zur selben Studio-Sitzung. Wird die
Host-Sitzung geschlossen, enden ihre Laufzeitverbindungen.

## Layout-Voreinstellungen verwenden

Das Steuerelement für den Arbeitsbereich in der oberen Leiste bietet
aufgabenorientierte Voreinstellungen. Eine Voreinstellung ändert die relative
Platzierung und Größe der Bereiche; sie löscht keine Dokumente, Geometrien,
Tasks oder Repositories. Nach der Wahl einer Voreinstellung können Sie weiter
Größen ändern oder Tabs verschieben – die entstehende Anordnung wird zum
nächsten gemerkten Layout.

**Settings** bietet außerdem ein **AI first**-Layout: ein breiter Seitenbereich
mit ausgewählter KI-Konversation neben Editor, Ausgabe und Karte.

Wenn ein Bereich geschlossen ist, öffnen Sie ihn über dasselbe
Arbeitsbereich-Steuerelement erneut. Unabhängige Bereiche werden nur bei Bedarf
geladen und zeigen eine Wiederholen-Aktion, wenn ein Feature-Bundle nicht
startet.

## Wissen, was Studio sich merkt

Studio speichert Arbeitskontext im Browser, darunter:

- geöffnete Editor-Dokumente und das ausgewählte Dokument;
- FlexLayout-Positionen, -Größen und ausgewählte Tabs;
- Einrückung und Sprachwahl des Editors für Entwürfe;
- die Designeinstellung Day, Night oder Auto;
- Renderer, Basiskarte und zuletzt verwendeten Ausschnitt der Hauptkarte;
- angezeigte Repositories, ausgewählte Branches und aufgeklappte Ordner;
- ausgewählte Verhaltensweisen des Arbeitsbereichs, etwa das Öffnen von Console
  bei Fehlern.

Dieser lokale Zustand ist praktisch, aber kein Ersatz für die Speicherung in
einem Repository. Ungespeicherte Entwürfe und begleitende
Geometrie-Arbeitsbereiche existieren nur im aktuellen Browserprofil, bis Sie
sie remote speichern oder den Arbeitsbereich zurücksetzen.

Von Skripten erzeugte Map-Tabs und Plot-Tabs sind Sitzungszustand. Sie werden
nach einem vollständigen Neuladen nicht als entfernte Artefakte
wiederhergestellt.

## Einstellungen ändern

Öffnen Sie **Settings** über den linken Bereich oder die obere Leiste.
Häufige Optionen sind:

- **Theme:** Auto folgt dem Betriebssystem; Day und Night bleiben fest.
- **Indentation:** Wählen Sie die für neue Bearbeitungen verwendete
  Tab-Breite des Editors.
- **Workspace modes:** Aktivieren Sie Local folders, Hosted services oder
  beides; wählen Sie das bevorzugte Ziel für neue Dateien. Karten verwenden
  MapLibre.
- **Default basemap:** Wählen Sie den Starthintergrund der Hauptkarte.
- **Approximate location:** Fordern Sie optional eine ungenaue
  Browser-Standortbestimmung an, wenn keine gemerkte Kartenansicht vorhanden
  ist.
- **Plot destination:** Legen Sie fest, wo neue Diagramm-Tabs eingefügt werden.
- **Console on error:** Bringt Console nach vorn, wenn ein Lauf einen Fehler
  meldet.

Einstellungen, die die aktive Laufzeit betreffen, gelten für künftige
Aktivitäten. Bereits von Skripten erzeugte Karten behalten den Provider, der
bei ihrer Erstellung gewählt war.

## Lokalen Zustand sicher zurücksetzen

Verwenden Sie die Zurücksetzen-Aktion in Settings, wenn beschädigter lokaler
Zustand den normalen Start verhindert oder Sie einen sauberen
Browser-Arbeitsbereich wünschen. Studio listet vor der Bestätigung die
betroffenen Browser- und Remote-Einstellungsbereiche auf.

Das Zurücksetzen löscht **keine** Earth-Engine-Assets, keine Dateien in
entfernten Repositories und keine bereits gesendeten Earth-Engine-Operationen.
Es kann ungespeicherte lokale Entwürfe, angehängte lokale Dateien, gemerkte
Layouts, Geometrie-Arbeitsbereiche und lokale UI-Einstellungen entfernen.
Speichern Sie wertvolle Arbeit in einem Repository, bevor Sie bestätigen.

Bei einem Problem mit einem einzelnen Bereich versuchen Sie zuerst dessen
Wiederholen-Steuerelement oder laden Sie die Seite neu, bevor Sie alles
zurücksetzen. Hinweise zur Wiederherstellung bei Authentifizierungs- und
Laufzeitproblemen finden Sie unter
[Fehlerbehebung]({{ '/de/troubleshooting/' | relative_url }}).

## Details und Grenzen

Die Symbolleiste passt sich schmalen Arbeitsbereichen an und gibt der Suche die
verfügbare Breite. Zum KI-Tab, seinen Providern und seinen
Genehmigungsrichtlinien siehe
[KI-Assistent]({{ '/de/ai-assistant/' | relative_url }}).
