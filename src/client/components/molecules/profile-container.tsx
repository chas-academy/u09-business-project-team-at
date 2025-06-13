import React, { useState, useEffect } from "react";
import FontStyled from "../atoms/font-styling";
import Button from "../atoms/button";
import { useUser } from "../../context/UserContext";

export default function ProfileContainer() {
  const { user, token, logout } = useUser();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkUserData = async () => {
      if (!token || !user) {
        setError("Please log in to view your profile");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // Add any profile data fetching here if needed
        setError(null);
      } catch (err) {
        console.error("Error loading profile:", err);
        setError("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    checkUserData();
  }, [token, user]);

  if (loading) {
    return (
      <div className="flex flex-col w-full">
        <div className="rounded-lg gap-4 p-4 flex flex-col border border-[#D9D9D9]">
          <div>Loading profile data...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col w-full">
        <div className="rounded-lg gap-4 p-4 flex flex-col border border-[#D9D9D9]">
          <div className="text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col w-full">
        <div className="rounded-lg gap-4 p-4 flex flex-col border border-[#D9D9D9]">
          <div>Please log in to view your profile</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col w-full">
        <FontStyled variant="mainTitle" className="mb-4">
          Profile: {user.username}
        </FontStyled>
        <div className="rounded-lg gap-4 p-4 flex flex-col border border-[#D9D9D9]">
          <Button variant="transparent">Edit name</Button>
          <Button variant="transparent">Edit password</Button>
          <Button variant="transparent">Delete account</Button>
          <Button variant="danger" onClick={logout}>Logout</Button>
        </div>
      </div>
    </>
  );
}
