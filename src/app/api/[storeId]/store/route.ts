import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { storeId: string } }) {
  let store;
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/store?_id=${params.storeId}`, {
      cache: "no-cache",
    });
    store = await response.json();
  } catch (error) {
    return new NextResponse("ROUTEHANDLER_store_ERROR", { status: 500 });
  }
  return Response.json({ ...store });
}
