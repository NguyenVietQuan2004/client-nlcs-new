"use client";

import z from "zod";
import { useState } from "react";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm, useFormState } from "react-hook-form";

import Heading from "@/components/heading";
import { Input } from "@/components/ui/input";
import { StoreResType } from "@/Type/StoreTypes";
import { storeAPI } from "@/apiRequest/storeAPI";
import AlertModal from "@/components/alert-modal";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { handlError } from "@/components/handle-error";
import LoadingButton from "@/components/loading-button";
import { Button, buttonVariants } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface SettingFormProps {
  initData: StoreResType;
}
const formSchema = z.object({
  name: z.string().min(1, {
    message: "Tên phải chứa ít nhất 1 ký tự",
  }),
});

function SettingForm({ initData }: SettingFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initData.data.name,
    },
  });
  const { isDirty } = useFormState({ control: form.control });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      if (!isDirty) {
        return form.setError("name", { message: "Nothing has change." });
      }
      await storeAPI.updateStore({ _id: initData.data._id, name: data.name });
      router.refresh();
      toast({
        title: "Cập nhật thành công.",
        variant: "success",
      });
    } catch (error) {
      handlError({ consoleError: "UPDATE_STORE_ERROR", error, isToast: true });
    } finally {
      setIsLoading(false);
    }
  };
  const handleDeleteStore = async () => {
    try {
      setIsLoading(true);
      await storeAPI.deleteStore({ _id: initData.data._id });
      toast({
        title: "Xóa cửa hàng thành công.",
        variant: "success",
      });
      router.refresh();
    } catch (error) {
      handlError({
        consoleError: "DELETE_STORE_ERROR",
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
      <AlertModal
        open={open}
        onClose={() => setOpen(false)}
        action="Xóa"
        variant="destructive"
        onConfirm={handleDeleteStore}
        isLoading={isLoading}
      />
      <div className="flex items-center border-b pb-4">
        <Heading title="Cài đặt" description="Quản lý tùy chỉnh cửa hàng" />
        <Button
          className={buttonVariants({
            className: "!p-3 ml-auto",
            variant: "destructive",
          })}
          onClick={() => setOpen(true)}
        >
          <Trash className="w-5 h-5" />
        </Button>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-[320px] mt-4 min-h-[72vh]">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="font-semibold mb-10">Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name store" {...field} className="select-none " disabled={isLoading} />
                </FormControl>
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />
          <div className=" mt-8 lg:mt-4  ">
            <Button type="submit" className="min-w-[118px]" disabled={isLoading}>
              {isLoading ? <LoadingButton /> : "Save change"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}

export default SettingForm;
