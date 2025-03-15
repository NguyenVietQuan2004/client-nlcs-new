//////////////////////////////-----CATEGORY TYPE-----//////////////////////////////

import z from "zod";
import { Billboard } from "@/Type/BillboardTypes";

export const Category = z.object({
  _id: z.string(),
  name: z.string().min(1),
  store_id: z.string().min(1),
  attributes: z
    .array(
      z.object({
        name: z.string().min(1),
        values: z.array(z.string()).default([]),
      })
    )
    .default([]),
  createdAt: z.string(),
  updatedAt: z.string(),
});
//  CATEGORY BODY TYPE
export const CategoryBody = z.object({
  _id: z.string(),
  accessToken: z.string(),
  refreshToken: z.string(),
});
export type CategoryBodyType = z.TypeOf<typeof CategoryBody>;

//  CATEGORY RES TYPE
export const CategoryRes = z.object({
  // data: z.object({
  //   category: Category,
  //   listBillboard: z.array(Billboard),
  // }),
  data: Category,
  error: z.any(),
  message: z.string(),
  success: z.boolean(),
  statusCode: z.number(),
});
export type CategoryResType = z.TypeOf<typeof CategoryRes>;

// CATEGORT TYPE

export type CategoryType = z.TypeOf<typeof Category>;

// LIST CATEGORY BODY TYPE
export const ListCategoryBody = z.object({
  store_id: z.string(),
  accessToken: z.string(),
  refreshToken: z.string(),
});
export type ListCategoryBodyType = z.TypeOf<typeof ListCategoryBody>;

// LIST CATEGORY RES TYPE
export const ListCategoryRes = z.object({
  data: z.array(Category),
  error: z.any(),
  message: z.string(),
  success: z.boolean(),
  statusCode: z.number(),
});
export type ListCategoryResType = z.TypeOf<typeof ListCategoryRes>;

//  CREATE CATEGORY BODY TYPE
export const CreateCategoryBody = z.object({
  store_id: z.string(),
  name: z.string(),
});
export type CreateCategoryBodyType = z.TypeOf<typeof CreateCategoryBody>;

//  CREATE CATEGORY RES TYPE
export const CreateCategoryRes = z.object({
  data: Category,
  error: z.any(),
  message: z.string(),
  success: z.boolean(),
  statusCode: z.number(),
});
export type CreateCategoryResType = z.TypeOf<typeof CreateCategoryRes>;

/// UPDATE CATEGORY BODY TYPE
export const UpdateCategoryBody = z.object({
  _id: z.string(),
  name: z.string(),
});
export type UpdateCategoryBodyType = z.TypeOf<typeof UpdateCategoryBody>;

/// UPDATE CATEGORY RES TYPE
export const UpdateCategoryRes = z.object({
  data: Category,
  error: z.any(),
  message: z.string(),
  success: z.boolean(),
  statusCode: z.number(),
});
export type UpdateCategoryResType = z.TypeOf<typeof UpdateCategoryRes>;

/// DELETE CATEGORY BODY TYPE
export const DeleteCategoryBody = z.object({
  _id: z.string(),
});
export type DeleteCategoryBodyType = z.TypeOf<typeof DeleteCategoryBody>;

/// DELETE CATEGORY RES TYPE
export const DeleteCategoryRes = z.object({
  data: Category,
  error: z.any(),
  message: z.string(),
  success: z.boolean(),
  statusCode: z.number(),
});
export type DeleteCategoryResType = z.TypeOf<typeof DeleteCategoryRes>;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
