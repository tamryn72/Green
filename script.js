// Age gate
(function () {
  var gate = document.getElementById('age-gate');
  var yes = document.getElementById('age-yes');
  if (localStorage.getItem('green.age21') === 'yes') {
    gate.classList.add('hidden');
  }
  yes && yes.addEventListener('click', function () {
    localStorage.setItem('green.age21', 'yes');
    gate.classList.add('hidden');
  });
})();

// Mobile nav toggle
(function () {
  var t = document.getElementById('nav-toggle');
  var l = document.getElementById('nav-links');
  if (!t || !l) return;
  t.addEventListener('click', function () {
    var open = l.classList.toggle('open');
    t.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  l.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') l.classList.remove('open');
  });
})();

// Strain filter
(function () {
  var filter = document.getElementById('strain-filter');
  if (!filter) return;
  filter.addEventListener('click', function (e) {
    var btn = e.target.closest('button');
    if (!btn) return;
    var type = btn.dataset.type;
    filter.querySelectorAll('button').forEach(function (b) { b.classList.toggle('active', b === btn); });
    document.querySelectorAll('.strain').forEach(function (card) {
      var t = card.dataset.type;
      card.classList.toggle('hidden', !(type === 'all' || t === type));
    });
  });
})();

// Trichome slider
(function () {
  var s = document.getElementById('trichome-slider');
  if (!s) return;
  var circle = document.getElementById('trichome-circle');
  var label = document.getElementById('trichome-label');
  var desc = document.getElementById('trichome-desc');
  var harvest = document.getElementById('trichome-harvest');
  var stages = [
    { name: 'Clear', color: '#eef0e8', emoji: '❄️', desc: 'Immature. THC not fully developed — wait longer before harvesting.', harvest: 'Too early', badge: 'badge--warn' },
    { name: 'Cloudy', color: '#f4f1e4', emoji: '☁️', desc: 'Peak THC content. Target 70–90% cloudy for maximum potency.', harvest: 'Harvest window', badge: 'badge--ok' },
    { name: 'Amber', color: '#c9a46b', emoji: '🍂', desc: 'THC converting to CBN. 70%+ amber = relaxing, sedative, body-heavy.', harvest: 'Slightly past peak', badge: 'badge--warn' }
  ];
  function update() {
    var v = parseInt(s.value, 10);
    var st = stages[v];
    circle.style.background = st.color;
    circle.textContent = st.emoji;
    label.textContent = st.name;
    desc.textContent = st.desc;
    harvest.textContent = st.harvest;
    harvest.className = 'badge ' + st.badge;
  }
  s.addEventListener('input', update);
  update();
})();

// Grow stage timeline
(function () {
  var track = document.getElementById('timeline-track');
  var panel = document.getElementById('timeline-panel');
  if (!track || !panel) return;
  var stages = [
    { k: 'germ', title: 'Germination (Days 1–7)', body: '<p><strong>What\'s happening:</strong> Seed shell cracks, taproot emerges.</p><p><strong>Conditions:</strong> 72–80°F, 70–90% RH, dark. No light or nutrients.</p><p><strong>Methods:</strong> Paper-towel (easiest), direct to soil (1/4–1/2 in deep), or rockwool/rapid-rooter plug for hydro.</p>' },
    { k: 'seed', title: 'Seedling (Weeks 1–3)', body: '<p><strong>Care:</strong> 18/6 light, 65–70% RH, 72–80°F. Water lightly near stem. No nutes in pre-amended soil; hydro at 1/4 strength after week 1.</p><p><strong>Watch for:</strong> Damping off (too wet) and stretching (light too far).</p>' },
    { k: 'veg', title: 'Vegetative (Weeks 2–8+)', body: '<p><strong>Care:</strong> 18/6, 70–85°F, 50–70% RH. <strong>N-heavy</strong> nutrients (~3:1:2). Water when top 2 in dry.</p><p><strong>Training:</strong> LST (easy), topping/FIM (moderate), SCROG (advanced). <em>Autoflowers: LST only — never top.</em></p><p><strong>Flip photoperiod to 12/12</strong> when plant is ~50% of desired final height.</p>' },
    { k: 'pre', title: 'Pre-Flower (Weeks 7–10)', body: '<p><strong>Transition.</strong> Show sex — pistils on females, pollen sacks on males (remove males).</p><p>Strict 12/12 — no light leaks. Begin shifting N→P/K. Lower RH toward 40–50%.</p>' },
    { k: 'flow', title: 'Flowering (Weeks 8–16)', body: '<p><strong>Buds form.</strong> 12/12 strict, 65–80°F day / 60–70°F night.</p><p><strong>RH:</strong> 45–55% early → <strong>35–45% late</strong> (critical — bud rot above 50%).</p><p><strong>NPK:</strong> Early 1:3:2 → peak 1:3:4 → flush 0:0:0 one week before harvest.</p>' }
  ];
  track.innerHTML = stages.map(function (s, i) {
    return '<div class="timeline__step' + (i === 0 ? ' active' : '') + '" data-i="' + i + '">' + s.title.split(' (')[0] + '<span>' + ('(' + s.title.split(' (')[1]) + '</span></div>';
  }).join('');
  function render(i) {
    panel.innerHTML = '<h3>' + stages[i].title + '</h3>' + stages[i].body;
    track.querySelectorAll('.timeline__step').forEach(function (el, idx) { el.classList.toggle('active', idx === i); });
  }
  track.addEventListener('click', function (e) {
    var step = e.target.closest('.timeline__step');
    if (!step) return;
    render(parseInt(step.dataset.i, 10));
  });
  render(0);
})();

// Checklist persistence
(function () {
  var lists = document.querySelectorAll('.checklist');
  lists.forEach(function (list) {
    var key = 'green.check.' + list.dataset.key;
    var saved = JSON.parse(localStorage.getItem(key) || '[]');
    list.querySelectorAll('li').forEach(function (li, i) {
      var cb = li.querySelector('input');
      if (saved[i]) { cb.checked = true; li.classList.add('done'); }
      li.addEventListener('click', function (e) {
        if (e.target.tagName !== 'INPUT') cb.checked = !cb.checked;
        li.classList.toggle('done', cb.checked);
        var state = Array.from(list.querySelectorAll('input')).map(function (x) { return x.checked; });
        localStorage.setItem(key, JSON.stringify(state));
      });
    });
  });
})();

