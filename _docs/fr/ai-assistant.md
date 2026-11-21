---
title: Assistant IA
description: Connectez un modèle à l’onglet IA expérimental, contrôlez ses actions avec les politiques Allow, Ask et Off, et consultez toutes les fonctions Studio.
permalink: /fr/ai-assistant/
order: 4
lang: fr
translation_key: ai-assistant
keywords: [IA, assistant, agent, ChatGPT, Claude, Codex, Loom, Companion, politique, approbation, fonctions Studio, mode Plan, Secret Manager]
translated_from: 90d339c07156
---

L’onglet **AI** est un panneau de conversation expérimental, ancrable. Un modèle que vous
connectez peut lire et modifier l’espace de travail grâce à des **Studio functions** (fonctions Studio) typées :
il modifie le script actif, l’exécute avec l’action **Run** habituelle, lit la
Console, inspecte la carte et, si vous l’autorisez, travaille avec les éléments, les tâches,
Git et la publication d’Apps. Chaque fonction a une politique **Allow**, **Ask** ou **Off**
que vous contrôlez.

Pour une disposition construite autour de l’assistant, choisissez la disposition d’espace de travail
**AI first** dans **Settings** : un large volet latéral où la conversation avec l’IA est sélectionnée,
à côté de l’éditeur, de la sortie et de la carte. Vous pouvez aussi faire glisser l’onglet IA où vous voulez. Voir
[Espace de travail]({{ '/fr/workspace/' | relative_url }}).

<div class="notice" markdown="1">
**Ce que l’assistant peut atteindre**

L’assistant agit avec votre session Google connectée, votre projet Cloud sélectionné
et le dépôt lié à la conversation. Les fonctions en lecture seule
s’exécutent sans demander. Les fonctions qui modifient des fichiers, exécutent du code ou consomment du quota demandent
d’abord. Les fonctions destructrices, publiques ou qui modifient des autorisations sont **Off** tant
que vous ne les activez pas.
</div>

## Choisir un fournisseur et un modèle

Choisissez la connexion dans la ligne **AI provider** en haut de l’onglet, puis un
modèle dans la liste propre au fournisseur. Studio mémorise dans ce navigateur votre dernier fournisseur et
le dernier modèle de chaque fournisseur. Changer de fournisseur ou de modèle conserve la conversation
visible.

| Fournisseur | Facturation | Où ça fonctionne | Identifiants |
| --- | --- | --- | --- |
| **ChatGPT** (Sign in with ChatGPT) | L’utilisation de votre forfait ChatGPT ; pas de clé d’API | Directement sur un Studio servi à `http://127.0.0.1:<port>` ; sur le site hébergé, via l’assistant de connexion ChatGPT de Loom.js Companion | Jetons dans la mémoire de l’onglet ; éventuellement mémorisés dans votre propre Secret Manager |
| **Claude API** | Paiement à l’usage sur le compte Claude Console propriétaire de la clé ; un abonnement Claude.ai ne peut pas être utilisé | Studio local et hébergé | Clé d’API dans la mémoire de l’onglet ; éventuellement mémorisée dans votre propre Secret Manager |
| **Loom.js Companion** | Votre abonnement Codex/ChatGPT, via l’extension | Chrome avec l’[extension Loom.js Companion](https://chrome.google.com/webstore/detail/gdcebopdllcifgleoefgbobdopiaholg) | Conservés par l’extension |

### Loom.js Companion

1. Installez l’extension Chrome Loom.js Companion et connectez-vous-y.
2. Ouvrez l’onglet IA. Studio demande à l’extension d’approuver l’origine exacte de Studio ;
   acceptez. Une action **Retry** apparaît si vous fermez la demande.
3. Une fois connecté, l’avis de configuration se réduit à un symbole d’état dans l’en-tête
   de l’onglet.

Les origines de production doivent utiliser HTTPS. `localhost` et `127.0.0.1` fonctionnent pour le développement
local.

### ChatGPT

Choisissez **Continue with ChatGPT**, terminez la fenêtre de connexion et autorisez l’utilisation
du forfait. OpenAI n’accepte la redirection de connexion que vers
`http://127.0.0.1:<port>/auth/callback`. Sur le site hébergé, Studio utilise donc
l’option **Website ChatGPT sign-in helper** de Companion, à activer explicitement : Studio effectue toujours la
connexion et conserve les jetons dans la page ; l’extension se contente
d’ouvrir la fenêtre ChatGPT et de relayer les requêtes qu’une page ne peut pas lire.

Lorsqu’une étape de configuration manque, la zone ChatGPT la nomme : extension non
installée ou injoignable, site non approuvé, assistant désactivé ou extension
trop ancienne. La liste des fournisseurs affiche **ChatGPT (via Companion)** lorsque l’assistant est
prêt et **ChatGPT (set up Companion)** tant qu’une étape manque. Déconnectez-vous depuis l’en-tête
de l’onglet.

### Claude API

Collez une clé issue de la Claude Console. Studio la vérifie en listant les modèles et
ne la conserve que dans la mémoire de l’onglet : jamais dans le stockage du navigateur, les journaux,
les diagnostics ni les conversations enregistrées. **Forget Claude API key** la supprime
immédiatement ; un rechargement l’oublie aussi. Les organisations avec rétention des données nulle
ne peuvent pas appeler la Claude API depuis un navigateur, et Studio l’indique.

### Mémoriser un identifiant dans Secret Manager

Par défaut, un rechargement déconnecte ChatGPT et oublie la clé Claude. Sous chaque
fournisseur, **Remember in my Google Cloud Secret Manager** (désactivé par défaut)
stocke l’identifiant sous forme de secret dans **votre propre** projet Cloud, écrit et
lu par la page avec votre propre session Google. Aucun secret ne va dans le stockage
du navigateur ni vers le backend de Studio.

Prérequis, une fois par projet :

1. Utilisez le mode **Online** et connectez-vous avec Google. La connexion avec dossier local
   est en lecture seule et ne peut pas utiliser Secret Manager.
2. Activez l’API Secret Manager dans le projet sélectionné, depuis la vérification des services de projet
   de Studio ou avec
   `gcloud services enable secretmanager.googleapis.com --project=PROJECT_ID`.
3. Votre compte doit pouvoir créer, lire, versionner et supprimer des secrets dans ce
   projet (`roles/secretmanager.admin` ou Propriétaire). Toute personne qui peut lire les secrets
   du projet peut lire l’identifiant ; préférez donc un projet que vous seul administrez.

Oublier la clé, vous déconnecter ou désactiver l’option supprime le
secret. Les jetons d’actualisation ChatGPT sont renouvelés ; utilisez donc un seul onglet de navigateur pour une session
ChatGPT mémorisée.

## Travailler dans une conversation

Les conversations, leurs titres et leur texte ne sont stockés que dans ce navigateur ;
effacer les données du site les supprime. Les identifiants ne sont jamais stockés avec elles.

- **Lier un dépôt.** Chaque conversation peut être liée à un dépôt Git et à une branche
  parmi ceux visibles dans **Scripts**. Les fonctions de projet et de Git utilisent
  ce lien et ne peuvent pas atteindre d’autres dépôts.
- **Mode Agent ou Plan.** Le mode **Agent** peut utiliser toutes les fonctions activées.
  Le mode **Plan** n’expose que les fonctions en lecture seule et demande au modèle un plan
  concret, sans modifier, exécuter ni valider.
- **Vérification.** L’assistant a pour instruction d’exécuter le code modifié, de lire la
  Console et de capturer la carte lorsque le résultat est visuel avant d’annoncer
  un succès. Les réponses analytiques proviennent du code de l’éditeur visible, pas de
  calculs cachés.
- **Arrêter et modifier.** **Stop response** annule la réponse en cours. Vous pouvez ensuite
  modifier la dernière invite ; cela remonte le texte de la conversation mais n’annule pas les effets de bord
  déjà produits sur les fichiers, la carte ou les exécutions.
- **Budgets.** Chaque requête a un budget de tours d’agent (24 par défaut ; de 8 à 48 sous
  **Studio functions → Agent turns per request**) et une échéance (500
  secondes par défaut ; de 30 à 1 800). Atteindre l’un ou l’autre met la tâche en pause avec une action **Continue**
  au lieu d’échouer. Pendant que Studio attend une exécution, la Console, une
  scène ou une capture d’écran, **Skip … wait and assume success** vous permet de continuer ;
  le modèle est informé que le résultat n’a pas été vérifié.
- **Erreurs récupérables.** Les échecs d’authentification, de limite de débit, de facturation et de connexion
  mettent la tâche en pause avec **Retry task**, qui reprend depuis l’état actuel de
  Studio sans répéter le travail terminé.

Les longues conversations sont compactées automatiquement. La transcription visible reste
complète.

## Contrôler ce que l’assistant peut faire

Ouvrez **Studio functions** sous la zone de saisie. Les fonctions sont regroupées par famille
(Editor, Run/Console/scene, Map, Assets, Git, etc.), chacune avec sa
description et une politique :

- **Allow** — le modèle peut l’appeler sans demander.
- **Ask** — chaque appel se met en pause pour **Deny**, **Allow once**, **Allow for this
  conversation** ou **Always allow**.
- **Off** — la fonction n’est pas du tout proposée au modèle.

Valeurs par défaut : les fonctions en lecture seule sont **Allow** ; les modifications, l’exécution de code, la
réinitialisation de l’environnement d’exécution, les changements de branche et les captures d’écran sont **Ask**. Les fonctions destructrices, publiques ou
qui modifient des autorisations (suppression d’éléments, modification de l’accès aux éléments,
suppression de branches) sont **Off** et listées sous **Off by default** ; leur
boîte de dialogue d’approbation n’a pas de **Always allow**. Seuls les choix qui diffèrent de la
valeur par défaut sont stockés, et **Reset all to defaults** les efface.

**Allow for this conversation** n’est conservé qu’en mémoire. Il prend fin lorsque vous
le révoquez sous **Studio functions → This conversation**, supprimez la
conversation ou rechargez la page, et il ne réactive jamais une fonction **Off**.

Certaines fonctions ont une limite par conversation, car elles consomment du quota ou lancent
un travail de longue durée. Studio compte les appels réussis, refuse les appels suivants une fois
la limite atteinte et affiche `used/limit` avec une action **Reset count**.

## Référence des fonctions Studio

Ce tableau est généré à partir du code source de l’application
({{ site.data.studio.synced_commit }}, {{ site.data.studio.synced_date }}).
Les descriptions sont le texte exact que reçoit le modèle. La colonne Permission indique ce que la
fonction peut faire ; Par défaut est sa politique initiale ; Limite est le nombre maximal d’appels
réussis par conversation.

{% for family in site.data.studio_functions.families %}
### {{ family.label }}

| Fonction | Permission | Par défaut | Limite | Description |
| --- | --- | --- | --- | --- |
{% for fn in site.data.studio_functions.functions %}{% if fn.family == family.id %}| `{{ fn.name }}` | {{ fn.permission }} | {{ fn.default_policy | capitalize }} | {% if fn.conversation_limit %}{{ fn.conversation_limit }}{% else %}–{% endif %} | {{ fn.description | replace: "|", "\|" }} |
{% endif %}{% endfor %}
{% endfor %}

### Limites

- Les exportations ne sont jamais calculées dans le navigateur. Le modèle écrit l’appel `Export.*`
  dans le script visible, l’exécute et démarre la tâche obtenue.
- Les téléversements, les exportations de tuiles de carte, BigQuery et FeatureView, ainsi que les téléchargements
  vers un dossier restent manuels dans les panneaux Tasks et Assets.
- Les fonctions Git n’agissent que sur le dépôt et la branche liés. Les commits sont
  écrits directement sur la branche distante ; il n’y a ni push ni force-push.
- `studio.open_app_publish_dialog` ne fait qu’ouvrir la boîte de dialogue de publication. La vérification,
  le consentement Google, les comptes de service et la confirmation restent de votre ressort. Voir
  [Apps publiques]({{ '/fr/public-apps/' | relative_url }}).
- Les erreurs renvoyées au modèle sont bornées et les identifiants sont masqués.

## Dépannage

- **Companion non détecté :** vérifiez que l’extension est installée dans ce
  profil Chrome, approuvez l’origine exacte de Studio dans ses options, puis choisissez
  **Check Loom.js Companion again**.
- **ChatGPT sur le site hébergé reste en configuration :** l’assistant nécessite une version de Companion
  qui l’inclut ; cochez **Website ChatGPT sign-in helper** dans les
  options de l’extension et approuvez le site.
- **Clé Claude rejetée :** créez une nouvelle clé dans la Claude Console ; Studio
  supprime une clé mémorisée qui renvoie `401`.
- **Une fonction ne s’exécute jamais :** vérifiez sa politique sous **Studio functions** et
  si sa limite par conversation a été atteinte.
- Pour les diagnostics côté navigateur, recherchez
  `[Earth Engine Studio][Codex]` dans la Console de Chrome DevTools. Les entrées n’incluent jamais d’invites, de fichiers ni
  d’identifiants.

Voir aussi [Dépannage]({{ '/fr/troubleshooting/' | relative_url }}).
