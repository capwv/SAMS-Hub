/* Infinity University Activity - accounts, progress sync and activity tracking (shared by all *-from-zero academies) */
(function(){
  var S=document.currentScript; if(window.__iuaAcct) return; window.__iuaAcct=1;
  var slug=(S&&S.getAttribute('data-slug'))||(location.pathname.split('/')[1]||'site');
  var API='https://ttbhkelmmnhoohucewda.supabase.co/rest/v1/rpc/',KEY='sb_publishable_dtIO-b76YDbgp6RNCr_mjA_LZLdc1Z8';
  var HUB='https://capwv.github.io/SAMS-Hub/',KA='iua-acct',KB='iua-anon';
  var setRaw=Storage.prototype.setItem;
  function get(k){try{return localStorage.getItem(k)}catch(e){return null}}
  function put(k,v){try{setRaw.call(localStorage,k,v)}catch(e){}}
  function del(k){try{localStorage.removeItem(k)}catch(e){}}
  function J(s){try{return JSON.parse(s)}catch(e){return null}}
  function el(t,a,h){var e=document.createElement(t);for(var k in a||{})e.setAttribute(k,a[k]);if(h!=null)e.innerHTML=h;return e}
  function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
  var anon=get(KB);if(!anon){anon=Math.random().toString(36).slice(2)+Date.now().toString(36);put(KB,anon)}
  var acct=J(get(KA))||null;var HUBMODE=(slug==='hub');var gated=false,after=null;
  function saveAcct(a){acct=a;if(a)put(KA,JSON.stringify(a));else del(KA)}
  function rpc(n,a,ka){return fetch(API+n,{method:'POST',keepalive:!!ka,headers:{apikey:KEY,'Content-Type':'application/json'},body:JSON.stringify(a||{})}).then(function(r){return r.json()}).catch(function(){return{error:'net'}})}
  /* ---------- tracking ---------- */
  var q=[],nClicks=0;
  function track(type,meta){if(!acct||HUBMODE)return;q.push({type:type,slug:slug,meta:meta||null});if(q.length>=20)flush()}
  function flush(ka){if(!q.length)return;var b=q.splice(0,30);rpc('app_track',{p_token:acct?acct.token:null,p_anon:anon,p_events:b},ka)}
  setInterval(flush,8000);
  addEventListener('pagehide',function(){flush(true)});
  document.addEventListener('visibilitychange',function(){if(document.hidden)flush(true)});
  document.addEventListener('click',function(e){
    var t=e.target;if(!t||!t.closest||nClicks>150)return;
    var b=t.closest('button,a,[role=button],summary,[data-id],li,.lesson-item,select');
    if(!b||b.closest('#iua-am,#iua-ab,#iua-ov,#iua-tst'))return;
    var tag=b.tagName;if(tag==='INPUT'||tag==='TEXTAREA')return;
    var tx=(b.getAttribute('aria-label')||b.textContent||'').replace(/\s+/g,' ').trim().slice(0,40);
    if(!tx)return;nClicks++;track('click',{target:tx});
  },true);
  /* ---------- progress snapshot / merge ---------- */
  function isP(k){return /progress(-v\d+)?$/i.test(k)&&!/^iua-/.test(k)}
  function isL(k){return /-lab-v\d+$/i.test(k)&&!/^iua-/.test(k)}
  function snap(){var p={},l={};try{for(var i=0;i<localStorage.length;i++){var k=localStorage.key(i);if(isP(k))p[k]=localStorage.getItem(k);else if(isL(k))l[k]=localStorage.getItem(k)}}catch(e){}return{p:p,l:l}}
  function stats(sn){var best=0,names=Object.keys(sn.p),ids={},hasIds=0;[].forEach.call(document.querySelectorAll('.nav-item[data-id]'),function(e){ids[e.getAttribute('data-id')]=1;hasIds=1});for(var i=0;i<names.length;i++){if(ownKey&&names[i]!==ownKey)continue;var o=J(sn.p[names[i]]);if(o&&o.done){var n=0;for(var k in o.done)if(o.done[k]&&(ownKey||!hasIds||ids[k]))n++;if(n>best)best=n}}
    var t=document.getElementById('progress-text'),pct=0;if(t){var m=t.textContent.replace(/[٠-٩]/g,function(d){return '٠١٢٣٤٥٦٧٨٩'.indexOf(d)}).match(/\d+/);if(m)pct=Math.min(100,+m[0])}
    return{lessons:best,pct:pct}}
  function mergeP(a,b){if(!a)return b;if(!b)return a;var o={},k;for(k in b)o[k]=b[k];for(k in a)o[k]=a[k];o.done={};var x=[b.done||{},a.done||{}];for(var i=0;i<2;i++)for(k in x[i])if(x[i][k])o.done[k]=x[i][k];o.answers={};x=[b.answers||{},a.answers||{}];for(i=0;i<2;i++)for(k in x[i])o.answers[k]=x[i][k];return o}
  function merge(loc,rem){var out={p:{},l:{}},k;rem=rem||{p:{},l:{}};
    for(k in loc.p)out.p[k]=JSON.stringify(mergeP(J(loc.p[k]),J(rem.p&&rem.p[k])));
    for(k in (rem.p||{}))if(!(k in out.p))out.p[k]=rem.p[k];
    for(k in loc.l)out.l[k]=loc.l[k];for(k in (rem.l||{}))if(!(k in out.l))out.l[k]=rem.l[k];return out}
  function same(a,b){return JSON.stringify(a)===JSON.stringify(b)}
  function norm(sn){var o={p:{},l:sn.l};for(var k in sn.p){var v=J(sn.p[k]);o.p[k]=v?JSON.stringify(v):sn.p[k]}return o}
  var lastPushed='',pushT=0,known=0,pulling=0;
  function push(force){if(!acct||HUBMODE)return;var sn=snap(),s=JSON.stringify(sn);if(!force&&s===lastPushed)return;var st=stats(sn);
    if(st.lessons<known){if(!pulling){pulling=1;pull(function(){pulling=0})}return}
    known=Math.max(known,st.lessons);lastPushed=s;
    rpc('app_save_progress',{p_token:acct.token,p_slug:slug,p_data:s,p_pct:st.pct,p_lessons:st.lessons},force).then(function(r){if(r&&r.error==='auth'){saveAcct(null);lastPushed='';ui()}else if(r&&r.error)lastPushed='';else schedStatus()})}
  function schedule(){clearTimeout(pushT);pushT=setTimeout(function(){push()},1500)}
  var ownKey='';Storage.prototype.setItem=function(k){setRaw.apply(this,arguments);if(this===localStorage&&isP(k))ownKey=k;if(this===localStorage&&(isP(k)||isL(k))){schedule();recLast()}};
  setInterval(function(){if(acct)push()},4000);
  addEventListener('pagehide',function(){if(acct)push(true)});
  function pull(cb){if(!acct)return cb&&cb(false);
    rpc('app_get_progress',{p_token:acct.token}).then(function(r){
      if(r&&r.error==='auth'){saveAcct(null);ui();if(!HUBMODE)lock();return cb&&cb(false)}
      if(!r||r.error)return cb&&cb(false);
      var it=null;(r.items||[]).forEach(function(x){if(x.slug===slug)it=x});
      var rem=it&&J(it.data),loc=snap(),m=merge(loc,rem),changed=false,k;if(it)known=Math.max(known,it.lessons||0);
      for(k in m.p)if(JSON.stringify(J(m.p[k]))!==JSON.stringify(J(loc.p[k])))changed=true;
      for(k in m.l)if(m.l[k]!==loc.l[k])changed=true;
      if(changed){for(k in m.p)put(k,m.p[k]);for(k in m.l)put(k,m.l[k]);
        var g='iua-rl-'+slug,last=+(sessionStorage.getItem(g)||0);
        if(Date.now()-last>15000){sessionStorage.setItem(g,Date.now());push(true);return location.reload()}}
      push(true);cb&&cb(true)})}
  /* ---------- UI ---------- */
  var css=el('style',{},
  '#iua-ab{position:fixed;inset-inline-end:18px;bottom:18px;z-index:9997;display:flex;align-items:center;gap:8px;padding:11px 16px;border:1px solid #334968;border-radius:14px;background:#0f1420;color:#e8ecf5;font:700 14px Cairo,sans-serif;cursor:pointer;box-shadow:0 8px 28px rgba(0,0,0,.45);max-width:62vw}'+
  '#iua-ab.in{border-color:#34d399}#iua-ab b{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}'+
  '#iua-am{position:fixed;inset:0;z-index:10000;display:none;align-items:center;justify-content:center;background:rgba(2,4,10,.82);padding:14px;overflow:auto}'+
  '#iua-am .bx{width:min(420px,100%);background:#0f1420;border:1px solid #2a3552;border-radius:18px;padding:20px;color:#e8ecf5;font-family:Cairo,sans-serif;direction:rtl;box-shadow:0 20px 60px rgba(0,0,0,.6)}'+
  '#iua-am h3{font-size:1.15rem;margin:0 0 6px}#iua-am p.s{color:#9aa7c2;font-size:.85rem;margin:0 0 12px;line-height:1.7}'+
  '#iua-am label{display:block;font-size:.85rem;color:#cbd5e1;margin-top:10px}'+
  '#iua-am input[type=text],#iua-am input[type=password]{width:100%;box-sizing:border-box;padding:12px 14px;border-radius:10px;border:1px solid #2a3552;background:#0a0e18;color:#fff;font:600 16px Cairo,sans-serif;margin:5px 0 0}'+
  '#iua-am input.l{direction:ltr;text-align:left}#iua-am input:focus{outline:none;border-color:#60a5fa}'+
  '#iua-am .tabs{display:flex;gap:6px;margin:10px 0 4px}#iua-am .tabs button{flex:1}'+
  '#iua-am .b{padding:11px 16px;border-radius:10px;border:1px solid #334968;background:#17253d;color:#cbd5e1;font:700 14px Cairo,sans-serif;cursor:pointer;text-decoration:none;display:inline-block;text-align:center}'+
  '#iua-am .b.on,#iua-am .b.p{background:linear-gradient(135deg,#2563eb,#7c5cff);border-color:#60a5fa;color:#fff}'+
  '#iua-am .row{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}#iua-am .row .b{flex:1;min-width:120px}'+
  '#iua-am .er{color:#fca5a5;font-size:.85rem;margin-top:10px;min-height:1.2em}#iua-am .ok{color:#86efac}#iua-am .ck{display:flex;gap:8px;align-items:center;margin-top:10px;font-size:.88rem;color:#cbd5e1}'+
  '#iua-tst{position:fixed;inset-inline-end:18px;bottom:72px;z-index:9997;max-width:min(300px,80vw);background:#0f1420;border:1px solid #60a5fa;border-radius:14px;padding:12px 14px;color:#e8ecf5;font:600 13px/1.7 Cairo,sans-serif;direction:rtl;box-shadow:0 8px 28px rgba(0,0,0,.5);display:none}'+
  '#iua-tst button{margin-top:6px;margin-inline-end:6px;padding:6px 12px;border-radius:8px;border:1px solid #334968;background:#17253d;color:#cbd5e1;font:700 12px Cairo,sans-serif;cursor:pointer}#iua-tst .p{background:linear-gradient(135deg,#2563eb,#7c5cff);color:#fff;border-color:#60a5fa}'+
  'html.iua-lock{overflow:hidden!important}html.iua-lock body>*:not(#iua-am):not(#iua-tst){visibility:hidden!important}#iua-am.gate{background:radial-gradient(1100px 560px at 50% -8%,#18294f 0%,#070a14 72%)}#iua-am.gate .bx,#iua-am.hub .bx{margin:auto}#iua-am.gate{align-items:flex-start}'+
  '#iua-ab i{font-style:normal;color:#fbbf24;font-weight:800}'+'#iua-am .stk{display:flex;gap:12px;align-items:center;justify-content:space-between;background:#0a0e18;border:1px solid #2a3552;border-radius:12px;padding:10px 12px;margin:10px 0 8px}#iua-am .stk b{font-size:1.5rem;color:#fbbf24;line-height:1.2}#iua-am .stk small{display:block;color:#9aa7c2;font-size:.74rem}'+'#iua-am .dots{display:flex;gap:5px}#iua-am .dots i{width:14px;height:14px;border-radius:50%;background:#1f2a44}#iua-am .dots i.on{background:#fbbf24}'+'#iua-am .bds{display:grid;grid-template-columns:repeat(5,1fr);gap:6px;margin:8px 0}#iua-am .bd{text-align:center;font-size:.62rem;line-height:1.35;color:#cbd5e1;border:1px solid #2a3552;border-radius:10px;padding:6px 2px;background:#0a0e18}#iua-am .bd b{display:block;font-size:1.3rem;font-weight:400}#iua-am .bd.off{opacity:.35;filter:grayscale(1)}'+'.lesson :not(pre)>code,.lesson .note,.lesson .note *{overflow-wrap:anywhere}');
  var btn=el('button',{id:'iua-ab',type:'button','aria-label':'Account'});
  var am=el('div',{id:'iua-am',role:'dialog','aria-modal':'true'});
  var tst=el('div',{id:'iua-tst'});
  var ERR={bad_username:'اسم المستخدم لازم يكون حروف إنجليزي وأرقام و _ . من ٣ لـ ٢٤ حرف',bad_password:'كلمة السر لازم تكون ٦ حروف على الأقل',taken:'الاسم ده متاخد، جرّب اسم تاني',bad_credentials:'اسم المستخدم أو كلمة السر غلط',locked:'محاولات غلط كتير، جرّب بعد ١٠ دقايق',busy:'الضغط عالي دلوقتي، جرّب كمان شوية',net:'مفيش اتصال بالإنترنت، جرّب تاني',auth:'الجلسة خلصت، سجّل دخول تاني'};
  function ui(){if(acct&&acct.user){btn.className='';btn.setAttribute('class','in');btn.innerHTML='<span>👤</span><b>'+esc(acct.user.name||acct.user.username)+'</b>'+(status&&status.streak&&status.streak.current>0?'<i>🔥'+status.streak.current+'</i>':'')}else{btn.removeAttribute('class');btn.innerHTML='<span>💾</span><b>احفظ تقدمك · سجّل</b>'}}
  function open(tab){track('auth_open',{tab:tab||'x'});if(acct&&!status&&!HUBMODE)loadStatus();am.style.display='flex';draw(tab||(acct?'me':'in'))}
  function lock(){if(isG())return;gated=true;document.documentElement.classList.add('iua-lock');am.className='gate';am.style.display='flex';draw('up')}
  function unlock(){gated=false;document.documentElement.classList.remove('iua-lock');am.className='';setTimeout(resumeInit,2500)}
  function isG(){try{return sessionStorage.getItem('iua-guest')==='1'}catch(e){return false}}
  function guest(){try{sessionStorage.setItem('iua-guest','1')}catch(e){}unlock();am.style.display='none';if(after){var hh=after;after=null;location.href=hh}}
  function shut(){if(gated)return;am.style.display='none'}
  function msg(t,ok){var e=am.querySelector('.er');if(e){e.textContent=t||'';e.className='er'+(ok?' ok':'')}}
  function draw(tab){
    if(tab==='me'&&acct){var u=acct.user;
      am.innerHTML='<div class="bx"><h3>👤 '+esc(u.name||u.username)+'</h3><p class="s" dir="ltr" style="text-align:right">@'+esc(u.username)+'</p><p class="s">تقدمك في كل الأكاديميات بيتحفظ على حسابك وتقدر تكمل من أي جهاز.</p>'+statusHTML(u)+
      '<label>الاسم اللي بيظهر في لوحة المتصدرين</label><input type="text" id="iua-dn" maxlength="30" value="'+esc(u.name||'')+'"><label class="ck"><input type="checkbox" id="iua-hd"'+(u.hidden?' checked':'')+'> اخفي اسمي من لوحة المتصدرين</label>'+
      '<div class="row"><button class="b p" id="iua-sv" type="button">حفظ</button><a class="b" target="_blank" rel="noopener" href="'+HUB+'leaderboard.html">🏆 لوحة المتصدرين</a></div>'+
      '<label>تغيير كلمة السر</label><input type="password" id="iua-op" autocomplete="current-password" placeholder="الحالية"><input type="password" id="iua-np" autocomplete="new-password" placeholder="الجديدة (٦ حروف على الأقل)">'+
      '<div class="row"><button class="b" id="iua-cp" type="button">غيّر كلمة السر</button>'+(u.admin?'<a class="b" target="_blank" rel="noopener" href="'+HUB+'admin.html">📊 لوحة الأدمن</a>':'')+'</div>'+
      '<div class="er"></div><div class="row"><button class="b" id="iua-lo" type="button">تسجيل خروج</button><button class="b" id="iua-x" type="button">إغلاق</button></div></div>';
      am.querySelector('#iua-sv').onclick=function(){rpc('app_set_prefs',{p_token:acct.token,p_display:am.querySelector('#iua-dn').value,p_hidden:am.querySelector('#iua-hd').checked}).then(function(r){if(r.user){acct.user=r.user;saveAcct(acct);ui();msg('تم الحفظ ✓',1)}else msg(ERR[r.error]||'حصل خطأ')})};
      am.querySelector('#iua-cp').onclick=function(){rpc('app_change_password',{p_token:acct.token,p_old:am.querySelector('#iua-op').value,p_new:am.querySelector('#iua-np').value}).then(function(r){msg(r.ok?'تم تغيير كلمة السر ✓':(ERR[r.error]||'حصل خطأ'),r.ok)})};
      am.querySelector('#iua-lo').onclick=function(){push(true);rpc('app_logout',{p_token:acct.token},true);var sn=snap();for(var k in sn.p)del(k);for(var k2 in sn.l)del(k2);saveAcct(null);setTimeout(function(){location.reload()},250)};
    }else{var reg=tab==='up';
      am.innerHTML='<div class="bx"><h3>'+(reg?'🎓 اعمل حساب جديد':'👋 أهلاً بيك تاني')+'</h3><p class="s">'+((gated||after)?'<b style="color:#fff">لازم تسجّل الأول عشان تدخل الأكاديمية.</b><br>':'')+'حسابك بيحفظ تقدمك على السيرفر، فمهما مسحت المتصفح أو غيّرت الجهاز تكمل من مكانك. اسمك بيظهر في لوحة المتصدرين وتقدر تخفيه.</p>'+
      '<div class="tabs"><button class="b'+(reg?'':' on')+'" data-t="in" type="button">دخول</button><button class="b'+(reg?' on':'')+'" data-t="up" type="button">حساب جديد</button></div>'+
      '<label>اسم المستخدم</label><input type="text" class="l" id="iua-un" autocomplete="username" autocapitalize="none" spellcheck="false" maxlength="24" placeholder="username">'+
      (reg?'<label>الاسم اللي يظهر للناس (اختياري)</label><input type="text" id="iua-dn" maxlength="30" autocomplete="name">':'')+
      '<label>كلمة السر</label><input type="password" class="l" id="iua-pw" autocomplete="'+(reg?'new-password':'current-password')+'" maxlength="72">'+
      '<div class="er"></div><div class="row"><button class="b p" id="iua-go" type="button">'+(reg?'إنشاء الحساب':'دخول')+'</button><button class="b" id="iua-x" type="button">إغلاق</button></div></div>';
      var tb=am.querySelectorAll('.tabs button');for(var i=0;i<tb.length;i++)tb[i].onclick=function(){draw(this.getAttribute('data-t'))};
      var go=function(){var u=am.querySelector('#iua-un').value,p=am.querySelector('#iua-pw').value,d=reg?am.querySelector('#iua-dn').value:null;msg('...',1);
        rpc(reg?'app_register':'app_login',reg?{p_username:u,p_password:p,p_display:d}:{p_username:u,p_password:p}).then(function(r){
          if(r.token){saveAcct({token:r.token,user:r.user});ui();msg('تم ✓ بنحمّل تقدمك...',1);lastPushed='';(HUBMODE?function(f){f(true)}:pull)(function(){unlock();shut();if(after){var hh=after;after=null;location.href=hh;return}track('view',{ref:'gate'});toast(reg?'تم إنشاء حسابك 🎉 تقدمك بيتحفظ تلقائي':'أهلاً '+esc(r.user.name||r.user.username)+' 👋 تقدمك اتحمّل',1500)})}else msg(ERR[r.error]||'حصل خطأ')})};
      am.querySelector('#iua-go').onclick=go;am.querySelector('#iua-pw').onkeydown=function(e){if(e.key==='Enter')go()};
      setTimeout(function(){var f=am.querySelector('#iua-un');if(f)f.focus()},50)}
    var xb=am.querySelector('#iua-x');xb.onclick=function(){after=null;shut()};if(gated||after){xb.textContent='كمّل كضيف 👀';xb.onclick=guest}}
  function toast(h,ms){tst.innerHTML=h;tst.style.display='block';clearTimeout(toast.t);toast.t=setTimeout(function(){tst.style.display='none'},ms||6000)}

  /* ---------- streak + badges ---------- */
  var BD={first_lesson:['🌱','أول درس'],lessons_10:['📘','١٠ دروس'],lessons_50:['📚','٥٠ درس'],lessons_100:['🏅','١٠٠ درس'],explorer:['🧭','مستكشف: ٣ كورسات'],first_cert:['🎓','أول شهادة'],certs_3:['🏆','٣ شهادات'],streak_3:['🔥','٣ أيام ورا بعض'],streak_7:['⚡','أسبوع كامل'],streak_30:['👑','٣٠ يوم ورا بعض']};
  var BDK=['first_lesson','lessons_10','lessons_50','lessons_100','explorer','first_cert','certs_3','streak_3','streak_7','streak_30'];
  var status=null,stT=0;
  function loadStatus(){if(!acct||HUBMODE)return;var first=!status;rpc('app_my_status',{p_token:acct.token}).then(function(r){if(!r||r.error||!r.streak)return;status=r;ui();checkBadges(r.badges.earned||[]);if(first&&am.style.display==='flex'&&am.querySelector('#iua-sv'))draw('me')})}
  function schedStatus(){clearTimeout(stT);stT=setTimeout(loadStatus,2500)}
  function checkBadges(e){if(!acct||!acct.user)return;var k='iua-bdg-'+acct.user.username,seen=J(get(k)),n;if(!seen)seen=[];n=e.filter(function(x){return seen.indexOf(x)<0});if(!n.length)return;put(k,JSON.stringify(e));toast('🏅 شارة جديدة!<br>'+n.slice(0,3).map(function(x){return BD[x]?BD[x][0]+' '+BD[x][1]:x}).join(' · '),7000)}
  function weekDots(sk){var d=new Date(sk.today+'T12:00:00Z'),h='';for(var i=6;i>=0;i--){var x=new Date(d.getTime()-i*864e5).toISOString().slice(0,10);h+='<i'+(sk.days.indexOf(x)>-1?' class="on"':'')+'></i>'}return h}
  function statusHTML(u){if(!status||!status.streak)return '<p class="s">بنحمّل السلسلة والشارات...</p>';var sk=status.streak,ea=status.badges.earned||[];
    var h='<div class="stk"><div><b>🔥 '+sk.current+'</b><small>'+(sk.current>0?'يوم ورا بعض':'ابدأ سلسلة النهارده')+' · أطول سلسلة '+sk.best+'</small></div><div class="dots" title="آخر ٧ أيام">'+weekDots(sk)+'</div></div><div class="bds">';
    BDK.forEach(function(k){h+='<div class="bd'+(ea.indexOf(k)>-1?'':' off')+'" title="'+BD[k][1]+'"><b>'+(ea.indexOf(k)>-1?BD[k][0]:'🔒')+'</b>'+BD[k][1]+'</div>'});
    h+='</div>';
    h+=u.hidden?'<p class="s">ملفك العام مقفول لأنك مخفي من لوحة المتصدرين.</p>':'<div class="row"><a class="b" target="_blank" rel="noopener" href="'+HUB+'profile.html?u='+encodeURIComponent(u.username)+'">🪪 ملفي العام</a></div>';
    return h}
  /* ---------- resume where you stopped ---------- */
  var resumed=0;
  function titleOf(id){var n=document.querySelector('.nav-item[data-id="'+id+'"]');if(!n)return '';var sp=n.querySelectorAll('span');return sp.length?sp[sp.length-1].textContent.trim():''}
  function lastId(){var sn=snap(),id=null;for(var k in sn.p){var o=J(sn.p[k]);if(o&&o.lastLesson)id=o.lastLesson}return id}
  function recLast(){if(HUBMODE)return;var id=lastId();if(!id)return;var m=J(get('iua-last'))||{},o=m[slug],t=titleOf(id)||(o&&o.id===id?o.title:'');m[slug]={id:id,title:t||'',ts:Date.now()};put('iua-last',JSON.stringify(m))}
  function resumeInit(){if(HUBMODE||gated||resumed)return;resumed=1;
    var h=(location.hash||'').match(/resume=([^&]+)/);
    if(h){var id=decodeURIComponent(h[1]),tries=0,iv=setInterval(function(){var n=document.querySelector('.nav-item[data-id="'+id.replace(/"/g,'')+'"]');if(n){clearInterval(iv);n.click();try{history.replaceState(null,'',location.pathname+location.search)}catch(e){}}else if(++tries>40)clearInterval(iv)},250);return}
    var lid=lastId(),hero=document.getElementById('hero');if(!lid||!hero||hero.style.display==='none')return;
    var tt=titleOf(lid);if(!tt)return;
    tst.innerHTML='كمّل من مكانك 👇<br><b>'+esc(tt)+'</b><br><button class="p" id="iua-r1">كمّل</button><button id="iua-r2">بعدين</button>';tst.style.display='block';
    document.getElementById('iua-r1').onclick=function(){tst.style.display='none';var n=document.querySelector('.nav-item[data-id="'+lid.replace(/"/g,'')+'"]');if(n)n.click()};
    document.getElementById('iua-r2').onclick=function(){tst.style.display='none'}}
  function nudge(){if(acct||HUBMODE||gated||sessionStorage.getItem('iua-nudge'))return;var st=stats(snap());if(st.lessons<1)return;sessionStorage.setItem('iua-nudge','1');
    tst.innerHTML='أحسنت! خلصت أول درس 🎉 سجّل حساب عشان تقدمك ما يضيعش وتدخل لوحة المتصدرين.<br><button class="p" id="iua-n1">سجّل دلوقتي</button><button id="iua-n2">بعدين</button>';tst.style.display='block';
    document.getElementById('iua-n1').onclick=function(){tst.style.display='none';open('up')};document.getElementById('iua-n2').onclick=function(){tst.style.display='none'}}
  function mount(){document.head.appendChild(css);document.body.appendChild(btn);document.body.appendChild(am);document.body.appendChild(tst);ui();
    btn.onclick=function(){open()};am.addEventListener('click',function(e){if(e.target===am)shut()});document.addEventListener('keydown',function(e){if(e.key==='Escape'&&am.style.display==='flex')shut()});
    track('view',{ref:(document.referrer||'').slice(0,60)});
    if(acct){rpc('app_me',{p_token:acct.token}).then(function(r){if(r&&r.error==='auth'){saveAcct(null);ui();if(!HUBMODE)lock()}else if(r&&r.user){acct.user=r.user;saveAcct(acct);ui();if(!HUBMODE){pull();loadStatus()}}else if(r&&r.error==='auth'&&false){}})}
    setInterval(nudge,5000);fixCopy();setTimeout(resumeInit,1800);
    if(HUBMODE){document.addEventListener('click',function(e){if(acct||isG())return;var a=e.target&&e.target.closest&&e.target.closest('a[href*="-from-zero"]');if(!a)return;e.preventDefault();e.stopPropagation();after=a.href;am.className='hub';am.style.display='flex';draw('up')},true)}else if(!acct)lock()}
  function fixCopy(){var o='تقدمك بيتحفظ لوحده في المتصفح، فممكن تقفل وترجع تكمل من مكانك.',n='سجّل حساب ببلاش وتقدمك يتحفظ على حسابك، فتكمل من مكانك على أي جهاز حتى لو مسحت المتصفح.';var w=document.createTreeWalker(document.body,4),t;while(t=w.nextNode())if(t.nodeValue.indexOf(o)>-1)t.nodeValue=t.nodeValue.replace(o,n)}
  window.__iuaAccount={open:open,track:track};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
})();
