import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name must be 100 characters or fewer."),
  email: z
    .email("Please provide a valid email address.")
    .max(255, "Email must be 255 characters or fewer."),
  company: z
    .string()
    .trim()
    .max(120, "Company must be 120 characters or fewer.")
    .optional(),
  budget: z
    .string()
    .trim()
    .min(1, "Please select a budget range.")
    .max(60, "Budget must be 60 characters or fewer."),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters.")
    .max(2000, "Message must be 2000 characters or fewer."),
});

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body. Expected JSON." },
      { status: 400 }
    );
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return NextResponse.json(
      {
        ok: false,
        error: first?.message ?? "Please check your input and try again.",
      },
      { status: 400 }
    );
  }

  const { name, email, company, budget, message } = parsed.data;

  try {
    const submission = await db.contactSubmission.create({
      data: {
        name,
        email,
        company: company && company.length > 0 ? company : null,
        budget,
        message,
        source: "website",
      },
    });

    return NextResponse.json({ ok: true, id: submission.id }, { status: 200 });
  } catch (error) {
    console.error("[api/contact] Failed to persist submission:", error);
    return NextResponse.json(
      { ok: false, error: "Could not save right now." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { ok: false, error: "Method not allowed. Use POST." },
    { status: 405 }
  );
}
