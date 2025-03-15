"use client";

import { ColumnDef } from "@tanstack/react-table";

import { OrderType } from "@/Type/OrderTypes";
import { ProductType } from "@/Type/ProductType";
import CellPriceOrder from "@/app/(stores)/[store_id]/orders/_table_order/cell-price-order";
import OrderCellAction from "@/app/(stores)/[store_id]/orders/_table_order/cell-action-oder";
import CellStatusOrder from "./cell-status-order";

interface productOrderProps {
  product_variant_id: string;
  quantity: number;
  snapshot_price: number;
  product: ProductType;
}

export const OrderColumns: ColumnDef<OrderType>[] = [
  {
    header: "Products",
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
              <span className="font-semibold">Name:</span> {product?.name}
            </div>
            <div className="flex items-center gap-x-3">
              {Object.entries(product_variant_user_select?.variant_values || {}).map(([key, value]) => (
                <div key={key}>
                  <strong>{key}:</strong> {value}
                </div>
              ))}
              Quantity: {productOrder.quantity}
            </div>
          </div>
        );
      });
      // return "a";
    },
  },
  {
    header: "Customer",
    accessorKey: "user",
  },
  {
    header: "Phone",
    accessorKey: "phone",
  },
  {
    header: "Address",
    accessorKey: "address",
  },
  {
    header: "Total price",
    cell: ({ row }) => <CellPriceOrder row={row.original} />,
  },
  {
    header: "Paid",
    cell: ({ row }) => <CellStatusOrder row={row.original} />,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <OrderCellAction row={row.original} />,
  },
];
