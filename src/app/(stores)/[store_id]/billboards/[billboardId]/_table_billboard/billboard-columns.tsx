"use client";

import { format } from "date-fns";
import { ArrowUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { BillboardType } from "@/Type/BillboardTypes";
import BillboardCellAction from "@/app/(stores)/[store_id]/billboards/[billboardId]/_table_billboard/cell-billboard-actions";

export const BillboardColumns: ColumnDef<BillboardType>[] = [
  {
    header: "Nhãn",
    accessorKey: "label",
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
    cell: ({ row }) => <BillboardCellAction row={row.original} />,
  },
];
