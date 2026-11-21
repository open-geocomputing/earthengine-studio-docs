---
title: KI-Assistent
description: Ein Modell mit dem experimentellen KI-Tab verbinden, mit den Richtlinien Allow, Ask und Off steuern, was es darf, und jede Studio-Funktion nachschlagen.
permalink: /de/ai-assistant/
order: 4
lang: de
translation_key: ai-assistant
keywords: [KI, Assistent, Agent, ChatGPT, Claude, Codex, Loom, Companion, Richtlinie, Genehmigung, Studio-Funktionen, Plan-Modus, Secret Manager]
translated_from: 90d339c07156
---

Der **AI**-Tab (KI) ist ein experimentelles, andockbares Konversationspanel.
Ein von Ihnen verbundenes Modell kann den Arbeitsbereich über typisierte
**Studio functions** (Studio-Funktionen) lesen und ändern: Es bearbeitet das
aktive Skript, führt es mit der normalen **Run**-Aktion aus, liest die Console,
untersucht die Karte und arbeitet, sofern Sie es erlauben, mit Assets, Tasks,
Git und der Veröffentlichung von Apps. Für jede Funktion gilt eine Richtlinie
**Allow**, **Ask** oder **Off**, die Sie steuern.

Für ein Layout rund um den Assistenten wählen Sie in **Settings** das
Arbeitsbereich-Layout **AI first**: ein breiter Seitenbereich mit ausgewählter
KI-Konversation neben Editor, Ausgabe und Karte. Sie können den AI-Tab auch
beliebig verschieben. Siehe [Arbeitsbereich]({{ '/de/workspace/' | relative_url }}).

<div class="notice" markdown="1">
**Worauf der Assistent zugreifen kann**

Der Assistent handelt mit Ihrer angemeldeten Google-Sitzung, Ihrem ausgewählten
Cloud-Projekt und dem mit der Konversation verknüpften Repository. Schreibgeschützte
Funktionen laufen ohne Rückfrage. Funktionen, die Dateien ändern, Code
ausführen oder Kontingent verbrauchen, fragen zuerst nach. Destruktive,
öffentliche und berechtigungsändernde Funktionen sind **Off**, bis Sie sie
einschalten.
</div>

## Provider und Modell wählen

Wählen Sie die Verbindung in der Zeile **AI provider** oben im Tab, dann ein
Modell aus der Liste des jeweiligen Providers. Studio merkt sich in diesem
Browser Ihren zuletzt verwendeten Provider und das zuletzt verwendete Modell
jedes Providers. Ein Wechsel von Provider oder Modell behält die sichtbare
Konversation bei.

| Provider | Abrechnung | Wo es funktioniert | Zugangsdaten |
| --- | --- | --- | --- |
| **ChatGPT** (Sign in with ChatGPT) | Nutzung Ihres ChatGPT-Tarifs; kein API-Schlüssel | Direkt in einem Studio, das unter `http://127.0.0.1:<port>` bereitgestellt wird; auf der gehosteten Website über den ChatGPT-Anmeldehelfer des Loom.js Companion | Tokens im Speicher des Tabs; optional in Ihrem eigenen Secret Manager gemerkt |
| **Claude API** | Nutzungsabhängige Zahlung über das Claude-Console-Konto, dem der Schlüssel gehört; ein Claude.ai-Abonnement kann nicht verwendet werden | Lokales und gehostetes Studio | API-Schlüssel im Speicher des Tabs; optional in Ihrem eigenen Secret Manager gemerkt |
| **Loom.js Companion** | Ihr Codex/ChatGPT-Abonnement über die Erweiterung | Chrome mit der [Loom.js-Companion-Erweiterung](https://chrome.google.com/webstore/detail/gdcebopdllcifgleoefgbobdopiaholg) | Von der Erweiterung verwahrt |

### Loom.js Companion

1. Installieren Sie die Chrome-Erweiterung Loom.js Companion und melden Sie sich
   dort an.
2. Öffnen Sie den AI-Tab. Studio bittet die Erweiterung, den exakten
   Studio-Origin zu genehmigen; akzeptieren Sie dies. Eine **Retry**-Aktion
   erscheint, wenn Sie die Anfrage verwerfen.
3. Sobald die Verbindung steht, klappt der Einrichtungshinweis zu einem
   Statussymbol in der Kopfzeile des Tabs zusammen.

Produktions-Origins müssen HTTPS verwenden. `localhost` und `127.0.0.1`
funktionieren für die lokale Entwicklung.

### ChatGPT

Wählen Sie **Continue with ChatGPT**, schließen Sie das Anmelde-Popup ab und
erlauben Sie die Tarifnutzung. OpenAI akzeptiert die Anmelde-Weiterleitung nur
unter `http://127.0.0.1:<port>/auth/callback`. Auf der gehosteten Website
verwendet Studio daher den optionalen **Website ChatGPT sign-in helper** des
Companion: Studio führt die Anmeldung weiterhin selbst durch und hält die Tokens
in der Seite; die Erweiterung öffnet lediglich das ChatGPT-Fenster und leitet
die Anfragen weiter, die eine Seite nicht lesen kann.

Fehlt ein Einrichtungsschritt, benennt der ChatGPT-Bereich ihn: Erweiterung
nicht installiert oder nicht erreichbar, Website nicht genehmigt, Helfer
ausgeschaltet oder Erweiterung zu alt. Die Provider-Liste zeigt **ChatGPT (via
Companion)**, wenn der Helfer bereit ist, und **ChatGPT (set up Companion)**,
solange ein Schritt fehlt. Melden Sie sich über die Kopfzeile des Tabs ab.

### Claude API

Fügen Sie einen Schlüssel aus der Claude Console ein. Studio prüft ihn durch
das Auflisten von Modellen und hält ihn nur im Speicher des Tabs: niemals im
Browser-Speicher, in Logs, Diagnosen oder gespeicherten Konversationen.
**Forget Claude API key** verwirft ihn sofort; auch ein Neuladen vergisst ihn.
Organisationen mit Zero Data Retention können die Claude API nicht aus einem
Browser aufrufen, und Studio weist darauf hin.

### Zugangsdaten im Secret Manager merken

Standardmäßig meldet ein Neuladen ChatGPT ab und vergisst den Claude-Schlüssel.
Unter jedem Provider speichert **Remember in my Google Cloud Secret Manager**
(standardmäßig aus) die Zugangsdaten als Secret in **Ihrem eigenen**
Cloud-Projekt; die Seite schreibt und liest es mit Ihrer eigenen Google-Sitzung.
Nichts Geheimes gelangt in den Browser-Speicher oder das Studio-Backend.

Voraussetzungen, einmal pro Projekt:

1. Verwenden Sie den Modus **Online** und melden Sie sich mit Google an. Die
   Anmeldung mit lokalem Ordner ist schreibgeschützt und kann den Secret Manager
   nicht nutzen.
2. Aktivieren Sie die Secret Manager API im ausgewählten Projekt, über die
   Projektdienste-Prüfung von Studio oder mit
   `gcloud services enable secretmanager.googleapis.com --project=PROJECT_ID`.
3. Ihr Konto muss in diesem Projekt Secrets erstellen, lesen, versionieren und
   löschen können (`roles/secretmanager.admin` oder Owner). Jeder, der Secrets
   im Projekt lesen kann, kann die Zugangsdaten lesen; bevorzugen Sie daher ein
   Projekt, das nur Sie verwalten.

Das Vergessen des Schlüssels, das Abmelden oder das Ausschalten der Option
löscht das Secret. ChatGPT-Refresh-Tokens rotieren; verwenden Sie daher für eine
gemerkte ChatGPT-Sitzung einen einzigen Browser-Tab.

## In einer Konversation arbeiten

Konversationen, ihre Titel und ihr Text werden nur in diesem Browser
gespeichert; das Löschen von Website-Daten entfernt sie. Zugangsdaten werden
nie mit ihnen gespeichert.

- **Ein Repository verknüpfen.** Jede Konversation kann mit einem Git-Repository
  und Branch aus den in **Scripts** sichtbaren verknüpft werden. Projekt- und
  Git-Funktionen verwenden diese Verknüpfung und können andere Repositories nicht
  erreichen.
- **Agent- oder Plan-Modus.** Der Modus **Agent** kann jede aktivierte Funktion
  nutzen. Der Modus **Plan** stellt nur schreibgeschützte Funktionen bereit und
  bittet das Modell um einen konkreten Plan, ohne zu bearbeiten, auszuführen
  oder zu committen.
- **Verifikation.** Der Assistent ist angewiesen, geänderten Code auszuführen,
  die Console zu lesen und bei visuellen Ergebnissen die Karte zu erfassen,
  bevor er einen Erfolg meldet. Analytische Antworten stammen aus Code im
  sichtbaren Editor, nicht aus verborgenen Berechnungen.
- **Stoppen und bearbeiten.** **Stop response** bricht die aktive Antwort ab.
  Anschließend können Sie den letzten Prompt bearbeiten; das setzt den
  Konversationstext zurück, macht aber bereits eingetretene Datei-, Karten- oder
  Ausführungs-Nebenwirkungen nicht rückgängig.
- **Budgets.** Jede Anfrage hat ein Budget an Agent-Zügen (Standard 24; 8–48
  unter **Studio functions → Agent turns per request**) und eine Frist
  (Standard 500 Sekunden; 30–1.800). Wird eines davon erreicht, pausiert die
  Aufgabe mit einer **Continue**-Aktion, statt zu scheitern. Während Studio auf
  einen Lauf, die Console, eine Szene oder einen Screenshot wartet, können Sie
  mit **Skip … wait and assume success** weitergehen; dem Modell wird mitgeteilt,
  dass das Ergebnis nicht verifiziert wurde.
- **Behebbare Fehler.** Fehler bei Authentifizierung, Ratenbegrenzung,
  Abrechnung und Verbindung pausieren die Aufgabe mit **Retry task**, das vom
  aktuellen Studio-Zustand aus fortsetzt, ohne bereits erledigte Arbeit zu
  wiederholen.

Lange Konversationen werden automatisch verdichtet. Das sichtbare Transkript
bleibt vollständig.

## Steuern, was der Assistent darf

Öffnen Sie **Studio functions** unterhalb des Eingabefelds. Die Funktionen sind
nach Familien gruppiert (Editor, Run/Console/scene, Map, Assets, Git und so
weiter), jeweils mit Beschreibung und Richtlinie:

- **Allow** — das Modell darf sie ohne Rückfrage aufrufen.
- **Ask** — jeder Aufruf pausiert für **Deny**, **Allow once**, **Allow for this
  conversation** oder **Always allow**.
- **Off** — dem Modell wird die Funktion gar nicht angeboten.

Standards: Schreibgeschützte Funktionen sind **Allow**; Bearbeitungen,
Codeausführung, Zurücksetzen der Laufzeit, Branch-Änderungen und Screenshots
sind **Ask**. Destruktive, öffentliche oder berechtigungsändernde Funktionen
(Assets löschen, Asset-Zugriff ändern, Branches löschen) sind **Off** und unter
**Off by default** aufgeführt; ihr Genehmigungsdialog hat kein **Always allow**.
Nur Auswahlen, die vom Standard abweichen, werden gespeichert, und **Reset all to
defaults** löscht sie.

**Allow for this conversation** wird nur im Speicher gehalten. Es endet, wenn
Sie es unter **Studio functions → This conversation** widerrufen, die
Konversation löschen oder die Seite neu laden, und es aktiviert nie wieder eine
**Off**-Funktion.

Einige Funktionen haben ein Limit pro Konversation, weil sie Kontingent
verbrauchen oder lang laufende Arbeit starten. Studio zählt erfolgreiche
Aufrufe, lehnt weitere Aufrufe ab, sobald das Limit erreicht ist, und zeigt
`used/limit` mit einer **Reset count**-Aktion.

## Referenz der Studio-Funktionen

Diese Tabelle wird aus dem Quellcode der Anwendung generiert
({{ site.data.studio.synced_commit }}, {{ site.data.studio.synced_date }}).
Die Beschreibungen sind der exakte Text, den das Modell erhält. Berechtigung
ist, was die Funktion tun kann; Standard ist ihre anfängliche Richtlinie; Limit
ist die maximale Anzahl erfolgreicher Aufrufe pro Konversation.

{% for family in site.data.studio_functions.families %}
### {{ family.label }}

| Funktion | Berechtigung | Standard | Limit | Beschreibung |
| --- | --- | --- | --- | --- |
{% for fn in site.data.studio_functions.functions %}{% if fn.family == family.id %}| `{{ fn.name }}` | {{ fn.permission }} | {{ fn.default_policy | capitalize }} | {% if fn.conversation_limit %}{{ fn.conversation_limit }}{% else %}–{% endif %} | {{ fn.description | replace: "|", "\|" }} |
{% endif %}{% endfor %}
{% endfor %}

### Grenzen

- Exporte werden nie im Browser berechnet. Das Modell schreibt den
  `Export.*`-Aufruf in das sichtbare Skript, führt es aus und startet den
  entstandenen Task.
- Uploads, Exporte von Kartenkacheln, BigQuery und FeatureViews sowie Downloads
  mit Ordnerausgabe bleiben manuell in den Bereichen Tasks und Assets.
- Git-Funktionen wirken nur auf das verknüpfte Repository und den verknüpften
  Branch. Commits werden direkt in den entfernten Branch geschrieben; es gibt
  weder Push noch Force-Push.
- `studio.open_app_publish_dialog` öffnet nur den Veröffentlichungsdialog.
  Prüfung, Google-Einwilligung, Servicekonten und Bestätigung bleiben bei Ihnen.
  Siehe [Öffentliche Apps]({{ '/de/public-apps/' | relative_url }}).
- Fehler, die an das Modell zurückgegeben werden, sind begrenzt, und
  Zugangsdaten werden geschwärzt.

## Fehlerbehebung

- **Companion nicht erkannt:** Prüfen Sie, ob die Erweiterung in diesem
  Chrome-Profil installiert ist, genehmigen Sie den exakten Studio-Origin in
  ihren Optionen und wählen Sie dann **Check Loom.js Companion again**.
- **ChatGPT auf der gehosteten Website bleibt in der Einrichtung:** Der Helfer
  benötigt einen Companion-Build, der ihn enthält; aktivieren Sie **Website
  ChatGPT sign-in helper** in den Optionen der Erweiterung und genehmigen Sie die
  Website.
- **Claude-Schlüssel abgelehnt:** Erstellen Sie einen neuen Schlüssel in der
  Claude Console; Studio entfernt einen gemerkten Schlüssel, der `401`
  zurückgibt.
- **Eine Funktion läuft nie:** Prüfen Sie ihre Richtlinie unter **Studio
  functions** und ob ihr Limit pro Konversation erreicht ist.
- Für browserseitige Diagnosen durchsuchen Sie die Chrome-DevTools-Console nach
  `[Earth Engine Studio][Codex]`. Einträge enthalten nie Prompts, Dateien oder
  Zugangsdaten.

Siehe auch [Fehlerbehebung]({{ '/de/troubleshooting/' | relative_url }}).
