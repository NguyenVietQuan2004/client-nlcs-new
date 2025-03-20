"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import {
  BillboardIcon,
  CategoryIcon,
  ColorIcon,
  HomeIcon,
  OrderIcon,
  ProductIcon,
  SettingIcon,
  SizeIcon,
} from "../../../../../public/icons/icons";
import React, { SetStateAction } from "react";
import { MessageCircleIcon } from "lucide-react";

function ListRoute({ setIsShowModal }: { setIsShowModal?: React.Dispatch<SetStateAction<boolean>> }) {
  const pathName = usePathname();
  const params = useParams();
  const Routes = [
    {
      href: `/`,
      active: pathName === `/${params.store_id}`,
      name: "Tổng quan",
      icon: <HomeIcon />,
    },
    {
      href: `/${params.store_id}/billboards`,
      active: pathName.startsWith(`/${params.store_id}/billboards`),
      name: "Bảng quảng cáo",
      icon: <BillboardIcon />,
    },
    {
      href: `/${params.store_id}/previewstore`,
      active: pathName.startsWith(`/${params.store_id}/previewstore`),
      name: "Ảnh trang chủ",
      icon: <BillboardIcon />,
    },
    {
      href: `/${params.store_id}/categories`,
      active: pathName.startsWith(`/${params.store_id}/categories`),
      name: "Danh mục",
      icon: <CategoryIcon />,
    },

    {
      href: `/${params.store_id}/products`,
      active: pathName.startsWith(`/${params.store_id}/products`),
      name: "Sản phẩm",
      icon: <ProductIcon />,
    },
    {
      href: `/${params.store_id}/orders`,
      active: pathName.startsWith(`/${params.store_id}/orders`),
      name: "Đơn hàng",
      icon: <OrderIcon />,
    },

    {
      href: `/${params.store_id}/settings`,
      active: pathName === `/${params.store_id}/settings`,
      name: "Cài đặt",
      icon: <SettingIcon />,
    },
  ];
  return (
    <>
      {Routes.map((route, index) => (
        <Link
          onClick={() => setIsShowModal && setIsShowModal(false)}
          key={route.name}
          href={`${index === 0 ? `/${params.store_id}/${route.href}` : `${route.href}`}`}
          className={`${
            route.active ? "text-zinc-800  font-semibold" : "text-zinc-500"
          } lg:mr-5 font-medium px-3 py-3 lg:p-0 flex items-center lg:block`}
        >
          <div className="lg:hidden mr-2">{route.icon}</div>

          {route.name}
        </Link>
      ))}
    </>
  );
}

export default ListRoute;
