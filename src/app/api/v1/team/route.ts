import { NextResponse } from "next/server";
import { prisma } from "@/server/db";
import { serializeTeamMember } from "@/server/serialize";
import { apiOk, apiServerError, parseJsonBody } from "@/server/apiHelpers";
import { requireAdmin } from "@/server/apiAuth";
import { teamMemberFormSchema } from "@/lib/validators";

export const runtime = "nodejs";

export async function GET() {
  try {
    const rows = await prisma.teamMember.findMany({ orderBy: { sortOrder: "asc" } });
    return apiOk(rows.map(serializeTeamMember));
  } catch (e) {
    return apiServerError(e);
  }
}

export async function POST(req: Request) {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;
  const body = await parseJsonBody(req, teamMemberFormSchema);
  if (body instanceof NextResponse) return body;
  try {
    const created = await prisma.teamMember.create({
      data: {
        name: body.name,
        role: body.role,
        avatar: body.avatar,
        sortOrder: body.sortOrder ?? 0,
      },
    });
    return apiOk(serializeTeamMember(created), 201);
  } catch (e) {
    return apiServerError(e);
  }
}
