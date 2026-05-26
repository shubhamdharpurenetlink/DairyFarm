import type { TrainingProgram } from "@/types";
import { dummyImageAt } from "@/lib/dummyImage";

const img = (id: number) => dummyImageAt("training", id, 800, 500);
const avatar = (id: number) => `https://i.pravatar.cc/200?u=trainer${id}`;

export const trainings: TrainingProgram[] = [
  {
    slug: "dairy-entrepreneur-basics",
    title: {
      en: "Dairy Entrepreneur Basics",
      hi: "डेयरी उद्यमी की मूल बातें",
    },
    shortDesc: {
      en: "3-day weekend bootcamp covering shed design, cow selection, hygiene, fodder and direct-to-consumer milk selling.",
      hi: "3-दिवसीय वीकेंड बूटकैम्प — शेड डिज़ाइन, गाय चयन, स्वच्छता, चारा और सीधे ग्राहक को दूध बेचना।",
    },
    longDesc: {
      en: "Built for first-time dairy entrepreneurs setting up a 5–10 cow unit. By the end of three days you'll know how to choose between Gir/Sahiwal/HF-cross, design a tropical-climate shed, calculate a daily feed ration in INR, and price your milk for a profitable D2C route. Live demonstrations with our own herd in Pandhurna; printed Hindi & English manuals included.",
      hi: "5–10 गायों की इकाई शुरू करने वाले पहली बार के डेयरी उद्यमियों के लिए। तीन दिन के अंत में आप जान जाएँगे कि गिर/साहीवाल/HF-क्रॉस में से कैसे चुनें, उष्णकटिबंधीय शेड कैसे डिज़ाइन करें, रोज़ का चारा-राशन रुपयों में कैसे जोड़ें, और लाभप्रद D2C के लिए दूध की कीमत कैसे तय करें। पांढुर्णा में हमारे ही झुंड के साथ लाइव डेमो; मुद्रित हिंदी और अंग्रेजी मैनुअल शामिल।",
    },
    image: img(0),
    durationDays: 3,
    priceInr: 4999,
    level: "beginner",
    seatsTotal: 24,
    seatsLeft: 11,
    syllabus: {
      en: [
        "Day 1 AM: Choosing breeds — A2 vs commercial, ROI tables for Gir / Sahiwal / HF-cross",
        "Day 1 PM: Shed design, ventilation, flooring, water lines — live walk-through",
        "Day 2 AM: Daily ration formulation — TMR, silage, green fodder, mineral mix in INR/kg",
        "Day 2 PM: Hygienic milking — hand vs machine, teat dip, recording app",
        "Day 3 AM: Health calendar — vaccinations, deworming, mastitis early detection",
        "Day 3 PM: Sales channels — Amul cooperative, direct delivery, B2B, online store setup",
      ],
      hi: [
        "दिन 1 सुबह: नस्ल चयन — A2 बनाम वाणिज्यिक, गिर / साहीवाल / HF-क्रॉस के लिए ROI",
        "दिन 1 शाम: शेड डिज़ाइन, हवा-वेंटिलेशन, फर्श, पानी की लाइन — लाइव वॉक-थ्रू",
        "दिन 2 सुबह: रोज़ का चारा सूत्रीकरण — TMR, साइलेज, हरा चारा, खनिज मिश्रण ₹/किलो",
        "दिन 2 शाम: स्वच्छ दुग्ध-निकालन — हाथ बनाम मशीन, टीट डिप, रिकॉर्डिंग ऐप",
        "दिन 3 सुबह: स्वास्थ्य कैलेंडर — टीकाकरण, कृमिनाशन, मास्टाइटिस की जल्दी पहचान",
        "दिन 3 शाम: बिक्री चैनल — अमूल सहकारी, सीधी डिलीवरी, B2B, ऑनलाइन स्टोर सेटअप",
      ],
    },
    instructor: {
      name: "Dr. Anil Sharma",
      role: { en: "Senior Veterinarian & Founder Trainer", hi: "वरिष्ठ पशुचिकित्सक और संस्थापक प्रशिक्षक" },
      avatar: avatar(1),
      bioYears: 22,
    },
    schedule: {
      en: "Every 2nd Friday–Sunday, 7 AM – 6 PM (with lunch break)",
      hi: "हर दूसरे शुक्र–रवि, सुबह 7 बजे – शाम 6 बजे (लंच ब्रेक के साथ)",
    },
    includes: {
      en: [
        "All meals, chai and farm dinner",
        "Printed manuals (Hindi + English)",
        "Shared farm-stay accommodation",
        "ICAR-recognised certificate",
        "1-year WhatsApp helpline after training",
        "5% discount on first heifer purchase from us",
      ],
      hi: [
        "सभी भोजन, चाय और फार्म डिनर",
        "मुद्रित मैनुअल (हिंदी + अंग्रेज़ी)",
        "साझा फार्म-स्टे आवास",
        "ICAR-मान्यता प्राप्त प्रमाण-पत्र",
        "प्रशिक्षण के बाद 1 साल का WhatsApp हेल्पलाइन",
        "हमसे पहली बछिया खरीद पर 5% छूट",
      ],
    },
  },
  {
    slug: "ai-reproductive-health",
    title: {
      en: "AI & Reproductive Health Workshop",
      hi: "कृत्रिम गर्भाधान और प्रजनन स्वास्थ्य कार्यशाला",
    },
    shortDesc: {
      en: "5-day hands-on AI workshop — heat detection, semen handling, insemination technique, pregnancy diagnosis.",
      hi: "5-दिवसीय कृत्रिम गर्भाधान कार्यशाला — गर्मी पहचान, वीर्य संभाल, गर्भाधान तकनीक, गर्भ निदान।",
    },
    longDesc: {
      en: "Earn while you serve — qualify to perform AI on your own cows and your village. Includes a phantom cow for practice and 50 inseminations on live cows under supervision. Material aligned with NDDB syllabus; we also help connect you to BAIF / NDDB-empanelled semen suppliers after the course.",
      hi: "सेवा करते हुए कमाएँ — अपनी गायों और अपने गाँव में AI करने योग्य बनें। अभ्यास के लिए फैंटम गाय और निगरानी में जीवित गायों पर 50 गर्भाधान शामिल। NDDB पाठ्यक्रम के अनुरूप; कोर्स के बाद हम BAIF / NDDB-सूचीबद्ध वीर्य आपूर्तिकर्ताओं से जोड़ने में भी मदद करते हैं।",
    },
    image: img(1),
    durationDays: 5,
    priceInr: 12499,
    level: "intermediate",
    seatsTotal: 12,
    seatsLeft: 4,
    syllabus: {
      en: [
        "Day 1: Female reproductive anatomy + oestrus cycle physiology",
        "Day 2: Heat detection — visual, mounting, tail-paint, pedometer methods",
        "Day 3: Liquid nitrogen flask handling, semen straw thawing, hygiene",
        "Day 4: Recto-vaginal AI technique on phantom + 5 supervised live AIs",
        "Day 5: Pregnancy diagnosis — rectal palpation + ultrasound intro, record-keeping",
      ],
      hi: [
        "दिन 1: मादा प्रजनन शरीर रचना + एस्ट्रस चक्र शरीर क्रिया",
        "दिन 2: गर्मी पहचान — दृश्य, माउंटिंग, टेल-पेंट, पेडोमीटर",
        "दिन 3: तरल नाइट्रोजन फ्लास्क संभाल, वीर्य पुआल पिघलाना, स्वच्छता",
        "दिन 4: फैंटम पर रेक्टो-वैजाइनल AI तकनीक + 5 निगरानी में जीवित AI",
        "दिन 5: गर्भ निदान — रेक्टल पैल्पेशन + अल्ट्रासाउंड परिचय, रिकॉर्ड-कीपिंग",
      ],
    },
    instructor: {
      name: "Dr. Rashmi Tiwari",
      role: { en: "Reproduction Specialist (BAIF-trained)", hi: "प्रजनन विशेषज्ञ (BAIF-प्रशिक्षित)" },
      avatar: avatar(2),
      bioYears: 14,
    },
    schedule: {
      en: "1st and 3rd week of every month, 8 AM – 5 PM",
      hi: "हर महीने का पहला और तीसरा सप्ताह, सुबह 8 बजे – शाम 5 बजे",
    },
    includes: {
      en: [
        "AI starter kit (gloves, sheath, gun, lubricant — value ₹2,000)",
        "Practice straws (10 nos.)",
        "All meals + accommodation",
        "Bilingual reference manual",
        "BAIF/NDDB-recognised certificate",
      ],
      hi: [
        "AI स्टार्टर किट (दस्ताने, शीथ, गन, ल्यूब्रिकेंट — मूल्य ₹2,000)",
        "अभ्यास पुआल (10 नग)",
        "सभी भोजन + आवास",
        "द्विभाषी संदर्भ मैनुअल",
        "BAIF/NDDB-मान्यता प्राप्त प्रमाण-पत्र",
      ],
    },
  },
  {
    slug: "advanced-cattle-management",
    title: {
      en: "Advanced Herd Management",
      hi: "उन्नत झुंड प्रबंधन",
    },
    shortDesc: {
      en: "7-day intensive for 10+ cow units — herd analytics, lactation curves, breeding plans, financial modelling.",
      hi: "7-दिवसीय गहन — 10+ गायों की इकाइयों के लिए झुंड विश्लेषण, स्तनपान वक्र, प्रजनन योजना, वित्तीय मॉडलिंग।",
    },
    longDesc: {
      en: "For operating dairy entrepreneurs who want to optimise their herd. We open up our own farm books — cost per litre, ROI per cow, lactation curves, breeding gain. You leave with editable Excel models, an SOP binder, and an action plan for your own farm.",
      hi: "संचालन कर रहे डेयरी उद्यमियों के लिए जो अपने झुंड को अनुकूलित करना चाहते हैं। हम अपनी खुद की फार्म बहियाँ खोलते हैं — प्रति लीटर लागत, प्रति गाय ROI, स्तनपान वक्र, प्रजनन लाभ। आप संपादन योग्य Excel मॉडल, SOP बाइंडर, और अपने फार्म के लिए कार्य योजना के साथ लौटेंगे।",
    },
    image: img(2),
    durationDays: 7,
    priceInr: 22999,
    level: "advanced",
    seatsTotal: 15,
    seatsLeft: 6,
    syllabus: {
      en: [
        "Day 1: Herd-level cost-per-litre analysis (live spreadsheet)",
        "Day 2: Lactation curves & feed-efficiency ratios",
        "Day 3: AI breeding plan — genetic gain, bull selection from NDDB catalogue",
        "Day 4: Calf-to-heifer pipeline; replacement-rate maths",
        "Day 5: Mechanisation — milking machines, TMR mixers, cooling systems",
        "Day 6: Dairy plant 101 — pasteuriser, packaging, FSSAI compliance",
        "Day 7: Branding, e-commerce, subscription model setup",
      ],
      hi: [
        "दिन 1: झुंड-स्तरीय प्रति-लीटर लागत विश्लेषण (लाइव स्प्रेडशीट)",
        "दिन 2: स्तनपान वक्र और चारा-कुशलता अनुपात",
        "दिन 3: AI प्रजनन योजना — आनुवंशिक लाभ, NDDB कैटलॉग से बैल चयन",
        "दिन 4: बछड़ी-से-बछिया पाइपलाइन; प्रतिस्थापन दर गणित",
        "दिन 5: यांत्रिकीकरण — दुग्ध-निकालन मशीन, TMR मिक्सर, शीतलन",
        "दिन 6: डेयरी प्लांट 101 — पाश्चुराइज़र, पैकेजिंग, FSSAI अनुपालन",
        "दिन 7: ब्रांडिंग, ई-कॉमर्स, सब्सक्रिप्शन मॉडल सेटअप",
      ],
    },
    instructor: {
      name: "Mr. Vikram Yadav",
      role: { en: "Dairy Entrepreneur & MBA, IRMA", hi: "डेयरी उद्यमी और IRMA से MBA" },
      avatar: avatar(3),
      bioYears: 19,
    },
    schedule: {
      en: "1 batch per quarter — Jan, Apr, Jul, Oct (1st full week)",
      hi: "तिमाही में 1 बैच — जनवरी, अप्रैल, जुलाई, अक्टूबर (पहला पूरा सप्ताह)",
    },
    includes: {
      en: [
        "Editable Excel financial model template",
        "Bilingual SOP binder (140 pages)",
        "All meals + private farm-stay room",
        "Day-7 personal mentoring call (90 minutes)",
        "Lifetime alumni WhatsApp group",
        "ICAR + NDDB certificate",
      ],
      hi: [
        "संपादन योग्य Excel वित्तीय मॉडल टेम्प्लेट",
        "द्विभाषी SOP बाइंडर (140 पेज)",
        "सभी भोजन + निजी फार्म-स्टे कमरा",
        "दिन-7 का व्यक्तिगत मेंटरिंग कॉल (90 मिनट)",
        "जीवनभर का एलमनी WhatsApp समूह",
        "ICAR + NDDB प्रमाण-पत्र",
      ],
    },
  },
  {
    slug: "bilona-ghee-workshop",
    title: {
      en: "Bilona Ghee Making Workshop",
      hi: "बिलोना घी निर्माण कार्यशाला",
    },
    shortDesc: {
      en: "2-day artisan workshop — Vedic 8-step bilona method, batch costing, FSSAI labelling.",
      hi: "2-दिवसीय कारीगर कार्यशाला — वैदिक 8-चरण बिलोना विधि, बैच लागत, FSSAI लेबलिंग।",
    },
    longDesc: {
      en: "Learn the ancient 8-step bilona method end-to-end — boil, set, churn, cook, filter, jar and brand. We make a 1-litre batch start-to-finish in the workshop. Includes a small wooden bilona for you to take home and FSSAI labelling guidance for selling commercially.",
      hi: "प्राचीन 8-चरण बिलोना विधि अंत से अंत तक सीखें — उबालना, जमाना, मथना, पकाना, छानना, बोतलबंद करना और ब्रांडिंग। कार्यशाला में हम 1-लीटर बैच शुरू से अंत तक बनाते हैं। एक छोटी लकड़ी की बिलोना घर ले जाने के लिए और व्यावसायिक बिक्री के लिए FSSAI लेबलिंग मार्गदर्शन शामिल।",
    },
    image: img(0),
    durationDays: 2,
    priceInr: 3499,
    level: "beginner",
    seatsTotal: 16,
    seatsLeft: 9,
    syllabus: {
      en: [
        "Day 1: Selecting A2 milk; setting overnight curd at the right temperature",
        "Day 1: Wooden bilona churning — speed, rhythm, water ratio",
        "Day 1: Separating makhan, washing & storing",
        "Day 2: Slow cooking makhan into ghee — colour, aroma, granule tests",
        "Day 2: Filtering, jarring, sealing & shelf-life testing",
        "Day 2: Cost sheet per 250 ml jar; FSSAI label, batch number, MRP",
      ],
      hi: [
        "दिन 1: A2 दूध का चयन; सही तापमान पर रातभर दही जमाना",
        "दिन 1: लकड़ी की बिलोना से मथना — गति, लय, पानी का अनुपात",
        "दिन 1: मक्खन निकालना, धोना और संरक्षण",
        "दिन 2: मक्खन को धीमी आँच पर घी में पकाना — रंग, सुगंध, दानेदारी",
        "दिन 2: छानना, बोतलबंद करना, सील करना और शेल्फ-लाइफ परीक्षण",
        "दिन 2: प्रति 250 मिली जार लागत-पत्र; FSSAI लेबल, बैच नंबर, MRP",
      ],
    },
    instructor: {
      name: "Smt. Lakshmi Patil",
      role: { en: "Founder & Master Ghee Maker", hi: "संस्थापक और मास्टर घी निर्माता" },
      avatar: avatar(4),
      bioYears: 28,
    },
    schedule: {
      en: "Every 1st Saturday–Sunday of the month, 9 AM – 5 PM",
      hi: "हर महीने के पहले शनिवार–रविवार, सुबह 9 बजे – शाम 5 बजे",
    },
    includes: {
      en: [
        "Small wooden bilona (take-home)",
        "100 ml of your own ghee batch to take",
        "All meals",
        "Bilingual recipe and SOP booklet",
        "FSSAI label template (editable)",
      ],
      hi: [
        "छोटी लकड़ी की बिलोना (घर ले जाने के लिए)",
        "आपके अपने बैच का 100 मिली घी",
        "सभी भोजन",
        "द्विभाषी रेसिपी और SOP पुस्तिका",
        "FSSAI लेबल टेम्प्लेट (संपादन योग्य)",
      ],
    },
  },
  {
    slug: "paneer-cheese-making",
    title: {
      en: "Paneer & Soft Cheese Making",
      hi: "पनीर और सॉफ्ट चीज़ निर्माण",
    },
    shortDesc: {
      en: "2-day course on artisan paneer, smoked paneer, mozzarella, ricotta, mascarpone for cafés and home kitchens.",
      hi: "2-दिवसीय कोर्स — कैफ़े और घर की रसोई के लिए कारीगर पनीर, स्मोक्ड पनीर, मोज़ारेला, रिकोटा, मस्कारपोन।",
    },
    longDesc: {
      en: "Live demonstrations of 6 cheese types using our A2 milk. You will hand-press your own paneer block and pull your own mozzarella ball. Includes shelf-life, brine, pricing for café supply and cold-chain logistics.",
      hi: "हमारे A2 दूध से 6 चीज़ प्रकारों का लाइव डेमो। आप अपने पनीर का ब्लॉक खुद हाथ से दबाएँगे और अपनी मोज़ारेला बॉल खुद पुल करेंगे। शेल्फ-लाइफ, ब्राइन, कैफे आपूर्ति के लिए मूल्य निर्धारण और कोल्ड-चेन लॉजिस्टिक्स शामिल।",
    },
    image: img(1),
    durationDays: 2,
    priceInr: 4499,
    level: "intermediate",
    seatsTotal: 14,
    seatsLeft: 7,
    syllabus: {
      en: [
        "Day 1: Milk standardisation, citric acid vs whey acidulation",
        "Day 1: Hand-pressed malai paneer + smoked paneer over apple-wood chips",
        "Day 1: Cold-smoke chamber DIY using a tin drum",
        "Day 2: Pulled mozzarella — water temperature, stretching technique",
        "Day 2: Quick ricotta from whey (zero waste)",
        "Day 2: Mascarpone, hung curd cheese, labneh",
      ],
      hi: [
        "दिन 1: दूध मानकीकरण, साइट्रिक एसिड बनाम मट्ठा अम्लीकरण",
        "दिन 1: हाथ से दबा मलाई पनीर + सेब-लकड़ी पर स्मोक्ड पनीर",
        "दिन 1: टिन ड्रम का उपयोग कर DIY कोल्ड-स्मोक चैंबर",
        "दिन 2: पुल्ड मोज़ारेला — पानी का तापमान, खींचने की तकनीक",
        "दिन 2: मट्ठे से त्वरित रिकोटा (शून्य-व्यर्थ)",
        "दिन 2: मस्कारपोन, हंग कर्ड चीज़, लबनेह",
      ],
    },
    instructor: {
      name: "Chef Rohit Deshmukh",
      role: { en: "Head Cheese-Maker", hi: "हेड चीज़-मेकर" },
      avatar: avatar(5),
      bioYears: 9,
    },
    schedule: {
      en: "Every 3rd weekend of the month",
      hi: "हर महीने का तीसरा सप्ताहांत",
    },
    includes: {
      en: [
        "Cheesemaking starter kit (rennet, citric acid, thermometer)",
        "Your own paneer and mozzarella to take home",
        "Bilingual recipe binder (32 pages)",
        "All meals and chai",
      ],
      hi: [
        "चीज़मेकिंग स्टार्टर किट (रेनेट, साइट्रिक एसिड, थर्मामीटर)",
        "अपना खुद का पनीर और मोज़ारेला घर ले जाएँ",
        "द्विभाषी रेसिपी बाइंडर (32 पेज)",
        "सभी भोजन और चाय",
      ],
    },
  },
  {
    slug: "silage-hay-making",
    title: {
      en: "Silage & Hay Making for Year-Round Fodder",
      hi: "साल भर के चारे के लिए साइलेज और हे बनाना",
    },
    shortDesc: {
      en: "2-day field course — maize silage, hay baling, urea-treatment of straw, mineral mix preparation.",
      hi: "2-दिवसीय फील्ड कोर्स — मक्का साइलेज, हे बेलिंग, पुआल का यूरिया-उपचार, खनिज मिश्रण तैयारी।",
    },
    longDesc: {
      en: "Solve the summer fodder shortage with your own preserved feeds. Hands-on training on building a pit silo, maize harvesting at the right stage, baling Napier hay, urea-treating wheat/paddy straw, and mixing a balanced mineral mixture.",
      hi: "अपने संरक्षित चारे से गर्मियों की चारा कमी हल करें। पिट साइलो बनाने, सही चरण में मक्का कटाई, नेपियर हे की गठरी बनाने, गेहूँ/धान के पुआल का यूरिया-उपचार, और संतुलित खनिज मिश्रण मिलाने पर व्यावहारिक प्रशिक्षण।",
    },
    image: img(2),
    durationDays: 2,
    priceInr: 2999,
    level: "beginner",
    seatsTotal: 20,
    seatsLeft: 14,
    syllabus: {
      en: [
        "Day 1: Building a 5-ton pit silo — site, lining, sealing",
        "Day 1: Maize at milk-line stage, chaff length, compaction",
        "Day 1: Molasses & EM solution for fermentation",
        "Day 2: Sun-curing Napier grass for hay; baling technique",
        "Day 2: Urea-treatment of straw (4% solution + ammoniation)",
        "Day 2: Balanced mineral mix recipe (with FSSAI-listed sources)",
      ],
      hi: [
        "दिन 1: 5-टन पिट साइलो बनाना — स्थान, लाइनिंग, सीलिंग",
        "दिन 1: दूध-रेखा चरण में मक्का, चूरा लंबाई, संघनन",
        "दिन 1: किण्वन के लिए मोलासेस और EM घोल",
        "दिन 2: हे के लिए नेपियर घास सुखाना; बेलिंग तकनीक",
        "दिन 2: पुआल का यूरिया-उपचार (4% घोल + अमोनिएशन)",
        "दिन 2: संतुलित खनिज मिश्रण रेसिपी (FSSAI-सूचीबद्ध स्रोतों के साथ)",
      ],
    },
    instructor: {
      name: "Mr. Sanjay Bhongade",
      role: { en: "Fodder Specialist, ICAR-Mhow", hi: "चारा विशेषज्ञ, ICAR-महू" },
      avatar: avatar(6),
      bioYears: 16,
    },
    schedule: {
      en: "April – June (silage season). Custom dates for groups of 6+",
      hi: "अप्रैल – जून (साइलेज मौसम)। 6+ के समूह के लिए कस्टम तारीखें",
    },
    includes: {
      en: [
        "Silage starter inoculant (1 kg)",
        "Field tools demo kit",
        "All meals",
        "Bilingual handbook",
        "On-site soil-and-fodder test by partner lab",
      ],
      hi: [
        "साइलेज स्टार्टर इनोकुलेंट (1 किलो)",
        "खेत-उपकरण डेमो किट",
        "सभी भोजन",
        "द्विभाषी हैंडबुक",
        "साझेदार लैब द्वारा साइट पर मिट्टी-और-चारा परीक्षण",
      ],
    },
  },
  {
    slug: "disease-surveillance-vaccination",
    title: {
      en: "Disease Surveillance & Vaccination",
      hi: "रोग निगरानी और टीकाकरण",
    },
    shortDesc: {
      en: "3-day course on building a disease-free farm — vaccination calendar, biosecurity, on-farm record system.",
      hi: "3-दिवसीय कोर्स — टीकाकरण कैलेंडर, जैव-सुरक्षा, ऑन-फार्म रिकॉर्ड प्रणाली से रोग-मुक्त फार्म बनाएँ।",
    },
    longDesc: {
      en: "Co-taught with our resident vet. Build a tamper-proof annual vaccination calendar, learn early detection of mastitis, FMD, LSD, brucellosis and Theileria. Includes hands-on cold-chain handling, blood-sample collection technique and visit to a state veterinary hospital.",
      hi: "हमारे रहवासी पशुचिकित्सक के साथ सह-शिक्षित। एक छेड़छाड़-रोधी वार्षिक टीकाकरण कैलेंडर बनाएँ, मास्टाइटिस, FMD, LSD, ब्रुसेलोसिस और Theileria की जल्दी पहचान सीखें। व्यावहारिक कोल्ड-चेन संभाल, रक्त-नमूना संग्रह तकनीक और राज्य पशुचिकित्सा अस्पताल का दौरा शामिल।",
    },
    image: img(0),
    durationDays: 3,
    priceInr: 5499,
    level: "intermediate",
    seatsTotal: 18,
    seatsLeft: 8,
    syllabus: {
      en: [
        "Day 1: Annual vaccination calendar; cold-chain handling 4–8°C",
        "Day 1: FMD-CP, HS-BQ combined, Brucella S19/RB51 — when, how",
        "Day 2: California Mastitis Test (CMT) demo; somatic cell counts",
        "Day 2: LSD outbreak management; vector control strategies",
        "Day 3: Blood-sample collection, sending to lab, reading reports",
        "Day 3: Excel/Google-Sheet record system; printable diary template",
      ],
      hi: [
        "दिन 1: वार्षिक टीकाकरण कैलेंडर; कोल्ड-चेन संभाल 4–8°C",
        "दिन 1: FMD-CP, HS-BQ संयुक्त, Brucella S19/RB51 — कब, कैसे",
        "दिन 2: California Mastitis Test (CMT) डेमो; सोमैटिक सेल काउंट",
        "दिन 2: LSD प्रकोप प्रबंधन; वेक्टर नियंत्रण रणनीतियाँ",
        "दिन 3: रक्त-नमूना संग्रह, प्रयोगशाला भेजना, रिपोर्ट पढ़ना",
        "दिन 3: Excel/Google-Sheet रिकॉर्ड प्रणाली; प्रिंट-योग्य डायरी टेम्प्लेट",
      ],
    },
    instructor: {
      name: "Dr. Anil Sharma",
      role: { en: "Senior Veterinarian", hi: "वरिष्ठ पशुचिकित्सक" },
      avatar: avatar(1),
      bioYears: 22,
    },
    schedule: {
      en: "2nd Monday – Wednesday of every month",
      hi: "हर महीने का दूसरा सोम–बुध",
    },
    includes: {
      en: [
        "CMT kit + thermometer + record diary",
        "Visit to district vet hospital",
        "All meals + farm-stay",
        "ICAR-recognised certificate",
      ],
      hi: [
        "CMT किट + थर्मामीटर + रिकॉर्ड डायरी",
        "जिला पशुचिकित्सा अस्पताल का दौरा",
        "सभी भोजन + फार्म-स्टे",
        "ICAR-मान्यता प्राप्त प्रमाण-पत्र",
      ],
    },
  },
  {
    slug: "cow-comfort-housing",
    title: {
      en: "Cow Comfort & Housing Design",
      hi: "गाय की सुख-सुविधा और आवास डिज़ाइन",
    },
    shortDesc: {
      en: "2-day architecture-meets-zootechnics course — shed orientation, ventilation, cooling, free-stall design.",
      hi: "2-दिवसीय आर्किटेक्चर + पशु-तकनीक कोर्स — शेड दिशा, हवादार, शीतलन, फ्री-स्टॉल डिज़ाइन।",
    },
    longDesc: {
      en: "More yield comes from a well-designed shed than any feed brand. Learn the ICAR/NDDB approved free-stall designs, fan-and-mist cooling, anti-slip flooring, calf hutches and proper drainage. We measure our own shed live with you.",
      hi: "किसी भी चारा ब्रांड से ज़्यादा उत्पादन एक अच्छे शेड डिज़ाइन से आता है। ICAR/NDDB-अनुमोदित फ्री-स्टॉल डिज़ाइन, फैन-एंड-मिस्ट कूलिंग, एंटी-स्लिप फर्श, बछड़ा हटियाँ और उचित जल निकासी सीखें। हम अपने शेड को आपके साथ लाइव मापते हैं।",
    },
    image: img(1),
    durationDays: 2,
    priceInr: 3499,
    level: "intermediate",
    seatsTotal: 16,
    seatsLeft: 10,
    syllabus: {
      en: [
        "Day 1: Site selection, orientation (E–W ridge), space per cow",
        "Day 1: Roof, ridge ventilation, sidewall fans + foggers",
        "Day 1: Anti-slip rubber matting vs grooved concrete",
        "Day 2: Free-stall vs tie-stall; calf and dry-cow sections",
        "Day 2: Drainage, slurry pit, biogas integration",
        "Day 2: AutoCAD drawings of small (10-cow) and medium (30-cow) sheds",
      ],
      hi: [
        "दिन 1: स्थान चयन, दिशा (पूर्व–पश्चिम रिज), प्रति गाय जगह",
        "दिन 1: छत, रिज वेंटिलेशन, साइडवॉल पंखे + फॉगर",
        "दिन 1: एंटी-स्लिप रबर मैटिंग बनाम खुरदुरा कंक्रीट",
        "दिन 2: फ्री-स्टॉल बनाम टाई-स्टॉल; बछड़ा और सूखी-गाय खंड",
        "दिन 2: जल निकासी, स्लरी पिट, बायोगैस एकीकरण",
        "दिन 2: छोटे (10-गाय) और मध्यम (30-गाय) शेड के AutoCAD ड्रॉइंग",
      ],
    },
    instructor: {
      name: "Ar. Meera Sharma",
      role: { en: "Farm Architect (NID-Ahmedabad)", hi: "फार्म आर्किटेक्ट (NID-अहमदाबाद)" },
      avatar: avatar(7),
      bioYears: 11,
    },
    schedule: {
      en: "4th weekend of every month",
      hi: "हर महीने का चौथा सप्ताहांत",
    },
    includes: {
      en: [
        "Editable AutoCAD shed templates",
        "Cost-estimation sheet (10-cow and 30-cow)",
        "On-farm shed audit checklist",
        "All meals + farm-stay",
      ],
      hi: [
        "संपादन योग्य AutoCAD शेड टेम्प्लेट",
        "लागत-अनुमान शीट (10-गाय और 30-गाय)",
        "ऑन-फार्म शेड ऑडिट चेकलिस्ट",
        "सभी भोजन + फार्म-स्टे",
      ],
    },
  },
  {
    slug: "solar-dairy-hybrid",
    title: {
      en: "Solar-Powered Dairy Hybrid Setup",
      hi: "सोलर-संचालित डेयरी हाइब्रिड सेटअप",
    },
    shortDesc: {
      en: "1-day course on solar pumps, chilling units, milking machines — including PM-KUSUM & NABARD subsidies.",
      hi: "1-दिवसीय कोर्स — सोलर पंप, चिलिंग यूनिट, दुग्ध-निकालन मशीन। PM-KUSUM और NABARD सब्सिडी शामिल।",
    },
    longDesc: {
      en: "Slash your electricity bill 70% with the right solar setup. Sizing calculations for pumps, lights, fans, BMC and milking machines; battery vs hybrid; net-metering process; and step-by-step PM-KUSUM Component-B and NABARD subsidy paperwork.",
      hi: "सही सोलर सेटअप से बिजली बिल 70% तक घटाएँ। पंप, लाइट, पंखा, BMC और दुग्ध-निकालन मशीन के लिए साइज़िंग गणनाएँ; बैटरी बनाम हाइब्रिड; नेट-मीटरिंग प्रक्रिया; और PM-KUSUM कॉम्पोनेंट-B और NABARD सब्सिडी कागज़ी कार्रवाई।",
    },
    image: img(2),
    durationDays: 1,
    priceInr: 1999,
    level: "intermediate",
    seatsTotal: 25,
    seatsLeft: 18,
    syllabus: {
      en: [
        "Energy audit of your dairy — pumps, fans, chillers, machines",
        "Solar sizing — kWp, panels, inverter, battery vs hybrid",
        "PM-KUSUM Component-B (60% subsidy on solar pumps)",
        "NABARD term loan + 30–50% capital subsidy walk-through",
        "Net-metering process in MP/Maharashtra",
        "Live tour of our 5 kWp rooftop solar plant",
      ],
      hi: [
        "अपनी डेयरी का ऊर्जा-ऑडिट — पंप, पंखे, चिलर, मशीनें",
        "सोलर साइज़िंग — kWp, पैनल, इन्वर्टर, बैटरी बनाम हाइब्रिड",
        "PM-KUSUM कॉम्पोनेंट-B (सोलर पंप पर 60% सब्सिडी)",
        "NABARD टर्म लोन + 30–50% पूँजी सब्सिडी की पूरी प्रक्रिया",
        "MP/महाराष्ट्र में नेट-मीटरिंग प्रक्रिया",
        "हमारे 5 kWp छत सोलर प्लांट का लाइव दौरा",
      ],
    },
    instructor: {
      name: "Mr. Pravin Kale",
      role: { en: "MNRE-empanelled Solar Engineer", hi: "MNRE-सूचीबद्ध सोलर इंजीनियर" },
      avatar: avatar(8),
      bioYears: 12,
    },
    schedule: {
      en: "Every last Sunday of the month",
      hi: "हर महीने का अंतिम रविवार",
    },
    includes: {
      en: [
        "Subsidy-paperwork toolkit (PM-KUSUM + NABARD)",
        "Custom energy-audit Excel for your farm",
        "Lunch and chai",
        "Discount voucher (₹5,000) with partnered installers",
      ],
      hi: [
        "सब्सिडी कागज़ी-कार्रवाई किट (PM-KUSUM + NABARD)",
        "आपके फार्म के लिए कस्टम ऊर्जा-ऑडिट Excel",
        "लंच और चाय",
        "साझेदार इंस्टॉलरों के साथ छूट वाउचर (₹5,000)",
      ],
    },
  },
  {
    slug: "women-dairy-entrepreneurship",
    title: {
      en: "Women's Dairy Entrepreneurship",
      hi: "महिला डेयरी उद्यमिता",
    },
    shortDesc: {
      en: "5-day residential programme exclusively for rural women — subsidised by NABARD-DEDS.",
      hi: "5-दिवसीय आवासीय कार्यक्रम केवल ग्रामीण महिलाओं के लिए — NABARD-DEDS द्वारा सब्सिडी।",
    },
    longDesc: {
      en: "Run twice a year with NABARD-DEDS subsidy — half-fee for SC/ST/OBC women. Modules on starting a 2–4 cow unit, value-added products (paneer, ghee, dahi sales), self-help group formation and accessing the Mahila Kisan Sashaktikaran Pariyojana grants.",
      hi: "NABARD-DEDS सब्सिडी के साथ साल में दो बार चलता है — SC/ST/OBC महिलाओं के लिए आधा शुल्क। 2–4 गायों की इकाई शुरू करने, मूल्यवर्धित उत्पाद (पनीर, घी, दही बिक्री), स्वयं सहायता समूह गठन और महिला किसान सशक्तिकरण परियोजना अनुदान तक पहुँच पर मॉड्यूल।",
    },
    image: img(0),
    durationDays: 5,
    priceInr: 1999,
    level: "beginner",
    seatsTotal: 20,
    seatsLeft: 12,
    syllabus: {
      en: [
        "Day 1: Confidence-building, women's role in Indian dairy history",
        "Day 2: Choosing your first cow — Gir / Sahiwal for beginners",
        "Day 2: Daily routine and home-based dairy care",
        "Day 3: Value-added products — ghee, paneer, dahi for direct sale",
        "Day 4: Self-help group formation; MKSP and NRLM grants",
        "Day 5: Building your micro-brand; WhatsApp Business basics",
      ],
      hi: [
        "दिन 1: आत्मविश्वास निर्माण, भारतीय डेयरी इतिहास में महिलाओं की भूमिका",
        "दिन 2: अपनी पहली गाय का चयन — नवसिखियों के लिए गिर / साहीवाल",
        "दिन 2: दैनिक दिनचर्या और घरेलू डेयरी देखभाल",
        "दिन 3: मूल्यवर्धित उत्पाद — सीधी बिक्री के लिए घी, पनीर, दही",
        "दिन 4: स्वयं सहायता समूह गठन; MKSP और NRLM अनुदान",
        "दिन 5: अपना सूक्ष्म-ब्रांड बनाना; WhatsApp Business बेसिक्स",
      ],
    },
    instructor: {
      name: "Smt. Lakshmi Patil",
      role: { en: "Founder & Lead Trainer", hi: "संस्थापक और प्रमुख प्रशिक्षक" },
      avatar: avatar(4),
      bioYears: 28,
    },
    schedule: {
      en: "March and October cohorts (NABARD-aligned)",
      hi: "मार्च और अक्टूबर के बैच (NABARD-अनुरूप)",
    },
    includes: {
      en: [
        "Shared female-only accommodation",
        "All meals, dupatta and farm uniform",
        "NABARD-DEDS completion certificate",
        "Seed grant of ₹5,000 toward first cow",
        "Lifetime alumni network access",
      ],
      hi: [
        "केवल महिलाओं का साझा आवास",
        "सभी भोजन, दुपट्टा और फार्म वर्दी",
        "NABARD-DEDS पूर्णता प्रमाण-पत्र",
        "पहली गाय के लिए ₹5,000 का बीज अनुदान",
        "जीवनभर एलमनी नेटवर्क पहुँच",
      ],
    },
  },
];

export const getTrainingBySlug = (slug: string) =>
  trainings.find((t) => t.slug === slug);
