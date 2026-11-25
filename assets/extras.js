/* SAMS Compass - extras.js
   تحسينات الواجهة فوق app.js: ملخص سريع لكل وظيفة، فهرس للصفحة الطويلة، روابط مقارنة المرتبات،
   مرتب على كروت المجالات، "ابدأ من أول سنة"، إشعار نسخ بدل alert، وزر الرجوع لفوق.
   لو حصل أي خطأ هنا الموقع الأساسي بيشتغل عادي. */
(function () {
  'use strict';
  var out = document.getElementById('out');
  if (!out || typeof M === 'undefined') return;

  var enc = encodeURIComponent;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };

  /* ---------- حركة أقل لمن يفضّل ذلك ---------- */
  if (reduce) {
    var _sv = Element.prototype.scrollIntoView;
    Element.prototype.scrollIntoView = function (o) {
      if (o && typeof o === 'object') o = Object.assign({}, o, { behavior: 'auto' });
      return _sv.call(this, o);
    };
  }

  /* ---------- إشعار قصير (بدل alert) ---------- */
  var toastEl = document.createElement('div');
  toastEl.id = 'toast'; toastEl.className = 'toast'; toastEl.setAttribute('role', 'status'); toastEl.setAttribute('aria-live', 'polite');
  document.body.appendChild(toastEl);
  var toastT = 0;
  function toast(msg) {
    toastEl.textContent = msg; toastEl.classList.add('on');
    clearTimeout(toastT); toastT = setTimeout(function () { toastEl.classList.remove('on'); }, 2200);
  }
  function copyText(s, okMsg) {
    var done = function () { toast(okMsg || 'تم النسخ'); };
    var fallback = function () {
      try {
        var ta = document.createElement('textarea'); ta.value = s; ta.setAttribute('readonly', '');
        ta.style.cssText = 'position:fixed;top:-999px'; document.body.appendChild(ta); ta.select();
        var ok = document.execCommand('copy'); document.body.removeChild(ta);
        if (ok) done(); else prompt('انسخ من هنا:', s);
      } catch (e) { prompt('انسخ من هنا:', s); }
    };
    try { navigator.clipboard.writeText(s).then(done, fallback); } catch (e) { fallback(); }
  }

  /* نتيجة الاختبار: نسخ + رابط الاختبار */
  if (typeof qzCopy === 'function') {
    qzCopy = function () {
      var r = qzCalc(), t = r.ms[0], m = M[t.i];
      var f = t.f.slice(0, 3).map(function (x) { return sp(M[t.i].j[x.x].t)[0]; }).join('، ');
      copyText('نتيجة اختبار SAMS Compass: أنسب تخصص ليا "' + m.n + '". أنسب المجالات: ' + f + '.\n' +
        location.origin + location.pathname + '#quiz', 'اتنسخت النتيجة مع رابط الاختبار');
    };
  }

  /* ---------- زر الرجوع لفوق ---------- */
  var up = document.createElement('button');
  up.type = 'button'; up.className = 'to-top'; up.setAttribute('aria-label', 'الرجوع لأول الصفحة');
  up.innerHTML = '<i aria-hidden="true" class="fa-solid fa-arrow-up"></i>';
  up.onclick = function () { window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); };
  document.body.appendChild(up);
  var upTick = false;
  addEventListener('scroll', function () {
    if (upTick) return; upTick = true;
    requestAnimationFrame(function () { up.classList.toggle('on', scrollY > 900); upTick = false; });
  }, { passive: true });

  /* ---------- مساعدات ---------- */
  function cur() {
    var h = location.hash.slice(1), m;
    if ((m = h.match(/^m(\d+)-j(\d+)$/))) return { i: +m[1], x: +m[2] };
    if ((m = h.match(/^m(\d+)(?:-(\w+))?$/))) return { i: +m[1], k: m[2] || '' };
    return h === '' ? { i: 0, k: '' } : { h: h };
  }
  function A(u, t) { return '<a href="' + u + '" target="_blank" rel="noopener noreferrer">' + t + '</a>'; }

  /* تنبيه "آخر تحديث" كان بيتكرر 5 مرات في صفحة الوظيفة: نسيب آخر واحد بس */
  function dedupeNotes() {
    var n = [].filter.call(out.querySelectorAll('.gnote'), function (e) { return /آخر تحديث للموقع/.test(e.textContent); });
    n.slice(0, -1).forEach(function (e) { e.remove(); });
  }

  /* ---------- صفحة الوظيفة: ملخص سريع + فهرس ---------- */
  function jobPage(c) {
    if (out.querySelector('.facts') || !M[c.i] || !M[c.i].j[c.x]) return;
    var j = M[c.i].j[c.x], first = out.querySelector('.gh3'); if (!first) return;
    var en = sp(j.t)[0];
    var r = (typeof RMT !== 'undefined' && RMT.find(function (x) { return x[0].test(j.t); })) || [0, 0, 0, 1];
    var cell = function (l, v) { return '<div class="fact"><small>' + l + '</small><b>' + v + '</b></div>'; };
    var facts = '<section class="facts" aria-label="ملخص سريع عن الوظيفة">' +
      '<div class="facts-grid">' +
      cell('المرتب التقريبي شهريًا', esc(j.s) + (typeof STAG === 'function' ? STAG(j) : '')) +
      cell('طلب الريموت', LV[r[1]]) + cell('طلب الفري لانس', LV[r[2]]) + cell('سهولة البداية', EZ[r[3]]) +
      '</div>' +
      (j.sn ? '<p class="fact-note">' + esc(j.sn) + '</p>' : '') +
      '<p class="fact-note">الأرقام تقديرية وأغلبها للقاهرة والمدن الكبيرة. الشغل الحضوري في أسيوط والصعيد غالبًا أقل، والريموت بيقرّب الفرق.</p>' +
      '<div class="cmp"><span>قارن الرقم بنفسك:</span>' +
      A('https://wuzzuf.net/search/jobs/?q=' + enc(en), 'Wuzzuf') +
      A('https://www.linkedin.com/jobs/search/?keywords=' + enc(en) + '&location=Egypt', 'LinkedIn') +
      A('https://www.google.com/search?q=' + enc(en + ' salary Egypt'), 'بحث جوجل عن المرتبات') +
      '</div></section>';

    /* فهرس الأقسام */
    var heads = [].slice.call(out.querySelectorAll('h3.gh3')), chips = '';
    heads.forEach(function (h, k) {
      var id = 'sec-' + k; h.id = id; h.style.scrollMarginTop = '1rem';
      var sm = h.querySelector('small'), label = sm ? sm.textContent.replace(/^[\s·]+/, '') : h.textContent;
      chips += '<button type="button" class="toc-b" data-t="' + id + '">' + esc(label) + '</button>';
    });
    chips += '<button type="button" class="toc-b toc-share" data-share="1"><i aria-hidden="true" class="fa-solid fa-link"></i> انسخ رابط الصفحة</button>';
    first.insertAdjacentHTML('beforebegin', facts + '<nav class="toc" aria-label="أقسام الصفحة">' + chips + '</nav>');
    out.querySelector('.toc').addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      if (b.dataset.share) return copyText(location.href, 'اتنسخ رابط الصفحة');
      var t = document.getElementById(b.dataset.t); if (t) t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    });
  }

  /* ---------- قايمة المجالات: المرتب على كل كارت ---------- */
  function jobsList(c) {
    var cards = out.querySelectorAll('.subj-card'), js = M[c.i] && M[c.i].j;
    if (!js || cards.length !== js.length) return;
    cards.forEach(function (b, k) {
      if (b.querySelector('.sal-mini')) return;
      var p = nums(js[k].s); if (p.length < 2) return;
      b.insertAdjacentHTML('beforeend', '<div class="sal-mini">' + p[0].join('–') + ' ← ' + p[1].join('–') + ' ألف' + (typeof STAG === 'function' ? STAG(js[k]) : '') + '</div>');
    });
  }

  /* ---------- صفحة التخصص: ابدأ من أول سنة ---------- */
  function landing(c) {
    if (out.querySelector('.starter') || typeof BASE === 'undefined' || !BASE[c.i]) return;
    var rows = BASE[c.i][0].map(function (d) { return SKI[d]; }).filter(Boolean).map(function (x) {
      return '<div class="sk"><span>' + x[2] + '</span>' +
        A('https://www.youtube.com/results?search_query=' + enc(x[3]), 'يوتيوب عربي') +
        A('https://www.coursera.org/search?query=' + enc(x[4]), 'Coursera') + '</div>';
    }).join('');
    if (!rows) return;
    out.insertAdjacentHTML('beforeend', '<section class="starter"><h3 class="gh3">ابدأ من أول سنة</h3>' +
      '<p class="gp">مش لازم تستنى مواد المنهج. دي أول حاجات تتعلمها بالمجاني وانت لسه في الفرقة الأولى:</p>' +
      '<div class="job">' + rows + '</div></section>');
  }

  /* ---------- تشغيل بعد أي تغيير في #out ---------- */
  var busy = false, obs;
  function post() {
    if (busy) return; busy = true; obs.disconnect();
    try {
      dedupeNotes();
      var c = cur();
      if (c.x != null && out.querySelector('.lad')) jobPage(c);
      else if (c.k === 'jobs') jobsList(c);
      else if (c.k === '' && c.i != null && out.querySelector('.subj-card')) landing(c);
    } catch (e) { if (window.console) console.warn('extras:', e); }
    obs.observe(out, { childList: true });
    busy = false;
  }
  obs = new MutationObserver(post);
  obs.observe(out, { childList: true });
  post();
})();

/* روابط الإيميل: بتتركّب هنا بدل ما تتكتب في الـ HTML (تقليل السبام من برامج جمع الإيميلات) */
(function () {
  try {
    var addr = ['ahmedwaelothman612', 'gmail.com'].join('@');
    var links = document.querySelectorAll('a[data-mail]');
    for (var i = 0; i < links.length; i++) {
      var q = links[i].getAttribute('data-mail');
      links[i].setAttribute('href', 'mailto:' + addr + (q ? '?' + q : ''));
    }
  } catch (e) {}
})();

/* ===== حركة وتفاعل (v5): خلايا متحركة في الخلفية + تأثيرات الضغط ===== */
(function () {
  'use strict';
  try {
    var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- 1) ريبل عند الضغط + نبضة ---------- */
    var SEL = '.gtab,.team-btn,.qz-opt,.qz-cta,.wa,.subj-card,.social,.toc-b,.share-cta,.sp .open,.to-top,#home button';
    document.addEventListener('pointerdown', function (e) {
      var el = e.target.closest && e.target.closest(SEL);
      if (!el || reduce) return;
      el.classList.add(getComputedStyle(el).position === 'static' ? 'rpl-host' : 'rpl-clip');
      var r = el.getBoundingClientRect(), s = Math.max(r.width, r.height) * 2.2;
      var d = document.createElement('span');
      d.className = 'rpl';
      d.style.cssText = 'width:' + s + 'px;height:' + s + 'px;left:' + (e.clientX - r.left - s / 2) + 'px;top:' + (e.clientY - r.top - s / 2) + 'px';
      el.appendChild(d);
      setTimeout(function () { if (d.parentNode) d.parentNode.removeChild(d); }, 700);
    }, { passive: true });
    document.addEventListener('click', function (e) {
      var el = e.target.closest && e.target.closest('.gtab,.subj-card,.qz-opt,.team-btn');
      if (!el || reduce) return;
      el.classList.remove('pop'); void el.offsetWidth; el.classList.add('pop');
      setTimeout(function () { el.classList.remove('pop'); }, 450);
    });

    /* ---------- 2) إضاءة بتتبع الماوس على الكروت ---------- */
    document.addEventListener('pointermove', function (e) {
      var el = e.target.closest && e.target.closest('.subj-card,.job,.qz-cta,.wa');
      if (!el) return;
      var r = el.getBoundingClientRect();
      el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      el.style.setProperty('--my', (e.clientY - r.top) + 'px');
    }, { passive: true });

    /* ---------- 3) حركة دخول المحتوى لما التخصص أو السؤال يتغير ---------- */
    var out = document.getElementById('out');
    if (out && !reduce && window.MutationObserver) {
      var lastKey = '';
      new MutationObserver(function () {
        var h = out.querySelector('h1,h2');
        var key = (h ? h.textContent : '') + '|' + out.children.length;
        if (key === lastKey) return;
        lastKey = key;
        out.classList.remove('enter'); void out.offsetWidth; out.classList.add('enter');
      }).observe(out, { childList: true });
    }

    /* ---------- 4) خلايا متحركة في الخلفية ---------- */
    var home = document.getElementById('home');
    if (!home) return;
    var cv = document.createElement('canvas');
    cv.id = 'cells'; cv.setAttribute('aria-hidden', 'true');
    var bg = document.getElementById('bgfx');
    (bg && bg.parentNode ? bg.parentNode : document.body).insertBefore(cv, bg ? bg.nextSibling : document.body.firstChild);
    var ctx = cv.getContext('2d');
    var small = matchMedia('(max-width:768px)').matches;
    var W = 0, H = 0, dpr = 1, raf = 0, cells = [], last = 0;
    var mouse = { x: -9999, y: -9999, on: false };
    var TEAL = '59,130,246', AMBER = '56,189,248';
    var LINK = small ? 110 : 140, MR = small ? 130 : 170;

    function make(n) {
      cells = [];
      for (var i = 0; i < n; i++) {
        var amber = Math.random() < .22;
        cells.push({
          x: Math.random() * W, y: Math.random() * H,
          vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35,
          r: 3 + Math.random() * 6, ph: Math.random() * 6.28, sp: .6 + Math.random() * .9,
          c: amber ? AMBER : TEAL, glow: 0
        });
      }
    }
    function resize() {
      dpr = Math.min(devicePixelRatio || 1, 1.5); W = innerWidth; H = innerHeight;
      cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.round(Math.min(W * H / (small ? 20000 : 24000), small ? 30 : 56));
      if (!cells.length || Math.abs(cells.length - n) > 6) make(n);
      if (reduce) frame(performance.now());
    }

    function frame(now) {
      var dt = Math.min(now - (last || now), 40) / 16.7; last = now;
      var t = now / 1000, i, j, a, b, dx, dy, d;
      ctx.clearRect(0, 0, W, H);
      for (i = 0; i < cells.length; i++) {
        a = cells[i];
        if (!reduce) {
          // حركة ذاتية + تموّج بسيط
          a.vx += Math.cos(t * .5 * a.sp + a.ph) * .004 * dt;
          a.vy += Math.sin(t * .45 * a.sp + a.ph * 1.7) * .004 * dt;
          if (mouse.on) {
            dx = a.x - mouse.x; dy = a.y - mouse.y; d = Math.hypot(dx, dy);
            if (d < MR && d > .5) {
              var f = (1 - d / MR);
              a.vx += dx / d * f * .22 * dt; a.vy += dy / d * f * .22 * dt; // بتبعد بنعومة
              a.glow = Math.min(1, a.glow + .12 * dt);
            }
          }
          a.glow = Math.max(0, a.glow - .03 * dt);
          a.vx *= Math.pow(.985, dt); a.vy *= Math.pow(.985, dt);
          var sp = Math.hypot(a.vx, a.vy); if (sp > 2.4) { a.vx *= 2.4 / sp; a.vy *= 2.4 / sp; }
          a.x += a.vx * dt + Math.cos(t * a.sp + a.ph) * .12; a.y += a.vy * dt + Math.sin(t * a.sp * .9 + a.ph) * .12;
          if (a.x < -20) a.x = W + 20; else if (a.x > W + 20) a.x = -20;
          if (a.y < -20) a.y = H + 20; else if (a.y > H + 20) a.y = -20;
        }
      }
      // خطوط الربط بين الخلايا القريبة
      ctx.lineWidth = 1;
      for (i = 0; i < cells.length; i++) {
        a = cells[i];
        for (j = i + 1; j < cells.length; j++) {
          b = cells[j]; dx = a.x - b.x; dy = a.y - b.y;
          if (dx > LINK || dx < -LINK || dy > LINK || dy < -LINK) continue;
          d = Math.hypot(dx, dy);
          if (d < LINK) {
            ctx.strokeStyle = 'rgba(122,167,255,' + ((1 - d / LINK) * (.16 + Math.max(a.glow, b.glow) * .35)).toFixed(3) + ')';
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
        // خط من الماوس للخلية القريبة
        if (mouse.on) {
          dx = a.x - mouse.x; dy = a.y - mouse.y; d = Math.hypot(dx, dy);
          if (d < MR * 1.25) {
            ctx.strokeStyle = 'rgba(56,189,248,' + ((1 - d / (MR * 1.25)) * .3).toFixed(3) + ')';
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
          }
        }
      }
      // رسم الخلايا: غشاء + هالة + نواة
      for (i = 0; i < cells.length; i++) {
        a = cells[i];
        var pulse = 1 + Math.sin(t * 1.6 * a.sp + a.ph) * .12 + a.glow * .5, r = a.r * pulse;
        var g = ctx.createRadialGradient(a.x, a.y, 0, a.x, a.y, r * 3.2);
        g.addColorStop(0, 'rgba(' + a.c + ',' + (.20 + a.glow * .35) + ')'); g.addColorStop(1, 'rgba(' + a.c + ',0)');
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(a.x, a.y, r * 3.2, 0, 6.2832); ctx.fill();
        ctx.fillStyle = 'rgba(' + a.c + ',' + (.10 + a.glow * .12) + ')';
        ctx.strokeStyle = 'rgba(' + a.c + ',' + (.45 + a.glow * .4) + ')';
        ctx.beginPath(); ctx.arc(a.x, a.y, r, 0, 6.2832); ctx.fill(); ctx.stroke();
        ctx.fillStyle = 'rgba(' + a.c + ',' + (.65 + a.glow * .3) + ')';
        ctx.beginPath(); ctx.arc(a.x + Math.cos(a.ph + t * .4) * r * .2, a.y + Math.sin(a.ph + t * .4) * r * .2, Math.max(1, r * .32), 0, 6.2832); ctx.fill();
      }
    }
    function loop(now) { frame(now); raf = requestAnimationFrame(loop); }
    function start() { if (!raf && !reduce) { last = 0; raf = requestAnimationFrame(loop); } }
    function stop() { if (raf) { cancelAnimationFrame(raf); raf = 0; } }

    addEventListener('pointermove', function (e) { mouse.x = e.clientX; mouse.y = e.clientY; mouse.on = true; }, { passive: true });
    addEventListener('pointerdown', function (e) {
      mouse.x = e.clientX; mouse.y = e.clientY; mouse.on = true;
      // انفجار صغير: الخلايا القريبة تتدفع بعيد وتنوّر
      for (var i = 0; i < cells.length; i++) {
        var a = cells[i], dx = a.x - e.clientX, dy = a.y - e.clientY, d = Math.hypot(dx, dy);
        if (d < 260 && d > .5) { var f = 1 - d / 260; a.vx += dx / d * f * 3.2; a.vy += dy / d * f * 3.2; a.glow = 1; }
      }
    }, { passive: true });
    addEventListener('pointerup', function (e) { if (e.pointerType === 'touch') mouse.on = false; }, { passive: true });
    addEventListener('pointercancel', function () { mouse.on = false; }, { passive: true });
    document.addEventListener('mouseleave', function () { mouse.on = false; });
    addEventListener('resize', resize);
    document.addEventListener('visibilitychange', function () { document.hidden ? stop() : start(); });
    resize(); start();
  } catch (err) { /* الموقع الأساسي يكمّل عادي */ }
})();
