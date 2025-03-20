"use client";

import z from "zod";
import { useForm } from "react-hook-form";
import { PlusIcon, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useFieldArray, useWatch } from "react-hook-form";

import Heading from "@/components/heading";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import AlertModal from "@/components/alert-modal";
import { ProductResType } from "@/Type/ProductType";
import { Checkbox } from "@/components/ui/checkbox";
import ImageUpload from "@/components/image-upload";
import { productAPI } from "@/apiRequest/productAPI";
import { handlError } from "@/components/handle-error";
import LoadingButton from "@/components/loading-button";
import { Button, buttonVariants } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createListDefaultValueForm, createListSchemaForm, createUniqueArray, formatDefaultValue } from "@/lib/utils";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface ProductFormProps {
  initObjectData: ProductResType | null;
}

const cartesianProduct = (arrays: string[][]) => {
  return arrays.reduce((acc, values) => acc.flatMap((x) => values.map((y) => [...x, y])), [[]] as string[][]);
};
function ProductForm({ initObjectData }: ProductFormProps) {
  const initData = initObjectData?.data?.product;
  const listCategory = initObjectData?.data?.listCategory;
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [multiImages, setMultiImages] = useState(initData?.images || []);
  const router = useRouter();
  const params = useParams();
  const formSchema = z.object({
    name: z.string().min(1, {
      message: "Tên phải chứa ít nhất 1 ký tự",
    }),
    images: z.array(z.string()).min(1, {
      message: "Images must be contain at least 1 picture.",
    }),
    category_id: z.string().min(1, { message: "Category cannot be emty" }),
    sales: z.coerce
      .number({
        message: "Sales must be a number",
      })
      .min(0, { message: "Sales between 0 and 100" })
      .max(100, { message: "Sales between 0 and 100" })
      .default(0),
    is_featured: z.boolean(),
    is_archived: z.boolean(),
    attributes: z.array(
      z.object({
        name: z.string(),
        values: z.array(z.string()),
      })
    ),
    variants: z.array(
      z.object({
        sku: z.string(),
        price: z.coerce.number().min(1, { message: "Price is required and must be greater than 0" }),
        stock: z.coerce.number().min(1, { message: "Stock is required and must be greater than 0" }),
      })
    ),
  });

  const formatData = (data: z.infer<typeof formSchema>) => {
    // Bước 1: Format variants (danh sách thuộc tính)

    const formattedVariants = data.attributes
      .map((attr) => ({
        name: attr.name,
        values: attr.values.map((v) => v).filter((value) => value.trim() !== ""),
      }))
      .filter((attr) => attr.name.trim() !== "" && attr.values.length > 0);

    // Bước 2: Format product_variants (biến thể sản phẩm)
    const productVariants = data.variants.map((variant) => {
      const oldVariants = initData?.product_variants || []; // Mảng variants cũ
      const values = variant.sku.split(" - ");
      let variantValues: Record<string, string> = {};
      // key: colors values: []
      data.attributes.forEach((attr, index) => {
        variantValues[attr.name] = values[index] || "";
      });
      const existingVariant = oldVariants.find((oldVar) => oldVar.sku.toUpperCase() === variant.sku.toUpperCase());
      return {
        _id: existingVariant ? (existingVariant as any)._id : undefined,
        sku: values.join("-").toUpperCase().replace(/\s+/g, ""), // SKU dạng "TS-RED-S"
        price: variant.price || 0,
        stock: variant.stock || 0,
        variant_values: variantValues,
      };
    });

    return {
      ...data,
      variants: formattedVariants,
      product_variants: productVariants,
    };
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initData?.name || "",
      images: initData?.images || [],
      category_id: initData?.category_id || "",
      sales: initData?.sales || 0,
      is_featured: initData?.is_featured || false,
      is_archived: initData?.is_archived || false,
      attributes: initData?.variants || [],
      variants: initData?.product_variants || ([] as any),
    },
  });
  const { control } = form;
  const {
    fields: attributes,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "attributes",
  });
  const { fields: variants, replace: setVariants } = useFieldArray({
    control,
    name: "variants",
  });
  const watchedAttributes = useWatch({ control, name: "attributes" });

  useEffect(() => {
    if (!isMounted) return;

    const attributeValues = watchedAttributes
      .map((attr) => attr.values.map((v) => v).filter(Boolean))
      .filter((arr) => arr.length > 0);

    if (attributeValues.length > 0) {
      let skus = cartesianProduct(attributeValues);
      const newVariants = skus.map((comb) => {
        const sku = comb.join(" - ");
        const existingVariant = variants.find((v) => {
          return v.sku.toUpperCase().replace(/\s+/g, "") === sku.toUpperCase().replace(/\s+/g, "");
        });
        return {
          sku,
          price: existingVariant?.price || 1, // Giữ lại giá trị cũ
          stock: existingVariant?.stock || 1, // Giữ lại số lượng tồn kho cũ
        };
      });

      setVariants(newVariants);
    }
  }, [watchedAttributes]);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const handleDeleteProduct = async () => {};
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const { attributes, ...newProduct } = formatData(data);
    const search_keywords: string[] = ["none"];
    const description = "none";
    try {
      if (!initData) {
        await productAPI.createProduct({
          ...newProduct,
          search_keywords,
          description,
          store_id: params.store_id as string,
        });
      } else {
        await productAPI.updateProduct({
          _id: initData._id,
          ...newProduct,
          search_keywords,
          description,
          store_id: params.store_id as string,
        });
      }
      // thứ tự 2 route này quan trọng
      router.push(`/${params.store_id}/products`);
      router.refresh();
      toast({
        title: toastMessage,
        variant: "success",
      });
    } catch (error) {
      handlError({ consoleError: "UPDATE_CREATE_ERROR", error: error, isToast: true });
    }
  };
  const action = initData ? "Lưu thay đổi" : "Tạo mới";
  const title = initData ? "Chỉnh sửa sản phẩm" : "Tạo sản phẩm";
  const toastMessage = initData ? "Cập nhật thành công" : "Tạo mới thành công";
  const description = initData ? "Thay đổi sản phẩm của bạn" : "Thêm sản phẩm mới";

  return (
    <>
      <>
        <AlertModal
          open={open}
          onClose={() => setOpen(false)}
          action="Xóa"
          variant="destructive"
          onConfirm={handleDeleteProduct}
          isLoading={isLoading}
        />
        <div className="flex items-center border-b pb-4">
          <Heading title={title} description={description} />
          {initData && (
            <Button
              className={buttonVariants({
                className: "!p-3 ml-auto",
                variant: "destructive",
              })}
              onClick={() => setOpen(true)}
              disabled={isLoading}
            >
              <Trash className="w-5 h-5" />
            </Button>
          )}
        </div>
      </>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" mt-4 space-y-6"
          onKeyDown={(e: React.KeyboardEvent<any>) => {
            e.key === "Enter" && e.preventDefault();
          }}
        >
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Ảnh</FormLabel>
                <FormControl>
                  <ImageUpload
                    isLoading={isLoading}
                    value={field.value ? field.value : []}
                    onChange={(url) => {
                      setMultiImages((multiImages) => {
                        field.onChange([...multiImages, url]); // Đồng bộ với form
                        return [...multiImages, url];
                      }); // Cập nhật trạng thái cục bộ
                    }}
                    onRemove={(item) => {
                      setMultiImages((multiImages) => {
                        field.onChange(multiImages.filter((url) => url !== item)); // Đồng bộ với form
                        return multiImages.filter((url) => url !== item);
                      }); // Cập nhật trạng thái cục bộ
                    }}
                  />
                </FormControl>
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-4 lg:gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Tên sản phẩm</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Name"
                      {...field}
                      className="h-[52px] !ring-0  !ring-offset-0 !outline-none pl-4 w-full"
                      accept="number"
                    />
                  </FormControl>
                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Danh mục</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="!h-[52px]">
                          <SelectValue placeholder="Choose one category..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {listCategory?.map((category) => (
                          <SelectItem key={category._id} value={`${category._id}`}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sales"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Giảm giá</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Sales percent"
                      {...field}
                      className="h-[52px] !ring-0  !ring-offset-0 !outline-none pl-4 w-full"
                      accept="number"
                    />
                  </FormControl>
                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-4 lg:gap-6">
            <FormField
              control={form.control}
              name="is_featured"
              render={({ field }) => (
                <FormItem className="flex self-end  items-start space-x-3 space-y-0 rounded-md border p-4 ">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="font-semibold">Nổi bật</FormLabel>
                    <FormDescription>Sản phẩm này sẽ xuất hiện trên trang chủ.</FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="is_archived"
              render={({ field }) => (
                <FormItem className="flex self-end  items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="font-semibold">Lưu trữ</FormLabel>
                    <FormDescription>Sản phẩm này sẽ không xuất hiện ở bất kỳ đâu trong cửa hàng.</FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>

          {/* THUỘC TÍNH */}
          {attributes.map((attribute, attrIndex) => (
            <div key={attribute.id} className="border p-3 rounded">
              <div className="flex justify-between items-center">
                <FormField
                  control={form.control}
                  name={`attributes.${attrIndex}.name`}
                  render={({ field }) => (
                    <>
                      <Input
                        {...field}
                        placeholder="Tên thuộc tính (e.g., Màu sắc, Kích thước)"
                        className="border p-2 flex-1"
                      />
                      <FormMessage className="text-sm text-red-500" />
                    </>
                  )}
                />

                <button type="button" onClick={() => remove(attrIndex)} className="text-red-500 px-10 hover:opacity-30">
                  Xóa
                </button>
              </div>

              <ValuesInput control={control} attrIndex={attrIndex} initData={initData} />
            </div>
          ))}

          <button
            type="button"
            onClick={() => append({ name: "", values: [""] })}
            className="bg-green-500 text-white px-3 py-2 hover:opacity-40"
          >
            Thêm biến thể
          </button>

          {/* DANH SÁCH BIẾN THỂ */}
          {variants.length > 0 && (
            <div className="mt-5">
              <h2 className="text-lg font-bold">Danh sách biến thể</h2>
              {variants?.map((variant, index) => {
                return (
                  <div key={variant.id} className="flex items-center gap-2 mt-2">
                    <span className="border p-2 flex-1">{variant.sku || variant.sku}</span>

                    {/* Nhập giá */}
                    <FormField
                      control={form.control}
                      name={`variants.${index}.price`}
                      render={({ field }) => (
                        <>
                          <Input {...field} placeholder="Nhập giá" type="number" className="border p-2 w-24" />
                          <FormMessage className="text-sm text-red-500" />
                        </>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`variants.${index}.stock`}
                      render={({ field }) => (
                        <>
                          <Input {...field} placeholder="Nhập tồn kho" type="number" className="border p-2 w-24" />
                          <FormMessage className="text-sm text-red-500" />
                        </>
                      )}
                    />
                  </div>
                );
              })}
            </div>
          )}

          <div className=" mt-8 ">
            <Button type="submit" className="min-w-[118px]" disabled={isLoading}>
              {isLoading ? <LoadingButton /> : action}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}

// Component nhập giá trị thuộc tính
const ValuesInput = ({ control, attrIndex, initData }: { control: any; attrIndex: number; initData: any }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `attributes.${attrIndex}.values`,
  });

  return (
    <div>
      {fields.map((field: any, valueIndex) => {
        return (
          <div key={field.id} className="flex gap-2 mt-2">
            <FormField
              control={control}
              name={`attributes.${attrIndex}.values.${valueIndex}`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <input {...field} placeholder="Nhập giá trị" className="border p-2 flex-1" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <button
              type="button"
              className="bg-red-500 hover:opacity-40 text-white px-2 py-1"
              onClick={() => remove(valueIndex)}
            >
              Xóa
            </button>
          </div>
        );
      })}

      <button
        type="button"
        onClick={() => append("")}
        className="bg-blue-500 hover:opacity-40  text-white px-3 py-1 mt-2"
      >
        Thêm giá trị
      </button>
    </div>
  );
};

export default ProductForm;
