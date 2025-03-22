"use client";

import { CreditCard, DollarSign, Package } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

import Heading from "@/components/heading";
import { OrderType } from "@/Type/OrderTypes";
import { ProductType } from "@/Type/ProductType";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formattedPrice } from "@/lib/utils";
function DashboardClient({
  dataOverview,
}: {
  dataOverview: { listOrderPaid: OrderType[]; countProductsInStock: number };
}) {
  let revenue = 0;
  const saless = dataOverview.listOrderPaid.length;
  const numberProductsInStock = dataOverview.countProductsInStock;
  const revenueMonth = [
    { name: "Jan", total: 0 },
    { name: "Feb", total: 0 },
    { name: "Mar", total: 0 },
    { name: "Apr", total: 0 },
    { name: "May", total: 0 },
    { name: "Jun", total: 0 },
    { name: "Jul", total: 0 },
    { name: "Aug", total: 0 },
    { name: "Sep", total: 0 },
    { name: "Oct", total: 0 },
    { name: "Nov", total: 0 },
    { name: "Dec", total: 0 },
  ];

  // duyệt qua list order để tính doanh thu tổng và doanh thu từng tháng
  const numOrder = dataOverview.listOrderPaid.length;
  const listOrderPaid = dataOverview.listOrderPaid;
  for (let i = 0; i < numOrder; i++) {
    const month = new Date(listOrderPaid[i].createdAt).getMonth();
    let temp = 0;
    temp = listOrderPaid[i].order_items.reduce((acc: any, orderItem: any) => {
      return acc + orderItem.snapshot_price;
    }, 0);
    revenue += temp;
    revenueMonth[month].total += temp;
  }
  return (
    <div>
      <Heading title="Tổng quan" description="Tổng quan về cửa hàng của bạn" />
      <div className="pt-4 border-b"></div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pt-4 ">
        <Card className="flex justify-between items-start p-6">
          <div>
            <CardHeader className="p-0">
              <CardTitle className="text-sm font-medium">Tổng doanh thu</CardTitle>
            </CardHeader>
            <CardContent className="font-semibold text-lg p-0 pt-2">{formattedPrice(revenue)}</CardContent>
          </div>
          <div>
            <DollarSign className="w-4 h-4 text-muted-foreground" />
          </div>
        </Card>
        <Card className="flex justify-between items-start p-6">
          <div>
            <CardHeader className="p-0">
              <CardTitle className="text-sm font-medium">Giảm giá</CardTitle>
            </CardHeader>
            <CardContent className="font-semibold text-lg p-0 pt-2">+{saless}</CardContent>
          </div>
          <div>
            <CreditCard className="w-4 h-4 text-muted-foreground" />
          </div>
        </Card>
        <Card className="flex justify-between items-start p-6">
          <div>
            <CardHeader className="p-0">
              <CardTitle className="text-sm font-medium">Sản phẩm còn lại</CardTitle>
            </CardHeader>
            <CardContent className="font-semibold text-lg p-0 pt-2">{numberProductsInStock}</CardContent>
          </div>
          <div>
            <Package className="w-4 h-4 text-muted-foreground" />
          </div>
        </Card>
      </div>
      <Card className=" justify-between items-start flex-col p-0 lg:p-6  mt-6 hidden sm:flex ">
        {/* <Card className=" justify-between items-start flex-col p-6 mt-6 lg:flex hidden "> */}

        <CardHeader className="p-0">
          <CardTitle className="text-sm font-semibold pl-6 pt-6 lg:pt-0 lg:pl-0 pb-8 ">Tổng quan</CardTitle>
        </CardHeader>
        <CardContent className="font-semibold text-lg p-0 pt-2 w-full">
          <ResponsiveContainer width={"100%"} height={350}>
            <BarChart data={revenueMonth}>
              <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis
                stroke="#333"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <Bar dataKey="total" fill="#3498db" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

export default DashboardClient;
