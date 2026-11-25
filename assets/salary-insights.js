/* SAMS Compass — salary-insights.js — تحليلات المرتب: المرتب حسب نوع الشركة (SALX)، شارة موثّق/تقديري (STAG)، الريموت والفري لانس (RMTX)، وجهات التوظيف (EMPX). */
/* ===== مرتبات حسب القطاع + ريموت + جهات ===== */
const fk=n=>String(Math.round(n*2)/2).replace(/\.0$/,'');
const nums=s=>(s.match(/\d+–\d+(?![\d$])/g)||[]).map(x=>x.split('–').map(Number)).filter(p=>p[1]>=6&&p[0]<p[1]);
const FAC=[[[.6,.55],[1,1],[1.35,1.5]],[[.6,.55],[1,1],[1.3,1.45]],[[.65,.6],[1,1],[1.35,1.5]],[[1,1],[1.25,1.3],[1.7,2]]];
const AV=[[/e-Government|Policy Analyst|Government Data/,'gm'],[/حكومي|Local Government|Public Budget|Public Procurement/,'g'],[/NGO|M&E|CSR/,'pm']];
const avail=t=>(AV.find(a=>a[0].test(t))||[0,'gpm'])[1];
const SAL3=[["حكومي","fa-landmark"],["قطاع خاص محلي","fa-building"],["شركة متعددة الجنسيات / منظمة دولية","fa-globe"]];
const SLB=j=>{const m=j.s.match(/^\d+–\d+ ألف (.+?) · \d+–\d+ ألف (.+)$/);return m?[m[1],m[2]]:['مبتدئ','سينيور']};
const STAG=j=>{try{const k=(m=>m?m[0].toLowerCase().replace(/[^a-z0-9]/g,''):String(j.t).replace(/[^\u0600-\u06FF0-9]/g,''))(String(j.t).match(/[A-Za-z].*$/)),s=typeof SRC!=='undefined'&&SRC[k];return s&&s.b?'<span class="calc ok" title="مرتب موثّق بمصدر، التفاصيل جوه صفحة الوظيفة">موثّق</span>':'<span class="calc est" title="تقدير تحريري لسه مش موثّق بمصدر محدد">تقديري</span>'}catch(x){return''}}; const SNO=j=>j.sn?`<p class="gnote" style="margin-top:.5rem">${j.sn}</p>`:'';
function SALX(i,j){const P=nums(j.s),av=avail(j.t),LB=SLB(j);let F=FAC[i].map(r=>r.slice());
 if(i==3){if(!av.includes('g')){F[1]=[1,1];F[2]=[1.6,1.8]}}else if(av=='g')F[0]=[1,1];
 const rg=(p,k,fl)=>p?`${fk(Math.max(p[0]*k,fl||0))}–${fk(Math.max(p[1]*k,fl?fl+2:0))}`:'';
 const head=H('Salary by sector','المرتب حسب نوع الشركة');
 const WARN='<p class="gnote calc-note"><b>تنبيه:</b> تقسيم المرتب حسب نوع الشركة <b>مش بيانات فعلية</b>. هو الرقم الأساسي للوظيفة مضروب في نسبة ثابتة للمجال (مكتوبة على كل كارت)، والحكومي بحد أدنى 8 آلاف. اعتبره مؤشر للاتجاه بس.</p>';
 const note='<p class="gnote"><b>آخر تحديث للموقع: 22 نوفمبر 2026.</b> الأرقام تقديرات تقريبية شهرية بالجنيه المصري، واللي عليه علامة «موثّق» مبني على استبيان Paylab مصر (إجمالي قبل الضرايب والتأمينات)، والباقي تقدير تحريري معايَر على وظايف قريبة، ومفيش مصدر رسمي واحد. أغلبها للقاهرة والمدن الكبيرة، والشغل الحضوري في أسيوط والصعيد غالبًا أقل، والريموت هو اللي بيقرّب الفرق. أسماء الشركات أمثلة مش ضمان إنها بتوظف دلوقتي، وللتأكد قارن الرقم بصفحات المرتبات في Wuzzuf و LinkedIn و Glassdoor واعتبره مؤشر مش وعد.</p>';
 if(P.length<2)return head+`<div class="job"><div class="sal">${j.s}${STAG(j)}</div><p>الدخل هنا بيتحدد حسب العميل أو الشركة.</p></div>`+SNO(j)+note;
 return head+WARN+SAL3.map((s,k)=>{if(!av.includes('gpm'[k]))return `<div class="job"><h4>${s[0]}</h4><p>نادر أو مش موجود في المجال ده.</p></div>`;
  const a=rg(P[0],F[k][0],k==0?8:0),b=rg(P[1],F[k][1]);const f=F[k],tg=(f[0]==1&&f[1]==1)?'<span class="calc base">الرقم الأساسي</span>':`<span class="calc">محسوب ×${[f[0],f[1]].sort((x,y)=>x-y).filter((v,ix,ar)=>ix==0||v!=ar[ix-1]).join('–')}</span>`;
  return `<div class="job"><h4><i aria-hidden="true" class="fa-solid ${s[1]}"></i> ${s[0]}${tg}</h4><div class="sal">${a} ألف ${LB[0]} · ${b} ألف ${LB[1]}</div></div>`}).join('')+SNO(j)+note}
const LV=["ضعيف","متوسط","عالي"],EZ=["صعب","متوسط","سهل"];
const RMT=[
[/Government Data/,1,1,1,"بيانات حكومية غالبًا جوه الجهة، بس مهارات التحليل نفسها تتباع ريموت."],
[/Data Analyst/,2,2,1,"طلب كبير على Upwork و Fiverr و LinkedIn. محتاج بورتفوليو 3 مشاريع وإنجليزي كويس، والمنافسة عالية للمبتدئ."],
[/Business Process/,1,1,1,"استشارات عمليات لشركات صغيرة ريموت ممكنة بعد خبرة سنتين."],
[/Business & Systems/,1,1,0,"الريموت للي عنده خبرة سنتين+ وإنجليزي قوي. المبتدئ بيبدأ من شركة."],
[/UI\/UX/,2,2,1,"طلب عالي ومنافسة عالية. بورتفوليو Case Studies على Behance هو اللي بيفتح الباب."],
[/Data Engineer/,2,1,0,"ريموت مطلوب بس محتاج Python و SQL وسحابة بمستوى قوي."],
[/QA/,1,1,2,"أسهل مجال تقني للبداية، وفيه Testing ريموت لشركات خارجية، والمرتب أقل."],
[/DBA/,1,1,0,"إدارة قواعد بيانات ريموت لشركات صغيرة ممكنة بعد خبرة."],
[/Data Governance/,1,0,0,"مطلوب في شركات كبيرة غالبًا في مكان العمل."],
[/IT Project Manager/,1,0,0,"ريموت بعد خبرة وشهادة CAPM/PMP، والفري لانس قليل."],
[/Power BI/,2,2,1,"من أكتر المجالات المطلوبة ريموت وفري لانس. شهادة PL-300 ومشاريع منشورة بتفرق."],
[/Product Owner/,1,0,0,"ريموت بعد خبرة، والبداية عادةً من BA أو دعم منتج."],
[/IT Auditor/,1,0,0,"ريموت مع شركات استشارات ومكاتب كبيرة، ومحتاج ISO 27001 وخبرة."],
[/n8n|Automation/,2,2,2,"طلب عالي وسهل نسبيًا: Zapier و n8n و Make. بتبدأ بمشاريع صغيرة على Upwork و Fiverr."],
[/Implementation/,1,0,1,"في شركات SaaS الريموت منتشر، والعميل غالبًا أجنبي، ومحتاج إنجليزي قوي."],
[/Digital Transformation/,0,1,0,"أغلب الشغل في الجهات والبنوك، والفري لانس استشارات بعد خبرة."],
[/Power Platform/,1,1,1,"Power Apps و Power Automate عليهم طلب متوسط ومنافسة أقل من البرمجة."],
[/MIS Officer/,0,0,1,"شغل داخل الشركة غالبًا."],
[/ERP Accounting/,2,2,1,"Odoo و QuickBooks و Zoho عليهم طلب ريموت، والمحاسب اللي بيفهم ERP أندر."],
[/ERP/,1,2,0,"Odoo عليه فري لانس كتير، و SAP محتاج خبرة وشهادات."],
[/محاسب عام/,1,1,2,"مسك دفاتر وحسابات شركات صغيرة ممكنة ريموت، وأسهل بداية في المحاسبة."],
[/Cost/,1,1,1,"استشارات تكاليف لمصانع صغيرة ممكنة، والتكاليف غالبًا شغل مصنع."],
[/Tax/,1,2,1,"ضرائب مصر محلية: فري لانس مع مكاتب وشركات صغيرة (إقرارات وفاتورة إلكترونية)، والريموت الدولي أقل."],
[/Internal Auditor/,1,0,0,"ريموت جزئي في شركات كبيرة، ومحتاج خبرة."],
[/External Auditor/,0,0,1,"شغل مكاتب مراجعة بحضور، خصوصًا موسم المراجعة."],
[/Government Accountant/,0,0,1,"شغل جهة حكومية بحضور."],
[/FP&A/,2,1,0,"مطلوب ريموت في شركات خارجية، ومحتاج Excel ونمذجة قوية وإنجليزي ممتاز."],
[/Remote Bookkeeper/,2,2,2,"أسهل باب للدولار: QuickBooks و Xero لشركات صغيرة. التزام بالمواعيد وإنجليزي مهم."],
[/Forensic/,1,0,0,"استشارات بعد خبرة وشهادة CFE."],
[/Treasury/,0,0,0,"شغل داخل الشركات والبنوك."],
[/Project Accountant/,0,1,1,"فيه فري لانس لمقاولين صغار، وأغلب الشغل في المواقع والشركات."],
[/IFRS/,1,1,0,"ريموت مع شركات خارجية بعد خبرة وشهادة IFRS أو ACCA."],
[/Tech Recruiter/,2,2,1,"توظيف المبرمجين ريموت لشركات خارجية وسوق الفري لانس شغال."],
[/Recruiter/,2,2,2,"Recruitment ريموت لشركات خارجية وفري لانس لشركات صغيرة وناشئة. بداية سهلة بـ LinkedIn."],
[/HR Generalist/,0,0,1,"شغل شركة بحضور."],
[/Payroll/,1,1,1,"رواتب شركات صغيرة ممكنة ريموت، ومحتاج تمكن في قانون العمل والتأمينات."],
[/L&D/,2,2,1,"تدريب أونلاين ومدرب مستقل. شهادة TOT وبورتفوليو ورش بتفتح فرص كتير."],
[/HR Analytics/,2,1,0,"طلب كويس ريموت، ومحتاج Power BI وإحصاء."],
[/Employee Relations/,0,0,0,"شغل داخل الشركة غالبًا."],
[/Employee Experience/,1,1,1,"استبيانات وبرامج احتفاظ ممكنة ريموت لشركات صغيرة."],
[/OD Consultant/,1,2,0,"استشارات تنظيمية مستقلة بعد 5+ سنين خبرة."],
[/HRIS/,1,1,1,"إعداد نظم HR وتقارير Power BI ممكن ريموت."],
[/Employer Branding/,2,2,2,"محتوى ولينكدإن للشركات ريموت، وبداية سهلة وبورتفوليو بيتبني بسرعة."],
[/Policy Analyst/,1,1,0,"مراكز أبحاث واستشارات دولية بعد خبرة وإنجليزي ممتاز."],
[/e-Government/,0,1,0,"أغلبه جهات حكومية، والفري لانس استشارات بعد خبرة."],
[/CSR/,1,0,1,"مبادرات وتقارير استدامة ممكنة ريموت مع شركات."],
[/Public Procurement|Public Budget|Local Government|موظف حكومي/,0,0,1,"شغل جهة حكومية بحضور."],
[/Public Project/,1,1,0,"PMP/CAPM بيفتح مشاريع ريموت، والبداية من جهة."],
[/Quality & Inst/,1,2,1,"استشارات ISO مستقلة بعد خبرة وشهادة Lead Auditor."],
[/NGO/,2,1,0,"المنظمات الدولية بتوظف ريموت، لكن التنافس شديد ومحتاج إنجليزي قوي وخبرة تطوع."],
[/PR Officer/,2,2,2,"كتابة و PR وسوشيال ميديا ريموت، وبداية سهلة بحسابات صغيرة."],
[/M&E/,2,2,1,"مستشارين M&E مستقلين مطلوبين مع المنظمات، ومحتاج KoboToolbox و Excel و Power BI."]];
const TIERS=[[/Government Data/,2],[/Tech Recruiter/,2],[/Data Analyst|Power BI|Data Engineer|n8n|Automation|UI\/UX/,1],[/ERP Accounting|FP&A|IFRS|HR Analytics/,3],[/Remote Bookkeeper|Recruiter|Employer Branding|PR Officer|محاسب عام|QA Tester/,4],[/./,2]];
const TV={1:["500–900","1,500–3,000","8–15","20–45"],2:["400–800","1,200–2,500","7–12","15–35"],3:["400–800","1,200–2,500","8–15","20–40"],4:["250–500","700–1,500","5–10","10–20"]};
function RSAL(j,r){const t=TV[TIERS.find(x=>x[0].test(j.t))[1]];let h='';
 if(r[1]>0)h+=`<div class="sal">ريموت كموظف: ${t[0]}$ شهريًا في البداية · ${t[1]}$ مع الخبرة <span class="calc">شريحة تقديرية</span></div>`;
 if(r[2]>0)h+=`<div class="sal">فري لانس: ${t[2]}$ في الساعة للمبتدئ · ${t[3]}$ للخبير <span class="calc">شريحة تقديرية</span></div>`;
 return h?h+'<p class="gnote"><b>آخر تحديث للموقع: 22 نوفمبر 2026.</b> الأرقام تقديرات تقريبية شهرية بالجنيه المصري، واللي عليه علامة «موثّق» مبني على استبيان Paylab مصر (إجمالي قبل الضرايب والتأمينات)، والباقي تقدير تحريري معايَر على وظايف قريبة، ومفيش مصدر رسمي واحد. أغلبها للقاهرة والمدن الكبيرة، والشغل الحضوري في أسيوط والصعيد غالبًا أقل، والريموت هو اللي بيقرّب الفرق. أسماء الشركات أمثلة مش ضمان إنها بتوظف دلوقتي، وللتأكد قارن الرقم بصفحات المرتبات في Wuzzuf و LinkedIn و Glassdoor واعتبره مؤشر مش وعد.</p>':''}
function RMTX(j){const r=RMT.find(x=>x[0].test(j.t))||[0,0,0,1,"الشغل ده محتاج حضور غالبًا، وفرص الريموت فيه قليلة."];
 return H('Remote & freelance','ريموت وفري لانس')+`<div class="job"><p><b>طلب الريموت:</b> ${LV[r[1]]} · <b>طلب الفري لانس:</b> ${LV[r[2]]} · <b>سهولة الدخول:</b> ${EZ[r[3]]}</p><p>${r[4]}</p>${RSAL(j,r)}<p class="gnote"><b>آخر تحديث للموقع: 22 نوفمبر 2026.</b> أرقام الريموت والفري لانس بالدولار، وهي <b>شريحة تقديرية ثابتة</b> بتتحدد حسب نوع الوظيفة (4 شرائح بس)، مش رقم مأخوذ من سوق الوظيفة دي بالذات، فوظايف كتير بتاخد نفس الرقم. أسماء الشركات أمثلة مش ضمان إنها بتوظف دلوقتي، وللتأكد قارن الرقم بصفحات المرتبات في Wuzzuf و LinkedIn و Glassdoor واعتبره مؤشر مش وعد.</p></div>`}
const POOL={telecom:["اتصالات","Vodafone Egypt · Orange Egypt · e& Egypt · Telecom Egypt"],fintech:["تك مالي","Fawry · Paymob · valU · MNT-Halan"],ecom:["تجارة إلكترونية وتطبيقات","Noon · Amazon Egypt · Jumia · Talabat · Vezeeta · Luciq"],tech:["شركات تقنية","IBM Egypt · Microsoft Egypt · Raya · ITWorx · Siemens · Schneider Electric"],banks:["بنوك","CIB · البنك الأهلي المصري · بنك مصر · QNB Egypt · Banque du Caire · AAIB · HSBC Egypt"],big4:["مكاتب مراجعة","Deloitte · PwC · EY · KPMG · Mazars · Grant Thornton"],fmcg:["شركات سلع استهلاكية","Unilever · P&G · Nestlé · PepsiCo · Coca-Cola · Juhayna · Edita · Americana"],industry:["شركات ومصانع كبيرة","Elsewedy Electric · Orascom Construction · Talaat Moustafa Group · Ezz Steel"],erp:["شركات ERP","شركات تنفيذ SAP و Odoo و Microsoft Dynamics (Partners)، وأقسام IT في الشركات الكبيرة"],govfin:["جهات حكومية مالية","وزارة المالية · مصلحة الضرائب المصرية · الجهاز المركزي للمحاسبات · الهيئة العامة للرقابة المالية · البنك المركزي المصري"],govgen:["جهات حكومية","جهاز التنظيم والإدارة (بوابة الوظائف الحكومية) · مجلس الوزراء · وزارة التخطيط · CAPMAS · المحافظات والمجالس المحلية · الأكاديمية الوطنية للتدريب"],govict:["جهات حكومية تقنية","ITIDA · وزارة الاتصالات MCIT · مركز المعلومات IDSC · هيئة الاستثمار GAFI"],intl:["منظمات دولية","UNDP · UNICEF · WFP · UNHCR · World Bank · GIZ · الاتحاد الأوروبي · Save the Children"],ngo:["جمعيات أهلية","مصر الخير · بنك الطعام المصري · مؤسسة أهل مصر · صناع الخير"],hrag:["توظيف ومراكز اتصال","Wuzzuf · Bayt · LinkedIn · Concentrix · Teleperformance"],fl:["منصات فري لانس","Upwork · Fiverr · Freelancer · مستقل · خمسات"]};
const EMPR=[[/Government Data/,"govict,govgen"],[/Data Analyst/,"telecom,fintech,ecom,banks,tech"],[/Business Process/,"banks,telecom,industry,tech"],[/Business & Systems/,"tech,banks,telecom,fintech"],[/UI\/UX/,"ecom,fintech,tech"],[/Data Engineer/,"telecom,fintech,ecom,banks"],[/QA Tester/,"tech,fintech,ecom"],[/DBA/,"banks,telecom,tech,govict"],[/Data Governance/,"banks,telecom,govict"],[/IT Project Manager/,"tech,telecom,banks,govict"],[/Power BI/,"telecom,banks,fmcg,ecom"],[/Product Owner/,"fintech,ecom,tech"],[/IT Auditor/,"banks,big4,govfin,telecom"],[/n8n|Automation/,"tech,banks,fintech,telecom,fl"],[/Implementation/,"erp,tech,fintech"],[/Digital Transformation/,"govict,banks,telecom,tech"],[/Power Platform/,"tech,erp,industry,banks"],[/MIS Officer/,"industry,fmcg,banks"],[/ERP Accounting/,"erp,industry,big4"],[/ERP/,"erp,tech,industry,banks"],
[/محاسب عام/,"fmcg,industry,banks"],[/Cost/,"industry,fmcg"],[/Tax/,"big4,fmcg,govfin"],[/Internal Auditor/,"banks,fmcg,industry,telecom"],[/External Auditor/,"big4"],[/Government Accountant/,"govfin"],[/FP&A/,"fmcg,banks,telecom"],[/Remote Bookkeeper/,"fl"],[/Forensic/,"big4,banks"],[/Treasury/,"banks,industry,fmcg"],[/Project Accountant/,"industry"],[/IFRS/,"big4,banks,industry"],
[/Tech Recruiter/,"tech,fintech,ecom,hrag"],[/Recruiter/,"hrag,fmcg,telecom,banks"],[/HR Generalist/,"industry,fmcg,banks,telecom"],[/Payroll/,"industry,fmcg,banks"],[/L&D/,"banks,telecom,fmcg,hrag,fl"],[/HR Analytics/,"telecom,banks,fmcg"],[/Employee Relations/,"industry,fmcg"],[/Employee Experience/,"telecom,fmcg,banks"],[/OD Consultant/,"banks,telecom,fmcg,hrag"],[/HRIS/,"telecom,banks,erp"],[/Employer Branding/,"fmcg,telecom,ecom,hrag"],
[/موظف حكومي|Local Government/,"govgen"],[/Policy Analyst/,"govgen,intl"],[/e-Government/,"govict,govgen,tech"],[/CSR/,"fmcg,banks,ngo"],[/Public Procurement/,"govgen,govfin"],[/Public Budget/,"govfin,govgen"],[/Public Project/,"govgen,intl,ngo"],[/Quality & Inst/,"govgen,industry,banks"],[/NGO|M&E/,"intl,ngo"],[/PR Officer/,"govgen,banks,fmcg"]];
function EMPX(i,j){const r=EMPR.find(x=>x[0].test(j.t));if(!r)return '';
 return H('Possible employers','جهات ممكن تشتغل أو تتدرب فيها')+r[1].split(',').map(k=>`<div class="job"><h4>${POOL[k][0]}</h4><p>${POOL[k][1]}</p></div>`).join('')+'<p class="gnote"><b>آخر تحديث للموقع: 22 نوفمبر 2026.</b> الأرقام تقديرات تقريبية شهرية بالجنيه المصري، واللي عليه علامة «موثّق» مبني على استبيان Paylab مصر (إجمالي قبل الضرايب والتأمينات)، والباقي تقدير تحريري معايَر على وظايف قريبة، ومفيش مصدر رسمي واحد. أغلبها للقاهرة والمدن الكبيرة، والشغل الحضوري في أسيوط والصعيد غالبًا أقل، والريموت هو اللي بيقرّب الفرق. أسماء الشركات أمثلة مش ضمان إنها بتوظف دلوقتي، وللتأكد قارن الرقم بصفحات المرتبات في Wuzzuf و LinkedIn و Glassdoor واعتبره مؤشر مش وعد.</p>'}
