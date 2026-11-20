// Construit un document Grist « espace » à partir d'une description (à exécuter dans un onglet Grist connecté).
window.ESPACE = (function () {
  var H = { 'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/json' };
  async function api(chemin, corps, methode) {
    var r = await fetch('/api' + chemin, { method: methode || (corps ? 'POST' : 'GET'), headers: H, body: corps ? JSON.stringify(corps) : undefined, credentials: 'include' });
    var t = await r.text(); var j; try { j = JSON.parse(t); } catch (e) { j = t; }
    if (!r.ok) { throw new Error(chemin + ' ' + r.status + ' ' + t.slice(0, 300)); }
    return j;
  }
  async function appliquer(doc, actions) { return (await api('/docs/' + doc + '/apply', actions)).retValues; }
  async function sql(doc, q) { return (await api('/docs/' + doc + '/sql?q=' + encodeURIComponent(q))).records.map(function (r) { return r.fields; }); }
  function info(c) {
    var o = { type: c.type || 'Text' };
    if (c.label) { o.label = c.label; }
    if (c.formula) { o.formula = c.formula; o.isFormula = !c.trigger; }
    if (c.trigger) { o.recalcWhen = 0; }
    var w = Object.assign({}, c.options || {});
    if (c.choices) { w.choices = c.choices; }
    if (Object.keys(w).length) { o.widgetOptions = JSON.stringify(w); }
    if (c.description) { o.description = c.description; }
    return o;
  }
  var simple = function (c) { return !/^Ref/.test(c.type || '') && !(c.formula && !c.trigger); };

  async function construire(spec, ws) {
    var doc = spec.doc || await api('/workspaces/' + ws + '/docs', { name: spec.nom });
    var tables = spec.tables;
    // 1. Tables avec colonnes simples
    var a = Object.keys(tables).map(function (t) {
      return ['AddTable', t, tables[t].colonnes.filter(simple).map(function (c) { return Object.assign({ id: c.id }, info(c)); })];
    });
    await appliquer(doc, a);
    if (!spec.doc) { try { await appliquer(doc, [['RemoveTable', 'Table1']]); } catch (e) {} }
    // 2. Références et formules
    a = [];
    Object.keys(tables).forEach(function (t) {
      tables[t].colonnes.filter(function (c) { return !simple(c); }).forEach(function (c) { a.push(['AddColumn', t, c.id, info(c)]); });
    });
    if (a.length) { await appliquer(doc, a); }
    // 3. Libellés des références
    var cols = await sql(doc, "select c.id, c.colId, c.type, t.tableId from _grist_Tables_column c join _grist_Tables t on t.id=c.parentId");
    var ref = function (t, c) { return cols.find(function (x) { return x.tableId === t && x.colId === c; }); };
    a = [];
    Object.keys(tables).forEach(function (t) {
      tables[t].colonnes.filter(function (c) { return c.affiche; }).forEach(function (c) {
        var cible = c.type.replace(/^Ref(List)?:/, '');
        a.push(['ModifyColumn', t, c.id, { visibleCol: ref(cible, c.affiche).id }]);
        a.push(['SetDisplayFormula', t, null, ref(t, c.id).id, '$' + c.id + '.' + c.affiche]);
      });
    });
    if (a.length) { await appliquer(doc, a); }
    // 4. Données d'exemple
    if (spec.exemple !== false) {
      for (var t of Object.keys(tables)) {
        var lignes = tables[t].lignes; if (!lignes || !lignes.length) { continue; }
        var c2 = {}, cles = {}; lignes.forEach(function (l) { Object.keys(l).forEach(function (k) { cles[k] = 1; }); }); Object.keys(cles).forEach(function (k) { c2[k] = lignes.map(function (l) { return l[k] === undefined ? null : l[k]; }); });
        await appliquer(doc, [['BulkAddRecord', t, lignes.map(function () { return null; }), c2]]);
      }
    }
    // 5. Réglages des widgets (description de colonnes techniques)
    a = [];
    (spec.reglages || []).forEach(function (r) { a.push(['ModifyColumn', r.table, r.colonne, { description: JSON.stringify(r.valeur) }]); });
    if (a.length) { await appliquer(doc, a); }
    // 6. Pages
    var tabs = await sql(doc, 'select id, tableId, primaryViewId, rawViewSectionRef from _grist_Tables');
    var tid = function (t) { return tabs.find(function (x) { return x.tableId === t; }); };
    var ordre = [];
    for (var p of spec.pages) {
      var vue = undefined;
      var sections = [];
      if (p.table) { vue = tid(p.table).primaryViewId; sections = await sql(doc, 'select id from _grist_Views_section where parentId=' + vue); }
      for (var s of (p.sections || [])) {
        var rv = await appliquer(doc, [['CreateViewSection', tid(s.table).id, vue || 0, s.type, null, null]]);
        vue = rv[0].viewRef;
        var maj = { title: s.titre || '' };
        if (s.url) {
          // s.options : réglages du widget (grist.setOptions) ; s.colonnes : association des colonnes du widget (nom attendu -> colonne de la table).
          var mapping = null;
          if (s.colonnes) {
            mapping = {};
            Object.keys(s.colonnes).forEach(function (k) {
              var v = s.colonnes[k];
              mapping[k] = Array.isArray(v) ? v.map(function (c) { return ref(s.table, c).id; }) : ref(s.table, v).id;
            });
          }
          maj.options = JSON.stringify({ customView: JSON.stringify({ mode: 'url', url: s.url, access: 'full', pluginId: '', sectionId: '', widgetDef: null, renderAfterReady: false, widgetId: null,
            widgetOptions: s.options || null, columnsMapping: mapping }) });
        }
        await appliquer(doc, [['UpdateRecord', '_grist_Views_section', rv[0].sectionRef, maj]]);
        sections.push({ id: rv[0].sectionRef, spec: s });
      }
      // liaisons
      for (var x of sections) {
        if (!x.spec || !x.spec.lien) { continue; }
        var src = sections.find(function (y) { return y.spec ? y.spec.cle === x.spec.lien.depuis : x.spec.lien.depuis === 'principale' && !y.spec; });
        var lien = { linkSrcSectionRef: src.id };
        if (x.spec.lien.colonne) { lien.linkTargetColRef = ref(x.spec.table, x.spec.lien.colonne).id; }
        await appliquer(doc, [['UpdateRecord', '_grist_Views_section', x.id, lien]]);
      }
      await appliquer(doc, [['UpdateRecord', '_grist_Views', vue, { name: p.nom }]]);
      ordre.push({ vue: vue, indent: p.indent || 0 });
    }
    // 7. Ordre et indentation des pages ; pages de tables non listées rangées sous « Données »
    var pages = await sql(doc, 'select id, viewRef from _grist_Pages order by pagePos');
    var vues = ordre.map(function (o) { return o.vue; });
    var reste = pages.filter(function (p) { return vues.indexOf(p.viewRef) < 0; });
    // Une seule action groupée : des mises à jour successives réordonnent mal les pages.
    var ids = [], pos = [], ind = [];
    ordre.forEach(function (o) { var pg = pages.find(function (p) { return p.viewRef === o.vue; }); ids.push(pg.id); ind.push(o.indent); });
    reste.forEach(function (pg) { ids.push(pg.id); ind.push(spec.rangerDonnees ? 1 : 0); });
    ids.forEach(function (x, i) { pos.push(i + 1); });
    await appliquer(doc, [['BulkUpdateRecord', '_grist_Pages', ids, { pagePos: pos, indentation: ind }]]);
    return doc;
  }
  return { construire: construire, api: api, appliquer: appliquer, sql: sql };
})();
'ok';
