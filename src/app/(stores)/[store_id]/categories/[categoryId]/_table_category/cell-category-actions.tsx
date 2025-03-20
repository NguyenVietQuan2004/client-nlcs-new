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
import AlertModal from "@/components/alert-modal";
import { toast } from "@/components/ui/use-toast";
import { CategoryType } from "@/Type/CategoryTypes";
import { categoryAPI } from "@/apiRequest/categoryAPI";
import { handlError } from "@/components/handle-error";

interface CellActionProps {
  row: CategoryType;
}
function CategoryCellAction({ row }: CellActionProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const params = useParams();
  const onCopy = () => {
    toast({
      variant: "success",
      title: "Copied!",
    });
    navigator.clipboard.writeText(row._id);
  };
  const handleDeleteCategory = async () => {
    try {
      setIsLoading(true);
      await categoryAPI.deleteBillboard({
        _id: row._id,
      });
      toast({
        title: "Xóa danh mục thành công.",
        variant: "success",
      });
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
    <div>
      <AlertModal
        action="Xóa"
        open={open}
        onClose={() => setOpen(false)}
        variant="destructive"
        onConfirm={handleDeleteCategory}
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
          <DropdownMenuItem onClick={() => router.push(`categories/${row._id}`)}>Update</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default CategoryCellAction;
