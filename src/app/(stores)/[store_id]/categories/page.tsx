import { categoryAPI } from "@/apiRequest/categoryAPI";
import { handlError } from "@/components/handle-error";
import { ListCategoryResType } from "@/Type/CategoryTypes";
import CategoriesClient from "@/app/(stores)/[store_id]/categories/categories-client";
import { cookies } from "next/headers";

interface CategoriesProps {
  params: { store_id: string };
}
async function getCategories(store_id: string) {
  let categories: ListCategoryResType | null = null;
  const accessToken = cookies().get("accessToken")?.value || "";
  const refreshToken = cookies().get("refreshToken")?.value || "";
  try {
    categories = await categoryAPI.getListCategory({ store_id, accessToken, refreshToken });
  } catch (error) {
    handlError({
      consoleError: "GET_ALL_CATEGORY_ERROR",
      error,
    });
  }
  return categories;
}

export default async function Categories({ params }: CategoriesProps) {
  const categories = await getCategories(params.store_id);
  return (
    <div>
      <CategoriesClient listObjectCategory={categories} />
    </div>
  );
}
