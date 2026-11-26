/* SAMS learning roadmaps: ordered paths across the academies, progress from the account, self-confirmed capstone, path certificate. */
(function(){
var API='https://ttbhkelmmnhoohucewda.supabase.co/rest/v1/rpc/',KEY='sb_publishable_dtIO-b76YDbgp6RNCr_mjA_LZLdc1Z8';
var A={
'excel-da-from-zero':['Excel للتحليل','الجداول المحورية والدوال والداشبورد'],
'sql-from-zero':['SQL','استعلام البيانات وربط الجداول'],
'powerbi-from-zero':['Power BI','نمذجة البيانات وتقارير تفاعلية'],
'tableau-from-zero':['Tableau','تصوير البيانات ولوحات المعلومات'],
'python-da-from-zero':['Python للتحليل','معالجة وتحليل البيانات بالكود'],
'stats-from-zero':['الإحصاء','الأساس اللي بيتبني عليه أي تحليل'],
'ml-from-zero':['Machine Learning','بناء نماذج التعلم الآلي'],
'html-css-from-zero':['HTML و CSS','هيكلة وتصميم صفحات الويب'],
'javascript-from-zero':['JavaScript','تفاعل الصفحات ومنطق التطبيق'],
'git-from-zero':['Git و GitHub','حفظ شغلك ونشره والتعاون'],
'cpp-from-zero':['C++','أساس البرمجة والخوارزميات'],
'java-from-zero':['Java','البرمجة الكائنية وتطبيقات حقيقية'],
'flutter-from-zero':['Flutter','تطبيقات موبايل بكود واحد'],
'cyber-from-zero':['الأمن السيبراني','أساسيات الحماية والهجمات الشائعة'],
'accounting-from-zero':['المحاسبة','القيود والقوائم المالية'],
'digital-marketing-from-zero':['التسويق الرقمي','الإعلانات والمحتوى والتحليل'],
'ai-tools-from-zero':['أدوات الـ AI للشغل','استخدام الذكاء الاصطناعي في شغلك اليومي'],
'english-from-zero':['الإنجليزي','من الأساسيات لحد المستويات المتقدمة']
};
var P=[
{id:'da',n:'محلل بيانات',c:'#93c5fd',d:'من الجداول لحد تقارير تفاعلية بتحكي قصة. ده المسار الأقرب لوظايف التدريب في التحليل.',s:['excel-da-from-zero','sql-from-zero','powerbi-from-zero','python-da-from-zero'],cap:['اختار داتا ست حقيقي (مثلاً مبيعات أو تعليم)','نضّفه وحلله بـ SQL أو Python','اعمل داشبورد Power BI فيه 4 رسومات على الأقل','انشر الشغل على GitHub مع شرح قصير للنتايج']},
{id:'ds',n:'علم البيانات و ML',c:'#c4b5fd',d:'تحليل بالكود وإحصاء ثم نماذج تنبؤ.',s:['python-da-from-zero','stats-from-zero','sql-from-zero','ml-from-zero'],cap:['اختار مشكلة تنبؤ (أسعار، تصنيف، إلخ)','جهّز البيانات وقسمها تدريب واختبار','جرّب نموذجين على الأقل وقارن النتايج','اكتب تقرير من صفحة: المشكلة، الطريقة، النتيجة، حدود النموذج']},
{id:'web',n:'مطوّر ويب',c:'#fda4af',d:'تبني موقع كامل تتحكم فيه وتنشره بنفسك.',s:['html-css-from-zero','javascript-from-zero','git-from-zero'],cap:['صمم موقع من 3 صفحات بتصميم متجاوب','ضيف تفاعل بـ JavaScript (فورم، فلتر، أو لعبة)','ارفعه على GitHub Pages','اختبره على الموبايل بعرض 390 بكسل']},
{id:'soft',n:'مبرمج برمجيات',c:'#fcd34d',d:'أساس برمجي قوي من C++ لـ Java مع شغل الفريق.',s:['cpp-from-zero','java-from-zero','git-from-zero'],cap:['اختار برنامج كامل (إدارة مكتبة أو مخزن)','ابنيه بـ Java بكلاسات واضحة','سجّل شغلك بـ commits منظمة على GitHub','اكتب README بيشرح التشغيل']},
{id:'app',n:'مطوّر تطبيقات موبايل',c:'#6ee7b7',d:'برمجة كائنية ثم تطبيق موبايل فعلي.',s:['java-from-zero','git-from-zero','flutter-from-zero'],cap:['اختار فكرة تطبيق بسيطة (مهام، مصاريف)','ابنيه بـ Flutter بثلاث شاشات','جرّبه على جهاز أو محاكي','ارفع الكود على GitHub مع لقطات شاشة']},
{id:'sec',n:'الأمن السيبراني',c:'#f9a8d4',d:'أساسيات الويب والإصدارات ثم الحماية والهجمات.',s:['html-css-from-zero','git-from-zero','cyber-from-zero'],cap:['اكتب تقييم أمني لموقع تجريبي مصرّح بيه فقط','وثّق 5 نقاط ضعف شائعة وإزاي تتصلح','اعمل دليل أمان قصير لطلاب الجامعة']},
{id:'acc',n:'محاسب بيحلل',c:'#fde68a',d:'محاسبة قوية مع أدوات التحليل اللي الشركات بتطلبها.',s:['accounting-from-zero','excel-da-from-zero','powerbi-from-zero'],cap:['جهّز قوائم مالية لشركة افتراضية في Excel','احسب 5 نسب مالية وفسّرها','اعمل داشبورد Power BI للأداء المالي']},
{id:'mkt',n:'تسويق رقمي بالبيانات',c:'#fdba74',d:'تسويق مدعوم بتحليل وذكاء اصطناعي.',s:['digital-marketing-from-zero','ai-tools-from-zero','excel-da-from-zero','tableau-from-zero'],cap:['اعمل خطة حملة لمنتج أو نشاط طلابي','حدد 3 مؤشرات قياس وتابعها في Excel','اعرض النتايج في لوحة Tableau']},
{id:'job',n:'جاهز لسوق الشغل',c:'#67e8f9',d:'المهارات اللي كل وظيفة بتطلبها: لغة وAI وجداول.',s:['english-from-zero','ai-tools-from-zero','excel-da-from-zero'],cap:['جهّز سيرتك الذاتية بالإنجليزي','سجّل فيديو تعريف بنفسك دقيقة','اشتغل على مهمة حقيقية باستخدام AI وExcel']}
];
function J(s){try{return JSON.parse(s)}catch(e){return null}}
function g(k){try{return localStorage.getItem(k)}catch(e){return null}}
function s(k,v){try{localStorage.setItem(k,v)}catch(e){}}
function esc(x){return String(x==null?'':x).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function ar(n){return String(n).replace(/\d/g,function(d){return '٠١٢٣٤٥٦٧٨٩'[d]})}
var acct=J(g('iua-acct')),prog={},cur=(location.hash||'').slice(1)||P[0].id,hasData=false;
if(!P.some(function(p){return p.id===cur}))cur=P[0].id;
function pct(slug){return prog[slug]||0}
function capKey(p){return 'iua-rm-cap-'+p.id}
function stats(p){var sum=0,done=0;p.s.forEach(function(x){var v=pct(x);sum+=v;if(v>=100)done++});var cap=g(capKey(p))==='1';var total=Math.round((sum+(cap?100:0))/(p.s.length+1));return{done:done,cap:cap,total:total,courses:done===p.s.length}}
function tabs(){var h='';P.forEach(function(p){h+='<button class="rm-tab" role="tab" data-id="'+p.id+'" aria-selected="'+(p.id===cur)+'" style="--pc:'+p.c+'">'+esc(p.n)+'</button>'});document.getElementById('rmTabs').innerHTML=h}
function view(){var p=P.filter(function(x){return x.id===cur})[0],st=stats(p),h='';
h+='<div class="rm-head panel" style="--pc:'+p.c+'"><div><h2>'+esc(p.n)+'</h2><p>'+esc(p.d)+'</p></div><div class="rm-meter"><b dir="ltr">'+ar(st.total)+'%</b><div class="rm-bar"><i style="width:'+st.total+'%"></i></div><small style="color:#9aa7c2">'+ar(st.done)+' من '+ar(p.s.length)+' كورسات خلصت'+(st.cap?' + المشروع':'')+'</small></div></div><ol class="rm-steps" style="--pc:'+p.c+'">';
p.s.forEach(function(slug,i){var a=A[slug],v=pct(slug);h+='<li style="list-style:none"><a class="rm-step'+(v>=100?' done':'')+'" href="https://capwv.github.io/'+slug+'/"><span class="rm-n">'+(v>=100?'✓':ar(i+1))+'</span><span><b>'+esc(a[0])+'</b><small>'+esc(a[1])+'</small><div class="rm-mini"><i style="width:'+v+'%"></i></div></span><span class="rm-go">'+(v>=100?'خلصت ✓':v>0?ar(v)+'% كمّل ←':'ابدأ ←')+'</span></a></li>'});
h+='<li style="list-style:none"><label class="rm-step rm-cap'+(st.cap?' done':'')+'"><span class="rm-n"><input type="checkbox" id="rmCap"'+(st.cap?' checked':'')+' aria-label="أكدت مشروع التخرج"></span><span><b>مشروع التخرج</b><small>الخطوة الأخيرة: اتأكد إنك عملته بنفسك وعلّم عليه</small></span><span class="rm-cap-body"><ul>'+p.cap.map(function(c){return '<li>'+esc(c)+'</li>'}).join('')+'</ul></span></label></li></ol>';
var ok=st.courses&&st.cap;
h+='<div class="rm-cert panel" style="--pc:'+p.c+'"><div><b>شهادة مسار '+esc(p.n)+'</b><div style="color:#9aa7c2;font-size:13px;line-height:1.9">'+(ok?'جاهزة. حمّلها كصورة.':'بتتفتح لما تخلّص كل الكورسات '+(hasData?'':'(سجّل دخول علشان تقدمك يتحسب) ')+'وتأكد مشروع التخرج.')+'</div></div><button class="rm-btn" id="rmCert" style="--pc:'+p.c+'"'+(ok?'':' disabled')+'>حمّل الشهادة</button></div>';
document.getElementById('rmView').innerHTML=h;
document.getElementById('rmCap').onchange=function(){s(capKey(p),this.checked?'1':'0');view()};
document.getElementById('rmCert').onclick=function(){cert(p)}}
function fx(t){t=t.replace(/ و /g,' + ');return (/[\u0600-\u06FF]/.test(t)?'\u2067':'\u2066')+t+'\u2069'}
function cert(p){var nm=(acct&&acct.user&&(acct.user.display_name||acct.user.name||acct.user.username))||'';nm=prompt('الاسم اللي هيظهر على الشهادة',nm||'')||nm;if(!nm)return;
var c=document.getElementById('rm-canvas'),x=c.getContext('2d'),W=c.width,H=c.height;x.direction='rtl';x.textAlign='center';
x.fillStyle='#06070a';x.fillRect(0,0,W,H);x.strokeStyle=p.c;x.lineWidth=6;x.strokeRect(50,50,W-100,H-100);x.lineWidth=2;x.strokeRect(70,70,W-140,H-140);
x.fillStyle=p.c;x.font='900 40px Cairo,Tahoma,sans-serif';x.fillText('Infinity Team · SAMS',W/2,190);
x.fillStyle='#e8eefc';x.font='900 92px Cairo,Tahoma,sans-serif';x.fillText('شهادة إتمام مسار',W/2,340);
x.fillStyle=p.c;x.font='900 78px Cairo,Tahoma,sans-serif';x.fillText(fx(p.n),W/2,450);
x.fillStyle='#9aa7c2';x.font='600 38px Cairo,Tahoma,sans-serif';x.fillText('تشهد المنصة بأن',W/2,580);
x.fillStyle='#fff';var fs=100;x.font='900 100px Cairo,Tahoma,sans-serif';while(fs>40&&x.measureText(nm).width>W-300){fs-=4;x.font='900 '+fs+'px Cairo,Tahoma,sans-serif'}x.fillText(nm,W/2,720);
x.fillStyle='#9aa7c2';x.font='600 36px Cairo,Tahoma,sans-serif';x.fillText('أتم الكورسات التالية',W/2,820);
var nm2=p.s.map(function(k){return fx(A[k][0])}),sep=44,tw=0,ms=nm2.map(function(t){var w=x.measureText(t).width;tw+=w;return w});tw+=sep*(nm2.length-1);
var rx=W/2+tw/2;x.textAlign='right';nm2.forEach(function(t,i){x.fillStyle='#e8eefc';x.fillText(t,rx,880);rx-=ms[i];if(i<nm2.length-1){x.fillStyle=p.c;x.textAlign='center';x.fillText('•',rx-sep/2,880);x.textAlign='right';rx-=sep}});
x.textAlign='center';x.fillStyle='#9aa7c2';x.fillText('وأنجز مشروع التخرج الخاص بالمسار',W/2,950);
x.font='600 30px Cairo,Tahoma,sans-serif';x.fillText(new Date().toLocaleDateString('ar-EG',{year:'numeric',month:'long',day:'numeric'}),W/2,1010);
var a=document.createElement('a');a.download='roadmap-'+p.id+'.png';a.href=c.toDataURL('image/png');document.body.appendChild(a);a.click();a.remove()}
document.getElementById('rmTabs').addEventListener('click',function(e){var b=e.target.closest('.rm-tab');if(!b)return;cur=b.getAttribute('data-id');history.replaceState(null,'','#'+cur);tabs();view()});
tabs();view();
if(acct&&acct.token){fetch(API+'app_get_progress',{method:'POST',headers:{apikey:KEY,'Content-Type':'application/json'},body:JSON.stringify({p_token:acct.token})}).then(function(r){return r.json()}).then(function(r){if(r&&r.items){hasData=true;r.items.forEach(function(it){prog[it.slug]=it.pct||0});view()}}).catch(function(){})}
else document.getElementById('rmLogin').hidden=false;
})();
