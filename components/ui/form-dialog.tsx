"use client";

import { ReactNode } from "react";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface FormDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  isSubmitted: boolean;
  successMessage?: string;
  children: ReactNode;
}

export function FormDialog({
  isOpen,
  onOpenChange,
  title,
  description,
  isSubmitted,
  successMessage = "We'll be in touch within 24-48 hours.",
  children,
}: FormDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            <CheckCircle2 className="mb-4 h-16 w-16 text-[#FF69B4]" />
            <h3 className="mb-2 font-serif text-2xl font-bold">Request Sent!</h3>
            <p className="text-zinc-500">{successMessage}</p>
          </motion.div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl">{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
            {children}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
