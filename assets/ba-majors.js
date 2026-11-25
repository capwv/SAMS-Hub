/* SAMS Compass — ba-majors.js — تخصصات إدارة الأعمال والاقتصاد والاكتواري والطاقة (BA): التابات، بطاقات التخصصات، وبياناتها الإضافية. */
/* ===== التخصصات الجديدة: إدارة الأعمال (بنوك + تمويل + تسويق)، الاقتصاد، العلوم الاكتوارية ===== */
const BA=[4,5,6,9];
const TABS=[[0,'fa-laptop-code'],[1,'fa-calculator'],['ba','fa-briefcase'],[2,'fa-users'],[7,'fa-chart-line'],[8,'fa-percent'],[3,'fa-landmark']];
const BAT=[[4,'fa-building-columns','Banking','إدارة البنوك'],[5,'fa-coins','Finance & Investment','التمويل والاستثمار'],[6,'fa-bullhorn','Marketing & E-commerce','التسويق والتجارة الإلكترونية'],[9,'fa-oil-well','Petroleum & Energy','المنشآت البترولية والطاقة']];
function setTab(i){[...tabs.children].forEach((b,x)=>b.setAttribute('aria-pressed',TABS[x][0]==(BA.includes(i)?'ba':i)))}
function showBA(){setTab('ba');
 out.innerHTML=`<h2 class="text-2xl md:text-3xl font-black text-white mb-2">إدارة الأعمال</h2><span class="hrs">48 ساعة معتمدة</span><p class="gp">تخصص رئيسي واحد بتختار جواه مسار: إدارة البنوك، أو التمويل والاستثمار، أو التسويق والتجارة الإلكترونية، أو إدارة المنشآت البترولية والطاقة. كل مسار له مجالات شغل وتدريب وكورسات ولينكات خاصة بيه.</p><h3 class="gh3">اختار المسار</h3><div class="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">${BAT.map(t=>`<button class="subj-card panel rounded-2xl p-4" style="--c:#2dd4bf" onclick="show(${t[0]})"><div class="subj-icon w-11 h-11 rounded-xl flex items-center justify-center mb-2"><i aria-hidden="true" class="fa-solid ${t[1]}"></i></div><div class="font-extrabold text-white text-sm" dir="ltr">${t[2]}</div><div class="ar">${t[3]}</div></button>`).join('')}</div><p class="gnote"><b>آخر تحديث للموقع: 22 نوفمبر 2026.</b> الأرقام تقديرات تقريبية شهرية بالجنيه المصري، واللي عليه علامة «موثّق» مبني على استبيان Paylab مصر (إجمالي قبل الضرايب والتأمينات)، والباقي تقدير تحريري معايَر على وظايف قريبة، ومفيش مصدر رسمي واحد. أغلبها للقاهرة والمدن الكبيرة، والشغل الحضوري في أسيوط والصعيد غالبًا أقل، والريموت هو اللي بيقرّب الفرق. أسماء الشركات أمثلة مش ضمان إنها بتوظف دلوقتي، وللتأكد قارن الرقم بصفحات المرتبات في Wuzzuf و LinkedIn و Glassdoor واعتبره مؤشر مش وعد.</p>`}

/* مضاعفات المرتب حسب القطاع (حكومي / خاص / متعدد الجنسيات) */
FAC.push([[.8,.75],[1,1],[1.3,1.45]],[[.6,.55],[1,1],[1.35,1.5]],[[.6,.55],[1,1],[1.35,1.5]],[[.6,.55],[1,1],[1.35,1.5]],[[.6,.55],[1,1],[1.35,1.5]],[[.8,.75],[1,1],[1.3,1.45]]);
AV.unshift([/Remote Bookkeeper/,'pm']);
AV.unshift([/VC Analyst|Investor Relations|Wealth Manager|Business Development|Digital Marketer|Content Manager|E-commerce|Brand & Market/,'pm']);

/* ريموت وفري لانس */
RMT.unshift(
[/Cyber/,1,1,0,"الأمن السيبراني ممكن ريموت مع شركات أمن خارجية بعد خبرة وشهادة زي Security+، لكن المبتدئ غالبًا بيبدأ من مركز عمليات أمن SOC أو شركة بحضور، والمنافسة على أول وظيفة عالية."],
[/Relationship Officer/,0,0,2,"شغل فرع بحضور، وفرص الريموت فيه شبه معدومة."],
[/Credit & Risk/,0,0,0,"تحليل الائتمان شغل داخل البنك بحضور، ومحتاج تحليل مالي قوي وإنجليزي."],
[/Banking Operations/,0,0,1,"عمليات البنك شغل داخلي بحضور، وغالبًا بيبدأ من برامج الخريجين أو التدريب."],
[/AML Compliance/,1,0,0,"الامتثال ممكن يبقى ريموت جزئي بعد خبرة، وشهادة CAMS من ACAMS بتفتح أبواب كتير."],
[/Corporate Banker/,0,0,0,"إدارة محفظة عملاء الشركات شغل علاقات وحضور، ومحتاج خبرة وتحليل مالي."],
[/Financial Analyst/,1,1,0,"التحليل المالي مطلوب ريموت لشركات خارجية، ومحتاج Excel ونمذجة مالية قوية وإنجليزي ممتاز."],
[/Policy & Investment/,1,0,0,"تحليل السياسات والاستثمار شغل جهات وبنوك استثمار ومراكز بحوث غالبًا بحضور."],
[/محلل استثمار/,1,1,0,"التحليل الاستثماري ريموت محدود، وغالبًا الشغل في شركات السمسرة والبنوك الاستثمارية بحضور، و CFA بيفرق."],
[/Wealth Manager/,0,0,0,"إدارة الثروات بتعتمد على علاقات العملاء والثقة، فالشغل بحضور وبعد خبرة."],
[/Investor Relations/,0,0,0,"علاقات المستثمرين شغل داخل الشركات المقيدة في البورصة."],
[/VC Analyst/,1,0,0,"صناديق رأس المال الجريء بتوظف عدد قليل، ومحتاج بورتفوليو تحليل ستارت أبس وإنجليزي قوي."],
[/Digital Marketer/,2,2,2,"طلب عالي ريموت وفري لانس (إعلانات، SEO، إدارة صفحات). بورتفوليو حملات حقيقية بيفرق أكتر من الشهادة."],
[/Business Development/,1,1,2,"المبيعات وتطوير الأعمال ممكن ريموت لشركات الخدمات والبرمجيات، والعمولات بتفرق في الدخل."],
[/Content Manager/,2,2,2,"كتابة وإدارة المحتوى مطلوبة ريموت وفري لانس، والمنافسة عالية والبورتفوليو هو الباب."],
[/E-commerce Manager/,1,1,1,"إدارة المتاجر الإلكترونية ممكن فري لانس لمتاجر صغيرة، والشغل في الشركات الكبيرة بحضور."],
[/Brand & Market Research/,1,1,1,"بحوث السوق ممكن ريموت وفري لانس مع وكالات وشركات ناشئة، وإتقان Excel و SPSS بيفرق."],
[/باحث ومحلل اقتصادي|Economic Researcher/,1,1,0,"البحث الاقتصادي ريموت محدود، لكن فيه فرص مع مراكز بحوث ومنظمات بعد خبرة وإنجليزي قوي."],
[/دراسات جدوى|Feasibility/,0,1,1,"دراسات الجدوى بتتعمل غالبًا لعملاء محليين بالجنيه (مشروعات صغيرة وطلبات تمويل)، وفيه فري لانس محلي لكن الريموت بالدولار قليل. البورتفوليو وسمعتك بيفتحوا الشغل."],
[/Economic Data Analyst/,2,2,1,"تحليل البيانات الاقتصادية مطلوب ريموت وفري لانس، ومحتاج Excel و Python أو R و SQL ولوحات Power BI."],
[/Development Consultant/,1,2,0,"استشارات التنمية مع منظمات وجهات مانحة ممكنة ريموت بعد خبرة، والتنافس شديد."],
[/Actuarial Analyst/,1,1,0,"الأكتواري ممكن يشتغل ريموت مع شركات تأمين خارجية لو معاه امتحانات مهنية (IFoA/SOA)، والبداية غالبًا من شركة تأمين أو استشارات."],
[/Insurance Risk/,1,0,0,"تحليل المخاطر والاكتتاب شغل داخل شركات التأمين غالبًا بحضور."],
[/Insurance Data Analyst/,2,1,1,"تحليل بيانات التأمين مطلوب ريموت لشركات خارجية، ومحتاج SQL و Python أو R وفهم أساسيات التأمين."],
[/Pension Analyst/,0,0,0,"المعاشات والتأمينات شغل جهات وصناديق بحضور."],
[/ERM Analyst/,1,0,0,"إدارة المخاطر المؤسسية ريموت جزئي بعد خبرة، وشهادة FRM من GARP بتفرق."],
[/Energy Admin/,0,0,1,"الشغل الإداري والمالي في شركات البترول داخل الشركة بحضور، وبيحتاج إنجليزي قوي."],
[/Energy Analyst/,1,1,0,"تحليل اقتصاد الطاقة مطلوب ريموت لشركات استشارات ومراكز أبحاث بعد خبرة، ومحتاج Excel و Python وكتابة تقارير بالإنجليزي."],
[/Procurement & Contracts/,0,0,0,"المشتريات والعقود في الطاقة شغل داخل الشركة بحضور، ومحتاج تمكن في المناقصات والعقود."],
[/Renewable Projects/,1,0,0,"منسقو مشروعات الطاقة المتجددة بيشتغلوا غالبًا في مواقع أو مكاتب الشركات، والريموت الجزئي ممكن بعد خبرة."],
[/HSE Officer/,0,0,1,"السلامة والبيئة شغل ميداني بحضور، وشهادة NEBOSH أو IOSH بتفتح فرص كتير."]
);
TIERS.unshift([/Financial Analyst|Actuarial Analyst|ERM Analyst/,3],[/Digital Marketer|Content Manager|E-commerce/,3],[/Business Development|Brand & Market/,4]);

/* جهات التوظيف */
POOL.insurance=["شركات تأمين","مصر للتأمين · مصر لتأمينات الحياة · Allianz Egypt · GIG Egypt · MetLife Egypt"];
POOL.brokers=["سمسرة وبنوك استثمار وإدارة أصول","EFG Holding · CI Capital · Beltone · Naeem · Thndr"];
POOL.agency=["وكالات إعلان وتسويق","وكالات إعلان وتسويق رقمي وسوشيال ميديا في القاهرة والإسكندرية · أقسام التسويق في الشركات الكبيرة"];
POOL.research=["مراكز بحوث ودراسات","معهد التخطيط القومي · مركز المعلومات IDSC · المركز المصري للدراسات الاقتصادية ECES · Economic Research Forum ERF · مركز الأهرام للدراسات"];
POOL.social=["تأمينات ومعاشات","الهيئة القومية للتأمين الاجتماعي · صناديق التأمين الخاصة · الهيئة العامة للرقابة المالية"];
POOL.energy=["شركات بترول وطاقة","Enppi · Petrojet · EPROM · Eni Egypt · bp Egypt · Shell Egypt · Apache Egypt"];
POOL.govenergy=["جهات حكومية في قطاع البترول","وزارة البترول والثروة المعدنية · الهيئة المصرية العامة للبترول EGPC · EGAS للغاز الطبيعي · ECHEM للبتروكيماويات · GANOPE (جنوب الوادي)"];
POOL.renew=["كهرباء وطاقة متجددة","وزارة الكهرباء والطاقة المتجددة · الشركة المصرية القابضة للكهرباء · ACWA Power · Scatec · AMEA Power"];
POOL.consult=["استشارات ودراسات جدوى","مكاتب استشارات اقتصادية ومالية وهندسية · Big 4 · بيوت خبرة محلية"];
EMPR.unshift(
[/Cyber/,"banks,telecom,fintech,govict,tech"],
[/QA/,"tech,fintech,ecom,telecom"],
[/Relationship Officer|Banking Operations/,"banks,fintech"],
[/Credit & Risk|Corporate Banker/,"banks,fintech"],
[/AML Compliance/,"banks,fintech,big4,govfin"],
[/Financial Analyst/,"fmcg,banks,telecom,brokers,industry"],
[/Policy & Investment/,"govgen,research,banks,intl"],
[/محلل استثمار/,"brokers,banks"],
[/Wealth Manager/,"banks,brokers"],
[/Investor Relations/,"industry,fmcg,banks,telecom,brokers"],
[/VC Analyst/,"fintech,tech,brokers"],
[/Digital Marketer/,"agency,ecom,fintech,telecom,fmcg,fl"],
[/Business Development/,"fmcg,telecom,tech,industry,banks"],
[/Content Manager/,"agency,ecom,telecom,fmcg,fl"],
[/E-commerce Manager/,"ecom,fmcg,fintech,fl"],
[/Brand & Market Research/,"fmcg,agency,telecom,banks"],
[/باحث ومحلل اقتصادي|Economic Researcher/,"research,govgen,banks,intl"],
[/دراسات جدوى|Feasibility/,"consult,banks,govgen,fl"],
[/Economic Data Analyst/,"research,govgen,banks,telecom"],
[/Development Consultant/,"intl,ngo,consult,govgen"],
[/Actuarial Analyst/,"insurance,big4,social,banks"],
[/Insurance Risk/,"insurance,banks,social"],
[/Insurance Data Analyst/,"insurance,telecom,fintech,big4"],
[/Pension Analyst/,"social,insurance,govfin"],
[/ERM Analyst/,"banks,insurance,big4,industry"],
[/Energy Admin/,"govenergy,energy,industry"],
[/Energy Analyst/,"govenergy,energy,research,intl"],
[/Procurement & Contracts/,"govenergy,energy,industry"],
[/Renewable Projects/,"renew,govenergy,energy"],
[/HSE Officer/,"energy,govenergy,industry,renew"]
);
IC.push(["Digital Marketer","fa-bullhorn"],["Relationship","fa-handshake"],["Insurance","fa-umbrella"],["Pension","fa-umbrella"],["ERM","fa-triangle-exclamation"],["Feasibility","fa-calculator"],["Development Consultant","fa-hand-holding-heart"],["Financial Analyst","fa-chart-pie"],["اقتصادي","fa-chart-line"],["Energy","fa-bolt"]);

/* تدريب وفرص شغل (نفس شكل باقي التخصصات) */
OPP.push(
{tr:["دورات المعهد المصرفي المصري EBI، وتابع برامجه للطلبة والخريجين (زي التدريب من أجل التوظيف TFE)","برامج الخريجين والتدريب الصيفي في CIB والأهلي وبنك مصر و QNB وبنك القاهرة","برامج Management Trainee في البنوك الخاصة والأجنبية","دورات الائتمان والتحليل المالي والمخاطر","شهادة CAMS لمكافحة غسل الأموال بعد خبرة","كورسات Excel والتحليل المالي والنمذجة"],
 sec:[["حكومي","البنك المركزي المصري · البنك الأهلي المصري · بنك مصر · بنك القاهرة · الهيئة العامة للرقابة المالية"],["خاص محلي","CIB · QNB Egypt · Faisal Islamic Bank · HDB · Credit Agricole Egypt · شركات تمويل مثل MNT-Halan و valU"],["متعدد الجنسيات","HSBC Egypt · Emirates NBD Egypt · Mashreq Egypt · ADIB Egypt · بنك الإسكندرية (Intesa Sanpaolo)"]],
 roles:["Banking / Management Trainee","Relationship Officer Intern","Credit Analyst Intern","Operations Assistant","Compliance Intern","Branch Customer Service"]},
{tr:["تدريب في شركات السمسرة وإدارة الأصول (EFG Holding و CI Capital و Beltone و Naeem)","تابع برامج التثقيف الاستثماري في البورصة المصرية EGX والهيئة العامة للرقابة المالية","تدريب في الإدارات المالية بالبنوك والشركات الكبيرة","كورس Financial Modeling و Valuation","جرّب تقييم شركة مقيدة في البورصة كمشروع بورتفوليو","التحضير لـ CFA Level 1 من سنة تالتة"],
 sec:[["حكومي","الهيئة العامة للرقابة المالية · البورصة المصرية EGX · وزارة المالية · البنك المركزي المصري · صندوق مصر السيادي"],["خاص محلي","EFG Holding · CI Capital · Beltone · Naeem · Thndr · شركات إدارة أصول وصناديق استثمار"],["متعدد الجنسيات","بنوك دولية (HSBC · Emirates NBD) · Big 4 · شركات استشارات مالية"]],
 roles:["Financial Analyst Intern","Equity Research Intern","Brokerage / Trading Assistant","Investment Banking Intern","Corporate Finance Intern","Wealth Management Trainee"]},
{tr:["تدريب صيفي في وكالات تسويق وسوشيال ميديا","برامج التسويق في Vodafone و Orange و e& و Unilever و P&G و Nestlé","كورسات Google Skillshop (Ads و Analytics) مجانية بشهادات","Meta Blueprint للإعلانات","HubSpot Academy (Inbound و Content Marketing) مجانًا","إدارة صفحة حقيقية لنشاط طلابي أو مشروع صغير وبناء بورتفوليو حملات"],
 sec:[["حكومي","نادر؛ غالبًا في أقسام العلاقات العامة والإعلام بالجهات الحكومية"],["خاص محلي","وكالات إعلان وسوشيال ميديا · Fawry · valU · Talabat · Noon · متاجر إلكترونية محلية"],["متعدد الجنسيات","Unilever · P&G · Nestlé · PepsiCo · Coca-Cola · Vodafone · Orange"]],
 roles:["Digital Marketing Intern","Social Media Assistant","Content Creator Intern","Sales Trainee","E-commerce Assistant","Market Research Intern"]},
{tr:["تدريب في معهد التخطيط القومي ومراكز البحوث (لو فيه فتح)","تابع برامج وزارة التخطيط والتنمية الاقتصادية ومجلس الوزراء","تدريب في البنك المركزي المصري و CAPMAS","تدريب وتطوع مع UNDP و World Bank و GIZ","كورسات Stata و EViews و R و Python للاقتصاد","تدريب في وحدات البحوث الاقتصادية بالبنوك وشركات الاستثمار"],
 sec:[["حكومي","وزارة التخطيط والتنمية الاقتصادية · وزارة المالية · البنك المركزي المصري · CAPMAS · معهد التخطيط القومي · مركز المعلومات IDSC"],["خاص محلي","وحدات البحوث الاقتصادية في البنوك وشركات الاستثمار · مكاتب الاستشارات ودراسات الجدوى · ECES"],["منظمات دولية","World Bank · UNDP · IFC · EBRD · GIZ · الاتحاد الأوروبي"]],
 roles:["Research Assistant","Economic Analyst Intern","Feasibility Study Assistant","Policy Research Assistant","Economic Data Analyst Intern","Development Program Assistant"]},
{tr:["تدريب في شركات التأمين (مصر للتأمين و Allianz Egypt و GIG Egypt و MetLife Egypt)","تدريب في الهيئة العامة للرقابة المالية وقطاع التأمين","تدريب في الهيئة القومية للتأمين الاجتماعي وصناديق المعاشات","تدريب في Big 4 (خدمات التأمين والمخاطر)","امتحانات IFoA: CS1 و CM1 ممكن غير الأعضاء يدخلوها (راجع الرسوم والمواعيد)","كورسات R و Python و SQL و Excel للاكتواري"],
 sec:[["حكومي","الهيئة العامة للرقابة المالية · الهيئة القومية للتأمين الاجتماعي · مصر للتأمين · وزارة المالية"],["خاص محلي","شركات تأمين خاصة مصرية · مكاتب استشارات اكتوارية · صناديق التأمين الخاصة"],["متعدد الجنسيات","Allianz Egypt · GIG Egypt · MetLife Egypt · Big 4 · شركات إعادة التأمين"]],
 roles:["Actuarial Intern","Insurance Analyst Trainee","Underwriting Assistant","Pension / Benefits Assistant","Risk Analyst Intern","Insurance Data Analyst Intern"]},
{tr:["تدريب صيفي في شركات قطاع البترول (Enppi و Petrojet و EPROM) والشركات الأجنبية","تابع برامج التدريب والتعيين في وزارة البترول والثروة المعدنية والهيئة المصرية العامة للبترول (لو فيه فتح)","تدريب في شركات الكهرباء والطاقة المتجددة (طاقة شمسية ورياح)","كورسات السلامة: NEBOSH IGC و IOSH Managing Safely لو اتجهت للـ HSE","كورسات اقتصاد الطاقة ودراسات الجدوى","تقوية الإنجليزي التقني والـ Excel المتقدم"],
 sec:[["حكومي","وزارة البترول والثروة المعدنية · EGPC · EGAS · ECHEM · وزارة الكهرباء والطاقة المتجددة · شركات قطاع البترول العامة"],["خاص محلي","شركات خدمات بترولية وهندسية مصرية · مقاولات ومحطات · شركات طاقة متجددة محلية"],["متعدد الجنسيات","Eni Egypt · bp Egypt · Shell Egypt · Apache Egypt · ACWA Power · Scatec"]],
 roles:["Admin / Finance Intern","Energy Analyst Intern","Procurement Assistant","Contracts Assistant","Renewable Projects Intern","HSE Trainee"]}
);

/* كورسات ولينكات */
ML.push(
[["المعهد المصرفي المصري EBI","الذراع التدريبي للبنك المركزي: دورات وشهادات مصرفية","https://ebi.gov.eg/","fa-solid fa-building-columns"],["البنك المركزي المصري","القوانين والتقارير والإحصاءات المصرفية","https://www.cbe.org.eg/","fa-solid fa-landmark"],["ACAMS","شهادة CAMS لمكافحة غسل الأموال","https://www.acams.org/","fa-solid fa-certificate"],["GARP – FRM","شهادة FRM لإدارة المخاطر","https://www.garp.org/","fa-solid fa-certificate"],["CFI – Corporate Finance Institute","كورسات تحليل مالي ونمذجة وبنوك","https://corporatefinanceinstitute.com/","fa-solid fa-chart-line"],["الهيئة العامة للرقابة المالية","تنظيم الأسواق والخدمات المالية غير المصرفية","https://www.fra.gov.eg/","fa-solid fa-scale-balanced"]],
[["CFA Institute","شهادة CFA وموارد التحليل الاستثماري","https://www.cfainstitute.org/","fa-solid fa-certificate"],["البورصة المصرية EGX","معلومات الأسهم المقيدة والتثقيف الاستثماري","https://www.egx.com.eg/","fa-solid fa-chart-line"],["CFI – Corporate Finance Institute","Financial Modeling و Valuation","https://corporatefinanceinstitute.com/","fa-solid fa-calculator"],["Investopedia","شرح مبسط لمفاهيم الاستثمار والتمويل","https://www.investopedia.com/","fa-solid fa-book-open-reader"],["الهيئة العامة للرقابة المالية","تنظيم أسواق المال والتأمين والتمويل","https://www.fra.gov.eg/","fa-solid fa-scale-balanced"],["Khan Academy – Economics & Finance","أساسيات التمويل والاقتصاد مجانًا","https://www.khanacademy.org/economics-finance-domain","fa-solid fa-graduation-cap"]],
[["Google Skillshop","شهادات Ads و Analytics مجانية","https://skillshop.withgoogle.com/","fa-brands fa-google"],["Meta Blueprint","كورسات وشهادات إعلانات فيسبوك وإنستجرام","https://www.facebook.com/business/learn","fa-brands fa-facebook"],["HubSpot Academy","Inbound Marketing و Content و SEO مجانًا","https://academy.hubspot.com/","fa-solid fa-bullhorn"],["Semrush Academy","SEO وإعلانات ومحتوى","https://www.semrush.com/academy/","fa-solid fa-magnifying-glass"],["Canva Design School","تصميم بوستات وهوية بصرية للمبتدئين","https://www.canva.com/designschool/","fa-solid fa-pen-ruler"],["CIM","شهادات التسويق البريطانية","https://www.cim.co.uk/","fa-solid fa-certificate"]],
[["CAPMAS","بيانات وإحصاءات مصر الرسمية","https://www.capmas.gov.eg/","fa-solid fa-chart-simple"],["البنك المركزي المصري","التضخم وأسعار الفائدة والتقارير النقدية","https://www.cbe.org.eg/","fa-solid fa-landmark"],["World Bank Open Data","بيانات اقتصادية عالمية مجانية","https://data.worldbank.org/","fa-solid fa-earth-africa"],["IMF","تقارير وبيانات الاقتصاد الكلي والدول","https://www.imf.org/","fa-solid fa-globe"],["Our World in Data","رسوم وبيانات بتبسّط الاقتصاد والتنمية","https://ourworldindata.org/","fa-solid fa-chart-line"],["Khan Academy – Economics","اقتصاد جزئي وكلي مجانًا","https://www.khanacademy.org/economics-finance-domain","fa-solid fa-graduation-cap"],["FRED","قاعدة بيانات اقتصادية للبحث والتحليل","https://fred.stlouisfed.org/","fa-solid fa-database"]],
[["IFoA","المعهد البريطاني للاكتواريين: منهج التأهيل وامتحانات CS1 و CM1","https://actuaries.org.uk/","fa-solid fa-certificate"],["SOA","جمعية الاكتواريين الأمريكية وامتحاناتها","https://www.soa.org/","fa-solid fa-certificate"],["CAS","جمعية اكتواريي الممتلكات والمسؤولية","https://www.casact.org/","fa-solid fa-certificate"],["R Project","لغة R المستخدمة في امتحان CS1","https://www.r-project.org/","fa-solid fa-code"],["Khan Academy – Statistics & Probability","الاحتمالات والإحصاء مجانًا","https://www.khanacademy.org/math/statistics-probability","fa-solid fa-percent"],["الهيئة العامة للرقابة المالية","منظم قطاع التأمين في مصر","https://www.fra.gov.eg/","fa-solid fa-scale-balanced"],["Kaggle Learn","Python و SQL وتحليل بيانات بتمارين","https://www.kaggle.com/learn","fa-solid fa-code"]],
[["الهيئة المصرية العامة للبترول EGPC","أخبار قطاع البترول المصري وشركاته","https://www.egpc.com.eg/","fa-solid fa-oil-well"],["IEA – International Energy Agency","تقارير وبيانات الطاقة عالميًا","https://www.iea.org/","fa-solid fa-bolt"],["U.S. EIA","بيانات وتحليلات أسواق الطاقة والبترول","https://www.eia.gov/","fa-solid fa-chart-line"],["OPEC","تقارير سوق البترول والإحصاءات","https://www.opec.org/","fa-solid fa-oil-well"],["IRENA","بيانات وتقارير الطاقة المتجددة","https://www.irena.org/","fa-solid fa-solar-panel"],["NEBOSH","شهادات السلامة والصحة المهنية","https://www.nebosh.org.uk/","fa-solid fa-helmet-safety"],["IOSH","كورسات وشهادات السلامة المهنية","https://iosh.com/","fa-solid fa-helmet-safety"],["CIPS","شهادات المشتريات والعقود","https://www.cips.org/","fa-solid fa-file-contract"]]
);

/* خطة الكورسات سنة بسنة للتخصصات الجديدة */
BASE.push(
[["english","excel","accounting","bankops"],["creditrisk","excelAdv","softskills"],["aml","finmodel"],[]],
[["english","excel","accounting","econ"],["finmodel","stat","invest"],["powerbi","python"],["cfa"]],
[["english","excel","digimkt","softskills"],["ads","seo","writing"],["ecom","powerbi"],["sales"]],
[["english","excel","econ","stat"],["econometrics","feas","python"],["powerbi","finmodel"],["writing"]],
[["english","excel","prob","stat"],["python","sql","actuarial"],["finmodel","powerbi"],["ifoa"]],
[["english","excel","energy"],["procure","feas","excelAdv"],["pm","iso","hse"],["pmp"]]
);

tabs.className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6';
TABS.forEach(t=>{const b=document.createElement('button');b.className='subj-card panel major-card rounded-2xl p-4';b.style.setProperty('--c','#2dd4bf');
const nm=t[0]=='ba'?'إدارة الأعمال':M[t[0]].n;
b.innerHTML=`<div class="subj-icon w-11 h-11 rounded-xl flex items-center justify-center mb-2"><i aria-hidden="true" class="fa-solid ${t[1]}"></i></div><div class="font-extrabold text-white text-sm">${nm}</div>`;
b.onclick=()=>t[0]=='ba'?showBA():show(t[0]);tabs.append(b)});

