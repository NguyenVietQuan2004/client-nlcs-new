"use client";

import Image from "next/image";
import { File, TrashIcon } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";

import LoadingButton from "@/components/loading-button";
import { Button, buttonVariants } from "@/components/ui/button";

interface ImageUploadProps {
  title?: string;
  value?: string[];
  isLoading: boolean;
  children?: React.ReactNode;
  onChange: (url: string) => void;
  onRemove: (url?: string) => void;
}

export default function ImageUpload({ value, isLoading, onChange, onRemove, title, children }: ImageUploadProps) {
  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };
  return (
    <div className="">
      <div className="flex gap-6 flex-wrap">
        {children
          ? children
          : value?.map((item) => {
              return (
                <div key={item} className="relative w-[200px] h-[200px] object-cover overflow-hidden ">
                  <Image
                    alt=""
                    src={item}
                    width={600}
                    height={600}
                    className="w-[200px] h-[200px] object-cover rounded-sm select-none"
                  />
                  <Button
                    className={buttonVariants({
                      className: "absolute z-50 top-2 right-2 px-2",
                      variant: "destructive",
                      size: "sm",
                    })}
                    onClick={() => onRemove(item)}
                  >
                    <TrashIcon className="w-4 h-4" />
                  </Button>
                </div>
              );
            })}
      </div>
      <CldUploadWidget onSuccess={onUpload} uploadPreset="nien-luan-co-so" options={{ multiple: true }}>
        {({ open }) => {
          const onClick = () => {
            open();
          };
          return (
            <Button
              type="button"
              onClick={onClick}
              className={buttonVariants({
                variant: "secondary",
                className: "text-black mt-2",
              })}
              disabled={isLoading}
            >
              {isLoading ? (
                <LoadingButton />
              ) : (
                <>
                  <File className="h-4 w-4 mr-2 " />
                  {title || " Upload 1 ảnh"}
                </>
              )}
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
}
