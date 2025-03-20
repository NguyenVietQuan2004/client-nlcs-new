"use client";

import { PlusIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import Heading from "@/components/heading";
import ApiList from "@/components/api-list";
import { ListBillboardResType } from "@/Type/BillboardTypes";
import { DataTable } from "@/components/data-table/data-table";
import { Button, buttonVariants } from "@/components/ui/button";
import { BillboardColumns } from "@/app/(stores)/[store_id]/billboards/[billboardId]/_table_billboard/billboard-columns";

interface BillboardsClientProps {
  listObjectBillboard: ListBillboardResType | null;
}

function BillboardsClient({ listObjectBillboard }: BillboardsClientProps) {
  const listBillboard = listObjectBillboard?.data;
  const router = useRouter();
  const params = useParams();

  return (
    <div>
      <div className="flex items-center border-b pb-4">
        <Heading title={`Bảng quảng cáo( ${listBillboard?.length})`} description="Quản lý tùy chỉnh bảng quảng cáo" />
        <Button
          className={buttonVariants({
            className: "ml-auto ",
          })}
          onClick={() => router.push(`/${params.store_id}/billboards/new`)}
        >
          <PlusIcon className="w-5 h-5" /> Thêm mới
        </Button>
      </div>
      {listBillboard && (
        <div className="lg:container mx-auto py-10">
          <DataTable columns={BillboardColumns} data={listBillboard} filterBy="label" />
        </div>
      )}
      <div className="border-b pb-4 border-[rgb(228, 228, 231)]">
        <Heading title={`API`} description="API gọi cho bảng quảng cáo" />
      </div>
      <ApiList entityName="billboards" entityIdName="billboardId" />
    </div>
  );
}

export default BillboardsClient;
