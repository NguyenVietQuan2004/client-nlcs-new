"use client";

import { format } from "date-fns";
import { ArrowUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { ProductType } from "@/Type/ProductType";
import ProductCellAction from "@/app/(stores)/[store_id]/products/[productId]/_table_product/cell-product-actions";

// export const ProductColumns: ColumnDef<ProductType>[] = [
export const ProductColumns: ColumnDef<ProductType>[] = [
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Archived",
    accessorKey: "is_archived",
  },
  {
    header: "Featured",
    accessorKey: "is_featured",
  },

  {
    header: "Category",
    accessorKey: "category",
    cell: ({ row }) => {
      const category: any = row.getValue("category");
      return <div>{category.name}</div>;
    },
  },
  {
    header: "Price",
    cell: ({ row }) => {
      const price = row.original.product_variants[0]?.price;
      return <div>{price}</div>;
    },
  },
  {
    header: "Sold",
    cell: ({ row }) => {
      // const totalProductSold = row.original.arrayPrice.reduce((pre: any, cur, arr) => {
      //   return cur.amount_sold + pre;
      // }, 0);
      return <div>{0}</div>;
    },
  },
  {
    header: "Sales (%)",
    accessorKey: "sales",
  },
  // {
  //   header: "Size",
  //   cell: ({ row }) => {
  //     const firstObjectPrice = (row.original.arrayPrice as Array<any>)[0];
  //     return <div>{firstObjectPrice.size}</div>;
  //   },
  // },
  // {
  //   header: "Color",
  //   cell: ({ row }) => {
  //     const firstObjectPrice = (row.original.arrayPrice as Array<any>)[0];
  //     return (
  //       <div className="flex gap-1 items-center">
  //         {firstObjectPrice.colors[0]}
  //         <div style={{ backgroundColor: firstObjectPrice.colors[0] }} className={`w-4 h-4 rounded-full border `}></div>
  //       </div>
  //     );
  //   },
  // },
  {
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorKey: "createdAt",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      const formattedDate = format(date, "MMMM dd yyyy");
      return <div>{formattedDate}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <ProductCellAction row={row.original} />,
  },
];
