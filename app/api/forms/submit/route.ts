import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Generic schema to accept any valid JSON object + timestamp
const dynamicFormSchema = z.object({
  type: z.string().optional(),
  submittedAt: z.string().optional(),
}).passthrough();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validationResult = dynamicFormSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: validationResult.error },
        { status: 400 }
      );
    }

    // Secure server-side variable (ensure this is set in Vercel/env)
    const webhookUrl = process.env.FORM_WEBHOOK_URL; 

    if (!webhookUrl) {
      console.error("Missing FORM_WEBHOOK_URL");
      return NextResponse.json(
        { error: "Configuration error" },
        { status: 500 }
      );
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validationResult.data),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Upstream webhook failed" },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Form submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Form submission error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
