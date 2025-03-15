import { handlError } from "@/components/handle-error";
import { billboardAPI } from "@/apiRequest/billboardAPI";
import { ListBillboardResType } from "@/Type/BillboardTypes";
import BillboardsClient from "@/app/(stores)/[store_id]/billboards/billboards-client";
import { cookies } from "next/headers";

interface BillboardsProps {
  params: { store_id: string };
}

async function getBillboards(store_id: string) {
  let billboards: ListBillboardResType | null = null;
  const accessToken = cookies().get("accessToken")?.value || "";
  const refreshToken = cookies().get("refreshToken")?.value || "";
  try {
    billboards = await billboardAPI.getListBillboard({ store_id, accessToken, refreshToken });
  } catch (error) {
    handlError({ consoleError: "GET_ALL_BILLBOARD", error });
  }
  return billboards;
}

export default async function Billboards({ params }: BillboardsProps) {
  const billboards: ListBillboardResType | null = await getBillboards(params.store_id);
  return (
    <div>
      <BillboardsClient listObjectBillboard={billboards} />
    </div>
  );
}
