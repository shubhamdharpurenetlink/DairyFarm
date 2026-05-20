import type { Testimonial } from "@/types";

const avatar = (id: number) => `https://i.pravatar.cc/200?u=customer${id}`;

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Priya Kapoor",
    city: "Karnal",
    avatar: avatar(11),
    rating: 5,
    quote: {
      en: "I have been buying Laxmi Dairy's A2 milk for 3 years now. My kids love the rich taste and I love the purity. Their delivery is always on time!",
      hi: "मैं 3 साल से लक्ष्मी डेयरी का A2 दूध खरीद रही हूं। मेरे बच्चों को इसका भरपूर स्वाद पसंद है और मुझे इसकी शुद्धता। डिलीवरी हमेशा समय पर!",
    },
  },
  {
    id: "t2",
    name: "Ramesh Verma",
    city: "Panipat",
    avatar: avatar(12),
    rating: 5,
    quote: {
      en: "Visited the farm during their open day - it was a beautiful experience. Clean, ethical, and the cows are clearly happy. Highly recommended!",
      hi: "उनके ओपन डे पर फार्म देखा - एक सुंदर अनुभव था। साफ, नैतिक, और गायें स्पष्ट रूप से खुश। अत्यंत अनुशंसित!",
    },
  },
  {
    id: "t3",
    name: "Dr. Anita Sharma",
    city: "Delhi NCR",
    avatar: avatar(13),
    rating: 5,
    quote: {
      en: "As a doctor, I recommend Laxmi Dairy ghee and milk to my patients. Their products have a noticeable difference in taste and quality.",
      hi: "एक डॉक्टर के रूप में, मैं अपने रोगियों को लक्ष्मी डेयरी का घी और दूध सुझाती हूं। उनके उत्पादों में स्वाद और गुणवत्ता का अंतर स्पष्ट है।",
    },
  },
  {
    id: "t4",
    name: "Sandeep Yadav",
    city: "Sonipat",
    avatar: avatar(14),
    rating: 5,
    quote: {
      en: "I completed the Dairy Farming Basics course here. Within 4 months, my own 8-cow farm is running profitably. Forever grateful!",
      hi: "मैंने यहाँ डेयरी फार्मिंग बेसिक्स कोर्स पूरा किया। 4 महीनों में, मेरा अपना 8-गाय का फार्म लाभदायक चल रहा है। हमेशा आभारी!",
    },
  },
  {
    id: "t5",
    name: "Kavita Mehra",
    city: "Karnal",
    avatar: avatar(15),
    rating: 5,
    quote: {
      en: "Their ghee transforms every dish. My grandmother said it tastes just like what she used to make in her village 50 years ago. That is the highest praise.",
      hi: "उनका घी हर व्यंजन को बदल देता है। मेरी दादी ने कहा कि यह 50 साल पहले उनके गाँव के घी जैसा है। यह सबसे बड़ी तारीफ है।",
    },
  },
];
