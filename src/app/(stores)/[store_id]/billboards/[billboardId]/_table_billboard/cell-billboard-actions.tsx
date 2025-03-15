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
import { toast } from "@/components/ui/use-toast";
import AlertModal from "@/components/alert-modal";
import { BillboardType } from "@/Type/BillboardTypes";
import { handlError } from "@/components/handle-error";
import { billboardAPI } from "@/apiRequest/billboardAPI";

interface CellActionProps {
  row: BillboardType;
}
function BillboardCellAction({ row }: CellActionProps) {
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
  const handleDeleteBillboard = async () => {
    try {
      setIsLoading(true);
      await billboardAPI.deleteBillboard({
        _id: row._id,
      });
      toast({
        title: "Delete billboard success.",
        variant: "success",
      });
      router.refresh();
    } catch (error) {
      handlError({ consoleError: "DELETE_BILLBOARD_ERROR", error, isToast: true });
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
        action="Delete"
        variant="destructive"
        onConfirm={handleDeleteBillboard}
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
          <DropdownMenuItem onClick={() => router.push(`billboards/${row._id}`)}>Update</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default BillboardCellAction;
