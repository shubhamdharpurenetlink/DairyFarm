import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";

if (typeof window === "undefined" && typeof WebSocket === "undefined") {
  neonConfig.webSocketConstructor = ws;
}

declare global {
  var __prisma: PrismaClient | undefined;
}

function buildClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }

  const useNeonAdapter =
    process.env.NODE_ENV === "production" ||
    process.env.PRISMA_USE_NEON_ADAPTER === "1";

  if (useNeonAdapter) {
    const adapter = new PrismaNeon({ connectionString });
    return new PrismaClient({ adapter });
  }

  return new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["warn", "error"]
        : ["error"],
  });
}

export const prisma: PrismaClient = global.__prisma ?? buildClient();

if (process.env.NODE_ENV !== "production") {
  global.__prisma = prisma;
}
