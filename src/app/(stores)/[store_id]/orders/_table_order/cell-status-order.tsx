import { useState } from "react";
import { formattedPrice } from "@/lib/utils";
import { OrderType } from "@/Type/OrderTypes";
import { orderAPI } from "@/apiRequest/orderAPI";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react"; // Spinner icon
import { toast } from "@/components/ui/use-toast";

interface CellStatusOrderProps {
  row: OrderType;
}

function CellStatusOrder({ row }: CellStatusOrderProps) {
  const [isPaid, setIsPaid] = useState(row.is_paid);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalPrice: number = row.order_items.reduce((acc: number, productOrder: any) => {
    return acc + productOrder.snapshot_price * productOrder.quantity;
  }, 0);

  const handleStatusChange = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await orderAPI.updateStatusOrder({ order_id: row._id, is_paid: !isPaid });
      console.log(response.error);
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
    }
  };
  console.log(isPaid);
  return (
    <div className="flex flex-col gap-2">
      <span>{formattedPrice(totalPrice)}</span>

      <div className="flex items-center gap-2">
        <Badge variant={isPaid ? "secondary" : "destructive"}>{isPaid ? "Paid" : "Unpaid"}</Badge>

        <Button variant="outline" size="sm" onClick={handleStatusChange} disabled={loading}>
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : isPaid ? "Mark Unpaid" : "Mark Paid"}
        </Button>
      </div>

      {error && <div className="text-red-500 text-sm">{error}</div>}
    </div>
  );
}

export default CellStatusOrder;
