import { NextRequest, NextResponse } from "next/server";

const corsHeader = {
  "Access-Control-Allow-Origin": "*", // Hoặc thay thế bằng domain frontend của bạn
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Handle CORS preflight request
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeader });
}

// API GET để lấy đơn hàng của user
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const user_id = searchParams.get("user_id");

  if (!user_id) {
    return NextResponse.json({ error: "Missing user_id" }, { status: 400, headers: corsHeader });
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/order/user?user_id=${user_id}`, {
      cache: "no-cache",
      headers: {
        Authorization: `Bearer APIKEY`,
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch user order" },
        { status: response.status, headers: corsHeader }
      );
    }

    const userOrder = await response.json();
    console.log(userOrder);

    return NextResponse.json(userOrder, { headers: corsHeader });
  } catch (error) {
    return NextResponse.json({ error: "ROUTEHANDLER_userOrder_ERROR" }, { status: 500, headers: corsHeader });
  }
}
