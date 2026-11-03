// Renders the sidebar (with the release badge) and prev/next pager. Pages set <body data-ch="N" data-root="../"> (home: data-root="").
(function () {
  // Release badge: links to the matching GitHub release. Falls back to nothing if version.js is missing.
  function versionBadge() {
    const v = window.SITE && SITE.version;
    return v ? '<a class="ver" href="' + SITE.repo + '/releases/tag/v' + v + '" title="Released ' + SITE.date + '">v' + v + '</a>' : '';
  }
  window.versionBadge = versionBadge;
  const root = document.body.dataset.root || '';
  const cur = +document.body.dataset.ch || 0;
  const nav = document.getElementById('nav');
  if (nav) {
    let h = '<details' + (innerWidth > 900 ? ' open' : '') + '><summary>Contents</summary>';
    h += '<div class="brand"><a class="site" href="' + root + 'index.html">3D-Printed Mechanics</a>' + versionBadge() + '</div>';
    CHAPTERS.forEach(c => {
      if (c.part) { h += '<div class="part">' + c.part + '</div>'; return; }
      const label = c.n + '. ' + c.title;
      h += c.built
        ? '<a class="ch' + (c.n === cur ? ' current' : '') + '" href="' + root + 'chapters/' + c.slug + '.html">' + label + '</a>'
        : '<span class="ch" title="Not written yet">' + label + '</span>';
    });
    nav.innerHTML = h + '</details>';
  }
  const pager = document.getElementById('pager');
  if (pager && cur) {
    const list = CHAPTERS.filter(c => c.n && c.built);
    const i = list.findIndex(c => c.n === cur);
    const link = (c, txt) => '<a href="' + root + 'chapters/' + c.slug + '.html">' + txt + '</a>';
    pager.innerHTML = (list[i - 1] ? link(list[i - 1], '← ' + list[i - 1].title) : '<span></span>') +
      (list[i + 1] ? link(list[i + 1], list[i + 1].title + ' →') : '<span></span>');
  }
})();
