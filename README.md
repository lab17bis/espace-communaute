# espace-communaute

> **Espace Grist clé en main.** Un document Grist prêt à l'emploi pour **animer une communauté de pratique ou un réseau** : ses membres et leurs groupes, les rencontres et la présence, les ressources que les membres partagent et leurs retours, au Système de design de l'État (DSFR).

Un **espace** est un document Grist complet — tables, formules, pages, widgets et réglages — à importer en une fois. Il assemble des widgets de la famille `grist-…` autour d'une manière de travailler. Chaque widget reste utilisable seul.

## À quoi ça sert

- **Tenir la liste des membres** avec leur structure, leur fonction, leur rôle dans la communauté et les groupes auxquels ils appartiennent.
- **Organiser des groupes** (groupes de travail, groupes de codéveloppement, communautés thématiques, rencontres plénières) avec leur animation, leurs membres et leur rythme.
- **Préparer et tenir les rencontres** : ordre du jour, notes, décisions, actions et compte rendu. Chaque groupe est une instance de réunion.
- **Noter la présence** à chaque rencontre et repérer les membres à recontacter, sans présence depuis trois mois.
- **Partager des ressources** (fiches pratiques, outils, retours d'expérience, lectures) dans un catalogue filtrable. Les membres en proposent depuis le document ou, sans y avoir accès, par un formulaire public ; la coordination relit chaque proposition avant de la publier.
- **Recueillir un retour** après chaque rencontre avec un questionnaire anonyme au DSFR.
- **Situer les structures** de la communauté sur une carte au fond de l'IGN, avec une puce par type de structure et une fiche par lieu.
- **Cartographier les liens entre acteurs** : coopérations, financements, conseils saisis à la main, rattachements des membres à leur structure et appartenance aux mêmes groupes. Trouver par qui passer pour atteindre une structure, repérer les acteurs isolés, positionner les structures selon leur influence et leur intérêt.
- **Suivre la vie de la communauté** dans un tableau de bord : membres actifs, rencontres tenues, présence et satisfaction, par groupe et par période.

## Ce que contient l'espace

| Page | Outil | Contenu |
| --- | --- | --- |
| **Rencontres** | [grist-reunion](https://github.com/lab17bis/grist-reunion) | Rencontres de tous les groupes : ordre du jour, séance, compte rendu, suivi des actions. Page *Feuilles de présence* pour noter qui était là. Tables `Reunions`, `Points`, `Decisions`, `Actions_reunion`, `Presences`. |
| **Membres** | tables Grist | Liste des membres, fiche du membre et ses présences. Pages *Groupes* et *Structures*. Tables `Personnes`, `Groupes`, `Structures`. |
| **Annuaire** | [grist-annuaire](https://github.com/lab17bis/grist-annuaire) | Personnes et structures du document : recherche, fiches, structures en arborescence, doublons et fusion, import CSV, archivage. Tables `Personnes`, `Structures` et `Comptes`, partagées avec les autres outils de l'espace. |
| **Carte des structures** | [grist-carte](https://github.com/lab17bis/grist-carte) | Les structures de la communauté sur une carte, avec leurs liens. Les adresses sans coordonnées se placent depuis la carte. Table `Structures` (colonnes `Adresse`, `Latitude`, `Longitude`). |
| **Liens entre acteurs** | [grist-graphe](https://github.com/lab17bis/grist-graphe) | Graphe des structures et des membres, fiche de chaque acteur, chemin entre deux acteurs, positions influence / intérêt, liste accessible. Page *Liens* pour la table. Table `Liens`. |
| **Ressources** | [grist-catalogue](https://github.com/lab17bis/grist-catalogue) | Catalogue des ressources partagées. Page *Fiches* pour en ajouter, page *Régler les ressources* pour la présentation. Table `Ressources`. |
| **Proposer une ressource** | [grist-questionnaire](https://github.com/lab17bis/grist-questionnaire) | Formulaire public pour proposer une ressource sans accès au document. La proposition arrive dans `Ressources`, non publiée, en attente de relecture. |
| **Retours** | [grist-questionnaire](https://github.com/lab17bis/grist-questionnaire) | Retours reçus et page *Questionnaire de retour* pour concevoir et publier le questionnaire. Table `Retours`. |
| **Indicateurs** | [grist-graphique](https://github.com/lab17bis/grist-graphique) | Tableau de bord de la vie de la communauté. Page *Régler les indicateurs* pour le modifier. |

## L'installer en 2 minutes

1. **Télécharger** le fichier de l'espace :
   - [`espace-communaute.grist`](https://github.com/lab17bis/espace-communaute/raw/main/espace-communaute.grist) : l'espace vide, prêt à l'usage ;
   - [`espace-communaute-exemple.grist`](https://github.com/lab17bis/espace-communaute/raw/main/espace-communaute-exemple.grist) : le même, rempli de données fictives, pour essayer.
2. **L'importer dans Grist** : depuis l'accueil de votre espace Grist, *Ajouter › Importer un document*, puis choisissez le fichier.
3. **L'ouvrir** : les pages et les widgets sont déjà en place. Si Grist le demande, confirmez l'accès complet des widgets au document.
4. **Inviter l'équipe** (*Partager*), en éditeur pour celles et ceux qui saisissent.

Vous êtes propriétaire du document importé. Rien n'est installé ailleurs : les widgets sont des pages web publiques, qui lisent et écrivent dans votre document avec les droits de la personne connectée.

Les widgets sont chargés depuis leur **adresse stable** (`…/v1/`) : une évolution d'un widget ne modifie pas votre espace sans que vous l'ayez décidé.

## Le régler

- **Annuaire** : onglet *Réglages* du widget (champs prévus et personnalisés, types de structures, délai de conservation, mention d'information, règles d'accès). Cochez *Gestionnaire de l'annuaire* sur la fiche des personnes qui tiennent l'annuaire.
- **Groupes** : ajoutez vos groupes dans la page *Groupes*, puis reportez leur nom dans les réglages des rencontres (lien *Réglages* en bas du widget, liste des instances) et dans la question « À quelle rencontre avez-vous participé ? » du questionnaire.
- **Présence** : après chaque rencontre, ajoutez une ligne par membre attendu dans *Feuilles de présence* (Présent, Excusé ou Absent). Le widget de réunion propose les noms de la table `Personnes` pour remplir les participants.
- **Carte** : bouton *Réglages* en bas du panneau de la carte (couleur et icône de chaque type de structure, logo comme puce, regroupement). Renseignez l'adresse d'une structure puis *Placer ces adresses*.
- **Liens entre acteurs** : ajoutez des liens depuis la fiche d'un acteur ; bouton *Réglages* pour choisir les tables d'acteurs et les sources de liens (par exemple la présence aux mêmes rencontres).
- **Ressources** : remplacez les fiches d'exemple dans la page *Fiches* ; page *Régler les ressources* pour les sections, filtres et étiquettes.
- **Proposer une ressource** : page *Proposer une ressource*, puis onglet *Publication* pour obtenir le lien du formulaire. Une proposition arrive avec la case *Publiée* décochée : cochez-la après relecture.
- **Questionnaire** : page *Questionnaire de retour*, puis onglet *Publication* pour obtenir le lien à envoyer après chaque rencontre.
- **Indicateurs** : page *Régler les indicateurs*.

Les réglages sont enregistrés dans le document. Ils partagent les mêmes réglages d'en-tête et de pied de page.

## Données et droits d'accès

L'espace contient les **règles d'accès de l'annuaire** sur `Personnes`, `Structures` et `Comptes` : propriétaires et gestionnaires de l'annuaire gèrent les fiches, les éditeurs modifient la leur et celles qu'ils ont créées, les lecteurs consultent, un visiteur anonyme ne voit aucune personne. Les autres tables (présences, liens entre acteurs, groupes) restent accessibles à toute personne invitée : n'invitez que les personnes qui animent ou coordonnent la communauté, et adaptez au besoin les *Permissions avancées*. Le questionnaire de retour ne demande ni nom ni adresse : les retours sont anonymes. Le formulaire de proposition permet seulement **d'ajouter** une ressource, non publiée. Les colonnes `Influence` et `Interet` ne sont proposées que pour les structures : qualifier des personnes nommées est un traitement de données personnelles, à éviter ou à encadrer.

Les tables `Personnes` et `Structures`, quand l'espace en contient, suivent la règle commune des widgets : un widget de la famille ajouté plus tard les reprend et les complète, au lieu d'en créer d'autres.

Les fichiers de ce dépôt ne contiennent aucune donnée réelle. L'exemple est entièrement fictif.

## Widgets utilisés

- [grist-questionnaire](https://github.com/lab17bis/grist-questionnaire) : questionnaires au DSFR avec logique conditionnelle, notes sur une échelle, classement, tableau de choix, médias et options de réponse.
- [grist-catalogue](https://github.com/lab17bis/grist-catalogue) : catalogue de fiches au DSFR, avec recherche et filtres.
- [grist-graphique](https://github.com/lab17bis/grist-graphique) : tableaux de bord et indicateurs à seuils au DSFR.
- [grist-annuaire](https://github.com/lab17bis/grist-annuaire) : annuaire des personnes et des structures d'un document : recherche, fiches, doublons, import, protection des données.
- [grist-reunion](https://github.com/lab17bis/grist-reunion) : ordres du jour, notes, décisions, actions et comptes rendus.
- [grist-carte](https://github.com/lab17bis/grist-carte) : carte interactive au fond IGN, puces personnalisées et fiches.
- [grist-graphe](https://github.com/lab17bis/grist-graphe) : cartographie des acteurs et de leurs liens, matrice influence / intérêt.

## Autres espaces

- [espace-pilotage](https://github.com/lab17bis/espace-pilotage) : regarder et décider : un écran d'équipe qui rassemble indicateurs, réunions, projets, priorités et parties prenantes.
- [espace-collaboratif](https://github.com/lab17bis/espace-collaboratif) : faire ensemble : réunions, projets partagés, décisions collectives et ressources communes d'une équipe.
- [espace-accompagnement](https://github.com/lab17bis/espace-accompagnement) : suivre les personnes qui sollicitent un service : offre de service, sollicitations, fiches contact et satisfaction.
- [espace-sondage](https://github.com/lab17bis/espace-sondage) : concevoir un questionnaire, savoir qui a répondu et lire les résultats en indicateurs.
- [espace-contributions](https://github.com/lab17bis/espace-contributions) : faire participer : boîte à idées, valorisation des réalisations des équipes, votes et suites données.

## Écosystème

- **[Grist](https://grist.numerique.gouv.fr)** : tableur-base de données libre ([gristlabs/grist-core](https://github.com/gristlabs/grist-core)), proposé aux agents publics par la [DINUM](https://www.numerique.gouv.fr/) dans [La Suite numérique](https://lasuite.numerique.gouv.fr/). L'espace s'importe dans toute instance de Grist.
- **[Système de design de l'État (DSFR)](https://www.systeme-de-design.gouv.fr/)** ([GouvernementFR/dsfr](https://github.com/GouvernementFR/dsfr)). Son usage est réservé aux sites des services de l'État.

## Mots-clés

Grist, espace Grist, modèle Grist, document clé en main, communauté de pratique, réseau, animation de communauté, animation de réseau, groupe de travail, codéveloppement, rencontres, feuille de présence, ressources partagées, questionnaire de retour, tableau de bord, carte, cartographie des acteurs, graphe, liens, DSFR, Système de design de l'État, La Suite numérique, service public, logiciel libre.

## Licence

Fichiers de l'espace et documentation sous licence Creative Commons [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/deed.fr) : réutilisation et adaptation autorisées, en citant la source et en partageant sous la même licence. Le code des widgets est sous licence MIT, dans leurs dépôts.

Conçu par le Lab 17 bis, laboratoire d'innovation publique de l'académie de Reims. Contact : <lab17bis@ac-reims.fr>
