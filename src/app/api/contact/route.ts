import { mkdir, appendFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  brand: string;
  budget: string;
  message: string;
};

const MAX_FIELD_LENGTH = 2000;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function cleanString(value: unknown, maxLength = MAX_FIELD_LENGTH) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function validatePayload(body: unknown): ContactPayload | { error: string } {
  if (!body || typeof body !== "object") {
    return { error: "Invalid request body." };
  }

  const input = body as Record<string, unknown>;
  const payload = {
    name: cleanString(input.name, 120),
    email: cleanString(input.email, 254).toLowerCase(),
    phone: cleanString(input.phone, 40),
    brand: cleanString(input.brand, 300),
    budget: cleanString(input.budget, 120) || "Growth Audit",
    message: cleanString(input.message),
  };

  if (!payload.name || !payload.email || !payload.phone || !payload.brand) {
    return { error: "Name, email, phone, and brand URL are required." };
  }

  if (!emailRegex.test(payload.email)) {
    return { error: "Invalid email address." };
  }

  return payload;
}

async function saveSubmission(payload: ContactPayload, deliveredByEmail: boolean) {
  const configuredPath = process.env.CONTACT_SUBMISSIONS_FILE;
  const absolutePath =
    configuredPath && path.isAbsolute(configuredPath)
      ? configuredPath
      : path.join(process.cwd(), "data", "contact-submissions.jsonl");

  await mkdir(path.dirname(absolutePath), { recursive: true });
  await appendFile(
    absolutePath,
    `${JSON.stringify({
      ...payload,
      deliveredByEmail,
      submittedAt: new Date().toISOString(),
    })}\n`,
    "utf8"
  );
}

function buildEmailHtml(payload: ContactPayload) {
  const safe = {
    name: escapeHtml(payload.name),
    email: escapeHtml(payload.email),
    phone: escapeHtml(payload.phone),
    brand: escapeHtml(payload.brand),
    budget: escapeHtml(payload.budget),
    message: escapeHtml(payload.message),
  };

  return `
    <div style="font-family: Arial, sans-serif; background: #0B0B10; color: #F7F7F5; padding: 32px;">
      <h1 style="color: #246BFF; font-size: 22px; margin: 0 0 20px;">New ANOR contact submission</h1>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 10px 0; color: #9CA3AF;">Name</td><td style="padding: 10px 0; font-weight: 700;">${safe.name}</td></tr>
        <tr><td style="padding: 10px 0; color: #9CA3AF;">Email</td><td style="padding: 10px 0; font-weight: 700;">${safe.email}</td></tr>
        <tr><td style="padding: 10px 0; color: #9CA3AF;">Phone / WhatsApp</td><td style="padding: 10px 0; font-weight: 700;">${safe.phone}</td></tr>
        <tr><td style="padding: 10px 0; color: #9CA3AF;">Brand / Store</td><td style="padding: 10px 0; font-weight: 700;">${safe.brand}</td></tr>
        <tr><td style="padding: 10px 0; color: #9CA3AF;">Growth Priority</td><td style="padding: 10px 0; font-weight: 700;">${safe.budget}</td></tr>
        <tr><td style="padding: 10px 0; color: #9CA3AF;">Message</td><td style="padding: 10px 0;">${safe.message || "(none)"}</td></tr>
      </table>
    </div>
  `;
}

async function sendEmail(payload: ContactPayload) {
  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) return false;

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || "ANOR <onboarding@resend.dev>",
      to: [process.env.CONTACT_EMAIL || "anor.support@gmail.com"],
      reply_to: payload.email,
      subject: `New ANOR contact submission - ${payload.name}`,
      html: buildEmailHtml(payload),
    }),
  });

  if (!resendResponse.ok) {
    const errorText = await resendResponse.text();
    console.error("Resend API error:", errorText);
    return false;
  }

  return true;
}

export async function POST(request: Request) {
  try {
    const payload = validatePayload(await request.json());

    if ("error" in payload) {
      return NextResponse.json({ error: payload.error }, { status: 400 });
    }

    const deliveredByEmail = await sendEmail(payload);

    try {
      await saveSubmission(payload, deliveredByEmail);
    } catch (error) {
      console.error("Failed to save contact submission:", error);
    }

    return NextResponse.json(
      { success: true, deliveredByEmail },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
