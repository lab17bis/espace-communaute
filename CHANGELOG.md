# Journal des modifications

Les fichiers de l'espace évoluent sans casser ce qui existe : un document déjà importé garde son fonctionnement.

## 2026-11-25 (annuaire)

### Ajouté
- Page **Annuaire** ([grist-annuaire](https://github.com/lab17bis/grist-annuaire)) : recherche des personnes et des structures, fiches, doublons et fusion, import CSV, archivage et délai de conservation.
- Colonnes ajoutées aux tables existantes, sans rien renommer ni supprimer : `Personnes` (archivage, fusion, rôle gestionnaire de l'annuaire, réglages) et `Structures` (courriel, site, adresse si absente).
- Table `Comptes`, qui sert à reconnaître la personne connectée (« Ma fiche »).
- Règles d'accès de l'annuaire : rôle « gestionnaire de l'annuaire », et aucune personne visible d'un visiteur anonyme.
