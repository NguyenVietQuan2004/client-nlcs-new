import httpRequest from "@/lib/http";

import {
  ProductResType,
  ProductBodyType,
  ListProductResType,
  ListProductBodyType,
  UpdateProductResType,
  DeleteProductResType,
  CreateProductResType,
  DeleteProductBodyType,
  UpdateProductBodyType,
  CreateProductBodyType,
} from "@/Type/ProductType";

export const productAPI = {
  getProduct(body: ProductBodyType) {
    return httpRequest.get<ProductResType>(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/product?_id=${body._id}&store_id=${body.store_id}`,
      {
        cache: "no-cache",

        headers: {
          Authorization: `Bearer ${body.accessToken}`,
          "X-Refresh-Token": body.refreshToken,
        },
      }
    );
  },

  getListProduct(body: ListProductBodyType) {
    return httpRequest.get<ListProductResType>(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/product/get-all?store_id=${body.store_id}`,
      {
        cache: "no-cache",

        headers: {
          Authorization: `Bearer ${body.accessToken}`,
          "X-Refresh-Token": body.refreshToken,
        },
      }
    );
  },

  createProduct(body: CreateProductBodyType) {
    return httpRequest.post<CreateProductResType>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/product/create-product`, {
      body,
    });
  },

  updateProduct(body: UpdateProductBodyType) {
    return httpRequest.put<UpdateProductResType>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/product`, {
      body,
    });
  },

  deleteProduct(body: DeleteProductBodyType) {
    return httpRequest.delete<DeleteProductResType>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/product`, {
      body: body,
    });
  },
};
