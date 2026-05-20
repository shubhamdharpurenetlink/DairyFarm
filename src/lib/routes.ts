// Single source of truth for all app routes.
// Always use these constants instead of hard-coding paths.

export const routes = {
  home: "/",
  about: "/about",
  cows: "/cows",
  cowDetail: (slug: string) => `/cows/${slug}`,
  care: "/cow-care",
  careDetail: (slug: string) => `/cow-care/${slug}`,
  gallery: "/gallery",
  training: "/training",
  trainingDetail: (slug: string) => `/training/${slug}`,
  contact: "/contact",
  products: "/products",
  productDetail: (slug: string) => `/products/${slug}`,
  cart: "/products/cart",
  checkoutSuccess: (orderNumber: string) =>
    `/products/checkout/success/${encodeURIComponent(orderNumber)}`,

  admin: {
    root: "/admin",
    login: "/admin/login",
    dashboard: "/admin/dashboard",
    products: "/admin/products",
    productNew: "/admin/products/new",
    productEdit: (id: string) => `/admin/products/${id}`,
    categories: "/admin/categories",
    categoryNew: "/admin/categories/new",
    categoryEdit: (slug: string) => `/admin/categories/${slug}`,
    orders: "/admin/orders",
    orderDetail: (id: string) => `/admin/orders/${id}`,
    cows: "/admin/cows",
    cowEdit: (slug: string) => `/admin/cows/${slug}`,
    cowNew: "/admin/cows/new",
    diseases: "/admin/diseases",
    diseaseEdit: (slug: string) => `/admin/diseases/${slug}`,
    diseaseNew: "/admin/diseases/new",
    trainings: "/admin/trainings",
    trainingNew: "/admin/trainings/new",
    trainingEdit: (slug: string) => `/admin/trainings/${slug}`,
    enrollments: "/admin/enrollments",
    gallery: "/admin/gallery",
    galleryNew: "/admin/gallery/new",
    galleryEdit: (id: string) => `/admin/gallery/${id}`,
    team: "/admin/team",
    teamNew: "/admin/team/new",
    teamEdit: (id: string) => `/admin/team/${id}`,
    facilities: "/admin/facilities",
    facilityNew: "/admin/facilities/new",
    facilityEdit: (id: string) => `/admin/facilities/${id}`,
    awards: "/admin/awards",
    awardNew: "/admin/awards/new",
    awardEdit: (id: string) => `/admin/awards/${id}`,
    testimonials: "/admin/testimonials",
    testimonialNew: "/admin/testimonials/new",
    testimonialEdit: (id: string) => `/admin/testimonials/${id}`,
    enquiries: "/admin/enquiries",
    subscribers: "/admin/subscribers",
    settings: "/admin/settings",
    siteContent: "/admin/site-content",
  },
} as const;

export const publicNav = [
  { key: "home", href: routes.home },
  { key: "about", href: routes.about },
  { key: "products", href: routes.products },
  { key: "cows", href: routes.cows },
  { key: "care", href: routes.care },
  { key: "gallery", href: routes.gallery },
  { key: "training", href: routes.training },
  { key: "contact", href: routes.contact },
] as const;

export const mobileBottomNav = [
  { key: "home", href: routes.home },
  { key: "products", href: routes.products },
  { key: "cows", href: routes.cows },
  { key: "training", href: routes.training },
  { key: "contact", href: routes.contact },
] as const;

export type AdminNavGroup = {
  key: string;
  items: { key: string; href: string }[];
};

export const adminNavGroups: AdminNavGroup[] = [
  {
    key: "overview",
    items: [{ key: "dashboard", href: routes.admin.dashboard }],
  },
  {
    key: "shop",
    items: [
      { key: "products", href: routes.admin.products },
      { key: "categories", href: routes.admin.categories },
      { key: "orders", href: routes.admin.orders },
    ],
  },
  {
    key: "content",
    items: [
      { key: "cows", href: routes.admin.cows },
      { key: "diseases", href: routes.admin.diseases },
      { key: "trainings", href: routes.admin.trainings },
      { key: "gallery", href: routes.admin.gallery },
      { key: "team", href: routes.admin.team },
      { key: "facilities", href: routes.admin.facilities },
      { key: "awards", href: routes.admin.awards },
      { key: "testimonials", href: routes.admin.testimonials },
    ],
  },
  {
    key: "engagement",
    items: [
      { key: "enquiries", href: routes.admin.enquiries },
      { key: "enrollments", href: routes.admin.enrollments },
      { key: "subscribers", href: routes.admin.subscribers },
    ],
  },
  {
    key: "system",
    items: [
      { key: "siteContent", href: routes.admin.siteContent },
      { key: "settings", href: routes.admin.settings },
    ],
  },
];
