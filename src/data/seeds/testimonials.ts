import type { Testimonial } from "@/types";

const avatar = (id: number) => `https://i.pravatar.cc/200?u=customer${id}`;

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Priya Patil",
    city: "Pandhurna, MP",
    avatar: avatar(31),
    rating: 5,
    quote: {
      en: "We've been on Laxmi Dairy's monthly A2 milk subscription for 2 years. My 3-year-old refuses any other milk now. Glass bottles arrive in our colony by 6:45 AM every single day — even in monsoon.",
      hi: "हम 2 साल से लक्ष्मी डेयरी की मासिक A2 दूध सब्सक्रिप्शन पर हैं। मेरा 3 साल का बेटा अब कोई और दूध नहीं पीता। काँच की बोतलें हर रोज़ हमारी कॉलोनी में सुबह 6:45 तक — मानसून में भी।",
    },
  },
  {
    id: "t2",
    name: "Ramesh Wadhwa",
    city: "Nagpur, MH",
    avatar: avatar(32),
    rating: 5,
    quote: {
      en: "Visited the farm during the Krishi Mela last October — clean, well-ventilated sheds, happy cows, and a transparent kitchen. We came back with 2 L of bilona ghee. Worth the 3-hour drive from Nagpur.",
      hi: "पिछले अक्टूबर कृषि मेले के दौरान फार्म देखा — साफ, हवादार शेड, खुश गायें, और पारदर्शी रसोई। 2 लीटर बिलोना घी लेकर लौटे। नागपुर से 3 घंटे की ड्राइव की कीमत वसूल।",
    },
  },
  {
    id: "t3",
    name: "Dr. Anita Joshi",
    city: "Indore, MP",
    avatar: avatar(33),
    rating: 5,
    quote: {
      en: "As a paediatrician, I now recommend Laxmi Dairy's A2 milk to lactose-intolerant kids in my practice — many parents have reported their child can finally tolerate it. Bilona ghee is what I keep at home too.",
      hi: "बाल रोग विशेषज्ञ होने के नाते, मैं अब अपने क्लिनिक के लैक्टोज़-असहिष्णु बच्चों को लक्ष्मी डेयरी का A2 दूध सुझाती हूँ — कई माता-पिता ने बताया कि उनके बच्चे ने इसे सहन कर लिया। घर पर भी बिलोना घी ही रखती हूँ।",
    },
  },
  {
    id: "t4",
    name: "Sandeep Yadav",
    city: "Chhindwara, MP",
    avatar: avatar(34),
    rating: 5,
    quote: {
      en: "Did the Dairy Entrepreneur Basics course in March 2024 with my brother. Started with 4 Sahiwal cows in our village near Chhindwara. After 18 months, we're at 11 cows and supplying 80 L to the local Sanchi route. The WhatsApp helpline still answers in 2 hours.",
      hi: "मार्च 2024 में अपने भाई के साथ डेयरी एंट्रप्रेन्योर बेसिक्स कोर्स किया। छिंदवाड़ा के पास हमारे गाँव में 4 साहीवाल गायों से शुरुआत। 18 महीने बाद, 11 गायें हैं और स्थानीय सांची मार्ग को 80 लीटर सप्लाई। WhatsApp हेल्पलाइन अब भी 2 घंटे में जवाब देती है।",
    },
  },
  {
    id: "t5",
    name: "Kavita Mehra",
    city: "Bhopal, MP",
    avatar: avatar(35),
    rating: 5,
    quote: {
      en: "Ghee that smells exactly like my Nani's kitchen in Sehore. I make 100 ladoos for every festival using their bilona ghee — guests always ask which mithai shop, and I get to say none, it's the ghee that makes the difference.",
      hi: "घी जिसकी सुगंध बिल्कुल सेहोर में मेरी नानी की रसोई जैसी है। मैं हर त्योहार पर इनके बिलोना घी से 100 लड्डू बनाती हूँ — मेहमान हमेशा पूछते हैं कौन सी मिठाई की दुकान, और मैं कह पाती हूँ कोई नहीं, घी का कमाल है।",
    },
  },
  {
    id: "t6",
    name: "Suresh Khandelwal",
    city: "Sausar, MP",
    avatar: avatar(36),
    rating: 5,
    quote: {
      en: "Our café in Sausar gets fresh paneer and curd from Laxmi every morning. Customers can taste the difference — our paneer butter masala bookings doubled in 6 months after we switched.",
      hi: "हमारे सौंसर के कैफ़े को हर सुबह लक्ष्मी से ताज़ा पनीर और दही मिलता है। ग्राहक अंतर महसूस कर लेते हैं — स्विच करने के 6 महीने में हमारी पनीर बटर मसाला बुकिंग दोगुनी।",
    },
  },
  {
    id: "t7",
    name: "Anjali Verma",
    city: "Jabalpur, MP",
    avatar: avatar(37),
    rating: 5,
    quote: {
      en: "Did the Bilona Ghee workshop with my mother-in-law. Took home the wooden bilona and the SOP booklet — now we make our own ghee from our two desi cows. Family ritual restored.",
      hi: "अपनी सास के साथ बिलोना घी कार्यशाला की। लकड़ी की बिलोना और SOP पुस्तिका घर ले गई — अब हम अपनी दो देसी गायों का घी खुद बनाते हैं। पारिवारिक परंपरा फिर से जीवित।",
    },
  },
  {
    id: "t8",
    name: "Mahesh Sahu",
    city: "Wardha, MH",
    avatar: avatar(38),
    rating: 5,
    quote: {
      en: "I came for the AI workshop in July. Within 2 months I'd inseminated 28 cows around my village and started earning ₹250 per visit. Money paid for the course many times over. Will be back for the Advanced Herd Management next year.",
      hi: "मैं जुलाई में AI कार्यशाला के लिए आया। 2 महीनों में मैंने अपने गाँव की 28 गायों का गर्भाधान किया और प्रति विज़िट ₹250 कमाने लगा। कोर्स की फीस कई गुना वसूल हो गई। अगले साल एडवांस्ड हर्ड मैनेजमेंट के लिए लौटूँगा।",
    },
  },
];
