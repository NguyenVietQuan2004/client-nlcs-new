import { cookies } from "next/headers";

import { orderAPI } from "@/apiRequest/orderAPI";
import { ListOrderResType } from "@/Type/OrderTypes";
import { handlError } from "@/components/handle-error";
import OrdersClient from "@/app/(stores)/[store_id]/orders/orders-client";

interface OrdersProps {
  params: { store_id: string };
}

async function getOrders(store_id: string) {
  let orders: ListOrderResType | null = null;

  try {
    const accessToken = cookies().get("accessToken")?.value || "";
    const refreshToken = cookies().get("refreshToken")?.value || "";
    orders = await orderAPI.getListOrder({ store_id, accessToken, refreshToken });
  } catch (error) {
    handlError({ consoleError: "GET_ALL_ORDER", error });
  }
  return orders;
}

export default async function Orders({ params }: OrdersProps) {
  const orders = await getOrders(params.store_id);
  return (
    <div>
      <OrdersClient listObjectOrder={orders} />
    </div>
  );
}
