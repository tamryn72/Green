// Grow journal with localStorage
(function () {
  var KEY = 'green.journal.v1';
  var form = document.getElementById('journal-form');
  var list = document.getElementById('journal-list');
  var clearBtn = document.getElementById('journal-clear');
  var exportBtn = document.getElementById('journal-export');
  if (!form || !list) return;

  function load() { try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch (e) { return []; } }
  function save(arr) { localStorage.setItem(KEY, JSON.stringify(arr)); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function fmt(ts) { var d = new Date(ts); return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); }

  function render() {
    var entries = load().sort(function (a, b) { return b.ts - a.ts; });
    if (!entries.length) {
      list.innerHTML = '<div class="journal__empty">No entries yet. Log your first feeding, pH reading, or training session above.</div>';
      return;
    }
    list.innerHTML = entries.map(function (e) {
      return '<article class="journal__entry" data-id="' + e.id + '">' +
        '<h4>' + esc(e.title) + ' <span class="badge badge--ok">' + esc(e.stage) + '</span> <span class="badge badge--hybrid">' + esc(e.plant) + '</span></h4>' +
        '<div class="journal__meta">' + fmt(e.ts) + '</div>' +
        (e.body ? '<p class="journal__body">' + esc(e.body) + '</p>' : '') +
        '<button class="journal__delete" type="button">Delete</button>' +
        '</article>';
    }).join('');
    list.querySelectorAll('.journal__delete').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.closest('.journal__entry').dataset.id;
        save(load().filter(function (e) { return String(e.id) !== String(id); }));
        render();
      });
    });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var data = new FormData(form);
    var entry = {
      id: Date.now() + '-' + Math.random().toString(36).slice(2, 7),
      ts: Date.now(),
      plant: (data.get('plant') || '').toString().trim(),
      stage: (data.get('stage') || '').toString(),
      title: (data.get('title') || '').toString().trim(),
      body: (data.get('body') || '').toString().trim()
    };
    if (!entry.plant || !entry.title) return;
    var all = load(); all.push(entry); save(all);
    form.reset();
    render();
  });

  clearBtn && clearBtn.addEventListener('click', function () {
    if (confirm('Delete ALL journal entries on this device?')) { save([]); render(); }
  });

  exportBtn && exportBtn.addEventListener('click', function () {
    var data = JSON.stringify(load(), null, 2);
    var blob = new Blob([data], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'grow-journal-' + new Date().toISOString().slice(0, 10) + '.json';
    document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
  });

  render();
})();
