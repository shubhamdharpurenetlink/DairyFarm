import type { TeamMember, TimelineEvent, Award } from "@/types";

const av = (id: number) => `https://i.pravatar.cc/300?u=team${id}`;

export const team: TeamMember[] = [
  {
    id: "m1",
    name: "Ashok Sharma",
    role: { en: "Owner & Managing Director", hi: "मालिक और प्रबंध निदेशक" },
    avatar: av(1),
  },
  {
    id: "m2",
    name: "Sunita Sharma",
    role: { en: "Quality & Operations Head", hi: "गुणवत्ता और संचालन प्रमुख" },
    avatar: av(2),
  },
  {
    id: "m3",
    name: "Dr. Anil Sharma",
    role: { en: "Senior Veterinarian", hi: "वरिष्ठ पशु चिकित्सक" },
    avatar: av(3),
  },
  {
    id: "m4",
    name: "Ramesh Kumar",
    role: { en: "Farm Operations Lead", hi: "फार्म संचालन प्रमुख" },
    avatar: av(4),
  },
  {
    id: "m5",
    name: "Meena Devi",
    role: { en: "Dairy Products Specialist", hi: "डेयरी उत्पाद विशेषज्ञ" },
    avatar: av(5),
  },
  {
    id: "m6",
    name: "Vikram Singh",
    role: { en: "Marketing & Sales", hi: "मार्केटिंग और बिक्री" },
    avatar: av(6),
  },
];

export const timeline: TimelineEvent[] = [
  {
    year: "1985",
    title: { en: "The Beginning", hi: "शुरुआत" },
    description: {
      en: "Founded by Late Shri Ram Prasad Sharma with just 4 desi cows on family land.",
      hi: "स्वर्गीय श्री राम प्रसाद शर्मा द्वारा परिवारिक भूमि पर मात्र 4 देसी गायों के साथ स्थापित।",
    },
  },
  {
    year: "1998",
    title: { en: "First Expansion", hi: "पहला विस्तार" },
    description: {
      en: "Grew to 25 cows; built first proper cowshed and started direct home delivery in Karnal.",
      hi: "25 गायों तक बढ़े; पहली उचित गौशाला बनाई और करनाल में सीधी होम डिलीवरी शुरू की।",
    },
  },
  {
    year: "2008",
    title: { en: "Modernization", hi: "आधुनिकीकरण" },
    description: {
      en: "Introduced milking machines, cold chain, and quality testing lab. Reached 80 cows.",
      hi: "दूध निकालने की मशीनें, कोल्ड चेन और गुणवत्ता परीक्षण लैब पेश की। 80 गायों तक पहुंचे।",
    },
  },
  {
    year: "2015",
    title: { en: "Going Organic", hi: "जैविक की ओर" },
    description: {
      en: "Transitioned to 100% organic fodder. Set up biogas plant. Started training programs.",
      hi: "100% जैविक चारे में बदलाव। बायोगैस संयंत्र स्थापित। प्रशिक्षण कार्यक्रम शुरू।",
    },
  },
  {
    year: "2020",
    title: { en: "Digital Dairy", hi: "डिजिटल डेयरी" },
    description: {
      en: "Launched WhatsApp subscriptions, online ordering, and reached 1000+ home customers.",
      hi: "WhatsApp सब्सक्रिप्शन, ऑनलाइन ऑर्डरिंग शुरू, और 1000+ घर ग्राहकों तक पहुंचे।",
    },
  },
  {
    year: "2026",
    title: { en: "Today", hi: "आज" },
    description: {
      en: "215 cows across 25 acres, 3500 L milk daily, 1200+ customers, and 6 training programs.",
      hi: "25 एकड़ में 215 गायें, रोज़ाना 3500 लीटर दूध, 1200+ ग्राहक, और 6 प्रशिक्षण कार्यक्रम।",
    },
  },
];

export const awards: Award[] = [
  {
    id: "a1",
    year: "2024",
    title: { en: "Best Dairy Farm - Haryana", hi: "सर्वश्रेष्ठ डेयरी फार्म - हरियाणा" },
    issuer: "Haryana Dairy Board",
    icon: "trophy",
  },
  {
    id: "a2",
    year: "2023",
    title: { en: "Organic Certification", hi: "जैविक प्रमाणन" },
    issuer: "APEDA, Government of India",
    icon: "leaf",
  },
  {
    id: "a3",
    year: "2022",
    title: { en: "FSSAI 5-Star Hygiene Rating", hi: "FSSAI 5-स्टार स्वच्छता रेटिंग" },
    issuer: "FSSAI",
    icon: "shield-check",
  },
  {
    id: "a4",
    year: "2021",
    title: { en: "Innovation in Dairy Farming", hi: "डेयरी फार्मिंग में नवाचार" },
    issuer: "Indian Dairy Association",
    icon: "lightbulb",
  },
];
