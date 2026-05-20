import type { Facility } from "@/types";

const img = (id: number) => `https://picsum.photos/seed/fac${id}/800/600`;

export const facilities: Facility[] = [
  {
    id: "cowshed",
    name: { en: "Modern Cowsheds", hi: "आधुनिक गौशालाएं" },
    description: {
      en: "Spacious, well-ventilated cowsheds with rubber matting, automatic water troughs, and individual feeding stations.",
      hi: "विशाल, हवादार गौशालाएं रबर मैटिंग, स्वचालित पानी की गर्त, और व्यक्तिगत भोजन स्टेशनों के साथ।",
    },
    image: img(1),
    icon: "home",
  },
  {
    id: "milking-parlour",
    name: { en: "Milking Parlour", hi: "दूध निकालने का पार्लर" },
    description: {
      en: "Modern milking parlour with twice-daily hygienic milking, instant chilling to 4°C, and quality testing on every batch.",
      hi: "आधुनिक मिल्किंग पार्लर - दिन में दो बार स्वच्छ दूध निकालना, 4°C तक तुरंत ठंडा करना, और हर बैच पर गुणवत्ता परीक्षण।",
    },
    image: img(2),
    icon: "droplets",
  },
  {
    id: "fodder-farm",
    name: { en: "Organic Fodder Farm", hi: "जैविक चारा फार्म" },
    description: {
      en: "15 acres of organic fodder cultivation including Napier grass, lucerne, berseem, and seasonal greens. Zero chemicals.",
      hi: "नेपियर घास, ल्यूसर्न, बरसीम, और मौसमी हरियाली सहित 15 एकड़ जैविक चारा खेती। शून्य रसायन।",
    },
    image: img(3),
    icon: "sprout",
  },
  {
    id: "vet-unit",
    name: { en: "Veterinary Unit", hi: "पशु चिकित्सा इकाई" },
    description: {
      en: "In-house veterinary clinic with on-call vet, diagnostic equipment, isolation pens, and routine health checks.",
      hi: "ऑन-कॉल पशु चिकित्सक, नैदानिक उपकरण, अलगाव बाड़े, और नियमित स्वास्थ्य जांच के साथ इन-हाउस पशु चिकित्सा क्लिनिक।",
    },
    image: img(4),
    icon: "stethoscope",
  },
  {
    id: "biogas",
    name: { en: "Biogas & Composting", hi: "बायोगैस और कम्पोस्टिंग" },
    description: {
      en: "100% of cow dung converted to biogas for cooking and to compost for our fields. Sustainable zero-waste farm.",
      hi: "गोबर का 100% बायोगैस में रूपांतरण - खाना पकाने और हमारे खेतों के लिए खाद। टिकाऊ शून्य-अपशिष्ट फार्म।",
    },
    image: img(5),
    icon: "leaf",
  },
  {
    id: "calf-nursery",
    name: { en: "Calf Nursery", hi: "बछड़ा नर्सरी" },
    description: {
      en: "Dedicated calf-rearing facility with individual pens, climate control, and pasteurized milk feeding for healthy growth.",
      hi: "स्वस्थ विकास के लिए व्यक्तिगत बाड़े, जलवायु नियंत्रण, और पाश्चुरीकृत दूध पिलाने के साथ समर्पित बछड़ा-पालन सुविधा।",
    },
    image: img(6),
    icon: "baby",
  },
];
