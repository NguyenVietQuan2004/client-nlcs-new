import { handlError } from "@/components/handle-error";
import { billboardAPI } from "@/apiRequest/billboardAPI";
import { BillboardResType } from "@/Type/BillboardTypes";
import BillboardForm from "@/app/(stores)/[store_id]/billboards/[billboardId]/billboard-id-form";
import { cookies } from "next/headers";

interface BillboardIdProps {
  params: { store_id: string; billboardId: string };
}
async function getBillboard(store_id: string, billboardId: string) {
  let billboard: BillboardResType | null = null;
  const accessToken = cookies().get("accessToken")?.value || "";
  const refreshToken = cookies().get("refreshToken")?.value || "";
  try {
    billboard = await billboardAPI.getBillboard({
      _id: billboardId,
      accessToken,
      refreshToken,
    });
  } catch (error: any) {
    if (error.statusCode !== 400) {
      handlError({ consoleError: "GET_BILLBOSRD_ERROR", error });
    }
  }
  return billboard;
}

async function BillboardId({ params }: BillboardIdProps) {
  const billboard = await getBillboard(params.store_id, params.billboardId);
  return (
    <div>
      <BillboardForm initObjectData={billboard} />
    </div>
  );
}

export default BillboardId;
