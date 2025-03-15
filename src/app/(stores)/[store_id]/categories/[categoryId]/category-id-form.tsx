// "use client";

// import z from "zod";
// import { useState } from "react";
// import { Trash } from "lucide-react";
// import { useParams, useRouter } from "next/navigation";
// import { useForm, useFormState } from "react-hook-form";

// import Heading from "@/components/heading";
// import { Input } from "@/components/ui/input";
// import AlertModal from "@/components/alert-modal";
// import { toast } from "@/components/ui/use-toast";
// import { zodResolver } from "@hookform/resolvers/zod";
// import LoadingButton from "@/components/loading-button";
// import { categoryAPI } from "@/apiRequest/categoryAPI";
// import { handlError } from "@/components/handle-error";
// import { CategoryResType } from "@/Type/CategoryTypes";
// import { Button, buttonVariants } from "@/components/ui/button";
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// interface CategoryFormProps {
//   initObjectData: CategoryResType | null;
// }
// const formSchema = z.object({
//   name: z.string().min(1, {
//     message: "Name must be contain at least 1 character",
//   }),
//   billboardId: z.string().min(1, { message: "Image cannot be emty" }),
// });

// function CategoryForm({ initObjectData }: CategoryFormProps) {
//   const initData = initObjectData?.data.category;
//   const listBillboard = initObjectData?.data.listBillboard;
//   const router = useRouter();
//   const params = useParams();
//   const [isLoading, setIsLoading] = useState(false);
//   const [open, setOpen] = useState(false);
//   const action = initData ? "Save change" : "Create";
//   const title = initData ? "Edit category" : "Create category";
//   const description = initData ? "Change your category" : "Add a new category";
//   const toastMessage = initData ? "Updated success" : "Create success";
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: initData?.name || "",
//     },
//   });
//   const { isDirty } = useFormState({ control: form.control });
//   const onSubmit = async (data: z.infer<typeof formSchema>) => {
//     try {
//       setIsLoading(true);
//       if (initData) {
//         if (!isDirty) {
//           return form.setError("name", { message: "Nothing has change." });
//         }
//         await categoryAPI.updateCategory({
//           name: data.name,
//           _id: initData?._id,
//         });
//       } else {
//         await categoryAPI.createCategory({
//           store_id: params.store_id as string,
//           name: data.name,
//         });
//       }
//       // thứ tự 2 route này quan trọng
//       router.push(`/${params.store_id}/categories`);
//       router.refresh();
//       toast({
//         title: toastMessage,
//         variant: "success",
//       });
//     } catch (error) {
//       handlError({
//         consoleError: "UPDATE_CATEGORY_ERROR",
//         error,
//         isToast: true,
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   const handleDeleteCategory = async () => {
//     try {
//       setIsLoading(true);
//       await categoryAPI.deleteBillboard({
//         _id: params.categoryId as string,
//       });
//       toast({
//         title: "Delete category success.",
//         variant: "success",
//       });
//       // thứ tự 2 route này quan trọng
//       router.push(`/${params.store_id}/categories`);
//       router.refresh();
//     } catch (error) {
//       handlError({
//         consoleError: "DELETE_CATEGORY_ERROR",
//         error,
//         isToast: true,
//       });
//     } finally {
//       setIsLoading(false);
//       setOpen(false);
//     }
//   };

//   return (
//     <>
//       <>
//         <AlertModal
//           action="Delete"
//           variant="destructive"
//           open={open}
//           onClose={() => setOpen(false)}
//           onConfirm={handleDeleteCategory}
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
//         <form onSubmit={form.handleSubmit(onSubmit)} className="w-[320px] mt-4 space-y-6">
//           <FormField
//             control={form.control}
//             name="name"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel className="font-semibold">Label</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Category name" {...field} className="select-none" disabled={isLoading} />
//                 </FormControl>
//                 <FormMessage className="text-sm" />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="billboardId"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel className="font-semibold">Billboard label</FormLabel>
//                 <Select onValueChange={field.onChange} defaultValue={field.value}>
//                   <FormControl>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Choose one billboard to create category" />
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent>
//                     {listBillboard?.map((billboard) => (
//                       <SelectItem key={billboard._id} value={`${billboard._id}`}>
//                         {billboard.label}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//                 <FormMessage className="text-sm" />
//               </FormItem>
//             )}
//           />
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

// export default CategoryForm;

"use client";

import z from "zod";
import { useState } from "react";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useForm, useFormState } from "react-hook-form";

import Heading from "@/components/heading";
import { Input } from "@/components/ui/input";
import AlertModal from "@/components/alert-modal";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "@/components/loading-button";
import { categoryAPI } from "@/apiRequest/categoryAPI";
import { handlError } from "@/components/handle-error";
import { CategoryResType } from "@/Type/CategoryTypes";
import { Button, buttonVariants } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CategoryFormProps {
  initObjectData: CategoryResType | null;
}
const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name must be contain at least 1 character",
  }),
});

function CategoryForm({ initObjectData }: CategoryFormProps) {
  const initData = initObjectData?.data;
  const router = useRouter();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const action = initData ? "Save change" : "Create";
  const title = initData ? "Edit category" : "Create category";
  const description = initData ? "Change your category" : "Add a new category";
  const toastMessage = initData ? "Updated success" : "Create success";
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initData?.name || "",
    },
  });
  const { isDirty } = useFormState({ control: form.control });
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      if (initData) {
        if (!isDirty) {
          return form.setError("name", { message: "Nothing has change." });
        }
        await categoryAPI.updateCategory({
          name: data.name,
          _id: initData?._id,
        });
      } else {
        await categoryAPI.createCategory({
          store_id: params.store_id as string,
          name: data.name,
        });
      }
      // thứ tự 2 route này quan trọng
      router.push(`/${params.store_id}/categories`);
      router.refresh();
      toast({
        title: toastMessage,
        variant: "success",
      });
    } catch (error) {
      handlError({
        consoleError: "UPDATE_CATEGORY_ERROR",
        error,
        isToast: true,
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleDeleteCategory = async () => {
    try {
      setIsLoading(true);
      await categoryAPI.deleteBillboard({
        _id: params.categoryId as string,
      });
      toast({
        title: "Delete category success.",
        variant: "success",
      });
      // thứ tự 2 route này quan trọng
      router.push(`/${params.store_id}/categories`);
      router.refresh();
    } catch (error) {
      handlError({
        consoleError: "DELETE_CATEGORY_ERROR",
        error,
        isToast: true,
      });
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <>
        <AlertModal
          action="Delete"
          variant="destructive"
          open={open}
          onClose={() => setOpen(false)}
          onConfirm={handleDeleteCategory}
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-[320px] mt-4 space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Label</FormLabel>
                <FormControl>
                  <Input placeholder="Category name" {...field} className="select-none" disabled={isLoading} />
                </FormControl>
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />

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

export default CategoryForm;
