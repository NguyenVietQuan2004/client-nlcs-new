"use client";

import { PlusIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import Heading from "@/components/heading";
import ApiList from "@/components/api-list";
import { ListCategoryResType } from "@/Type/CategoryTypes";
import { DataTable } from "@/components/data-table/data-table";
import { Button, buttonVariants } from "@/components/ui/button";
import { CategoryColumns } from "@/app/(stores)/[store_id]/categories/[categoryId]/_table_category/category-columns";

interface CategoriesClientProps {
  listObjectCategory: ListCategoryResType | null;
}

function CategoriesClient({ listObjectCategory }: CategoriesClientProps) {
  const listCategory = listObjectCategory?.data;
  const router = useRouter();
  const params = useParams();
  return (
    <div>
      <div className="flex items-center border-b pb-4">
        <Heading title={`Categories( ${listCategory?.length})`} description="Manage Category for your store" />
        <Button
          className={buttonVariants({
            className: "ml-auto",
          })}
          onClick={() => router.push(`/${params.store_id}/categories/new`)}
        >
          <PlusIcon className="w-5 h-5" /> Add item
        </Button>
      </div>
      {listCategory && (
        <div className="lg:container mx-auto py-10">
          <DataTable columns={CategoryColumns} data={listCategory} filterBy="name" />
        </div>
      )}
      <div className="border-b pb-4 border-[rgb(228, 228, 231)]">
        <Heading title={`API`} description="API call for categories" />
      </div>
      <ApiList entityName="categories" entityIdName="categoryId" />
    </div>
  );
}

export default CategoriesClient;
