//////////////////////////////-----ORDER TYPE-----//////////////////////////////

import z from "zod";
import { Product } from "@/Type/ProductType";

const OrderItemSchema = z.object({
  order_id: z.string(),
  product_variant_id: z.string(),
  quantity: z.number().min(1),
  snapshot_price: z.number().min(0),
  product: Product,
});

//ORDER DATA
const Order = z.object({
  _id: z.string(),
  user_id: z.string(),
  store_id: z.string(),
  is_paid: z.boolean().default(false),
  paid_at: z.date().optional(),
  phone: z.string().min(1),
  address: z.string().min(1),
  order_items: z.array(OrderItemSchema),
  createdAt: z.string(),
  updatedAt: z.string(),
});

//  ORDER BODY TYPE
export const OrderBody = z.object({
  _id: z.string(),
  sessionToken: z.string(),
  store_id: z.string(),
});
export type OrderBodyType = z.TypeOf<typeof OrderBody>;

//  ORDER RES TYPE
export const OrderRes = z.object({
  data: Order,
  error: z.any(),
  message: z.string(),
  success: z.boolean(),
  statusCode: z.number(),
});
export type OrderResType = z.TypeOf<typeof OrderRes>;

// ORDER TYPE
export type OrderType = z.TypeOf<typeof Order>;

// LIST ORDER BODY TYPE
export const ListOrderBody = z.object({
  store_id: z.string(),
  accessToken: z.string(),
  refreshToken: z.string(),
});
export type ListOrderBodyType = z.TypeOf<typeof ListOrderBody>;

// LIST ORDER RES TYPE
export const ListOrderRes = z.object({
  data: z.array(Order),
  error: z.any(),
  message: z.string(),
  success: z.boolean(),
  statusCode: z.number(),
});
export type ListOrderResType = z.TypeOf<typeof ListOrderRes>;

//  CREATE ORDER BODY TYPE
///////////////////////////////////////// casi nayf chua chinh
export const CreateOrderBody = z.object({
  store_id: z.string(),
  phone: z.string(),
  address: z.string(),
  is_paid: z.boolean(),
  listProductOrder: z.array(z.string()),
});
export type CreateOrderBodyType = z.TypeOf<typeof CreateOrderBody>;

//  CREATE ORDER RES TYPE
export const CreateOrderRes = z.object({
  data: Order,
  error: z.any(),
  message: z.string(),
  success: z.boolean(),
  statusCode: z.number(),
});
export type CreateOrderResType = z.TypeOf<typeof CreateOrderRes>;

// DELETE ORDER BODY TYPE
export const DeleteOrderBody = z.object({
  order_id: z.string(),
});
export type DeleteOrderBodyType = z.TypeOf<typeof DeleteOrderBody>;

/// DELETE ORDER RES TYPE
export const DeleteOrderRes = z.object({
  data: Order,
  error: z.any(),
  message: z.string(),
  success: z.boolean(),
  statusCode: z.number(),
});
export type DeleteOrderResType = z.TypeOf<typeof DeleteOrderRes>;

// GET OVERVIEW BODY TYPE

export const OverviewBody = z.object({
  store_id: z.string(),
  accessToken: z.string(),
  refreshToken: z.string(),
});
export type OverviewBodyType = z.TypeOf<typeof OverviewBody>;

// OVERVIEW RES TYPE
export const OverviewRes = z.object({
  data: z.object({
    listOrderPaid: z.array(Order),
    countProductsInStock: z.number(),
  }),
  error: z.any(),
  message: z.string(),
  success: z.boolean(),
  statusCode: z.number(),
});
export type OverviewResType = z.TypeOf<typeof OverviewRes>;

export const productOrder = z.object({
  order_id: z.string(),
  product_variant_id: z.string(),
  quantity: z.number().min(1),
  snapshot_price: z.number().min(0),
  product: Product,
});
export type productOrderType = z.TypeOf<typeof productOrder>;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
