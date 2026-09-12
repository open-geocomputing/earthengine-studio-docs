---
title: Lokaler Speicher
description: Skripte auf der Festplatte speichern, Google verbinden und Git optional nutzen.
permalink: /de/local-storage/
order: 12
lang: de
translation_key: local-storage
keywords: [local, storage, folders, Git, vault, Google, offline]
---

## Ordner auswählen

1. Öffnen Sie Studio über HTTPS in Chrome oder Edge auf dem Desktop.
2. Wählen Sie beim Start **Local** und erlauben Sie Lese- und Schreibzugriff auf einen Ordner, üblicherweise `Earthengine`. Nach Abbruch wählen Sie einen Ordner oder **Online**.
3. Erstellen oder öffnen Sie unter **Scripts → Local folders** einen direkten Unterordner. Dateien lassen sich ohne Git und Google-Anmeldung bearbeiten und auf der Festplatte speichern.
4. Unter **Settings → Workspace modes** können Sie Ordner erneut verbinden, Projekt-ID und Git-Autor einstellen und **Hosted services** zusätzlich aktivieren. Der bevorzugte Modus gilt für neue Entwürfe; vorhandene Dateien behalten ihr Speicherziel. Dateien werden nicht automatisch verschoben.

## Earth Engine verbinden

Berechnungen benötigen weiterhin Internet und ein berechtigtes Google-Cloud-Projekt. Wählen Sie **Sign in** oder **Connect Google and remember**. Terminal und Tresorpasswort sind dafür nicht erforderlich. Ohne gespeicherte Auswahl wird das Earth-Engine-Standardprojekt gewählt, sofern vorhanden. Wechseln Sie Projekte oben im Projektmenü; bei fehlgeschlagener Erkennung tragen Sie die ID in Workspace modes ein. Die Prüfung kann eine Minute dauern; nach Fehlern bleibt das Projektmenü verfügbar.

Mit Authentifizierungsdienst speichert Studio eine serverseitig verschlüsselte, an die Herkunft gebundene Berechtigung in `.earthengine.studio/google-connection.json`. Nach Freigabe des Ordners wird sie automatisch wiederhergestellt. Der Dienst erneuert Zugangsdaten ohne einen Benutzer-Zugangsdaten-Datensatz zu speichern; Zugriffstokens bleiben im Arbeitsspeicher. Halten Sie den Ordner privat. **Remove saved Google connection** löscht nur die lokale Kopie, ohne Google-Berechtigung oder Sicherungen zu entfernen. Explizite Anmeldung öffnet die Einwilligung erneut. Monitoring-Lesezugriff ist optional; eine fehlende Anzeige bedeutet nicht null Verbrauch.

Ohne Authentifizierungsdienst erfordert die Browser-Anmeldung gelegentlich eine erneute Freigabe. Die OAuth-Client-ID konfiguriert der Betreiber. Aktivierte Hosted services stellen die gemeinsame Earth-Engine-Sitzung bereit; deaktivieren Sie sie für die lokale Verbindung.

## Dateien, Git und Downloads

Projekte liegen direkt unter `Earthengine/`, etwa `project-a/main.js`; private Einstellungen unter `.earthengine.studio/`. **Show all file types** zeigt weitere Dateitypen, aber keine versteckten Dateien außer `.gitignore`, Punktordner oder `__name__`-Ordner. Relative Python-Imports und JavaScript-`require()` funktionieren; `require('lh:project-b/module.js')` lädt aus einem anderen Projekt desselben Arbeitsbereichs.

Speichern erzeugt keinen Commit. Öffnen Sie den Branch-Knopf des aufgeklappten Projekts und bei Bedarf **Initialize Git**. **stage**/**unstage** erwarten einen Pfad, **commit** eine Nachricht, **branch**/**checkout** einen Namen. Konfigurieren Sie den Git-Autor in Workspace modes. **status**, **diff**, **log**, **branches** dienen zur Prüfung. Checkout verlangt einen sauberen Arbeitsbaum einschließlich unversionierter Dateien.

Desktop-Git übernimmt Clone, Pull, Push, Konflikte, Submodule und verknüpfte Worktrees. Führen Sie keine gleichzeitigen Git-Operationen aus. Browser-Git unterstützt bis zu 20.000 Dateien, 128 MiB mit Historie und 40 Verzeichnisebenen. Ordnerdownloads verwenden standardmäßig `downloads/<description>`; lassen Sie den Tab offen und speichern Sie große Ausgaben außerhalb der Projekte.

## Wiederherstellung und optionaler Tresor

Bei fehlender Berechtigung wählen Sie **Reconnect folder**. Gelöschte Website-Daten können die Ordnerverbindung vergessen, löschen aber keine Dateien. Sichern Sie Projekte unabhängig; ungespeicherte Entwürfe nutzen die Browser-Wiederherstellung. Bewahren Sie eigene Änderungen vor dem Neuladen extern geänderter Dateien auf.

**Unlock or create vault** benötigt mindestens zwölf Zeichen und unterstützt Passwortmanager. Der Tresor sperrt sich beim Neuladen oder Trennen des Ordners. Fortgeschrittene Google-Zugangsdatenimporte benötigen nach Neustart die Entsperrung; im Browser erstellte Verbindungen nicht. Vergessene Passphrasen sind nicht wiederherstellbar.

Teilen Sie `.earthengine.studio/` nicht. Bei unterbrochenen Git-Transaktionen erhalten Sie Journal und Sicherungen vor der Wiederherstellung mit Desktop-Git. Gehostete Snippets und die Bereitstellung verwalteter Apps benötigen Hosted services.
