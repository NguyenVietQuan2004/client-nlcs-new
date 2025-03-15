"use client";

import { format } from "date-fns";
import { ArrowUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { CategoryType } from "@/Type/CategoryTypes";
import { BillboardType } from "@/Type/BillboardTypes";
import CategoryCellAction from "@/app/(stores)/[store_id]/categories/[categoryId]/_table_category/cell-category-actions";

export const CategoryColumns: ColumnDef<CategoryType>[] = [
  {
    header: "Name",
    accessorKey: "name",
  },
  // {
  //   header: "Billboard",
  //   accessorKey: "billboardId",
  //   cell: ({ row }) => {
  //     const billboard: BillboardType = row.getValue("billboardId");
  //     return <div>{billboard.label}</div>;
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
    cell: ({ row }) => <CategoryCellAction row={row.original} />,
  },
];
