// "use client";

// import { CheckIcon, XIcon } from "lucide-react";
// import { useEffect, useRef, useState } from "react";

// import { ListColorResType } from "@/Type/ColorType";
// import { Button, buttonVariants } from "@/components/ui/button";

// interface MultiSelectProps {
//   listColor: ListColorResType["data"] | undefined;
//   onChange: (name: string) => void;
//   onRemove: (name: string) => void;
//   values: string[];
// }

// function MultiSelect({ listColor, onChange, onRemove, values = [""] }: MultiSelectProps) {
//   const [openSelect, setIsOpenSelect] = useState(false);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [width, setWidth] = useState(containerRef?.current?.clientWidth);
//   // đổi từ value sang object để lấy name của color
//   const colorsUserSelected = listColor?.filter((color) => {
//     return values.includes(color.value);
//   });

//   const handleAddToList = (nameItem: string) => {
//     onChange(nameItem);
//   };

//   const handleClickOutside = (event: MouseEvent) => {
//     if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
//       setIsOpenSelect(false);
//     }
//   };
//   const resize = () => {
//     setWidth(containerRef?.current?.clientWidth);
//   };

//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);
//     window.addEventListener("resize", resize);
//     setWidth(containerRef?.current?.clientWidth);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//       window.addEventListener("resize", resize);
//     };
//   }, []);
//   return (
//     <div ref={containerRef} className="  py-2 min-h-[52px] flex justify-between relative rounded-md   border border-b ">
//       <div className=" absolute inset-0 z-30" onClick={() => setIsOpenSelect(!openSelect)}></div>
//       <div className="flex gap-2 flex-wrap relative px-4">
//         {colorsUserSelected?.map((color, index) => (
//           <div
//             key={index}
//             className="px-2 py-1 z-30 rounded-sm bg-zinc-100 flex items-center cursor-pointer hover:opacity-70"
//           >
//             <span className="mr-1">{color.name}</span>{" "}
//             <XIcon className="w-4 h-4 " onClick={() => onRemove(color.value)} />{" "}
//           </div>
//         ))}
//         {colorsUserSelected?.length === 0 && (
//           <div className="absolute flex items-center select-none z-20 h-full  text-zinc-500 text-sm whitespace-nowrap">
//             Choose one color
//           </div>
//         )}
//         {openSelect && (
//           <div style={{ width: width + "px" }} className=" bg-white absolute left-0 z-[999] top-[140%]  ">
//             <ul className="border py-1 shadow-md rounded-md flex items-center flex-col overflow-y-auto max-h-[164px]">
//               {listColor?.map((item, index) => (
//                 <Button
//                   className={buttonVariants({
//                     className: "p-3 w-[98%] py-0 text-zinc-600 justify-between border-none pl-8 max-h-[32px]",
//                     variant: "outline",
//                   })}
//                   key={item._id}
//                   // item.name?

//                   onClick={() => handleAddToList(item.value)}
//                   disabled={values.includes(item.value)}
//                 >
//                   <div className={` rounded-md hover:bg-zinc-100 `}>{item.name} </div>
//                   {values.includes(item.name) ? <CheckIcon className="w-4 h-4" /> : <div></div>}
//                 </Button>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default MultiSelect;
