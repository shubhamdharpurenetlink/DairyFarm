import type { Disease } from "@/types";
import { dummyImageAt } from "@/lib/dummyImage";

const img = (id: number) => dummyImageAt("health", id, 800, 500);

export const diseases: Disease[] = [
  {
    slug: "mastitis",
    title: { en: "Mastitis", hi: "थनैला (मास्टाइटिस)" },
    category: "disease",
    image: img(1),
    summary: {
      en: "Inflammation of the udder tissue, commonly caused by bacterial infection. The most economically damaging cow disease worldwide.",
      hi: "थन ऊतक की सूजन, आमतौर पर जीवाणु संक्रमण के कारण। दुनिया भर में आर्थिक रूप से सबसे हानिकारक गाय रोग।",
    },
    symptoms: {
      en: [
        "Swollen, hot, painful udder",
        "Changes in milk: clots, flakes, blood",
        "Reduced milk yield",
        "Fever and loss of appetite (acute cases)",
      ],
      hi: [
        "सूजा हुआ, गर्म, दर्दनाक थन",
        "दूध में बदलाव: थक्के, परतें, खून",
        "दूध उत्पादन में कमी",
        "बुखार और भूख न लगना (तीव्र मामलों में)",
      ],
    },
    causes: {
      en: [
        "Bacteria (E. coli, Streptococcus, Staphylococcus)",
        "Dirty milking environment",
        "Improper milking technique",
        "Wet bedding and poor hygiene",
        "Injury to teats or udder",
      ],
      hi: [
        "जीवाणु (E. coli, Streptococcus, Staphylococcus)",
        "गंदा दूध निकालने का वातावरण",
        "गलत दूध निकालने की तकनीक",
        "गीला बिस्तर और खराब स्वच्छता",
        "थन या उद्धन पर चोट",
      ],
    },
    prevention: {
      en: [
        "Clean udder before and after milking",
        "Pre and post milking teat dip",
        "Maintain clean dry bedding",
        "Regular milking machine maintenance",
        "Cull chronically infected cows",
      ],
      hi: [
        "दूध निकालने से पहले और बाद थन साफ करें",
        "दूध निकालने से पहले और बाद थन डिप",
        "साफ सूखा बिस्तर बनाए रखें",
        "नियमित दूध निकालने वाली मशीन का रखरखाव",
        "लगातार संक्रमित गायों को हटाएं",
      ],
    },
    treatment: {
      en: [
        "Consult a veterinarian for milk culture test",
        "Intramammary antibiotic infusions",
        "Anti-inflammatory injections (NSAIDs)",
        "Frequent stripping of infected quarters",
        "Hot water fomentation for relief",
      ],
      hi: [
        "दूध संस्कृति परीक्षण के लिए पशु चिकित्सक से परामर्श लें",
        "थनान्तर एंटीबायोटिक इन्फ्यूजन",
        "सूजन-रोधी इंजेक्शन (NSAIDs)",
        "संक्रमित क्वार्टर का बार-बार दूध निकालना",
        "राहत के लिए गर्म पानी की सिकाई",
      ],
    },
    publishedAt: "2026-05-10",
    readTimeMin: 6,
  },
  {
    slug: "foot-and-mouth-disease",
    title: { en: "Foot & Mouth Disease (FMD)", hi: "खुरपका-मुंहपका रोग" },
    category: "disease",
    image: img(2),
    summary: {
      en: "Highly contagious viral disease affecting cattle, causing fever and blisters on mouth, tongue, and feet. Vaccination is the best defense.",
      hi: "अत्यधिक संक्रामक विषाणु रोग जो मवेशियों को प्रभावित करता है, बुखार और मुंह, जीभ और पैरों पर छाले पैदा करता है। टीकाकरण सबसे अच्छा बचाव है।",
    },
    symptoms: {
      en: [
        "High fever (104-106°F)",
        "Excessive drooling, smacking lips",
        "Blisters on tongue, gums, hooves",
        "Lameness, refusal to walk",
        "Reduced appetite and milk drop",
      ],
      hi: [
        "तेज बुखार (104-106°F)",
        "अत्यधिक लार, होंठ चटकाना",
        "जीभ, मसूड़ों, खुरों पर छाले",
        "लंगड़ापन, चलने से इनकार",
        "भूख कम होना और दूध में गिरावट",
      ],
    },
    causes: {
      en: [
        "FMD virus (Aphthovirus)",
        "Spreads through air, contact, contaminated feed",
        "Movement of infected animals",
        "Shared equipment between farms",
      ],
      hi: [
        "FMD वायरस (Aphthovirus)",
        "हवा, संपर्क, दूषित चारे के माध्यम से फैलता है",
        "संक्रमित जानवरों की आवाजाही",
        "खेतों के बीच साझा उपकरण",
      ],
    },
    prevention: {
      en: [
        "Biannual FMD vaccination (mandatory)",
        "Quarantine new animals for 14 days",
        "Disinfect vehicles and equipment",
        "Restrict farm visits during outbreaks",
        "Report outbreaks to authorities immediately",
      ],
      hi: [
        "वार्षिक दो बार FMD टीकाकरण (अनिवार्य)",
        "नए जानवरों को 14 दिन के लिए संगरोध",
        "वाहन और उपकरण कीटाणुरहित करें",
        "प्रकोप के दौरान खेत में आगंतुक प्रतिबंधित करें",
        "प्रकोप तुरंत अधिकारियों को रिपोर्ट करें",
      ],
    },
    treatment: {
      en: [
        "Supportive care — no specific antiviral",
        "Soft food (mashes, porridge)",
        "Wash mouth with potassium permanganate solution",
        "Apply antiseptic on foot lesions",
        "Antibiotics to prevent secondary infection",
      ],
      hi: [
        "सहायक देखभाल — कोई विशिष्ट एंटीवायरल नहीं",
        "नरम भोजन (दलिया, मैश)",
        "पोटेशियम परमैंगनेट के घोल से मुंह धोएं",
        "पैर के घावों पर एंटीसेप्टिक लगाएं",
        "द्वितीयक संक्रमण रोकने के लिए एंटीबायोटिक",
      ],
    },
    publishedAt: "2026-05-08",
    readTimeMin: 7,
  },
  {
    slug: "bloat",
    title: { en: "Bloat", hi: "अफारा (ब्लोट)" },
    category: "disease",
    image: img(3),
    summary: {
      en: "Excessive accumulation of gas in the rumen. Can be fatal within hours if untreated — common after consuming wet legume pastures.",
      hi: "रूमेन में गैस का अत्यधिक संचय। अनुपचारित होने पर घंटों में घातक हो सकता है — गीले फलीदार चरागाहों के सेवन के बाद आम।",
    },
    symptoms: {
      en: [
        "Visibly distended left side abdomen",
        "Difficulty breathing, mouth open",
        "Drooling, restlessness",
        "Refusal to eat",
        "Collapse in severe cases",
      ],
      hi: [
        "स्पष्ट रूप से सूजा हुआ बायां पेट",
        "सांस लेने में कठिनाई, मुंह खुला",
        "लार आना, बेचैनी",
        "खाने से इनकार",
        "गंभीर मामलों में पतन",
      ],
    },
    causes: {
      en: [
        "Lush legume pastures (alfalfa, clover)",
        "Sudden diet change",
        "Frothy bloat from foam formation",
        "Free gas bloat from esophagus obstruction",
      ],
      hi: [
        "ताज़ी फलीदार चारा (अल्फा-अल्फा, क्लोवर)",
        "अचानक आहार परिवर्तन",
        "झाग बनने से झागदार अफारा",
        "अन्ननली अवरोध से मुक्त गैस अफारा",
      ],
    },
    prevention: {
      en: [
        "Feed dry hay before legume grazing",
        "Avoid wet pastures in morning",
        "Gradually introduce new feed",
        "Use anti-foaming agents in water",
        "Limit grazing time on rich pastures",
      ],
      hi: [
        "फलीदार चराई से पहले सूखी घास खिलाएं",
        "सुबह गीले चरागाह से बचें",
        "नए चारे को धीरे-धीरे शुरू करें",
        "पानी में झाग रोधी एजेंट का उपयोग करें",
        "समृद्ध चरागाह पर चराई का समय सीमित करें",
      ],
    },
    treatment: {
      en: [
        "EMERGENCY — call vet immediately",
        "Stomach tube to release gas",
        "Anti-foaming drench (vegetable oil)",
        "Trocar puncture in severe cases (by vet)",
        "Walk the animal to encourage belching",
      ],
      hi: [
        "आपातकाल — तुरंत पशु चिकित्सक को बुलाएं",
        "गैस निकालने के लिए पेट की ट्यूब",
        "झाग रोधी ड्रेंच (वनस्पति तेल)",
        "गंभीर मामलों में ट्रोकार पंक्चर (पशु चिकित्सक द्वारा)",
        "डकार लेने के लिए जानवर को चलाएं",
      ],
    },
    publishedAt: "2026-05-05",
    readTimeMin: 5,
  },
  {
    slug: "milk-fever",
    title: { en: "Milk Fever", hi: "मिल्क फीवर (हाइपोकैल्सीमिया)" },
    category: "calving",
    image: img(4),
    summary: {
      en: "A metabolic disease caused by low blood calcium just after calving. Quick IV calcium treatment is life-saving.",
      hi: "बछड़ा देने के तुरंत बाद रक्त कैल्शियम कम होने से होने वाला चयापचय रोग। त्वरित IV कैल्शियम उपचार जीवन-रक्षक है।",
    },
    symptoms: {
      en: [
        "Cow appears restless, then unsteady",
        "Goes down, unable to rise",
        "Cold ears and extremities",
        "S-shaped neck curve",
        "If untreated → coma and death",
      ],
      hi: [
        "गाय बेचैन दिखती है, फिर अस्थिर",
        "नीचे गिरती है, उठ नहीं सकती",
        "ठंडे कान और हाथ-पैर",
        "S-आकार की गर्दन वक्र",
        "अनुपचारित रहने पर → कोमा और मृत्यु",
      ],
    },
    causes: {
      en: [
        "Sudden calcium drain into colostrum",
        "Inability to mobilize body calcium fast",
        "More common in high-yielding older cows",
        "Imbalanced dry-period diet",
      ],
      hi: [
        "कोलोस्ट्रम में अचानक कैल्शियम का निकलना",
        "शरीर के कैल्शियम को जल्दी एकत्र करने में असमर्थता",
        "उच्च उत्पादन वाली बड़ी उम्र की गायों में अधिक आम",
        "असंतुलित सूखी अवधि का आहार",
      ],
    },
    prevention: {
      en: [
        "Low-calcium diet in last 3 weeks of pregnancy",
        "Vitamin D3 supplementation before calving",
        "Anionic salts in dry-period ration",
        "Oral calcium bolus right after calving",
        "Monitor older, high-yield cows carefully",
      ],
      hi: [
        "गर्भावस्था के अंतिम 3 सप्ताह में कम कैल्शियम आहार",
        "बछड़ा देने से पहले विटामिन D3 अनुपूरण",
        "सूखी अवधि के राशन में आयनिक लवण",
        "बछड़ा देने के तुरंत बाद मौखिक कैल्शियम बोलस",
        "बड़ी उम्र, उच्च-उत्पादन गायों की सावधानीपूर्वक निगरानी",
      ],
    },
    treatment: {
      en: [
        "Slow IV calcium borogluconate (vet only)",
        "Sub-cutaneous calcium for mild cases",
        "Place cow in sternal position",
        "Pad to prevent pressure sores",
        "Monitor for relapse within 24-48 hours",
      ],
      hi: [
        "धीमा IV कैल्शियम बोरोग्लूकोनेट (केवल पशु चिकित्सक)",
        "हल्के मामलों के लिए चमड़े के नीचे कैल्शियम",
        "गाय को छाती की स्थिति में रखें",
        "दबाव घावों से बचाने के लिए पैडिंग",
        "24-48 घंटे के भीतर पुनरावृत्ति की निगरानी",
      ],
    },
    publishedAt: "2026-04-30",
    readTimeMin: 5,
  },
  {
    slug: "lumpy-skin-disease",
    title: { en: "Lumpy Skin Disease", hi: "लम्पी स्किन रोग" },
    category: "disease",
    image: img(5),
    summary: {
      en: "Viral disease causing skin nodules across the body. Recent outbreaks in India have made vaccination critical.",
      hi: "त्वचा पर गांठें बनाने वाला विषाणुजनित रोग। भारत में हाल के प्रकोपों ने टीकाकरण को महत्वपूर्ण बना दिया है।",
    },
    symptoms: {
      en: [
        "Multiple firm skin nodules (2-5 cm)",
        "Fever (104-107°F)",
        "Loss of appetite and milk drop",
        "Lacrimation, nasal discharge",
        "Swollen lymph nodes",
      ],
      hi: [
        "कई कठोर त्वचा गांठें (2-5 सेमी)",
        "बुखार (104-107°F)",
        "भूख कम होना और दूध में गिरावट",
        "आँखों से पानी, नाक से स्राव",
        "सूजी हुई लसीका ग्रंथियाँ",
      ],
    },
    causes: {
      en: [
        "Lumpy Skin Disease Virus (Capripox)",
        "Spread by biting insects (mosquitoes, flies, ticks)",
        "Direct contact with infected animals",
        "Contaminated water sources",
      ],
      hi: [
        "लम्पी स्किन रोग वायरस (Capripox)",
        "काटने वाले कीटों द्वारा फैलाव (मच्छर, मक्खी, टिक)",
        "संक्रमित जानवरों के साथ सीधा संपर्क",
        "दूषित जल स्रोत",
      ],
    },
    prevention: {
      en: [
        "Goat pox vaccine (cross-protection)",
        "Vector control: insect repellents",
        "Isolate sick animals",
        "Restrict animal movement",
        "Government Lumpi-ProVacInd vaccine",
      ],
      hi: [
        "गोट पॉक्स टीका (क्रॉस-प्रोटेक्शन)",
        "वेक्टर नियंत्रण: कीट विकर्षक",
        "बीमार जानवरों को अलग करें",
        "जानवरों की आवाजाही प्रतिबंधित करें",
        "सरकारी लम्पी-प्रोवैकइंड टीका",
      ],
    },
    treatment: {
      en: [
        "No specific antiviral — supportive care",
        "Antibiotics for secondary skin infections",
        "Antipyretic for fever",
        "Antiseptic cleaning of nodules",
        "Soft, nutritious feed",
      ],
      hi: [
        "कोई विशिष्ट एंटीवायरल नहीं — सहायक देखभाल",
        "द्वितीयक त्वचा संक्रमण के लिए एंटीबायोटिक",
        "बुखार के लिए ज्वरनाशक",
        "गांठों की एंटीसेप्टिक सफाई",
        "नरम, पौष्टिक चारा",
      ],
    },
    publishedAt: "2026-04-25",
    readTimeMin: 6,
  },
  {
    slug: "brucellosis",
    title: { en: "Brucellosis", hi: "ब्रुसेलोसिस" },
    category: "disease",
    image: img(6),
    summary: {
      en: "Bacterial disease causing abortion, infertility, and zoonotic risk to humans. Vaccination of female calves is the key control measure.",
      hi: "गर्भपात, बांझपन और मनुष्यों के लिए संक्रामक जोखिम पैदा करने वाला जीवाणु रोग। मादा बछड़ों का टीकाकरण मुख्य नियंत्रण उपाय है।",
    },
    symptoms: {
      en: [
        "Abortion in last trimester",
        "Retained placenta",
        "Reduced fertility, repeat breeding",
        "Hygromas on knees",
        "May be silent in many animals",
      ],
      hi: [
        "अंतिम तिमाही में गर्भपात",
        "रुकी हुई जेर",
        "कम प्रजनन क्षमता, बार-बार प्रजनन",
        "घुटनों पर हाइग्रोमा",
        "कई जानवरों में मौन हो सकता है",
      ],
    },
    causes: {
      en: [
        "Brucella abortus bacterium",
        "Contact with infected reproductive fluids",
        "Contaminated feed and water",
        "Infected bulls during breeding",
      ],
      hi: [
        "ब्रुसेला अबॉर्टस जीवाणु",
        "संक्रमित प्रजनन तरल पदार्थ से संपर्क",
        "दूषित चारा और पानी",
        "प्रजनन के दौरान संक्रमित बैल",
      ],
    },
    prevention: {
      en: [
        "Vaccinate female calves (4-8 months) with S19",
        "Test and slaughter program for positives",
        "Quarantine new animals 30 days",
        "Avoid contact with aborted material",
        "Clean & disinfect after calving",
      ],
      hi: [
        "मादा बछड़ों (4-8 महीने) का S19 से टीकाकरण",
        "पॉजिटिव के लिए टेस्ट और कत्ल कार्यक्रम",
        "नए जानवरों को 30 दिन संगरोध",
        "गर्भपात पदार्थ के संपर्क से बचें",
        "बछड़ा देने के बाद सफाई और कीटाणुशोधन",
      ],
    },
    treatment: {
      en: [
        "No effective treatment in cattle",
        "Infected animals usually culled",
        "Long-term antibiotic protocols rarely successful",
        "Focus on prevention, not cure",
      ],
      hi: [
        "मवेशियों में कोई प्रभावी उपचार नहीं",
        "संक्रमित जानवरों को आमतौर पर हटाया जाता है",
        "दीर्घकालिक एंटीबायोटिक प्रोटोकॉल शायद ही कभी सफल",
        "इलाज नहीं, रोकथाम पर ध्यान दें",
      ],
    },
    publishedAt: "2026-04-20",
    readTimeMin: 6,
  },
  {
    slug: "tick-fever",
    title: { en: "Tick Fever (Babesiosis)", hi: "टिक फीवर (बेबेसियोसिस)" },
    category: "disease",
    image: img(7),
    summary: {
      en: "Tick-borne blood parasite disease causing red urine, fever and anemia. Common in monsoon and post-monsoon months.",
      hi: "टिक-जनित रक्त परजीवी रोग जो लाल मूत्र, बुखार और एनीमिया का कारण बनता है। मानसून और मानसून के बाद के महीनों में आम।",
    },
    symptoms: {
      en: [
        "High fever (105-107°F)",
        "Red/coffee colored urine",
        "Pale gums (anemia)",
        "Loss of appetite",
        "Sudden milk drop",
      ],
      hi: [
        "तेज बुखार (105-107°F)",
        "लाल/कॉफी रंग का मूत्र",
        "पीले मसूड़े (एनीमिया)",
        "भूख कम होना",
        "अचानक दूध में गिरावट",
      ],
    },
    causes: {
      en: [
        "Babesia parasites transmitted by ticks",
        "Mainly Boophilus microplus tick",
        "Seasonal — wet warm months",
      ],
      hi: [
        "टिक द्वारा प्रसारित बेबेसिया परजीवी",
        "मुख्य रूप से बूफिलस माइक्रोप्लस टिक",
        "मौसमी — गीले गर्म महीने",
      ],
    },
    prevention: {
      en: [
        "Regular tick spraying / dipping",
        "Pasture rotation",
        "Vaccinate with attenuated babesia",
        "Maintain shed hygiene",
      ],
      hi: [
        "नियमित टिक स्प्रे / डिपिंग",
        "चरागाह रोटेशन",
        "क्षीणित बेबेसिया से टीकाकरण",
        "शेड स्वच्छता बनाए रखें",
      ],
    },
    treatment: {
      en: [
        "Imidocarb dipropionate injection (vet)",
        "Diminazene aceturate for treatment",
        "Supportive: IV fluids, vitamins",
        "Blood transfusion in severe anemia",
      ],
      hi: [
        "इमिडोकार्ब डायप्रोपियोनेट इंजेक्शन (पशु चिकित्सक)",
        "उपचार के लिए डायमिनेज़ीन एसिटूरेट",
        "सहायक: IV द्रव, विटामिन",
        "गंभीर एनीमिया में रक्त आधान",
      ],
    },
    publishedAt: "2026-04-15",
    readTimeMin: 5,
  },
  {
    slug: "balanced-nutrition",
    title: { en: "Balanced Cow Nutrition", hi: "संतुलित गौ पोषण" },
    category: "nutrition",
    image: img(8),
    summary: {
      en: "A balanced diet of green fodder, dry fodder, and concentrates is the foundation of milk yield, fertility, and overall cow health.",
      hi: "हरे चारे, सूखे चारे और सांद्र का संतुलित आहार दूध उत्पादन, प्रजनन क्षमता और गाय के समग्र स्वास्थ्य का आधार है।",
    },
    symptoms: {
      en: [
        "Drop in milk yield (signal of poor nutrition)",
        "Dull coat",
        "Loss of body condition",
        "Repeat breeding / infertility",
        "Weak calves at birth",
      ],
      hi: [
        "दूध उत्पादन में गिरावट (खराब पोषण का संकेत)",
        "बेजान कोट",
        "शरीर की स्थिति में कमी",
        "बार-बार प्रजनन / बांझपन",
        "जन्म के समय कमजोर बछड़े",
      ],
    },
    causes: {
      en: [
        "Excess dry fodder, lack of greens",
        "Lack of mineral mixture",
        "Inadequate clean water",
        "Sudden ration changes",
      ],
      hi: [
        "अधिक सूखा चारा, हरे चारे की कमी",
        "खनिज मिश्रण की कमी",
        "अपर्याप्त साफ पानी",
        "अचानक राशन परिवर्तन",
      ],
    },
    prevention: {
      en: [
        "Daily 25-35 kg green fodder",
        "Mix dry fodder (wheat / paddy straw)",
        "1 kg concentrate per 2 L milk yield",
        "50-80 L clean water daily",
        "100-150 g mineral mixture daily",
      ],
      hi: [
        "रोज़ाना 25-35 किलो हरा चारा",
        "सूखा चारा मिलाएं (गेहूं / धान का भूसा)",
        "हर 2 लीटर दूध पर 1 किलो सांद्र",
        "रोज़ाना 50-80 लीटर साफ पानी",
        "रोज़ाना 100-150 ग्राम खनिज मिश्रण",
      ],
    },
    treatment: {
      en: [
        "Get fodder analyzed for nutrients",
        "Consult vet/nutritionist for ration",
        "Add bypass fat for high-yielders",
        "Calcium-D3 in lactating cows",
      ],
      hi: [
        "चारे का पोषक तत्वों के लिए विश्लेषण कराएं",
        "राशन के लिए पशु चिकित्सक/पोषण विशेषज्ञ से परामर्श लें",
        "उच्च-उत्पादक के लिए बायपास फैट जोड़ें",
        "दूध देने वाली गायों में कैल्शियम-D3",
      ],
    },
    publishedAt: "2026-04-10",
    readTimeMin: 8,
  },
];

export const getDiseaseBySlug = (slug: string) =>
  diseases.find((d) => d.slug === slug);
