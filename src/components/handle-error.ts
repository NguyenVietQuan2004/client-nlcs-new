import { authApi } from "@/apiRequest/authAPI";
import { toast } from "@/components/ui/use-toast";
import { redirect } from "next/navigation";

interface handlErrorProps {
  error: any;
  isToast?: boolean;
  consoleError: string;
}

export const handlError = async ({ consoleError, error, isToast = false }: handlErrorProps) => {
  console.error(consoleError, error);
  if (error.statusCode === 403) {
    // await authApi.signOut();
    // await authApi.signOutNextServer();
    // window.location.reload();
  }
  // toast chi hoat dong o client componet
  if (typeof window !== "undefined" && isToast) {
    toast({
      title: error?.message || "Something went wrong.",
      variant: "destructiveCustom",
    });
  }
};
