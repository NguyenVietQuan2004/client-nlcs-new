import httpRequest from "@/lib/http";
import {
  CreateImagesHomePageBodyType,
  CreateImagesHomePageResType,
  ImagesHomePageBodyType,
  ImagesHomePageResType,
  UpdateImagesHomePageBodyType,
  UpdateImagesHomePageResType,
} from "@/Type/ImagesHomePage";

export const ImagesHomePageAPI = {
  getImagesHomePage(body: ImagesHomePageBodyType) {
    return httpRequest.get<ImagesHomePageResType>(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/homepage?store_id=${body.store_id}`,
      {
        cache: "no-cache",

        headers: {
          Authorization: `Bearer ${body.accessToken}`,
          "X-Refresh-Token": body.refreshToken,
        },
      }
    );
  },
  createImagesHomePage(body: CreateImagesHomePageBodyType) {
    return httpRequest.post<CreateImagesHomePageResType>(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/homepage/create-homepage`,
      {
        body,
      }
    );
  },
  updateImagesHomePage(body: UpdateImagesHomePageBodyType) {
    return httpRequest.put<UpdateImagesHomePageResType>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/homepage`, {
      body,
    });
  },
};
