import { NextRequest, NextResponse } from "next/server";

const corsHeader = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: corsHeader,
    }
  );
}

export async function POST(req: NextRequest, { params }: { params: { store_id: string } }) {
  const body = await req.json();
  let data;
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/message`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    data = await response.json();
  } catch (error) {
    return new NextResponse("ROUTEHANDLER_PRODUCTSID_ERROR", { status: 500 });
  }
  return Response.json(
    { ...data },
    {
      headers: corsHeader,
    }
  );
}
