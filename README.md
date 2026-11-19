# espace-reseau

> **Espace Grist clé en main.** Un document Grist prêt à l'emploi pour **animer un réseau ou une communauté de pratique** : ses membres et leurs groupes, les rencontres et la présence, les ressources que les membres partagent et leurs retours, au Système de design de l'État (DSFR).

Un **espace** est un document Grist complet — tables, formules, pages, widgets et réglages — à importer en une fois. Il assemble des widgets de la famille `grist-…` autour d'une manière de travailler. Chaque widget reste utilisable seul.

## À quoi ça sert

- **Tenir la liste des membres** avec leur structure, leur fonction, leur rôle dans le réseau et les groupes auxquels ils appartiennent.
- **Organiser des groupes** (groupes de travail, groupes de codéveloppement, communautés thématiques, rencontres plénières) avec leur animation, leurs membres et leur rythme.
- **Préparer et tenir les rencontres** : ordre du jour, notes, décisions, actions et compte rendu. Chaque groupe est une instance de réunion.
- **Noter la présence** à chaque rencontre et repérer les membres à recontacter, sans présence depuis trois mois.
- **Partager des ressources** proposées par les membres (fiches pratiques, outils, retours d'expérience, lectures) dans un catalogue filtrable.
- **Recueillir un retour** après chaque rencontre avec un questionnaire anonyme au DSFR.
- **Suivre la vie du réseau** dans un tableau de bord : membres actifs, rencontres tenues, présence et satisfaction, par groupe et par période.

## Ce que contient l'espace

| Page | Outil | Contenu |
| --- | --- | --- |
| **Rencontres** | [grist-reunion](https://github.com/lab17bis/grist-reunion) | Rencontres de tous les groupes : ordre du jour, séance, compte rendu, suivi des actions. Page *Feuilles de présence* pour noter qui était là. Tables `Reunions`, `Points`, `Decisions`, `Actions_reunion`, `Presences`. |
| **Membres** | tables Grist | Liste des membres, fiche du membre et ses présences. Pages *Groupes* et *Structures*. Tables `Personnes`, `Groupes`, `Structures`. |
| **Ressources** | [grist-catalogue](https://github.com/lab17bis/grist-catalogue) | Catalogue des ressources partagées. Page *Fiches* pour en ajouter, page *Régler les ressources* pour la présentation. Table `Ressources`. |
| **Retours** | [grist-questionnaire](https://github.com/lab17bis/grist-questionnaire) | Retours reçus et page *Questionnaire de retour* pour concevoir et publier le questionnaire. Table `Retours`. |
| **Indicateurs** | [grist-graphique](https://github.com/lab17bis/grist-graphique) | Tableau de bord de la vie du réseau. Page *Régler les indicateurs* pour le modifier. |

## L'installer en 2 minutes

1. **Télécharger** le fichier de l'espace :
   - [`espace-reseau.grist`](https://github.com/lab17bis/espace-reseau/raw/main/espace-reseau.grist) : l'espace vide, prêt à l'usage ;
   - [`espace-reseau-exemple.grist`](https://github.com/lab17bis/espace-reseau/raw/main/espace-reseau-exemple.grist) : le même, rempli de données fictives, pour essayer.
2. **L'importer dans Grist** : depuis l'accueil de votre espace Grist, *Ajouter › Importer un document*, puis choisissez le fichier.
3. **L'ouvrir** : les pages et les widgets sont déjà en place. Si Grist le demande, confirmez l'accès complet des widgets au document.
4. **Inviter l'équipe** (*Partager*), en éditeur pour celles et ceux qui saisissent.

Vous êtes propriétaire du document importé. Rien n'est installé ailleurs : les widgets sont des pages web publiques, qui lisent et écrivent dans votre document avec les droits de la personne connectée.

Les widgets sont chargés depuis leur **adresse stable** (`…/v1/`) : une évolution d'un widget ne modifie pas votre espace sans que vous l'ayez décidé.

## Le régler

- **Groupes** : ajoutez vos groupes dans la page *Groupes*, puis reportez leur nom dans les réglages des rencontres (lien *Réglages* en bas du widget, liste des instances) et dans la question « À quelle rencontre avez-vous participé ? » du questionnaire.
- **Présence** : après chaque rencontre, ajoutez une ligne par membre attendu dans *Feuilles de présence* (Présent, Excusé ou Absent). Le widget de réunion propose les noms de la table `Personnes` pour remplir les participants.
- **Ressources** : remplacez les fiches d'exemple dans la page *Fiches* ; page *Régler les ressources* pour les sections, filtres et étiquettes.
- **Questionnaire** : page *Questionnaire de retour*, puis onglet *Publication* pour obtenir le lien à envoyer après chaque rencontre.
- **Indicateurs** : page *Régler les indicateurs*.

Les réglages sont enregistrés dans le document. Ils partagent les mêmes réglages d'en-tête et de pied de page.

## Données et droits d'accès

L'espace n'installe **aucune règle d'accès** : toute personne invitée dans le document voit la liste des membres, leurs coordonnées et les présences. N'invitez que les personnes qui animent ou coordonnent le réseau, et adaptez au besoin les *Permissions avancées*. Le questionnaire de retour ne demande ni nom ni adresse : les retours sont anonymes.

Les tables `Personnes` et `Structures`, quand l'espace en contient, suivent la règle commune des widgets : un widget de la famille ajouté plus tard les reprend et les complète, au lieu d'en créer d'autres.

Les fichiers de ce dépôt ne contiennent aucune donnée réelle. L'exemple est entièrement fictif.

## Widgets utilisés

- [grist-questionnaire](https://github.com/lab17bis/grist-questionnaire) : questionnaires au DSFR avec logique conditionnelle et notes sur une échelle.
- [grist-catalogue](https://github.com/lab17bis/grist-catalogue) : catalogue de fiches au DSFR, avec recherche et filtres.
- [grist-graphique](https://github.com/lab17bis/grist-graphique) : tableaux de bord et indicateurs à seuils au DSFR.
- [grist-reunion](https://github.com/lab17bis/grist-reunion) : ordres du jour, notes, décisions, actions et comptes rendus.

## Autres espaces

- [espace-pilotage](https://github.com/lab17bis/espace-pilotage) : regarder et décider : un écran d'équipe qui rassemble indicateurs, réunions, projets et management visuel.
- [espace-collaboratif](https://github.com/lab17bis/espace-collaboratif) : faire ensemble : réunions, projets partagés et ressources communes d'une équipe.
- [espace-accompagnement](https://github.com/lab17bis/espace-accompagnement) : suivre les personnes qui sollicitent un service : offre de service, sollicitations, fiches contact et satisfaction.
- [espace-sondage](https://github.com/lab17bis/espace-sondage) : concevoir un questionnaire, savoir qui a répondu et lire les résultats en indicateurs.

## Écosystème

- **[Grist](https://grist.numerique.gouv.fr)** : tableur-base de données libre ([gristlabs/grist-core](https://github.com/gristlabs/grist-core)), proposé aux agents publics par la [DINUM](https://www.numerique.gouv.fr/) dans [La Suite numérique](https://lasuite.numerique.gouv.fr/). L'espace s'importe dans toute instance de Grist.
- **[Système de design de l'État (DSFR)](https://www.systeme-de-design.gouv.fr/)** ([GouvernementFR/dsfr](https://github.com/GouvernementFR/dsfr)). Son usage est réservé aux sites des services de l'État.

## Mots-clés

Grist, espace Grist, modèle Grist, document clé en main, réseau, communauté de pratique, animation de réseau, groupe de travail, codéveloppement, rencontres, feuille de présence, ressources partagées, questionnaire de retour, tableau de bord, DSFR, Système de design de l'État, La Suite numérique, service public, logiciel libre.

## Licence

Fichiers de l'espace et documentation sous licence Creative Commons [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/deed.fr) : réutilisation et adaptation autorisées, en citant la source et en partageant sous la même licence. Le code des widgets est sous licence MIT, dans leurs dépôts.

Conçu par le Lab 17 bis, laboratoire d'innovation publique de l'académie de Reims. Contact : <lab17bis@ac-reims.fr>
