import httpRequest from "@/lib/http";
import {
  BillboardResType,
  BillboardBodyType,
  ListBillboardResType,
  ListBillboardBodyType,
  CreateBillboardResType,
  UpdateBillboardResType,
  DeleteBillboardResType,
  DeleteBillboardBodyType,
  CreateBillboardBodyType,
  UpdateBillboardBodyType,
} from "@/Type/BillboardTypes";

export const billboardAPI = {
  getBillboard(body: BillboardBodyType) {
    return httpRequest.get<BillboardResType>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/billboard?_id=${body._id}`, {
      cache: "no-cache",
      headers: {
        Authorization: `Bearer ${body.accessToken}`,
        "X-Refresh-Token": body.refreshToken,
      },
    });
  },

  getListBillboard(body: ListBillboardBodyType) {
    return httpRequest.get<ListBillboardResType>(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/billboard/get-all?store_id=${body.store_id}`,
      {
        cache: "no-cache",

        headers: {
          Authorization: `Bearer ${body.accessToken}`,
          "X-Refresh-Token": body.refreshToken,
        },
      }
    );
  },

  createBillboard(body: CreateBillboardBodyType) {
    return httpRequest.post<CreateBillboardResType>(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/billboard/create-billboard`,
      {
        body,
      }
    );
  },

  updateBillboard(body: UpdateBillboardBodyType) {
    return httpRequest.put<UpdateBillboardResType>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/billboard`, {
      body,
    });
  },

  deleteBillboard(body: DeleteBillboardBodyType) {
    return httpRequest.delete<DeleteBillboardResType>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/billboard`, {
      body: body,
    });
  },
};
