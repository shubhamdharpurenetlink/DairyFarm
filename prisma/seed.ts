/**
 * Prisma seed — populates Postgres from the bundled TS seeds.
 *
 * Run with:  npx prisma db seed
 *
 * Idempotent: every entity is upserted, so it's safe to re-run on existing data.
 * Admin user is taken from ADMIN_EMAIL + ADMIN_PASSWORD_HASH env vars.
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

import {
  products,
  productCategories,
  cows,
  diseases,
  trainings,
  gallery,
  team,
  timeline,
  awards,
  facilities,
  testimonials,
  enquiries,
  enrollments,
  subscribers,
  orders,
  site,
} from "../src/data/seeds";

const prisma = new PrismaClient();

async function seedAdmin() {
  const email = (process.env.ADMIN_EMAIL || "admin@laxmidairy.in").toLowerCase();
  const existingHash = process.env.ADMIN_PASSWORD_HASH;
  const passwordHash =
    existingHash && existingHash.startsWith("$2")
      ? existingHash
      : bcrypt.hashSync(process.env.ADMIN_PASSWORD || "admin123", 10);

  await prisma.user.upsert({
    where: { email },
    update: { passwordHash, name: "Owner", role: "owner" },
    create: { email, passwordHash, name: "Owner", role: "owner" },
  });
  console.log(`✓ admin user upserted (${email})`);
}

async function seedSettings() {
  await prisma.settings.upsert({
    where: { id: "default" },
    create: {
      id: "default",
      farmName: site.farmName as object,
      tagline: site.tagline as object,
      foundedYear: site.foundedYear,
      address: site.address as object,
      phone: site.phone,
      whatsapp: site.whatsapp,
      email: site.email,
      hours: site.hours as object,
      socials: site.socials as object,
      stats: site.stats as object,
      delivery: site.delivery as object,
    },
    update: {
      farmName: site.farmName as object,
      tagline: site.tagline as object,
      foundedYear: site.foundedYear,
      address: site.address as object,
      phone: site.phone,
      whatsapp: site.whatsapp,
      email: site.email,
      hours: site.hours as object,
      socials: site.socials as object,
      stats: site.stats as object,
      delivery: site.delivery as object,
    },
  });
  console.log("✓ site settings upserted");
}

async function seedCategories() {
  for (let i = 0; i < productCategories.length; i++) {
    const c = productCategories[i];
    await prisma.category.upsert({
      where: { slug: c.slug },
      create: {
        slug: c.slug,
        name: c.name as object,
        icon: c.icon,
        color: c.color,
        description: c.description as object | undefined,
        sortOrder: i,
      },
      update: {
        name: c.name as object,
        icon: c.icon,
        color: c.color,
        description: c.description as object | undefined,
        sortOrder: i,
      },
    });
  }
  console.log(`✓ ${productCategories.length} categories upserted`);
}

async function seedProducts() {
  for (const p of products) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      create: {
        slug: p.slug,
        name: p.name as object,
        shortDesc: p.shortDesc as object,
        description: p.description as object,
        category: p.category,
        primaryImage: p.primaryImage,
        images: p.images,
        variants: p.variants as unknown as object,
        tags: p.tags,
        isFeatured: p.isFeatured,
        isAvailable: p.isAvailable,
        rating: p.rating,
        ratingCount: p.ratingCount,
        badges: p.badges as object | undefined,
        shelfLifeDays: p.shelfLifeDays,
        storageInstructions: p.storageInstructions as object | undefined,
        ingredients: p.ingredients as object | undefined,
        nutrition: p.nutrition as object | undefined,
        publishedAt: new Date(p.publishedAt),
      },
      update: {
        name: p.name as object,
        shortDesc: p.shortDesc as object,
        description: p.description as object,
        category: p.category,
        primaryImage: p.primaryImage,
        images: p.images,
        variants: p.variants as unknown as object,
        tags: p.tags,
        isFeatured: p.isFeatured,
        isAvailable: p.isAvailable,
        rating: p.rating,
        ratingCount: p.ratingCount,
        badges: p.badges as object | undefined,
        shelfLifeDays: p.shelfLifeDays,
        storageInstructions: p.storageInstructions as object | undefined,
        ingredients: p.ingredients as object | undefined,
        nutrition: p.nutrition as object | undefined,
      },
    });
  }
  console.log(`✓ ${products.length} products upserted`);
}

async function seedCows() {
  for (const c of cows) {
    await prisma.cow.upsert({
      where: { slug: c.slug },
      create: {
        slug: c.slug,
        nameEn: c.nameEn,
        nameHi: c.nameHi,
        category: c.category,
        origin: c.origin,
        color: c.color,
        milkYieldLitresPerDay: c.milkYieldLitresPerDay as object,
        fatPercent: c.fatPercent,
        image: c.image,
        gallery: c.gallery,
        shortDesc: c.shortDesc as object,
        description: c.description as object,
        characteristics: c.characteristics as object,
        history: c.history as object,
        temperament: c.temperament as object,
        suitability: c.suitability as object,
      },
      update: {
        nameEn: c.nameEn,
        nameHi: c.nameHi,
        category: c.category,
        origin: c.origin,
        color: c.color,
        milkYieldLitresPerDay: c.milkYieldLitresPerDay as object,
        fatPercent: c.fatPercent,
        image: c.image,
        gallery: c.gallery,
        shortDesc: c.shortDesc as object,
        description: c.description as object,
        characteristics: c.characteristics as object,
        history: c.history as object,
        temperament: c.temperament as object,
        suitability: c.suitability as object,
      },
    });
  }
  console.log(`✓ ${cows.length} cows upserted`);
}

async function seedDiseases() {
  for (const d of diseases) {
    await prisma.disease.upsert({
      where: { slug: d.slug },
      create: {
        slug: d.slug,
        title: d.title as object,
        category: d.category,
        image: d.image,
        summary: d.summary as object,
        symptoms: d.symptoms as object,
        causes: d.causes as object,
        prevention: d.prevention as object,
        treatment: d.treatment as object,
        readTimeMin: d.readTimeMin,
        publishedAt: new Date(d.publishedAt),
      },
      update: {
        title: d.title as object,
        category: d.category,
        image: d.image,
        summary: d.summary as object,
        symptoms: d.symptoms as object,
        causes: d.causes as object,
        prevention: d.prevention as object,
        treatment: d.treatment as object,
        readTimeMin: d.readTimeMin,
      },
    });
  }
  console.log(`✓ ${diseases.length} diseases upserted`);
}

async function seedTrainings() {
  for (const t of trainings) {
    await prisma.training.upsert({
      where: { slug: t.slug },
      create: {
        slug: t.slug,
        title: t.title as object,
        shortDesc: t.shortDesc as object,
        longDesc: t.longDesc as object,
        image: t.image,
        durationDays: t.durationDays,
        priceInr: t.priceInr,
        level: t.level,
        seatsTotal: t.seatsTotal,
        seatsLeft: t.seatsLeft,
        syllabus: t.syllabus as object,
        instructor: t.instructor as unknown as object,
        schedule: t.schedule as object,
        includes: t.includes as object,
      },
      update: {
        title: t.title as object,
        shortDesc: t.shortDesc as object,
        longDesc: t.longDesc as object,
        image: t.image,
        durationDays: t.durationDays,
        priceInr: t.priceInr,
        level: t.level,
        seatsTotal: t.seatsTotal,
        seatsLeft: t.seatsLeft,
        syllabus: t.syllabus as object,
        instructor: t.instructor as unknown as object,
        schedule: t.schedule as object,
        includes: t.includes as object,
      },
    });
  }
  console.log(`✓ ${trainings.length} trainings upserted`);
}

async function seedGallery() {
  for (let i = 0; i < gallery.length; i++) {
    const g = gallery[i];
    await prisma.galleryItem.upsert({
      where: { id: g.id },
      create: {
        id: g.id,
        type: g.type,
        url: g.url,
        thumbnail: g.thumbnail,
        title: g.title as object,
        aspectRatio: g.aspectRatio,
        sortOrder: i,
      },
      update: {
        type: g.type,
        url: g.url,
        thumbnail: g.thumbnail,
        title: g.title as object,
        aspectRatio: g.aspectRatio,
        sortOrder: i,
      },
    });
  }
  console.log(`✓ ${gallery.length} gallery items upserted`);
}

async function seedTeam() {
  for (let i = 0; i < team.length; i++) {
    const m = team[i];
    await prisma.teamMember.upsert({
      where: { id: m.id },
      create: {
        id: m.id,
        name: m.name,
        role: m.role as object,
        avatar: m.avatar,
        sortOrder: i,
      },
      update: {
        name: m.name,
        role: m.role as object,
        avatar: m.avatar,
        sortOrder: i,
      },
    });
  }
  console.log(`✓ ${team.length} team members upserted`);
}

async function seedTimeline() {
  for (let i = 0; i < timeline.length; i++) {
    const ev = timeline[i];
    await prisma.timelineEvent.upsert({
      where: { id: ev.id },
      create: {
        id: ev.id,
        year: ev.year,
        title: ev.title as object,
        description: ev.description as object,
        sortOrder: i,
      },
      update: {
        year: ev.year,
        title: ev.title as object,
        description: ev.description as object,
        sortOrder: i,
      },
    });
  }
  console.log(`✓ ${timeline.length} timeline events upserted`);
}

async function seedAwards() {
  for (let i = 0; i < awards.length; i++) {
    const a = awards[i];
    await prisma.award.upsert({
      where: { id: a.id },
      create: {
        id: a.id,
        year: a.year,
        title: a.title as object,
        issuer: a.issuer,
        icon: a.icon,
        sortOrder: i,
      },
      update: {
        year: a.year,
        title: a.title as object,
        issuer: a.issuer,
        icon: a.icon,
        sortOrder: i,
      },
    });
  }
  console.log(`✓ ${awards.length} awards upserted`);
}

async function seedFacilities() {
  for (let i = 0; i < facilities.length; i++) {
    const f = facilities[i];
    await prisma.facility.upsert({
      where: { id: f.id },
      create: {
        id: f.id,
        name: f.name as object,
        description: f.description as object,
        image: f.image,
        icon: f.icon,
        sortOrder: i,
      },
      update: {
        name: f.name as object,
        description: f.description as object,
        image: f.image,
        icon: f.icon,
        sortOrder: i,
      },
    });
  }
  console.log(`✓ ${facilities.length} facilities upserted`);
}

async function seedTestimonials() {
  for (let i = 0; i < testimonials.length; i++) {
    const tm = testimonials[i];
    await prisma.testimonial.upsert({
      where: { id: tm.id },
      create: {
        id: tm.id,
        name: tm.name,
        city: tm.city,
        avatar: tm.avatar,
        rating: tm.rating,
        quote: tm.quote as object,
        sortOrder: i,
      },
      update: {
        name: tm.name,
        city: tm.city,
        avatar: tm.avatar,
        rating: tm.rating,
        quote: tm.quote as object,
        sortOrder: i,
      },
    });
  }
  console.log(`✓ ${testimonials.length} testimonials upserted`);
}

async function seedEnquiries() {
  for (const eq of enquiries) {
    await prisma.enquiry.upsert({
      where: { id: eq.id },
      create: {
        id: eq.id,
        name: eq.name,
        phone: eq.phone,
        email: eq.email,
        subject: eq.subject,
        message: eq.message,
        status: eq.status,
        createdAt: new Date(eq.createdAt),
      },
      update: {
        name: eq.name,
        phone: eq.phone,
        email: eq.email,
        subject: eq.subject,
        message: eq.message,
        status: eq.status,
      },
    });
  }
  console.log(`✓ ${enquiries.length} sample enquiries upserted`);
}

async function seedEnrollments() {
  const trainingSlugs = new Set(
    (await prisma.training.findMany({ select: { slug: true } })).map((t) => t.slug),
  );
  for (const en of enrollments) {
    if (!trainingSlugs.has(en.trainingId)) {
      console.log(`  skip enrollment ${en.id}: no training ${en.trainingId}`);
      continue;
    }
    await prisma.enrollment.upsert({
      where: { id: en.id },
      create: {
        id: en.id,
        trainingId: en.trainingId,
        trainingTitleEn: en.trainingTitleEn,
        fullName: en.fullName,
        phone: en.phone,
        email: en.email,
        age: en.age,
        state: en.state,
        district: en.district,
        education: en.education,
        batchDate: en.batchDate,
        source: en.source,
        message: en.message,
        status: en.status,
        createdAt: new Date(en.createdAt),
      },
      update: {
        trainingId: en.trainingId,
        trainingTitleEn: en.trainingTitleEn,
        fullName: en.fullName,
        phone: en.phone,
        email: en.email,
        age: en.age,
        state: en.state,
        district: en.district,
        education: en.education,
        batchDate: en.batchDate,
        source: en.source,
        message: en.message,
        status: en.status,
      },
    });
  }
  console.log(`✓ ${enrollments.length} sample enrollments upserted`);
}

async function seedSubscribers() {
  for (const s of subscribers) {
    await prisma.subscriber.upsert({
      where: { email: s.email },
      create: {
        id: s.id,
        email: s.email,
        createdAt: new Date(s.createdAt),
      },
      update: {},
    });
  }
  console.log(`✓ ${subscribers.length} subscribers upserted`);
}

async function seedOrders() {
  for (const o of orders) {
    await prisma.order.upsert({
      where: { id: o.id },
      create: {
        id: o.id,
        orderNumber: o.orderNumber,
        customer: o.customer as unknown as object,
        items: o.items as unknown as object,
        subtotalInr: o.subtotalInr,
        deliveryFeeInr: o.deliveryFeeInr,
        totalInr: o.totalInr,
        status: o.status,
        paymentMode: o.paymentMode,
        paymentRef: o.paymentRef,
        createdAt: new Date(o.createdAt),
      },
      update: {
        status: o.status,
        paymentRef: o.paymentRef,
      },
    });
  }
  console.log(`✓ ${orders.length} sample orders upserted`);
}

async function main() {
  console.log("Seeding Laxmi Dairy Farm database…");
  await seedAdmin();
  await seedSettings();
  await seedCategories();
  await seedProducts();
  await seedCows();
  await seedDiseases();
  await seedTrainings();
  await seedGallery();
  await seedTeam();
  await seedTimeline();
  await seedAwards();
  await seedFacilities();
  await seedTestimonials();
  await seedEnquiries();
  await seedEnrollments();
  await seedSubscribers();
  await seedOrders();
  console.log("✓ All seed data inserted");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
