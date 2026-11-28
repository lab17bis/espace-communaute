# Journal des modifications

Les fichiers de l'espace évoluent sans casser ce qui existe : un document déjà importé garde son fonctionnement.


## 2026-11-28 (document public)
- Sécurité : les ressources non publiées (colonne `publie` décochée) ne sont plus lisibles sans compte quand le document est rendu public pour la page publique du catalogue. Règle d'accès ajoutée aux deux fichiers `.grist`.
## 2026-11-28 (noms des éditeurs)
- Les pages de réglage s'appellent désormais « Éditeur des indicateurs », « Éditeur des ressources », « Éditeur de l'offre de service », « Éditeur du questionnaire » (au lieu de « Régler … » et « Concevoir le questionnaire »), et chaque vue de configuration a pour titre « Éditeur du widget ». Fichiers .grist (vide et exemple) et README mis à jour ; aucune table ni aucun réglage ne change.

## 2026-11-26 (correctifs des widgets)

### Corrigé
- Correctifs des widgets utilisés par cet espace, pris en compte sans rien réinstaller (rechargez la page) :
  - style commun de configuration (grist-annuaire, grist-carte, grist-graphe, grist-reunion) : il ne masque plus que le badge « Enregistré » sur l'onglet de l'outil ;
  - grist-catalogue : « Vérifier l'accès public » explique précisément pourquoi un document n'est pas lisible (partage, règle d'accès, table introuvable, copie non enregistrée).

### Ajouté
- Brancher un outil sur un document qui a déjà ses propres tables (grist-reunion, grist-carte, grist-graphe, grist-annuaire) : si une table du même nom existe sans toutes les colonnes attendues, l'outil le signale et propose de les ajouter, avec le conseil de renommer d'abord une colonne qui porte la même information sous un autre nom. Rien à refaire dans cet espace : ses tables sont complètes.

## 2026-11-26 (questionnaire enrichi)

### Modifié
- Documentation : le widget grist-questionnaire sait maintenant classer par ordre (glisser-déposer), proposer un tableau de choix, un choix « Autre », des bornes de choix, une réponse par défaut, un ordre aléatoire, des types lien, heure et date et heure, et intégrer image, son, vidéo et PDF. Ces options sont facultatives et déjà disponibles dans cet espace (le widget est lu à l'adresse stable `/v1/`). Aucun changement dans les fichiers `.grist`.

## 2026-11-25 (annuaire)

### Ajouté
- Page **Annuaire** ([grist-annuaire](https://github.com/lab17bis/grist-annuaire)) : recherche des personnes et des structures, fiches, doublons et fusion, import CSV, archivage et délai de conservation.
- Colonnes ajoutées aux tables existantes, sans rien renommer ni supprimer : `Personnes` (archivage, fusion, rôle gestionnaire de l'annuaire, réglages) et `Structures` (courriel, site, adresse si absente).
- Table `Comptes`, qui sert à reconnaître la personne connectée (« Ma fiche »).
- Règles d'accès de l'annuaire : rôle « gestionnaire de l'annuaire », et aucune personne visible d'un visiteur anonyme.
