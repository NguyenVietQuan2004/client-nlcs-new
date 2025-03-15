//////////////////////////////-----STORE TYPE-----//////////////////////////////

import z from "zod";

const Store = z.object({
  _id: z.string(),
  name: z.string(),
  user_id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// STORE BODY TYPE
export const StoreBody = z.object({
  _id: z.string(),
  accessToken: z.string(),
  refreshToken: z.string(),
});
export type StoreBodyType = z.TypeOf<typeof StoreBody>;

//  STORE RES TYPE
export const StoreRes = z.object({
  data: Store,
  error: z.any(),
  message: z.string(),
  success: z.boolean(),
  statusCode: z.number(),
});
export type StoreResType = z.TypeOf<typeof StoreRes>;

// LIST STORE BODY TYPE
export const LitStoreBody = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});
export type LitStoreBodyType = z.TypeOf<typeof LitStoreBody>;

// LIST STORE RES TYPE
export const ListStoreRes = z.object({
  data: z.array(Store),
  error: z.any(),
  message: z.string(),
  success: z.boolean(),
  statusCode: z.number(),
});
export type ListStoreResType = z.TypeOf<typeof ListStoreRes>;

//  CREATE STORE BODY TYPE
export const CreateStoreBody = z.object({
  name: z.string(),
});
export type CreateStoreBodyType = z.TypeOf<typeof CreateStoreBody>;

//  CREATE STORE RES TYPE
export const CreateStoreRes = z.object({
  data: Store,
  error: z.any(),
  message: z.string(),
  success: z.boolean(),
  statusCode: z.number(),
});
export type CreateStoreResType = z.TypeOf<typeof CreateStoreRes>;

//  UPDATE STORE BODY TYPE
export const UpdateStoreBody = z.object({
  _id: z.string(),
  name: z.string(),
});
export type UpdateStoreBodyType = z.TypeOf<typeof UpdateStoreBody>;

//  UPDATE STORE RES TYPE
export const UpdateStoreRes = z.object({
  data: Store,
  error: z.any(),
  message: z.string(),
  success: z.boolean(),
  statusCode: z.number(),
});
export type UpdateStoreResType = z.TypeOf<typeof UpdateStoreRes>;

//  DELETE STORE BODY TYPE
export const DeleteStoreBody = z.object({
  _id: z.string(),
});
export type DeleteStoreBodyType = z.TypeOf<typeof DeleteStoreBody>;

//  UPDATE STORE RES TYPE
export const DeleteStoreRes = z.object({
  data: Store,
  error: z.any(),
  message: z.string(),
  success: z.boolean(),
  statusCode: z.number(),
});
export type DeleteStoreResType = z.TypeOf<typeof DeleteStoreRes>;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
