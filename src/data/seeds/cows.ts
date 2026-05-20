import type { CowBreed } from "@/types";
import { dummyImageAt } from "@/lib/dummyImage";

const img = (id: number, w = 800, h = 600) =>
  dummyImageAt("cow", id, w, h);

export const cows: CowBreed[] = [
  {
    slug: "gir",
    nameEn: "Gir",
    nameHi: "गिर",
    category: "indigenous",
    origin: "Gujarat, India",
    milkYieldLitresPerDay: { min: 10, max: 18 },
    fatPercent: 4.6,
    image: img(11),
    gallery: [img(11), img(12), img(13)],
    color: "#C9A56A",
    shortDesc: {
      en: "Premium A2 milk producer, gentle nature, drought-resistant.",
      hi: "उत्तम A2 दूध उत्पादक, कोमल स्वभाव, सूखा-सहनशील।",
    },
    description: {
      en: "The Gir is one of the principal Zebu breeds originating in India. Known for its distinct convex forehead and pendulous ears, it produces some of the finest A2 milk known for its medicinal and nutritional properties.",
      hi: "गिर भारत की प्रमुख ज़ेबू नस्लों में से एक है। अपने उत्तल माथे और लटकते कानों के लिए प्रसिद्ध, यह सबसे उत्तम A2 दूध देती है जो अपने औषधीय और पोषण गुणों के लिए जाना जाता है।",
    },
    characteristics: {
      en: [
        "Distinctive convex forehead",
        "Pendulous ears, often folded",
        "Red to spotted white coat",
        "A2 beta-casein milk",
        "Resistant to heat and parasites",
      ],
      hi: [
        "विशिष्ट उत्तल माथा",
        "लटकते कान, अक्सर मुड़े हुए",
        "लाल से चित्तीदार सफेद रंग",
        "A2 बीटा-कैसिइन दूध",
        "गर्मी और परजीवियों के प्रति प्रतिरोधी",
      ],
    },
    history: {
      en: "Originating from the Gir hills and forests of Saurashtra, this breed has been revered in Vedic texts. It has been exported to Brazil where it forms the basis of the famous Gyr dairy industry.",
      hi: "सौराष्ट्र की गिर पहाड़ियों और जंगलों से उत्पन्न, यह नस्ल वैदिक ग्रंथों में पूजनीय रही है। इसे ब्राज़ील में निर्यात किया गया जहाँ यह प्रसिद्ध जिर डेयरी उद्योग का आधार बनी।",
    },
    temperament: {
      en: "Calm, docile, and intelligent. Easy to handle, even for first-time owners.",
      hi: "शांत, विनम्र और बुद्धिमान। नए मालिकों के लिए भी संभालना आसान।",
    },
    suitability: {
      en: "Excellent for hot and dry Indian climate. Thrives across north, west and central India.",
      hi: "गर्म और शुष्क भारतीय जलवायु के लिए उत्कृष्ट। उत्तर, पश्चिम और मध्य भारत में फलती-फूलती है।",
    },
  },
  {
    slug: "sahiwal",
    nameEn: "Sahiwal",
    nameHi: "साहीवाल",
    category: "indigenous",
    origin: "Punjab, India",
    milkYieldLitresPerDay: { min: 12, max: 20 },
    fatPercent: 4.5,
    image: img(21),
    gallery: [img(21), img(22), img(23)],
    color: "#A0522D",
    shortDesc: {
      en: "Top indigenous dairy breed, heat-tolerant, high milk yield.",
      hi: "शीर्ष देसी डेयरी नस्ल, गर्मी-सहनशील, उच्च दूध उत्पादन।",
    },
    description: {
      en: "Sahiwal is considered the best indigenous dairy breed of India and Pakistan. Its reddish-brown coat and loose skin help it adapt to extreme temperatures while delivering consistently rich milk.",
      hi: "साहीवाल भारत और पाकिस्तान की सबसे अच्छी देसी डेयरी नस्ल मानी जाती है। इसका लाल-भूरा रंग और ढीली त्वचा अत्यधिक तापमान में अनुकूल बनाती है।",
    },
    characteristics: {
      en: [
        "Reddish-dun to pale red coat",
        "Loose, hanging skin",
        "Strong and well-developed udder",
        "High butter fat content",
        "Excellent disease resistance",
      ],
      hi: [
        "लाल-भूरा से हल्का लाल रंग",
        "ढीली, लटकती त्वचा",
        "मजबूत और विकसित थन",
        "उच्च मक्खन वसा सामग्री",
        "उत्कृष्ट रोग प्रतिरोधक क्षमता",
      ],
    },
    history: {
      en: "Originally from the Montgomery (now Sahiwal) district of Punjab. This breed has been instrumental in developing many crossbred dairy cattle across Asia and Africa.",
      hi: "मूल रूप से पंजाब के मॉन्टगोमरी (अब साहीवाल) जिले से। यह नस्ल एशिया और अफ्रीका में कई संकर डेयरी मवेशियों के विकास में सहायक रही है।",
    },
    temperament: {
      en: "Quiet, docile, and friendly. Excellent mothering instincts.",
      hi: "शांत, विनम्र और मित्रवत। उत्कृष्ट मातृ प्रवृत्ति।",
    },
    suitability: {
      en: "Adapts well to tropical and subtropical climates across India.",
      hi: "भारत भर में उष्णकटिबंधीय और उपोष्णकटिबंधीय जलवायु के साथ अच्छी तरह से अनुकूलित।",
    },
  },
  {
    slug: "tharparkar",
    nameEn: "Tharparkar",
    nameHi: "थारपारकर",
    category: "indigenous",
    origin: "Rajasthan, India",
    milkYieldLitresPerDay: { min: 8, max: 15 },
    fatPercent: 4.9,
    image: img(31),
    gallery: [img(31), img(32), img(33)],
    color: "#E8E8E3",
    shortDesc: {
      en: "Desert breed, dual-purpose, exceptional fat content.",
      hi: "रेगिस्तानी नस्ल, दोहरे उद्देश्य की, असाधारण वसा सामग्री।",
    },
    description: {
      en: "From the Thar desert, this white to grey breed is known for its endurance and ability to produce quality milk even in harsh, dry conditions with sparse fodder.",
      hi: "थार रेगिस्तान से, यह सफेद से भूरी नस्ल अपनी सहनशक्ति और कठोर, सूखी परिस्थितियों में भी गुणवत्तापूर्ण दूध उत्पादन करने की क्षमता के लिए जानी जाती है।",
    },
    characteristics: {
      en: [
        "White to light grey coat",
        "Lyre-shaped horns",
        "Compact, sturdy build",
        "Long, deep udder",
        "Extremely drought-resistant",
      ],
      hi: [
        "सफेद से हल्का भूरा रंग",
        "वीणा के आकार के सींग",
        "कॉम्पैक्ट, मजबूत निर्माण",
        "लंबा, गहरा थन",
        "अत्यंत सूखा-प्रतिरोधी",
      ],
    },
    history: {
      en: "Named after the Tharparkar district of Sindh (now Pakistan) and Rajasthan, this breed has sustained farming communities across the Thar desert for centuries.",
      hi: "सिंध (अब पाकिस्तान) और राजस्थान के थारपारकर जिले के नाम पर रखा गया, यह नस्ल सदियों से थार रेगिस्तान में खेती समुदायों का सहारा रही है।",
    },
    temperament: {
      en: "Hardy, alert, and active. Adapts well to free grazing systems.",
      hi: "कठोर, सतर्क और सक्रिय। मुक्त चराई प्रणालियों के लिए अच्छी तरह से अनुकूलित।",
    },
    suitability: {
      en: "Ideal for arid and semi-arid regions. Survives on minimal feed.",
      hi: "शुष्क और अर्ध-शुष्क क्षेत्रों के लिए आदर्श। न्यूनतम चारे पर जीवित रहती है।",
    },
  },
  {
    slug: "red-sindhi",
    nameEn: "Red Sindhi",
    nameHi: "रेड सिंधी",
    category: "indigenous",
    origin: "Sindh region",
    milkYieldLitresPerDay: { min: 10, max: 16 },
    fatPercent: 4.7,
    image: img(41),
    gallery: [img(41), img(42), img(43)],
    color: "#B22222",
    shortDesc: {
      en: "Heat tolerant red coat, excellent for tropical regions.",
      hi: "गर्मी सहनशील लाल रंग, उष्णकटिबंधीय क्षेत्रों के लिए उत्कृष्ट।",
    },
    description: {
      en: "A medium-sized red breed known for its docility and consistent milk production. Widely used in cross-breeding programs across South Asia.",
      hi: "मध्यम आकार की लाल नस्ल जो अपनी विनम्रता और निरंतर दूध उत्पादन के लिए जानी जाती है। दक्षिण एशिया भर में क्रॉस-ब्रीडिंग कार्यक्रमों में व्यापक रूप से उपयोग की जाती है।",
    },
    characteristics: {
      en: [
        "Deep red to dark red coat",
        "Compact and well-proportioned",
        "Wide forehead, short horns",
        "Good udder development",
        "Excellent for tropical climate",
      ],
      hi: [
        "गहरा लाल से गहरा लाल रंग",
        "कॉम्पैक्ट और सुडौल",
        "चौड़ा माथा, छोटे सींग",
        "अच्छा थन विकास",
        "उष्णकटिबंधीय जलवायु के लिए उत्कृष्ट",
      ],
    },
    history: {
      en: "Originating from the Sindh province, this breed has spread across India, Pakistan, and Bangladesh as a reliable smallholder dairy animal.",
      hi: "सिंध प्रांत से उत्पन्न, यह नस्ल भारत, पाकिस्तान और बांग्लादेश में एक विश्वसनीय छोटे किसान डेयरी पशु के रूप में फैली है।",
    },
    temperament: {
      en: "Very docile and easy to milk. Suitable for small family farms.",
      hi: "बहुत विनम्र और दूध निकालने में आसान। छोटे पारिवारिक खेतों के लिए उपयुक्त।",
    },
    suitability: {
      en: "Performs well across all tropical Indian states.",
      hi: "सभी उष्णकटिबंधीय भारतीय राज्यों में अच्छा प्रदर्शन करती है।",
    },
  },
  {
    slug: "rathi",
    nameEn: "Rathi",
    nameHi: "राठी",
    category: "indigenous",
    origin: "Rajasthan, India",
    milkYieldLitresPerDay: { min: 6, max: 12 },
    fatPercent: 4.3,
    image: img(51),
    gallery: [img(51), img(52), img(53)],
    color: "#8B4513",
    shortDesc: {
      en: "Dual-purpose breed, brown and white patches, hardy.",
      hi: "दोहरे उद्देश्य की नस्ल, भूरे और सफेद धब्बे, कठोर।",
    },
    description: {
      en: "Rathi is a dual-purpose cattle breed used for milk and draught work. The breed gets its name from the Rath community of Rajasthan.",
      hi: "राठी एक दोहरे उद्देश्य की मवेशी नस्ल है जो दूध और ढोने के काम के लिए उपयोग की जाती है। नस्ल को राजस्थान के राठ समुदाय से नाम मिला है।",
    },
    characteristics: {
      en: [
        "Brown with white patches",
        "Medium build, well-developed dewlap",
        "Curved horns",
        "Excellent draft capability",
        "Moderate milk yield",
      ],
      hi: [
        "सफेद धब्बों के साथ भूरा",
        "मध्यम निर्माण, अच्छी तरह से विकसित गलकंबल",
        "घुमावदार सींग",
        "उत्कृष्ट ढुलाई क्षमता",
        "मध्यम दूध उत्पादन",
      ],
    },
    history: {
      en: "Native to the Bikaner, Ganganagar and Hanumangarh districts of Rajasthan. Developed by the Rath nomadic community over centuries.",
      hi: "राजस्थान के बीकानेर, गंगानगर और हनुमानगढ़ जिलों की मूल निवासी। राठ खानाबदोश समुदाय द्वारा सदियों से विकसित।",
    },
    temperament: {
      en: "Active, alert, and well-tempered. Easy to train for farm work.",
      hi: "सक्रिय, सतर्क और स्वभावपूर्ण। खेती के काम के लिए प्रशिक्षित करना आसान।",
    },
    suitability: {
      en: "Best for dry plains and semi-desert regions of north-west India.",
      hi: "उत्तर-पश्चिम भारत के शुष्क मैदानों और अर्ध-रेगिस्तानी क्षेत्रों के लिए सर्वोत्तम।",
    },
  },
  {
    slug: "holstein-friesian",
    nameEn: "Holstein Friesian",
    nameHi: "होल्स्टीन फ्रीजियन",
    category: "exotic",
    origin: "Netherlands",
    milkYieldLitresPerDay: { min: 25, max: 40 },
    fatPercent: 3.5,
    image: img(61),
    gallery: [img(61), img(62), img(63)],
    color: "#000000",
    shortDesc: {
      en: "World's highest milk producer, black and white coat.",
      hi: "दुनिया की सबसे ज्यादा दूध देने वाली, काला और सफेद रंग।",
    },
    description: {
      en: "Known globally as the highest milk-producing dairy breed, Holstein Friesians require careful management and high-quality feed but reward farmers with exceptional yields.",
      hi: "वैश्विक स्तर पर सबसे ज्यादा दूध देने वाली डेयरी नस्ल के रूप में जानी जाती है, होल्स्टीन फ्रीजियन को सावधानीपूर्वक प्रबंधन और उच्च गुणवत्ता वाले चारे की आवश्यकता होती है।",
    },
    characteristics: {
      en: [
        "Iconic black and white pattern",
        "Large body frame",
        "Massive udder capacity",
        "High milk volume, lower fat",
        "Requires good nutrition",
      ],
      hi: [
        "प्रतिष्ठित काला और सफेद पैटर्न",
        "बड़ा शरीर",
        "विशाल थन क्षमता",
        "उच्च दूध मात्रा, कम वसा",
        "अच्छे पोषण की आवश्यकता",
      ],
    },
    history: {
      en: "Bred in the Friesland region of the Netherlands over 2,000 years ago, today HF cattle are the most numerous dairy breed in the world.",
      hi: "नीदरलैंड के फ्रीसलैंड क्षेत्र में 2,000 साल पहले पाली गई, आज HF मवेशी दुनिया में सबसे अधिक संख्या वाली डेयरी नस्ल हैं।",
    },
    temperament: {
      en: "Generally calm but can be more sensitive than indigenous breeds.",
      hi: "आम तौर पर शांत लेकिन देसी नस्लों की तुलना में अधिक संवेदनशील हो सकती हैं।",
    },
    suitability: {
      en: "Best in cooler climates with cooling/sheds in Indian summers.",
      hi: "ठंडी जलवायु में सर्वोत्तम; भारतीय गर्मियों में शीतलन/शेड के साथ।",
    },
  },
  {
    slug: "jersey",
    nameEn: "Jersey",
    nameHi: "जर्सी",
    category: "exotic",
    origin: "Jersey, Channel Islands",
    milkYieldLitresPerDay: { min: 15, max: 25 },
    fatPercent: 5.2,
    image: img(71),
    gallery: [img(71), img(72), img(73)],
    color: "#D2691E",
    shortDesc: {
      en: "Compact size, highest butterfat, golden milk.",
      hi: "कॉम्पैक्ट आकार, सबसे ज्यादा मक्खन वसा, सुनहरा दूध।",
    },
    description: {
      en: "Jersey cows are smaller in size but produce milk extremely rich in butterfat and protein — often called golden milk for its creamy color and richness.",
      hi: "जर्सी गायें आकार में छोटी होती हैं लेकिन मक्खन वसा और प्रोटीन से अत्यंत समृद्ध दूध देती हैं — अक्सर इसकी क्रीमी रंग और समृद्धि के कारण सुनहरा दूध कहा जाता है।",
    },
    characteristics: {
      en: [
        "Light brown to fawn coat",
        "Compact, refined frame",
        "High butterfat (5%+)",
        "Excellent feed conversion",
        "Early maturity",
      ],
      hi: [
        "हल्का भूरा से बादामी रंग",
        "कॉम्पैक्ट, परिष्कृत ढांचा",
        "उच्च मक्खन वसा (5%+)",
        "उत्कृष्ट चारा रूपांतरण",
        "जल्दी परिपक्वता",
      ],
    },
    history: {
      en: "From the small island of Jersey, this breed was kept pure for centuries by strict import laws. Now found across the world for premium dairy.",
      hi: "जर्सी के छोटे द्वीप से, इस नस्ल को सदियों से सख्त आयात कानूनों द्वारा शुद्ध रखा गया। अब प्रीमियम डेयरी के लिए दुनिया भर में पाई जाती है।",
    },
    temperament: {
      en: "Friendly, curious, but can be temperamental during heat.",
      hi: "मित्रवत, उत्सुक, लेकिन गर्मी के दौरान स्वभाव में बदलाव हो सकता है।",
    },
    suitability: {
      en: "Better suited to cooler regions; needs shade and water in Indian summers.",
      hi: "ठंडे क्षेत्रों के लिए अधिक उपयुक्त; भारतीय गर्मियों में छाया और पानी की आवश्यकता।",
    },
  },
  {
    slug: "hf-cross",
    nameEn: "HF Cross",
    nameHi: "एचएफ क्रॉस",
    category: "crossbreed",
    origin: "India (crossbred)",
    milkYieldLitresPerDay: { min: 18, max: 28 },
    fatPercent: 4.0,
    image: img(81),
    gallery: [img(81), img(82), img(83)],
    color: "#2F4F4F",
    shortDesc: {
      en: "Best of both worlds — high yield with Indian heat tolerance.",
      hi: "दोनों दुनियाओं का सर्वश्रेष्ठ — उच्च उत्पादन के साथ भारतीय गर्मी सहनशीलता।",
    },
    description: {
      en: "Crossing Holstein Friesian with Sahiwal or Gir gives a hardy yet high-yielding cow well-suited to Indian dairy farms.",
      hi: "होल्स्टीन फ्रीजियन को साहीवाल या गिर के साथ क्रॉस करने से कठोर और उच्च उत्पादन वाली गाय मिलती है जो भारतीय डेयरी फार्मों के लिए उपयुक्त है।",
    },
    characteristics: {
      en: [
        "Variable patterns (black, brown, white)",
        "Medium to large frame",
        "Higher yield than indigenous",
        "Better heat tolerance than pure HF",
        "Moderate fat content",
      ],
      hi: [
        "विविध पैटर्न (काला, भूरा, सफेद)",
        "मध्यम से बड़ा ढांचा",
        "देसी से अधिक उत्पादन",
        "शुद्ध HF से बेहतर गर्मी सहनशीलता",
        "मध्यम वसा सामग्री",
      ],
    },
    history: {
      en: "Developed in India in the 1960s and 70s through cooperative dairy programs to boost milk production while keeping local adaptability.",
      hi: "स्थानीय अनुकूलनशीलता बनाए रखते हुए दूध उत्पादन बढ़ाने के लिए सहकारी डेयरी कार्यक्रमों के माध्यम से 1960 और 70 के दशक में भारत में विकसित।",
    },
    temperament: {
      en: "Generally calm and manageable; benefits from regular handling.",
      hi: "आम तौर पर शांत और संभालने योग्य; नियमित संभाल से लाभ।",
    },
    suitability: {
      en: "Suitable across most Indian climates with basic shelter and good feed.",
      hi: "बुनियादी आश्रय और अच्छे चारे के साथ अधिकांश भारतीय जलवायु में उपयुक्त।",
    },
  },
];

export const getCowBySlug = (slug: string) =>
  cows.find((c) => c.slug === slug);
