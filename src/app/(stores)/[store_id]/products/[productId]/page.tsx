import { ProductResType } from "@/Type/ProductType";
import { productAPI } from "@/apiRequest/productAPI";
import { handlError } from "@/components/handle-error";
import ProductForm from "@/app/(stores)/[store_id]/products/[productId]/product-id-form";
import { cookies } from "next/headers";

interface ProductIdProps {
  params: { store_id: string; productId: string };
}

async function getProduct(store_id: string, productId: string) {
  let product: ProductResType | null = null;
  const accessToken = cookies().get("accessToken")?.value || "";
  const refreshToken = cookies().get("refreshToken")?.value || "";
  try {
    product = await productAPI.getProduct({
      _id: productId,
      accessToken,
      refreshToken,
      store_id,
    });
  } catch (error: any) {
    if (error.statusCode === 400) {
      product = error;
    } else {
      handlError({ consoleError: "GET_PRODUCT_ERROR", error });
    }
  }
  return product;
}

async function ProductId({ params }: ProductIdProps) {
  const product = await getProduct(params.store_id, params.productId);
  return (
    <div>
      <ProductForm initObjectData={product} />
    </div>
  );
}

export default ProductId;
