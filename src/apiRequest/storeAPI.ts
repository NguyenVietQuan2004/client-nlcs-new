import httpRequest from "@/lib/http";
import {
  StoreResType,
  StoreBodyType,
  ListStoreResType,
  LitStoreBodyType,
  CreateStoreResType,
  UpdateStoreResType,
  DeleteStoreResType,
  CreateStoreBodyType,
  UpdateStoreBodyType,
  DeleteStoreBodyType,
} from "@/Type/StoreTypes";

export const storeAPI = {
  getStore(body: StoreBodyType) {
    return httpRequest.get<StoreResType>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/store?_id=${body._id}`, {
      headers: {
        Authorization: `Bearer ${body.accessToken}`,
        "X-Refresh-Token": body.refreshToken,
      },
      cache: "no-cache",
    });
  },

  getListStore(body: LitStoreBodyType) {
    return httpRequest.get<ListStoreResType>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/store/get-all`, {
      headers: {
        Authorization: `Bearer ${body.accessToken}`,
        "X-Refresh-Token": body.refreshToken,
      },
      cache: "no-cache",
    });
  },

  createStore(body: CreateStoreBodyType) {
    return httpRequest.post<CreateStoreResType>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/store/create-store`, {
      body,
    });
  },

  updateStore(body: UpdateStoreBodyType) {
    return httpRequest.put<UpdateStoreResType>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/store`, {
      body: body,
    });
  },
  deleteStore(body: DeleteStoreBodyType) {
    return httpRequest.delete<DeleteStoreResType>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/store`, {
      body: body,
    });
  },
};
