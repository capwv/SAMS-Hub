/* SAMS Compass — quiz.js — اختبار تحديد التخصص (٣٨ سؤال): الأسئلة والأوزان والحساب والنتيجة، ودوال التنقل وعنوان التاب. */
/* ===== روابط لكل صفحة + عنوان التاب + نقل الـ focus + ملاحظات ===== */
const _s=show,_j=job,_b=showBA;let _nav=false,_ready=false,_ui=false;['pointerdown','keydown'].forEach(ev=>document.addEventListener(ev,()=>{_ui=true},{capture:true,once:true}));
const _go=h=>{if(_nav||!_ready)return;try{if(location.hash!==h)history.pushState(null,'',h)}catch(e){}};
const _ttl=t=>{const s=document.getElementById('sr');if(s)s.textContent=t||'';document.title=t?t+' | SAMS Compass':'SAMS Compass | دليل التخصصات'};
const _foc=()=>{if(!_ready||!_ui)return;const h=out.querySelector&&out.querySelector('h2');if(h){h.setAttribute('tabindex','-1');h.style.outline='none';h.focus({preventScroll:true})}};
const NEEDX=/UI\/UX|Cybersecurity|QA|DBA|Web|Low-Code/;
show=function(i,k){_s(i,k);_go(k?'#m'+i+'-'+k:'#m'+i);_ttl(M[i].n);_foc()};
showBA=function(){_b();_go('#ba');_ttl('إدارة الأعمال');_foc()};
job=function(i,x){_j(i,x);let h=out.innerHTML;if(i==0&&NEEDX.test(M[i].j[x].t))h=h.replace('</h2>','</h2><span class="hrs" style="margin:.4rem 0">محتاج تعلم ذاتي إضافي برا مواد المنهج</span>');out.innerHTML=h;_go('#m'+i+'-j'+x);_ttl(sp(M[i].j[x].t)[0]);_foc()};
/* ===== اختبار تحديد التخصص (٣٨ سؤال اختيار من متعدد) ===== */
const QK=['NUM','MATH','TECH','DATA','PEOPLE','SALES','CREATE','WRITE','RULES','MARKETS','PM','EXAMS','STABLE','REMOTE','ENERGY','ECON'];
const QL={NUM:'الأرقام والدقة',MATH:'الرياضيات والإحصاء',TECH:'التكنولوجيا والنظم',DATA:'تحليل البيانات',PEOPLE:'التعامل مع الناس',SALES:'الإقناع والمبيعات',CREATE:'الإبداع وصناعة المحتوى',WRITE:'الكتابة والبحث',RULES:'التنظيم واللوائح والقوانين',MARKETS:'الأسواق والفلوس والاستثمار',PM:'التخطيط وقيادة المشروعات',EXAMS:'الصبر على الامتحانات المهنية',STABLE:'الاستقرار الوظيفي',REMOTE:'الشغل عن بعد والفري لانس',ENERGY:'قطاع الطاقة والبترول',ECON:'فهم الاقتصاد والسياسات العامة'};
const QW=s=>{const o={};(s||'').replace(/([A-Z]+)(\d)/g,(_,k,n)=>{o[k]=+n;return ''});return o};
const QS=['بتحب تعمل إيه؟','شخصيتك وطريقتك في الشغل','مهاراتك وراحتك','أهدافك وظروفك'];
/* [قسم, نص السؤال, [[الاختيار, أوزان]], id اختياري] */
const QB=[
[0,'في مشروع جماعي في الكلية، غالبًا بتلاقي نفسك بتعمل إيه؟',[['بحسب الميزانية وأظبط الأرقام','NUM2 RULES1'],['أرتب الشغل والمواعيد وأتابع الكل','PM3 RULES1'],['أصمم الفكرة والشكل والعرض','CREATE3'],['أكلم الناس وأقنعهم وأمثّل الفريق','PEOPLE2 SALES2']]],
[0,'أي نشاط من دول بيشدك أكتر؟',[['أحلل جدول بيانات كبير وأطلع منه معلومة مفيدة','DATA3 NUM1'],['أبني موقع أو أداة أو أتمتة لشغل بيتعمل يدوي','TECH3'],['أكتب تقرير أو مقال بيشرح قضية','WRITE3'],['أتابع أسعار الأسهم والدولار والذهب','MARKETS3']]],
[0,'إيه أقرب حاجة لشغلك المفضل؟',[['أراجع تفاصيل وأكتشف الغلط','NUM2 RULES3'],['أفهم الناس وأساعدهم','PEOPLE3'],['أبيع أو أعمل صفقة','SALES3 MARKETS1'],['أبتكر حاجة جديدة من الصفر','CREATE2 TECH1 PM1']]],
[0,'معاك 10 آلاف جنيه فاضلين. أول تفكيرك هيبقى:',[['أشتري أسهم أو أدخل في استثمار وأتابعه','MARKETS3'],['أدخل بيها مشروع صغير وأبيع فيه','SALES2 PM1 MARKETS1'],['أصرف على كورسات وجهاز أتعلم بيهم مهارة','TECH1 DATA1 REMOTE2'],['أحطها في شهادة بنكية آمنة','STABLE2 NUM1']]],
[0,'أكتر نوع محتوى بتتفرج عليه أو بتقراه:',[['اقتصاد وأخبار فلوس وأسواق','MARKETS2 WRITE1'],['تقنية وجاجتس وبرمجة','TECH3'],['سوشيال ميديا وإعلانات وترندات','CREATE2 SALES1'],['سياسة وقضايا مجتمع وتنمية','WRITE2 RULES1 PEOPLE1 ECON1']]],
[0,'أي مادة من أيام المدرسة أو أول سنة كانت أحب ليك؟',[['رياضيات','MATH3 NUM1'],['محاسبة وحسابات تجارة','NUM3 RULES1'],['لغة وإنشاء ومواد نظرية','WRITE3'],['حاسب آلي','TECH3']]],
[0,'تفضل المشكلة اللي:',[['ليها إجابة واحدة صح ومحددة','NUM2 RULES2 MATH1'],['ليها أكتر من حل وتحتاج إبداع','CREATE2 PM1'],['محتاجة بيانات وأرقام وأنا أستنتج منها','DATA3'],['محتاجة إقناع ناس وتفاهم بينهم','PEOPLE2 SALES1']]],
[0,'أحسن إحساس في الشغل بالنسبة لك:',[['إني حليت مشكلة معقدة بالمنطق','TECH2 DATA1 MATH1'],['إن ناس اتبسطت أو استفادت بسببي','PEOPLE3'],['إني خلصت مشروع كبير في ميعاده','PM3'],['إن حساباتي طلعت مظبوطة للمليم','NUM2 RULES2']]],
[0,'لو هتدخل مسابقة أو هاكاثون، هتاخد دور:',[['المحلل اللي بيدرس الأرقام','DATA3'],['التقني اللي بيبني الحل','TECH3'],['المتحدث والمسوّق للفكرة','SALES2 CREATE1 PEOPLE1'],['المنظّم وقائد الفريق','PM3 PEOPLE1']]],
[0,'أي ورشة هتحضرها من غير تردد؟',[['Power BI و SQL','DATA2 TECH2'],['تصوير وتصميم وتسويق','CREATE3'],['مهارات تواصل وقيادة','PEOPLE2 PM1'],['بورصة وتحليل مالي','MARKETS3 NUM1']]],
[0,'لو اشتغلت جوه مؤسسة، الأقرب ليك:',[['أجهز بيانات وتقارير للإدارة','DATA2 NUM1 TECH1'],['أتابع العقود والإجراءات والالتزام باللوائح','RULES3'],['أدير فريق وأخطط وأتابع','PM3 PEOPLE1'],['أبني علاقات مع عملاء وشركاء','SALES2 PEOPLE2']]],
[0,'بتحب تقرا عن إيه أكتر؟',[['قوانين وإجراءات وإزاي الدولة بتشتغل','RULES2 WRITE2'],['بيزنس ومشروعات ناجحة','MARKETS1 SALES1 PM1'],['الأزمات الاقتصادية وتاريخ الفلوس','MARKETS1 WRITE1 MATH1 ECON2'],['علم النفس وسلوك الناس','PEOPLE2 WRITE1']]],
[1,'الأقرب لشخصيتك:',[['هادي ومنظم وبحب التفاصيل','RULES2 NUM1'],['اجتماعي وبحب أتعرف على ناس','PEOPLE3'],['فضولي وبحب أجرب أي أداة جديدة','TECH2 CREATE1'],['جريء وبحب التحدي والمخاطرة المحسوبة','MARKETS2 SALES1']]],
[1,'بتفضل الشغل:',[['لوحدي بتركيز عالي','DATA1 NUM1 REMOTE2'],['في فريق صغير متفاهم','PM1 PEOPLE1'],['وسط ناس كتير طول اليوم','PEOPLE3 SALES1'],['متنقل ومتغير كل يوم','SALES1 CREATE1 PM1']]],
[1,'بيئة الشغل اللي بتريحك:',[['قواعد ولوائح واضحة ومسار وظيفي معروف','RULES2 STABLE3'],['مرنة ومفتوحة للتجربة','CREATE1 REMOTE1 TECH1'],['تنافسية وفيها عمولات وتارجت','SALES3 MARKETS1'],['أكاديمية وبحثية','WRITE2 DATA1 MATH1']]],
[1,'لما بتاخد قرار مهم، بتعتمد على:',[['الأرقام والبيانات','DATA3'],['اللوائح والمنطق القانوني','RULES3'],['إحساسي بالناس وقراءة المواقف','PEOPLE3'],['التجربة والمخاطرة المحسوبة','MARKETS2 SALES1']]],
[1,'الشغل اللي بيخليك تنسى الوقت هو:',[['برمجة أو ضبط نظام أو أداة','TECH3'],['كتابة أو تصميم أو تصوير','CREATE3'],['قراءة وتلخيص وفهم موضوع بعمق','WRITE3'],['حل مسائل وأرقام','MATH2 NUM2']]],
[1,'الكلام قدام ناس (عرض أو مناقشة):',[['بحبه وببقى مرتاح','PEOPLE2 SALES2'],['كويس لو كنت محضّر','WRITE1 PM1'],['بتوتر بس بتعلم','PEOPLE1'],['بتجنبه قدر الإمكان','DATA1 TECH1 REMOTE1 NUM1']]],
[1,'أصحابك محتاجين حد ينظم رحلة أو فرح أو فعالية. هتبقى:',[['اللي بينظم كل حاجة ويتابعها','PM3 RULES1'],['اللي بيتصل بالناس ويظبط التفاهمات','PEOPLE2 SALES1'],['اللي بيحسب التكاليف ويقسمها','NUM3'],['اللي بيصمم الدعوة والشكل','CREATE3']]],
[1,'أنت أقرب لـ:',[['أحب أتقن مجال واحد بعمق','MATH1 EXAMS1 DATA1'],['أحب أجرب مجالات كتير','CREATE1 TECH1 SALES1'],['أحب أبقى اللي شايف الصورة الكبيرة وبيدير','PM3'],['أحب أخدم الناس والمجتمع','PEOPLE2 WRITE1 STABLE1']]],
[2,'الرياضيات بالنسبة لك:',[['قوي فيها وبحبها','MATH3 NUM1'],['كويس في الأساسيات والتطبيقات','MATH2 NUM1'],['مقبول','MATH1'],['ضعيف وبتتعبني','']]],
[2,'الإنجليزي عندك:',[['قوي: بقرا وأتكلم وأفهم محتوى أجنبي براحة','REMOTE1'],['كويس وبتحسن','REMOTE1'],['متوسط ومحتاج شغل','' ],['ضعيف دلوقتي','']],'eng'],
[2,'الإكسل والجداول:',[['شاطر وبحبه','DATA2 NUM1'],['أعرف الأساسيات','DATA1'],['لسه ما جربتش كتير',''],['بتجنبه','']]],
[2,'البرمجة:',[['اتعلمت شوية وبحبها','TECH3 DATA1'],['نفسي أتعلم بس لسه ما بدأتش','TECH1'],['مش مهتم أوي',''],['مش بحبها خالص','']]],
[2,'الكتابة:',[['بكتب كويس وبحب أشرح أفكاري','WRITE3 CREATE1'],['بكتب لو لازم','WRITE1'],['أفضّل الأرقام على الكلام','NUM1 DATA1'],['الكتابة بتتعبني','']]],
[2,'الشغل مع عملاء أو جمهور بشكل مباشر:',[['بحبه جدًا','PEOPLE3 SALES1'],['ممكن مع الوقت','PEOPLE1'],['أفضّل أشتغل بعيد عن العملاء','DATA1 TECH1 REMOTE1'],['مش مرتاح خالص','']]],
[2,'الدقة والتفاصيل المملة (مراجعة وتسويات):',[['بتعجبني وبحس بالإنجاز','NUM2 RULES3'],['أتحملها لو ليها هدف','NUM1 RULES1'],['بتملني بسرعة','CREATE1'],['مش مناسبة ليا','']]],
[3,'أهم حاجة تدور عليها في أول وظيفة:',[['استقرار وتأمين ومعاش','STABLE3 RULES1'],['مرتب عالي بسرعة','MARKETS1 SALES1 REMOTE1'],['تعلّم وخبرة وتطور','TECH1 DATA1 PM1'],['مرونة في المكان والوقت','REMOTE3']]],
[3,'لو الفرص متاحة قدامك، تختار:',[['وظيفة حكومية مضمونة','STABLE3'],['شركة محلية كبيرة','PM1 RULES1'],['شركة متعددة الجنسيات','REMOTE1 PM1 RULES1'],['مشروعي الخاص ولو بدايته صعبة','SALES2 MARKETS2 PM1']]],
[3,'الشغل عن بعد والفري لانس بالدولار:',[['هو هدفي الأول','REMOTE3'],['مهتم بيه كمصدر دخل إضافي','REMOTE2'],['ممكن بعد ما أخد خبرة','REMOTE1'],['مش مهتم، أحب أشتغل في مكان','STABLE1 PEOPLE1']]],
[3,'الشهادات المهنية الطويلة (ACCA و CFA و IFoA) بتاخد سنين وامتحانات صعبة:',[['مستعد، وهي هدفي','EXAMS3'],['ممكن شهادة واحدة مهمة','EXAMS2'],['أفضّل كورسات قصيرة وعملية','EXAMS1'],['مش عايز امتحانات كتير','']]],
[3,'تحمّل مسؤولية قرارات مالية كبيرة:',[['بحب وعايز مسؤولية','MARKETS2 NUM1 PM1'],['ممكن بعد خبرة','NUM1'],['أفضّل أنفذ وبس','RULES1'],['بتوترني','']]],
[3,'السفر والشغل الميداني (مواقع ومصانع وشركات):',[['بحبه جدًا','PM1 PEOPLE1 SALES1'],['مقبول',''],['أفضّل مكتب ثابت','RULES1 STABLE1'],['أفضّل أشتغل من البيت','REMOTE2 DATA1']]],
[3,'تفضّل نتيجة شغلك تبقى:',[['أرقام وتقارير بتتاخد بيها قرارات','DATA2 NUM1'],['منتج أو نظام شغّال الناس بتستخدمه','TECH3'],['ناس اتحسنت حياتهم أو أداؤهم','PEOPLE2 WRITE1 STABLE1'],['مبيعات وأرباح واضحة','SALES2 MARKETS2']]],
[3,'بعد 5 سنين بتتخيل نفسك:',[['خبير أرقام وبيانات ومطلوب في السوق','DATA3'],['مدير فريق أو مشروع','PM3'],['محلل أو مستثمر في أسواق المال','MARKETS3'],['مسؤول كبير في مؤسسة أو جهة','STABLE2 RULES1 WRITE1']]],
[3,'لو التخصص صعب في الأول وهتستحمل علشان مستقبل أحسن:',[['أكيد، أنا بصبر','EXAMS2 MATH1'],['لو في طريق واضح قدامي','RULES1 PM1'],['أفضّل حاجة أسهل وأسرع','SALES1 CREATE1'],['مش متأكد','']]],
[3,'أنهي قطاع نفسك تشتغل فيه؟',[['بنوك وتأمين','NUM1 RULES1 MATH1 MARKETS1'],['شركات تقنية وتطبيقات','TECH2 CREATE1'],['بترول وطاقة وشركات كبيرة','ENERGY3 PM1'],['حكومة وهيئات ومنظمات','STABLE2 WRITE1 RULES1'],['تجارة وتسويق وإعلان','SALES2 CREATE1']]],
[3,'شغل مرتبط بمشروعات ضخمة وعقود وشركات بترول وكهرباء:',[['ده اللي أنا عايزه','ENERGY3 PM1'],['مش بعيد عني','ENERGY1'],['مش مهتم',''],['ما أعرفش عنه كفاية','']]],
[3,'لما تسمع خبر عن ارتفاع الأسعار أو سعر الدولار، أول ميل عندك:',[['أدوّر على السبب الاقتصادي وأفكر في سياسات تحل المشكلة','ECON3 WRITE1'],['أفكر أحمي فلوسي أو أستثمر','MARKETS3'],['أحسب أثره على تكلفة المشروعات والشغل','NUM2 PM1'],['ما بهتمش بالموضوع ده','']]],
[3,'لو هتشتغل على بحث كبير، تحب تدرس:',[['أثر قرار حكومي على الأسعار والبطالة','ECON3 WRITE1 DATA1'],['أداء شركة وهل سعر سهمها عادل','MARKETS3 NUM1'],['احتمال وقوع حوادث ومخاطر على الناس وتسعيرها','MATH3 DATA1'],['رضا الموظفين وأسباب استقالتهم','PEOPLE2 DATA1']]],
].map(q=>({s:q[0],t:q[1],o:q[2].map(o=>({t:o[0],w:QW(o[1])})),id:q[3]}));

/* ملف كل تخصص: درجة أهمية كل ميل (٠–٥). الترتيب = ترتيب M بعد إعادة الترتيب */
const MV=[
'TECH5 DATA4 PM3 NUM2 RULES2 PEOPLE2 CREATE1 MATH2 REMOTE3',
'NUM5 RULES5 EXAMS2 DATA2 STABLE2 REMOTE2',
'PEOPLE5 SALES2 PM2 RULES2 WRITE1 CREATE1',
'RULES5 STABLE5 WRITE3 PM2 PEOPLE2 ECON1',
'PEOPLE4 SALES3 MARKETS4 STABLE2 RULES2',
'MARKETS5 NUM4 DATA2 MATH2 EXAMS2 SALES1',
'CREATE5 SALES5 PEOPLE3 DATA3 WRITE2 REMOTE4',
'ECON5 WRITE4 DATA3 MATH3 MARKETS1 NUM2 STABLE1',
'MATH5 EXAMS5 NUM3 DATA3 RULES3',
'ENERGY5 PM3 RULES3 NUM3 STABLE3 MARKETS1'
].map(QW);
/* ملف كل مجال (الأولى تطابق الأدق). الريموت والحكومي بيتحسبوا كمان من بيانات الموقع نفسه */
const FR=[
['Economic Data Analyst','DATA5 MATH3 TECH2 NUM2 ECON3'],['Government Data Analyst','DATA4 STABLE4 RULES2 TECH2'],['Insurance Data Analyst','DATA5 MATH3 TECH3'],
['BI / Power BI','DATA5 TECH4 NUM2'],['HR Analytics','DATA5 PEOPLE2 NUM3 TECH2'],['Data Analyst','DATA5 TECH3 NUM2 MATH2 WRITE1'],
['Business & Systems','PM3 TECH3 DATA2 PEOPLE3 WRITE2 RULES2'],['ERP & Implementation','TECH3 PM3 PEOPLE3 RULES2 NUM2'],['Product Owner','PM5 PEOPLE3 TECH2 DATA2 SALES1'],
['MIS Officer','TECH3 DATA3 RULES3 STABLE3 NUM2'],['IT Auditor','RULES5 TECH3 DATA2 NUM2 STABLE2'],['UI/UX','CREATE5 TECH3 PEOPLE2 WRITE1'],
['Low-Code','TECH5 CREATE2 DATA1'],['QA &','TECH4 RULES3 DATA1'],['Cybersecurity','TECH5 RULES3 DATA2'],['DBA &','TECH5 DATA3 RULES3'],
['محاسب عام','NUM5 RULES4 STABLE2'],['Cost Accountant','NUM5 DATA2 RULES3'],['Tax Accountant','RULES5 NUM4'],['Internal Auditor','RULES5 NUM4 WRITE2 EXAMS2'],
['External Auditor','NUM4 RULES5 EXAMS3 PEOPLE1'],['Government Accountant','NUM4 RULES5 STABLE5'],['FP&A','NUM4 DATA4 MARKETS3 PM1 TECH1'],
['ERP Accounting','NUM3 TECH4 PEOPLE2 RULES2'],['Remote Bookkeeper','NUM4 REMOTE5 RULES2'],['Forensic','NUM4 RULES4 DATA3 WRITE2 EXAMS2'],
['Treasury','NUM4 MARKETS4 RULES2'],['Project Accountant','NUM4 PM3 RULES2'],['IFRS','NUM4 RULES5 WRITE2 EXAMS3'],
['Tech Recruiter','PEOPLE4 SALES3 TECH2'],['Recruiter','PEOPLE5 SALES3'],['HR Generalist','PEOPLE3 RULES4 STABLE2'],['Payroll','NUM4 RULES5'],
['L&D','PEOPLE4 CREATE3 WRITE2 PM2'],['Employee Relations','PEOPLE4 RULES4 WRITE2'],['Employee Experience','PEOPLE4 DATA2 CREATE2'],
['OD Consultant','PEOPLE3 PM3 WRITE3 DATA2'],['HRIS','TECH4 DATA3 RULES2 PEOPLE1'],['Employer Branding','CREATE4 PEOPLE3 WRITE2 SALES2'],
['موظف حكومي','RULES5 STABLE5 WRITE1'],['Policy & Investment','WRITE4 MARKETS3 RULES2 ECON4'],['Policy Analyst','WRITE5 DATA3 RULES3 ECON3'],
['e-Government','TECH3 RULES3 PM3 STABLE3'],['CSR','PEOPLE4 PM3 CREATE2 WRITE2'],['Public Procurement','RULES5 NUM3 STABLE4'],
['Public Budget','NUM4 RULES4 STABLE4'],['Public Project','PM5 RULES3 STABLE3 PEOPLE2'],['Local Government','PEOPLE3 RULES4 STABLE5'],
['Quality & Institutional','RULES4 PM3 DATA2 STABLE2'],['NGO','PEOPLE4 WRITE4 PM3'],['PR Officer','CREATE3 WRITE4 PEOPLE4 SALES1'],['M&E','DATA4 WRITE3 PM2 NUM2 ECON1'],
['Relationship Officer','PEOPLE4 SALES4 NUM2 STABLE2'],['Credit & Risk','NUM5 DATA3 RULES3 MARKETS2'],['Banking Operations','NUM3 RULES5 STABLE3'],
['AML','RULES5 DATA2 WRITE2 EXAMS1'],['Corporate Banker','MARKETS3 NUM4 SALES3 PEOPLE3'],
['Financial Analyst','NUM4 DATA4 MARKETS4'],['Investment Analyst','MARKETS5 NUM3 DATA3 MATH2 EXAMS2'],['Wealth Manager','MARKETS3 SALES4 PEOPLE4 EXAMS1'],
['Investor Relations','MARKETS3 WRITE3 PEOPLE3 NUM2'],['VC Analyst','MARKETS4 DATA3 WRITE2 SALES1'],
['Digital Marketer','CREATE4 DATA3 SALES3 TECH1'],['Business Development','SALES5 PEOPLE4 MARKETS2'],['Content Manager','CREATE5 WRITE4 PEOPLE1'],
['E-commerce','SALES3 DATA3 PM3 CREATE2 TECH2'],['Brand & Market','DATA4 WRITE3 CREATE2 MATH1'],
['Economic Researcher','WRITE5 DATA3 MATH2 STABLE2 ECON5'],['Feasibility','NUM4 DATA3 WRITE2 MARKETS2 ECON2'],['Development Consultant','WRITE4 PEOPLE3 DATA2 PM2 ECON3'],
['Actuarial Analyst','MATH5 NUM3 DATA4 EXAMS5'],['Insurance Risk','MATH3 NUM3 RULES3 DATA2'],['Pension','MATH3 NUM4 RULES3 STABLE3'],['ERM','MATH2 RULES3 DATA3 MARKETS2'],
['Energy Admin','NUM4 RULES3 PM2 ENERGY3'],['Energy Analyst','DATA4 MARKETS3 WRITE3 ENERGY3'],['Procurement & Contracts','RULES4 NUM3 SALES1 ENERGY3'],
['Renewable','PM5 ENERGY3'],['HSE','RULES5 PEOPLE2 PM2 ENERGY3']
].map(r=>[r[0],QW(r[1])]);
function fvec(i,j){const r=FR.find(x=>j.t.includes(x[0]));const v=Object.assign({},r?r[1]:MV[i]);
 const rm=RMT.find(x=>x[0].test(j.t));if(rm){const s=rm[1]+rm[2];if(s>0)v.REMOTE=Math.max(v.REMOTE||0,Math.round(s*1.25))}
 const av=avail(j.t);if(av.length<3&&av.includes('g'))v.STABLE=Math.max(v.STABLE||0,4);return v}

/* الحساب: كل ميل بيتحول لدرجة معيارية (z) مقارنة بالإجابة العشوائية، فمفيش ميل بياخد وزن زيادة عن غيره */
const QZ_KEY='sams_compass_qz_v1';
let qz={a:[],done:false,busy:false};
function qzLoad(){try{const s=localStorage.getItem(QZ_KEY);if(s){const d=JSON.parse(s);if(Array.isArray(d.a))qz.a=d.a.slice(0,QB.length);qz.done=!!d.done}}catch(e){}}
function qzSave(){try{localStorage.setItem(QZ_KEY,JSON.stringify({a:qz.a,done:qz.done}))}catch(e){}qzUpdateBanner()}
const qzN=()=>qz.a.filter(x=>x!=null&&x>=0).length;
function qzZ(){const raw={},mu={},va={},z={};QK.forEach(k=>{raw[k]=0;mu[k]=0;va[k]=0});
 QB.forEach((q,i)=>{const a=qz.a[i];if(a==null||a<0)return;
  QK.forEach(k=>{const ws=q.o.map(o=>o.w[k]||0),m=ws.reduce((x,y)=>x+y,0)/ws.length;
   mu[k]+=m;va[k]+=ws.reduce((x,y)=>x+(y-m)*(y-m),0)/ws.length;raw[k]+=q.o[a].w[k]||0})});
 QK.forEach(k=>{z[k]=va[k]>.0001?Math.max(-2.5,Math.min(2.5,(raw[k]-mu[k])/Math.sqrt(va[k]))):0});return z}
const qzSc=(v,z)=>{let s=0,w=0;for(const k in v){s+=v[k]*z[k];w+=v[k]}return w?s/w:0};
const qzPct=s=>Math.max(10,Math.min(97,Math.round((55+s*28)/5)*5));
function qzCalc(){const z=qzZ();const ms=M.map((m,i)=>({i,s:qzSc(MV[i],z)})).sort((a,b)=>b.s-a.s);
 ms.forEach(m=>{m.f=M[m.i].j.map((j,x)=>({x,s:qzSc(fvec(m.i,j),z)+.25*m.s})).sort((a,b)=>b.s-a.s)});return{z,ms}}

function qzUpdateBanner(){const btn=document.querySelector('.qz-cta');if(!btn)return;
 const tx=btn.querySelector('.qz-tx');if(!tx)return;
 const n=qzN();
 if(qz.done&&n>=15){const{ms}=qzCalc(),t=ms[0],m=M[t.i],topJob=sp(m.j[t.f[0].x].t)[0];
  tx.innerHTML=`<b>نتيجتك المحفوظة: ${m.n} (الأقرب ليك)</b><small>أنسب مجال: ${topJob} · دوس لعرض تفاصيل النتيجة أو تعديل إجاباتك</small>`}
 else if(n>0){tx.innerHTML=`<b>كمّل اختبار تحديد التخصص (متسجل ليك ${n} من ${QB.length} سؤال)</b><small>إجاباتك محفوظة تلقائيًا على جهازك · دوس تكمل من آخر سؤال وقفت عنده</small>`}
 else{tx.innerHTML=`<b>مش عارف تختار تخصصك؟ اعمل اختبار تحديد التخصص</b><small>40 سؤال اختيار من متعدد · حوالي 8 دقايق · ترشيح إرشادي للتخصص ومجال الشغل، مش حكم نهائي (وبتتحفظ النتيجة تلقائيًا)</small>`}}

/* الواجهة */
function qzMount(h){[...tabs.children].forEach(b=>b.setAttribute('aria-pressed','false'));clearTimeout(qzT);out.innerHTML=h;
 _go('#quiz');_ttl('اختبار تحديد التخصص');_foc();qz.busy=false;
 const r=out.getBoundingClientRect();if(r.top<0||r.top>innerHeight*.6)out.scrollIntoView({behavior:'smooth',block:'start'})}
function showQuiz(){if(qz.done&&qzN()>=15)return qzResult();qzIntro()}
function qzIntro(){const n=qzN(),has=n>0,nxt=qz.a.findIndex(x=>x==null);
 qzMount(`<h2 class="text-2xl md:text-3xl font-black text-white mb-2">اختبار تحديد التخصص</h2><span class="hrs">${QB.length} سؤال · حوالي 8 دقايق · حفظ تلقائي</span>
 <p class="gp">جاوب على أسئلة اختيار من متعدد عن ميولك وشخصيتك ومهاراتك وأهدافك، وفي الآخر هنرشحلك <b>التخصص الأنسب</b> وأقرب <b>مجالات الشغل</b> جواه، مع سبب الترشيح. إجاباتك ونتيجتك بتتسجل تلقائيًا عشان تلاقيها لما تفتح الموقع في أي وقت.</p>
 <ul class="c" style="margin:.8rem 0"><li>مفيش إجابة صح أو غلط</li><li>تقدر تتخطى أي سؤال</li><li>إجاباتك محفوظة تلقائيًا على متصفحك</li></ul>
 <p class="gnote" style="margin-top:1rem;padding-top:.6rem">النتيجة استرشادية مش حكم نهائي. اتحققها بتجربة كورس مجاني في المجال قبل ما تاخد القرار.</p>
 <div class="mt-4 flex flex-wrap gap-2">${has?`<button class="team-btn" onclick="qzAsk(${nxt>=0?nxt:0})"><i aria-hidden="true" class="fa-solid fa-play"></i> كمّل من حيث وقفت (${n} إجابة محفوظة)</button>${n>=15?`<button class="gtab" onclick="qzFinish()">شوف النتيجة المحفوظة</button>`:''}<button class="gtab" onclick="qzReset()">امسح الإجابات وابدأ من الأول</button>`:`<button class="team-btn" onclick="qzAsk(0)"><i aria-hidden="true" class="fa-solid fa-play"></i> ابدأ الاختبار</button>`}</div>`)}
function qzReset(){qz.a=[];qz.done=false;try{localStorage.removeItem(QZ_KEY)}catch(e){}qzUpdateBanner();qzAsk(0)}
function qzAsk(i){if(i<0)i=0;if(i>=QB.length)return qzFinish();const q=QB[i],n=qzN(),cur=qz.a[i];
 qzMount(`<div class="qz-bar"><span class="qz-pct">${i+1}/${QB.length}</span><div class="qz-prog" role="progressbar" aria-valuemin="0" aria-valuemax="${QB.length}" aria-valuenow="${i+1}"><i style="width:${Math.round((i+1)/QB.length*100)}%"></i></div></div>
 <p class="gp" style="margin:.7rem 0 0;color:var(--a2);font-weight:800;font-size:.85rem">${QS[q.s]}</p>
 <h2 class="qz-q">${q.t}</h2>
 <div role="group" aria-label="الاختيارات">${q.o.map((o,k)=>`<button class="qz-opt" aria-pressed="${cur===k}" onclick="qzPick(${i},${k})">${o.t}</button>`).join('')}</div>
 <div class="mt-4 flex flex-wrap items-center gap-2">${i>0?`<button class="gtab" onclick="qzAsk(${i-1})">← السابق</button>`:''}<button class="gtab" onclick="qzSkip(${i})">تخطي</button>${n>=15?`<button class="team-btn" style="margin-inline-start:auto" onclick="qzFinish()">شوف النتيجة دلوقتي</button>`:''}</div>`)}
let qzT=0;function qzPick(i,k){clearTimeout(qzT);qz.a[i]=k;qzSave();document.querySelectorAll('.qz-opt').forEach((b,x)=>b.setAttribute('aria-pressed',x==k));
 qzT=setTimeout(()=>{i<QB.length-1?qzAsk(i+1):qzFinish()},200)}
function qzSkip(i){if(qz.busy)return;qz.busy=true;if(qz.a[i]==null)qz.a[i]=-1;qzSave();i<QB.length-1?qzAsk(i+1):qzFinish()}
function qzFinish(){const n=qzN();
 if(n<15){const f=Math.max(0,qz.a.findIndex(x=>x==null||x<0));return qzMount(`<h2 class="text-2xl font-black text-white mb-2">محتاجين إجابات أكتر شوية</h2><p class="gp">جاوبت على ${n} سؤال بس. جاوب على 15 سؤال على الأقل علشان الترشيح يبقى مفيد.</p><button class="team-btn mt-3" onclick="qzAsk(${f})">كمّل الأسئلة</button>`)}
 qz.done=true;qzSave();qzResult()}
function qzTraits(i,z){const v=MV[i],t=QK.filter(k=>v[k]).map(k=>({k,c:v[k]*z[k],v:v[k],z:z[k]}));
 return{good:t.filter(x=>x.z>.3&&x.v>=3).sort((a,b)=>b.c-a.c).slice(0,3),warn:t.filter(x=>x.z<-.3&&x.v>=4).sort((a,b)=>a.c-b.c).slice(0,2)}}
function qzChoice(id){const i=QB.findIndex(q=>q.id===id);return i<0?null:qz.a[i]}
function qzResult(){const{z,ms}=qzCalc(),n=qzN(),t=ms[0],m=M[t.i],tr=qzTraits(t.i,z),near=ms[1].s>t.s-.12;
 const fcard=(i,f)=>{const j=M[i].j[f.x],rm=RMT.find(y=>y[0].test(j.t));
  return `<div class="job"><h4>${tt(j.t)}</h4><div class="sal">${j.s}${STAG(j)}</div>${SNO(j)}<p>${j.u}</p>${ddMini(i,j)}${rm?`<p style="font-size:.82rem;color:var(--mut)"><b>ريموت:</b> ${LV[rm[1]]} · <b>فري لانس:</b> ${LV[rm[2]]} · <b>سهولة الدخول:</b> ${EZ[rm[3]]}</p>`:''}<button class="gtab" onclick="show(${i});job(${i},${f.x})">افتح المجال وخريطة الطريق</button></div>`};
 const eng=qzChoice('eng'),tips=[];
 if(eng!=null&&eng>=2)tips.push('الإنجليزي هو أكبر مضاعف لفرصك في أي تخصص (وظايف أحسن وشغل ريموت). ابدأ بنص ساعة يوميًا من دلوقتي.');
 if(tr.warn.length)tips.push('التخصص ده بيعتمد جامد على '+tr.warn.map(x=>QL[x.k]).join(' و')+'، وإجاباتك بتقول إنها مش أقوى نقطة عندك دلوقتي. ده مش مانع (بتتعلم) بس جرب كورس مجاني فيها الأول وشوف هتستحملها ولا لأ.');
 tips.push('جرّب قبل ما تقرر: خد كورس مجاني من تاب "كورسات ولينكات" في التخصص، ولو حسيت بحماس كمّل.');
 const other=ms.slice(1,3).map((o,k)=>{const j=M[o.i].j[o.f[0].x];return `<div class="job"><h4>${M[o.i].n} <span class="qz-pct" style="font-size:.85rem">· الترتيب ${k+2}</span></h4><p>أنسب مجال ليك هناك: <b>${sp(j.t)[0]}</b>${sp(j.t)[1]?' ('+sp(j.t)[1]+')':''}</p><button class="gtab" onclick="show(${o.i})">شوف التخصص</button></div>`}).join('');
 qzMount(`<h2 class="text-2xl md:text-3xl font-black text-white mb-1">نتيجتك المحفوظة</h2><span class="hrs">على أساس ${n} إجابة · متسجلة تلقائيًا على جهازك</span>
 <div class="job" style="margin-top:1rem"><p style="margin:0;color:var(--a2);font-weight:800">${near?'التخصصين الأول والتاني قريبين جدًا منك، اقرأ الاتنين.':'أنسب تخصص ليك'}</p><h3 class="text-xl md:text-2xl font-black text-white" style="margin:.3rem 0">${m.n}${BA.includes(t.i)?' <small style="color:var(--mut);font-size:.7em">(ضمن إدارة الأعمال)</small>':''}</h3>
 <div class="qz-bar"><span class="qz-pct">الأقرب ليك حسب إجاباتك</span></div><p style="font-size:.82rem;color:var(--mut)">الاختبار بيقيس ميولك المعلنة مش قدراتك، وده ترتيب مش نسبة دقيقة.</p><p>${m.d}</p>
 ${tr.good.length?`<p><b>ليه رشحناه؟</b> إجاباتك بتميل قوي لـ: ${tr.good.map(x=>QL[x.k]).join('، ')}.</p>`:''}
 <button class="gtab" onclick="show(${t.i})">افتح التخصص كامل</button></div>
 <h3 class="gh3">أنسب مجالات الشغل جوه التخصص ده</h3>${t.f.slice(0,3).map(f=>fcard(t.i,f)).join('')}
 <h3 class="gh3">تخصصات تانية قريبة منك</h3>${other}
 <h3 class="gh3">نصايح قبل ما تقرر</h3><ul class="c" style="display:block">${tips.map(x=>`<li style="display:block;margin:.4rem 0;border-radius:14px;line-height:1.8">${x}</li>`).join('')}</ul>
 <p class="gnote"><b>آخر تحديث للموقع: 22 نوفمبر 2026.</b> الأرقام تقديرات تقريبية شهرية بالجنيه المصري، واللي عليه علامة «موثّق» مبني على استبيان Paylab مصر (إجمالي قبل الضرايب والتأمينات)، والباقي تقدير تحريري معايَر على وظايف قريبة، ومفيش مصدر رسمي واحد. أغلبها للقاهرة والمدن الكبيرة، والشغل الحضوري في أسيوط والصعيد غالبًا أقل، والريموت هو اللي بيقرّب الفرق. أسماء الشركات أمثلة مش ضمان إنها بتوظف دلوقتي، وللتأكد قارن الرقم بصفحات المرتبات في Wuzzuf و LinkedIn و Glassdoor واعتبره مؤشر مش وعد.</p>
 <div class="mt-4 flex flex-wrap gap-2"><button class="team-btn" onclick="qzAsk(0)"><i aria-hidden="true" class="fa-solid fa-rotate"></i> راجع إجاباتك</button><button class="gtab" onclick="qzReset()">اعمل الاختبار من الأول</button><button class="gtab" onclick="qzCopy()"><i aria-hidden="true" class="fa-solid fa-copy"></i> انسخ النتيجة</button></div>`)}
function qzCopy(){const{ms}=qzCalc(),t=ms[0],m=M[t.i],f=t.f.slice(0,3).map(x=>sp(M[t.i].j[x.x].t)[0]).join('، ');
 const s=`نتيجة اختبار SAMS Compass: أنسب تخصص ليا "${m.n}". أنسب المجالات: ${f}.`;
 try{navigator.clipboard.writeText(s).then(()=>alert('تم النسخ'),()=>prompt('انسخ النتيجة:',s))}catch(e){prompt('انسخ النتيجة:',s)}}

