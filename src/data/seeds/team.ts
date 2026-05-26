import type { TeamMember, TimelineEvent, Award } from "@/types";

const av = (id: number) => `https://i.pravatar.cc/300?u=team${id}`;

export const team: TeamMember[] = [
  {
    id: "m1",
    name: "Shubham Dharpure",
    role: { en: "Founder & Managing Director", hi: "संस्थापक और प्रबंध निदेशक" },
    avatar: av(11),
  },
  {
    id: "m2",
    name: "Lakshmi Dharpure",
    role: { en: "Co-Founder & Quality Head", hi: "सह-संस्थापक और गुणवत्ता प्रमुख" },
    avatar: av(12),
  },
  {
    id: "m3",
    name: "Dr. Anil Sharma",
    role: { en: "Senior Resident Veterinarian", hi: "वरिष्ठ रहवासी पशुचिकित्सक" },
    avatar: av(13),
  },
  {
    id: "m4",
    name: "Ramesh Pawar",
    role: { en: "Farm Operations Lead (Pandhurna)", hi: "फार्म संचालन प्रमुख (पांढुर्णा)" },
    avatar: av(14),
  },
  {
    id: "m5",
    name: "Meena Devi Yadav",
    role: { en: "Dairy Products & Bilona Specialist", hi: "डेयरी उत्पाद और बिलोना विशेषज्ञ" },
    avatar: av(15),
  },
  {
    id: "m6",
    name: "Dr. Rashmi Tiwari",
    role: { en: "Reproduction Specialist (BAIF)", hi: "प्रजनन विशेषज्ञ (BAIF)" },
    avatar: av(16),
  },
  {
    id: "m7",
    name: "Sanjay Bhongade",
    role: { en: "Fodder & Silage Specialist", hi: "चारा और साइलेज विशेषज्ञ" },
    avatar: av(17),
  },
  {
    id: "m8",
    name: "Vikram Yadav",
    role: { en: "Business & Subscriptions Head", hi: "व्यवसाय और सब्सक्रिप्शन प्रमुख" },
    avatar: av(18),
  },
  {
    id: "m9",
    name: "Pravin Kale",
    role: { en: "Solar & Mechanisation Engineer", hi: "सोलर और यांत्रिकीकरण इंजीनियर" },
    avatar: av(19),
  },
];

export const timeline: TimelineEvent[] = [
  {
    id: "t1",
    year: "1985",
    title: { en: "The Beginning — Jamlapani Village", hi: "शुरुआत — जामलापानी गाँव" },
    description: {
      en: "Late Shri Ramprasad Dharpure starts the family dairy with 4 indigenous cows on 2 acres of ancestral farmland in Jamlapani, Sausar tehsil.",
      hi: "स्वर्गीय श्री रामप्रसाद धरपुरे ने सौंसर तहसील के जामलापानी में पुश्तैनी 2 एकड़ भूमि पर 4 देसी गायों से पारिवारिक डेयरी की शुरुआत की।",
    },
  },
  {
    id: "t2",
    year: "1992",
    title: { en: "Joining the White Revolution", hi: "श्वेत क्रांति में शामिल" },
    description: {
      en: "Joined the Madhya Pradesh Dugdh Sangh (Sanchi) milk-collection route. Daily collection grows to 60 litres.",
      hi: "मध्य प्रदेश दुग्ध संघ (सांची) के दुग्ध-संग्रह मार्ग में शामिल। रोज़ाना संग्रह 60 लीटर तक पहुँचा।",
    },
  },
  {
    id: "t3",
    year: "2003",
    title: { en: "First Cowshed & Sahiwal Herd", hi: "पहली गौशाला और साहीवाल झुंड" },
    description: {
      en: "Built the first proper open-shed for 25 cows and brought in a foundation Sahiwal herd from Punjab Agricultural University.",
      hi: "25 गायों के लिए पहली उचित खुली गौशाला बनाई और पंजाब कृषि विश्वविद्यालय से साहीवाल नींव झुंड लाया गया।",
    },
  },
  {
    id: "t4",
    year: "2012",
    title: { en: "Modernisation & Quality Lab", hi: "आधुनिकीकरण और गुणवत्ता प्रयोगशाला" },
    description: {
      en: "Installed milking machines, bulk milk cooler (500 L), and an on-farm quality testing lab. Herd size touches 80.",
      hi: "दुग्ध-निकालन मशीनें, बल्क मिल्क कूलर (500 लीटर) और ऑन-फार्म गुणवत्ता प्रयोगशाला स्थापित। झुंड 80 तक पहुँचा।",
    },
  },
  {
    id: "t5",
    year: "2017",
    title: { en: "Bilona Ghee & D2C Brand", hi: "बिलोना घी और D2C ब्रांड" },
    description: {
      en: "Launched 'Laxmi Dairy' brand with A2 Gir milk and traditional bilona ghee. First direct-to-home delivery routes in Pandhurna and Sausar.",
      hi: "A2 गिर दूध और पारंपरिक बिलोना घी के साथ 'लक्ष्मी डेयरी' ब्रांड लॉन्च। पांढुर्णा और सौंसर में पहले सीधे-घर डिलीवरी मार्ग।",
    },
  },
  {
    id: "t6",
    year: "2019",
    title: { en: "Going Organic & Biogas", hi: "जैविक की ओर और बायोगैस" },
    description: {
      en: "Transitioned 25 acres to 100% organic fodder; set up a 25 m³ biogas plant powering the dairy kitchen.",
      hi: "25 एकड़ को 100% जैविक चारे में बदला; डेयरी रसोई को चलाने के लिए 25 m³ का बायोगैस संयंत्र स्थापित।",
    },
  },
  {
    id: "t7",
    year: "2021",
    title: { en: "Training Academy Begins", hi: "प्रशिक्षण अकादमी की शुरुआत" },
    description: {
      en: "Started 3-day weekend training camps for first-time dairy entrepreneurs across MP, Maharashtra and Chhattisgarh. 240 farmers trained in year one.",
      hi: "MP, महाराष्ट्र और छत्तीसगढ़ के नवसिखिये डेयरी उद्यमियों के लिए 3-दिवसीय वीकेंड प्रशिक्षण शिविर शुरू। पहले साल में 240 किसान प्रशिक्षित।",
    },
  },
  {
    id: "t8",
    year: "2023",
    title: { en: "Solar-Hybrid Dairy", hi: "सोलर-हाइब्रिड डेयरी" },
    description: {
      en: "Commissioned a 5 kWp rooftop solar plant under PM-KUSUM. Electricity cost dropped by 70%. Recognised by NABARD as a model farm.",
      hi: "PM-KUSUM के तहत 5 kWp छत सोलर संयंत्र चालू। बिजली लागत 70% गिरी। NABARD द्वारा मॉडल फार्म के रूप में मान्यता।",
    },
  },
  {
    id: "t9",
    year: "2025",
    title: { en: "Digital Subscriptions & PWA", hi: "डिजिटल सब्सक्रिप्शन और PWA" },
    description: {
      en: "Launched a bilingual PWA storefront with subscription billing, 1,200+ home customers, monthly milk subscription model live.",
      hi: "सब्सक्रिप्शन बिलिंग के साथ द्विभाषी PWA स्टोरफ्रंट लॉन्च, 1,200+ घर ग्राहक, मासिक दूध सब्सक्रिप्शन मॉडल चालू।",
    },
  },
  {
    id: "t10",
    year: "2026",
    title: { en: "Today", hi: "आज" },
    description: {
      en: "215 cows across 25 acres in Jamlapani, 3,500 L milk daily, 1,500+ regular customers, 10 training programmes, and a 35-member team.",
      hi: "जामलापानी में 25 एकड़ पर 215 गायें, रोज़ाना 3,500 लीटर दूध, 1,500+ नियमित ग्राहक, 10 प्रशिक्षण कार्यक्रम, और 35-सदस्यीय टीम।",
    },
  },
];

export const awards: Award[] = [
  {
    id: "a1",
    year: "2025",
    title: { en: "Model Dairy Farm — Madhya Pradesh", hi: "मॉडल डेयरी फार्म — मध्य प्रदेश" },
    issuer: "MP Rajya Pashupalan Vibhag",
    icon: "trophy",
  },
  {
    id: "a2",
    year: "2024",
    title: { en: "Best A2 Milk Producer — Central India", hi: "सर्वश्रेष्ठ A2 दूध उत्पादक — मध्य भारत" },
    issuer: "Indian Dairy Association (Central Zone)",
    icon: "milk",
  },
  {
    id: "a3",
    year: "2023",
    title: { en: "Solar-Hybrid Recognition", hi: "सोलर-हाइब्रिड मान्यता" },
    issuer: "NABARD — Model Farm Programme",
    icon: "sun",
  },
  {
    id: "a4",
    year: "2023",
    title: { en: "Organic Certification (NPOP)", hi: "जैविक प्रमाणन (NPOP)" },
    issuer: "APEDA, Government of India",
    icon: "leaf",
  },
  {
    id: "a5",
    year: "2022",
    title: { en: "FSSAI 5-Star Hygiene Rating", hi: "FSSAI 5-स्टार स्वच्छता रेटिंग" },
    issuer: "Food Safety & Standards Authority of India",
    icon: "shield-check",
  },
  {
    id: "a6",
    year: "2022",
    title: { en: "Krishi Karman Puraskar — Dairy Category", hi: "कृषि कर्मण पुरस्कार — डेयरी श्रेणी" },
    issuer: "MP Government, Krishi Vibhag",
    icon: "award",
  },
  {
    id: "a7",
    year: "2021",
    title: { en: "Best Training Centre — Dairy", hi: "सर्वश्रेष्ठ प्रशिक्षण केंद्र — डेयरी" },
    issuer: "Mahatma Gandhi Gramin Vikas Mahavidyalaya",
    icon: "graduation-cap",
  },
  {
    id: "a8",
    year: "2020",
    title: { en: "Innovation in Rural Dairy", hi: "ग्रामीण डेयरी में नवाचार" },
    issuer: "Madhya Pradesh Council of Science & Technology",
    icon: "lightbulb",
  },
];
