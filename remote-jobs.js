var VERIFIED="٢٨ نوفمبر ٢٠٢٦";
var FIELDS=[["all","الكل"],["data","بيانات"],["dev","برمجة وويب"],["marketing","تسويق"],["sales","مبيعات"],["support","دعم عملاء"],["content","محتوى وكتابة"],["other","إدارة ومساعدة"]];
var ORIGIN=[["all","الكل"],["f","شركة أجنبية"],["e","شركة مصرية"]];
var NS="مش مكتوب على الصفحة";
var AG="شركة توظيف، والوظيفة لعميل ليها. ";
var JOBS=[
{n:"Junior Analytics Specialist",o:"Spiralyze",org:"f",f:["data"],loc:"ريموت من القاهرة. الصفحة الرسمية محددة مصر",pay:"٨٠٠ إلى ١٢٠٠ دولار في الشهر (حسب الصفحة)",posted:"٩ سبتمبر ٢٠٢٦",pd:"2026-09-09",req:"إنجليزي بطلاقة، معرفة قوية بـ Google Sheets، وفهم للبيانات وانتباه للتفاصيل. خبرة سنة في التحليل ميزة إضافية مش شرط. لازم تتداخل ساعاتك مع ٨ص إلى ١٢ظ بتوقيت نيويورك.",deg:"الصفحة ما ذكرتش شرط شهادة",u:"https://spiralyze.pinpointhq.com/postings/496e61a7-ddfc-4c2d-a1b8-d1da0a59ad67"},
{n:"Junior Web Developer",o:"Storyteller",org:"f",f:["dev"],loc:"ريموت من أي مكان في مصر (حسب الصفحة)",pay:"لحد ١٥٠٠٠ يورو في السنة (حسب الصفحة)",posted:NS,pd:"",req:"مستوى مبتدئ. حماس لأدوات الذكاء الاصطناعي في البرمجة (شرط أساسي)، وحل مشكلات وتواصل كويس. TypeScript وReact وSQL ميزة إضافية. المقابلة فيها اختبار منزلي ساعة.",deg:"شهادة علوم الحاسب مش مطلوبة، ويقبلوا اللي اتعلم لوحده أو من معسكرات",u:"https://storyteller.applytojob.com/apply/WB8mD3mtlE/Junior-Web-Developer"},
{n:"Video and Image Annotation Specialist",o:"T63 (Talent 360 ME)",org:"e",f:["data"],loc:"ريموت 100% من البيت، مصر",pay:"٢٠ جنيه في الساعة، حوالي ٤٠٠٠ جنيه في الشهر (حسب الصفحة)",posted:"٨ نوفمبر ٢٠٢٦",pd:"2026-11-08",req:"مكتوب صراحة: مفيش خبرة مطلوبة. الشغل مراجعة وتصنيف فيديو وصور بتركيز وسرعة. ٨ ساعات في اليوم، ٦ أيام في الأسبوع، ورديات متغيرة. فيه تدريب من غير مرتب.",deg:"الصفحة ما ذكرتش شرط شهادة",u:"https://apply.workable.com/j/2E21E181F3"},
{n:"LiDAR Annotation Specialist (2D/3D)",o:"T63 (Talent 360 ME)",org:"e",f:["data"],loc:"ريموت 100%، مصر",pay:"٢٥ إلى ٣٠ جنيه في الساعة لو من غير خبرة (حسب الصفحة)",posted:"١٩ نوفمبر ٢٠٢٦",pd:"2026-11-19",req:"حديثي التخرج والطلبة مرحب بيهم ومفيش خبرة مطلوبة. مراجعة وتصنيف بيانات LiDAR ثنائية وثلاثية الأبعاد. ٦ إلى ٨ ساعات يوميا، وممكن تتضاف ورديات ليلية بعد ٣ شهور.",deg:"حديثي التخرج والطلبة مقبولين",u:"https://apply.workable.com/j/4A0E974232"},
{n:"Video Detection Analyst",o:"T63 (Talent 360 ME)",org:"e",f:["data"],loc:"ريموت 100% من البيت، لازم تكون ساكن في القاهرة",pay:"٢٠ جنيه في الساعة، والتدريب (١٠ إلى ١٤ يوم) من غير مرتب (حسب الصفحة)",posted:"١٦ نوفمبر ٢٠٢٦",pd:"2026-11-16",req:"مراجعة فيديو حسب معايير الجودة بعد تدريب. ٨ ساعات يوميا، ٦ أيام في الأسبوع، ورديات متغيرة وأيام إجازة غير ثابتة.",deg:"الصفحة ما ذكرتش شرط شهادة",u:"https://apply.workable.com/j/F1AE6E9013"},
{n:"Sales Development Representative (SDR) - Entry Level",o:"Opperate",org:"f",f:["sales"],loc:"ريموت 100%، والصفحة مخصصة لمصر. الشغل بتوقيت أمريكا",pay:"مرتب بالدولار مكتوب عليه تنافسي من غير رقم",posted:NS,pd:"",req:"مفيش خبرة ولا شهادة جامعية مطلوبة، المطلوب ثانوية عامة وإنجليزي واثق. مكالمات خارجية لعملاء وتحديد مواعيد، وتدريب بيتقدم.",deg:"مش مطلوبة شهادة جامعية",u:"https://jobs.workable.com/view/nCSeBHiKr3nhW45MAHYfWy/remote-sales-development-representative-(sdr)---entry-level-in-egypt-at-opperate"},
{n:"German Customer Service (Work From Home)",o:"RISEUP Group",org:"e",f:["support"],loc:"شغل من البيت بالكامل، القاهرة",pay:"صافي ٢٥٬٦٣٠ جنيه (German C1) أو ٣١٬٤٣٠ (C2) زائد KPIs وعمولة (حسب الصفحة)",posted:NS,pd:"",req:"لازم ألماني C1 أو C2. الخبرة في حسابات ألمانية ميزة مش شرط. خدمة عملاء لشركة اتصالات متعددة الجنسيات.",deg:"خريجين وفترة فراغ وغير مكملين دراسة، كلهم مقبولين",u:"https://www.careers-page.com/riseup-group/job/L9VV48W6"},
{n:"Company Operations and Administrative Assistant Intern",o:"IN-VR",org:"f",f:["other"],loc:"ريموت، لازم تكون ساكن في مصر (حسب الصفحة)",pay:NS,posted:"٦ نوفمبر ٢٠٢٦",pd:"2026-11-06",req:"طالب جامعي أو حديث التخرج في إدارة أعمال أو ضيافة أو تنظيم فعاليات أو إعلام أو مجال قريب. تنظيم وإدارة وتنسيق في شركة ريموت.",deg:"طالب أو حديث التخرج",u:"https://jobs.smartrecruiters.com/in-vr/744000160196789"},
{n:"Communications and Marketing Intern",o:"IN-VR",org:"f",f:["marketing","content"],loc:"ريموت، القاهرة (حسب الصفحة)",pay:NS,posted:"١٤ نوفمبر ٢٠٢٦",pd:"2026-11-14",req:"طالب بكالوريوس أو حديث التخرج في التسويق أو مجال قريب. شغل في التواصل والتسويق مع فريق ريموت.",deg:"طالب أو حديث التخرج",u:"https://jobs.smartrecruiters.com/in-vr/744000161640074"},
{n:"Social Media Intern",o:"Habeo",org:"f",f:["marketing","content"],loc:"ريموت 100%، والشركة بتقبل متقدمين من أي مكان في العالم",pay:NS,posted:"٦ نوفمبر ٢٠٢٦",pd:"2026-11-06",req:"طالب أو حديث التخرج في التسويق أو الإعلام أو مجال قريب. كتابة ونشر بوستات وتقارير تفاعل. الخبرة السابقة مش شرط.",deg:"طالب أو حديث التخرج",u:"https://www.usehabeo.com/careers/social-media-intern"},
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
