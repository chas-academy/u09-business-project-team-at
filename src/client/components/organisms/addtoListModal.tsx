import React, { useEffect, useState } from "react";
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token, user } = useUser();

  useEffect(() => {
    const fetchLists = async () => {
      // console.log("Current user:", user);
      // console.log("Token:", token);

      if (!token || !user?.id) {
        console.log("No token or user ID found");
        setError("Please log in to view your lists");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // console.log("Fetching lists for user ID:", user.id);
        const data = await ListService.getAllLists(token, user.id);
        // console.log("Fetched lists:", data);
        setLists(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching lists:", err);
        setError("Failed to load your lists");
      } finally {
        setLoading(false);
      }
    };

    fetchLists();
  }, [token, user?.id]);

  const handleSubmit = async (listId: string, list: List, recipeId: string) => {
    if (!recipeId) {
      console.error("No recipe ID provided");
      return;
    }

    try {
      await ListService.updateList(token ?? "", user?.id ?? "", listId, {
        ...list,
        recipes: [...list.recipes, recipeId],
      });
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
          {loading ? (
            <div>Loading your lists...</div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : lists.length === 0 ? (
            <div>You don't have any lists yet</div>
          ) : (
            lists.map((list, index) => (
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
            ))
          )}
        </div>
      </div>
    </BaseModal>
  );
}
