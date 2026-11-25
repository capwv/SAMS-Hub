/* SAMS Compass - v9.js: زرار المشاركة + إحصائيات اختيارية (GoatCounter) */
(function () {
  'use strict';

  /* إحصائيات من غير كوكيز ومن غير بيانات شخصية. سيبها فاضية لحد ما تعمل حساب مجاني على goatcounter.com،
     وبعدين اكتب هنا الكود بتاعك، مثال: 'sams-compass' (يعني sams-compass.goatcounter.com). */
  var GOATCOUNTER = 'capwv';

  try {
    if (/^[a-z0-9-]{2,40}$/.test(GOATCOUNTER) && location.protocol.indexOf('http') === 0) {
      var s = document.createElement('script');
      s.async = true;
      s.src = 'https://gc.zgo.at/count.js';
      s.setAttribute('data-goatcounter', 'https://' + GOATCOUNTER + '.goatcounter.com/count');
      document.head.appendChild(s);
    }
  } catch (e) {}


  /* تتبع زيارات الـ SPA: التنقل جوه الموقع بيحصل بـ history.pushState من غير تحميل صفحة،
     فبنبعت كل تنقل لـ GoatCounter كزيارة (path + hash) عشان تظهر كل صفحة في لوحة الإحصائيات.
     مفيش أي بيانات شخصية: GoatCounter من غير كوكيز أساسًا. */
  function gc(path, title, isEvent) {
    try {
      if (window.goatcounter && window.goatcounter.count) {
        window.goatcounter.count({ path: path, title: title || document.title, event: !!isEvent });
      }
    } catch (e) {}
  }
  function currentPath() { return location.pathname + location.search + location.hash; }
  try {
    var _ps = history.pushState;
    history.pushState = function () { var r = _ps.apply(this, arguments); gc(currentPath()); return r; };
    window.addEventListener('popstate', function () { gc(currentPath()); });
  } catch (e) {}

  /* أحداث بتفيدك تعرف الطلبة بيستخدموا إيه: إتمام الاختبار، نتيجته، وضغطات قناة الواتساب */
  try {
    var _qf = window.qzFinish;
    if (typeof _qf === 'function') {
      window.qzFinish = function () {
        try {
          gc('event/quiz-finish', 'إتمام اختبار تحديد التخصص', true);
          var top = (typeof qzCalc === 'function' && typeof M !== 'undefined') ? M[qzCalc().ms[0].i].n : '';
          if (top) gc('event/quiz-result-' + encodeURIComponent(top), 'نتيجة الاختبار: ' + top, true);
        } catch (e) {}
        return _qf.apply(this, arguments);
      };
    }
  } catch (e) {}
  try {
    document.addEventListener('click', function (e) {
      var a = e.target && e.target.closest ? e.target.closest('a') : null;
      if (a && a.href && /whatsapp\.com/.test(a.href)) gc('event/whatsapp-channel', 'ضغطة على قناة الواتساب', true);
    }, true);
  } catch (e) {}

  /* رابط "روح للمحتوى": بيحرّك الفوكس من غير ما يغيّر الـ hash، عشان الراوتر ميرجّعش لأول تخصص */
  try {
    var sk = document.querySelector('a.skip'), mn = document.getElementById('main');
    if (sk && mn) sk.addEventListener('click', function (e) { e.preventDefault(); mn.focus(); if (mn.scrollIntoView) mn.scrollIntoView(); });
  } catch (e) {}

  var btn = document.getElementById('shareBtn');
  if (!btn) return;
  var label = btn.querySelector('.sb-t');
  var msg = document.getElementById('shareMsg');
  var orig = label ? label.textContent : '';

  function flash(t) {
    if (label) label.textContent = t;
    if (msg) msg.textContent = t;
    setTimeout(function () { if (label) label.textContent = orig; if (msg) msg.textContent = ''; }, 2200);
  }
  function legacyCopy(url) {
    var ta = document.createElement('textarea');
    ta.value = url; ta.setAttribute('readonly', '');
    ta.style.cssText = 'position:fixed;top:-100px;opacity:0';
    document.body.appendChild(ta); ta.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(ta);
    flash(ok ? 'اللينك اتنسخ' : 'انسخ اللينك من شريط العنوان');
  }

  btn.addEventListener('click', function () {
    var url = location.href; /* بيشمل التخصص أو الصفحة المفتوحة (#m3 / #quiz / #compare) */
    if (navigator.share) {
      navigator.share({ title: document.title, text: 'دليل تخصصات أكاديمية السادات فرع أسيوط', url: url }).catch(function () {});
    } else if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(function () { flash('اللينك اتنسخ'); }, function () { legacyCopy(url); });
    } else {
      legacyCopy(url);
    }
  });
})();
