// import { NextResponse } from "next/server";
// import { cookies } from "next/headers";

// export async function GET() {
//   const cookieStore = cookies();
//   const accessToken = cookieStore.get("accessToken")?.value;
//   console.log(accessToken, "bb");

//   return NextResponse.json({ accessToken });
// }
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  // Lấy accessToken từ Cookie
  let accessToken = cookies().get("accessToken")?.value || "";

  // Nếu không có trong Cookie, thử lấy từ Authorization header
  if (!accessToken) {
    const authHeader = req.headers.get("authorization");
    accessToken = authHeader?.split(" ")[1] ?? ""; // Bỏ "Bearer " nếu có
  }

  const response = NextResponse.json({ accessToken });
  response.headers.set("Access-Control-Allow-Credentials", "true"); // Cho phép gửi cookie

  return response;
}
