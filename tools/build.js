#!/usr/bin/env node
/* SAMS Compass - build.js
   بيقرأ نفس بيانات الموقع (data/majors.js + assets/app.js) وبيولّد:
     1) صفحة ثابتة لكل تخصص:  majors/<slug>/index.html   (بتظهر في جوجل ومن غير JavaScript)
     2) محتوى <noscript> وروابط الفوتر داخل index.html (بين علامات BUILD)
     3) sitemap.xml
   التشغيل (من جذر المشروع):   node tools/build.js
   مفيش مكتبات خارجية مطلوبة. شغّله بعد أي تعديل في بيانات التخصصات أو المرتبات. */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const SITE = 'https://capwv.github.io/SAMS-Compass/';
const UPDATED = '2026-11-22'; // مصدر الحقيقة الوحيد لتاريخ آخر تحديث (YYYY-MM-DD)
const AR_MONTHS = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
const AR_DATE = (() => { const [y, m, d] = UPDATED.split('-').map(Number); return d + ' ' + AR_MONTHS[m - 1] + ' ' + y; })();
const SLUGS = ['mis', 'accounting', 'hr', 'public-admin', 'banking', 'finance', 'marketing', 'economics', 'actuarial', 'energy'];

/* ---------- 1) تشغيل كود الموقع في بيئة وهمية عشان نجيب M النهائية ---------- */
function stub() {
  const f = function () {};
  return new Proxy(f, {
    get(t, k) {
      if (k === Symbol.toPrimitive) return () => 0;
      if (k === Symbol.iterator) return function () { return [][Symbol.iterator](); };
      if (k === 'length') return 0;
      if (k === 'then') return undefined;
      return stub();
    },
    set() { return true; },
    apply() { return stub(); },
    construct() { return stub(); },
  });
}
const sandbox = {
  console, Math, JSON, Object, Array, String, Number, RegExp, Map, Set, Date, Symbol, parseInt, parseFloat, isNaN,
  encodeURIComponent, decodeURIComponent, setTimeout: () => 0, clearTimeout: () => 0,
  performance: { now: () => 0 }, requestAnimationFrame: () => 0, cancelAnimationFrame: () => {},
  localStorage: { getItem: () => null, setItem() {}, removeItem() {} },
  location: { hash: '', pathname: '/', origin: '' }, history: { pushState() {} },
  navigator: {}, innerWidth: 1280, innerHeight: 800, devicePixelRatio: 1,
  matchMedia: () => ({ matches: true }), addEventListener() {}, alert() {}, prompt() {},
  document: stub(),
};
sandbox.window = sandbox;
vm.createContext(sandbox);
const APP_FILES = ['assets/core-data.js', 'assets/jobs-tuning.js', 'assets/salary-insights.js', 'assets/learning.js', 'assets/ba-majors.js', 'assets/quiz.js', 'assets/app.js'];
for (const f of ['data/majors.js', ...APP_FILES]) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), sandbox, { filename: f });
}
const M = JSON.parse(vm.runInContext('JSON.stringify(M.map(m=>({n:m.n,d:m.d,x:m.x,j:m.j.map(j=>({t:j.t,s:j.s,l:j.l,u:j.u,r:j.r,sn:j.sn||""}))})))', sandbox));
if (M.length !== SLUGS.length) throw new Error('عدد التخصصات (' + M.length + ') مختلف عن SLUGS، حدّث SLUGS في build.js');

/* ---------- 1.5) فحوصات الجودة (v7): لو فيه خطأ الـ build بيقف من غير ما يكتب أي ملف ---------- */
const jk = t => { const m = String(t).match(/[A-Za-z].*$/); return m ? m[0].toLowerCase().replace(/[^a-z0-9]/g, '') : String(t).replace(/[^\u0600-\u06FF0-9]/g, ''); };
const readData = (f, expr) => vm.runInNewContext(fs.readFileSync(path.join(ROOT, f), 'utf8') + ';' + expr, {}, { filename: f });
const errs = [], keyOf = new Map(), DOCS = new Set();
M.forEach(m => m.j.forEach(j => {
  const k = jk(j.t);
  if (!k) errs.push('مفيش اسم صالح لمفتاح المصدر والتقدم: ' + j.t);
  else if (keyOf.has(k)) errs.push('مفتاح مكرر "' + k + '": ' + j.t + ' / ' + keyOf.get(k));
  else keyOf.set(k, j.t);
  if (!/^\d+–\d+ ألف .+ · \d+–\d+ ألف .+$/.test(j.s)) errs.push('صيغة مرتب غير قياسية في "' + j.t + '": ' + j.s);
}));
const CMPd = readData('data/compare.js', 'CMP');
if (CMPd.length !== M.length) errs.push('data/compare.js فيه ' + CMPd.length + ' سطر والتخصصات ' + M.length);
M.forEach((m, i) => { if (!CMPd[i] || CMPd[i].n !== m.n) errs.push('data/compare.js: السطر ' + i + ' لازم يكون "' + m.n + '" (الموجود: "' + (CMPd[i] && CMPd[i].n) + '")'); });
readData('data/majors.js', 'M').forEach((m, i) => m.j.forEach(bj => {
  const fj = M[i] && M[i].j.find(j => jk(j.t) === jk(bj.t));
  if (fj && fj.s !== bj.s) errs.push('مرتب متعارض في "' + bj.t + '": data/majors.js = ' + bj.s + ' / النهائي (app.js) = ' + fj.s + ' ← وحّدهم في data/majors.js');
}));
const SRCd = readData('data/sources.js', 'SRC');
Object.keys(SRCd).forEach(k => {
  const s = SRCd[k], at = 'data/sources.js "' + k + '": ';
  if (!keyOf.has(k)) errs.push(at + 'مش مطابق لأي وظيفة (راجع tools/sources-report.txt)');
  else if (!['ads', 'survey', 'official'].includes(s.b)) errs.push(at + 'نوع المصدر لازم ads أو survey أو official');
  else if (!/^\d{4}-\d{2}-\d{2}$/.test(s.d || '') || isNaN(Date.parse(s.d))) errs.push(at + 'تاريخ التحقق لازم YYYY-MM-DD');
  else if (s.d > UPDATED) errs.push(at + 'تاريخ التحقق أحدث من UPDATED، حدّث UPDATED في tools/build.js');
  else if (!/^https?:\/\//.test(s.u || '')) errs.push(at + 'رابط المصدر مطلوب (http/https)');
  else if (s.b === 'ads' && !(s.n >= 1)) errs.push(at + 'مع ads لازم n = عدد الإعلانات');
  else DOCS.add(k);
});
if (errs.length) { console.error('✖ الـ build وقف (' + errs.length + ' مشكلة):\n- ' + errs.join('\n- ')); process.exit(1); }
const BASIS = {
  'public-admin': ' الحد الأدنى للمبتدئ 8 آلاف (الحد الأدنى للأجور الحكومي من يوليو 2026)، وسقف السينيور حوالي 30 ألف لأن 80% من ردود Paylab في فئة الإدارة العامة بين 13.4 و26 ألف. يعني الرقم متعاير على نطاق منشور مش مجرد تخمين.'
};
const BASIS_ALL = ' الأرقام شهرية بالجنيه المصري وإجمالي قبل الضرايب، والحد الأدنى للمبتدئ 7 آلاف (الحد الأدنى القانوني للقطاع الخاص حاليًا، وبيترفع رسميًا لـ 8,500 من يناير 2027 بقرار إلزامي من المجلس القومي للأجور). الشغل الحضوري في أسيوط غالبًا أقل من القاهرة.';
const docLine = i => 'حالة التوثيق: ' + M[i].j.filter(j => DOCS.has(jk(j.t))).length + ' من ' + M[i].j.length + ' مرتبات في التخصص ده موثّقة بمصدر وتاريخ تحقق، والباقي تقدير تحريري.' + (BASIS[SLUGS[i]] || '') + BASIS_ALL;
fs.writeFileSync(path.join(ROOT, 'tools/sources-report.txt'),
  'SAMS Compass - حالة توثيق المرتبات: ' + DOCS.size + ' من ' + keyOf.size + '\nالمفتاح (للاستخدام في data/sources.js) | الحالة | الوظيفة | المرتب\n' +
  M.map(m => '\n# ' + m.n + '\n' + m.j.map(j => jk(j.t) + ' | ' + (DOCS.has(jk(j.t)) ? 'موثّق' : 'تقدير تحريري') + ' | ' + j.t + ' | ' + j.s).join('\n')).join('\n') + '\n');

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const split = t => { const m = t.match(/[A-Za-z].*$/); return m ? { en: m[0].trim(), ar: t.slice(0, m.index).trim() } : { en: '', ar: t }; };
const clip = (s, n) => (s.length > n ? s.slice(0, n - 1).replace(/\s+\S*$/, '') + '…' : s);
const url = i => SITE + 'majors/' + SLUGS[i] + '/';

/* ---------- 2) صفحات التخصصات ---------- */
function page(i) {
  const m = M[i], desc = clip(m.d, 100) + ' مجالات الشغل والمرتبات التقريبية لخريجي السادات أسيوط.';
  const title = m.n + ' في أكاديمية السادات فرع أسيوط: مجالات الشغل والمرتبات | SAMS Compass';
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'SAMS Compass', item: SITE },
        { '@type': 'ListItem', position: 2, name: m.n, item: url(i) } ] },
      { '@type': 'WebPage', name: title, url: url(i), inLanguage: 'ar-EG', description: desc, dateModified: UPDATED },
      { '@type': 'ItemList', name: 'مجالات الشغل لخريجي ' + m.n,
        itemListElement: m.j.map((j, k) => ({ '@type': 'ListItem', position: k + 1, name: split(j.t).en || split(j.t).ar })) },
    ],
  };
  const rows = m.j.map(j => {
    const s = split(j.t);
    return '<tr><td><b>' + esc(s.ar || s.en) + '</b>' + (s.en && s.ar ? '<br><span dir="ltr">' + esc(s.en) + '</span>' : '') +
      '</td><td>' + esc(j.s) + ' <small>(' + (DOCS.has(jk(j.t)) ? 'موثّق' : 'تقديري') + ')</small>' + (j.sn ? '<br><small>' + esc(j.sn) + '</small>' : '') + '</td><td>' + esc(j.u) +
      '</td><td dir="ltr" style="text-align:left">' + esc((j.l || []).join(' › ')) + '</td></tr>';
  }).join('');
  const others = M.map((o, k) => k === i ? '' : '<a href="../' + SLUGS[k] + '/">' + esc(o.n) + '</a>').join('');
  return '<!DOCTYPE html>\n<html lang="ar" dir="rtl">\n<head>\n<meta charset="UTF-8">\n' +
    '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n' +
    '<title>' + esc(title) + '</title>\n<meta name="description" content="' + esc(desc) + '">\n' +
    '<meta name="theme-color" content="#070b12">\n<meta name="color-scheme" content="dark">\n' +
    '<link rel="canonical" href="' + url(i) + '">\n<meta name="robots" content="index,follow,max-image-preview:large">\n' +
    '<meta property="og:type" content="article">\n<meta property="og:locale" content="ar_EG">\n<meta property="og:site_name" content="SAMS Compass">\n' +
    '<meta property="og:title" content="' + esc(title) + '">\n<meta property="og:description" content="' + esc(desc) + '">\n' +
    '<meta property="og:url" content="' + url(i) + '">\n<meta property="og:image" content="' + SITE + 'og-image.png">\n' +
    '<meta name="twitter:card" content="summary_large_image">\n<meta name="twitter:title" content="' + esc(title) + '">\n' +
    '<meta name="twitter:description" content="' + esc(desc) + '">\n<meta name="twitter:image" content="' + SITE + 'og-image.png">\n' +
    '<link rel="icon" type="image/png" href="../../assets/favicon.png">\n' +
    '<link rel="stylesheet" href="../../assets/style.css">\n<link rel="stylesheet" href="../../assets/fonts.css">\n' +
    '<script type="application/ld+json">' + JSON.stringify(ld) + '</script>\n</head>\n<body>\n<main class="sp">\n' +
    '<p class="crumb"><a href="../../">SAMS Compass</a> › ' + esc(m.n) + '</p>\n<h1>' + esc(m.n) + '</h1>\n<p>' + esc(m.d) + '</p>\n' +
    '<a class="open" href="../../#m' + i + '">افتح الدليل التفاعلي للتخصص</a>\n' +
    '<h2>عن التخصص</h2>\n' + (m.x || [m.d]).map(p => '<p>' + esc(p) + '</p>').join('\n') + '\n' +
    '<h2>مجالات الشغل والمرتبات التقريبية</h2>\n<p>أرقام شهرية تقديرية بالجنيه المصري. أغلبها للقاهرة والمدن الكبيرة، والشغل الحضوري في أسيوط والصعيد غالبًا أقل، والريموت بيقرّب الفرق. قارنها بصفحات المرتبات في Wuzzuf وLinkedIn وGlassdoor. آخر تحديث: ' + AR_DATE + '.</p>\n' +
    '<p>' + docLine(i) + '</p>\n' +
    '<div class="tw"><table><thead><tr><th>المجال</th><th>المرتب التقريبي</th><th>بتعمل إيه</th><th>التدرج الوظيفي</th></tr></thead><tbody>' + rows + '</tbody></table></div>\n' +
    '<h2>تخصصات تانية</h2>\n<div class="others">' + others + '</div>\n' +
    '<p><a class="open" href="../../#quiz">مش عارف تختار؟ اعمل اختبار تحديد التخصص</a></p>\n</main>\n</body>\n</html>\n';
}
SLUGS.forEach((s, i) => {
  const dir = path.join(ROOT, 'majors', s);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), page(i));
});

/* ---------- 3) index.html: noscript + روابط الفوتر + JSON-LD ---------- */
function noscript() {
  return '<noscript><section class="ns"><h2>SAMS Compass: التخصصات</h2><p>الموقع محتاج JavaScript عشان تشوف التفاصيل والاختبار. دي نسخة مبسطة، وفيه صفحة ثابتة لكل تخصص.</p>' +
    M.map((m, i) => '<h3><a href="majors/' + SLUGS[i] + '/">' + esc(m.n) + '</a></h3><p>' + esc(m.d) + '</p><ul>' +
      m.j.map(j => '<li>' + esc(j.t) + ' — ' + esc(j.s) + ' (' + (DOCS.has(jk(j.t)) ? 'موثّق' : 'تقديري') + ')</li>').join('') + '</ul>').join('') +
    '<p>الأرقام تقديرات تقريبية شهرية بالجنيه المصري، والمكتوب جنبها "تقديري" لسه مش موثّق بمصدر. للتواصل أو التبليغ عن رقم غلط: ahmedwaelothman612 [at] gmail [dot] com</p></section></noscript>';
}
function footerNav() {
  return '<nav class="fnav" aria-label="كل التخصصات">' + M.map((m, i) => '<a href="majors/' + SLUGS[i] + '/">' + esc(m.n) + '</a>').join('') + '</nav>';
}
function siteLd() {
  return '<script type="application/ld+json">' + JSON.stringify({
    '@context': 'https://schema.org', '@type': 'WebSite', name: 'SAMS Compass', url: SITE, inLanguage: 'ar-EG',
    description: 'دليل تخصصات أكاديمية السادات للعلوم الإدارية فرع أسيوط: مجالات الشغل والشهادات والتدريب والمرتبات التقريبية.',
  }) + '</script>';
}
function inject(html, name, content) {
  const re = new RegExp('<!--BUILD:' + name + '-->[\\s\\S]*?<!--/BUILD:' + name + '-->');
  if (!re.test(html)) throw new Error('علامة BUILD:' + name + ' مش موجودة في index.html');
  return html.replace(re, () => '<!--BUILD:' + name + '-->' + content + '<!--/BUILD:' + name + '-->');
}
const idxPath = path.join(ROOT, 'index.html');
let idx = fs.readFileSync(idxPath, 'utf8');
idx = inject(idx, 'noscript', noscript());
idx = inject(idx, 'footernav', footerNav());
idx = inject(idx, 'jsonld', siteLd());
fs.writeFileSync(idxPath, idx);

/* ---------- 3.5) توحيد تاريخ "آخر تحديث للموقع" في app.js و index.html ---------- */
const DATE_RE = /(آخر تحديث للموقع: )\d{1,2} \S+ \d{4}/g;
for (const f of [...APP_FILES, 'index.html']) {
  const fp = path.join(ROOT, f);
  const src = fs.readFileSync(fp, 'utf8');
  const out = src.replace(DATE_RE, '$1' + AR_DATE);
  if (out !== src) fs.writeFileSync(fp, out);
}

/* ---------- 4) sitemap ---------- */
const urls = [SITE].concat(SLUGS.map((s, i) => url(i)));
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'),
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  urls.map(u => '<url><loc>' + u + '</loc><lastmod>' + UPDATED + '</lastmod></url>').join('\n') + '\n</urlset>\n');

console.log('مرتبات موثّقة بمصدر: ' + DOCS.size + ' من ' + keyOf.size + ' (التفاصيل في tools/sources-report.txt)');
console.log('تم: ' + SLUGS.length + ' صفحة تخصص + noscript + sitemap (' + urls.length + ' رابط). عدد الوظايف: ' + M.reduce((a, m) => a + m.j.length, 0));
