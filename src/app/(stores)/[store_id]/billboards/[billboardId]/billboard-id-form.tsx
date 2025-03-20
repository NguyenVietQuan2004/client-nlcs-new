"use client";

import z from "zod";
import { Trash } from "lucide-react";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm, useFormState } from "react-hook-form";

import Heading from "@/components/heading";
import { Input } from "@/components/ui/input";
import AlertModal from "@/components/alert-modal";
import { toast } from "@/components/ui/use-toast";
import ImageUpload from "@/components/image-upload";
import { zodResolver } from "@hookform/resolvers/zod";
import { handlError } from "@/components/handle-error";
import LoadingButton from "@/components/loading-button";
import { billboardAPI } from "@/apiRequest/billboardAPI";
import { BillboardResType } from "@/Type/BillboardTypes";
import { Button, buttonVariants } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface BillboardFormProps {
  initObjectData: BillboardResType | null;
}
// không tạo type riêng vì đang sử dụng  cả update và create chung 1 component
const formSchema = z.object({
  label: z.string().min(1, {
    message: "Tên phải chứa ít nhất 1 ký tự",
  }),
  image: z.string().min(1, { message: "Image cannot be emty" }),
});

function BillboardForm({ initObjectData }: BillboardFormProps) {
  const initData = initObjectData?.data;
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  // check xem đang muốn update hay create dựa vào có truyền data đầu vào không
  const action = initData ? "Lưu thay đổi" : "Tạo mới";
  const title = initData ? "Chỉnh sửa bảng quảng cáo" : "Tạo bảng quảng cáo";
  const description = initData ? "Thay đổi bảng quảng cáo của bạn" : "Thêm bảng quảng cáo mới";
  const toastMessage = initData ? "Cập nhật thành công" : "Tạo mới thành công";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      label: initData?.label || "",
      image: initData?.image || "",
    },
  });
  const { isDirty } = useFormState({ control: form.control });
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    data.label = data.label.trim();

    if (!data.image) {
      return form.setError("image", {
        message: "Background image is require",
      });
    }
    try {
      setIsLoading(true);
      if (initData) {
        if (!isDirty) {
          return form.setError("label", { message: "Nothing has change." });
        }
        await billboardAPI.updateBillboard({
          label: data.label,
          image: data.image,
          _id: initData._id,
        });
      } else {
        await billboardAPI.createBillboard({
          store_id: params.store_id as string,
          label: data.label,
          image: data.image,
        });
      }
      // thứ tự 2 route này quan trọng
      router.push(`/${params.store_id}/billboards`);
      router.refresh();
      toast({
        title: toastMessage,
        variant: "success",
      });
    } catch (error) {
      handlError({ consoleError: "UPDATE_CREATE_BILLBOARD_ERROR", error, isToast: true });
    } finally {
      setIsLoading(false);
    }
  };
  const handleDeleteBillboard = async () => {
    try {
      setIsLoading(true);
      await billboardAPI.deleteBillboard({
        _id: params.billboardId as string,
      });
      toast({
        title: "Xóa bảng quảng cáo thành công.",
        variant: "success",
      });
      // thứ tự 2 route này quan trọng
      router.push(`/${params.store_id}/billboards`);
      router.refresh();
    } catch (error) {
      handlError({
        consoleError: "DELETE_BILLBOARD_ERROR",
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
          open={open}
          onClose={() => setOpen(false)}
          action="Xóa"
          variant="destructive"
          onConfirm={handleDeleteBillboard}
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
          className="w-[320px] mt-4 space-y-6"
          onKeyDown={(e: React.KeyboardEvent<any>) => {
            e.key === "Enter" && e.preventDefault();
          }}
        >
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Ảnh quảng cáo</FormLabel>
                <FormControl>
                  <ImageUpload
                    isLoading={isLoading}
                    value={field.value ? [field.value] : []}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Nhãn</FormLabel>
                <FormControl>
                  <Input placeholder="Nhãn" {...field} className="select-none" disabled={isLoading} />
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

export default BillboardForm;
