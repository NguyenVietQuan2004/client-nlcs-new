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
      name: "Overview",
      icon: <HomeIcon />,
    },
    {
      href: `/${params.store_id}/billboards`,
      active: pathName.startsWith(`/${params.store_id}/billboards`),
      name: "Billboards",
      icon: <BillboardIcon />,
    },
    {
      href: `/${params.store_id}/previewstore`,
      active: pathName.startsWith(`/${params.store_id}/previewstore`),
      name: "PreviewStore",
      icon: <BillboardIcon />,
    },
    {
      href: `/${params.store_id}/categories`,
      active: pathName.startsWith(`/${params.store_id}/categories`),
      name: "Categories",
      icon: <CategoryIcon />,
    },
    // {
    //   href: `/${params.store_id}/sizes`,
    //   active: pathName.startsWith(`/${params.store_id}/sizes`),
    //   name: "Sizes",
    //   icon: <SizeIcon />,
    // },
    // {
    //   href: `/${params.store_id}/colors`,
    //   active: pathName.startsWith(`/${params.store_id}/colors`),
    //   name: "Colors",
    //   icon: <ColorIcon />,
    // },
    {
      href: `/${params.store_id}/products`,
      active: pathName.startsWith(`/${params.store_id}/products`),
      name: "Products",
      icon: <ProductIcon />,
    },
    {
      href: `/${params.store_id}/orders`,
      active: pathName.startsWith(`/${params.store_id}/orders`),
      name: "Orders",
      icon: <OrderIcon />,
    },

    {
      href: `/${params.store_id}/settings`,
      active: pathName === `/${params.store_id}/settings`,
      name: "Settings",
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
          } lg:mr-4 font-medium px-3 py-3 lg:p-0 flex items-center lg:block`}
        >
          <div className="lg:hidden mr-2">{route.icon}</div>

          {route.name}
        </Link>
      ))}
    </>
  );
}

export default ListRoute;
