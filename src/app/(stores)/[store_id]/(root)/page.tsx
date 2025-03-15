import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { storeAPI } from "@/apiRequest/storeAPI";
import { StoreResType } from "@/Type/StoreTypes";
import { orderAPI } from "@/apiRequest/orderAPI";
import { OverviewResType } from "@/Type/OrderTypes";
import { handlError } from "@/components/handle-error";
import DashboardClient from "@/app/(stores)/[store_id]/(root)/dashboard-client";

interface StoreProps {
  params: { store_id: string };
}
async function getStore(store_id: string) {
  let store: StoreResType | null = null;
  let dataOverview: OverviewResType | null = null;
  const cookie = cookies();
  const accessToken = cookie.get("accessToken")?.value || "";
  const refreshToken = cookie.get("refreshToken")?.value || "";
  try {
    store = await storeAPI.getStore({ _id: store_id, accessToken, refreshToken });
    dataOverview = await orderAPI.getOverview({ store_id, accessToken, refreshToken });
  } catch (error) {
    handlError({
      consoleError: "GET_STORE_ERROR ROOT",
      error,
    });
  }
  if (!store?.data || !dataOverview) {
    redirect("/");
  } else {
    return dataOverview;
  }
}

export default async function Store({ params }: StoreProps) {
  const dataOverview = await getStore(params.store_id);
  return (
    <div>
      <DashboardClient dataOverview={dataOverview.data} />
    </div>
  );
}
