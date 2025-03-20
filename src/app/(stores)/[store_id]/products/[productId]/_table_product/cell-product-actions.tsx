"use client";

import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ProductType } from "@/Type/ProductType";
import { toast } from "@/components/ui/use-toast";
import AlertModal from "@/components/alert-modal";
import { productAPI } from "@/apiRequest/productAPI";
import { handlError } from "@/components/handle-error";

interface CellActionProps {
  row: ProductType;
}
function ProductCellAction({ row }: CellActionProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const params = useParams();
  const onCopy = () => {
    toast({
      variant: "success",
      title: "Copied!",
    });
    navigator.clipboard.writeText(row._id);
  };
  const handleDeleteProduct = async () => {
    try {
      setIsLoading(true);
      await productAPI.deleteProduct({
        _id: row._id as string,
      });
      toast({
        title: "Delete product success.",
        variant: "success",
      });
      router.refresh();
    } catch (error) {
      handlError({
        consoleError: "DELETE_PRODUCT_ERROR",
        error,
        isToast: true,
      });
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  };

  return (
    <div>
      <AlertModal
        open={open}
        onClose={() => setOpen(false)}
        action="Xóa"
        variant="destructive"
        onConfirm={handleDeleteProduct}
        isLoading={isLoading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={onCopy}>Copy ID</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => router.push(`products/${row._id}`)}>Update</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default ProductCellAction;
