import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { storeAPI } from "@/apiRequest/storeAPI";
import UserAvatar from "@/components/user-avatar";
import { ListStoreResType } from "@/Type/StoreTypes";
import { handlError } from "@/components/handle-error";
import Drawer from "@/app/(stores)/[store_id]/_navbar/drawer";
import ListRoute from "@/app/(stores)/[store_id]/_navbar/List-route";
import DropDownStore from "@/app/(stores)/[store_id]/_navbar/drop-down";

async function MainNavbar() {
  let stores: ListStoreResType | null = null;
  try {
    const accessToken = cookies().get("accessToken")?.value || "";
    const refreshToken = cookies().get("refreshToken")?.value || "";
    stores = await storeAPI.getListStore({ accessToken, refreshToken });
  } catch (error) {
    handlError({ consoleError: "GET_ALL_STORE", error });
  }
  if (stores?.data.length === 0 || !stores) {
    redirect("/");
  }
  return (
    <div className="p-4 border-b  items-center flex justify-between">
      <Drawer />
      <div className="lg:mr-8">
        <DropDownStore listStore={stores} />
      </div>
      <div className="items-center  justify-between hidden lg:flex">
        <ListRoute />
      </div>
      <div className="ml-0 lg:ml-auto">
        <UserAvatar />
      </div>
    </div>
  );
}

export default MainNavbar;
