import React, { useState } from "react";
import BaseModal from "../atoms/base-modal";
import Button from "../atoms/button";

interface AddToListModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AddToListModal({ open, onClose }: AddToListModalProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle add to list logic
    onClose();
  };

  return (
    <BaseModal open={open} onClose={onClose} title="Add TO LIST">
      <form
        className="flex flex-col w-full max-w-80 mx-auto
          text-start gap-8 text-base font-normal"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-4">
          <Button type="submit" variant="secondary" className="mt-2">
            test1
          </Button>
          <Button type="submit" variant="secondary">
            test2
          </Button>
          <Button type="submit" variant="secondary">
            test3
          </Button>
        </div>
      </form>
    </BaseModal>
  );
}
