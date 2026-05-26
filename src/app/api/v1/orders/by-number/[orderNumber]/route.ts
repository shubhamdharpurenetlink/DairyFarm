import { prisma } from "@/server/db";
import { serializeOrder } from "@/server/serialize";
import { apiError, apiOk, apiServerError } from "@/server/apiHelpers";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ orderNumber: string }> };

export async function GET(_req: Request, { params }: Ctx) {
  const { orderNumber } = await params;
  try {
    const row = await prisma.order.findUnique({ where: { orderNumber } });
    if (!row) return apiError("NOT_FOUND", "Order not found.", 404);
    return apiOk(serializeOrder(row));
  } catch (e) {
    return apiServerError(e);
  }
}
