var VERIFIED="٢٨ نوفمبر ٢٠٢٦";
var FIELDS=[["all","الكل"],["data","بيانات"],["ai","ذكاء اصطناعي"],["dev","برمجة وموبايل"],["marketing","تسويق"],["business","أعمال"],["tech","تقنية عامة"]];
var OPPS=[
{n:"Microsoft × Sprints Career Launchpad",yrs:[],nt:1,o:"Microsoft / Sprints",kind:"منحة تدريب",f:["data","ai","dev","marketing"],st:"dated",dl:"2026-12-31",dlt:"٣١ ديسمبر ٢٠٢٦",fit:"الأهلية مش معلنة على الصفحة الرسمية",d:"منحة ممولة بالكامل وبدون رسوم. المسارات: الذكاء الاصطناعي، UI/UX، التسويق الرقمي، Full-stack، تطوير الموبايل، إدارة المنتجات، تحليل البيانات. المقاعد محدودة والقبول بمراجعة الطلب. لازم تسجّل وتخلّص خلال 2026، فاختار الأقصر لو متأخر (SprintUP حوالي 40 ساعة).",u:"https://www.sprints.ai/en-us/futurepass"},
{n:"P&G PEAKathon 2026",yrs:[3],o:"P&G مصر",kind:"مسابقة",f:["business","marketing"],st:"dated",dl:"2026-12-25",dlt:"٢٥ ديسمبر ٢٠٢٦",fit:"خريجو يونيو أو ديسمبر 2028 فقط",d:"مسابقة حالة أعمال لفرق من 3 إلى 4 طلبة، وكل عضو يقدم بنفسه ويعمل التقييم الأونلاين. الجولة الثانية في القاهرة الأسبوع التاني من يناير 2027 والنهائي الإقليمي في سنغافورة، وفرصة تسريع التقديم على تدريب P&G.",u:"https://pg.wd5.myworkdayjobs.com/1000/job/CAIRO-BUSINESS-OFFICE/P-G-PEAKathon-2026--The-Ultimate-Student-Business-Challenge--Challenge-Assumptions-Reach-Your-PEAK_R000163437"},
{n:"BI Intern",yrs:[1,2,3,4],o:"BBI، القاهرة الجديدة",kind:"تدريب",f:["data"],st:"nodl",dl:"",dlt:"مفيش موعد معلن",fit:"طالب جامعي أو خريج حديث في علوم الحاسب أو نظم المعلومات",d:"شغل على داشبوردات Power BI، واستعلامات SQL، وتحليل البيانات مع فريق BI. المطلوب أساس SQL، ومعرفة Power BI ميزة إضافية. اتنشر 16 نوفمبر 2026.",u:"https://bbi.teamtailor.com/jobs/8746995-bi-intern"},
{n:"Next Gen Catalyst: Assistant Brand Manager",yrs:[1,2,3,4],o:"Beyti Egypt، القاهرة",kind:"تدريب طلابي",f:["business","marketing"],st:"nodl",dl:"",dlt:"مفيش موعد معلن",fit:"طلبة جامعة حاليين أو خريجون جدد، أي سنة دراسية",d:"برنامج Student on Project لمدة 6 شهور من فبراير إلى يوليو 2027، لازم تكون متفرغ طول المدة. تدريب في التسويق وإدارة العلامة التجارية. اتنشر 23 نوفمبر 2026.",u:"https://careers.beyti.eg/job/Cairo-Next-Gen-Catalyst-Program-Assistant-Brand-Manager/1459594833/"},
{n:"Next Gen Catalyst: IT Business Analyst",yrs:[1,2,3,4],o:"Beyti Egypt، القاهرة",kind:"تدريب طلابي",f:["business","tech"],st:"nodl",dl:"",dlt:"مفيش موعد معلن",fit:"طلبة جامعة حاليين أو خريجون جدد، أي سنة دراسية",d:"برنامج Student on Project لمدة 6 شهور من فبراير إلى يوليو 2027، لازم تكون متفرغ طول المدة. تدريب في تقنية المعلومات وتحليل الأعمال. اتنشر 12 نوفمبر 2026.",u:"https://careers.beyti.eg/job/Cairo-Next-Gen-Catalyst-Program-IT-Business-Analyst/1456718133/"},
{n:"Next Gen Catalyst: Consumer Insights Executive",yrs:[1,2,3,4],o:"Beyti Egypt، القاهرة",kind:"تدريب طلابي",f:["business","marketing"],st:"nodl",dl:"",dlt:"مفيش موعد معلن",fit:"طلبة جامعة حاليين أو خريجون جدد، أي سنة دراسية",d:"برنامج Student on Project لمدة 6 شهور من فبراير إلى يوليو 2027، لازم تكون متفرغ طول المدة. تدريب في أبحاث السوق وتحليل سلوك المستهلك. اتنشر 23 نوفمبر 2026.",u:"https://careers.beyti.eg/job/Cairo-Next-Gen-Catalyst-Program-Consumer-Insights-Executive/1459602833/"},
{n:"DEY Creativa Innovation Hubs",yrs:[4],o:"NTI / MCIT",kind:"منحة تدريب",f:["tech"],st:"rolling",dl:"",dlt:"التسجيل مفتوح طول السنة",fit:"خريجين آخر 10 سنين أو طلبة السنوات النهائية",d:"منح ممولة من وزارة الاتصالات في مراكز Creativa بمعظم المحافظات، والقبول حسب تاريخ التسجيل واختبارات القبول. مناسب لسنة التخرج، احفظه لحد ما توصل لها.",u:"https://www.nti.sci.eg/dey/creativa.html"},
{n:"Digital Egypt Youth: HireReady",yrs:[],o:"NTI",kind:"منحة تدريب",f:["tech"],st:"rolling",dl:"",dlt:"شوف صفحة المبادرة للتسجيل الحالي",fit:"خريجين من آخر 5 سنين",d:"منحة كاملة لحوالي 2500 خريج، مسارات مدتها 4 شهور فيها شهر تدريب عند شريك صناعي. للخريجين فقط، فبعد تخرجك.",u:"https://www.nti.sci.eg/dey/HireReady.html"},
{n:"AI & Data Trainee",yrs:[],o:"Smarttechsa، دمياط الجديدة",kind:"تدريب",f:["ai","data"],st:"nodl",dl:"",dlt:"مفيش موعد معلن",fit:"بكالوريوس أو خريج حديث في الحاسب أو الداتا أو الذكاء الاصطناعي",d:"شغل على نماذج تعلم الآلة وتحليل البيانات. بيطلب Python، ومكتبة Pandas، وأساس إحصاء. اتنشر 19 نوفمبر 2026 والمطلوب أقرب للخريجين، فبعد تخرجك.",u:"https://apply.workable.com/j/C677376112"}
];

(function(){
var st={f:"all",c:"all",s:"all"};
function $(i){return document.getElementById(i)}
function chips(id,arr,key){var h="";arr.forEach(function(a){h+='<button type="button" class="op-chip" data-k="'+key+'" data-v="'+a[0]+'" aria-pressed="'+(st[key]===a[0])+'">'+a[1]+'</button>'});$(id).innerHTML=h}
var COH=[["all","كل السنين"],["1","سنة أولى"],["2","سنة تانية"],["3","سنة تالتة"],["4","سنة رابعة (نهائي)"]];
var YN={1:"الأولى",2:"التانية",3:"التالتة",4:"الرابعة"};
var STS=[["all","الكل"],["dated","ليه موعد"],["rolling","مفتوح طول السنة"],["nodl","بدون موعد معلن"]];
function fmt(o){var k=st.c==="all"?null:o["c"+st.c];return k}
function render(){
 chips("opF",FIELDS,"f");chips("opC",COH,"c");chips("opS",STS,"s");
 var L=OPPS.filter(function(o){
  if(st.f!=="all"&&o.f.indexOf(st.f)<0)return false;
  if(st.s!=="all"&&o.st!==st.s)return false;
  if(st.c!=="all"&&o.yrs.indexOf(+st.c)<0)return false;
  return true;
 });
 L.sort(function(a,b){var ra=a.st==="dated"?0:1,rb=b.st==="dated"?0:1;if(ra!==rb)return ra-rb;return a.dl<b.dl?-1:a.dl>b.dl?1:0});
 var h="";
 L.forEach(function(o){
  var fit=st.c!=="all"&&o.yrs.indexOf(+st.c)>=0,tags='<span class="op-tag">'+o.kind+'</span>';
  if(o.nt)tags+='<span class="op-tag warn">الأهلية مش معلنة</span>';else if(!o.yrs.length)tags+='<span class="op-tag warn">بعد التخرج</span>';
  else if(o.yrs.length===4)tags+='<span class="op-tag good">مناسب لكل السنين</span>';
  else tags+='<span class="op-tag good">مناسب للسنة '+YN[o.yrs[0]]+'</span>';
  h+='<article class="op-card'+(fit?' fit':'')+'"><div class="op-tags">'+tags+'</div><h3 dir="auto">'+o.n+'</h3><div class="op-org">'+o.o+'</div><p>'+o.d+'</p><div class="op-meta"><span><b>الموعد:</b> '+o.dlt+'</span><span><b>مين يقدم:</b> '+o.fit+'</span><span><b>اتأكدنا منه:</b> '+VERIFIED+'</span></div><a class="op-btn" href="'+o.u+'" target="_blank" rel="noopener">الصفحة الرسمية<span aria-hidden="true">↗</span></a></article>';
 });
 $("opList").innerHTML=h||'<div class="op-empty">مفيش فرصة متأكد منها بالفلاتر دي دلوقتي. جرّب "كل السنين" أو "الكل".</div>';
 $("opCount").textContent=L.length+" فرصة";
}
document.addEventListener("click",function(e){var b=e.target.closest(".op-chip");if(!b)return;st[b.getAttribute("data-k")]=b.getAttribute("data-v");render()});
render();
})();
