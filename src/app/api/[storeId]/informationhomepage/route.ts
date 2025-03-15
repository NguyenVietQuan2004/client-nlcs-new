import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { storeId: string } }) {
  let ImagesHomePage;
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/homepage?store_id=${params.storeId}`, {
      cache: "no-cache",
      headers: {
        Authorization: `Bearer APIKEY`,
      },
    });
    ImagesHomePage = await response.json();
  } catch (error) {
    return new NextResponse("ROUTEHANDLER_IMAGESHOMEPAGE_ERROR", { status: 500 });
  }
  return Response.json({ ...ImagesHomePage });
}
