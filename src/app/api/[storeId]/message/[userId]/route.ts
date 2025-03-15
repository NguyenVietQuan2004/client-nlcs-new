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
export async function GET(req: NextRequest, { params }: { params: { store_id: string; userId: string } }) {
  let data;
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/message/${params.userId}`);
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
