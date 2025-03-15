import { productAPI } from "@/apiRequest/productAPI";
import { handlError } from "@/components/handle-error";
import { ListProductResType } from "@/Type/ProductType";
import ProductsClient from "@/app/(stores)/[store_id]/products/products-client";
import { cookies } from "next/headers";

interface ProductsProps {
  params: { store_id: string };
}

async function getProducts(store_id: string) {
  let products: ListProductResType | null = null;
  const accessToken = cookies().get("accessToken")?.value || "";
  const refreshToken = cookies().get("refreshToken")?.value || "";
  try {
    products = await productAPI.getListProduct({ store_id, accessToken, refreshToken });
  } catch (error) {
    handlError({ consoleError: "GET_ALL_PRODUCT", error });
  }
  return products;
}

export default async function Products({ params }: ProductsProps) {
  const products = await getProducts(params.store_id);
  return (
    <div>
      <ProductsClient listObjectProduct={products} />
    </div>
  );
}
