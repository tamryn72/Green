// Quiz engine + quiz definitions
(function () {
  var QUIZZES = {
    strain: {
      questions: [
        { q: 'First grow?', options: [
          { label: 'Yes, total beginner', add: { easy: 2, auto: 2 } },
          { label: 'Done one or two', add: { easy: 1, hybrid: 1 } },
          { label: 'Experienced', add: { sativa: 1, hybrid: 1 } }
        ]},
        { q: 'Where are you growing?', options: [
          { label: 'Indoor tent', add: { indica: 1, easy: 1 } },
          { label: 'Outdoor, Virginia', add: { auto: 2, sativa: 1 } },
          { label: 'Small balcony / stealth', add: { auto: 2 } }
        ]},
        { q: "What's the goal?", options: [
          { label: 'Max potency & yield', add: { hybrid: 2, sativa: 1 } },
          { label: 'Fast, easy, forgiving', add: { auto: 2, easy: 1 } },
          { label: 'Relaxing body-heavy effect', add: { indica: 2 } },
          { label: 'Uplifting daytime effect', add: { sativa: 2 } }
        ]},
        { q: 'Space constraints?', options: [
          { label: 'Tight — under 3 ft please', add: { auto: 2, indica: 1 } },
          { label: 'Moderate — 3–5 ft', add: { hybrid: 1, indica: 1 } },
          { label: 'Lots of room', add: { sativa: 2 } }
        ]}
      ],
      resolve: function (s) {
        var picks = [
          { k: 'auto', title: 'Autoflower', pick: 'Northern Lights Auto', why: 'Compact, fast (65–75 days), forgiving. Plant May, harvest July. Ideal for Virginia outdoor and beginners.' },
          { k: 'indica', title: 'Indica', pick: 'Northern Lights', why: 'Short, bushy, pest-resistant. 7–9 week flower. Handles temp swings. The classic first grow.' },
          { k: 'hybrid', title: 'Hybrid', pick: 'Gorilla Glue #4 or Blue Dream', why: 'Big yield, forgiving, great terpenes. Sweet spot for potency + ease.' },
          { k: 'sativa', title: 'Sativa', pick: 'Amnesia Haze', why: 'Long flower but rewarding. Loves VA summer heat outdoors. Uplifting.' },
          { k: 'easy', title: 'Easy-mode', pick: 'White Widow', why: 'Legendary stable genetics. Trichome-heavy. Forgiving indoors or out.' }
        ];
        var best = picks[0], hi = -1;
        picks.forEach(function (p) { if ((s[p.k] || 0) > hi) { hi = s[p.k]; best = p; } });
        return '<h4>Try a ' + best.title + ' &mdash; <em>' + best.pick + '</em></h4><p>' + best.why + '</p>';
      }
    },

    method: {
      questions: [
        { q: 'Budget?', options: [
          { label: 'Low — under $300', add: { outdoor: 2 } },
          { label: 'Moderate — $300–800', add: { indoor: 2 } },
          { label: 'High — $800+', add: { hydro: 2, indoor: 1 } }
        ]},
        { q: 'Time commitment?', options: [
          { label: 'Set and forget', add: { outdoor: 2 } },
          { label: 'Check daily', add: { indoor: 2 } },
          { label: 'Tinker constantly', add: { hydro: 2 } }
        ]},
        { q: 'Year-round or seasonal?', options: [
          { label: 'Seasonal is fine', add: { outdoor: 2 } },
          { label: 'Year-round', add: { indoor: 2, hydro: 1 } }
        ]},
        { q: 'Experience?', options: [
          { label: 'Beginner', add: { indoor: 1, outdoor: 1 } },
          { label: 'Intermediate', add: { indoor: 2 } },
          { label: 'Advanced / want speed', add: { hydro: 2 } }
        ]}
      ],
      resolve: function (s) {
        var picks = [
          { k: 'indoor', title: 'Indoor tent', why: 'Full control, year-round, solves legal visibility + access in one locked setup. Fabrizio’s default for most Virginia growers.' },
          { k: 'outdoor', title: 'Outdoor garden', why: 'Cheapest, easiest, lowest time-investment. Pair with autoflowers to fit Virginia’s May–October window.' },
          { k: 'hydro', title: 'DWC hydroponics', why: 'Up to 50% faster growth. No soil. Precise but unforgiving. Only recommended after one soil grow.' }
        ];
        var best = picks[0], hi = -1;
        picks.forEach(function (p) { if ((s[p.k] || 0) > hi) { hi = s[p.k]; best = p; } });
        return '<h4>Go ' + best.title + '</h4><p>' + best.why + '</p>';
      }
    },

    bug: {
      questions: [
        { q: 'Where is the damage?', options: [
          { label: 'Underside of leaves', add: { mite: 2 } },
          { label: 'Top surface of leaves', add: { thrip: 2, pm: 1 } },
          { label: 'New growth is twisted/glossy', add: { broad: 3 } },
          { label: 'Holes in leaves or buds', add: { cat: 3 } },
          { label: 'Flying around soil', add: { gnat: 3 } }
        ]},
        { q: 'What do you see?', options: [
          { label: 'Fine webbing', add: { mite: 3 } },
          { label: 'Silver/bronze streaks', add: { thrip: 3 } },
          { label: 'Yellow stippling dots', add: { mite: 2 } },
          { label: 'White powder coating', add: { pm: 3 } },
          { label: 'Black pepper-like droppings', add: { thrip: 2, cat: 2 } },
          { label: 'Sticky honeydew', add: { aphid: 3 } }
        ]},
        { q: 'Where on the plant?', options: [
          { label: 'Clustered on new tips', add: { aphid: 2 } },
          { label: 'Everywhere, fast-spreading', add: { mite: 2, pm: 1 } },
          { label: 'Inside dense buds', add: { rot: 3, cat: 1 } }
        ]}
      ],
      resolve: function (s) {
        var picks = [
          { k: 'mite', title: 'Spider mites', fix: 'Water-blast undersides; neem every 3 days; predatory mites; keep RH above 60% in veg.' },
          { k: 'thrip', title: 'Thrips', fix: 'Spinosad (most effective), blue sticky traps, insecticidal soap.' },
          { k: 'broad', title: 'Broad / russet mites', fix: 'Invisible to the eye. Neem, spinosad, predatory Neoseiulus. Confirm with 60x+ scope.' },
          { k: 'cat', title: 'Caterpillars / hemp borers', fix: 'Bt kurstaki spray, spinosad, handpick, Trichogramma wasps.' },
          { k: 'gnat', title: 'Fungus gnats', fix: 'Let soil dry between waterings, yellow sticky traps, Bti drench, beneficial nematodes.' },
          { k: 'aphid', title: 'Aphids', fix: 'Water blast, insecticidal soap, neem, release ladybugs.' },
          { k: 'pm', title: 'Powdery mildew', fix: 'Remove leaves, potassium bicarbonate spray, improve airflow, RH below 50% in flower.' },
          { k: 'rot', title: 'Bud rot (Botrytis)', fix: 'Cut 2–3 cm beyond visible rot, sterilize scissors, dispose (don’t compost), lower RH below 45%.' }
        ];
        var best = picks[0], hi = -1;
        picks.forEach(function (p) { if ((s[p.k] || 0) > hi) { hi = s[p.k]; best = p; } });
        return '<h4>Likely: ' + best.title + '</h4><p><strong>Fix:</strong> ' + best.fix + '</p><p class="muted">Not sure? Cross-check the Pests &amp; Disease section.</p>';
      }
    },

    harvest: {
      questions: [
        { q: 'Trichome color (check buds, not sugar leaves)?', options: [
          { label: 'Mostly clear / transparent', add: { wait: 3 } },
          { label: 'Mix of clear + cloudy', add: { soon: 3 } },
          { label: 'Mostly cloudy/milky', add: { go: 3 } },
          { label: 'Getting amber tints', add: { go: 2, past: 1 } },
          { label: 'Mostly amber', add: { past: 3 } }
        ]},
        { q: 'Pistils (hairs)?', options: [
          { label: 'Mostly white, straight', add: { wait: 2 } },
          { label: 'Half orange/red', add: { soon: 2 } },
          { label: '70–90% darkened, curled', add: { go: 2 } }
        ]},
        { q: 'How many weeks since 12/12 flip (or since plant started flowering for autos)?', options: [
          { label: 'Under 6', add: { wait: 2 } },
          { label: '6–8', add: { soon: 2 } },
          { label: '8+', add: { go: 1 } }
        ]}
      ],
      resolve: function (s) {
        var options = [
          { k: 'wait', title: 'Not yet &mdash; wait', why: 'Harvesting too early is the #1 beginner mistake. The last 1–2 weeks add 15–25% of final weight and peak trichome development.' },
          { k: 'soon', title: 'Getting close &mdash; start the flush', why: 'Begin plain pH-adjusted water. Check trichomes every 2–3 days. Harvest in 7–14 days.' },
          { k: 'go', title: 'Harvest window &mdash; go', why: 'Peak THC. Morning harvest after the dark period. Sterilize tools. Prep the dry room at 60–65°F / 55–62% RH.' },
          { k: 'past', title: 'Past peak &mdash; harvest now', why: 'You’re heading into sedative/couch-lock territory. If that’s the goal, perfect. If not, cut today.' }
        ];
        var best = options[0], hi = -1;
        options.forEach(function (p) { if ((s[p.k] || 0) > hi) { hi = s[p.k]; best = p; } });
        return '<h4>' + best.title + '</h4><p>' + best.why + '</p>';
      }
    },

    deficiency: {
      questions: [
        { q: 'Where is the discoloration?', options: [
          { label: 'Lower, older leaves yellowing', add: { n: 3 } },
          { label: 'Upper, newer leaves yellowing', add: { ca: 3 } },
          { label: 'Leaf edges burnt/crispy', add: { burn: 3 } },
          { label: 'Spotty brown patches', add: { ca: 1, fungus: 2 } }
        ]},
        { q: 'Any coating, webbing, or movement?', options: [
          { label: 'White powder', add: { fungus: 4 } },
          { label: 'None &mdash; just color change', add: { n: 1, ca: 1 } },
          { label: 'Fine webbing', add: { pest: 5 } }
        ]},
        { q: 'Did you check pH recently?', options: [
          { label: 'Yes, in range', add: { n: 1, ca: 1 } },
          { label: 'No', add: { ph: 3 } },
          { label: 'Out of range', add: { ph: 4 } }
        ]}
      ],
      resolve: function (s) {
        var picks = [
          { k: 'ph', title: 'Check pH first', fix: 'Most &ldquo;deficiencies&rdquo; are lockout from pH out of range. Soil 6.0–7.0, hydro 5.8–6.3. Fix pH before adding anything.' },
          { k: 'n', title: 'Nitrogen (or mobile nutrient) deficiency', fix: 'Bottom-up yellowing in veg usually means N. Bump feeds &mdash; Fox Farm Grow Big half-dose and see.' },
          { k: 'ca', title: 'Calcium / iron deficiency', fix: 'Top-down yellowing. Add CalMag, especially in hydro/coco and with soft water.' },
          { k: 'burn', title: 'Nutrient burn', fix: 'Back off feeds. Flush with plain pH’d water. Watch runoff EC.' },
          { k: 'fungus', title: 'Fungal disease (powdery mildew)', fix: 'Not a deficiency. Potassium bicarbonate spray, airflow, RH below 50%.' },
          { k: 'pest', title: 'Pest, not deficiency', fix: 'Jump to the bug quiz &mdash; webbing means mites until proven otherwise.' }
        ];
        var best = picks[0], hi = -1;
        picks.forEach(function (p) { if ((s[p.k] || 0) > hi) { hi = s[p.k]; best = p; } });
        return '<h4>' + best.title + '</h4><p><strong>Fix:</strong> ' + best.fix + '</p>';
      }
    },

    ph: {
      questions: [
        { q: 'Medium?', options: [
          { label: 'Soil', add: { soil: 2 } },
          { label: 'Coco', add: { coco: 2 } },
          { label: 'Hydro / DWC', add: { hydro: 2 } }
        ]},
        { q: 'What direction is it drifting?', options: [
          { label: 'Climbing up (alkaline)', add: { up: 2 } },
          { label: 'Dropping down (acidic)', add: { down: 2 } },
          { label: 'Bouncing both ways', add: { unstable: 3 } }
        ]},
        { q: 'How old is the reservoir / last water?', options: [
          { label: 'Fresh today', add: { fresh: 1 } },
          { label: '3+ days old', add: { old: 2 } }
        ]}
      ],
      resolve: function (s) {
        var out = [];
        if (s.hydro) out.push('<strong>Hydro target:</strong> 5.8–6.3. Drift is normal &mdash; as plants eat nutrients, pH moves.');
        if (s.coco) out.push('<strong>Coco target:</strong> 5.8–6.2. Coco has almost no buffer &mdash; check every watering.');
        if (s.soil) out.push('<strong>Soil target:</strong> 6.0–7.0. Soil buffers; big swings usually mean salt buildup &mdash; flush.');
        if (s.up) out.push('Rising pH: plants absorbing more anions, or alkaline tap water. Use pH Down to correct.');
        if (s.down) out.push('Dropping pH: root zone respiration, or acidic runoff. pH Up + investigate root health.');
        if (s.unstable) out.push('Unstable pH usually = root rot (hydro) or salt buildup (soil). Check roots in DWC; flush in soil.');
        if (s.old) out.push('Reservoir older than 3 days? Change it. Nutrients have degraded regardless of pH.');
        if (!out.length) out.push('Check your meter calibration first &mdash; drifting meters are more common than drifting rootzones.');
        return '<h4>pH troubleshooting</h4><ul><li>' + out.join('</li><li>') + '</li></ul>';
      }
    }
  };

  function render(el, quizKey) {
    var quiz = QUIZZES[quizKey];
    if (!quiz) return;
    var state = { i: 0, scores: {} };

    function step() {
      if (state.i >= quiz.questions.length) {
        el.innerHTML = '<div class="quiz__result">' + quiz.resolve(state.scores) + '<button class="quiz__restart" type="button">&#8635; Retake</button></div>';
        el.querySelector('.quiz__restart').addEventListener('click', function () { state = { i: 0, scores: {} }; step(); });
        return;
      }
      var q = quiz.questions[state.i];
      var bar = quiz.questions.map(function (_, idx) { return '<span' + (idx <= state.i ? ' class="done"' : '') + '></span>'; }).join('');
      var opts = q.options.map(function (o, idx) { return '<button type="button" data-i="' + idx + '">' + o.label + '</button>'; }).join('');
      el.innerHTML = '<div class="quiz__progress">' + bar + '</div><p class="quiz__q">' + q.q + '</p><div class="quiz__options">' + opts + '</div>';
      el.querySelectorAll('.quiz__options button').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var pick = q.options[parseInt(btn.dataset.i, 10)];
          Object.keys(pick.add || {}).forEach(function (k) { state.scores[k] = (state.scores[k] || 0) + pick.add[k]; });
          state.i++;
          step();
        });
      });
    }
    step();
  }

  document.querySelectorAll('.quiz').forEach(function (d) {
    var body = d.querySelector('[data-quiz-body]');
    var key = d.dataset.quiz;
    var started = false;
    d.addEventListener('toggle', function () {
      if (d.open && !started) { render(body, key); started = true; }
    });
  });
})();
