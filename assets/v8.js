/* SAMS Compass - v8.js: متابعة التقدم في الخطة. بيتحفظ في متصفح الطالب بس (localStorage) من غير حسابات.
   المفتاح في المتصفح: sams_compass_progress_v1 */
(function () {
  'use strict';
  if (typeof M === 'undefined' || typeof out === 'undefined' || typeof tabs === 'undefined' || typeof job !== 'function') return;
  var KEY = 'sams_compass_progress_v1', mem = { v: 1, jobs: {}, goal: null }, canStore = true, IDX = null;
  var esc = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); };
  var jk = function (t) { var m = String(t).match(/[A-Za-z].*$/); return m ? m[0].toLowerCase().replace(/[^a-z0-9]/g, '') : String(t).replace(/[^\u0600-\u06FF0-9]/g, ''); };
  function idx() { if (IDX) return IDX; IDX = {}; M.forEach(function (m, i) { m.j.forEach(function (j, x) { IDX[jk(j.t)] = { i: i, x: x, t: j.t }; }); }); return IDX; }
  function R(k) { return mem.jobs[k] || (mem.jobs[k] = { d: [], n: 0, nx: '', t: 0 }); }
  function clean(d) {
    if (!d || typeof d !== 'object' || !d.jobs || typeof d.jobs !== 'object') return null;
    var o = { v: 1, jobs: {}, goal: null };
    Object.keys(d.jobs).slice(0, 200).forEach(function (k) {
      var r = d.jobs[k];
      if (!/^[a-z0-9\u0600-\u06FF]{1,80}$/.test(k) || !r || !Array.isArray(r.d)) return;
      o.jobs[k] = { d: r.d.slice(0, 300).map(function (x) { return String(x).slice(0, 160); }), n: Math.max(0, Math.min(500, +r.n || 0)), nx: String(r.nx || '').slice(0, 160), t: +r.t || 0 };
    });
    if (typeof d.goal === 'string' && o.jobs[d.goal]) o.goal = d.goal;
    return o;
  }
  function load() { try { var s = localStorage.getItem(KEY); if (s) { var c = clean(JSON.parse(s)); if (c) mem = c; } } catch (e) { canStore = false; } }
  function prune() { Object.keys(mem.jobs).forEach(function (k) { if (!mem.jobs[k].d.length && mem.goal !== k) delete mem.jobs[k]; }); }
  function save() { prune(); try { localStorage.setItem(KEY, JSON.stringify(mem)); } catch (e) { canStore = false; } updBtn(); }
  function updBtn() {
    var s = document.getElementById('pgS'); if (!s) return;
    var t = 0; Object.keys(mem.jobs).forEach(function (k) { t += mem.jobs[k].d.length; });
    s.textContent = t ? 'خلّصت ' + t + ' خطوة لحد دلوقتي' : 'علّم اللي خلّصته من الـ Roadmap';
  }
  function paint(b, r, on) { b.setAttribute('aria-checked', on ? 'true' : 'false'); r.classList.toggle('done', on); }
  function nxt(key) {
    var rec = R(key), nx = '';
    out.querySelectorAll('.sk').forEach(function (r) {
      if (!nx && rec.d.indexOf(r.getAttribute('data-pk')) < 0) { var sp = r.querySelector('span'); nx = (sp ? sp.textContent : '').trim(); }
    });
    rec.nx = nx;
  }
  function fill(p, key) {
    var rec = R(key), rows = out.querySelectorAll('.sk');
    if (rows.length) { rec.n = rows.length; nxt(key); }
    var n = rec.n, c = rec.d.length, pc = n ? Math.round(c * 100 / n) : 0, g = mem.goal === key;
    p.innerHTML = '<div class="pg-top"><b>تقدّمك في الخطة دي</b><span>' + c + ' من ' + n + ' · ' + pc + '%</span></div>' +
      '<div class="pg-bar" role="progressbar" aria-label="نسبة الإنجاز" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + pc + '"><i style="width:' + pc + '%"></i></div>' +
      '<div class="pg-act"><button type="button" class="pg-b" data-g>' + (g ? '✓ ده هدفك الحالي' : 'خليه هدفي') + '</button><button type="button" class="pg-b" data-a>كل تقدّمي</button></div>' +
      (canStore ? '' : '<p class="gnote">التخزين مش متاح في المتصفح ده (وضع الخصوصية؟)، فالتقدم مش هيتحفظ بعد قفل الصفحة.</p>');
    p.querySelector('[data-g]').onclick = function () { mem.goal = g ? null : key; save(); fill(p, key); };
    p.querySelector('[data-a]').onclick = showProgress;
  }
  function toggle(key, r, b) {
    var rec = R(key), id = r.getAttribute('data-pk'), k = rec.d.indexOf(id);
    if (k >= 0) rec.d.splice(k, 1); else rec.d.push(id);
    paint(b, r, k < 0); rec.n = out.querySelectorAll('.sk').length; rec.t = Date.now(); nxt(key); save();
    var p = out.querySelector('.pg-panel'); if (p) fill(p, key);
  }
  function enhance(i, x) {
    var j = M[i] && M[i].j[x]; if (!j) return;
    var rows = out.querySelectorAll('.sk'); if (!rows.length) return;
    var key = jk(j.t), rec = R(key), seen = {}, ids = [];
    rows.forEach(function (r) {
      var sp = r.querySelector('span'), lb = (sp ? sp.textContent : r.textContent).trim(), c = seen[lb] || 0, id;
      seen[lb] = c + 1; id = lb + '#' + c; ids.push(id); r.setAttribute('data-pk', id);
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'pk'; b.textContent = '✓'; b.setAttribute('role', 'checkbox'); b.setAttribute('aria-label', 'علّم "' + lb + '" كمكتمل');
      paint(b, r, rec.d.indexOf(id) >= 0);
      b.addEventListener('click', function () { toggle(key, r, b); });
      r.insertBefore(b, r.firstChild);
    });
    rec.d = rec.d.filter(function (id) { return ids.indexOf(id) >= 0; });
    var host = out.querySelector('.lad') || out.querySelector('h2');
    if (host) { var p = document.createElement('div'); p.className = 'pg-panel'; host.insertAdjacentElement('afterend', p); fill(p, key); }
  }
  function showProgress() {
    [].forEach.call(tabs.children, function (b) { b.setAttribute('aria-pressed', 'false'); });
    var I = idx(), ks = Object.keys(mem.jobs).filter(function (k) { return I[k] && (mem.jobs[k].d.length || mem.goal === k); })
      .sort(function (a, b) { return (mem.goal === b) - (mem.goal === a) || mem.jobs[b].t - mem.jobs[a].t; });
    var cards = ks.map(function (k) {
      var r = mem.jobs[k], o = I[k], pc = r.n ? Math.min(100, Math.round(r.d.length * 100 / r.n)) : 0;
      return '<a class="job lnk" href="#m' + o.i + '-j' + o.x + '" onclick="show(' + o.i + ');job(' + o.i + ',' + o.x + ');return false"><h4>' + (mem.goal === k ? '🎯 ' : '') + esc(o.t) + '</h4>' +
        '<p>' + r.d.length + ' من ' + r.n + ' خطوة · ' + pc + '%</p><div class="pg-bar" aria-hidden="true"><i style="width:' + pc + '%"></i></div>' +
        (pc >= 100 ? '<p>خلّصت الخطة دي 🎉</p>' : (r.nx ? '<p>الخطوة الجاية: ' + esc(r.nx) + '</p>' : '')) + '</a>';
    }).join('');
    out.innerHTML = '<h2 class="text-2xl md:text-3xl font-black text-white mt-3 mb-1"><i aria-hidden="true" class="fa-solid fa-list-check" style="color:var(--a2)"></i> تقدّمي في الخطة</h2>' +
      '<p class="gp">علّم اللي خلّصته من الـ Roadmap جوه أي وظيفة (الدايرة جنب كل مهارة). التقدم بيتحفظ في متصفحك بس من غير حساب، فلو غيّرت الجهاز أو مسحت بيانات المتصفح استخدم التصدير والاستيراد.</p>' +
      (cards || '<div class="job"><h4>لسه ما علّمتش حاجة</h4><p>افتح أي وظيفة من التخصصات، ودوس على الدايرة جنب أول مهارة تخلّصها.</p></div>') +
      '<div class="pg-act" style="margin-top:1rem"><button type="button" class="pg-b" id="pgX">تصدير تقدّمي (JSON)</button><button type="button" class="pg-b" id="pgI">استيراد</button><button type="button" class="pg-b" id="pgR">مسح كل التقدم</button><input type="file" id="pgF" accept="application/json,.json" hidden></div>' +
      '<p class="gnote" id="pgM" role="status"></p>';
    var msg = function (t) { document.getElementById('pgM').textContent = t; };
    document.getElementById('pgX').onclick = function () {
      var a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([JSON.stringify(mem, null, 1)], { type: 'application/json' }));
      a.download = 'sams-compass-progress.json'; document.body.appendChild(a); a.click(); a.remove(); msg('اتصدّر الملف.');
    };
    document.getElementById('pgI').onclick = function () { document.getElementById('pgF').click(); };
    document.getElementById('pgF').onchange = function (e) {
      var f = e.target.files && e.target.files[0]; if (!f) return;
      var fr = new FileReader();
      fr.onload = function () {
        var c = null; try { c = clean(JSON.parse(fr.result)); } catch (er) {}
        if (!c) return msg('الملف ده مش ملف تقدّم صالح.');
        if (!confirm('الاستيراد هيستبدل تقدّمك الحالي. تكمل؟')) return;
        mem = c; save(); showProgress();
      };
      fr.readAsText(f);
    };
    document.getElementById('pgR').onclick = function () { if (confirm('تمسح كل تقدّمك؟ مش هتقدر ترجّعه.')) { mem = { v: 1, jobs: {}, goal: null }; save(); showProgress(); } };
    document.title = 'تقدّمي | SAMS Compass';
    if (location.hash !== '#progress') { try { history.pushState(null, '', '#progress'); } catch (er) {} }
    var h = out.querySelector('h2'); if (h) { h.setAttribute('tabindex', '-1'); h.style.outline = 'none'; h.focus(); }
    if (out.scrollIntoView) out.scrollIntoView({ block: 'start' });
  }
  window.showProgress = showProgress;
  window.SAMSProgress = { show: showProgress, clean: clean, state: function () { return mem; } };
  var _j8 = job;
  job = function (i, x) { var r = _j8.apply(this, arguments); try { enhance(i, x); } catch (e) {} return r; };
  function mountBtn() {
    var q = document.querySelector('.qz-cta'); if (!q || document.querySelector('.pg-cta')) return;
    var b = document.createElement('button'); b.type = 'button'; b.className = 'qz-cta pg-cta';
    b.innerHTML = '<span class="qz-ic"><i aria-hidden="true" class="fa-solid fa-list-check"></i></span><span class="qz-tx"><b>تقدّمي في الخطة</b><small id="pgS"></small></span><i aria-hidden="true" class="fa-solid fa-arrow-left"></i>';
    b.onclick = showProgress; q.insertAdjacentElement('afterend', b); updBtn();
  }
  window.addEventListener('popstate', function () { if (location.hash === '#progress') showProgress(); });
  load(); mountBtn();
  /* لينك مباشر: app.js بيرسم الصفحة قبل ما v7/v8 يتحمّلوا، فنعيد رسم الوظيفة مرة واحدة عشان تظهر الأزرار وشارة المصدر */
  var hm = location.hash.match(/^#m(\d+)-j(\d+)$/);
  if (hm && M[+hm[1]] && M[+hm[1]].j[+hm[2]]) { try { show(+hm[1]); job(+hm[1], +hm[2]); } catch (e) {} }
  else if (location.hash === '#progress') showProgress();
})();
