import type { TrainingProgram } from "@/types";
import { dummyImageAt } from "@/lib/dummyImage";

const img = (id: number) => dummyImageAt("training", id, 800, 500);
const avatar = (id: number) => `https://i.pravatar.cc/200?u=trainer${id}`;

export const trainings: TrainingProgram[] = [
  {
    slug: "dairy-farming-basics",
    title: {
      en: "Dairy Farming Basics",
      hi: "डेयरी फार्मिंग की मूल बातें",
    },
    shortDesc: {
      en: "3-day weekend course covering cow selection, basic care, feeding & hygiene",
      hi: "3-दिवसीय वीकेंड कोर्स - गाय का चयन, बुनियादी देखभाल, भोजन और स्वच्छता",
    },
    longDesc: {
      en: "Perfect for first-time farmers, this hands-on course gives you everything you need to start a small dairy unit. Live demonstrations on the farm with our cows.",
      hi: "पहली बार किसानों के लिए उत्तम, यह व्यावहारिक कोर्स आपको छोटी डेयरी इकाई शुरू करने के लिए आवश्यक सब कुछ देता है। हमारी गायों के साथ खेत पर लाइव डेमो।",
    },
    image: img(1),
    durationDays: 3,
    priceInr: 4999,
    level: "beginner",
    seatsTotal: 25,
    seatsLeft: 8,
    syllabus: {
      en: [
        "Day 1: Cow breeds & buying tips, shed design",
        "Day 1: Hygiene & cow handling demonstrations",
        "Day 2: Fodder, feed rationing, water requirements",
        "Day 2: Daily milking routine and cleanliness",
        "Day 3: Common diseases & vaccinations",
        "Day 3: Selling milk - direct, dairy, processing options",
      ],
      hi: [
        "दिन 1: गाय की नस्लें और खरीदारी, शेड डिज़ाइन",
        "दिन 1: स्वच्छता और गाय संभालने के डेमो",
        "दिन 2: चारा, फीड राशनिंग, पानी की आवश्यकताएं",
        "दिन 2: दैनिक दूध निकालने की दिनचर्या और सफाई",
        "दिन 3: सामान्य बीमारियाँ और टीकाकरण",
        "दिन 3: दूध बेचना - प्रत्यक्ष, डेयरी, प्रसंस्करण विकल्प",
      ],
    },
    instructor: {
      name: "Dr. Anil Sharma",
      role: { en: "Senior Veterinarian", hi: "वरिष्ठ पशु चिकित्सक" },
      avatar: avatar(1),
      bioYears: 18,
    },
    schedule: {
      en: "Every Fri-Sun, 8 AM to 5 PM",
      hi: "हर शुक्र-रवि, सुबह 8 बजे से शाम 5 बजे",
    },
    includes: {
      en: [
        "All meals and chai",
        "Course materials in Hindi & English",
        "Farm stay (shared room)",
        "Certificate of completion",
        "1-year WhatsApp support",
      ],
      hi: [
        "सभी भोजन और चाय",
        "हिंदी और अंग्रेजी में कोर्स सामग्री",
        "फार्म स्टे (साझा कमरा)",
        "पूर्णता का प्रमाण पत्र",
        "1 साल का WhatsApp सहायता",
      ],
    },
  },
  {
    slug: "advanced-cattle-management",
    title: {
      en: "Advanced Cattle Management",
      hi: "उन्नत मवेशी प्रबंधन",
    },
    shortDesc: {
      en: "1-week intensive on herd management, record keeping, financial planning",
      hi: "1-सप्ताह का गहन - झुंड प्रबंधन, रिकॉर्ड रखना, वित्तीय योजना",
    },
    longDesc: {
      en: "For farmers running 10+ cow units. Master herd analytics, lactation cycles, breeding records, automated milking systems, and dairy business planning.",
      hi: "10+ गाय इकाइयों वाले किसानों के लिए। झुंड विश्लेषण, स्तनपान चक्र, प्रजनन रिकॉर्ड, स्वचालित दूध निकालने वाले सिस्टम, और डेयरी व्यवसाय योजना में महारत हासिल करें।",
    },
    image: img(2),
    durationDays: 7,
    priceInr: 18999,
    level: "intermediate",
    seatsTotal: 15,
    seatsLeft: 4,
    syllabus: {
      en: [
        "Herd structure & age pyramid planning",
        "Lactation tracking and yield optimization",
        "Reproductive management & breeding records",
        "Calf rearing program",
        "Mechanical & automated milking systems",
        "Farm financial accounting",
        "Marketing and direct-to-consumer dairy",
      ],
      hi: [
        "झुंड संरचना और उम्र पिरामिड योजना",
        "लैक्टेशन ट्रैकिंग और उत्पादन अनुकूलन",
        "प्रजनन प्रबंधन और प्रजनन रिकॉर्ड",
        "बछड़ा पालन कार्यक्रम",
        "यांत्रिक और स्वचालित दूध निकालने वाले सिस्टम",
        "फार्म वित्तीय लेखांकन",
        "मार्केटिंग और प्रत्यक्ष-उपभोक्ता डेयरी",
      ],
    },
    instructor: {
      name: "Ramesh Kumar",
      role: { en: "Farm Operations Lead", hi: "फार्म संचालन प्रमुख" },
      avatar: avatar(2),
      bioYears: 22,
    },
    schedule: {
      en: "Next batch: 15-21 June 2026",
      hi: "अगला बैच: 15-21 जून 2026",
    },
    includes: {
      en: [
        "Full farm stay (private room)",
        "All meals, tea, juices",
        "Detailed printed manual",
        "Excel templates for record-keeping",
        "Certificate from Indian Dairy Association",
      ],
      hi: [
        "पूरा फार्म स्टे (निजी कमरा)",
        "सभी भोजन, चाय, रस",
        "विस्तृत मुद्रित मैनुअल",
        "रिकॉर्ड रखने के लिए एक्सेल टेम्पलेट",
        "इंडियन डेयरी एसोसिएशन से प्रमाण पत्र",
      ],
    },
  },
  {
    slug: "ai-reproductive-health",
    title: {
      en: "AI & Reproductive Health Course",
      hi: "AI और प्रजनन स्वास्थ्य कोर्स",
    },
    shortDesc: {
      en: "Master artificial insemination and reproductive disease management",
      hi: "कृत्रिम गर्भाधान और प्रजनन रोग प्रबंधन में महारत हासिल करें",
    },
    longDesc: {
      en: "Become a certified AI technician. Learn cattle reproduction, heat detection, AI techniques, and reproductive disorders. Government-recognized certification.",
      hi: "प्रमाणित AI तकनीशियन बनें। मवेशी प्रजनन, हीट डिटेक्शन, AI तकनीक और प्रजनन विकार सीखें। सरकार-मान्यता प्राप्त प्रमाणन।",
    },
    image: img(3),
    durationDays: 14,
    priceInr: 22999,
    level: "advanced",
    seatsTotal: 12,
    seatsLeft: 2,
    syllabus: {
      en: [
        "Bovine reproductive anatomy",
        "Heat detection and timing",
        "Semen storage and handling",
        "AI gun handling and insertion technique",
        "Pregnancy diagnosis by palpation",
        "Common reproductive disorders",
        "Live practice on cows (10+ inseminations)",
        "Government certification exam prep",
      ],
      hi: [
        "बोवाइन प्रजनन शरीर रचना",
        "हीट डिटेक्शन और समय",
        "वीर्य भंडारण और संभालना",
        "AI गन को संभालना और प्रवेश तकनीक",
        "स्पर्शन द्वारा गर्भावस्था निदान",
        "सामान्य प्रजनन विकार",
        "गायों पर लाइव अभ्यास (10+ गर्भाधान)",
        "सरकारी प्रमाणन परीक्षा तैयारी",
      ],
    },
    instructor: {
      name: "Dr. Priya Patel",
      role: { en: "Veterinary Reproduction Specialist", hi: "पशु चिकित्सा प्रजनन विशेषज्ञ" },
      avatar: avatar(3),
      bioYears: 12,
    },
    schedule: {
      en: "Quarterly batches; next: 1-14 July 2026",
      hi: "तिमाही बैच; अगला: 1-14 जुलाई 2026",
    },
    includes: {
      en: [
        "Full residential stay",
        "AI starter kit (gloves, sheaths)",
        "All study materials",
        "Government certification exam fee",
        "Job placement assistance",
      ],
      hi: [
        "पूर्ण आवासीय स्टे",
        "AI स्टार्टर किट (दस्ताने, शीथ)",
        "सभी अध्ययन सामग्री",
        "सरकारी प्रमाणन परीक्षा शुल्क",
        "नौकरी प्लेसमेंट सहायता",
      ],
    },
  },
  {
    slug: "cheese-dairy-products",
    title: {
      en: "Cheese & Dairy Product Making",
      hi: "पनीर और डेयरी उत्पाद निर्माण",
    },
    shortDesc: {
      en: "Make paneer, curd, ghee, butter, mozzarella, and cheddar at home or farm",
      hi: "घर या फार्म पर पनीर, दही, घी, मक्खन, मोज़ेरेला, और चेडर बनाएं",
    },
    longDesc: {
      en: "Value-add your milk! Learn artisan dairy product making with focus on quality, hygiene, and marketing. Take home recipes and starter cultures.",
      hi: "अपने दूध में मूल्य जोड़ें! गुणवत्ता, स्वच्छता और मार्केटिंग पर ध्यान केंद्रित करते हुए कारीगर डेयरी उत्पाद निर्माण सीखें।",
    },
    image: img(4),
    durationDays: 5,
    priceInr: 12999,
    level: "intermediate",
    seatsTotal: 20,
    seatsLeft: 11,
    syllabus: {
      en: [
        "Milk composition & quality testing",
        "Paneer, chenna, khoa production",
        "Curd, lassi, chaas, shrikhand",
        "Ghee and butter making",
        "Fresh cheeses: mozzarella, ricotta",
        "Aged cheeses: cheddar basics",
        "Packaging, labelling, FSSAI compliance",
      ],
      hi: [
        "दूध संरचना और गुणवत्ता परीक्षण",
        "पनीर, छेना, खोआ उत्पादन",
        "दही, लस्सी, छाछ, श्रीखंड",
        "घी और मक्खन बनाना",
        "ताज़ा पनीर: मोज़ेरेला, रिकोटा",
        "पुरानी पनीर: चेडर मूल बातें",
        "पैकेजिंग, लेबलिंग, FSSAI अनुपालन",
      ],
    },
    instructor: {
      name: "Chef Meera Iyer",
      role: { en: "Dairy Technologist", hi: "डेयरी प्रौद्योगिकीविद्" },
      avatar: avatar(4),
      bioYears: 10,
    },
    schedule: {
      en: "Monthly: 1st week, Mon-Fri",
      hi: "मासिक: पहला सप्ताह, सोम-शुक्र",
    },
    includes: {
      en: [
        "All ingredients and equipment use",
        "Recipe book in English/Hindi",
        "Starter cheese cultures to take home",
        "Sample products to taste daily",
        "FSSAI registration guide",
      ],
      hi: [
        "सभी सामग्री और उपकरण उपयोग",
        "अंग्रेजी/हिंदी में रेसिपी पुस्तक",
        "घर ले जाने के लिए स्टार्टर चीज़ कल्चर",
        "रोज़ाना चखने के लिए नमूना उत्पाद",
        "FSSAI पंजीकरण गाइड",
      ],
    },
  },
  {
    slug: "organic-fodder-cultivation",
    title: {
      en: "Organic Fodder Cultivation",
      hi: "जैविक चारा खेती",
    },
    shortDesc: {
      en: "Grow nutrient-rich fodder year-round; reduce feed costs by 40%+",
      hi: "साल भर पोषक-घनी चारा उगाएं; फीड लागत 40%+ कम करें",
    },
    longDesc: {
      en: "Cut your biggest dairy expense — feed. Learn to grow Azolla, hydroponic fodder, multi-cut grasses, and silage. Soil to feed in one course.",
      hi: "अपना सबसे बड़ा डेयरी खर्च कम करें — चारा। एज़ोला, हाइड्रोपोनिक चारा, मल्टी-कट घास, और साइलेज उगाना सीखें।",
    },
    image: img(5),
    durationDays: 4,
    priceInr: 7999,
    level: "beginner",
    seatsTotal: 18,
    seatsLeft: 13,
    syllabus: {
      en: [
        "Soil testing & organic amendments",
        "Azolla cultivation in pits",
        "Hydroponic fodder system setup",
        "Multi-cut grasses: Napier, CO-4, M-4",
        "Berseem, lucerne, oats cultivation",
        "Silage preparation in pits/bags",
        "Year-round fodder calendar",
      ],
      hi: [
        "मिट्टी परीक्षण और जैविक संशोधन",
        "गड्ढों में एज़ोला की खेती",
        "हाइड्रोपोनिक चारा सिस्टम सेटअप",
        "मल्टी-कट घास: नेपियर, CO-4, M-4",
        "बरसीम, लूसर्न, जई की खेती",
        "गड्ढों/बैग में साइलेज तैयारी",
        "साल भर का चारा कैलेंडर",
      ],
    },
    instructor: {
      name: "Dr. Suresh Reddy",
      role: { en: "Agronomist", hi: "कृषि विज्ञानी" },
      avatar: avatar(5),
      bioYears: 15,
    },
    schedule: {
      en: "Every 2nd & 4th week, Thu-Sun",
      hi: "हर दूसरे और चौथे सप्ताह, गुरु-रवि",
    },
    includes: {
      en: [
        "Seeds of 5 fodder species",
        "Azolla starter culture",
        "Hydroponic tray sample",
        "Fodder calendar booklet",
        "Soil testing voucher",
      ],
      hi: [
        "5 चारा प्रजातियों के बीज",
        "एज़ोला स्टार्टर कल्चर",
        "हाइड्रोपोनिक ट्रे नमूना",
        "चारा कैलेंडर पुस्तिका",
        "मिट्टी परीक्षण वाउचर",
      ],
    },
  },
  {
    slug: "farm-business-marketing",
    title: {
      en: "Dairy Business & Marketing",
      hi: "डेयरी व्यवसाय और मार्केटिंग",
    },
    shortDesc: {
      en: "Brand your dairy, sell direct-to-home, scale profitably",
      hi: "अपनी डेयरी को ब्रांड करें, सीधे घर बेचें, लाभकारी रूप से बढ़ाएं",
    },
    longDesc: {
      en: "From farmer to entrepreneur. Build your dairy brand, set up D2C, use WhatsApp marketing, manage subscriptions, and scale to ₹10L+ monthly revenue.",
      hi: "किसान से उद्यमी तक। अपना डेयरी ब्रांड बनाएं, D2C सेट करें, WhatsApp मार्केटिंग का उपयोग करें, सब्सक्रिप्शन प्रबंधित करें, और ₹10L+ मासिक राजस्व तक पहुंचें।",
    },
    image: img(6),
    durationDays: 3,
    priceInr: 9999,
    level: "intermediate",
    seatsTotal: 25,
    seatsLeft: 16,
    syllabus: {
      en: [
        "Brand naming, logo, packaging",
        "FSSAI license and dairy regulations",
        "Pricing strategy: cost-plus vs premium",
        "D2C subscription model setup",
        "WhatsApp Business for orders",
        "Google My Business & local SEO",
        "Building delivery operations",
        "Reading P&L and unit economics",
      ],
      hi: [
        "ब्रांड नामकरण, लोगो, पैकेजिंग",
        "FSSAI लाइसेंस और डेयरी नियम",
        "मूल्य निर्धारण रणनीति: लागत-प्लस बनाम प्रीमियम",
        "D2C सब्सक्रिप्शन मॉडल सेटअप",
        "ऑर्डर के लिए WhatsApp Business",
        "Google My Business और स्थानीय SEO",
        "डिलीवरी संचालन का निर्माण",
        "P&L और यूनिट इकोनॉमिक्स पढ़ना",
      ],
    },
    instructor: {
      name: "Vikram Singh",
      role: { en: "Dairy Entrepreneur", hi: "डेयरी उद्यमी" },
      avatar: avatar(6),
      bioYears: 9,
    },
    schedule: {
      en: "1st weekend of every month",
      hi: "हर महीने का पहला वीकेंड",
    },
    includes: {
      en: [
        "Business plan template",
        "Brand identity workbook",
        "WhatsApp Business setup guide",
        "List of dairy suppliers/vendors",
        "Lifetime alumni community access",
      ],
      hi: [
        "बिज़नेस प्लान टेम्पलेट",
        "ब्रांड पहचान वर्कबुक",
        "WhatsApp Business सेटअप गाइड",
        "डेयरी आपूर्तिकर्ता/विक्रेता सूची",
        "आजीवन पूर्व छात्र समुदाय पहुंच",
      ],
    },
  },
];

export const getTrainingBySlug = (slug: string) =>
  trainings.find((t) => t.slug === slug);
