import {
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialog as UiAlertDialog,
} from "@/components/ui/alert-dialog";
import LoadingButton from "@/components/loading-button";
import { buttonVariants } from "@/components/ui/button";

interface AlertModalProps {
  action: string;
  open: boolean;
  isLoading: boolean;
  onConfirm: () => void;
  onClose: () => void;
  variant: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
}
function AlertModal({ variant, action, onConfirm, isLoading, open, onClose }: AlertModalProps) {
  return (
    <UiAlertDialog open={open}>
      <AlertDialogTrigger className="hidden"></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>This action cannot be undone</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({
              variant: variant || "default",
              className: "min-w-[76px]",
            })}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? <LoadingButton /> : action}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </UiAlertDialog>
  );
}

export default AlertModal;
