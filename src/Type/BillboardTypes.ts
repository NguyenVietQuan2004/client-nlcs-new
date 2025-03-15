//////////////////////////////-----BILLBOARD TYPE-----//////////////////////////////

import z from "zod";

export const Billboard = z.object({
  _id: z.string(),
  label: z.string().min(1),
  image: z.string().url(),
  store_id: z.string().min(1), // Mongoose ObjectId sẽ là string trong Zod
  createdAt: z.string(),
  updatedAt: z.string(),
});
//  BILLBOARD BODY TYPE
export const BillboardBody = z.object({
  _id: z.string(),
  accessToken: z.string(),
  refreshToken: z.string(),
});
export type BillboardBodyType = z.TypeOf<typeof BillboardBody>;

//  BILLBOARD RES TYPE
export const BillboardRes = z.object({
  data: Billboard,
  error: z.any(),
  message: z.string(),
  success: z.boolean(),
  statusCode: z.number(),
});
export type BillboardResType = z.TypeOf<typeof BillboardRes>;

// BILLBOARD TYPE
export type BillboardType = z.TypeOf<typeof Billboard>;

//  LIST BILLBOARD BODY TYPE
export const ListBillboardBody = z.object({
  store_id: z.string(),
  accessToken: z.string(),
  refreshToken: z.string(),
});
export type ListBillboardBodyType = z.TypeOf<typeof ListBillboardBody>;

//  LIST BILLBOARD RES TYPE
export const ListBillboardRes = z.object({
  data: z.array(Billboard),
  error: z.any(),
  message: z.string(),
  success: z.boolean(),
  statusCode: z.number(),
});
export type ListBillboardResType = z.TypeOf<typeof ListBillboardRes>;

// CREATE BILLBOARD BODY TYPE
export const CreateBillboardBody = z.object({
  label: z.string(),
  image: z.string(),
  store_id: z.string(),
});
export type CreateBillboardBodyType = z.TypeOf<typeof CreateBillboardBody>;

// CREATE BILLBOARD RES TYPE
export const CreateBillboardRes = z.object({
  data: Billboard,
  error: z.any(),
  message: z.string(),
  success: z.boolean(),
  statusCode: z.number(),
});
export type CreateBillboardResType = z.TypeOf<typeof CreateBillboardRes>;

// UPDATE BILLBOARD RES TYPE
export const UpdateBillboardBody = z.object({
  _id: z.string(),
  label: z.string(),
  image: z.string(),
});
export type UpdateBillboardBodyType = z.TypeOf<typeof UpdateBillboardBody>;
// UPDATE BILLBOARD RES TYPE
export const UpdateBillboardRes = z.object({
  data: Billboard,
  error: z.any(),
  message: z.string(),
  success: z.boolean(),
  statusCode: z.number(),
});
export type UpdateBillboardResType = z.TypeOf<typeof UpdateBillboardRes>;

//  DELETE BILLBOARD BODY TYPE
export const DeleteBillboardBody = z.object({
  _id: z.string(),
});
export type DeleteBillboardBodyType = z.TypeOf<typeof DeleteBillboardBody>;

// DELETE BILLBOARD RES TYPE
export const DeleteBillboardRes = z.object({
  data: Billboard,
  error: z.any(),
  message: z.string(),
  success: z.boolean(),
  statusCode: z.number(),
});
export type DeleteBillboardResType = z.TypeOf<typeof DeleteBillboardRes>;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
