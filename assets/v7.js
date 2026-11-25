/* SAMS Compass - v7.js: حالة مصدر المرتب في صفحة كل وظيفة. البيانات في data/sources.js */
(function () {
  'use strict';
  if (typeof SALX !== 'function' || typeof SRC === 'undefined') return;
  var MO = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
  var BAS = { ads: 'عينة إعلانات وظائف', survey: 'استبيان', official: 'مصدر رسمي' };
  var esc = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); };
  var jk = function (t) { var m = String(t).match(/[A-Za-z].*$/); return m ? m[0].toLowerCase().replace(/[^a-z0-9]/g, '') : String(t).replace(/[^\u0600-\u06FF0-9]/g, ''); };
  var ar = function (d) { var p = String(d).split('-'); return p.length === 3 ? (+p[2]) + ' ' + MO[p[1] - 1] + ' ' + p[0] : d; };
  function badge(j) {
    var s = SRC[jk(j.t)];
    if (!s || !BAS[s.b]) return '<p class="gnote src src-ed"><b>حالة المصدر:</b> تقدير تحريري، لسه مش موثّق بمصدر محدد. قارنه بإعلانات Wuzzuf و LinkedIn قبل ما تعتمد عليه.</p>';
    return '<p class="gnote src src-ok"><b>المصدر:</b> ' + BAS[s.b] + (s.n ? ' (' + (+s.n) + ')' : '') + '، اتحقق منه ' + ar(s.d) +
      (/^https?:\/\//.test(s.u || '') ? ' · <a href="' + esc(s.u) + '" target="_blank" rel="noopener">الرابط</a>' : '') +
      (s.note ? '<br>' + esc(s.note) : '') + '</p>';
  }
  var _S = SALX;
  SALX = function (i, j) { return _S(i, j) + badge(j); };
})();
