"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Copy, Check } from "lucide-react";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";

export function LinkDialog({
  openLink,
  setOpenLink,
  link,
}: {
  link: string;
  openLink: boolean;
  setOpenLink: Dispatch<SetStateAction<boolean>>;
}) {
  const [copySuccess, setCopySuccess] = useState(false);

  const copyToClipBoard = async (copyMe: string) => {
    try {
      await navigator.clipboard.writeText(copyMe);
      setCopySuccess(true);
      toast.success("Copied to clipboard");

      // Reset the success state after 2 seconds
      setTimeout(() => {
        setCopySuccess(false);
      }, 2000);
    } catch (err) {
      toast.error("Failed to copy");
      setCopySuccess(false);
    }
  };

  return (
    <Dialog open={openLink} onOpenChange={setOpenLink}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Here is your payment link</DialogTitle>
          <DialogDescription className="mt-4 w-fit">
            <div className="flex items-center justify-between gap-4 p-3 bg-gray-50 rounded-lg">
              <Link
                href={link}
                className="text-blue-600 hover:text-blue-800 truncate break-before-all"
              >
                {link}
              </Link>
              <button
                onClick={() => copyToClipBoard(link)}
                className={`p-2 rounded-lg transition-all duration-200 flex items-center justify-center ${
                  copySuccess
                    ? "bg-green-100 text-green-600 hover:bg-green-200"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                aria-label={copySuccess ? "Copied" : "Copy to clipboard"}
              >
                {copySuccess ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
              </button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
