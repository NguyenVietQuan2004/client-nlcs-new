import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  return handleProxy(req, "POST");
}

export async function GET(req: Request) {
  return handleProxy(req, "GET");
}

export async function PUT(req: Request) {
  return handleProxy(req, "PUT");
}

export async function DELETE(req: Request) {
  return handleProxy(req, "DELETE");
}

async function handleProxy(req: Request, method: string) {
  const { searchParams } = new URL(req.url);
  const targetUrl = searchParams.get("target");

  if (!targetUrl) {
    return NextResponse.json({ error: "Missing target URL" }, { status: 400 });
  }

  // 🛠 Lấy cookies từ server
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value || "";

  let body;
  if (method !== "GET" && method !== "HEAD") {
    body = await req.text(); // Lấy body request từ client
  }
  // 🛠 Gửi request tới API đích
  const res = await fetch(targetUrl, {
    method,
    headers: {
      Cookie: cookieStore.toString(),
      "Content-Type": req.headers.get("Content-Type") || "application/json",
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
    body,
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
