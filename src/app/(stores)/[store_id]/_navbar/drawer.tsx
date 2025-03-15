"use client";
import Image from "next/image";

import {
  DrawerTitle,
  DrawerClose,
  DrawerHeader,
  DrawerContent,
  DrawerTrigger,
  DrawerDescription,
  Drawer as DrawerShadcn,
} from "@/components/ui/drawer";
import ListRoute from "@/app/(stores)/[store_id]/_navbar/List-route";
import { CloseIcon, MenuIcon } from "../../../../../public/icons/icons";
import { useState } from "react";
function Drawer() {
  const [isShowModal, setIsShowModal] = useState(false);
  return (
    <DrawerShadcn open={isShowModal}>
      <DrawerTrigger onClick={() => setIsShowModal(true)}>
        {" "}
        <div className=" lg:hidden flex h-8 w-8 items-center justify-center rounded-sm border">
          <MenuIcon />
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerTitle></DrawerTitle>
        <DrawerDescription></DrawerDescription>
        <DrawerHeader className="flex items-center justify-between">
          <div className={`h-12 w-12 `}>
            <Image
              alt=""
              src="/images/hange.png"
              width={300}
              height={300}
              className="h-full w-full object-cover select-none"
            />
          </div>
          <div>
            <DrawerClose onClick={() => setIsShowModal(false)}>
              <CloseIcon />
            </DrawerClose>
          </div>
        </DrawerHeader>
        <div className="flex flex-col p-3">
          <ListRoute setIsShowModal={setIsShowModal} />
        </div>
      </DrawerContent>
    </DrawerShadcn>
  );
}

export default Drawer;
