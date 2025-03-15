import { categoryAPI } from "@/apiRequest/categoryAPI";
import { CategoryResType } from "@/Type/CategoryTypes";
import { handlError } from "@/components/handle-error";
import CategoryForm from "@/app/(stores)/[store_id]/categories/[categoryId]/category-id-form";
import { cookies } from "next/headers";

interface CategoryIdProps {
  params: { store_id: string; categoryId: string };
}

async function getCategory(store_id: string, categoryId: string) {
  let category: CategoryResType | null = null;
  const accessToken = cookies().get("accessToken")?.value || "";
  const refreshToken = cookies().get("refreshToken")?.value || "";
  try {
    category = await categoryAPI.getCategory({ _id: categoryId, accessToken, refreshToken });
  } catch (error: any) {
    if (error.statusCode === 400) {
      category = error;
    } else {
      handlError({ consoleError: "GET_CATEGORY_ERROR", error });
    }
  }
  return category;
}

export default async function CategoryId({ params }: CategoryIdProps) {
  const category: CategoryResType | null = await getCategory(params.store_id, params.categoryId);
  return (
    <div>
      <CategoryForm initObjectData={category} />
    </div>
  );
}
