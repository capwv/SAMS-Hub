/* Platforms & Tools - PWA install button + service worker registration */
(function () {
  'use strict';

  var btn = document.getElementById('installBtn');
  var hint = document.getElementById('iosInstallHint');
  var deferredPrompt = null;
  var ua = navigator.userAgent || '';

  function isInstalled() {
    return (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) ||
      window.navigator.standalone === true;
  }
  var isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  var isAndroid = /Android/i.test(ua);
  /* in-app browsers (Telegram, Facebook, Instagram, WhatsApp...) cannot install apps */
  var inApp = /Telegram|FBAN|FBAV|Instagram|WhatsApp|Line\/|Snapchat|TikTok|MicroMessenger/i.test(ua) ||
    (isAndroid && /; wv\)/.test(ua)) || (isIOS && !/Safari\//.test(ua) && !/CriOS|FxiOS|EdgiOS/.test(ua));

  function say(text, withCopy) {
    if (!hint) { alert(text); return; }
    hint.textContent = text;
    if (withCopy) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'ins-copy';
      b.textContent = 'انسخ الرابط';
      b.style.cssText = 'display:block;margin:10px auto 0;padding:8px 18px;border-radius:10px;border:1px solid rgba(125,211,252,.5);background:rgba(125,211,252,.12);color:#e6f1ff;font:inherit;font-weight:700;cursor:pointer';
      b.addEventListener('click', function () {
        var url = location.origin + location.pathname;
        function done() { b.textContent = 'اتنسخ، الصقه في المتصفح'; }
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(url).then(done, function () { window.prompt('انسخ الرابط:', url); });
        } else { window.prompt('انسخ الرابط:', url); }
      });
      hint.appendChild(b);
    }
    hint.hidden = false;
    hint.setAttribute('role', 'status');
    if (hint.scrollIntoView) hint.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function showHelp() {
    if (inApp) {
      say('الرابط مفتوح جوه متصفح تطبيق (زي تليجرام)، وده مبيسمحش بالتثبيت. افتح الرابط في ' +
        (isIOS ? 'سفاري' : 'كروم') + ' وبعدين دوس الزرار تاني.', true);
    } else if (isIOS) {
      say('على الآيفون: دوس زرار المشاركة (المربع اللي فيه سهم لفوق) في سفاري، وبعدين اختار «إضافة إلى الشاشة الرئيسية» وبعدها «إضافة».');
    } else if (isAndroid) {
      say('دوس على القايمة (⋮) فوق في كروم، وبعدين اختار «تثبيت التطبيق» أو «إضافة إلى الشاشة الرئيسية».');
    } else {
      say('من كروم أو إيدج: دوس على أيقونة التثبيت في شريط العنوان، أو من القايمة اختار «تثبيت».');
    }
  }

  if (btn && !isInstalled()) {
    btn.hidden = false;
    window.addEventListener('beforeinstallprompt', function (e) {
      e.preventDefault();
      deferredPrompt = e;
    });
    btn.addEventListener('click', function () {
      if (deferredPrompt) {
        var p = deferredPrompt;
        deferredPrompt = null;
        try {
          p.prompt();
          p.userChoice.then(function (choice) {
            if (choice.outcome === 'accepted') { btn.hidden = true; if (hint) hint.hidden = true; }
            else showHelp();
          });
        } catch (err) { showHelp(); }
      } else {
        showHelp();
      }
    });
    window.addEventListener('appinstalled', function () {
      btn.hidden = true;
      if (hint) hint.hidden = true;
    });
  }

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').catch(function () { /* offline support optional */ });
    });
  }
})();
