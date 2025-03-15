import { NextResponse } from "next/server";

const corsHeader = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeader });
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const loginRes = await response.json();
    if (!response.ok) {
      return NextResponse.json(loginRes, {
        status: response.status,
        headers: corsHeader,
      });
    }

    return NextResponse.json(loginRes, {
      status: 200,
      headers: corsHeader,
    });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error", error }, { status: 500, headers: corsHeader });
  }
}
