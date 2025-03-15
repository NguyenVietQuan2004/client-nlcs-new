"use client";

import z from "zod";
import Image from "next/image";
import { useEffect, useState } from "react";
import { TrashIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import Heading from "@/components/heading";
import { toast } from "@/components/ui/use-toast";
import ImageUpload from "@/components/image-upload";
import LoadingButton from "@/components/loading-button";
import { handlError } from "@/components/handle-error";
import { ImagesHomePageResType } from "@/Type/ImagesHomePage";
import { Button, buttonVariants } from "@/components/ui/button";
import { ImagesHomePageAPI } from "@/apiRequest/ImagesHomePageAPI";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface PreviewStoreClientProps {
  initObjectData: ImagesHomePageResType | null;
}

const formSchema = z.object({
  billboard_banner: z.string().min(1, {
    message: "You have to upload at least 1 image.",
  }),
  billboard_feature: z.array(z.string()).length(3, {
    message: "You must be upload 3 images.",
  }),
  background_insurance: z.string().min(1, {
    message: "You have to upload at least 1 image.",
  }),
});
function PreviewStoreClient({ initObjectData }: PreviewStoreClientProps) {
  const initData = initObjectData?.data;
  const [multiImages, setMultiImages] = useState(initData?.ImagesHomePage?.billboard_feature || []);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      billboard_banner: initData?.ImagesHomePage?.billboard_banner || "",
      billboard_feature: initData?.ImagesHomePage?.billboard_feature || [],
      background_insurance: initData?.ImagesHomePage?.background_insurance || "",
    },
  });
  const action = initData ? "Save change" : "Create";
  const toastMessage = initData ? "Updated success" : "Create success";

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      if (initData) {
        await ImagesHomePageAPI.updateImagesHomePage({
          store_id: params.store_id as string,
          billboard_banner: data.billboard_banner,
          billboard_feature: data.billboard_feature,
          background_insurance: data.background_insurance,
        });
      } else {
        await ImagesHomePageAPI.createImagesHomePage({
          store_id: params.store_id as string,
          billboard_banner: data.billboard_banner,
          billboard_feature: data.billboard_feature,
          background_insurance: data.background_insurance,
        });
      }
      toast({
        title: toastMessage,
        variant: "success",
      });
      router.refresh();
    } catch (error) {
      handlError({ consoleError: "UPDATE_CREATE_BILLBOARD_ERROR", error, isToast: true });
    } finally {
      setIsLoading(false);
    }
  };
  // useEffect(() => {
  //   setMultiImages(initData?.billboard_feature || []); // Đồng bộ multiImages với field.value khi render lại
  // }, [initData?.billboard_feature]);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onKeyDown={(e: React.KeyboardEvent<any>) => {
          e.key === "Enter" && e.preventDefault();
        }}
      >
        <div className="">
          <div className="flex items-center border-b pb-4">
            <Heading title="Upload" description="Upload another image for homepage" />
          </div>
          <div className=" mt-8 ">
            <Button type="submit" className="min-w-[118px]" disabled={isLoading}>
              {isLoading ? <LoadingButton /> : action}
            </Button>
          </div>
          <div className="border mt-10 w-[800px] mx-auto">
            <div className="text-center border">Navbar</div>
            <div className="flex justify-center ">
              <FormField
                control={form.control}
                name="billboard_feature"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <ImageUpload
                        isLoading={isLoading}
                        // value={field.value ? field.value : []}
                        onChange={(url) => {
                          setMultiImages((multiImages) => {
                            field.onChange([...multiImages, url]); // Đồng bộ với form
                            return [...multiImages, url];
                          }); // Cập nhật trạng thái cục bộ
                        }}
                        onRemove={() => {}}
                      >
                        <div className="w-full grid grid-cols-3 gap-1 mt-4">
                          {multiImages.map((item) => (
                            <div key={item} className="relative border flex justify-center items-center ">
                              <Image
                                alt=""
                                src={item}
                                width={1000}
                                height={1000}
                                className="w-full aspect-[2/3] max-h-full object-cover"
                              />
                              <Button
                                className={buttonVariants({
                                  className: "absolute z-50 top-2 right-2 px-2",
                                  variant: "destructive",
                                  size: "sm",
                                })}
                                onClick={() => {
                                  setMultiImages((multiImages) => {
                                    field.onChange(multiImages.filter((url) => url !== item)); // Đồng bộ với form
                                    return multiImages.filter((url) => url !== item);
                                  }); // Cập nhật trạng thái cục bộ
                                }}
                              >
                                <TrashIcon className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </ImageUpload>
                    </FormControl>
                    <FormMessage className="text-sm" />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-3 gap-1 mt-4">
              {!form.getValues("billboard_feature").length &&
                [1, 2, 3].map((item) => (
                  <div key={item} className="border flex justify-center items-center w-full aspect-[2/3]">
                    Feature billboard
                  </div>
                ))}
            </div>

            <FormField
              control={form.control}
              name="background_insurance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold"></FormLabel>
                  <FormControl>
                    <ImageUpload
                      isLoading={isLoading}
                      value={field.value ? [field.value] : []}
                      onChange={(url) => field.onChange(url)}
                      onRemove={() => field.onChange("")}
                      title="Upload your background insurance"
                    >
                      {field.value && (
                        <div className="relative border w-full flex justify-center items-center ">
                          <Image
                            alt=""
                            src={field.value}
                            width={1000}
                            height={1000}
                            className="w-full h-[400px]  object-cover"
                          />
                          <Button
                            className={buttonVariants({
                              className: "absolute z-50 top-2 right-2 px-2",
                              variant: "destructive",
                              size: "sm",
                            })}
                            onClick={() => field.onChange("")}
                          >
                            <TrashIcon className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </ImageUpload>
                  </FormControl>
                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />

            <div className=" mt-4 w-full">
              {!form.getValues("background_insurance").length && (
                <div className="border flex justify-center items-center w-full h-[400px]"> Background insurance</div>
              )}
            </div>

            <FormField
              control={form.control}
              name="billboard_banner"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold"></FormLabel>
                  <FormControl>
                    <ImageUpload
                      isLoading={isLoading}
                      value={field.value ? [field.value] : []}
                      onChange={(url) => field.onChange(url)}
                      onRemove={() => field.onChange("")}
                      title="Upload your billboard BST "
                    >
                      {field.value && (
                        <div className="relative border w-full flex justify-center items-center ">
                          <Image
                            alt=""
                            src={field.value}
                            width={1000}
                            height={1000}
                            className="w-full h-[400px]  object-cover"
                          />
                          <Button
                            className={buttonVariants({
                              className: "absolute z-50 top-2 right-2 px-2",
                              variant: "destructive",
                              size: "sm",
                            })}
                            onClick={() => field.onChange("")}
                          >
                            <TrashIcon className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </ImageUpload>
                  </FormControl>
                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />

            <div className=" mt-4 w-full">
              {!form.getValues("billboard_banner").length && (
                <div className="border flex justify-center items-center w-full h-[400px]"> Billboard BST</div>
              )}
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}

export default PreviewStoreClient;
