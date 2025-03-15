import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  // Lấy refreshToken từ Cookie
  let refreshToken = cookies().get("refreshToken")?.value || "";

  // Nếu không có trong Cookie, thử lấy từ Authorization header
  if (!refreshToken) {
    refreshToken = req.headers.get("x-refresh-token") ?? "";
  }

  const response = NextResponse.json({ refreshToken });
  response.headers.set("Access-Control-Allow-Credentials", "true"); // Cho phép gửi cookie

  return response;
}
