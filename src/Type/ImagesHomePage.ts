//////////////////////////////-----ImagesHomePage TYPE-----//////////////////////////////

import z from "zod";
import { Product } from "./ProductType";

export const ImagesHomePage = z.object({
  _id: z.string(),
  billboard_feature: z.array(z.string()),
  billboard_banner: z.string().url(),
  background_insurance: z.string().url(),
  store_id: z.string().min(1),
  createdAt: z.string(),
  updatedAt: z.string(),
});

//  ImagesHomePage BODY TYPE
export const ImagesHomePageBody = z.object({
  store_id: z.string(),
  accessToken: z.string(),
  refreshToken: z.string(),
});
export type ImagesHomePageBodyType = z.TypeOf<typeof ImagesHomePageBody>;

//  ImagesHomePage RES TYPE
export const ImagesHomePageRes = z.object({
  data: z.object({
    ImagesHomePage,
    listProductNewDiscover: z.array(Product),
    listProductMostPopular: z.array(Product),
    productBestSeller: z.array(Product),
    productHighestSales: z.array(Product),
  }),
  // data: ImagesHomePage,
  error: z.any(),
  message: z.string(),
  success: z.boolean(),
  statusCode: z.number(),
});
export type ImagesHomePageResType = z.TypeOf<typeof ImagesHomePageRes>;

// CREATE ImagesHomePage BODY TYPE
export const CreateImagesHomePageBody = z.object({
  store_id: z.string(),
  billboard_banner: z.string(),
  billboard_feature: z.array(z.string()),
  background_insurance: z.string(),
});
export type CreateImagesHomePageBodyType = z.TypeOf<typeof CreateImagesHomePageBody>;

// CREATE ImagesHomePage RES TYPE
export const CreateImagesHomePageRes = z.object({
  data: ImagesHomePage,
  error: z.any(),
  message: z.string(),
  success: z.boolean(),
  statusCode: z.number(),
});
export type CreateImagesHomePageResType = z.TypeOf<typeof CreateImagesHomePageRes>;

// UPDATE ImagesHomePage RES TYPE
export const UpdateImagesHomePageBody = z.object({
  store_id: z.string(),
  billboard_banner: z.string(),
  billboard_feature: z.array(z.string()),
  background_insurance: z.string(),
});
export type UpdateImagesHomePageBodyType = z.TypeOf<typeof UpdateImagesHomePageBody>;

// UPDATE ImagesHomePage RES TYPE
export const UpdateImagesHomePageRes = z.object({
  data: ImagesHomePage,
  error: z.any(),
  message: z.string(),
  success: z.boolean(),
  statusCode: z.number(),
});
export type UpdateImagesHomePageResType = z.TypeOf<typeof UpdateImagesHomePageRes>;

// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
