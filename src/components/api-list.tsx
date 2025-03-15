"use client";

import ApiRow from "@/components/api-row";
import { useParams, usePathname } from "next/navigation";
interface ApiListProps {
  entityName: string;
  entityIdName: string;
}

function ApiList({ entityName, entityIdName }: ApiListProps) {
  const params = useParams();
  const baseURL = `${process.env.NEXT_PUBLIC_API_ADMIN}/api/${params.store_id}/${entityName}`;
  return (
    <div className="flex flex-col gap-y-4 text-sm">
      <ApiRow method="GET" url={`${baseURL}`} />
      <ApiRow method="GET" url={`${baseURL}/{${entityIdName}}`} />
      {/* chưa thấy cần xài api của 3 phương thức này tại vì call bằng api end point */}
      <ApiRow method="POST" url={`${baseURL}`} />
      <ApiRow method="PUT" url={`${baseURL}`} />
      <ApiRow method="DELETE" url={`${baseURL}/{${entityIdName}}`} />
    </div>
  );
}

export default ApiList;
