import { handlError } from "@/components/handle-error";
import PreviewStoreClient from "./preview-store-client";
import { ImagesHomePageResType } from "@/Type/ImagesHomePage";
import { ImagesHomePageAPI } from "@/apiRequest/ImagesHomePageAPI";
import { cookies } from "next/headers";
interface PreviewStoreProps {
  params: { store_id: string };
}
async function getImagesHomePage(store_id: string) {
  let imagesHomePage: ImagesHomePageResType | null = null;
  const accessToken = cookies().get("accessToken")?.value || "";
  const refreshToken = cookies().get("refreshToken")?.value || "";
  try {
    imagesHomePage = await ImagesHomePageAPI.getImagesHomePage({
      store_id,
      accessToken,
      refreshToken,
    });
  } catch (error: any) {
    if (error.statusCode !== 400) {
      handlError({ consoleError: "GET_IMAGESHOMEPAGE_ERROR", error });
    }
  }
  return imagesHomePage;
}

async function PreviewStore({ params }: PreviewStoreProps) {
  const imagesHomePage = await getImagesHomePage(params.store_id);
  return (
    <div>
      <PreviewStoreClient initObjectData={imagesHomePage} />
    </div>
  );
}

export default PreviewStore;
