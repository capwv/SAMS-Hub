#!/usr/bin/env node
/* SAMS Compass - tools/ingest.js (v10)
   بيحوّل إعلانات الشغل الحقيقية (tools/postings.csv) لمصدر موثّق في data/sources.js
   وبيطلّع تقرير بيقارن الأرقام الفعلية برنج الموقع الحالي.

   التشغيل:   node tools/ingest.js            (تقرير بس، من غير ما يكتب حاجة)
              node tools/ingest.js --write    (يكتب data/sources.js كمان)
              --min=5  أقل عدد إعلانات للوظيفة علشان تتوثّق (الافتراضي 5)
   بعدها:     node tools/build.js

   صيغة postings.csv (السطر الأول عناوين الأعمدة):
     job,level,min,max,city,date,url
   job   = مفتاح الوظيفة من tools/sources-report.txt (مثال: dataanalyst)
   level = junior أو senior
   min,max = المرتب الشهري بالجنيه كرقم كامل (لو رقم واحد اكتبه في الاتنين)
   city  = المدينة (اختياري)   date = YYYY-MM-DD تاريخ الإعلان   url = رابط الإعلان
   سطور بتبدأ بـ # بتتتجاهل. */
'use strict';
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..');
const WRITE = process.argv.includes('--write');
const MIN = +((process.argv.find(a => a.startsWith('--min=')) || '--min=5').split('=')[1]) || 5; /* أقل عدد إعلانات للوظيفة علشان تتوثّق */
const jk = t => { const m = String(t).match(/[A-Za-z].*$/); return m ? m[0].toLowerCase().replace(/[^a-z0-9]/g, '') : String(t).replace(/[^\u0600-\u06FF0-9]/g, ''); };

/* بيانات الموقع النهائية: من tools/sources-report.txt (بيتولّد مع كل build، فيه المفتاح والعنوان والمرتب بعد الـ override) */
const repP = path.join(__dirname, 'sources-report.txt');
if (!fs.existsSync(repP)) { console.error('شغّل node tools/build.js الأول علشان يتولّد tools/sources-report.txt'); process.exit(1); }
const site = new Map();
fs.readFileSync(repP, 'utf8').split(/\r?\n/).forEach(l => {
  const p = l.split(' | '); if (p.length >= 4 && /^[a-z0-9\u0600-\u06FF]+$/.test(p[0].trim())) site.set(p[0].trim(), { t: p[2].trim(), s: p.slice(3).join(' | ').trim() });
});
if (!site.size) { console.error('مقدرتش أقرا tools/sources-report.txt'); process.exit(1); }

const csvPath = path.join(__dirname, 'postings.csv');
if (!fs.existsSync(csvPath)) { console.error('مفيش tools/postings.csv. انسخ tools/postings.example.csv وعدّل فيه.'); process.exit(1); }
const rows = fs.readFileSync(csvPath, 'utf8').split(/\r?\n/).map(l => l.trim()).filter(l => l && !l.startsWith('#'));
const head = rows.shift().split(',').map(x => x.trim());
const need = ['job', 'level', 'min', 'max', 'date', 'url'];
const miss = need.filter(c => !head.includes(c));
if (miss.length) { console.error('أعمدة ناقصة: ' + miss.join(', ')); process.exit(1); }

const errs = [], by = new Map();
rows.forEach((l, ix) => {
  const c = l.split(','); const o = {}; head.forEach((h, k) => o[h] = (c[k] || '').trim());
  const at = 'سطر ' + (ix + 2) + ': ';
  if (!site.has(o.job)) return errs.push(at + 'الوظيفة "' + o.job + '" مش موجودة (شوف المفاتيح في tools/sources-report.txt)');
  if (!/^(junior|senior)$/.test(o.level)) return errs.push(at + 'level لازم junior أو senior');
  const mn = +o.min, mx = +o.max;
  if (!(mn > 0 && mx >= mn)) return errs.push(at + 'min/max لازم أرقام والـ max >= min');
  if (mx > 1000000) return errs.push(at + 'الرقم كبير جدًا، اكتب المرتب الشهري بالجنيه');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(o.date)) return errs.push(at + 'التاريخ لازم YYYY-MM-DD');
  if (!/^https?:\/\//.test(o.url)) return errs.push(at + 'الرابط لازم يبدأ بـ http');
  (by.get(o.job) || by.set(o.job, []).get(o.job)).push({ ...o, mn, mx, mid: (mn + mx) / 2 });
});
if (errs.length) { console.error('✖ في مشاكل في الملف:\n- ' + errs.join('\n- ')); process.exit(1); }

const med = a => { const s = [...a].sort((x, y) => x - y), h = s.length >> 1; return s.length % 2 ? s[h] : (s[h - 1] + s[h]) / 2; };
const k = n => Math.round(n / 1000 * 10) / 10;
const out = ['SAMS Compass - تقرير الإعلانات (' + rows.length + ' إعلان، ' + by.size + ' وظيفة)', '', 'مهم: الوظيفة بتتوثّق بس لو فيها ' + MIN + ' إعلان أو أكتر. العينة الأصغر بتظهر في التقرير بس.', ''];
const entries = [];
for (const [key, ps] of by) {
  const j = site.get(key), jr = ps.filter(p => p.level === 'junior'), sr = ps.filter(p => p.level === 'senior');
  const m = j.s.match(/^(\d+)–(\d+) ألف .+ · (\d+)–(\d+) ألف/); const sj = m ? [+m[1], +m[2]] : null, ss = m ? [+m[3], +m[4]] : null;
  out.push('# ' + key + '  |  ' + j.t, '  الرنج الحالي: ' + j.s);
  const line = (lab, arr, rg) => {
    if (!arr.length) return out.push('  ' + lab + ': لا يوجد إعلانات');
    const md = k(med(arr.map(p => p.mid))), lo = k(Math.min(...arr.map(p => p.mn))), hi = k(Math.max(...arr.map(p => p.mx)));
    let v = ''; if (rg) v = md < rg[0] ? '  ⚠ الوسيط أقل من رنج الموقع' : md > rg[1] ? '  ⚠ الوسيط أعلى من رنج الموقع' : '  ✓ الوسيط جوه الرنج';
    out.push('  ' + lab + ': n=' + arr.length + (arr.length < 5 ? ' (عينة صغيرة)' : '') + ' · وسيط ' + md + ' ألف · من ' + lo + ' لـ ' + hi + ' ألف' + v);
  };
  line('مبتدئ', jr, sj); line('سينيور', sr, ss); out.push('');
  if (ps.length < MIN) { out.push('  → مش هتتوثّق: ' + ps.length + ' إعلان أقل من الحد الأدنى (' + MIN + ').', ''); continue; }
  const cities = [...new Set(ps.map(p => p.city).filter(Boolean))].join('، ');
  entries.push('  ' + key + ':{b:\'ads\',n:' + ps.length + ',d:\'' + ps.map(p => p.date).sort().pop() + '\',u:\'' + ps[0].url.replace(/'/g, '%27') + '\',note:\'' + (jr.length + ' مبتدئ + ' + sr.length + ' سينيور' + (cities ? '، ' + cities : '')) + '\'},');
}
fs.writeFileSync(path.join(__dirname, 'ingest-report.txt'), out.join('\n'));
console.log(out.join('\n'));
if (WRITE) {
  const sp = path.join(ROOT, 'data/sources.js'); let s = fs.readFileSync(sp, 'utf8');
  const re = /(\/\/ AUTO:BEGIN[^\n]*\n)[\s\S]*?(\/\/ AUTO:END)/;
  if (!re.test(s)) { console.error('علامات AUTO مش موجودة في data/sources.js'); process.exit(1); }
  s = s.replace(re, (_, a, b) => a + entries.join('\n') + '\n' + b);
  fs.writeFileSync(sp, s);
  console.log('✔ اتكتب ' + entries.length + ' مصدر في data/sources.js. شغّل: node tools/build.js');
} else console.log('(تقرير بس. أضف --write علشان تكتب data/sources.js)');
