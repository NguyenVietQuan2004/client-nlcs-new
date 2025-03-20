"use client";

import { ColumnDef } from "@tanstack/react-table";

import { OrderType } from "@/Type/OrderTypes";
import { ProductType } from "@/Type/ProductType";
import CellPriceOrder from "@/app/(stores)/[store_id]/orders/_table_order/cell-price-order";
import OrderCellAction from "@/app/(stores)/[store_id]/orders/_table_order/cell-action-oder";
import CellStatusOrder from "./cell-status-order";
import { format } from "date-fns";

interface productOrderProps {
  product_variant_id: string;
  quantity: number;
  snapshot_price: number;
  product: ProductType;
}

const formatDate = (dateString: any) => {
  if (!dateString) return "";
  return format(new Date(dateString), "MMMM d yyyy");
};
export const OrderColumns: ColumnDef<OrderType>[] = [
  {
    header: "Sản phẩm",
    accessorKey: "order_items",
    cell: ({ row }) => {
      return row.original.order_items?.map((productOrder: productOrderProps) => {
        const product: ProductType = productOrder.product;
        const product_variant_user_select = product.product_variants.find(
          (item) => item._id === productOrder.product_variant_id
        );
        return (
          <div key={`${product._id}${product_variant_user_select?._id}`}>
            <div>
              <span className="font-semibold">Tên:</span> {product?.name}
            </div>
            <div className="flex items-center gap-x-3">
              {Object.entries(product_variant_user_select?.variant_values || {}).map(([key, value]) => (
                <div key={key}>
                  <strong>{key}:</strong> {value}
                </div>
              ))}
              Số lượng: {productOrder.quantity}
            </div>
          </div>
        );
      });
      // return "a";
    },
  },
  {
    header: "Khách hàng",
    accessorKey: "user",
  },
  {
    header: "Số điện thoại",
    accessorKey: "phone",
  },
  {
    header: "Địa chỉ",
    accessorKey: "address",
  },
  {
    header: "Tổng giá",
    cell: ({ row }) => <CellPriceOrder row={row.original} />,
  },
  {
    header: "Thanh toán",
    cell: ({ row }) => <CellStatusOrder row={row.original} />,
  },
  {
    header: "Date",
    cell: ({ row }) => {
      row.original;
      return (
        <div>
          <div> Create At: {formatDate(row.original.createdAt)}</div>
          {row.original.paid_at?.toString() && <div>Paid At: {formatDate(row.original.paid_at)}</div>}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <OrderCellAction row={row.original} />,
  },
];
