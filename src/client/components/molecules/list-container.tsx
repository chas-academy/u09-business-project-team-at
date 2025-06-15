import React, { useCallback, useEffect, useState } from "react";
import FontStyled from "../atoms/font-styling";
import Button from "../atoms/button";
import { useUser } from "../../context/UserContext";
import { ListService } from "../../services/list.service";
import { List } from "../../models/list.model";
import { Link } from "react-router-dom";
import { useModal } from "../../context/ModalContext";

export default function ListContainer() {
  const { token, user } = useUser();
  const { invokeCreateAListModal } = useModal();
  const [lists, setLists] = useState<List[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLists = useCallback(async () => {
    if (!token || !user?.id) {
      setError("Please log in to view your lists");
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const data = await ListService.getAllLists(token, user.id);
      console.log("Fetched lists:", data);
      setLists(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching lists:", err);
      setError("Failed to load your lists");
    } finally {
      setLoading(false);
    }
  }, [token, user?.id]);

  useEffect(() => {
    fetchLists();
  }, [fetchLists]);

  useEffect(() => {
    fetchLists();
  }, [token, user?.id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <FontStyled variant="mainTitle" className="w-full mb-4">
          My Lists
        </FontStyled>
        <div className="rounded-lg border border-[#D9D9D9] w-full">
          <div className="flex flex-col items-center justify-stretch p-4 gap-4 w-full">
            <div>Loading your lists...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <FontStyled variant="mainTitle" className="w-full mb-4">
          My Lists
        </FontStyled>
        <div className="rounded-lg border border-[#D9D9D9] w-full">
          <div className="flex flex-col items-center justify-stretch p-4 gap-4 w-full">
            <div className="text-red-500">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center  justify-center w-full h-full">
        <FontStyled variant="mainTitle" className="w-full mb-4">
          My Lists
        </FontStyled>
        <div className="rounded-lg border border-[#D9D9D9] w-full">
          <div className="flex flex-col items-center justify-stretch p-4 gap-4 max-h-67  w-full ">
            <div className="flex flex-col gap-2 w-full scroll-smooth overflow-y-scroll h-67">
              {lists.length === 0 ? (
                <div>You don't have any lists yet</div>
              ) : (
                lists.map((list) => (
                  <Link
                    to={`/list/${list.name}`}
                    key={list._id}
                    state={{ id: list._id }}
                    className="w-full"
                  >
                    <Button variant="transparent" className="py-4 w-full ">
                      {list.name}
                    </Button>
                  </Link>
                ))
              )}
            </div>
            <Button
              className="py-4 w-full "
              onClick={() => invokeCreateAListModal(true)}
            >
              Create New List
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
