var VERIFIED="٢٨ نوفمبر ٢٠٢٦";
var FIELDS=[["all","الكل"],["data","بيانات"],["dev","برمجة وويب"],["marketing","تسويق"],["other","مبيعات وإدارة"]];
var ORIGIN=[["all","الكل"],["f","شركة أجنبية"],["e","شركة مصرية"]];
var NS="مش مكتوب على الصفحة";
var AG="شركة توظيف، والوظيفة لعميل ليها. ";
var JOBS=[
{n:"Junior Analytics Specialist",o:"Spiralyze",org:"f",f:["data"],loc:"ريموت من القاهرة. الصفحة الرسمية محددة مصر",pay:"٨٠٠ إلى ١٢٠٠ دولار في الشهر (حسب الصفحة)",posted:"٩ سبتمبر ٢٠٢٦",pd:"2026-09-09",req:"إنجليزي بطلاقة، معرفة قوية بـ Google Sheets، وفهم للبيانات وانتباه للتفاصيل. خبرة سنة في التحليل ميزة إضافية مش شرط. لازم تتداخل ساعاتك مع ٨ص إلى ١٢ظ بتوقيت نيويورك.",deg:"الصفحة ما ذكرتش شرط شهادة",u:"https://spiralyze.pinpointhq.com/postings/496e61a7-ddfc-4c2d-a1b8-d1da0a59ad67"},
{n:"Marketing Data Analyst (Python & SQL)",o:"Scale Army (لعميل أمريكي)",org:"f",f:["data","marketing"],loc:"ريموت، المكان مصر، والوظيفة مفتوحة للمقيمين في أفريقيا",pay:"٢٠٠٠ إلى ٢٤٠٠ دولار في الشهر (حسب الصفحة)",posted:"١١ نوفمبر ٢٠٢٦",pd:"2026-11-11",req:AG+"٣ سنين خبرة في تحليل بيانات التسويق أو ما يشبهه، وقراءة كود Python وSQL. شغل ٩ص إلى ٥م بتوقيت EST. مستوى متقدم، مش للمبتدئين.",deg:"شهادة في مجال كمي أو خبرة عملية بتعوّض عنها",u:"https://jobs.ashbyhq.com/Scale%20Army%20Careers/0ab8c480-dbd9-4151-9d9b-982bfdaf9a6b"},
{n:"Mid/Senior Data Analyst (Power BI & SQL)",o:"INSHARO",org:"f",f:["data"],loc:"ريموت، مصر وسوريا (حسب الصفحة)",pay:NS,posted:"٢٣ نوفمبر ٢٠٢٦",pd:"2026-11-23",req:"٤ سنين خبرة على الأقل في التحليل، وPower BI وDAX وSQL وExcel بمستوى متقدم، وعربي وإنجليزي بطلاقة. عقد ١٢ شهر قابل للتجديد. مستوى متقدم.",deg:"الصفحة ما ذكرتش شرط شهادة",u:"https://insharo.com/careers/midsenior-data-analyst-power-bi-sql"},
{n:"Junior Web Developer",o:"Storyteller",org:"f",f:["dev"],loc:"ريموت من أي مكان في مصر (حسب الصفحة)",pay:"لحد ١٥٠٠٠ يورو في السنة (حسب الصفحة)",posted:NS,pd:"",req:"مستوى مبتدئ. حماس لأدوات الذكاء الاصطناعي في البرمجة (شرط أساسي)، وحل مشكلات وتواصل كويس. TypeScript وReact وSQL ميزة إضافية. المقابلة فيها اختبار منزلي ساعة.",deg:"شهادة علوم الحاسب مش مطلوبة، ويقبلوا اللي اتعلم لوحده أو من معسكرات",u:"https://storyteller.applytojob.com/apply/WB8mD3mtlE/Junior-Web-Developer"},
{n:"Mid-Level FullStack Developer",o:"Robusta",org:"e",f:["dev"],loc:"ريموت، القاهرة (حسب الصفحة)",pay:NS,posted:NS,pd:"",req:"٣ سنين خبرة في Full-Stack، وNode.js وReact وREST APIs وقواعد بيانات وGit. العقد ٤ شهور حسب العنوان. مستوى متوسط.",deg:"الصفحة ما ذكرتش شرط شهادة",u:"https://apply.workable.com/robusta/j/30D5C4E60A"},
{n:"Senior Web Developer (WordPress)",o:"Scale Army (لعميل أمريكي)",org:"f",f:["dev"],loc:"ريموت، المكان مصر، والوظيفة مفتوحة للمقيمين في أفريقيا",pay:"٢٩٠٠ إلى ٣٥٠٠ دولار في الشهر (حسب الصفحة)",posted:"٢ نوفمبر ٢٠٢٦",pd:"2026-11-02",req:AG+"من ٢ إلى ٥ سنين خبرة في تطوير الويب على WordPress. مستوى متقدم.",deg:"الصفحة ما ذكرتش شرط شهادة",u:"https://jobs.ashbyhq.com/Scale%20Army%20Careers/fd35fcf9-8658-4394-94b0-beac551ec9ec"},
{n:"Digital Marketing Coordinator",o:"Scale Army (لعميل أمريكي)",org:"f",f:["marketing"],loc:"ريموت، المكان مصر، والوظيفة مفتوحة للمقيمين في أفريقيا",pay:"١٣٠٠ إلى ٢١٠٠ دولار في الشهر (حسب الصفحة)",posted:"١٤ أكتوبر ٢٠٢٦",pd:"2026-10-14",req:AG+"سنتين خبرة على الأقل في التسويق الرقمي أو تنسيق حسابات العملاء.",deg:"الصفحة ما ذكرتش شرط شهادة",u:"https://jobs.ashbyhq.com/Scale%20Army%20Careers/0f8b0c84-bb4d-48b9-a6b4-a741304018f8"},
{n:"Social Media Manager",o:"Scale Army (لعميل أمريكي)",org:"f",f:["marketing"],loc:"ريموت، المكان مصر، والوظيفة مفتوحة للمقيمين في أفريقيا",pay:"١٤٠٠ إلى ١٨٠٠ دولار في الشهر (حسب الصفحة)",posted:"٤ نوفمبر ٢٠٢٦",pd:"2026-11-04",req:AG+"خبرة في إدارة السوشيال ميديا وعمل كاروسيل وتصميمات، ومعرفة بتحليلات السوشيال وUTM وأدوات الذكاء الاصطناعي. الصفحة ما حددتش عدد سنين الخبرة.",deg:"الصفحة ما ذكرتش شرط شهادة",u:"https://jobs.ashbyhq.com/Scale%20Army%20Careers/d41c0240-0ecc-4101-ab8d-d1f7c4f498f2"},
{n:"Digital Marketing Specialist",o:"INSHARO",org:"f",f:["marketing"],loc:"ريموت، لازم تكون في مصر (حسب الصفحة)",pay:NS,posted:"٢٣ نوفمبر ٢٠٢٦",pd:"2026-11-23",req:"سنة خبرة على الأقل في التسويق الرقمي لسوق الخليج، وB2B وإعلانات Meta وGoogle وLinkedIn وGoogle Merchant Center وSEO وإنجليزي ممتاز.",deg:"بيشترطوا بكالوريوس في التسويق أو الأعمال",u:"https://insharo.com/careers/digital-marketing-specialist"},
{n:"Inbound Sales Development Representative (GoHighLevel)",o:"Scale Army (لعميل أمريكي)",org:"f",f:["other"],loc:"ريموت، المكان مصر، والوظيفة مفتوحة للمقيمين في أفريقيا",pay:"١٠٠٠ إلى ١٤٠٠ دولار في الشهر وعمولة (حسب الصفحة)",posted:"١١ نوفمبر ٢٠٢٦",pd:"2026-11-11",req:AG+"خبرة في المبيعات الواردة وتأهيل العملاء وحجز المواعيد. الرد على العملاء من GoHighLevel وManyChat وغيرهم. شغل ٩ص إلى ٥م بتوقيت المحيط الهادي.",deg:"الصفحة ما ذكرتش شرط شهادة",u:"https://jobs.ashbyhq.com/Scale%20Army%20Careers/03173c05-184b-460e-a993-565ccd5cbfae"},
{n:"Virtual Assistant",o:"Scale Army (لعميل أمريكي)",org:"f",f:["other"],loc:"ريموت، المكان مصر، والوظيفة مفتوحة للمقيمين في أفريقيا",pay:"٧٥٠ إلى ١٠٠٠ دولار في الشهر (حسب الصفحة)",posted:"٢٤ نوفمبر ٢٠٢٦",pd:"2026-11-24",req:AG+"من سنة إلى سنتين خبرة كمساعد افتراضي أو إداري.",deg:"الصفحة ما ذكرتش شرط شهادة",u:"https://jobs.ashbyhq.com/Scale%20Army%20Careers/003e0509-13fe-42cd-9a1f-73e4b46b8ead"}
];
(function(){
var st={f:"all",o:"all"};
function $(i){return document.getElementById(i)}
function chips(id,arr,key){var h="";arr.forEach(function(a){h+='<button type="button" class="op-chip" data-k="'+key+'" data-v="'+a[0]+'" aria-pressed="'+(st[key]===a[0])+'">'+a[1]+'</button>'});$(id).innerHTML=h}
function render(){
 chips("opF",FIELDS,"f");chips("opO",ORIGIN,"o");
 var L=JOBS.filter(function(o){
  if(st.f!=="all"&&o.f.indexOf(st.f)<0)return false;
  if(st.o!=="all"&&o.org!==st.o)return false;
  return true;
 });
 L.sort(function(a,b){return a.pd<b.pd?1:a.pd>b.pd?-1:0});
 var h="";
 L.forEach(function(o){
  var tags='<span class="op-tag good">Remote</span><span class="op-tag">'+(o.org==="f"?"شركة أجنبية":"شركة مصرية")+'</span>';
  h+='<article class="op-card"><div class="op-tags">'+tags+'</div><h3 dir="auto">'+o.n+'</h3><div class="op-org">'+o.o+'</div><p>'+o.req+'</p><div class="op-meta"><span><b>المكان:</b> '+o.loc+'</span><span><b>المرتب:</b> '+o.pay+'</span><span><b>اتنشرت:</b> '+o.posted+'</span><span><b>الشهادة:</b> '+o.deg+'</span><span><b>اتأكدنا منها:</b> '+VERIFIED+'</span></div><a class="op-btn" href="'+o.u+'" target="_blank" rel="noopener">صفحة التقديم الرسمية<span aria-hidden="true">↗</span></a></article>';
 });
 $("opList").innerHTML=h||'<div class="op-empty">مفيش وظيفة متأكد منها بالفلاتر دي دلوقتي. جرّب "الكل".</div>';
 $("opCount").textContent=L.length+" وظيفة";
}
document.addEventListener("click",function(e){var b=e.target.closest(".op-chip");if(!b)return;st[b.getAttribute("data-k")]=b.getAttribute("data-v");render()});
render();
})();
