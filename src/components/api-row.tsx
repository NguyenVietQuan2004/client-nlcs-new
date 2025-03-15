import { BanIcon, CopyIcon, DatabaseIcon, PlusIcon } from "lucide-react";
import { toast } from "./ui/use-toast";

interface ApiRowProps {
  method: "POST" | "GET" | "PUT" | "PATCH" | "DELETE";
  url: string;
}

function ApiRow({ method, url }: ApiRowProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    toast({
      title: "Copied!",
      variant: "success",
    });
  };
  return (
    <div className="flex flex-col py-3 px-2 lg:px-4 border rounded-lg ">
      <div className="flex justify-start gap-x-3 items-center">
        <DatabaseIcon className="w-5 h-5" />
        <div className="font-semibold">{method}</div>
        <div
          className={`py-1 px-2 rounded-full font-medium ${
            method === "GET" ? "bg-zinc-100 " : "bg-red-500 text-white"
          }`}
        >
          {method === "GET" ? "Public" : "Admin"}
        </div>
        <CopyIcon className="w-5 h-5 cursor-pointer lg:hidden" onClick={handleCopy} />
      </div>
      <div className="flex justify-between py-3 lg:px-6 px-1 ">
        <div className="font-bold py-1 px-2 bg-zinc-100 rounded-lg">{url}</div>
        <CopyIcon className="hidden lg:block w-5 h-5 cursor-pointer" onClick={handleCopy} />
      </div>
    </div>
  );
}

export default ApiRow;
