"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { PlusCircleIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { storeAPI } from "@/apiRequest/storeAPI";
import { toast } from "@/components//ui/use-toast";
import LoadingButton from "@/components/loading-button";
import useModalCreateStore from "@/hooks/useModalCreateStore";
import { Button, buttonVariants } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { handlError } from "./handle-error";

interface ModalCreateStoreProps {
  autoShow?: boolean;
}
const formSchema = z.object({
  name: z.string().min(1, {
    message: "Tên phải chứa ít nhất 1 ký tự",
  }),
});

function ModalCreateStore({ autoShow }: ModalCreateStoreProps) {
  const { isShowModalCreate, setIsShowModalCreate } = useModalCreateStore();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  useEffect(() => {
    if (autoShow) {
      setIsShowModalCreate(true);
    }
  }, [autoShow, setIsShowModalCreate]);
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    data.name = data.name.trim();
    setIsLoading(true);
    try {
      const result = await storeAPI.createStore(data);
      toast({
        title: "Tạo cửa hàng thành công.",
        variant: "success",
      });
      setIsShowModalCreate(false);
      window.location.assign(`/${result?.data?._id}`);
    } catch (error) {
      handlError({
        consoleError: "CREATE_STORE_ERROR",
        error,
        isToast: true,
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <Dialog open={isShowModalCreate}>
        <DialogTrigger asChild>
          {!autoShow && (
            <Button
              className={buttonVariants({
                className: "w-full pl-4 h-[50px] text-black border-x-0 border-b-0",
                variant: "outline",
              })}
              onClick={() => {
                setIsShowModalCreate(true);
              }}
            >
              <PlusCircleIcon className="h-4 w-4 mr-2" />
              <div className="font-medium ">Thêm mới cửa hàng</div>
              <div className="ml-auto"></div>
            </Button>
          )}
        </DialogTrigger>
        <DialogContent setIsShowModal={setIsShowModalCreate}>
          <DialogHeader>
            <DialogTitle>Thêm mới cửa hàng</DialogTitle>
            <DialogDescription>Thêm mới cửa hàng để quản lí danh mục và sản phẩm của bạn</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name store" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage className="text-sm" />
                  </FormItem>
                )}
              />
              <div className="flex mt-4 justify-end">
                <Button
                  type="button"
                  className={buttonVariants({
                    variant: "outline",
                    className: "text-black mr-2",
                  })}
                  onClick={() => {
                    setIsShowModalCreate(false);
                  }}
                >
                  Hủy
                </Button>
                <Button type="submit" className="min-w-[93px]" disabled={isLoading}>
                  {isLoading ? <LoadingButton /> : "Tiếp tục"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ModalCreateStore;
