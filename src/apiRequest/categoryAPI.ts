import httpRequest from "@/lib/http";
import {
  CategoryResType,
  CategoryBodyType,
  ListCategoryResType,
  ListCategoryBodyType,
  CreateCategoryResType,
  UpdateCategoryResType,
  DeleteCategoryResType,
  CreateCategoryBodyType,
  DeleteCategoryBodyType,
  UpdateCategoryBodyType,
} from "@/Type/CategoryTypes";

export const categoryAPI = {
  getCategory(body: CategoryBodyType) {
    return httpRequest.get<CategoryResType>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/category?_id=${body._id}`, {
      headers: {
        cache: "no-cache",

        Authorization: `Bearer ${body.accessToken}`,
        "X-Refresh-Token": body.refreshToken,
      },
    });
  },

  getListCategory(body: ListCategoryBodyType) {
    return httpRequest.get<ListCategoryResType>(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/category/get-all?store_id=${body.store_id}`,
      {
        cache: "no-cache",

        headers: {
          Authorization: `Bearer ${body.accessToken}`,
          "X-Refresh-Token": body.refreshToken,
        },
      }
    );
  },

  createCategory(body: CreateCategoryBodyType) {
    return httpRequest.post<CreateCategoryResType>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/category/create-category`, {
      body,
    });
  },

  updateCategory(body: UpdateCategoryBodyType) {
    return httpRequest.put<UpdateCategoryResType>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/category`, {
      body,
    });
  },

  deleteBillboard(body: DeleteCategoryBodyType) {
    return httpRequest.delete<DeleteCategoryResType>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/category`, {
      body: body,
    });
  },
};
