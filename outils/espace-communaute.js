window.SPEC_COMMUNAUTE = (function () {
  var W = 'https://lab17bis.github.io/';
  var graine = 17; function hasard() { graine = (graine * 16807) % 2147483647; return graine / 2147483647; }
  function pioche(t) { return t[Math.floor(hasard() * t.length)]; }
  var J = 86400, auj = Math.floor(Date.now() / 86400000) * J;
  var DF = { dateFormat: 'DD/MM/YYYY' };

  // Structures (table partagée : même définition que grist-projet)
  var TYPES_STRUCTURE = ['Établissement', 'Circonscription', 'Service', 'Direction', 'Partenaire'];
  var structures = [
    { Nom: 'Collège A', Sigle: '', Type: 'Établissement' }, { Nom: 'Lycée B', Sigle: '', Type: 'Établissement' },
    { Nom: 'École C', Sigle: '', Type: 'Établissement' }, { Nom: 'Lycée professionnel D', Sigle: 'LP D', Type: 'Établissement' },
    { Nom: 'Circonscription E', Sigle: '', Type: 'Circonscription' }, { Nom: 'Service de la formation', Sigle: 'SF', Type: 'Service' },
    { Nom: 'Direction des ressources humaines', Sigle: 'DRH', Type: 'Direction' }, { Nom: 'Association F', Sigle: '', Type: 'Partenaire' }
  ];
  structures[2].Parent = 5;
  // Localisation (communes réelles de l'académie, adresses fictives) et position pour la cartographie des acteurs.
  [['Reims', 49.2583, 4.0317, 'Collège de 600 élèves, engagé dans un projet de jardin pédagogique.', 3, 4],
    ['Châlons-en-Champagne', 48.9566, 4.3631, 'Lycée général et technologique, internat de 120 places.', 3, 3],
    ['Épernay', 49.0400, 3.9590, 'École élémentaire de 8 classes.', 2, 4],
    ['Charleville-Mézières', 49.7620, 4.7263, 'Lycée professionnel des métiers du bâtiment et de l\'énergie.', 3, 2],
    ['Vitry-le-François', 48.7247, 4.5853, 'Circonscription du premier degré : 42 écoles.', 4, 3],
    ['Reims', 49.2530, 4.0400, 'Conçoit et organise la formation des personnels.', 4, 5],
    ['Reims', 49.2610, 4.0250, 'Gestion des carrières et accompagnement des personnels.', 5, 3],
    ['Troyes', 48.3010, 4.0800, 'Association d\'éducation populaire, partenaire des projets culturels.', 2, 5]
  ].forEach(function (l, i) {
    Object.assign(structures[i], { Commune: l[0], Adresse: l[0], Latitude: l[1], Longitude: l[2], Presentation: l[3], Influence: l[4], Interet: l[5] });
  });

  // Personnes (table partagée : Nom, Email, Structure + colonnes propres à la communauté)
  var P = [['Camille', 'Martin', 'Principale adjointe', 1], ['Dominique', 'Bernard', 'Conseiller principal d\'éducation', 2], ['Alex', 'Petit', 'Directeur d\'école', 3],
    ['Sacha', 'Durand', 'Professeure', 4], ['Morgan', 'Leroy', 'Conseiller pédagogique', 5], ['Charlie', 'Moreau', 'Formatrice', 6], ['Lou', 'Simon', 'Chargée de mission', 7],
    ['Noa', 'Laurent', 'Proviseur adjoint', 2], ['Eden', 'Michel', 'Professeure documentaliste', 1], ['Maxime', 'Garcia', 'Chef de projet', 8], ['Andréa', 'David', 'Professeur', 4],
    ['Jules', 'Bertrand', 'Directrice d\'école', 3], ['Inès', 'Roux', 'Gestionnaire', 7], ['Hugo', 'Vincent', 'Formateur', 6], ['Nina', 'Fournier', 'Infirmière', 1],
    ['Malik', 'Morel', 'Professeur', 2], ['Rose', 'Girard', 'Psychologue de l\'éducation nationale', 5], ['Paul', 'André', 'Coordonnateur', 8]];
  var ROLES = ['Membre', 'Animation', 'Coordination'];
  var personnes = P.map(function (p, i) {
    return { Nom: p[1].toUpperCase() + ' ' + p[0], Email: (p[0] + '.' + p[1]).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '') + '@exemple.fr',
      Structure: p[3], Fonction: p[2], Role_communaute: i === 6 ? 'Coordination' : (i === 5 || i === 13) ? 'Animation' : 'Membre',
      Membre_depuis: auj - (60 + Math.floor(hasard() * 500)) * J, Actif: i !== 17 };
  });

  // Groupes
  var TYPES_GROUPE = ['Groupe de codéveloppement', 'Groupe de travail', 'Communauté thématique', 'Plénière'];
  var groupes = [
    { Nom: 'Codéveloppement 1', Type: 'Groupe de codéveloppement', Animation: 6, Membres: [1, 2, 3, 4, 9, 11], Rythme: 'Toutes les six semaines', Statut: 'Actif' },
    { Nom: 'Codéveloppement 2', Type: 'Groupe de codéveloppement', Animation: 14, Membres: [5, 8, 12, 13, 15, 16, 17], Rythme: 'Toutes les six semaines', Statut: 'Actif' },
    { Nom: 'Accueil des nouveaux collègues', Type: 'Groupe de travail', Animation: 7, Membres: [1, 7, 9, 10, 13], Rythme: 'Une fois par mois', Statut: 'Actif' },
    { Nom: 'Rencontre plénière', Type: 'Plénière', Animation: 7, Membres: [], Rythme: 'Deux fois par an', Statut: 'Actif' }
  ];
  groupes[3].Membres = personnes.map(function (p, i) { return i + 1; }).filter(function (i) { return personnes[i - 1].Actif; });
  groupes.forEach(function (g) { g.Membres = ['L'].concat(g.Membres); });
  var NOMS_GROUPES = groupes.map(function (g) { return g.Nom; });
  function nom(i) { return personnes[i - 1].Nom; }

  // Liens entre acteurs (grist-graphe, grist-carte) : De et Vers désignent une structure ou une personne par son nom.
  var TYPES_LIENS = ['Coopère avec', 'Fait partie de', 'Accompagne', 'Finance', 'Conseille', 'Influence', 'Partenaire de'];
  var liens = [
    ['Service de la formation', 'Circonscription E', 'Accompagne', 2, 'À sens unique', ''],
    ['Direction des ressources humaines', 'Service de la formation', 'Finance', 3, 'À sens unique', 'Budget de formation'],
    ['Collège A', 'Association F', 'Coopère avec', 2, 'Réciproque', 'Projet culturel'],
    ['Lycée professionnel D', 'Lycée B', 'Coopère avec', 1, 'Réciproque', 'Liaison des filières'],
    ['Circonscription E', 'École C', 'Accompagne', 3, 'À sens unique', ''],
    ['Service de la formation', 'Lycée B', 'Accompagne', 2, 'À sens unique', 'Formation d\'initiative locale'],
    [nom(7), nom(6), 'Coopère avec', 3, 'Réciproque', 'Co-animation de la communauté'],
    [nom(7), 'Direction des ressources humaines', 'Conseille', 2, 'À sens unique', ''],
    [nom(10), nom(1), 'Coopère avec', 2, 'Réciproque', 'Projet culturel'],
    [nom(5), nom(3), 'Accompagne', 2, 'À sens unique', ''],
    [nom(14), nom(17), 'Conseille', 1, 'Réciproque', ''],
    ['Association F', nom(10), 'Influence', 3, 'À sens unique', '']
  ].map(function (l) { return { De: l[0], Vers: l[1], Type: l[2], Force: l[3], Sens: l[4], Note: l[5] }; });

  // Rencontres (tables de grist-reunion) et feuilles de présence
  var LIEUX = ['Salle de réunion du Collège A', 'Visioconférence', 'Salle 2 du Service de la formation', 'Lycée B, salle polyvalente'];
  var calendrier = [[0, -160], [0, -118], [0, -76], [0, -34], [0, 8], [1, -150], [1, -108], [1, -66], [1, -24], [1, 18], [2, -130], [2, -100], [2, -70], [2, -40], [2, -10], [2, 20], [3, -175], [3, 30]];
  var reunions = [], presences = [], points = [], decisions = [], actionsR = [];
  var compteur = {};
  calendrier.forEach(function (c, k) {
    var g = groupes[c[0]], gid = c[0] + 1, passe = c[1] < 0, n = (compteur[gid] = (compteur[gid] || 0) + 1);
    var membres = g.Membres.slice(1), presents = [], excuses = [];
    var rid = reunions.length + 1;
    if (passe) {
      membres.forEach(function (m) {
        var x = hasard(), pr = x < 0.76 ? 'Présent' : x < 0.9 ? 'Excusé' : 'Absent';
        presences.push({ Reunion: rid, Personne: m, Presence: pr });
        if (pr === 'Présent') presents.push(nom(m)); else if (pr === 'Excusé') excuses.push(nom(m));
      });
    }
    var codev = g.Type === 'Groupe de codéveloppement';
    reunions.push({
      Titre: (codev ? 'Séance ' + n : g.Type === 'Plénière' ? 'Rencontre plénière' : 'Réunion ' + n) + ' – ' + g.Nom, Instance: g.Nom, Date: auj + c[1] * J,
      Heure: codev ? '14:00' : '09:30', Duree_prevue: codev ? 120 : g.Type === 'Plénière' ? 180 : 90, Lieu: pioche(LIEUX), Animation: nom(g.Animation), Secretariat: passe ? nom(pioche(membres)) : '',
      Participants: passe ? presents.join(', ') : membres.map(nom).join(', '), Excuses: excuses.join(', '),
      Objectif: codev ? 'Traiter une situation professionnelle apportée par un membre du groupe.' : g.Type === 'Plénière' ? 'Partager les travaux des groupes et décider des priorités du semestre.' : 'Avancer sur le livret d\'accueil.',
      Statut: passe ? (c[1] < -30 ? 'Compte rendu diffusé' : 'Tenue') : (c[1] < 15 ? 'Ordre du jour arrêté' : 'En préparation')
    });
    var odj = codev ? [['Accueil et choix du cas', 'Information', 15], ['Exposé de la situation', 'Échange', 20], ['Questions et reformulation', 'Échange', 30], ['Propositions du groupe', 'Échange', 35], ['Plan d\'action et retour sur la séance', 'Décision', 20]]
      : g.Type === 'Plénière' ? [['Nouvelles des groupes', 'Information', 45], ['Ressources partagées ce semestre', 'Information', 30], ['Priorités du prochain semestre', 'Décision', 60]]
      : [['Point sur les retours des nouveaux collègues', 'Échange', 30], ['Avancement du livret d\'accueil', 'Décision', 40], ['Organisation de la prochaine journée d\'accueil', 'Échange', 20]];
    if (passe && k % 3 !== 0) return;
    odj.forEach(function (p, i) {
      points.push({ Reunion: rid, Titre: p[0], Type: p[1], Duree: p[2], Porteur: i === 0 ? nom(g.Animation) : '', Statut: 'Retenu', Ordre: i + 1, Traite: passe, Propose_par: nom(g.Animation), Notes: '' });
    });
    if (passe) {
      var pid = points.length;
      decisions.push({ Reunion: rid, Point: pid, Texte: codev ? 'La personne qui a apporté le cas teste deux propositions et en rend compte à la prochaine séance.' : 'Le groupe valide la version de travail et la soumet à la relecture.' });
      actionsR.push({ Reunion: rid, Point: pid, Intitule: codev ? 'Rendre compte des propositions testées' : 'Diffuser la version de travail pour relecture', Responsable: nom(pioche(membres)), Echeance: auj + (c[1] + 30) * J, Etat: c[1] < -40 ? 'Fait' : 'À faire' });
    }
  });

  // Ressources partagées (grist-catalogue)
  var TYPES_RES = ['Fiche pratique', 'Retour d\'expérience', 'Outil', 'Lecture'];
  var THEMES = ['Accueil', 'Animation', 'Posture', 'Organisation'];
  var ressources = [
    { titre: 'Accueillir un nouveau collègue en trois temps', type: 'Fiche pratique', resume: 'Avant l\'arrivée, la première semaine, le premier mois : les étapes qui comptent.', description: 'Une fiche issue des travaux du groupe sur l\'accueil, testée dans plusieurs établissements.', themes: ['L', 'Accueil', 'Organisation'], auteur: 10, etapes: 'Préparer le poste et les accès.\nPrésenter l\'équipe et les interlocuteurs.\nFaire un point d\'étape au bout d\'un mois.', date: auj - 40 * J, publie: true },
    { titre: 'Ce que le codéveloppement a changé dans ma pratique', type: 'Retour d\'expérience', resume: 'Un membre raconte ce qu\'il a retiré d\'une année de séances.', description: 'Témoignage sur l\'écoute, la prise de recul et les solutions testées après les séances.', themes: ['L', 'Posture'], auteur: 2, date: auj - 75 * J, publie: true },
    { titre: 'Grille de questions de clarification', type: 'Outil', resume: 'Des questions ouvertes pour bien comprendre une situation avant de proposer.', description: 'Une liste de questions classées par intention : comprendre le contexte, les acteurs, ce qui a déjà été essayé.', themes: ['L', 'Animation', 'Posture'], auteur: 6, etapes: 'Lire la grille avant la séance.\nChoisir trois questions.\nÉviter les questions qui contiennent déjà une solution.', date: auj - 20 * J, publie: true },
    { titre: 'Animer une séance à distance', type: 'Fiche pratique', resume: 'Les adaptations qui rendent une séance en visioconférence aussi riche qu\'en présence.', description: 'Tour de parole explicite, caméras allumées, prise de notes partagée.', themes: ['L', 'Animation'], auteur: 14, date: auj - 110 * J, publie: true },
    { titre: 'Lectures pour aller plus loin', type: 'Lecture', resume: 'Une sélection d\'ouvrages et d\'articles proposés par les membres.', description: 'Liste tenue à jour par la coordination de la communauté.', themes: ['L', 'Posture', 'Animation'], auteur: 7, date: auj - 150 * J, publie: true },
    { titre: 'Fiche en cours de rédaction', type: 'Fiche pratique', resume: 'Cette fiche n\'apparaît pas : la case « Publiée » est décochée.', themes: ['L', 'Organisation'], auteur: 13, date: auj - 5 * J, publie: false }
  ];

  // Retours après les rencontres (grist-questionnaire)
  var RETENU = ['Des pistes concrètes pour ma situation.', 'Le temps d\'écoute sans jugement.', 'Une nouvelle façon de poser les questions.', 'Les échanges avec des collègues d\'autres établissements.', '', ''];
  var SUGG = ['Commencer à l\'heure.', 'Un peu plus de temps pour le plan d\'action.', '', '', 'Partager les ressources avant la séance.', ''];
  var retours = [];
  reunions.forEach(function (r) {
    if (r.Date >= auj) return;
    var n = 2 + Math.floor(hasard() * 3);
    for (var i = 0; i < n; i++) {
      var note = Math.min(5, Math.max(2, Math.round(3.4 + hasard() * 1.9)));
      retours.push({ Groupe: r.Instance, Note: note, Utilite: Math.min(5, Math.max(1, note + (hasard() < 0.3 ? -1 : 0))), Retenu: pioche(RETENU), Suggestion: pioche(SUGG), Date: r.Date + J });
    }
  });

  // Réglages des widgets
  var q = function (id, col, type, libelle, aff, o) { return Object.assign({ id: id, genre: 'question', colonne: col, type: type, libelle: libelle, aide: '', obligatoire: false, affichage: aff }, o || {}); };
  var questionnaire = { version: 1, titre: 'Votre retour sur la rencontre', introduction: 'Une minute pour nous dire ce que vous retirez de cette rencontre. Vos réponses sont anonymes.',
    page: { marque: 'République\nfrançaise', titre: 'Nom de la communauté', sousTitre: '', boutons: [], pied: { accessibilite: 'non conforme' } },
    envoi: { bouton: 'Envoyer', titreConfirmation: 'Merci pour votre retour', messageConfirmation: 'Votre réponse a bien été enregistrée.', autreReponse: false },
    mentionObligatoire: 'asterisque', mentionsDonnees: 'Vos réponses servent uniquement à améliorer les rencontres de la communauté. Elles ne sont pas nominatives.',
    etapes: [{ id: 'e1', titre: 'Votre retour', description: '', condition: null, elements: [
      q('q1', 'Groupe', 'Choice', 'À quelle rencontre avez-vous participé ?', 'liste', { obligatoire: true, choix: NOMS_GROUPES }),
      q('q2', 'Note', 'Int', 'Êtes-vous satisfait de cette rencontre ?', 'echelle', { obligatoire: true, min: 1, max: 5, libelleMin: 'Pas du tout', libelleMax: 'Tout à fait' }),
      q('q3', 'Utilite', 'Int', 'Ce que vous en retirez vous sera-t-il utile ?', 'echelle', { min: 1, max: 5, libelleMin: 'Pas du tout', libelleMax: 'Tout à fait' }),
      q('q4', 'Retenu', 'Text', 'Qu\'en retenez-vous ?', 'long'),
      q('q5', 'Suggestion', 'Text', 'Une suggestion pour les prochaines rencontres ?', 'long')
    ] }] };
  var catalogue = { version: 1, page: { marque: 'République\nfrançaise', titre: 'Nom de la communauté', sousTitre: 'Ressources partagées', boutons: [], pied: { accessibilite: 'non conforme' } },
    titre: 'Les ressources de la communauté', introduction: 'Fiches, outils, retours d\'expérience et lectures proposés par les membres. Ajoutez une fiche dans la page « Fiches », ou proposez-la par le formulaire public.',
    elements: { singulier: 'ressource', pluriel: 'ressources', feminin: true },
    colonnes: { titre: 'titre', resume: 'resume', description: 'description', date: 'date', lien: 'lien', publie: 'publie' },
    sections: { colonne: 'type', ordre: TYPES_RES, libelles: { 'Fiche pratique': 'Fiches pratiques', 'Retour d\'expérience': 'Retours d\'expérience', 'Outil': 'Outils', 'Lecture': 'Lectures' }, libelleTout: 'Tout' },
    filtres: [{ colonne: 'themes', libelle: 'Thème', ordre: THEMES }],
    tris: [{ mode: 'recent', libelle: 'Plus récentes' }, { mode: 'alpha', libelle: 'Ordre alphabétique' }],
    etiquettes: [{ colonne: 'type', fond: '#000091', texte: '#FFFFFF' }],
    carte: { details: ['Proposee_par_nom'] },
    fiche: { lienRetour: 'Retour aux ressources', infos: [{ colonne: 'Proposee_par_nom', libelle: 'Proposée par' }],
      blocs: [{ colonne: 'description', titre: 'Présentation', format: 'texte' }, { colonne: 'etapes', titre: 'Comment faire', format: 'etapes' }, { colonne: 'themes', format: 'etiquettes' }] } };
  var propositionRessource = { version: 1, titre: 'Proposer une ressource', introduction: 'Une fiche pratique, un outil, un retour d\'expérience ou une lecture à partager avec la communauté ? Proposez-la : la coordination la relit avant de la publier dans les ressources.',
    page: { marque: 'République\nfrançaise', titre: 'Nom de la communauté', sousTitre: 'Proposer une ressource', boutons: [], pied: { accessibilite: 'non conforme' } },
    envoi: { bouton: 'Proposer', titreConfirmation: 'Merci pour votre proposition', messageConfirmation: 'Elle a bien été enregistrée. Elle apparaîtra dans les ressources une fois relue par la coordination.', autreReponse: true },
    mentionObligatoire: 'asterisque', mentionsDonnees: 'Votre proposition et le nom que vous indiquez seront visibles par les membres de la communauté une fois la ressource publiée.',
    etapes: [{ id: 'e1', titre: 'Votre ressource', description: '', condition: null, elements: [
      q('q1', 'titre', 'Text', 'Titre de la ressource', 'court', { obligatoire: true }),
      q('q2', 'type', 'Choice', 'De quel type de ressource s\'agit-il ?', 'radio', { obligatoire: true, choix: TYPES_RES }),
      q('q3', 'resume', 'Text', 'En une phrase', 'court', { obligatoire: true, aide: 'Ce que la ressource apporte, en quelques mots.' }),
      q('q4', 'description', 'Text', 'Présentation', 'long', { aide: 'Le contexte, à qui elle sert, comment l\'utiliser.' }),
      q('q5', 'themes', 'ChoiceList', 'Thèmes', 'cases', { choix: THEMES }),
      q('q6', 'lien', 'Text', 'Lien vers la ressource', 'court', { aide: 'Facultatif : document partagé, page, vidéo.' }),
      q('q7', 'Auteur_libre', 'Text', 'Proposée par', 'court', { aide: 'Votre nom ou celui de votre groupe.' })
    ] }] };
  var TENUES = ['Tenue', 'Compte rendu diffusé'];
  var graphique = { version: 1, page: { marque: 'République\nfrançaise', titre: 'Vie de la communauté', sousTitre: '', boutons: [], pied: { accessibilite: 'non conforme' } },
    tableaux: [{ id: 'communaute', titre: 'Vie de la communauté', introduction: 'Membres, rencontres, présence et satisfaction. Les filtres s\'appliquent à tous les blocs qui ont la colonne concernée.', moisDebut: 9,
      filtres: [{ id: 'f1', colonne: 'Date', libelle: 'Période' }, { id: 'f2', colonne: 'Groupe', libelle: 'Groupe', libelleTous: 'Tous les groupes' }],
      blocs: [
        { type: 'indicateur', titre: 'Membres actifs', table: 'Personnes', largeur: 3, mesures: [{ fonction: 'nombre' }], filtres: [{ colonne: 'Actif', operateur: 'vrai' }], libelleValeur: 'personnes' },
        { type: 'indicateur', titre: 'Rencontres tenues', table: 'Reunions', largeur: 3, mesures: [{ fonction: 'nombre' }], filtres: [{ colonne: 'Statut', operateur: 'parmi', valeur: TENUES }], libelleValeur: 'rencontres', tendance: { colonne: 'Date', pas: 'mois' } },
        { type: 'indicateur', titre: 'Présence', table: 'Presences', largeur: 3, mesures: [{ fonction: 'taux', condition: { colonne: 'Presence', operateur: 'parmi', valeur: ['Présent'] } }], format: { unite: '%', decimales: 0 }, libelleValeur: 'des personnes attendues étaient présentes', seuils: { sens: 'hausse', alerte: 70, critique: 50 } },
        { type: 'indicateur', titre: 'Satisfaction', table: 'Retours', largeur: 3, mesures: [{ fonction: 'moyenne', colonne: 'Note' }], format: { unite: 'sur 5', decimales: 1 }, libelleValeur: 'note moyenne', seuils: { sens: 'hausse', alerte: 3.5, critique: 3 } },
        { type: 'graphique', forme: 'barres', titre: 'Rencontres par mois', sousTitre: 'Par groupe', table: 'Reunions', largeur: 8, filtres: [{ colonne: 'Statut', operateur: 'parmi', valeur: TENUES }], axe: { colonne: 'Date', pas: 'mois' }, series: { colonne: 'Groupe' }, empile: 'oui', mesures: [{ fonction: 'nombre' }] },
        { type: 'graphique', forme: 'anneau', titre: 'Membres par type de structure', table: 'Personnes', largeur: 4, filtres: [{ colonne: 'Actif', operateur: 'vrai' }], axe: { colonne: 'Type_structure' }, mesures: [{ fonction: 'nombre' }] },
        { type: 'graphique', forme: 'barres-h', titre: 'Présence par groupe', table: 'Presences', largeur: 6, axe: { colonne: 'Groupe' }, mesures: [{ fonction: 'taux', libelle: 'Présence (%)', condition: { colonne: 'Presence', operateur: 'parmi', valeur: ['Présent'] } }] },
        { type: 'graphique', forme: 'barres', titre: 'Satisfaction par groupe', table: 'Retours', largeur: 6, axe: { colonne: 'Groupe' }, mesures: [{ fonction: 'moyenne', colonne: 'Note', libelle: 'Note moyenne' }] },
        { type: 'tableau', mode: 'liste', titre: 'Prochaines rencontres', table: 'Reunions', largeur: 6, colonnesListe: ['Date', 'Titre', 'Lieu'], filtres: [{ colonne: 'Statut', operateur: 'parmi', valeur: ['En préparation', 'Ordre du jour arrêté'] }], triListe: 'Date', ordreListe: 'asc', limite: 6 },
        { type: 'tableau', mode: 'liste', titre: 'Membres à recontacter', sousTitre: 'Actifs, sans présence depuis trois mois', table: 'Personnes', largeur: 6, colonnesListe: ['Nom', 'Structure_libelle', 'Derniere_presence'], filtres: [{ colonne: 'A_recontacter', operateur: 'vrai' }], triListe: 'Derniere_presence', ordreListe: 'asc', limite: 8 }
      ] }] };
  var reunion = { page: { marque: 'République\nfrançaise', titre: 'Rencontres de la communauté', sousTitre: '', pied: { accessibilite: 'non conforme' } },
    listes: { instances: NOMS_GROUPES } };

  var STATUTS_REUNION = ['En préparation', 'Ordre du jour arrêté', 'Tenue', 'Compte rendu diffusé'];
  return { nom: 'espace-communaute – démonstration (données fictives)', rangerDonnees: true, tables: {
      Structures: { colonnes: [{ id: 'Nom' }, { id: 'Sigle' }, { id: 'Type', type: 'Choice', choices: TYPES_STRUCTURE },
        { id: 'Parent', type: 'Ref:Structures', label: 'Rattachée à', affiche: 'Libelle' },
        { id: 'Libelle', label: 'Libellé', formula: '($Sigle + " – " if $Sigle else "") + $Nom' },
        { id: 'Membres', type: 'Int', label: 'Membres de la communauté', formula: 'len(Personnes.lookupRecords(Structure=$id, Actif=True))' },
        { id: 'Presentation', label: 'Présentation' }, { id: 'Commune' }, { id: 'Adresse' }, { id: 'Latitude', type: 'Numeric' }, { id: 'Longitude', type: 'Numeric' },
        { id: 'Influence', type: 'Int', label: 'Influence (0 à 5)' }, { id: 'Interet', type: 'Int', label: 'Intérêt (0 à 5)' }], lignes: structures },
      Liens: { colonnes: [{ id: 'De' }, { id: 'Vers' }, { id: 'Type', type: 'Choice', label: 'Nature du lien', choices: TYPES_LIENS }, { id: 'Force', type: 'Int', label: 'Force (1 à 3)' },
        { id: 'Sens', type: 'Choice', choices: ['Réciproque', 'À sens unique'] }, { id: 'Note', label: 'Précision' }], lignes: liens },
      Personnes: { colonnes: [{ id: 'Nom', label: 'Nom et prénom' }, { id: 'Email', label: 'Adresse électronique' }, { id: 'Structure', type: 'Ref:Structures', label: 'Structure de rattachement', affiche: 'Libelle' },
        { id: 'Fonction' }, { id: 'Role_communaute', type: 'Choice', label: 'Rôle dans la communauté', choices: ROLES, formula: '"Membre"', trigger: true },
        { id: 'Membre_depuis', type: 'Date', label: 'Membre depuis', formula: 'TODAY()', trigger: true, options: DF }, { id: 'Actif', type: 'Bool', formula: 'True', trigger: true },
        { id: 'Groupes', label: 'Groupes', formula: '", ".join(g.Nom for g in Groupes.all if rec in g.Membres)' },
        { id: 'Presences', type: 'Int', label: 'Présences', formula: 'len(Presences.lookupRecords(Personne=$id, Presence="Présent"))' },
        { id: 'Derniere_presence', type: 'Date', label: 'Dernière présence', formula: 'd = [p.Date for p in Presences.lookupRecords(Personne=$id, Presence="Présent") if p.Date]\nreturn max(d) if d else None', options: DF },
        { id: 'A_recontacter', type: 'Bool', label: 'À recontacter', formula: '$Actif and (not $Derniere_presence or (TODAY() - $Derniere_presence).days > 90)' },
        { id: 'Structure_libelle', label: 'Structure', formula: '$Structure.Libelle' }, { id: 'Type_structure', label: 'Type de structure', formula: '$Structure.Type' }], lignes: personnes },
      Groupes: { colonnes: [{ id: 'Nom' }, { id: 'Type', type: 'Choice', choices: TYPES_GROUPE }, { id: 'Animation', type: 'Ref:Personnes', affiche: 'Nom' },
        { id: 'Membres', type: 'RefList:Personnes', affiche: 'Nom' }, { id: 'Rythme' }, { id: 'Statut', type: 'Choice', choices: ['Actif', 'En pause', 'Clos'], formula: '"Actif"', trigger: true },
        { id: 'Nb_membres', type: 'Int', label: 'Membres', formula: 'len($Membres)' },
        { id: 'Rencontres_tenues', type: 'Int', label: 'Rencontres tenues', formula: 'len([r for r in Reunions.lookupRecords(Instance=$Nom) if r.Statut in ("Tenue", "Compte rendu diffusé")])' },
        { id: 'Prochaine_rencontre', type: 'Date', label: 'Prochaine rencontre', formula: 'd = [r.Date for r in Reunions.lookupRecords(Instance=$Nom) if r.Date and r.Date >= TODAY()]\nreturn min(d) if d else None', options: DF },
        { id: 'Taux_presence', type: 'Numeric', label: 'Présence (%)', formula: 'p = Presences.lookupRecords(Groupe=$Nom)\nreturn round(100.0 * len([x for x in p if x.Presence == "Présent"]) / len(p)) if p else None' }], lignes: groupes },
      Reunions: { colonnes: [{ id: 'Titre' }, { id: 'Instance', type: 'Choice', label: 'Groupe ou instance', choices: NOMS_GROUPES }, { id: 'Date', type: 'Date', options: DF }, { id: 'Heure' },
        { id: 'Duree_prevue', type: 'Int', label: 'Durée prévue (minutes)' }, { id: 'Lieu' }, { id: 'Animation' }, { id: 'Secretariat', label: 'Secrétariat' }, { id: 'Participants' }, { id: 'Excuses', label: 'Excusés' }, { id: 'Objectif' },
        { id: 'Statut', type: 'Choice', choices: STATUTS_REUNION }, { id: 'Config_reunion' },
        { id: 'Groupe', formula: '$Instance' },
        { id: 'Presents', type: 'Int', label: 'Présents', formula: 'len(Presences.lookupRecords(Reunion=$id, Presence="Présent"))' }], lignes: reunions },
      Points: { colonnes: [{ id: 'Reunion', type: 'Ref:Reunions', affiche: 'Titre' }, { id: 'Titre' }, { id: 'Description' }, { id: 'Type', type: 'Choice', choices: ['Information', 'Échange', 'Décision'] },
        { id: 'Duree', type: 'Int' }, { id: 'Porteur' }, { id: 'Statut', type: 'Choice', choices: ['Proposé', 'Retenu', 'Reporté', 'Écarté'] }, { id: 'Ordre', type: 'Numeric' }, { id: 'Notes' }, { id: 'Traite', type: 'Bool' },
        { id: 'Propose_par', formula: 'user.Name', trigger: true }, { id: 'Propose_le', type: 'DateTime:Europe/Paris', formula: 'NOW()', trigger: true }], lignes: points },
      Decisions: { colonnes: [{ id: 'Reunion', type: 'Ref:Reunions', affiche: 'Titre' }, { id: 'Point', type: 'Ref:Points', affiche: 'Titre' }, { id: 'Texte' }], lignes: decisions },
      Actions_reunion: { colonnes: [{ id: 'Reunion', type: 'Ref:Reunions', affiche: 'Titre' }, { id: 'Point', type: 'Ref:Points', affiche: 'Titre' }, { id: 'Intitule', label: 'Action' }, { id: 'Responsable' },
        { id: 'Echeance', type: 'Date', label: 'Échéance', options: DF }, { id: 'Etat', type: 'Choice', label: 'État', choices: ['À faire', 'En cours', 'Fait', 'Abandonné'] }], lignes: actionsR },
      Presences: { colonnes: [{ id: 'Reunion', type: 'Ref:Reunions', label: 'Rencontre', affiche: 'Titre' }, { id: 'Personne', type: 'Ref:Personnes', affiche: 'Nom' },
        { id: 'Presence', type: 'Choice', label: 'Présence', choices: ['Présent', 'Excusé', 'Absent'], formula: '"Présent"', trigger: true },
        { id: 'Groupe', formula: '$Reunion.Instance' }, { id: 'Date', type: 'Date', formula: '$Reunion.Date', options: DF }, { id: 'Config_graphique' }], lignes: presences },
      Ressources: { colonnes: [{ id: 'titre', label: 'Titre' }, { id: 'type', type: 'Choice', label: 'Type', choices: TYPES_RES }, { id: 'resume', label: 'En bref' }, { id: 'description', label: 'Présentation' },
        { id: 'etapes', label: 'Comment faire' }, { id: 'themes', type: 'ChoiceList', label: 'Thèmes', choices: THEMES }, { id: 'auteur', type: 'Ref:Personnes', label: 'Proposée par', affiche: 'Nom' },
        { id: 'lien', label: 'Lien' }, { id: 'date', type: 'Date', label: 'Date', formula: 'TODAY()', trigger: true, options: DF }, { id: 'publie', type: 'Bool', label: 'Publiée' },
        { id: 'Auteur_libre', label: 'Proposée par (formulaire)' },
        { id: 'Proposee_par_nom', label: 'Proposée par (nom)', formula: '$auteur.Nom or $Auteur_libre' }, { id: 'Config_catalogue' }, { id: 'Config_questionnaire' }], lignes: ressources },
      Retours: { colonnes: [{ id: 'Groupe', type: 'Choice', label: 'Groupe ou instance', choices: NOMS_GROUPES }, { id: 'Note', type: 'Int' }, { id: 'Utilite', type: 'Int', label: 'Utilité' },
        { id: 'Retenu', label: 'Ce que je retiens' }, { id: 'Suggestion' }, { id: 'Date', type: 'Date', label: 'Reçu le', formula: 'TODAY()', trigger: true, options: DF }, { id: 'Config_questionnaire' }], lignes: retours }
    },
    reglages: [{ table: 'Reunions', colonne: 'Config_reunion', valeur: reunion }, { table: 'Ressources', colonne: 'Config_catalogue', valeur: catalogue }, { table: 'Ressources', colonne: 'Config_questionnaire', valeur: propositionRessource },
      { table: 'Retours', colonne: 'Config_questionnaire', valeur: questionnaire }, { table: 'Presences', colonne: 'Config_graphique', valeur: graphique }],
    pages: [
      { nom: 'Rencontres', sections: [{ table: 'Reunions', type: 'custom', titre: 'Rencontres', url: W + 'grist-reunion/v1/' }] },
      { nom: 'Feuilles de présence', indent: 1, sections: [{ cle: 'r', table: 'Reunions', type: 'record', titre: 'Rencontres' }, { table: 'Presences', type: 'record', titre: 'Présences', lien: { depuis: 'r', colonne: 'Reunion' } }] },
      { nom: 'Membres', table: 'Personnes', sections: [{ table: 'Personnes', type: 'single', titre: 'Fiche du membre', lien: { depuis: 'principale' } }, { table: 'Presences', type: 'record', titre: 'Ses présences', lien: { depuis: 'principale', colonne: 'Personne' } }] },
      { nom: 'Groupes', indent: 1, table: 'Groupes', sections: [{ table: 'Groupes', type: 'single', titre: 'Fiche du groupe', lien: { depuis: 'principale' } }] },
      { nom: 'Structures', indent: 1, table: 'Structures' },
      { nom: 'Carte des structures', sections: [{ table: 'Structures', type: 'custom', titre: 'Carte des structures', url: W + 'grist-carte/v1/',
        colonnes: { Nom: 'Nom', Latitude: 'Latitude', Longitude: 'Longitude', Adresse: 'Adresse', Type: 'Type', Description: 'Presentation', Details: ['Sigle', 'Membres'] },
        options: { titre: 'Structures de la communauté', fond: 'plan', regrouper: true, liste: true,
          puces: { 'Établissement': { couleur: 'blue-ecume', icone: 'school' }, 'Circonscription': { couleur: 'purple-glycine', icone: 'map-pin-2' }, 'Service': { couleur: 'blue-france', icone: 'government' },
            'Direction': { couleur: 'blue-france', icone: 'bank' }, 'Partenaire': { couleur: 'green-menthe', icone: 'community' } },
          liens: { table: 'Liens', afficher: true } } }] },
      { nom: 'Liens entre acteurs', sections: [{ table: 'Personnes', type: 'custom', titre: 'Liens entre acteurs', url: W + 'grist-graphe/v1/',
        options: { titre: 'Acteurs de la communauté', acteurs: [{ table: 'Structures', nom: 'Nom', type: 'Type', libelle: 'Structures' }, { table: 'Personnes', nom: 'Nom', type: 'Fonction', libelle: 'Personnes' }],
          liens: 'Liens', appartenance: true, participations: [{ table: 'Groupes', membres: 'Membres', groupe: '', libelle: 'Membres du même groupe' }] } }] },
      { nom: 'Liens', indent: 1, table: 'Liens' },
      { nom: 'Ressources', sections: [{ table: 'Ressources', type: 'custom', titre: 'Ressources de la communauté', url: W + 'grist-catalogue/v1/index.html' }] },
      { nom: 'Régler les ressources', indent: 1, sections: [{ table: 'Ressources', type: 'custom', titre: 'Réglages du catalogue', url: W + 'grist-catalogue/v1/editeur.html' }] },
      { nom: 'Fiches', indent: 1, table: 'Ressources' },
      { nom: 'Proposer une ressource', indent: 1, sections: [{ table: 'Ressources', type: 'custom', titre: 'Formulaire de proposition', url: W + 'grist-questionnaire/v1/editeur.html' }] },
      { nom: 'Retours', table: 'Retours' },
      { nom: 'Questionnaire de retour', indent: 1, sections: [{ table: 'Retours', type: 'custom', titre: 'Questionnaire', url: W + 'grist-questionnaire/v1/editeur.html' }] },
      { nom: 'Indicateurs', sections: [{ table: 'Presences', type: 'custom', titre: 'Indicateurs', url: W + 'grist-graphique/v1/index.html' }] },
      { nom: 'Régler les indicateurs', indent: 1, sections: [{ table: 'Presences', type: 'custom', titre: 'Réglages des indicateurs', url: W + 'grist-graphique/v1/editeur.html' }] },
      { nom: 'Données des rencontres', table: 'Points' }
    ] };
})();
'ok';
