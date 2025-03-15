import { NextResponse, type NextRequest } from "next/server";
export async function GET(req: NextRequest, { params }: { params: { storeId: string; productId: string } }) {
  const searchParams = req.nextUrl.searchParams;
  const categoryId = searchParams.get("categoryId");

  let product;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/product?_id=${params.productId}&store_id=${params.storeId}&categoryId=${categoryId}`,
      {
        cache: "no-cache",
      }
    );
    product = await response.json();
  } catch (error) {
    return new NextResponse("ROUTEHANDLER_PRODUCTID_ERROR", { status: 500 });
  }
  return Response.json({ ...product });
}
