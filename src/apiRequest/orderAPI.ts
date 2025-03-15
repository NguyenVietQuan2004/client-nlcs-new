import httpRequest from "@/lib/http";
import {
  ListOrderResType,
  ListOrderBodyType,
  CreateOrderResType,
  DeleteOrderResType,
  CreateOrderBodyType,
  DeleteOrderBodyType,
  OverviewBodyType,
  OverviewResType,
} from "@/Type/OrderTypes";

export const orderAPI = {
  getListOrder(body: ListOrderBodyType) {
    return httpRequest.get<ListOrderResType>(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/order/get-all?store_id=${body.store_id}&timestamp=${Date.now()}`,
      {
        cache: "no-cache",
        headers: {
          Authorization: `Bearer ${body.accessToken}`,
          "X-Refresh-Token": body.refreshToken,
        },
      }
    );
  },

  createOrder(body: CreateOrderBodyType) {
    return httpRequest.post<CreateOrderResType>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/order/create-order`, {
      body,
    });
  },

  updateStatusOrder(body: { order_id: string; is_paid: boolean }) {
    return httpRequest.put<CreateOrderResType>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/order`, {
      body,
    });
  },
  deleteOrder(body: DeleteOrderBodyType) {
    return httpRequest.delete<DeleteOrderResType>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/order`, {
      body: body,
    });
  },
  getOverview(body: OverviewBodyType) {
    return httpRequest.get<OverviewResType>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/order?store_id=${body.store_id}`, {
      headers: {
        Authorization: `Bearer ${body.accessToken}`,
        "X-Refresh-Token": body.refreshToken,
      },
      cache: "no-cache",
    });
  },
};
