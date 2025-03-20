"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { CheckIcon, ChevronsUpDown, SearchIcon, StoreIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ListStoreResType } from "@/Type/StoreTypes";
import { buttonVariants } from "@/components/ui/button";
import ModalCreateStore from "@/components/modal-create-store";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface DropDownStoreProps {
  listStore: ListStoreResType;
}

function DropDownStore({ listStore: listStoreInit }: DropDownStoreProps) {
  const params = useParams();
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [listStore, setListStore] = useState(listStoreInit.data);

  const onSelectedStore = (newstore_id: string) => {
    router.push(`/${newstore_id}`);
  };
  const currentStore = listStoreInit.data.find((item) => {
    return item._id === params.store_id;
  });
  useEffect(() => {
    setListStore((_) => {
      if (!inputValue.trim()) {
        return listStoreInit.data;
      } else {
        return listStoreInit.data.filter((item) => item.name.includes(inputValue));
      }
    });
  }, [inputValue, listStoreInit.data]);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={buttonVariants({
            className: "w-[200px] text-black",
            variant: "outline",
          })}
        >
          <StoreIcon className="h-4 w-4 mr-2" />
          <div className="font-medium max-w-[120px]  truncate">{currentStore?.name}</div>
          <ChevronsUpDown className="h-4 w-4 ml-auto" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px]  p-0">
        <div className="flex items-center border-b">
          <SearchIcon className="w-5 h-5 ml-2 text-zinc-300" />
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Tìm kiếm..."
            className="border-none pl-2 !ring-0  !ring-offset-0 !outline-none"
          />
        </div>
        <div className="flex flex-col ">
          <div className="pl-2 mt-2 font-medium text-sm">Cửa hàng</div>
          <ul className="max-h-[160px] overflow-y-auto">
            {listStore?.map((item) => (
              <li key={item._id}>
                <Button
                  className={buttonVariants({
                    className: "w-full pl-4 text-black border-none",
                    variant: "outline",
                  })}
                  onClick={() => onSelectedStore(item._id)}
                >
                  <StoreIcon className="h-4 w-4 mr-2" />
                  <div className="font-medium max-w-[120px]  truncate">{item.name}</div>
                  {params.store_id === item._id ? (
                    <CheckIcon className="h-4 w-4 ml-auto" />
                  ) : (
                    <div className="ml-auto"></div>
                  )}
                </Button>
              </li>
            ))}
            {listStore?.length === 0 && <div className="text-center my-2 text-sm">Không có cửa hàng...</div>}
          </ul>
          <ModalCreateStore />
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default DropDownStore;
