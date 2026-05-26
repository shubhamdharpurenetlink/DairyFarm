import { NextResponse } from "next/server";
import { prisma } from "@/server/db";
import { serializeTeamMember } from "@/server/serialize";
import { apiError, apiOk, apiServerError, parseJsonBody } from "@/server/apiHelpers";
import { requireAdmin } from "@/server/apiAuth";
import { teamMemberFormSchema } from "@/lib/validators";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Ctx) {
  const { id } = await params;
  try {
    const row = await prisma.teamMember.findUnique({ where: { id } });
    if (!row) return apiError("NOT_FOUND", "Team member not found.", 404);
    return apiOk(serializeTeamMember(row));
  } catch (e) {
    return apiServerError(e);
  }
}

export async function PUT(req: Request, { params }: Ctx) {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;
  const { id } = await params;
  const body = await parseJsonBody(req, teamMemberFormSchema);
  if (body instanceof NextResponse) return body;
  try {
    const updated = await prisma.teamMember.update({
      where: { id },
      data: {
        name: body.name,
        role: body.role,
        avatar: body.avatar,
        sortOrder: body.sortOrder ?? 0,
      },
    });
    return apiOk(serializeTeamMember(updated));
  } catch (e) {
    return apiServerError(e);
  }
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;
  const { id } = await params;
  try {
    await prisma.teamMember.delete({ where: { id } });
    return apiOk({ ok: true });
  } catch (e) {
    return apiServerError(e);
  }
}
