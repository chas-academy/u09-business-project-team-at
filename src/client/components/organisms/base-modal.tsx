import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

interface BaseModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function BaseModal({
  open,
  onClose,
  title,
  children,
}: BaseModalProps) {
  return (
    <Dialog className="bg-[#0F0F0F80]" onClose={onClose} open={open}>
      <div
        className="
      bg-black text-center text-white font-bold text-3xl  
      md:text-4xl lg:text-5xl  w-full  max-w-[560px] sm:min-w-[560px] 
      h-auto  py-9 md:py-18 px-4 sm:px-6  lg:px-8 
       mx-auto flex flex-wrap jusitfy-center 
      flex-col gap-4"
        style={{ minHeight: "400px" }}
      >
        <DialogTitle>{title}</DialogTitle>
        {children}
      </div>
    </Dialog>
  );
}
