// "use client";

// import z from "zod";
// import { useForm } from "react-hook-form";
// import { PlusIcon, Trash } from "lucide-react";
// import React, { useEffect, useState } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useParams, useRouter } from "next/navigation";

// import Heading from "@/components/heading";
// import { Input } from "@/components/ui/input";
// import { toast } from "@/components/ui/use-toast";
// import AlertModal from "@/components/alert-modal";
// import { ProductResType } from "@/Type/ProductType";
// import { Checkbox } from "@/components/ui/checkbox";
// import ImageUpload from "@/components/image-upload";
// import MultiSelect from "@/components/multi-select";
// import { productAPI } from "@/apiRequest/productAPI";
// import { handlError } from "@/components/handle-error";
// import LoadingButton from "@/components/loading-button";
// import { Button, buttonVariants } from "@/components/ui/button";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { createListDefaultValueForm, createListSchemaForm, createUniqueArray, formatDefaultValue } from "@/lib/utils";
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

// interface ProductFormProps {
//   initObjectData: ProductResType | null;
// }

// function ProductForm({ initObjectData }: ProductFormProps) {
//   const initData = initObjectData?.data.product;
//   const listSize = initObjectData?.data.listSize;
//   const listColor = initObjectData?.data.listColor;
//   const listCategory = initObjectData?.data.listCategory;

//   const router = useRouter();
//   const params = useParams();
//   const [open, setOpen] = useState(false);
//   const [isMounted, setIsMouted] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isIncrease, setIsIncrease] = useState(true);
//   const [numSize, setNumsize] = useState(initData?.arrayPrice.length || 1);
//   const [multiImages, setMultiImages] = useState(initData?.images || []);

//   // check xem đang muốn update hay create dựa vào có truyền data đầu vào không
//   const action = initData ? "Save change" : "Create";
//   const title = initData ? "Edit product" : "Create product";
//   const toastMessage = initData ? "Updated success" : "Create success";
//   const description = initData ? "Change your product" : "Add a new product";
//   // size
//   const sizesArray = initData?.arrayPrice.map((item) => item.size);
//   let defaultValueListSize: Array<any> = createListDefaultValueForm(numSize, "size", "");

//   // price
//   const pricesArray = initData?.arrayPrice.map((item) => item.price);
//   let defaultValueListPrice: Array<any> = createListDefaultValueForm(numSize, "price", 0);

//   // amount
//   const amount = initData?.arrayPrice.map((item) => item.amount);
//   let defaultValueListAmount: Array<any> = createListDefaultValueForm(numSize, "amount", 0);

//   // color
//   const colorsArray = initData?.arrayPrice.map((item) => item.colors);
//   let defaultValueListColor: Array<any> = createListDefaultValueForm(numSize, "color", []);

//   // nếu có data đầu vào thì ghi đè lại nhưng size lúc này chỉ bằng initSize, khi vào vô useEffect mới thêm vào size mới
//   if (initData) {
//     defaultValueListSize = sizesArray!.map((item, index) => {
//       const sizeIndex = "size" + (index + 1);
//       return {
//         [sizeIndex]: item,
//       };
//     });
//     defaultValueListPrice = pricesArray!.map((item, index) => {
//       const priceIndex = "price" + (index + 1);
//       return {
//         [priceIndex]: item,
//       };
//     });
//     defaultValueListAmount = amount!.map((item, index) => {
//       const amountIndex = "amount" + (index + 1);
//       return {
//         [amountIndex]: item,
//       };
//     });
//     defaultValueListColor = colorsArray!.map((item, index) => {
//       const colorIndex = "color" + (index + 1);
//       return {
//         [colorIndex]: item,
//       };
//     });
//   }

//   // type
//   const listSizeSchema: any = createListSchemaForm(
//     numSize,
//     "size",
//     z.string().min(1, { message: "Size cannot be emty" }).default("")
//   );
//   const listPriceSchema: any = createListSchemaForm(
//     numSize,
//     "price",
//     z.coerce
//       .number({
//         message: "Price must be a number",
//       })
//       .min(0, { message: "Price cannot be negative" }) // Thêm thông báo lỗi nếu giá không hợp lệ
//       .default(0)
//   );
//   const listAmountSchema: any = createListSchemaForm(
//     numSize,
//     "amount",
//     z.coerce
//       .number({
//         message: "Amount must be a number",
//       })
//       .min(0, { message: "Amount cannot be emty" })
//       .default(0)
//   );
//   const listColorSchema: any = createListSchemaForm(
//     numSize,
//     "color",
//     z.array(z.string()).min(1, { message: "Colors cannot be emty" }).default([])
//   );
//   const formSchema = z.object({
//     name: z.string().min(1, {
//       message: "Name must be contain at least 1 character",
//     }),
//     sales: z.coerce
//       .number({
//         message: "Sales must be a number",
//       })
//       .min(0, { message: "Sales between 0 and 100" })
//       .max(100, { message: "Sales between 0 and 100" })
//       .default(0),
//     categoryId: z.string().min(1, { message: "Category cannot be emty" }),
//     ...listPriceSchema,
//     ...listSizeSchema,
//     ...listColorSchema,
//     ...listAmountSchema,
//     isFeature: z.boolean(),
//     isArchive: z.boolean(),
//     images: z.array(z.string()).min(1, {
//       message: "Images must be contain at least 1 picture.",
//     }),
//   });
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: initData?.name || "",
//       images: initData?.images || [],
//       sales: initData?.sales || 0,
//       ...formatDefaultValue(defaultValueListSize),
//       ...formatDefaultValue(defaultValueListPrice),
//       ...formatDefaultValue(defaultValueListColor),
//       ...formatDefaultValue(defaultValueListAmount),
//       categoryId: initData?.categoryId?._id || "",
//       isFeature: initData?.isFeature || false,
//       isArchive: initData?.isArchive || false,
//     },
//   });

//   // initdata
//   useEffect(() => {
//     setIsMouted(true);
//   }, []);
//   useEffect(() => {
//     // tránh lần đầu mounted bị gọi luôn hàm và set giá trị của numsize hiện tại rỗng
//     if (!isMounted) return;
//     const sizeIndex = `size${numSize}`;
//     const priceIndex = `price${numSize}`;
//     const colorIndex = `color${numSize}`;
//     const amountIndex = `amount${numSize}`;
//     const objectPrice = {
//       [sizeIndex]: "",
//       [priceIndex]: 0,
//       [amountIndex]: 0,
//       [colorIndex]: [],
//     };
//     if (isIncrease) {
//       // thứ tự quan trọng vì ghi đè lại
//       form.reset({
//         ...form.getValues(),
//         ...objectPrice,
//       });
//     } else {
//       const sizeIndex = `size${numSize + 1}`;
//       const priceIndex = `price${numSize + 1}`;
//       const colorIndex = `color${numSize + 1}`;
//       const amountIndex = `amount${numSize + 1}`;

//       const {
//         [sizeIndex]: a,
//         [colorIndex]: b,
//         [priceIndex]: c,
//         [amountIndex]: d,
//         ...cleanFormValue
//       } = form.getValues();
//       form.reset({
//         ...cleanFormValue,
//       });
//     }
//     // setIsChange(!isChange);
//     // router.refresh();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [numSize]);

//   // lỗi thì thêm form vào
//   const onSubmit = async (data: z.infer<typeof formSchema>) => {
//     const category = listCategory?.find((item) => item._id === data.categoryId);
//     let arrayPrice: any = createUniqueArray(numSize).map((_, index) => {
//       const initialLengthSize = initObjectData?.data?.product?.arrayPrice?.length || 0;
//       return {
//         size: data[`size${index + 1}`],
//         price: data[`price${index + 1}`],
//         colors: data[`color${index + 1}`],
//         amount: data[`amount${index + 1}`],
//         amount_sold: index < initialLengthSize ? initObjectData?.data.product.arrayPrice[index].amount_sold : 0,
//       };
//     });
//     try {
//       if (!initData) {
//         await productAPI.createProduct({
//           name: data.name,
//           images: data.images,
//           store_id: params.store_id as string,
//           arrayPrice,
//           categoryId: category!._id,
//           isFeature: data.isFeature,
//           isArchive: data.isArchive,
//           sales: data.sales,
//         });
//       } else {
//         await productAPI.updateProduct({
//           _id: initData._id,
//           name: data.name,
//           images: data.images,
//           store_id: params.store_id as string,
//           arrayPrice,
//           categoryId: category!._id,
//           isFeature: data.isFeature,
//           isArchive: data.isArchive,
//           sales: data.sales,
//         });
//       }
//       // thứ tự 2 route này quan trọng
//       router.push(`/${params.store_id}/products`);
//       router.refresh();
//       toast({
//         title: toastMessage,
//         variant: "success",
//       });
//     } catch (error) {
//       handlError({ consoleError: "UPDATE_CREATE_ERROR", error: error, isToast: true });
//     }
//   };
//   const handleDeleteProduct = async () => {
//     try {
//       setIsLoading(true);
//       await productAPI.deleteProduct({
//         store_id: params.store_id as string,
//         _id: params.productId as string,
//       });
//       toast({
//         title: "Delete product success.",
//         variant: "success",
//       });
//       // thứ tự 2 route này quan trọng
//       router.push(`/${params.store_id}/products`);
//       router.refresh();
//     } catch (error) {
//       handlError({
//         consoleError: "DELETE_PRODUCT_ERROR",
//         error,
//         isToast: true,
//       });
//     } finally {
//       setOpen(false);
//       setIsLoading(false);
//     }
//   };

//   const handleIncreaseForm = () => {
//     setIsIncrease(true);
//     setNumsize(numSize + 1);
//   };
//   const handleDecreaseForm = () => {
//     setIsIncrease(false);
//     setNumsize(numSize - 1);
//   };
//   return (
//     <>
//       <>
//         <AlertModal
//           open={open}
//           onClose={() => setOpen(false)}
//           action="Delete"
//           variant="destructive"
//           onConfirm={handleDeleteProduct}
//           isLoading={isLoading}
//         />
//         <div className="flex items-center border-b pb-4">
//           <Heading title={title} description={description} />
//           {initData && (
//             <Button
//               className={buttonVariants({
//                 className: "!p-3 ml-auto",
//                 variant: "destructive",
//               })}
//               onClick={() => setOpen(true)}
//               disabled={isLoading}
//             >
//               <Trash className="w-5 h-5" />
//             </Button>
//           )}
//         </div>
//       </>

//       <Form {...form}>
//         <form
//           onSubmit={form.handleSubmit(onSubmit)}
//           className=" mt-4 space-y-6"
//           onKeyDown={(e: React.KeyboardEvent<any>) => {
//             e.key === "Enter" && e.preventDefault();
//           }}
//         >
//           <FormField
//             control={form.control}
//             name="images"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel className="font-semibold">Images</FormLabel>
//                 <FormControl>
//                   <ImageUpload
//                     isLoading={isLoading}
//                     value={field.value ? field.value : []}
//                     onChange={(url) => {
//                       setMultiImages((multiImages) => {
//                         field.onChange([...multiImages, url]); // Đồng bộ với form
//                         return [...multiImages, url];
//                       }); // Cập nhật trạng thái cục bộ
//                     }}
//                     onRemove={(item) => {
//                       setMultiImages((multiImages) => {
//                         field.onChange(multiImages.filter((url) => url !== item)); // Đồng bộ với form
//                         return multiImages.filter((url) => url !== item);
//                       }); // Cập nhật trạng thái cục bộ
//                     }}
//                   />
//                 </FormControl>
//                 <FormMessage className="text-sm" />
//               </FormItem>
//             )}
//           />

//           <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-4 lg:gap-6">
//             <FormField
//               control={form.control}
//               name="name"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="font-semibold">Name</FormLabel>
//                   <FormControl>
//                     <Input
//                       placeholder="Name"
//                       {...field}
//                       className="h-[52px] !ring-0  !ring-offset-0 !outline-none pl-4 w-full"
//                       accept="number"
//                     />
//                   </FormControl>
//                   <FormMessage className="text-sm" />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="categoryId"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="font-semibold">Category</FormLabel>
//                   <FormControl>
//                     <Select onValueChange={field.onChange} defaultValue={field.value}>
//                       <FormControl>
//                         <SelectTrigger className="!h-[52px]">
//                           <SelectValue placeholder="Choose one category..." />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         {listCategory?.map((category) => (
//                           <SelectItem key={category._id} value={`${category._id}`}>
//                             {category.name}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </FormControl>
//                   <FormMessage className="text-sm" />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="sales"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="font-semibold">Sales</FormLabel>
//                   <FormControl>
//                     <Input
//                       placeholder="Sales percent"
//                       {...field}
//                       className="h-[52px] !ring-0  !ring-offset-0 !outline-none pl-4 w-full"
//                       accept="number"
//                     />
//                   </FormControl>
//                   <FormMessage className="text-sm" />
//                 </FormItem>
//               )}
//             />
//             <div></div>

//             {createUniqueArray(numSize).map((value: any, index) => {
//               return (
//                 <React.Fragment key={value}>
//                   <FormField
//                     control={form.control}
//                     name={`size${index + 1}` as any}
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel className="font-semibold">Size{index + 1}</FormLabel>
//                         <FormControl>
//                           <Select onValueChange={field.onChange} defaultValue={field.value}>
//                             <FormControl>
//                               <SelectTrigger className="!h-[52px]">
//                                 <SelectValue placeholder="Choose one size..." />
//                               </SelectTrigger>
//                             </FormControl>
//                             <SelectContent>
//                               {listSize?.map((size) => (
//                                 <SelectItem
//                                   key={size._id}
//                                   value={`${size.value}`}
//                                   disabled={Object.values(form.getValues()).includes(size.value)}
//                                 >
//                                   {size.name}
//                                 </SelectItem>
//                               ))}
//                             </SelectContent>
//                           </Select>
//                         </FormControl>
//                         <FormMessage className="text-sm" />
//                       </FormItem>
//                     )}
//                   />

//                   <FormField
//                     control={form.control}
//                     name={`color${index + 1}` as any}
//                     render={({ field }) => {
//                       return (
//                         <FormItem>
//                           <FormLabel className="font-semibold">Color{index + 1}</FormLabel>
//                           <FormControl>
//                             <MultiSelect
//                               values={field.value}
//                               listColor={listColor}
//                               onChange={(name) => field.onChange([...field.value, name])}
//                               onRemove={(name) =>
//                                 field.onChange([...field.value.filter((color: any) => color !== name)])
//                               }
//                             />
//                           </FormControl>
//                           <FormMessage className="text-sm" />
//                         </FormItem>
//                       );
//                     }}
//                   />
//                   <FormField
//                     control={form.control}
//                     name={`price${index + 1}` as any}
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel className="font-semibold">Price{index + 1}</FormLabel>
//                         <FormControl>
//                           <Input
//                             placeholder="Price"
//                             {...field}
//                             className="h-[52px] !ring-0  !ring-offset-0 !outline-none pl-4 w-full"
//                             accept="number"
//                           />
//                         </FormControl>
//                         <FormMessage className="text-sm" />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name={`amount${index + 1}` as any}
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel className="font-semibold">Amount{index + 1}</FormLabel>
//                         <FormControl>
//                           <Input
//                             placeholder="Amount"
//                             {...field}
//                             className="h-[52px] !ring-0  !ring-offset-0 !outline-none pl-4 w-full"
//                             accept="number"
//                           />
//                         </FormControl>
//                         <FormMessage className="text-sm" />
//                       </FormItem>
//                     )}
//                   />
//                 </React.Fragment>
//               );
//             })}
//             <div className="flex gap-x-4  lg:mt-0 items-center">
//               {numSize !== listSize?.length && (
//                 <Button
//                   className={buttonVariants({
//                     className: "align-bottom p-4 gap-x-2",
//                     variant: "secondary",
//                   })}
//                   onClick={handleIncreaseForm}
//                   type="button"
//                 >
//                   <span>Add size </span>
//                   <PlusIcon className="h-4 w-4" />
//                 </Button>
//               )}
//               {numSize !== 1 && (
//                 <Button
//                   className={buttonVariants({
//                     className: "align-bottom p-4 ",
//                     variant: "secondary",
//                   })}
//                   onClick={handleDecreaseForm}
//                   type="button"
//                 >
//                   Delete
//                 </Button>
//               )}
//             </div>

//             <FormField
//               control={form.control}
//               name="isFeature"
//               render={({ field }) => (
//                 <FormItem className="flex self-end  items-start space-x-3 space-y-0 rounded-md border p-4 ">
//                   <FormControl>
//                     <Checkbox checked={field.value} onCheckedChange={field.onChange} />
//                   </FormControl>
//                   <div className="space-y-1 leading-none">
//                     <FormLabel className="font-semibold">Featured</FormLabel>
//                     <FormDescription>This product will appear in the home page.</FormDescription>
//                   </div>
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="isArchive"
//               render={({ field }) => (
//                 <FormItem className="flex self-end  items-start space-x-3 space-y-0 rounded-md border p-4">
//                   <FormControl>
//                     <Checkbox checked={field.value} onCheckedChange={field.onChange} />
//                   </FormControl>
//                   <div className="space-y-1 leading-none">
//                     <FormLabel className="font-semibold">Archived</FormLabel>
//                     <FormDescription>This product will not appear any where in store.</FormDescription>
//                   </div>
//                 </FormItem>
//               )}
//             />
//           </div>
//           <div className=" mt-8 ">
//             <Button type="submit" className="min-w-[118px]" disabled={isLoading}>
//               {isLoading ? <LoadingButton /> : action}
//             </Button>
//           </div>
//         </form>
//       </Form>
//     </>
//   );
// }

// export default ProductForm;
// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /
// "use client";

// import z from "zod";
// import { useForm } from "react-hook-form";
// import { PlusIcon, Trash } from "lucide-react";
// import React, { useEffect, useState } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useParams, useRouter } from "next/navigation";

// import Heading from "@/components/heading";
// import { Input } from "@/components/ui/input";
// import { toast } from "@/components/ui/use-toast";
// import AlertModal from "@/components/alert-modal";
// import { ProductResType } from "@/Type/ProductType";
// import { Checkbox } from "@/components/ui/checkbox";
// import ImageUpload from "@/components/image-upload";
// import MultiSelect from "@/components/multi-select";
// import { productAPI } from "@/apiRequest/productAPI";
// import { handlError } from "@/components/handle-error";
// import LoadingButton from "@/components/loading-button";
// import { Button, buttonVariants } from "@/components/ui/button";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { createListDefaultValueForm, createListSchemaForm, createUniqueArray, formatDefaultValue } from "@/lib/utils";
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

// interface ProductFormProps {
//   initObjectData: ProductResType | null;
// }

// function ProductForm({ initObjectData }: ProductFormProps) {
//   const initData = initObjectData?.data?.product;
//   const listCategory = initObjectData?.data?.listCategory;
//   const [isLoading, setIsLoading] = useState(false);
//   const [open, setOpen] = useState(false);
//   const [multiImages, setMultiImages] = useState(initData?.images || []);

//   const formSchema = z.object({
//     name: z.string().min(1, {
//       message: "Name must be contain at least 1 character",
//     }),
//     images: z.array(z.string()).min(1, {
//       message: "Images must be contain at least 1 picture.",
//     }),
//     category_id: z.string().min(1, { message: "Category cannot be emty" }),
//     sales: z.coerce
//       .number({
//         message: "Sales must be a number",
//       })
//       .min(0, { message: "Sales between 0 and 100" })
//       .max(100, { message: "Sales between 0 and 100" })
//       .default(0),
//     is_featured: z.boolean(),
//     is_archived: z.boolean(),
//   });
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: initData?.name || "",
//       images: initData?.images || [],
//       category_id: initData?.category_id || "",
//       sales: initData?.sales || 0,
//       is_featured: initData?.is_featured || false,
//       is_archived: initData?.is_archived || false,
//     },
//   });

//   const handleDeleteProduct = async () => {};
//   const onSubmit = async (data: z.infer<typeof formSchema>) => {
//     console.log(data);
//   };
//   const action = initData ? "Save change" : "Create";
//   const title = initData ? "Edit product" : "Create product";
//   const toastMessage = initData ? "Updated success" : "Create success";
//   const description = initData ? "Change your product" : "Add a new product";
//   return (
//     <>
//       <>
//         <AlertModal
//           open={open}
//           onClose={() => setOpen(false)}
//           action="Delete"
//           variant="destructive"
//           onConfirm={handleDeleteProduct}
//           isLoading={isLoading}
//         />
//         <div className="flex items-center border-b pb-4">
//           <Heading title={title} description={description} />
//           {initData && (
//             <Button
//               className={buttonVariants({
//                 className: "!p-3 ml-auto",
//                 variant: "destructive",
//               })}
//               onClick={() => setOpen(true)}
//               disabled={isLoading}
//             >
//               <Trash className="w-5 h-5" />
//             </Button>
//           )}
//         </div>
//       </>

//       <Form {...form}>
//         <form
//           onSubmit={form.handleSubmit(onSubmit)}
//           className=" mt-4 space-y-6"
//           onKeyDown={(e: React.KeyboardEvent<any>) => {
//             e.key === "Enter" && e.preventDefault();
//           }}
//         >
//           <FormField
//             control={form.control}
//             name="images"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel className="font-semibold">Images</FormLabel>
//                 <FormControl>
//                   <ImageUpload
//                     isLoading={isLoading}
//                     value={field.value ? field.value : []}
//                     onChange={(url) => {
//                       setMultiImages((multiImages) => {
//                         field.onChange([...multiImages, url]); // Đồng bộ với form
//                         return [...multiImages, url];
//                       }); // Cập nhật trạng thái cục bộ
//                     }}
//                     onRemove={(item) => {
//                       setMultiImages((multiImages) => {
//                         field.onChange(multiImages.filter((url) => url !== item)); // Đồng bộ với form
//                         return multiImages.filter((url) => url !== item);
//                       }); // Cập nhật trạng thái cục bộ
//                     }}
//                   />
//                 </FormControl>
//                 <FormMessage className="text-sm" />
//               </FormItem>
//             )}
//           />

//           <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-4 lg:gap-6">
//             <FormField
//               control={form.control}
//               name="name"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="font-semibold">Name</FormLabel>
//                   <FormControl>
//                     <Input
//                       placeholder="Name"
//                       {...field}
//                       className="h-[52px] !ring-0  !ring-offset-0 !outline-none pl-4 w-full"
//                       accept="number"
//                     />
//                   </FormControl>
//                   <FormMessage className="text-sm" />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="category_id"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="font-semibold">Category</FormLabel>
//                   <FormControl>
//                     <Select onValueChange={field.onChange} defaultValue={field.value}>
//                       <FormControl>
//                         <SelectTrigger className="!h-[52px]">
//                           <SelectValue placeholder="Choose one category..." />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         {listCategory?.map((category) => (
//                           <SelectItem key={category._id} value={`${category._id}`}>
//                             {category.name}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </FormControl>
//                   <FormMessage className="text-sm" />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="sales"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="font-semibold">Sales</FormLabel>
//                   <FormControl>
//                     <Input
//                       placeholder="Sales percent"
//                       {...field}
//                       className="h-[52px] !ring-0  !ring-offset-0 !outline-none pl-4 w-full"
//                       accept="number"
//                     />
//                   </FormControl>
//                   <FormMessage className="text-sm" />
//                 </FormItem>
//               )}
//             />
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-4 lg:gap-6">
//             <FormField
//               control={form.control}
//               name="is_featured"
//               render={({ field }) => (
//                 <FormItem className="flex self-end  items-start space-x-3 space-y-0 rounded-md border p-4 ">
//                   <FormControl>
//                     <Checkbox checked={field.value} onCheckedChange={field.onChange} />
//                   </FormControl>
//                   <div className="space-y-1 leading-none">
//                     <FormLabel className="font-semibold">Featured</FormLabel>
//                     <FormDescription>This product will appear in the home page.</FormDescription>
//                   </div>
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="is_archived"
//               render={({ field }) => (
//                 <FormItem className="flex self-end  items-start space-x-3 space-y-0 rounded-md border p-4">
//                   <FormControl>
//                     <Checkbox checked={field.value} onCheckedChange={field.onChange} />
//                   </FormControl>
//                   <div className="space-y-1 leading-none">
//                     <FormLabel className="font-semibold">Archived</FormLabel>
//                     <FormDescription>This product will not appear any where in store.</FormDescription>
//                   </div>
//                 </FormItem>
//               )}
//             />
//           </div>
//           <div className=" mt-8 ">
//             <Button type="submit" className="min-w-[118px]" disabled={isLoading}>
//               {isLoading ? <LoadingButton /> : action}
//             </Button>
//           </div>
//         </form>
//       </Form>
//     </>
//   );
// }
// export default ProductForm;
// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /
// "use client";

// import z from "zod";
// import { useForm } from "react-hook-form";
// import { PlusIcon, Trash } from "lucide-react";
// import React, { useEffect, useState } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useParams, useRouter } from "next/navigation";
// import { useFieldArray, useWatch } from "react-hook-form";

// import Heading from "@/components/heading";
// import { Input } from "@/components/ui/input";
// import { toast } from "@/components/ui/use-toast";
// import AlertModal from "@/components/alert-modal";
// import { ProductResType } from "@/Type/ProductType";
// import { Checkbox } from "@/components/ui/checkbox";
// import ImageUpload from "@/components/image-upload";
// import MultiSelect from "@/components/multi-select";
// import { productAPI } from "@/apiRequest/productAPI";
// import { handlError } from "@/components/handle-error";
// import LoadingButton from "@/components/loading-button";
// import { Button, buttonVariants } from "@/components/ui/button";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { createListDefaultValueForm, createListSchemaForm, createUniqueArray, formatDefaultValue } from "@/lib/utils";
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

// interface ProductFormProps {
//   initObjectData: ProductResType | null;
// }

// const cartesianProduct = (arrays: string[][]) => {
//   return arrays.reduce((acc, values) => acc.flatMap((x) => values.map((y) => [...x, y])), [[]] as string[][]);
// };
// function ProductForm({ initObjectData }: ProductFormProps) {
//   const initData = initObjectData?.data?.product;
//   console.log(initData);
//   const listCategory = initObjectData?.data?.listCategory;
//   const [isLoading, setIsLoading] = useState(false);
//   const [open, setOpen] = useState(false);
//   const [multiImages, setMultiImages] = useState(initData?.images || []);
//   const router = useRouter();
//   const params = useParams();
//   const formSchema = z.object({
//     name: z.string().min(1, {
//       message: "Name must be contain at least 1 character",
//     }),
//     images: z.array(z.string()).min(1, {
//       message: "Images must be contain at least 1 picture.",
//     }),
//     category_id: z.string().min(1, { message: "Category cannot be emty" }),
//     sales: z.coerce
//       .number({
//         message: "Sales must be a number",
//       })
//       .min(0, { message: "Sales between 0 and 100" })
//       .max(100, { message: "Sales between 0 and 100" })
//       .default(0),
//     is_featured: z.boolean(),
//     is_archived: z.boolean(),
//     attributes: z.array(
//       z.object({
//         name: z.string(),
//         values: z.array(z.object({ value: z.string() })),
//       })
//     ),
//     variants: z.array(
//       z.object({
//         sku: z.string(),
//         price: z.string().min(1, { message: "Price is require." }), // Nếu là số thì dùng `z.number()`
//         stock: z.string().min(1, { message: "Price is require." }), // Nếu là số thì dùng `z.number()`
//       })
//     ),
//   });

//   const formatData = (data: z.infer<typeof formSchema>) => {
//     // Bước 1: Format variants (danh sách thuộc tính)
//     const formattedVariants = data.attributes
//       .map((attr) => ({
//         name: attr.name,
//         values: attr.values.map((v) => v.value).filter((value) => value.trim() !== ""),
//       }))
//       .filter((attr) => attr.name.trim() !== "" && attr.values.length > 0);

//     // Bước 2: Format product_variants (biến thể sản phẩm)
//     const productVariants = data.variants.map((variant) => {
//       const values = variant.sku.split(" - ");
//       let variantValues: Record<string, string> = {};

//       data.attributes.forEach((attr, index) => {
//         variantValues[attr.name] = values[index] || "";
//       });
//       return {
//         sku: values.join("-").toUpperCase().replace(/\s+/g, ""), // SKU dạng "TS-RED-S"
//         price: parseInt(variant.price) || 0,
//         stock: parseInt(variant.stock) || 0,
//         variant_values: variantValues,
//       };
//     });

//     return {
//       ...data,
//       variants: formattedVariants,
//       product_variants: productVariants,
//     };
//   };
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: initData?.name || "",
//       images: initData?.images || [],
//       category_id: initData?.category_id || "",
//       sales: initData?.sales || 0,
//       is_featured: initData?.is_featured || false,
//       is_archived: initData?.is_archived || false,
//       attributes: initData?.variants || ([] as any),
//       variants: initData?.product_variants || ([] as any),
//     },
//   });
//   const { control } = form;
//   const {
//     fields: attributes,
//     append,
//     remove,
//   } = useFieldArray({
//     control,
//     name: "attributes",
//   });
//   const { fields: variants, replace: setVariants } = useFieldArray({
//     control,
//     name: "variants",
//   });
//   const watchedAttributes = useWatch({ control, name: "attributes" });

//   useEffect(() => {
//     const attributeValues = watchedAttributes
//       .map((attr) => attr.values.map((v) => v.value).filter(Boolean))
//       .filter((arr) => arr.length > 0);
//     if (attributeValues.length > 0) {
//       let skus = cartesianProduct(attributeValues);
//       const newVariants = skus.map((comb) => ({
//         sku: comb.join(" - "),
//         price: "",
//         stock: "",
//       }));

//       newVariants.forEach((_, index) => {
//         form.setValue(`variants.${index}.price`, ""); // Đặt giá trị price là ""
//         form.setValue(`variants.${index}.stock`, ""); // Đặt giá trị stock là ""
//       });
//       setVariants(newVariants);
//       router.refresh();
//     }
//   }, [watchedAttributes, setVariants]);

//   const handleDeleteProduct = async () => {};
//   const onSubmit = async (data: z.infer<typeof formSchema>) => {
//     const { attributes, ...newProduct } = formatData(data);
//     const search_keywords: string[] = ["none"];
//     const description = "none";
//     console.log({ ...newProduct, search_keywords, description });

//     try {
//       if (!initData) {
//         await productAPI.createProduct({
//           ...newProduct,
//           search_keywords,
//           description,
//           store_id: params.store_id as string,
//         });
//       }

//       // else {
//       //   await productAPI.updateProduct({
//       //     _id: initData._id,
//       //   });
//       // }
//       // thứ tự 2 route này quan trọng
//       // router.push(`/${params.store_id}/products`);
//       router.refresh();
//       toast({
//         title: toastMessage,
//         variant: "success",
//       });
//     } catch (error) {
//       handlError({ consoleError: "UPDATE_CREATE_ERROR", error: error, isToast: true });
//     }
//   };
//   console.log("data form ", form.getValues());
//   const action = initData ? "Save change" : "Create";
//   const title = initData ? "Edit product" : "Create product";
//   const toastMessage = initData ? "Updated success" : "Create success";
//   const description = initData ? "Change your product" : "Add a new product";
//   return (
//     <>
//       <>
//         <AlertModal
//           open={open}
//           onClose={() => setOpen(false)}
//           action="Delete"
//           variant="destructive"
//           onConfirm={handleDeleteProduct}
//           isLoading={isLoading}
//         />
//         <div className="flex items-center border-b pb-4">
//           <Heading title={title} description={description} />
//           {initData && (
//             <Button
//               className={buttonVariants({
//                 className: "!p-3 ml-auto",
//                 variant: "destructive",
//               })}
//               onClick={() => setOpen(true)}
//               disabled={isLoading}
//             >
//               <Trash className="w-5 h-5" />
//             </Button>
//           )}
//         </div>
//       </>

//       <Form {...form}>
//         <form
//           onSubmit={form.handleSubmit(onSubmit)}
//           className=" mt-4 space-y-6"
//           onKeyDown={(e: React.KeyboardEvent<any>) => {
//             e.key === "Enter" && e.preventDefault();
//           }}
//         >
//           <FormField
//             control={form.control}
//             name="images"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel className="font-semibold">Images</FormLabel>
//                 <FormControl>
//                   <ImageUpload
//                     isLoading={isLoading}
//                     value={field.value ? field.value : []}
//                     onChange={(url) => {
//                       setMultiImages((multiImages) => {
//                         field.onChange([...multiImages, url]); // Đồng bộ với form
//                         return [...multiImages, url];
//                       }); // Cập nhật trạng thái cục bộ
//                     }}
//                     onRemove={(item) => {
//                       setMultiImages((multiImages) => {
//                         field.onChange(multiImages.filter((url) => url !== item)); // Đồng bộ với form
//                         return multiImages.filter((url) => url !== item);
//                       }); // Cập nhật trạng thái cục bộ
//                     }}
//                   />
//                 </FormControl>
//                 <FormMessage className="text-sm" />
//               </FormItem>
//             )}
//           />

//           <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-4 lg:gap-6">
//             <FormField
//               control={form.control}
//               name="name"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="font-semibold">Name</FormLabel>
//                   <FormControl>
//                     <Input
//                       placeholder="Name"
//                       {...field}
//                       className="h-[52px] !ring-0  !ring-offset-0 !outline-none pl-4 w-full"
//                       accept="number"
//                     />
//                   </FormControl>
//                   <FormMessage className="text-sm" />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="category_id"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="font-semibold">Category</FormLabel>
//                   <FormControl>
//                     <Select onValueChange={field.onChange} defaultValue={field.value}>
//                       <FormControl>
//                         <SelectTrigger className="!h-[52px]">
//                           <SelectValue placeholder="Choose one category..." />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         {listCategory?.map((category) => (
//                           <SelectItem key={category._id} value={`${category._id}`}>
//                             {category.name}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </FormControl>
//                   <FormMessage className="text-sm" />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="sales"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="font-semibold">Sales</FormLabel>
//                   <FormControl>
//                     <Input
//                       placeholder="Sales percent"
//                       {...field}
//                       className="h-[52px] !ring-0  !ring-offset-0 !outline-none pl-4 w-full"
//                       accept="number"
//                     />
//                   </FormControl>
//                   <FormMessage className="text-sm" />
//                 </FormItem>
//               )}
//             />
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-4 lg:gap-6">
//             <FormField
//               control={form.control}
//               name="is_featured"
//               render={({ field }) => (
//                 <FormItem className="flex self-end  items-start space-x-3 space-y-0 rounded-md border p-4 ">
//                   <FormControl>
//                     <Checkbox checked={field.value} onCheckedChange={field.onChange} />
//                   </FormControl>
//                   <div className="space-y-1 leading-none">
//                     <FormLabel className="font-semibold">Featured</FormLabel>
//                     <FormDescription>This product will appear in the home page.</FormDescription>
//                   </div>
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="is_archived"
//               render={({ field }) => (
//                 <FormItem className="flex self-end  items-start space-x-3 space-y-0 rounded-md border p-4">
//                   <FormControl>
//                     <Checkbox checked={field.value} onCheckedChange={field.onChange} />
//                   </FormControl>
//                   <div className="space-y-1 leading-none">
//                     <FormLabel className="font-semibold">Archived</FormLabel>
//                     <FormDescription>This product will not appear any where in store.</FormDescription>
//                   </div>
//                 </FormItem>
//               )}
//             />
//           </div>
//           <div className=" mt-8 ">
//             <Button type="submit" className="min-w-[118px]" disabled={isLoading}>
//               {isLoading ? <LoadingButton /> : action}
//             </Button>
//           </div>

//           {/* THUỘC TÍNH */}
//           {attributes.map((attribute, attrIndex) => (
//             <div key={attribute.id} className="border p-3 rounded">
//               <div className="flex justify-between items-center">
//                 <FormField
//                   control={form.control}
//                   name={`attributes.${attrIndex}.name`}
//                   render={({ field }) => (
//                     <>
//                       <Input
//                         {...field}
//                         placeholder="Tên thuộc tính (e.g., Màu sắc, Kích thước)"
//                         className="border p-2 flex-1"
//                       />
//                       <FormMessage className="text-sm text-red-500" />
//                     </>
//                   )}
//                 />

//                 <button type="button" onClick={() => remove(attrIndex)} className="text-red-500">
//                   Xóa
//                 </button>
//               </div>

//               <ValuesInput control={control} attrIndex={attrIndex} initData={initData} />
//             </div>
//           ))}

//           <button
//             type="button"
//             onClick={() => append({ name: "", values: [{ value: "" }] })}
//             className="bg-green-500 text-white px-3 py-2"
//           >
//             Thêm Thuộc Tính
//           </button>

//           {/* DANH SÁCH BIẾN THỂ */}
//           {variants.length > 0 && (
//             <div className="mt-5">
//               <h2 className="text-lg font-bold">Danh Sách Biến Thể</h2>
//               {variants.map((variant, index) => {
//                 return (
//                   <div key={variant.id} className="flex items-center gap-2 mt-2">
//                     <span className="border p-2 flex-1">{variant.sku || variant.sku}</span>

//                     {/* Nhập giá */}
//                     <FormField
//                       control={form.control}
//                       name={`variants.${index}.price`}
//                       render={({ field }) => (
//                         <>
//                           <Input {...field} placeholder="Nhập giá" className="border p-2 w-24" />
//                           <FormMessage className="text-sm text-red-500" />
//                         </>
//                       )}
//                     />

//                     <FormField
//                       control={form.control}
//                       name={`variants.${index}.stock`}
//                       render={({ field }) => (
//                         <>
//                           <Input {...field} placeholder="Nhập tồn kho" className="border p-2 w-24" />
//                           <FormMessage className="text-sm text-red-500" />
//                         </>
//                       )}
//                     />
//                   </div>
//                 );
//               })}
//             </div>
//           )}

//           <button type="submit" className="bg-blue-600 text-white px-3 py-2 mt-3">
//             Gửi Dữ Liệu
//           </button>
//         </form>
//       </Form>
//     </>
//   );
// }

// // Component nhập giá trị thuộc tính
// const ValuesInput = ({ control, attrIndex, initData }: { control: any; attrIndex: number; initData: any }) => {
//   let { fields, append, remove } = useFieldArray({
//     control,
//     name: `attributes.${attrIndex}.values`,
//   });
//   console.log("field1 : ", fields);

//   // if (initData) {
//   //   fields = (fields as Field[]).map((field) => {
//   //     return {
//   //       id: field.id,
//   //       value: field["0"],
//   //     };
//   //   }) as any;
//   // }
//   // console.log(fields);

//   return (
//     <div>
//       {fields.map((field: any, valueIndex) => {
//         console.log(field.id);
//         return (
//           <div key={field.id} className="flex gap-2 mt-2">
//             <FormField
//               control={control}
//               // name={
//               //   initData
//               //     ? `attributes.${attrIndex}.values.${valueIndex}.0`
//               //     : `attributes.${attrIndex}.values.${valueIndex}.value`
//               // }
//               name={`attributes.${attrIndex}.values.${valueIndex}.value`}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormControl>
//                     <input {...field} placeholder="Nhập giá trị" className="border p-2 flex-1" />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <button type="button" className="bg-red-500 text-white px-2 py-1" onClick={() => remove(valueIndex)}>
//               Xóa
//             </button>
//           </div>
//         );
//       })}

//       <button type="button" onClick={() => append({ value: "" })} className="bg-blue-500 text-white px-3 py-1 mt-2">
//         Thêm Giá Trị
//       </button>
//     </div>
//   );
// };

// export default ProductForm;

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
// import MultiSelect from "@/components/multi-select";
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
      message: "Name must be contain at least 1 character",
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
    const newVariants = data.variants;
    const oldVariants = initData?.product_variants;

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

  // useEffect(() => {
  //   if (!isMounted) return;
  //   const attributeValues = watchedAttributes
  //     .map((attr) => attr.values.map((v) => v).filter(Boolean))
  //     .filter((arr) => arr.length > 0);
  //   if (attributeValues.length > 0) {
  //     let skus = cartesianProduct(attributeValues);
  //     const newVariants = skus.map((comb) => ({
  //       sku: comb.join(" - "),
  //       price: 0,
  //       stock: 0,
  //     }));

  //     newVariants.forEach((_, index) => {
  //       form.setValue(`variants.${index}.price`, 0); // Đặt giá trị price là ""
  //       form.setValue(`variants.${index}.stock`, 0); // Đặt giá trị stock là ""
  //     });
  //     setVariants(newVariants);
  //     // router.refresh();
  //   }
  // }, [watchedAttributes]);
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
  const action = initData ? "Save change" : "Create";
  const title = initData ? "Edit product" : "Create product";
  const toastMessage = initData ? "Updated success" : "Create success";
  const description = initData ? "Change your product" : "Add a new product";
  return (
    <>
      <>
        <AlertModal
          open={open}
          onClose={() => setOpen(false)}
          action="Delete"
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
                <FormLabel className="font-semibold">Images</FormLabel>
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
                  <FormLabel className="font-semibold">Name</FormLabel>
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
                  <FormLabel className="font-semibold">Category</FormLabel>
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
                  <FormLabel className="font-semibold">Sales</FormLabel>
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
                    <FormLabel className="font-semibold">Featured</FormLabel>
                    <FormDescription>This product will appear in the home page.</FormDescription>
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
                    <FormLabel className="font-semibold">Archived</FormLabel>
                    <FormDescription>This product will not appear any where in store.</FormDescription>
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
                  Delete
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
            Add variant
          </button>

          {/* DANH SÁCH BIẾN THỂ */}
          {variants.length > 0 && (
            <div className="mt-5">
              <h2 className="text-lg font-bold">Product Variant List</h2>
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
              // name={
              //   initData
              //     ? `attributes.${attrIndex}.values.${valueIndex}.0`
              //     : `attributes.${attrIndex}.values.${valueIndex}.value`
              // }
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
              Delete
            </button>
          </div>
        );
      })}

      <button
        type="button"
        onClick={() => append("")}
        className="bg-blue-500 hover:opacity-40  text-white px-3 py-1 mt-2"
      >
        Add value
      </button>
    </div>
  );
};

export default ProductForm;
