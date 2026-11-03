// Renders the sidebar and prev/next pager. Pages set <body data-ch="N" data-root="../"> (home: data-root="").
(function () {
  const root = document.body.dataset.root || '';
  const cur = +document.body.dataset.ch || 0;
  const nav = document.getElementById('nav');
  if (nav) {
    let h = '<details' + (innerWidth > 900 ? ' open' : '') + '><summary>Contents</summary>';
    h += '<a class="site" href="' + root + 'index.html">3D-Printed Mechanics</a>';
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
