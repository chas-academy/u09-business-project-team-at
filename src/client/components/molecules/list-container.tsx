import React, { useEffect, useState } from "react";
import FontStyled from "../atoms/font-styling";
import Button from "../atoms/button";
import { useUser } from "../../context/UserContext";
import { ListService } from "../../services/list.service";
import { List } from "../../models/list.model";
import { Link } from "react-router-dom";

export default function ListContainer() {
  const { token, user } = useUser();
  const [lists, setLists] = useState<List[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLists = async () => {
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
    };

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
      <div className="flex flex-col items-center justify-center w-full h-full">
        <FontStyled variant="mainTitle" className="w-full mb-4">
          My Lists
        </FontStyled>
        <div className="rounded-lg border border-[#D9D9D9] w-full">
          <div className="flex flex-col items-center justify-stretch p-4 gap-4 w-full">
            {lists.length === 0 ? (
              <div>You don't have any lists yet</div>
            ) : (
              lists.map((list) => (
                <Link
                  to={`/list/${list._id}`}
                  key={list._id}
                  className="w-full"
                >
                  <Button variant="transparent" className=" w-full ">
                    {list.name}
                  </Button>
                </Link>
              ))
            )}
            <Button className=" w-full ">Create New List</Button>
          </div>
        </div>
      </div>
    </>
  );
}
