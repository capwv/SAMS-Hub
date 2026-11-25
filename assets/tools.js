/* SAMS Compass - tools.js (v6)
   1) شريط بحث سريع: بيدوّر في أسماء الوظايف والمهارات (SQL، مراجعة، Power BI...) ويفتح الوظيفة مباشرة.
   2) أداة مقارنة: تخصصين أو تلاتة جنب بعض (المواد، أصعب المهارات، المرتب، الريموت).
   كل الأرقام بتتحسب من نفس بيانات الموقع (data/majors.js + assets/app.js)، والإضافات اليدوية في data/compare.js.
   لو حصل أي خطأ هنا الموقع الأساسي بيشتغل عادي. */
(function () {
  'use strict';
  try {
    var out = document.getElementById('out'), tabsEl = document.getElementById('tabs');
    if (!out || !tabsEl || typeof M === 'undefined' || typeof CMP === 'undefined') return;

    var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
    var srSay = function (t) { var s = document.getElementById('sr'); if (s) s.textContent = t || ''; };
    var isBA = function (i) { return typeof BA !== 'undefined' && BA.indexOf(i) > -1; };
    var short = function (i) { return M[i].n.replace(/^إدارة الأعمال\s*[–-]\s*/, ''); };
    var toOut = function () { out.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' }); };

    /* =====================================================================
       الجزء 1: حسابات مشتركة (مرتبات + ريموت) من نفس منطق الموقع
       ===================================================================== */
    var med = function (a) {
      if (!a.length) return null;
      a = a.slice().sort(function (x, y) { return x - y; });
      var n = a.length;
      return n % 2 ? a[(n - 1) / 2] : (a[n / 2 - 1] + a[n / 2]) / 2;
    };
    var fmt = function (n) { return n == null || !isFinite(n) ? '—' : String(Math.round(n * 10) / 10); };
    // نفس قاعدة الموقع: لو الوظيفة مالهاش صف في RMT يبقى الشغل حضوري غالبًا
    var rmt = function (j) {
      return (typeof RMT !== 'undefined' && RMT.find(function (x) { return x[0].test(j.t); })) || [0, 0, 0, 1];
    };
    var jobName = function (j) { var p = sp(j.t); return p[1] || p[0]; };

    function stat(i) {
      var js = M[i].j, P = js.map(function (j) { return nums(j.s); });
      var e = P.filter(function (p) { return p[0]; }).map(function (p) { return p[0]; });
      var s = P.filter(function (p) { return p[1]; }).map(function (p) { return p[1]; });
      var r = js.map(rmt), hi = 0, mid = 0;
      r.forEach(function (x) { if (x[1] === 2) hi++; else if (x[1] === 1) mid++; });
      var score = js.length ? (hi + mid * 0.5) / js.length : 0;
      var top = js.map(function (j, k) { return { j: j, r: r[k] }; })
        .filter(function (o) { return o.r[1] === 2; })
        .sort(function (a, b) { return b.r[3] - a.r[3]; })
        .slice(0, 3).map(function (o) { return jobName(o.j); });
      var eLo = med(e.map(function (x) { return x[0]; })), eHi = med(e.map(function (x) { return x[1]; }));
      return {
        n: js.length, eLo: eLo, eHi: eHi, eMid: eLo != null && eHi != null ? (eLo + eHi) / 2 : 0,
        eMin: e.length ? Math.min.apply(null, e.map(function (x) { return x[0]; })) : null,
        eMax: e.length ? Math.max.apply(null, e.map(function (x) { return x[1]; })) : null,
        sLo: med(s.map(function (x) { return x[0]; })), sHi: med(s.map(function (x) { return x[1]; })),
        hi: hi, mid: mid, score: score, lvl: score >= 0.55 ? 2 : score >= 0.3 ? 1 : 0, top: top
      };
    }

    /* =====================================================================
       الجزء 2: أداة المقارنة
       ===================================================================== */
    var sel = [];          // الفهارس المختارة (حد أقصى 3)
    var MAXSEL = 3;
    var PAIRS = [[0, 5], [4, 1], [5, 4], [7, 8]];

    var cmpData = function (i) {
      var c = CMP[i] && CMP[i].n === M[i].n ? CMP[i] : null;
      return { subj: M[i].c || (c && c.subj) || [], hard: (c && c.hard) || [] };
    };

    var hashFor = function () { return '#compare' + (sel.length ? '=' + sel.join(',') : ''); };
    function syncHash(mode) {
      if (mode === 'none') return;
      try {
        if (location.hash !== hashFor()) history[mode === 'push' ? 'pushState' : 'replaceState'](null, '', hashFor());
      } catch (e) { /* مش مشكلة */ }
    }
    function parseHash(h) {
      var m = /^compare(?:=([\d,]*))?$/.exec(h || ''), r = [];
      if (!m) return null;
      (m[1] || '').split(',').forEach(function (x) {
        var n = parseInt(x, 10);
        if (!isNaN(n) && M[n] && r.indexOf(n) < 0 && r.length < MAXSEL) r.push(n);
      });
      return r;
    }

    function rowsHTML() {
      var st = sel.map(stat), cd = sel.map(cmpData);
      var maxMid = Math.max.apply(null, st.map(function (s) { return s.eMid; }).concat([1]));
      var best = function (vals) {
        var m = Math.max.apply(null, vals);
        return vals.every(function (v) { return v === m; }) ? vals.map(function () { return false; }) : vals.map(function (v) { return v === m; });
      };
      var bSal = best(st.map(function (s) { return s.eMid; })), bRem = best(st.map(function (s) { return s.score; }));
      var star = '<span class="cmp-star">الأعلى</span>';

      var rows = [
        ['نبذة', function (i) { return '<span class="cmp-d">' + esc(M[i].d) + '</span>'; }],
        ['أهم المواد', function (i, k) {
          return cd[k].subj.length ? '<ul class="cmp-l">' + cd[k].subj.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' : '—';
        }],
        ['أصعب المهارات', function (i, k) {
          return cd[k].hard.length ? '<ol class="cmp-l cmp-h">' + cd[k].hard.map(function (h) {
            return '<li><b>' + esc(h[0]) + '</b><small>' + esc(h[1]) + '</small></li>';
          }).join('') + '</ol>' : '—';
        }],
        ['راتب البداية', function (i, k) {
          var s = st[k];
          if (s.eLo == null) return '—';
          return '<div class="cmp-big"><span dir="ltr">' + fmt(s.eLo) + '–' + fmt(s.eHi) + '</span> <small>ألف جنيه شهريًا</small>' + (bSal[k] ? star : '') + '</div>' +
            '<div class="cmp-bar" aria-hidden="true"><i style="width:' + Math.max(6, Math.round(s.eMid / maxMid * 100)) + '%"></i></div>' +
            '<small class="cmp-sub">الوسيط بين ' + s.n + ' مجال. من ' + fmt(s.eMin) + ' لحد ' + fmt(s.eMax) + ' حسب المجال.</small>';
        }],
        ['بعد سنين خبرة', function (i, k) {
          var s = st[k];
          return s.sLo == null ? '—' : '<div class="cmp-big"><span dir="ltr">' + fmt(s.sLo) + '–' + fmt(s.sHi) + '</span> <small>ألف</small></div><small class="cmp-sub">الوسيط لمستوى سينيور أو مدير</small>';
        }],
        ['فرص الريموت', function (i, k) {
          var s = st[k];
          return '<div class="cmp-big"><span class="cmp-badge l' + s.lvl + '">' + LV[s.lvl] + '</span>' + (bRem[k] ? star : '') + '</div>' +
            '<small class="cmp-sub">' + (s.hi + s.mid) + ' من ' + s.n + ' مجال فيه طلب ريموت' + (s.hi ? ' (' + s.hi + ' منهم عالي)' : '') + '.</small>' +
            (s.top.length ? '<small class="cmp-sub"><b>الأقوى ريموت:</b> ' + s.top.map(esc).join('، ') + '</small>' : '<small class="cmp-sub">مفيش مجال بطلب ريموت عالي، أغلب الشغل حضوري.</small>');
        }],
        ['مجالات الشغل', function (i) {
          var js = M[i].j;
          return '<b>' + js.length + ' مجال</b><small class="cmp-sub">' + js.slice(0, 4).map(function (j) { return esc(jobName(j)); }).join('، ') + '…</small>';
        }],
        ['', function (i) { return '<button type="button" class="gtab" data-open="' + i + '">افتح التخصص</button>'; }]
      ];

      return rows.map(function (r) {
        return '<tr><th scope="row">' + r[0] + '</th>' + sel.map(function (i, k) {
          return '<td data-label="' + esc(short(i)) + '">' + r[1](i, k) + '</td>';
        }).join('') + '</tr>';
      }).join('');
    }

    function resHTML() {
      if (sel.length < 2) {
        return '<div class="job cmp-empty"><p style="margin:0"><b>' + (sel.length ? 'اختار تخصص تاني على الأقل' : 'اختار تخصصين على الأقل') + '</b> من اللي فوق وهتظهرلك المقارنة هنا. وتقدر تختار لحد ' + MAXSEL + '.</p>' +
          '<p class="gp" style="margin:.7rem 0 .4rem">أو جرّب مقارنة شائعة:</p><div class="cmp-pairs">' +
          PAIRS.map(function (p) { return '<button type="button" class="gtab" data-pair="' + p.join(',') + '">' + esc(short(p[0])) + ' × ' + esc(short(p[1])) + '</button>'; }).join('') +
          '</div></div>';
      }
      return '<div class="cmp-wrap"><table class="cmp-t"><caption class="sr-only">مقارنة بين ' + sel.map(function (i) { return esc(short(i)); }).join(' و ') + '</caption>' +
        '<thead><tr><th scope="col"><span class="sr-only">المعيار</span></th>' + sel.map(function (i) {
          return '<th scope="col"><span class="cmp-cn">' + esc(short(i)) + '</span>' + (isBA(i) ? '<small>ضمن إدارة الأعمال</small>' : '') + '</th>';
        }).join('') + '</tr></thead><tbody>' + rowsHTML() + '</tbody></table></div>' +
        '<p class="gnote" style="margin-top:1.2rem"><b>إزاي تقرأ الجدول:</b> المرتبات تقديرات تقريبية شهرية بالجنيه، أغلبها للقاهرة والمدن الكبيرة، والوسيط محسوب من مجالات كل تخصص في الموقع. شغل أسيوط والصعيد غالبًا أقل، والريموت بيقرّب الفرق. «أصعب المهارات» تقدير من فريق الموقع مش قياس رسمي، و«الأعلى» معناها أعلى رقم في المقارنة دي بس مش إنه الأحسن ليك. قارن الأرقام بـ Wuzzuf و LinkedIn قبل أي قرار.</p>' +
        '<div class="mt-4 flex flex-wrap gap-2"><button type="button" class="gtab" data-quiz="1"><i aria-hidden="true" class="fa-solid fa-compass"></i> لسه محتار؟ اعمل اختبار تحديد التخصص</button><button type="button" class="gtab" data-reset="1">امسح الاختيار</button></div>';
    }

    function syncChips() {
      [].forEach.call(out.querySelectorAll('.cmp-chip'), function (b) {
        b.setAttribute('aria-pressed', sel.indexOf(+b.getAttribute('data-i')) > -1 ? 'true' : 'false');
      });
    }

    function paint(scroll) {
      var res = document.getElementById('cmpRes'); if (!res) return;
      res.innerHTML = resHTML();
      syncChips();
      srSay(sel.length >= 2 ? 'بتقارن بين: ' + sel.map(short).join(' و ') : 'اختار تخصصين على الأقل');
      if (scroll && sel.length >= 2) {
        var r = res.getBoundingClientRect();
        if (r.top > innerHeight * 0.6) res.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      }
    }

    function mount(mode, focus) {
      [].forEach.call(tabsEl.children, function (b) { b.setAttribute('aria-pressed', 'false'); });
      out.innerHTML =
        '<div id="cmpRoot"></div>' +
        '<h2 class="text-2xl md:text-3xl font-black text-white mb-2">قارن بين التخصصات</h2>' +
        '<p class="gp">محتار بين تخصصين؟ اختار من اللي تحت (لحد ' + MAXSEL + ') وشوف المواد وأصعب المهارات والمرتب وفرص الريموت جنب بعض.</p>' +
        '<div class="cmp-chips" role="group" aria-label="اختار التخصصات اللي عايز تقارن بينها">' +
        M.map(function (m, i) { return '<button type="button" class="gtab cmp-chip" data-i="' + i + '" aria-pressed="false" title="' + esc(m.n) + '">' + esc(short(i)) + '</button>'; }).join('') +
        '</div><div id="cmpRes"></div>';
      paint(false);
      syncHash(mode);
      document.title = 'مقارنة التخصصات | SAMS Compass';
      if (focus) {
        var h = out.querySelector('h2'); if (h) { h.setAttribute('tabindex', '-1'); h.style.outline = 'none'; h.focus({ preventScroll: true }); }
      }
    }

    function toggle(i) {
      var k = sel.indexOf(i);
      if (k > -1) sel.splice(k, 1);
      else { if (sel.length >= MAXSEL) sel.shift(); sel.push(i); }
      paint(true);
      syncHash('replace');
    }

    function openCompare(arr, mode, focus) {
      sel = arr.slice(0, MAXSEL);
      mount(mode, focus);
    }

    out.addEventListener('click', function (e) {
      if (!out.querySelector('#cmpRoot')) return;
      var t = e.target.closest ? e.target.closest('button') : null; if (!t) return;
      if (t.classList.contains('cmp-chip')) return toggle(+t.getAttribute('data-i'));
      if (t.hasAttribute('data-pair')) { sel = t.getAttribute('data-pair').split(',').map(Number); paint(true); return syncHash('replace'); }
      if (t.hasAttribute('data-open')) return show(+t.getAttribute('data-open'));
      if (t.hasAttribute('data-quiz') && typeof showQuiz === 'function') return showQuiz();
      if (t.hasAttribute('data-reset')) { sel = []; paint(false); syncHash('replace'); }
    });

    /* =====================================================================
       الجزء 3: البحث السريع
       ===================================================================== */
    var norm = function (s) {
      return String(s == null ? '' : s).toLowerCase()
        .replace(/[\u064B-\u065F\u0670\u0640]/g, '')
        .replace(/[أإآٱ]/g, 'ا').replace(/ى/g, 'ي').replace(/ئ/g, 'ي').replace(/ؤ/g, 'و').replace(/ة/g, 'ه')
        .replace(/[^a-z0-9\u0600-\u06ff+#&.]+/g, ' ').trim();
    };
    var stem = function (w) {
      w = w.replace(/^[.&]+|[.&]+$/g, '');
      if (!/[\u0600-\u06ff]/.test(w)) return w;
      if (w.length > 4 && w.slice(0, 2) === 'ال') w = w.slice(2);
      if (w.length > 4 && /(ات|ون|ين)$/.test(w)) w = w.slice(0, -2);
      else if (w.length > 3 && /[هي]$/.test(w)) w = w.slice(0, -1);
      return w;
    };
    var words = function (s) { return norm(s).split(' ').map(stem).filter(Boolean); };

    // كلمات بمعنى واحد بالعربي والإنجليزي والعامية
    var ALIASES = [
      ['بيانات', 'data', 'داتا'], ['مراجعة', 'مراجع', 'audit', 'تدقيق', 'مدقق'], ['ضرائب', 'ضريبة', 'ضرايب', 'tax'],
      ['تسويق', 'marketing', 'ماركتنج'], ['محاسبة', 'محاسب', 'accounting', 'accountant', 'حسابات'],
      ['تمويل', 'finance', 'financial', 'مالي'], ['توظيف', 'recruiter', 'recruitment', 'hr'],
      ['أمن', 'security', 'cyber', 'سيبراني'], ['برمجة', 'programming', 'developer', 'مطور', 'coding'],
      ['تصميم', 'design', 'ux', 'ui'], ['بنك', 'بنوك', 'banking', 'مصرفي'], ['طاقة', 'energy', 'بترول', 'petroleum'],
      ['اقتصاد', 'economics', 'economist'], ['اكتواري', 'actuary', 'actuarial', 'تأمين', 'insurance'],
      ['مشروعات', 'مشاريع', 'project'], ['تحليل', 'analysis', 'analyst', 'analytics', 'محلل'],
      ['مبيعات', 'sales'], ['اكسيل', 'excel'], ['بايثون', 'python'], ['جودة', 'quality', 'qa'], ['تدريب', 'training']
    ].map(function (g) { return g.map(function (x) { return stem(norm(x)); }); });

    var expand = function (t) {
      var alts = [t];
      ALIASES.forEach(function (g) {
        var hit = g.some(function (m) { return m === t || (t.length >= 3 && m.indexOf(t) === 0); });
        if (hit) g.forEach(function (m) { if (alts.indexOf(m) < 0) alts.push(m); });
      });
      return alts;
    };
    var hasW = function (ws, alts) {
      return ws.some(function (w) { return alts.some(function (a) { return w.indexOf(a) === 0; }); });
    };

    var IDX = [];
    M.forEach(function (m, i) {
      m.j.forEach(function (j, x) {
        IDX.push({ i: i, x: x, t: words(j.t), r: words(j.r), w: words(j.w), u: words(j.u), l: words((j.l || []).join(' ')), mn: words(m.n) });
      });
    });
    var MIDX = M.map(function (m, i) { return { i: i, w: words(m.n) }; });

    var WHY = { r: 'مطلوب في الوظيفة', w: 'ضمن خطة التعلّم', u: 'ضمن شغل الوظيفة', l: 'ضمن التدرج الوظيفي', mn: '' };
    var WT = { t: 10, r: 6, w: 4, u: 3, mn: 2, l: 1 };

    function search(q) {
      var toks = norm(q).split(' ').map(stem).filter(function (t) { return t.length >= 2; });
      if (!toks.length) return { items: [], total: 0, majors: 0 };
      var alts = toks.map(expand), items = [];
      MIDX.forEach(function (m) {
        if (alts.every(function (a) { return hasW(m.w, a); })) items.push({ type: 'major', i: m.i, score: 100 });
      });
      IDX.forEach(function (d) {
        var score = 0, fields = [], ok = alts.every(function (a) {
          var best = 0, bf = '';
          ['t', 'r', 'w', 'u', 'mn', 'l'].forEach(function (f) { if (WT[f] > best && hasW(d[f], a)) { best = WT[f]; bf = f; } });
          if (!best) return false;
          score += best; fields.push(bf);
          return true;
        });
        if (!ok) return;
        // سبب الظهور: لو الكلمة في العنوان مفيش داعي نقول، غير كده نقول أقوى مكان ظهرت فيه
        var why = '';
        if (fields.indexOf('t') < 0) {
          fields.sort(function (a, b) { return WT[b] - WT[a]; });
          why = WHY[fields[0]] || '';
        }
        items.push({ type: 'job', i: d.i, x: d.x, score: score, why: why });
      });
      items.sort(function (a, b) { return b.score - a.score || a.i - b.i || (a.x || 0) - (b.x || 0); });
      var jobs = items.filter(function (r) { return r.type === 'job'; }), seen = {};
      jobs.forEach(function (r) { seen[r.i] = 1; });
      return { items: items.slice(0, 20), total: jobs.length, majors: Object.keys(seen).length };
    }

    function injectUI() {
      tabsEl.insertAdjacentHTML('beforebegin',
        '<button type="button" class="qz-cta cmp-cta" id="cmpCta"><span class="qz-ic"><i aria-hidden="true" class="fa-solid fa-scale-balanced"></i></span>' +
        '<span class="qz-tx"><b>محتار بين تخصصين؟ قارن بينهم جنب بعض</b><small>المواد وأصعب المهارات ومتوسط راتب البداية وفرص الريموت في جدول واحد</small></span>' +
        '<i aria-hidden="true" class="fa-solid fa-arrow-left"></i></button>' +
        '<div class="srch-box" role="search"><div class="srch"><i aria-hidden="true" class="fa-solid fa-magnifying-glass srch-i"></i>' +
        '<input id="qs" type="search" dir="auto" role="combobox" aria-expanded="false" aria-controls="qsl" aria-autocomplete="list" autocomplete="off" autocapitalize="off" spellcheck="false" enterkeyhint="search" ' +
        'placeholder="دوّر على وظيفة أو مهارة…" aria-label="بحث عن وظيفة أو مهارة">' +
        '<ul id="qsl" role="listbox" aria-label="نتائج البحث" hidden></ul></div>' +
        '<div class="qs-hints"><span>جرّب:</span>' +
        ['SQL', 'مراجعة', 'Excel', 'Power BI', 'تسويق', 'ضرائب'].map(function (h) { return '<button type="button" data-q="' + h + '">' + h + '</button>'; }).join('') +
        '</div></div>');

      var inp = document.getElementById('qs'), list = document.getElementById('qsl'), box = inp.parentNode.parentNode;
      var cur = [], act = -1;

      var setAct = function (k) {
        var opts = list.querySelectorAll('.qs-i');
        [].forEach.call(opts, function (o) { o.setAttribute('aria-selected', 'false'); });
        act = opts.length ? (k + opts.length) % opts.length : -1;
        if (act > -1) {
          opts[act].setAttribute('aria-selected', 'true');
          inp.setAttribute('aria-activedescendant', opts[act].id);
          opts[act].scrollIntoView({ block: 'nearest' });
        } else inp.removeAttribute('aria-activedescendant');
      };
      var close = function () { list.hidden = true; inp.setAttribute('aria-expanded', 'false'); inp.removeAttribute('aria-activedescendant'); act = -1; };
      var openList = function () { list.hidden = false; inp.setAttribute('aria-expanded', 'true'); };

      function render() {
        var q = inp.value;
        if (!norm(q)) { close(); return; }
        var r = search(q); cur = r.items;
        if (!cur.length) {
          list.innerHTML = '<li class="qs-empty" role="presentation">مفيش نتايج لـ «<b>' + esc(q.trim()) + '</b>». جرّب كلمة تانية أو اسم الوظيفة بالإنجليزي.</li>';
          srSay('مفيش نتايج');
        } else {
          var k = 0;
          list.innerHTML = '<li class="qs-sum" role="presentation">' + (r.total ? r.total + ' وظيفة في ' + r.majors + ' تخصص' : 'تخصصات مطابقة') + '</li>' +
            cur.map(function (it) {
              var id = 'qs-o' + (k++);
              if (it.type === 'major') {
                return '<li role="option" id="' + id + '" class="qs-i qs-maj" aria-selected="false" data-k="' + (k - 1) + '"><span class="qs-t"><b>' + esc(M[it.i].n) + '</b></span><span class="qs-m">تخصص · افتح التخصص</span></li>';
              }
              var j = M[it.i].j[it.x], p = sp(j.t), pr = nums(j.s), sal = pr[0] ? pr[0].join('–') + ' ألف بداية' : '';
              return '<li role="option" id="' + id + '" class="qs-i" aria-selected="false" data-k="' + (k - 1) + '"><span class="qs-t"><b>' + esc(p[1] || p[0]) + '</b>' +
                (p[1] ? ' <small dir="ltr">' + esc(p[0]) + '</small>' : '') + '</span><span class="qs-m">' + esc(short(it.i)) + (sal ? ' · ' + sal : '') + '</span>' +
                (it.why ? '<span class="qs-w">' + it.why + '</span>' : '') + '</li>';
            }).join('');
          srSay((r.total || cur.length) + ' نتيجة');
        }
        openList(); act = -1;
      }

      function choose(k) {
        var it = cur[k]; if (!it) return;
        close(); inp.value = ''; inp.blur();
        if (it.type === 'major') show(it.i); else { show(it.i); job(it.i, it.x); }
        toOut();
      }

      inp.addEventListener('input', render);
      inp.addEventListener('focus', function () { if (norm(inp.value)) render(); });
      inp.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') { close(); return; }
        if (list.hidden) { if (e.key === 'ArrowDown' && norm(inp.value)) { render(); e.preventDefault(); } return; }
        if (e.key === 'ArrowDown') { setAct(act + 1); e.preventDefault(); }
        else if (e.key === 'ArrowUp') { setAct(act < 0 ? -1 : act - 1); e.preventDefault(); }
        else if (e.key === 'Enter') { if (cur.length) { choose(act > -1 ? act : 0); e.preventDefault(); } }
      });
      list.addEventListener('mousedown', function (e) { e.preventDefault(); }); // يمنع قفل القايمة قبل الضغطة
      list.addEventListener('click', function (e) {
        var li = e.target.closest ? e.target.closest('.qs-i') : null;
        if (li) choose(+li.getAttribute('data-k'));
      });
      box.querySelector('.qs-hints').addEventListener('click', function (e) {
        var b = e.target.closest ? e.target.closest('button[data-q]') : null; if (!b) return;
        inp.value = b.getAttribute('data-q'); inp.focus(); render();
      });
      document.addEventListener('pointerdown', function (e) { if (!box.contains(e.target)) close(); }, { passive: true });

      document.getElementById('cmpCta').addEventListener('click', function () {
        if (out.querySelector('#cmpRoot')) { toOut(); return; }
        openCompare(sel, 'push', true); toOut();
      });
    }

    injectUI();

    // ربط الأداة بالـ router بتاع app.js (الرجوع والتقدّم في المتصفح + فتح اللينك مباشرة)
    window.SAMSTools = {
      compare: function (h) { var r = parseHash(h); if (r) openCompare(r, 'none', false); return !!r; }
    };
    var first = parseHash(location.hash.slice(1));
    if (first) openCompare(first, 'none', false);
  } catch (err) { if (window.console) console.warn('tools:', err); }
})();
