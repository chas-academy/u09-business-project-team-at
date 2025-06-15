import { useState } from "react";
import { useUser } from "../../context/UserContext";
import BaseModal from "../atoms/base-modal";
import Button from "../atoms/button";
import { ListService } from "../../services/list.service";
import { redirect, useLocation, useNavigate } from "react-router-dom";

interface EditListModalProps {
  open: boolean;
  onClose: () => void;
}

export default function EditListNameModal({
  open,
  onClose,
}: EditListModalProps) {
  const [listName, setListName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();

  const { user, token } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const match = location.pathname.match(/\/list\/(\w+)/);
      if (!token || !match || !user) {
        redirect("/");
        alert("Don't have access to this list");
        return;
      }
      const listId = match[1];

      const result = await ListService.updateListName(
        token,
        user.id,
        listId,
        listName
      );

      if (!result) {
        throw new Error();
      }

      window.location.replace(`/list/${listName}`);
      onClose();
    } catch (error) {
      // console.error("Username change failed:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Username change failed. Please try again."
      );
    }
  };

  return (
    <BaseModal open={open} onClose={onClose} title="Update username">
      <form
        className="flex flex-col w-full max-w-80 mx-auto 
        text-start gap-8 text-base font-normal"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-1 text-white text-base font-bold">
            New List Name
            <input
              type="text"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              className="rounded px-3 py-2 bg-white/10 text-white font-normal"
              required
            />
          </label>
        </div>
        {error && (
          <div className="text-red-400 text-sm text-center">{error}</div>
        )}
        <div className="flex flex-col gap-4">
          <Button type="submit" variant="secondary" className="mt-2">
            Submit
          </Button>
        </div>
      </form>
    </BaseModal>
  );
}
