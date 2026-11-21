---
title: Lokaler Speicher
description: Skripte auf der Festplatte speichern, Google verbinden, optional Git nutzen und den Ordnerzugriff wiederherstellen.
permalink: /de/local-storage/
order: 13
lang: de
translation_key: local-storage
keywords: [lokal, Speicher, Ordner, Git, Tresor, Google, offline]
translated_from: d19f26c621aa
---

## Mit einem lokalen Ordner beginnen

1. Verwenden Sie einen Desktop-Browser auf Chromium-Basis (Chrome oder Edge) auf der HTTPS-Website von Studio.
2. Wählen Sie im Startdialog **Local** und gewähren Sie Lese- und Schreibzugriff auf einen Ordner, üblicherweise `Earthengine` genannt. Bei einem Abbruch bleibt die Auswahl geöffnet; wählen Sie einen Ordner oder **Online**.
3. Erstellen Sie unter **Scripts → Local folders** einen Projektordner oder klappen Sie ein bestehendes direktes Unterverzeichnis Ihres gewählten Ordners auf. Öffnen Sie eine Datei, bearbeiten Sie sie und speichern Sie sie auf der Festplatte. Für die Bearbeitung lokaler Dateien sind weder Git noch eine Google-Anmeldung erforderlich.
4. Verwenden Sie **Settings → Workspace modes**, um den Ordner erneut zu verbinden oder zu ändern, die Earth-Engine-Projekt-ID und den Git-Autor zu konfigurieren oder **Hosted services** zusätzlich zu **Local folders** zu aktivieren. Der bevorzugte Modus steuert neue Entwürfe; bestehende Dateien werden in ihrer ursprünglichen Quelle gespeichert. Ein Moduswechsel verschiebt keine Dateien.

## Earth Engine verbinden

Der lokale Speicher hält Dateien auf Ihrem Computer; die Berechnung in Earth Engine benötigt dennoch Internetzugang und ein autorisiertes Google-Cloud-Projekt. Klicken Sie auf **Sign in** oder **Connect Google and remember** und autorisieren Sie im Fenster von Google. Für eine im Browser erstellte Verbindung sind weder ein Terminal noch ein Tresor-Passwort nötig. Das Standard-Earth-Engine-Projekt wird ausgewählt, sofern verfügbar und sofern Sie nicht bereits eine Auswahl gespeichert haben. Wechseln Sie das Projekt über die Projektauswahl in der oberen Leiste; schlägt die Ermittlung fehl, geben Sie die Projekt-ID in Workspace modes ein. Die Überprüfung kann bis zu eine Minute dauern. Nach einem Zugriffsfehler bleibt die Auswahl für ein anderes Projekt oder einen erneuten Versuch verfügbar.

Ist ein Authentifizierungsdienst konfiguriert, speichert Studio eine serverseitig verschlüsselte, an den Origin gebundene Autorisierung in `.earthengine.studio/google-connection.json`. Sie wird automatisch wiederhergestellt, sobald die Ordnerberechtigung verfügbar ist. Der Dienst tauscht und erneuert Zugangsdaten, ohne einen Datensatz mit Benutzer-Zugangsdaten zu speichern; Zugriffstokens bleiben im Arbeitsspeicher. Behandeln Sie die gespeicherte Autorisierung wie Zugangsdaten und halten Sie den Ordner privat. **Remove saved Google connection** löscht die lokale Kopie, widerruft aber nicht die Autorisierung bei Google und entfernt keine Sicherungen. Eine ausdrückliche Anmeldung öffnet die Einwilligung erneut; die automatische Erneuerung tut das nicht. Die optionale schreibgeschützte Monitoring-Berechtigung aktiviert die monatliche Nutzungsanzeige, wenn verfügbar; ein ausgeblendetes Messinstrument bedeutet weder keine Nutzung noch einen fehlgeschlagenen Earth-Engine-Zugriff.

Bei einer statischen Bereitstellung ohne den Authentifizierungsdienst erfordert die Google-Anmeldung im Browser gelegentlich eine erneute Autorisierung. Die OAuth-Client-ID konfiguriert der Administrator der Bereitstellung. Ist Hosted services aktiviert, liefert die gehostete Authentifizierung die gemeinsame Earth-Engine-Sitzung; deaktivieren Sie sie, um die lokale Verbindung zu verwenden.

## Dateien, Git und Downloads

Jedes Projekt ist ein Unterordner, zum Beispiel `Earthengine/project-a/main.js`. Private Einstellungen und Zugangsdaten liegen in `Earthengine/.earthengine.studio/`. Scripts zeigt standardmäßig JavaScript-, Python-, Markdown- und Dateien ohne Endung; **Show all file types** blendet andere Dateien ein. Dotfiles (außer `.gitignore`), Punkt-Ordner und `__name__`-Verzeichnisse bleiben verborgen.

Relative JavaScript-`require()`-Aufrufe und Python-Importe funktionieren innerhalb von Projekten. `require('lh:project-b/module.js')` lädt ein anderes Projekt im selben Arbeitsbereich. Das Speichern committet nicht. Für optionales Git klappen Sie das Projekt auf und öffnen seine Branch-Schaltfläche, wählen dann bei Bedarf **Initialize Git**. Geben Sie einen Pfad für **stage**/**unstage**, eine Nachricht für **commit** oder einen Namen für **branch**/**checkout** ein. Legen Sie Name und E-Mail-Adresse des Git-Autors in Workspace modes fest. **status**, **diff**, **log** und **branches** untersuchen das Repository. Checkout erfordert einen sauberen Arbeitsbaum, einschließlich nicht verfolgter Dateien.

Verwenden Sie Desktop-Git für Clone, Pull, Push, Konflikte, Submodule und verknüpfte Worktrees. Führen Sie Desktop-Git nicht gleichzeitig mit Git-Operationen von Studio aus. Browser-Git unterstützt gewöhnliche Repositories mit bis zu 20.000 Dateien, 128 MiB einschließlich Verlauf und 40 Verzeichnisebenen. Halten Sie große Ausgaben außerhalb von Projekten. Ordner-Downloads landen standardmäßig in `downloads/<description>` innerhalb des Arbeitsbereichs. Lassen Sie den Browser-Tab bis zum Abschluss geöffnet.

## Wieder öffnen, sichern und wiederherstellen

Verwenden Sie **Reconnect folder**, wenn die Berechtigung abläuft, oder wählen Sie den ursprünglichen Ordner erneut. Das Löschen von Website-Daten kann das Ordner-Handle vergessen lassen, löscht aber keine Dateien auf der Festplatte. Sichern Sie Projektdateien unabhängig; ungespeicherte Entwürfe nutzen den Wiederherstellungsspeicher des Browsers. Ändert eine andere Anwendung eine Datei, sichern Sie Ihre ungespeicherten Änderungen, bevor Sie das Neuladen akzeptieren.

Der optionale Tresor speichert benannte Secrets oder fortgeschritten importierte Google-Zugangsdaten. Wählen Sie **Unlock or create vault** mit einer Passphrase von mindestens 12 Zeichen; das automatische Ausfüllen durch Passwortmanager wird unterstützt. Der Tresor sperrt sich beim Neuladen oder bei Trennung der Verbindung. Importierte Zugangsdaten erfordern nach einem Neustart das Entsperren; im Browser erstellte Google-Verbindungen nicht. Studio kann eine vergessene Passphrase nicht wiederherstellen.

Committen oder teilen Sie `.earthengine.studio/` nicht. Meldet Git eine unterbrochene Transaktion, sichern Sie ihr Wiederherstellungsjournal und die Sicherungen, bevor Sie zur Wiederherstellung Desktop-Git verwenden. Der [Leitfaden zur Repository-Wiederherstellung](https://github.com/open-geocomputing/earthengine-studio-editor/blob/master/LOCAL_WORKSPACE.md#recovery) beschreibt das Vorgehen. Gehostete Snippets und die Bereitstellung verwalteter Apps erfordern Hosted services; der lokale Modus macht diese Dienste nicht offline verfügbar.
