import { formattedPrice } from "@/lib/utils";
import { OrderType, productOrderType } from "@/Type/OrderTypes";
import { ProductType } from "@/Type/ProductType";

interface CellPriceOrderProps {
  row: OrderType;
}

function CellPriceOrder({ row }: CellPriceOrderProps) {
  const error: Array<string> = [];
  // const totalPrice = row.items.reduce((acc: number, order: any) => {
  //   const sizeUserSelect = order.size;
  //   const colorsUserSelect = order.color;
  //   const product: ProductType = order._id;
  //   const objectPrice = product.arrayPrice.find((objectPrice) => objectPrice.size === sizeUserSelect);
  //   const colors = objectPrice?.colors;
  //   const isValidColor = colors?.includes(colorsUserSelect);

  //   if (!objectPrice) {
  //     error.push(`Has a size in ${product.name} is not valid in store so not add price to total.`);
  //     return acc + 0;
  //   }
  //   if (!isValidColor) {
  //     error.push(`Has a color in ${product.name} is not valid in store so not add price to total.`);
  //     return acc + 0;
  //   }
  //   return acc + (order.snapshot_price * order.amount * (100 - product.sales)) / 100;
  // }, 0);
  const totalPrice: number = row.order_items.reduce((acc: number, productOrder: any) => {
    const price = productOrder.snapshot_price;
    const quantity = productOrder.quantity;
    return acc + price * quantity * ((100 - productOrder.product.sales || 0) / 100);
  }, 0);
  return (
    <div>
      {formattedPrice(totalPrice)}{" "}
      <div>
        {error.map((item) => (
          <div key={item} className="text-red-500">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CellPriceOrder;
