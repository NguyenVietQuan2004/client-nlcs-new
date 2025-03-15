import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { storeAPI } from "@/apiRequest/storeAPI";
import { StoreResType } from "@/Type/StoreTypes";
import { handlError } from "@/components/handle-error";
import SettingForm from "@/app/(stores)/[store_id]/settings/setting-form";

interface SettingsProps {
  params: { store_id: string };
}
async function getStore(store_id: string) {
  let store: StoreResType | null = null;
  const cookie = cookies();
  const accessToken = cookie.get("accessToken")?.value || "";
  const refreshToken = cookie.get("refreshToken")?.value || "";
  try {
    store = (await storeAPI.getStore({ _id: store_id, accessToken, refreshToken })) || null;
  } catch (error) {
    handlError({ consoleError: "GET_STORE_ERROR", error });
  }
  if (!store?.data) {
    redirect("/");
  } else {
    return store;
  }
}

export default async function Settings({ params }: SettingsProps) {
  let store: StoreResType;
  store = await getStore(params.store_id);
  return (
    <div>
      <SettingForm initData={store} />
    </div>
  );
}
