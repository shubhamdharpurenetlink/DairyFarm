import type { Order } from "@/types";

const day = (offset: number) => {
  const d = new Date();
  d.setDate(d.getDate() - offset);
  return d.toISOString();
};

export const orders: Order[] = [
  {
    id: "o1",
    orderNumber: "LD-2026-0008",
    customer: {
      name: "Ravi Sharma",
      phone: "+919876512341",
      email: "ravi@example.com",
      addressLine: "Flat 204, Green Vista, Sector 32",
      city: "Karnal",
      state: "Haryana",
      pincode: "132001",
    },
    items: [
      { productId: "a2-bilona-ghee", productNameEn: "A2 Bilona Ghee", variantId: "v2", variantLabelEn: "500 ml Jar", qty: 1, unitPriceInr: 1099, lineTotalInr: 1099 },
      { productId: "a2-gir-milk-fresh", productNameEn: "A2 Gir Cow Milk", variantId: "v2", variantLabelEn: "1 L Bottle", qty: 2, unitPriceInr: 85, lineTotalInr: 170 },
    ],
    subtotalInr: 1269,
    deliveryFeeInr: 0,
    totalInr: 1269,
    status: "delivered",
    paymentMode: "upi",
    paymentRef: "UPI-RZP-8821",
    createdAt: day(2),
    updatedAt: day(1),
  },
  {
    id: "o2",
    orderNumber: "LD-2026-0009",
    customer: {
      name: "Priya Singh",
      phone: "+919876512342",
      addressLine: "House 12, Adarsh Nagar",
      city: "Karnal",
      state: "Haryana",
      pincode: "132001",
    },
    items: [
      { productId: "thick-cream-dahi", productNameEn: "Thick Cream Dahi", variantId: "v2", variantLabelEn: "500 g Tub", qty: 1, unitPriceInr: 75, lineTotalInr: 75 },
      { productId: "fresh-a2-paneer", productNameEn: "Fresh A2 Paneer", variantId: "v1", variantLabelEn: "200 g Block", qty: 2, unitPriceInr: 99, lineTotalInr: 198 },
    ],
    subtotalInr: 273,
    deliveryFeeInr: 49,
    totalInr: 322,
    status: "out_for_delivery",
    paymentMode: "cod",
    createdAt: day(0),
    updatedAt: day(0),
  },
  {
    id: "o3",
    orderNumber: "LD-2026-0010",
    customer: {
      name: "Mohan Kumar",
      phone: "+919876512343",
      addressLine: "204 Civil Lines",
      city: "Karnal",
      state: "Haryana",
      pincode: "132023",
    },
    items: [
      { productId: "mawa-peda", productNameEn: "Mawa Peda Box", variantId: "v2", variantLabelEn: "500 g Box", qty: 2, unitPriceInr: 549, lineTotalInr: 1098 },
    ],
    subtotalInr: 1098,
    deliveryFeeInr: 0,
    totalInr: 1098,
    status: "confirmed",
    paymentMode: "upi",
    paymentRef: "UPI-RZP-9012",
    createdAt: day(0),
    updatedAt: day(0),
  },
  {
    id: "o4",
    orderNumber: "LD-2026-0011",
    customer: {
      name: "Sunita Devi",
      phone: "+919876512344",
      addressLine: "Sector 12, Block C, 401",
      city: "Karnal",
      state: "Haryana",
      pincode: "132001",
    },
    items: [
      { productId: "a2-gir-milk-fresh", productNameEn: "A2 Gir Cow Milk", variantId: "v2", variantLabelEn: "1 L Bottle", qty: 5, unitPriceInr: 85, lineTotalInr: 425 },
    ],
    subtotalInr: 425,
    deliveryFeeInr: 49,
    totalInr: 474,
    status: "pending",
    paymentMode: "cod",
    createdAt: day(0),
    updatedAt: day(0),
  },
];
