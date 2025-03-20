import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";
import { format, isToday } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const createUniqueArray = (length: number) => {
  // if (100 - 1 + 1 < length) {
  //   throw new Error("Range is too small to generate unique values");
  // }

  // const set = new Set();
  // while (set.size < length) {
  //   const randomNumber = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
  //   set.add(randomNumber);
  // }
  // return Array.from(set);
  return Array.from({ length }, (_, index) => index + 1);
};

export const createListDefaultValueForm = (numSize: number, prefixName: string, defaultValue: any) => {
  return createUniqueArray(numSize).map((_, index) => {
    const Index = `${prefixName}${index + 1}`;
    return { [Index]: defaultValue };
  });
};

export const createListSchemaForm = (numSize: number, prefixName: string, defaultValue: any) => {
  return createUniqueArray(numSize)?.reduce((acc: Record<string, any>, _, index) => {
    acc[`${prefixName}${index + 1}`] = defaultValue;
    return acc;
  }, {});
};
// biến từ 1 mảng object sang một object để có thể giải ra
export const formatDefaultValue = (defaultValueList: Array<any>) => {
  return defaultValueList?.reduce((acc, obj) => {
    const key = Object.keys(obj)[0];
    const value = obj[key];
    acc[key] = value;
    return acc;
  }, {});
};
// const formatter = new Intl.NumberFormat("en-US", {
//   style: "currency",
//   currency: "USD",
// });
const formatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  minimumFractionDigits: 0, // Không hiển thị số thập phân
  maximumFractionDigits: 0, // Không hiển thị số thập phân
});
export const formattedPrice = (price: number) => {
  return formatter.format(price);
};

export const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);

  const timeFormatted = format(date, "h:mm aa");

  if (!isToday(date)) {
    const dateFormatted = format(date, "MMM dd");
    return `${timeFormatted} on ${dateFormatted}`;
  }

  return timeFormatted;
};

export const firstKey = (object: { [key: string]: any }) => {
  return Object.keys(object)[0];
};
export const firstValue = (object: { [key: string]: any }) => {
  return Object.values(object)[0];
};
