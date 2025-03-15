import queryString from "query-string";
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

export async function GET(req: NextRequest, { params }: { params: { storeId: string } }) {
  const searchParams = req.nextUrl.searchParams;
  const query: any = {
    store_id: params.storeId,
    isArchive: false,
  };

  // nếu ko truyền lên gì thì sẽ chuyển về null có truyền lên thì lấy value, null thì ko truyền lên server ko cần xử lí vì skip null
  Array.from(searchParams.entries()).forEach(([key, value]) => {
    query[key] = value === "undefined" ? null : value;
  });
  query["limit"] = searchParams.get("limit");
  query["page"] = searchParams.get("page");

  const url = queryString.stringifyUrl(
    {
      url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/product/get-all`,
      query,
    },
    { skipNull: true }
  );
  let listProductRes;
  try {
    const response = await fetch(url, {
      cache: "no-cache",
    });
    listProductRes = await response.json();
  } catch (error) {
    return new NextResponse("ROUTEHANDLER_PRODUCTS_ERROR", { status: 500 });
  }
  return Response.json(
    { ...listProductRes },
    {
      headers: corsHeader,
    }
  );
}

export async function POST(req: NextRequest, { params }: { params: { store_id: string } }) {
  const body = await req.json();
  let listProductRes;
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/product/get-by-ids`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json", // Thêm header Content-Type
      },
    });
    listProductRes = await response.json();
  } catch (error) {
    return new NextResponse("ROUTEHANDLER_PRODUCTSID_ERROR", { status: 500 });
  }
  return Response.json(
    { ...listProductRes },
    {
      headers: corsHeader,
    }
  );
}
