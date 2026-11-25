/* SAMS Compass — learning.js — التدريب والفرص (OPPX)، الكورسات واللينكات (CL)، وخطة الكورسات سنة بسنة (PLAN/YL). */
const OPP=[
{tr:["ITIDA + NTI (تدريب صيفي مجاني)","DEPI رواد مصر الرقمية","Huawei ICT Academy و Seeds for the Future","Orange Digital Center","IBM SkillsBuild (مجاني)","Cisco Networking Academy","برامج الخريجين والتدريب الصيفي في Vodafone و e& و CIB والأهلي وبنك مصر و QNB"],
 sec:[["حكومي","ITIDA · وزارة الاتصالات · مركز المعلومات IDSC · البنك المركزي"],["خاص محلي","Fawry · Paymob · valU · MNT-Halan · Vezeeta · Luciq · ITWorx · Raya"],["متعدد الجنسيات","IBM Egypt · Microsoft Egypt · Vodafone · Orange · Siemens · Schneider Electric · Amazon Egypt"]],
 roles:["Data / BI Analyst Intern","Junior Business Analyst","ERP / Odoo Trainee","MIS Officer","Digital Transformation Associate","QA Trainee"]},
{tr:["تدريب Big 4: Deloitte و PwC و EY و KPMG (غالبًا من سنة تالتة)","مكاتب Mazars و Grant Thornton","تدريب صيفي في CIB والأهلي وبنك مصر و QNB","وظائف مالية تدريبية في Unilever و P&G و Nestlé و PepsiCo","دورات معهد البنوك المصري EBI","كورسات ACCA و CMA و IFRS"],
 sec:[["حكومي","وزارة المالية · مصلحة الضرائب · الجهاز المركزي للمحاسبات · الرقابة المالية"],["خاص محلي","Juhayna · Edita · Elsewedy Electric · Orascom · Talaat Moustafa · مكاتب محاسبة ومراجعة محلية"],["متعدد الجنسيات","Deloitte · PwC · EY · KPMG · Unilever · P&G · Nestlé · PepsiCo · HSBC Egypt"]],
 roles:["Audit Intern / Associate","Accountant Trainee","Tax Associate","Finance Intern","AP / AR Accountant","Cost Accountant Trainee"]},
{tr:["تدريب HR في Unilever و P&G و Nestlé و PepsiCo","برامج Vodafone و Orange و e& (Talent و HR)","HR في بنوك مثل CIB والأهلي و QNB","Concentrix و Teleperformance (توظيف بحجم كبير)","منصات Wuzzuf و Bayt للتعرف على السوق","كورسات CIPD و SHRM و AIHR"],
 sec:[["حكومي","الجهاز الإداري · أكاديميات ومعاهد حكومية · هيئات عامة"],["خاص محلي","Juhayna · Edita · Elsewedy Electric · Orascom · وكالات توظيف محلية"],["متعدد الجنسيات","Unilever · P&G · Nestlé · PepsiCo · Vodafone · Orange · Concentrix · Teleperformance"]],
 roles:["HR Intern","Recruitment Coordinator","Talent Acquisition Trainee","HR Admin Assistant","Payroll Assistant","L&D Coordinator"]},
{tr:["الأكاديمية الوطنية للتدريب NTA","مسابقات جهاز التنظيم والإدارة","برامج وزارة التخطيط والتنمية الاقتصادية","تدريب وتطوع UNDP و UNICEF و WFP و UN Volunteers","برامج GIZ والاتحاد الأوروبي","جمعيات مثل مصر الخير وبنك الطعام المصري","أقسام CSR في البنوك والشركات الكبيرة"],
 sec:[["حكومي","جهاز التنظيم والإدارة · مجلس الوزراء · وزارة التخطيط · CAPMAS · المحافظات والمحليات"],["خاص محلي","مصر الخير · بنك الطعام المصري · مؤسسة أهل مصر · أقسام CSR في بنوك وشركات"],["منظمات دولية","UNDP · UNICEF · WFP · UNHCR · World Bank · GIZ · الاتحاد الأوروبي"]],
 roles:["Program Assistant","Policy Research Assistant","M&E Assistant","Administrative Officer (حكومي)","CSR Coordinator","Project Coordinator"]}];
const WA=`<a class="wa" style="margin-top:.75rem" href="https://whatsapp.com/channel/0029VbCzDrwAjPXJcm9nox1O" target="_blank" rel="noopener"><i aria-hidden="true" class="fa-brands fa-whatsapp"></i><span><b>مش لازم تدور على التدريبات وفرص الشغل بنفسك</b><small>بنبعتهم أول بأول على قناة الواتساب، اشترك وخلّي الفرص توصلك.</small></span><i aria-hidden="true" class="fa-solid fa-arrow-up-right-from-square"></i></a>`;
const OPPX=i=>{const o=OPP[i];return H('Training & opportunities','تدريب وفرص شغل')+WA+`<h3 class="gh3">تدريب وبرامج</h3>${li(o.tr)}<h3 class="gh3">جهات حسب القطاع</h3>${o.sec.map(s=>`<div class="job"><h4>${s[0]}</h4><p>${s[1]}</p></div>`).join('')}<h3 class="gh3">وظايف تبدأ بيها</h3>${li(o.roles)}<h3 class="gh3">بتقدم فين؟</h3>${li(["LinkedIn و Wuzzuf و Bayt و Forasna","صفحات Careers في الشركات والبنوك","بوابة الوظائف الحكومية (جهاز التنظيم والإدارة)","صفحات التقديم الرسمية للبرامج المجانية"])}<p class="gnote"><b>آخر تحديث للموقع: 22 نوفمبر 2026.</b> الأرقام تقديرات تقريبية شهرية بالجنيه المصري، واللي عليه علامة «موثّق» مبني على استبيان Paylab مصر (إجمالي قبل الضرايب والتأمينات)، والباقي تقدير تحريري معايَر على وظايف قريبة، ومفيش مصدر رسمي واحد. أغلبها للقاهرة والمدن الكبيرة، والشغل الحضوري في أسيوط والصعيد غالبًا أقل، والريموت هو اللي بيقرّب الفرق. أسماء الشركات أمثلة مش ضمان إنها بتوظف دلوقتي، وللتأكد قارن الرقم بصفحات المرتبات في Wuzzuf و LinkedIn و Glassdoor واعتبره مؤشر مش وعد.</p>`};
const LC=(t,d,u,ic)=>`<a class="job lnk" href="${u}" target="_blank" rel="noopener"><h4><i class="${ic||'fa-solid fa-arrow-up-right-from-square'}"></i> ${t}</h4><p>${d}</p></a>`;
const CL=[["إدراك Edraak","منصة عربية مجانية بشهادات إتمام","https://www.edraak.org/","fa-solid fa-book-open-reader"],["رواق Rwaq","مساقات عربية مجانية من جامعات ومتخصصين","https://www.rwaq.org/","fa-solid fa-book-open-reader"],["Almentor","كورسات عربي في الإدارة والمهارات","https://www.almentor.net/","fa-solid fa-chalkboard-user"],["Coursera","كورسات جامعات وشركات (معاينة مجانية للوحدة الأولى أو منحة مالية Financial Aid)","https://www.coursera.org/","fa-solid fa-graduation-cap"],["edX","كورسات هارفارد و MIT وغيرهم","https://www.edx.org/","fa-solid fa-building-columns"],["Google Skills","كورسات وشارات AI وبيانات وسحابة من جوجل، وفيه خيارات مجانية","https://www.skills.google/","fa-brands fa-google"],["Microsoft Learn","Excel و Power BI و Azure مجانًا","https://learn.microsoft.com/training/","fa-brands fa-microsoft"],["Khan Academy بالعربي","أساسيات الرياضيات والإحصاء والاقتصاد","https://ar.khanacademy.org/","fa-solid fa-square-root-variable"],["NTI","المعهد القومي للاتصالات – برامج تدريب","https://www.nti.sci.eg/","fa-solid fa-building"],["Alison","كورسات مجانية بشهادات","https://alison.com/","fa-solid fa-award"]];
const ML=[
[["freeCodeCamp","تعلم الويب والبيانات والـ SQL مجانًا","https://www.freecodecamp.org/","fa-solid fa-code"],["Harvard CS50","أشهر كورس برمجة مجاني","https://cs50.harvard.edu/x/","fa-solid fa-laptop-code"],["Kaggle Learn","Python و SQL وتعلم الآلة بتمارين","https://www.kaggle.com/learn","fa-solid fa-database"],["SQLBolt","تمارين SQL تفاعلية","https://sqlbolt.com/","fa-solid fa-database"],["Power BI – Microsoft Learn","مسار Power BI الرسمي","https://learn.microsoft.com/training/powerplatform/power-bi","fa-solid fa-chart-column"],["Google Data Analytics","مسار شهادة تحليل البيانات","https://www.coursera.org/professional-certificates/google-data-analytics","fa-solid fa-chart-line"],["Odoo eLearning","تعلم Odoo ERP من المصدر","https://www.odoo.com/slides","fa-solid fa-boxes-stacked"],["roadmap.sh","خرائط طريق لكل مسار تقني","https://roadmap.sh/","fa-solid fa-route"],["Cisco Networking Academy","الشبكات والأمن السيبراني","https://www.netacad.com/","fa-solid fa-network-wired"]],
[["ACCA","أشهر شهادة محاسبة دولية","https://www.accaglobal.com/","fa-solid fa-certificate"],["CMA – IMA","محاسبة إدارية وتكاليف","https://www.imanet.org/","fa-solid fa-certificate"],["AICPA & CIMA","CPA و CGMA","https://www.aicpa-cima.com/","fa-solid fa-certificate"],["IFRS Foundation","معايير التقارير المالية الدولية","https://www.ifrs.org/","fa-solid fa-book"],["مصلحة الضرائب المصرية","القوانين والفاتورة الإلكترونية","https://www.eta.gov.eg/","fa-solid fa-file-invoice-dollar"],["IIA","معهد المراجعين الداخليين CIA","https://www.theiia.org/","fa-solid fa-clipboard-check"],["محاسبة لغير المحاسبين","كورسات على Coursera","https://www.coursera.org/search?query=accounting%20fundamentals","fa-solid fa-calculator"],["QuickBooks/Xero على Udemy","للشغل الريموت","https://www.udemy.com/courses/search/?q=quickbooks","fa-solid fa-laptop"],["ACFE","شهادة CFE للمحاسبة الجنائية","https://www.acfe.com/","fa-solid fa-magnifying-glass-dollar"]],
[["SHRM","شهادات SHRM-CP و SHRM-SCP","https://www.shrm.org/","fa-solid fa-certificate"],["HRCI","شهادات PHR و SPHR","https://www.hrci.org/","fa-solid fa-certificate"],["CIPD","شهادات الموارد البشرية البريطانية","https://www.cipd.org/","fa-solid fa-certificate"],["AIHR","كورسات HR Analytics و HR","https://www.aihr.com/","fa-solid fa-chart-pie"],["LinkedIn Learning","كورسات توظيف وقيادة","https://www.linkedin.com/learning/","fa-brands fa-linkedin"],["وزارة العمل المصرية","قانون العمل والتشريعات","https://www.manpower.gov.eg/","fa-solid fa-scale-balanced"],["HR على Coursera","كورسات إدارة الموارد البشرية","https://www.coursera.org/search?query=human%20resources","fa-solid fa-users"],["HR Analytics","تعلم تحليل بيانات الموارد البشرية","https://www.coursera.org/search?query=hr%20analytics","fa-solid fa-chart-pie"],["Train the Trainer","كورسات TOT على Udemy","https://www.udemy.com/courses/search/?q=train%20the%20trainer","fa-solid fa-chalkboard-user"]],
[["CAPMAS","الجهاز المركزي للتعبئة والإحصاء","https://www.capmas.gov.eg/","fa-solid fa-chart-simple"],["UN SDG:Learn","كورسات التنمية المستدامة","https://www.unsdglearn.org/","fa-solid fa-earth-africa"],["PMI","شهادات إدارة المشروعات PMP و CAPM","https://www.pmi.org/","fa-solid fa-diagram-project"],["World Bank OLC","كورسات سياسات وتنمية مجانية","https://olc.worldbank.org/","fa-solid fa-landmark"],["وزارة الاتصالات MCIT","التحول الرقمي والمبادرات","https://mcit.gov.eg/","fa-solid fa-laptop-code"],["مجلس الوزراء","القرارات والخدمات الحكومية","https://www.cabinet.gov.eg/","fa-solid fa-landmark"],["Public Administration","كورسات على Coursera","https://www.coursera.org/search?query=public%20administration","fa-solid fa-sitemap"],["Public Policy","كورسات على edX","https://www.edx.org/search?q=public%20policy","fa-solid fa-scroll"],["ISO 9001","تعلم الجودة والتطوير المؤسسي","https://www.udemy.com/courses/search/?q=iso%209001","fa-solid fa-medal"]]];
const q=encodeURIComponent;


const SK=[
["english",/$^/,"اللغة الإنجليزية للأعمال","كورس انجليزي للمبتدئين","business english",1],
["excel",/Excel|اكسيل/i,"Excel من الصفر","شرح اكسيل من الصفر","excel basics",1],
["prog",/$^/,"أساسيات البرمجة (Python)","بايثون من الصفر","python for beginners",1],
["softskills",/تواصل|عرض|تفاوض/,"مهارات التواصل والعرض","مهارات التواصل والعرض التقديمي","communication skills",1],
["accounting",/محاسب|مراجع|تكاليف|Account|Audit/i,"أساسيات المحاسبة","اساسيات المحاسبة المالية","accounting fundamentals",1],
["hrbasics",/موارد|HR |توظيف|Recruit|Talent|عاملين|رواتب|Payroll/i,"أساسيات الموارد البشرية","اساسيات ادارة الموارد البشرية","human resource management fundamentals",1],
["pubadmin",/حكوم|سياسات|Policy|عامة|محلية|Public|NGO/,"مبادئ الإدارة العامة","مبادئ الادارة العامة","public administration introduction",1],
["sql",/SQL/,"SQL لقواعد البيانات","تعلم SQL","sql for beginners",2],
["powerbi",/Power BI|Tableau|لوحات|BI /,"Power BI وتصوير البيانات","Power BI شرح","power bi data analysis",2],
["python",/Python/,"Python لتحليل البيانات","بايثون لتحليل البيانات","python data analysis",2],
["excelAdv",/Pivot|Power Query|Excel متقدم/,"Excel متقدم (Pivot و Power Query)","اكسيل متقدم","advanced excel",2],
["stat",/إحصاء|Stat|SPSS|بحوث/,"الإحصاء للأعمال","الاحصاء للمبتدئين","statistics for business",2],
["ba",/تحليل أعمال|Business Analy|User Stories|Product/,"تحليل الأعمال BA","تحليل الاعمال Business Analysis","business analysis fundamentals",2],
["costacc",/تكاليف|Cost/,"محاسبة التكاليف","محاسبة التكاليف","cost accounting",2],
["laborlaw",/قانون العمل|لوائح|عاملين|علاقات عمل|Employee Relations/,"قانون العمل المصري","شرح قانون العمل المصري","labor law basics",2],
["web",/ويب|Web|HTML|React|JavaScript|Frontend|Backend/,"تطوير الويب","تعلم تطوير الويب","web development bootcamp",2],
["network",/شبكات|Network|Cisco/,"أساسيات الشبكات","اساسيات الشبكات","computer networking basics",2],
["security",/أمن|Cyber|Security|SOC/,"الأمن السيبراني","الامن السيبراني للمبتدئين","cybersecurity fundamentals",2],
["uiux",/UI|UX|Figma/,"تصميم UI/UX","تصميم UI UX","ui ux design",2],
["git",/Git|GitHub/,"Git و GitHub","شرح Git و GitHub","git and github",2],
["writing",/كتابة|محتوى|PR |إعلام/,"الكتابة المهنية وإعداد التقارير","الكتابة المهنية","business writing",2],
["erp",/ERP|Odoo|SAP/,"أنظمة ERP (Odoo/SAP)","شرح اودو ERP","odoo erp",3],
["agile",/Agile|Scrum|Jira/,"Agile و Scrum","اجايل سكرم","agile scrum",3],
["ifrs",/IFRS|معايير|مراجعة|قوائم/,"معايير IFRS","معايير التقارير المالية IFRS","ifrs fundamentals",3],
["tax",/ضريب|Tax|فاتورة/,"الضرائب والفاتورة الإلكترونية","الضرائب في مصر","taxation basics",3],
["audit",/مراجع|Audit|IIA/,"أساسيات المراجعة","اساسيات المراجعة","auditing fundamentals",3],
["finmodel",/FP&A|نمذجة|موازنات/,"النمذجة المالية","النمذجة المالية","financial modeling",3],
["qb",/QuickBooks|Xero|ريموت|Bookkeep/,"QuickBooks للمحاسبة","كويك بوكس","quickbooks",3],
["recruit",/توظيف|Recruit|Talent|Sourc/,"التوظيف واختيار المرشحين","التوظيف والمقابلات","recruitment fundamentals",3],
["payroll",/رواتب|Payroll|تأمينات|مزايا/,"الرواتب والتأمينات","حساب المرتبات والتأمينات","payroll basics",3],
["lnd",/TOT|L&D|تدريب المدربين|مسؤول تدريب/,"تدريب المدربين TOT","تدريب المدربين TOT","train the trainer",3],
["hranalytics",/HR Analytics|استبيانات|دوران/,"تحليلات الموارد البشرية","تحليلات الموارد البشرية","hr analytics",3],
["procure",/مشتريات|مناقصات|تعاقدات|Procurement/,"المشتريات والمناقصات","المشتريات والمناقصات","procurement basics",3],
["budget",/ميزانية|موازنة|Budget/,"الموازنة العامة","الموازنة العامة","public budgeting",3],
["pm",/PMP|CAPM|Project Manager|إدارة مشروعات|مدير مشروع|مشروعات عامة|PMO/,"إدارة المشروعات","ادارة المشروعات","project management fundamentals",3],
["iso",/ISO|جودة/,"الجودة و ISO 9001","ISO 9001 شرح","iso 9001 quality management",3],
["cloud",/Cloud|Azure|AWS/,"الحوسبة السحابية","الحوسبة السحابية","cloud computing fundamentals",3],
["rpa",/RPA|UiPath/,"أتمتة RPA بـ UiPath","UiPath RPA","uipath rpa",3],
["lowcode",/Power Apps|Low-Code|Dataverse|Power Platform/,"Power Apps و Power Automate","Power Apps شرح","power apps power automate",3],
["ml",/تعلم الآلة|Machine|Artificial|ذكاء/,"تعلم الآلة والذكاء الاصطناعي","تعلم الآلة","machine learning",3],
["me",/M&E|تقييم أثر|مانحين|مقترحات/,"كتابة المقترحات و M&E","كتابة المقترحات للمانحين","monitoring and evaluation",3],
["acca",/ACCA|CMA|CIA|CPA|CFE/,"التحضير لشهادة ACCA/CMA","ACCA شرح","acca certification",4],
["shrm",/SHRM|CIPD|HRCI/,"شهادات SHRM/CIPD/HRCI","SHRM CP شرح","shrm cp exam prep",4],
["pmp",/PMP|CAPM/,"شهادة PMP/CAPM","PMP شرح","pmp exam prep",4],
["bankops",/بنك|Bank|Teller|Relationship|عمليات بنكية|Corporate Banker/,"أساسيات العمل المصرفي","اساسيات العمل المصرفي","banking fundamentals",1,[4]],
["econ",/اقتصاد|Econom|Policy/,"مبادئ الاقتصاد الجزئي والكلي","الاقتصاد الجزئي والكلي","microeconomics macroeconomics",1,[7,9]],
["digimkt",/تسويق|Marketer|Marketing|E-commerce|Brand|Content|Business Development/,"أساسيات التسويق الرقمي","التسويق الرقمي من الصفر","digital marketing fundamentals",1,[6]],
["prob",/احتمال|Actuar|أكتوار|Insurance|تأمين|ERM|معاشات/,"الاحتمالات والإحصاء","نظرية الاحتمالات","probability and statistics",1,[8]],
["creditrisk",/ائتمان|مخاطر|Credit|Risk|ERM/,"تحليل الائتمان وإدارة المخاطر","تحليل الائتمان","credit risk analysis",2,[4,8]],
["invest",/Invest|استثمار|Wealth|سمسار|Portfolio|Financial Analyst|VC|Relations/,"أساسيات الاستثمار وأسواق المال","اساسيات الاستثمار والبورصة","investing fundamentals",2,[5]],
["ads",/Digital Marketer|إعلان|تسويق رقمي|E-commerce|متجر/,"الإعلانات المدفوعة (Meta و Google)","اعلانات فيسبوك وجوجل","meta ads google ads",2,[6]],
["seo",/SEO|Content|محتوى/,"SEO وتسويق المحتوى","SEO شرح","seo basics",2,[6]],
["sales",/مبيعات|Sales|Business Development|بيع/,"فنون البيع والتفاوض","فن البيع والتفاوض","sales techniques negotiation",2,[6]],
["ecom",/E-commerce|متجر|إلكتروني/,"التجارة الإلكترونية وإدارة المتاجر","ادارة المتاجر الالكترونية","ecommerce store management",2,[6]],
["research",/بحث|Research|باحث|Brand|سوق/,"بحوث السوق والبحث العلمي","بحوث التسويق","market research methods",2,[6,7]],
["feas",/جدوى|Feasibility/,"دراسات الجدوى","دراسات الجدوى","feasibility study",2,[7,9]],
["actuarial",/أكتوار|Actuar|Pension|معاشات|Underwrit|اكتتاب/,"مدخل للعلوم الاكتوارية","علوم اكتوارية","actuarial science introduction",2,[8]],
["aml",/AML|Compliance|امتثال|غسل/,"الامتثال ومكافحة غسل الأموال","مكافحة غسل الاموال AML","aml compliance basics",3,[4]],
["econometrics",/Economic|Econom|اقتصادي|سياسات/,"الاقتصاد القياسي (Stata/EViews)","الاقتصاد القياسي","econometrics stata",3,[7]],
["cfa",/CFA|Investment|Wealth|Portfolio|استثمار/,"التحضير لـ CFA Level 1","CFA Level 1 شرح","cfa level 1",4,[5]],
["ifoa",/IFoA|SOA|Actuarial Analyst|أكتوار/,"امتحانات IFoA (CS1 و CM1)","امتحانات IFoA","ifoa cs1 cm1 exam prep",4,[8]],
["energy",/طاقة|Energy|Renewable|بترول/,"أساسيات اقتصاد الطاقة والبترول","اقتصاد الطاقة والبترول","energy economics basics",1,[9]],
["hse",/HSE|سلامة|NEBOSH|IOSH/,"السلامة والصحة المهنية HSE","السلامة والصحة المهنية","nebosh igc osh basics",3,[9]]];
const SKI=Object.fromEntries(SK.map(x=>[x[0],x]));
const BASE=[[["english","excel","prog"],["sql","powerbi","ba"],["agile","git"],["cloud"]],[["english","excel","accounting"],["excelAdv","costacc","stat"],["ifrs","erp"],["acca"]],[["english","excel","hrbasics","softskills"],["laborlaw","stat"],["hranalytics"],["shrm"]],[["english","excel","pubadmin"],["stat","writing"],["pm","budget"],["me"]]];
const TOOLS=['excel','excelAdv','sql','powerbi','python','git','web','network','security','uiux','erp','agile','cloud','ml','rpa','lowcode','stat'];
const PL=new Map();
const PLAN=(i,j,Y)=>{if(PL.has(j))return PL.get(j);const jt=j.t+' '+(j.r||'')+' '+(j.u||''),used=new Set(),out4=[];
for(let k=0;k<4;k++){let ids=[];SK.forEach(s=>{if((s[5]==k+1&&s[1].test(jt)&&(!s[6]||s[6].includes(i)))||(Y&&Y[k]&&TOOLS.includes(s[0])&&s[1].test(Y[k].join(' '))))ids.push(s[0])});ids.push(...BASE[i][k]);
ids=ids.filter(d=>!used.has(d)&&(used.add(d),1)).slice(0,5);out4.push(ids)}
PL.set(j,out4);return out4};
const YL=(i,j,k,Y)=>{const en=sp(j.t)[0],ar=sp(j.t)[1]||en,A=(u,t)=>`<a href="${u}" target="_blank" rel="noopener">${t}</a>`;
const row=(l,a,e)=>`<div class="sk"><span>${l}</span>${A('https://www.youtube.com/results?search_query='+q(a),'يوتيوب عربي')}${A('https://www.coursera.org/search?query='+q(e),'Coursera')}${A('https://www.udemy.com/courses/search/?q='+q(e),'Udemy')}</div>`;
let h=PLAN(i,j,Y)[k].map(d=>{const x=SKI[d];return row(x[2],x[3],x[4])}).join('');
const core=[null,[`أساسيات مجال ${ar}`,`${ar} للمبتدئين`,`${en} fundamentals`],[`تطبيق عملي ومشروع في ${ar}`,`${ar} مشروع عملي`,`${en} project`],[`التجهيز للتوظيف: CV ومقابلات ${ar}`,`${ar} مقابلة شخصية`,`${en} interview questions`]][k];
h+=core?row(...core):`<div class="sk"><span>مجاني بالعربي</span>${A('https://www.edraak.org/','إدراك')}${A('https://www.rwaq.org/','رواق')}${A('https://www.almentor.net/','Almentor')}</div>`;
return `<div class="skl"><b>🎓 كورسات ولينكات السنة دي</b>${h}</div>`};

