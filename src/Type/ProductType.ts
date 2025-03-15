//////////////////////////////-----PRODUCT TYPE-----//////////////////////////////

import z from "zod";
import { Category } from "@/Type/CategoryTypes";

const ProductVariantSchema = z.object({
  _id: z.string(),
  product_id: z.string(),
  sku: z.string().min(1),
  price: z.number().min(0),
  stock: z.number().default(0),
  sold: z.number().default(0),
  variant_values: z.record(z.string(), z.string()),
});
const CategorySchema = z.object({
  name: z.string().min(1),
  store_id: z.string(),
  attributes: z
    .array(
      z.object({
        name: z.string().min(1),
        values: z.array(z.string()).default([]),
      })
    )
    .default([]),
});

export const Product = z.object({
  _id: z.string(),
  name: z.string().min(1),
  search_keywords: z.array(z.string()).default([]),
  description: z.string().optional(),
  store_id: z.string(),
  category_id: z.string(),
  category: Category,
  is_featured: z.boolean().default(false),
  is_archived: z.boolean().default(false),
  images: z.array(z.string()).default([]),
  sales: z.number().default(0),
  variants: z
    .array(
      z.object({
        name: z.string().min(1),
        values: z.array(z.string().min(1)),
      })
    )
    .default([]),
  product_variants: z.array(ProductVariantSchema),
  createdAt: z.date(),
  updatedAt: z.date(),
});

//  PRODUCT BODY TYPE
export const ProductBody = z.object({
  _id: z.string(),
  accessToken: z.string(),
  refreshToken: z.string(),
  store_id: z.string(),
});
export type ProductBodyType = z.TypeOf<typeof ProductBody>;

//  PRODUCT RES TYPE
export const ProductRes = z.object({
  data: z.object({
    product: Product,
    listCategory: z.array(Category),
    productsRelative: z.array(Product),
  }),
  error: z.any(),
  message: z.string(),
  success: z.boolean(),
  statusCode: z.number(),
});
export type ProductResType = z.TypeOf<typeof ProductRes>;

// PRODUCT TYPE

export type ProductType = z.TypeOf<typeof Product>;

// LIST PRODUCT BODY TYPE
export const ListProductBody = z.object({
  store_id: z.string(),
  accessToken: z.string(),
  refreshToken: z.string(),
});
export type ListProductBodyType = z.TypeOf<typeof ListProductBody>;

// LIST PRODUCT RES TYPE
export const ListProductRes = z.object({
  data: z.object({
    listProduct: z.array(Product),
    totalProduct: z.number(),
  }),
  error: z.any(),
  message: z.string(),
  success: z.boolean(),
  statusCode: z.number(),
});
export type ListProductResType = z.TypeOf<typeof ListProductRes>;

//  CREATE PRODUCT BODY TYPE
export const CreateProductBody = z.object({
  name: z.string().trim().min(3).max(255),
  search_keywords: z.array(z.string().trim()).default([]),
  description: z.string().trim().min(10),
  store_id: z.string(),
  category_id: z.string(),
  is_featured: z.boolean().default(false),
  is_archived: z.boolean().default(false),
  sales: z.number().default(0),
  images: z.array(z.string().trim().url()).default([]),
  variants: z
    .array(
      z.object({
        name: z.string().trim().min(1),
        values: z.array(z.string().trim().min(1)).min(1),
      })
    )
    .default([]),
  product_variants: z
    .array(
      z.object({
        _id: z.string().optional(),
        sku: z
          .string()
          .trim()
          .regex(/^[a-zA-Z0-9_-]+$/, {
            message: "SKU must contain only letters, numbers, hyphens, or underscores.",
          }),
        price: z.number().gt(0),
        stock: z.number().min(0).default(0),
        variant_values: z.record(z.string(), z.string()),
      })
    )
    .min(1),
});
export type CreateProductBodyType = z.TypeOf<typeof CreateProductBody>;

//  CREATE PRODUCT RES TYPE
export const CreateProductRes = z.object({
  data: Product,
  error: z.any(),
  message: z.string(),
  success: z.boolean(),
  statusCode: z.number(),
});
export type CreateProductResType = z.TypeOf<typeof CreateProductRes>;

/// UPDATE PRODUCT BODY TYPE
export const UpdateProductBody = z.object({
  _id: z.string(),
  name: z.string().trim().min(3).max(255),
  search_keywords: z.array(z.string().trim()).default([]),
  description: z.string().trim().min(10),
  store_id: z.string(),
  category_id: z.string(),
  is_featured: z.boolean().default(false),
  is_archived: z.boolean().default(false),
  sales: z.number().default(0),
  images: z.array(z.string().trim().url()).default([]),
  variants: z
    .array(
      z.object({
        name: z.string().trim().min(1),
        values: z.array(z.string().trim().min(1)).min(1),
      })
    )
    .default([]),
  product_variants: z
    .array(
      z.object({
        _id: z.string().optional(),
        sku: z
          .string()
          .trim()
          .regex(/^[a-zA-Z0-9_-]+$/, {
            message: "SKU must contain only letters, numbers, hyphens, or underscores.",
          }),
        price: z.number().gt(0),
        stock: z.number().min(0).default(0),
        variant_values: z.record(z.string(), z.string()),
      })
    )
    .min(1),
});
export type UpdateProductBodyType = z.TypeOf<typeof UpdateProductBody>;

/// UPDATE PRODUCT RES TYPE
export const UpdateProductRes = z.object({
  data: Product,
  error: z.any(),
  message: z.string(),
  success: z.boolean(),
  statusCode: z.number(),
});
export type UpdateProductResType = z.TypeOf<typeof UpdateProductRes>;

/// DELETE PRODUCT BODY TYPE
export const DeleteProductBody = z.object({
  _id: z.string(),
});
export type DeleteProductBodyType = z.TypeOf<typeof DeleteProductBody>;

/// DELETE PRODUCT RES TYPE
export const DeleteProductRes = z.object({
  data: Product,
  error: z.any(),
  message: z.string(),
  success: z.boolean(),
  statusCode: z.number(),
});
export type DeleteProductResType = z.TypeOf<typeof DeleteProductRes>;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
