"use client";

import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { OrderType } from "@/Type/OrderTypes";
import { Button } from "@/components/ui/button";
import { orderAPI } from "@/apiRequest/orderAPI";
import { toast } from "@/components/ui/use-toast";
import AlertModal from "@/components/alert-modal";
import { handlError } from "@/components/handle-error";

interface CellActionProps {
  row: OrderType;
}
function OrderCellAction({ row }: CellActionProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const params = useParams();

  const handleDeleteOrder = async () => {
    try {
      setIsLoading(true);
      await orderAPI.deleteOrder({
        order_id: row._id,
      });
      toast({
        title: "Xóa đơn hàng thành công.",
        variant: "success",
      });
      router.refresh();
    } catch (error) {
      handlError({ consoleError: "DELETE_ORDER_ERROR", error, isToast: true });
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
        onConfirm={handleDeleteOrder}
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
          <DropdownMenuItem onClick={() => setOpen(true)}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default OrderCellAction;
