"use client";
import { useState } from "react";
import { formattedPrice } from "@/lib/utils";
import { OrderType } from "@/Type/OrderTypes";
import { orderAPI } from "@/apiRequest/orderAPI";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react"; // Spinner icon
import { toast } from "@/components/ui/use-toast";
import AlertModal from "@/components/alert-modal";
import { useRouter } from "next/navigation";

interface CellStatusOrderProps {
  row: OrderType;
}

function CellStatusOrder({ row }: CellStatusOrderProps) {
  const [isPaid, setIsPaid] = useState(row.is_paid);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const handleStatusChange = async () => {
    /// hỏi người dùng có chắc ko đã
    setLoading(true);
    setError(null);
    try {
      const response = await orderAPI.updateStatusOrder({ order_id: row._id, is_paid: !isPaid });
      if (!response.error) {
        setIsPaid(response.data.is_paid);
        toast({
          title: "Update status order success",
          variant: "success",
        });
      }
    } catch (err) {
      setError("Failed to update status");
      toast({
        title: "Failed to update status",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setOpen(false);
      router.refresh();
    }
  };
  return (
    <>
      <AlertModal
        open={open}
        onClose={() => setOpen(false)}
        action="confirm"
        variant="default"
        onConfirm={handleStatusChange}
        isLoading={loading}
      />
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Badge variant={isPaid ? "secondary" : "destructive"}>{isPaid ? "Paid" : "Unpaid"}</Badge>
          <Button variant="outline" size="sm" onClick={() => setOpen(true)} disabled={loading}>
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : isPaid ? "Mark Unpaid" : "Mark Paid"}
          </Button>
        </div>

        {error && <div className="text-red-500 text-sm">{error}</div>}
      </div>
    </>
  );
}

export default CellStatusOrder;
