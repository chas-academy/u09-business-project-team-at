import React, { use, useEffect, useState } from "react";
import BaseModal from "../atoms/base-modal";
import Button from "../atoms/button";
import { useUser } from "../../context/UserContext";
import { ListService } from "../../services/list.service";
import { List } from "../../models/list.model";

interface AddToListModalProps {
  open: boolean;
  onClose: () => void;
  recipeId: string;
}

export default function AddToListModal({
  open,
  onClose,
  recipeId,
}: AddToListModalProps) {
  const [lists, setLists] = useState<List[]>([]);
  const { token, user } = useUser();

  useEffect(() => {
    ListService.getAllLists(token ?? "", user?.id ?? "").then(
      (data: List[]) => {
        setLists(data);
        console.log(data);
      }
    );
  }, [token]);

  const handleSubmit = async (listId: string, list: List, recipeId: string) => {
    if (!recipeId) {
      console.error("No recipe ID provided");
      return;
    }

    try {
      await ListService.updateList(
        token ?? "",
        user?.id ?? "",
        listId,
        recipeId,
        list
      );
      onClose();
    } catch (error) {
      console.error("Error adding recipe to list:", error);
    }
  };

  return (
    <BaseModal open={open} onClose={onClose} title="ADD TO LIST">
      <div
        className="flex flex-col w-full max-w-80 mx-auto
          text-start gap-8 text-base font-normal"
      >
        <div className="flex flex-col gap-4">
          {lists.map((list, index) => (
            <Button
              onClick={() => {
                handleSubmit(list._id, list, recipeId);
              }}
              key={index}
              type="submit"
              variant="secondary"
            >
              {list.name}
            </Button>
          ))}
        </div>
      </div>
    </BaseModal>
  );
}
