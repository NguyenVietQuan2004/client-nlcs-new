import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  let accessToken = cookies().get("accessToken")?.value || "";

  if (!accessToken) {
    const authHeader = req.headers.get("authorization");
    accessToken = authHeader?.split(" ")[1] ?? "";
  }

  const response = NextResponse.json({ accessToken });
  response.headers.set("Access-Control-Allow-Credentials", "true"); // Cho phép gửi cookie

  return response;
}
