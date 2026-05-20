import type { Product } from "@/types";
import { dummyImageAt } from "@/lib/dummyImage";
import type { DummyImageCategory } from "@/lib/dummyImage";

const CATEGORY_TO_POOL: Record<Product["category"], DummyImageCategory> = {
  milk: "milk",
  ghee: "ghee",
  curd: "curd",
  paneer: "paneer",
  butter: "butter",
  mava: "mava",
  sweets: "sweets",
  other: "milk",
};

const img = (
  category: Product["category"],
  index: number,
  w = 800,
  h = 800,
) => dummyImageAt(CATEGORY_TO_POOL[category], index, w, h);

const now = "2026-05-19T00:00:00.000Z";

export const products: Product[] = [
  // ─────────────────────────── MILK ───────────────────────────
  {
    slug: "a2-gir-milk-fresh",
    name: { en: "A2 Gir Cow Milk — Fresh", hi: "A2 गिर गाय का ताज़ा दूध" },
    shortDesc: {
      en: "Pure A2 milk from indigenous Gir cows, delivered fresh by 7 AM.",
      hi: "देसी गिर गायों का शुद्ध A2 दूध, सुबह 7 बजे तक ताज़ा डिलीवर।",
    },
    description: {
      en: "Our flagship A2 milk comes from our own herd of free-grazing Gir cows. Pasteurised gently, never homogenised, naturally rich in A2 beta-casein protein that is easier to digest than regular A1 milk. Perfect for children, elders and growing kids.",
      hi: "हमारा प्रमुख A2 दूध हमारी अपनी गिर गायों के झुंड से आता है जो खुले में चरती हैं। हल्का पाश्चुराइज़, बिना होमोजेनाइज़ किया हुआ, A2 बीटा-कैसिइन प्रोटीन से भरपूर जो सामान्य A1 दूध की तुलना में पचाने में आसान है।",
    },
    category: "milk",
    primaryImage: img("milk", 0),
    images: [img("milk", 0), img("milk", 1), img("milk", 2)],
    variants: [
      { id: "v1", label: { en: "500 ml Pouch", hi: "500 मिली पैक" }, unit: "ml", size: 500, priceInr: 45, mrpInr: 50, stockQty: 120, sku: "MILK-GIR-500" },
      { id: "v2", label: { en: "1 L Bottle", hi: "1 लीटर बोतल" }, unit: "L", size: 1, priceInr: 85, mrpInr: 95, stockQty: 80, sku: "MILK-GIR-1L" },
      { id: "v3", label: { en: "2 L Combo", hi: "2 लीटर कॉम्बो" }, unit: "L", size: 2, priceInr: 160, mrpInr: 190, stockQty: 40, sku: "MILK-GIR-2L" },
    ],
    tags: ["bestseller", "a2", "fresh", "daily"],
    isFeatured: true,
    isAvailable: true,
    badges: [
      { en: "100% A2", hi: "100% A2" },
      { en: "Bestseller", hi: "सर्वाधिक बिकने वाला" },
    ],
    ingredients: {
      en: "Pure pasteurised A2 cow milk. No additives or preservatives.",
      hi: "शुद्ध पाश्चुराइज़ A2 गाय का दूध। कोई एडिटिव या प्रिज़र्वेटिव नहीं।",
    },
    shelfLifeDays: 2,
    storageInstructions: {
      en: "Store refrigerated at 4°C. Consume within 48 hours of delivery.",
      hi: "4°C पर फ्रिज में रखें। डिलीवरी के 48 घंटे के अंदर उपयोग करें।",
    },
    nutrition: { energyKcal: 67, proteinG: 3.4, fatG: 4.1, carbsG: 4.8 },
    rating: 4.8,
    ratingCount: 312,
    publishedAt: now,
    updatedAt: now,
  },
  {
    slug: "sahiwal-milk-toned",
    name: { en: "Sahiwal Toned Milk", hi: "साहीवाल टोन्ड दूध" },
    shortDesc: {
      en: "Lighter on fat, full on Sahiwal goodness. Ideal for everyday tea & coffee.",
      hi: "कम वसा, साहीवाल की पूरी अच्छाई। रोज़ाना चाय-कॉफी के लिए।",
    },
    description: {
      en: "Lightly toned milk from our Sahiwal herd. Slightly lower fat (~3%) makes it perfect for daily tea, coffee and cereal without compromising on taste or nutrition.",
      hi: "हमारी साहीवाल गायों से हल्का टोन्ड दूध। कम वसा (~3%) रोज़ाना की चाय, कॉफी और अनाज के लिए परफेक्ट।",
    },
    category: "milk",
    primaryImage: img("milk", 1),
    images: [img("milk", 1), img("milk", 2)],
    variants: [
      { id: "v1", label: { en: "500 ml Pouch", hi: "500 मिली पैक" }, unit: "ml", size: 500, priceInr: 35, stockQty: 90, sku: "MILK-SHW-500" },
      { id: "v2", label: { en: "1 L Pouch", hi: "1 लीटर पैक" }, unit: "L", size: 1, priceInr: 65, stockQty: 60, sku: "MILK-SHW-1L" },
    ],
    tags: ["daily", "toned"],
    isFeatured: false,
    isAvailable: true,
    badges: [{ en: "Low Fat", hi: "कम वसा" }],
    shelfLifeDays: 2,
    nutrition: { energyKcal: 58, proteinG: 3.2, fatG: 3.0, carbsG: 4.7 },
    rating: 4.5,
    ratingCount: 128,
    publishedAt: now,
    updatedAt: now,
  },

  // ─────────────────────────── GHEE ───────────────────────────
  {
    slug: "a2-bilona-ghee",
    name: { en: "A2 Bilona Ghee", hi: "A2 बिलोना घी" },
    shortDesc: {
      en: "Traditional bilona-churned A2 cow ghee. Pure aroma, ancient method.",
      hi: "पारंपरिक बिलोना विधि से बना A2 गाय का घी। शुद्ध सुगंध, प्राचीन विधि।",
    },
    description: {
      en: "Made the ancient Vedic way — A2 milk is curdled, hand-churned to extract makhan, then slow-cooked into golden ghee. Granular texture, divine aroma, naturally lactose-free.",
      hi: "प्राचीन वैदिक विधि से बना — A2 दूध को जमाकर, हाथ से मथकर मक्खन निकाला जाता है, फिर धीमी आँच पर सुनहरे घी में तब्दील किया जाता है। दानेदार बनावट, दिव्य सुगंध, प्राकृतिक रूप से लैक्टोज-मुक्त।",
    },
    category: "ghee",
    primaryImage: img("ghee", 0),
    images: [img("ghee", 0), img("ghee", 1), img("ghee", 2)],
    variants: [
      { id: "v1", label: { en: "250 ml Jar", hi: "250 मिली जार" }, unit: "ml", size: 250, priceInr: 599, mrpInr: 700, stockQty: 45, sku: "GHEE-BIL-250" },
      { id: "v2", label: { en: "500 ml Jar", hi: "500 मिली जार" }, unit: "ml", size: 500, priceInr: 1099, mrpInr: 1300, stockQty: 30, sku: "GHEE-BIL-500" },
      { id: "v3", label: { en: "1 L Tin", hi: "1 लीटर टिन" }, unit: "L", size: 1, priceInr: 2099, mrpInr: 2500, stockQty: 18, sku: "GHEE-BIL-1L" },
    ],
    tags: ["premium", "bilona", "a2", "bestseller"],
    isFeatured: true,
    isAvailable: true,
    badges: [
      { en: "Bilona Method", hi: "बिलोना विधि" },
      { en: "100% A2", hi: "100% A2" },
    ],
    ingredients: {
      en: "100% pure A2 cow milk butter, slow-cooked to golden ghee.",
      hi: "100% शुद्ध A2 गाय के दूध का मक्खन, धीमी आँच पर सुनहरा घी।",
    },
    shelfLifeDays: 365,
    storageInstructions: {
      en: "Store in cool, dry place. Refrigeration not required. Use clean dry spoon.",
      hi: "ठंडी सूखी जगह पर रखें। फ्रिज ज़रूरी नहीं। साफ सूखे चम्मच से निकालें।",
    },
    nutrition: { energyKcal: 900, fatG: 99.5, proteinG: 0 },
    rating: 4.9,
    ratingCount: 467,
    publishedAt: now,
    updatedAt: now,
  },
  {
    slug: "buffalo-desi-ghee",
    name: { en: "Buffalo Desi Ghee", hi: "भैंस का देसी घी" },
    shortDesc: {
      en: "Rich buffalo ghee for festive cooking and prasad.",
      hi: "त्योहारी पकवान और प्रसाद के लिए भैंस का घी।",
    },
    description: {
      en: "Made from creamy buffalo milk, this ghee has a richer flavour and higher melting point — perfect for halwas, mithai and deep-frying.",
      hi: "मलाईदार भैंस के दूध से बना यह घी ज़्यादा स्वादिष्ट और उच्च पिघलने वाले बिंदु के साथ — हलवा, मिठाई और तलने के लिए परफेक्ट।",
    },
    category: "ghee",
    primaryImage: img("ghee", 1),
    images: [img("ghee", 1), img("ghee", 2)],
    variants: [
      { id: "v1", label: { en: "500 ml Jar", hi: "500 मिली जार" }, unit: "ml", size: 500, priceInr: 749, stockQty: 25, sku: "GHEE-BUF-500" },
      { id: "v2", label: { en: "1 L Tin", hi: "1 लीटर टिन" }, unit: "L", size: 1, priceInr: 1399, stockQty: 14, sku: "GHEE-BUF-1L" },
    ],
    tags: ["traditional", "rich"],
    isFeatured: false,
    isAvailable: true,
    shelfLifeDays: 365,
    nutrition: { energyKcal: 900, fatG: 99.5 },
    rating: 4.7,
    ratingCount: 89,
    publishedAt: now,
    updatedAt: now,
  },

  // ─────────────────────────── CURD ───────────────────────────
  {
    slug: "thick-cream-dahi",
    name: { en: "Thick Cream Dahi", hi: "गाढ़ा मलाई दही" },
    shortDesc: {
      en: "Hand-set creamy dahi made daily from A2 milk.",
      hi: "रोज़ाना A2 दूध से हाथ से जमाया मलाईदार दही।",
    },
    description: {
      en: "Slow-set in earthen pots using natural starter culture. Naturally probiotic, mild and creamy. Perfect for raita, lassi, and curd rice.",
      hi: "मिट्टी के बर्तनों में प्राकृतिक खटाई से धीरे-धीरे जमाया गया। प्राकृतिक रूप से प्रोबायोटिक, हल्का और मलाईदार। रायता, लस्सी और दही चावल के लिए परफेक्ट।",
    },
    category: "curd",
    primaryImage: img("curd", 0),
    images: [img("curd", 0), img("curd", 1)],
    variants: [
      { id: "v1", label: { en: "200 g Cup", hi: "200 ग्राम कप" }, unit: "g", size: 200, priceInr: 35, stockQty: 80, sku: "DAHI-CRM-200" },
      { id: "v2", label: { en: "500 g Tub", hi: "500 ग्राम डिब्बा" }, unit: "g", size: 500, priceInr: 75, stockQty: 50, sku: "DAHI-CRM-500" },
      { id: "v3", label: { en: "1 kg Tub", hi: "1 किलो डिब्बा" }, unit: "kg", size: 1, priceInr: 140, stockQty: 30, sku: "DAHI-CRM-1KG" },
    ],
    tags: ["fresh", "probiotic", "bestseller"],
    isFeatured: true,
    isAvailable: true,
    badges: [{ en: "Earthen Pot", hi: "मिट्टी का बर्तन" }],
    shelfLifeDays: 3,
    storageInstructions: {
      en: "Refrigerate immediately. Consume within 3 days.",
      hi: "तुरंत फ्रिज में रखें। 3 दिनों में उपयोग करें।",
    },
    nutrition: { energyKcal: 98, proteinG: 3.5, fatG: 4.3, carbsG: 4.7 },
    rating: 4.7,
    ratingCount: 218,
    publishedAt: now,
    updatedAt: now,
  },
  {
    slug: "matka-lassi",
    name: { en: "Sweet Matka Lassi", hi: "मीठी मटका लस्सी" },
    shortDesc: {
      en: "Punjabi-style thick lassi in earthen matka — chilled & ready to drink.",
      hi: "पंजाबी स्टाइल गाढ़ी लस्सी मिट्टी के मटके में — ठंडी और पीने को तैयार।",
    },
    description: {
      en: "Made fresh every morning from our A2 dahi, churned with a wooden mathani and sweetened lightly. Topped with malai. Comes in traditional earthen matka.",
      hi: "हर सुबह हमारे A2 दही से बनाई गई, लकड़ी की मथानी से मथी और हल्की मीठी की गई। मलाई से सजी। पारंपरिक मटके में।",
    },
    category: "curd",
    primaryImage: img("curd", 2),
    images: [img("curd", 2), img("curd", 1)],
    variants: [
      { id: "v1", label: { en: "250 ml Matka", hi: "250 मिली मटका" }, unit: "ml", size: 250, priceInr: 49, stockQty: 60, sku: "LASSI-SWT-250" },
      { id: "v2", label: { en: "500 ml Matka", hi: "500 मिली मटका" }, unit: "ml", size: 500, priceInr: 89, stockQty: 35, sku: "LASSI-SWT-500" },
    ],
    tags: ["traditional", "chilled"],
    isFeatured: true,
    isAvailable: true,
    shelfLifeDays: 1,
    publishedAt: now,
    updatedAt: now,
  },

  // ─────────────────────────── PANEER ───────────────────────────
  {
    slug: "fresh-a2-paneer",
    name: { en: "Fresh A2 Paneer", hi: "ताज़ा A2 पनीर" },
    shortDesc: {
      en: "Soft, melt-in-mouth paneer made fresh from A2 cow milk.",
      hi: "A2 गाय के दूध से ताज़ा बना मुलायम पनीर।",
    },
    description: {
      en: "Made the same morning using fresh A2 milk and natural curdling agents. Soft texture, mild flavour — perfect for paneer butter masala, palak paneer, or grilling.",
      hi: "उसी सुबह ताज़े A2 दूध और प्राकृतिक खटाई से बनाया गया। मुलायम बनावट, हल्का स्वाद — पनीर बटर मसाला, पालक पनीर या ग्रिल के लिए परफेक्ट।",
    },
    category: "paneer",
    primaryImage: img("paneer", 0),
    images: [img("paneer", 0), img("paneer", 1), img("paneer", 2)],
    variants: [
      { id: "v1", label: { en: "200 g Block", hi: "200 ग्राम ब्लॉक" }, unit: "g", size: 200, priceInr: 99, stockQty: 50, sku: "PNR-A2-200" },
      { id: "v2", label: { en: "500 g Block", hi: "500 ग्राम ब्लॉक" }, unit: "g", size: 500, priceInr: 229, stockQty: 30, sku: "PNR-A2-500" },
      { id: "v3", label: { en: "1 kg Block", hi: "1 किलो ब्लॉक" }, unit: "kg", size: 1, priceInr: 439, stockQty: 18, sku: "PNR-A2-1KG" },
    ],
    tags: ["fresh", "high-protein", "bestseller"],
    isFeatured: true,
    isAvailable: true,
    badges: [{ en: "Same-Day Fresh", hi: "उसी दिन ताज़ा" }],
    shelfLifeDays: 3,
    nutrition: { energyKcal: 265, proteinG: 18, fatG: 20, carbsG: 1.2 },
    rating: 4.8,
    ratingCount: 184,
    publishedAt: now,
    updatedAt: now,
  },

  // ─────────────────────────── BUTTER ───────────────────────────
  {
    slug: "white-butter-makhan",
    name: { en: "Homemade White Butter (Makhan)", hi: "घर का सफेद मक्खन" },
    shortDesc: {
      en: "Hand-churned unsalted makhan, just like grandma used to make.",
      hi: "हाथ से मथा हुआ बिना नमक का मक्खन, बिल्कुल दादी जैसा।",
    },
    description: {
      en: "Made by churning fresh A2 cream by hand using a traditional mathani. No salt, no preservatives — just pure goodness perfect for parathas, kids, and homemade ghee.",
      hi: "ताज़ी A2 मलाई को पारंपरिक मथानी से हाथ से मथकर बनाया गया। न नमक, न प्रिज़र्वेटिव — पराठों, बच्चों और घर में घी बनाने के लिए शुद्ध मक्खन।",
    },
    category: "butter",
    primaryImage: img("butter", 0),
    images: [img("butter", 0)],
    variants: [
      { id: "v1", label: { en: "200 g Tub", hi: "200 ग्राम डिब्बा" }, unit: "g", size: 200, priceInr: 220, stockQty: 35, sku: "BTR-WHT-200" },
      { id: "v2", label: { en: "500 g Tub", hi: "500 ग्राम डिब्बा" }, unit: "g", size: 500, priceInr: 530, stockQty: 18, sku: "BTR-WHT-500" },
    ],
    tags: ["traditional", "unsalted"],
    isFeatured: false,
    isAvailable: true,
    shelfLifeDays: 7,
    storageInstructions: { en: "Refrigerate. Use within a week.", hi: "फ्रिज में रखें। एक सप्ताह में उपयोग करें।" },
    nutrition: { energyKcal: 717, fatG: 81, proteinG: 0.9 },
    rating: 4.6,
    ratingCount: 71,
    publishedAt: now,
    updatedAt: now,
  },

  // ─────────────────────────── MAVA ───────────────────────────
  {
    slug: "slow-cooked-mawa",
    name: { en: "Slow-Cooked Mawa", hi: "धीमी आँच का मावा" },
    shortDesc: {
      en: "Hand-stirred khoya for the perfect homemade mithai.",
      hi: "हाथ से बनाया गया खोया — घर की मिठाइयों के लिए।",
    },
    description: {
      en: "Pure A2 milk slow-cooked for hours over wood fire until it reduces into rich, fudgy mawa. Perfect for gulab jamun, peda, gajar halwa and barfi.",
      hi: "शुद्ध A2 दूध को घंटों धीमी लकड़ी की आग पर पकाकर गाढ़ा, मलाईदार मावा। गुलाब जामुन, पेड़ा, गाजर हलवा और बर्फी के लिए परफेक्ट।",
    },
    category: "mava",
    primaryImage: img("mava", 0),
    images: [img("mava", 0), img("mava", 1)],
    variants: [
      { id: "v1", label: { en: "250 g Pack", hi: "250 ग्राम पैक" }, unit: "g", size: 250, priceInr: 199, stockQty: 30, sku: "MWA-SLW-250" },
      { id: "v2", label: { en: "500 g Pack", hi: "500 ग्राम पैक" }, unit: "g", size: 500, priceInr: 379, stockQty: 18, sku: "MWA-SLW-500" },
    ],
    tags: ["traditional", "wood-fire"],
    isFeatured: true,
    isAvailable: true,
    badges: [{ en: "Wood-Fire Cooked", hi: "लकड़ी की आग" }],
    shelfLifeDays: 5,
    publishedAt: now,
    updatedAt: now,
  },

  // ─────────────────────────── SWEETS ───────────────────────────
  {
    slug: "mawa-peda",
    name: { en: "Mawa Peda Box", hi: "मावा पेड़ा बॉक्स" },
    shortDesc: {
      en: "Soft mawa pedas dusted with elaichi & saffron.",
      hi: "इलायची और केसर से सजे मुलायम मावा पेड़े।",
    },
    description: {
      en: "Hand-rolled pedas from our own slow-cooked mawa, lightly sweetened with khand and flavoured with green cardamom and Kashmiri saffron.",
      hi: "अपने धीमी आँच के मावा से हाथ से बने पेड़े, खांड से हल्के मीठे, हरी इलायची और कश्मीरी केसर से स्वादिष्ट।",
    },
    category: "sweets",
    primaryImage: img("sweets", 0),
    images: [img("sweets", 0), img("sweets", 1)],
    variants: [
      { id: "v1", label: { en: "250 g Box (10 pcs)", hi: "250 ग्राम बॉक्स (10 पीस)" }, unit: "g", size: 250, priceInr: 299, stockQty: 28, sku: "SWT-PDA-250" },
      { id: "v2", label: { en: "500 g Box (20 pcs)", hi: "500 ग्राम बॉक्स (20 पीस)" }, unit: "g", size: 500, priceInr: 549, stockQty: 14, sku: "SWT-PDA-500" },
    ],
    tags: ["festive", "gift", "bestseller"],
    isFeatured: true,
    isAvailable: true,
    badges: [{ en: "Festive Special", hi: "त्योहारी विशेष" }],
    shelfLifeDays: 7,
    publishedAt: now,
    updatedAt: now,
  },
  {
    slug: "kesar-pista-rabri",
    name: { en: "Kesar Pista Rabri", hi: "केसर पिस्ता रबड़ी" },
    shortDesc: {
      en: "Thickened A2 milk with saffron, pistachio & cardamom.",
      hi: "केसर, पिस्ता और इलायची के साथ गाढ़ा A2 दूध।",
    },
    description: {
      en: "Slow-reduced A2 milk until thick, garnished generously with pistachio slivers, saffron threads and a hint of cardamom. Serve chilled or with malpua.",
      hi: "A2 दूध को गाढ़ा होने तक धीमी आँच पर पकाया, पिस्ता, केसर और इलायची से सजाया। ठंडा परोसें या मालपुआ के साथ।",
    },
    category: "sweets",
    primaryImage: img("sweets", 1),
    images: [img("sweets", 1), img("sweets", 0)],
    variants: [
      { id: "v1", label: { en: "200 g Cup", hi: "200 ग्राम कप" }, unit: "g", size: 200, priceInr: 159, stockQty: 22, sku: "SWT-RBR-200" },
      { id: "v2", label: { en: "500 g Tub", hi: "500 ग्राम डिब्बा" }, unit: "g", size: 500, priceInr: 359, stockQty: 12, sku: "SWT-RBR-500" },
    ],
    tags: ["festive", "premium"],
    isFeatured: false,
    isAvailable: true,
    shelfLifeDays: 2,
    publishedAt: now,
    updatedAt: now,
  },
];

export const getProductBySlug = (slug: string) =>
  products.find((p) => p.slug === slug);

export const getProductsByCategory = (category: Product["category"]) =>
  products.filter((p) => p.category === category);

export const getFeaturedProducts = () => products.filter((p) => p.isFeatured);

