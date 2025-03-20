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
      const product = row.original;
      const totalSold = product.product_variants.reduce((acc: any, cur: any) => {
        console.log(cur.sold);
        return acc + cur.sold;
      }, 0);
      return <div>{totalSold}</div>;
    },
  },
  {
    header: "Sales (%)",
    accessorKey: "sales",
  },

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
