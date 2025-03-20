"use client";

import Heading from "@/components/heading";
import { ListOrderResType } from "@/Type/OrderTypes";
import { DataTable } from "@/components/data-table/data-table";
import { OrderColumns } from "@/app/(stores)/[store_id]/orders/_table_order/order-columns";

interface OrdersClientProps {
  listObjectOrder: ListOrderResType | null;
}

function OrdersClient({ listObjectOrder }: OrdersClientProps) {
  const listOrder = listObjectOrder?.data;
  return (
    <div>
      <div className="flex items-center border-b pb-4">
        <Heading title={`Đơn hàng( ${listOrder?.length})`} description="Quản lý tùy chỉnh đơn hàng" />
      </div>
      {listOrder && (
        <div className="lg:container mx-auto py-10">
          <DataTable columns={OrderColumns} data={listOrder} filterBy="phone" />
        </div>
      )}
    </div>
  );
}

export default OrdersClient;
