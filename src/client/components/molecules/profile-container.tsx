import React, { useState, useEffect } from "react";
import FontStyled from "../atoms/font-styling";
import Button from "../atoms/button";
import { useUser } from "../../context/UserContext";
import { useModal } from "../../context/ModalContext";

export default function ProfileContainer() {
  const { user, token, logout } = useUser();
  const { invokeEditUsernameModal, invokeEditPasswordModal } = useModal();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token || !user) {
      setError("Please log in to view your profile");
      return;
    }
    setError(null);
  }, [token, user]);

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
          <Button className="py-4" variant="transparent" onClick={() => invokeEditUsernameModal(true)}>
            Edit name
          </Button>
          <Button className="py-4" variant="transparent" onClick={() => invokeEditPasswordModal(true)}>
            Edit password
          </Button>
          <Button className="py-4" variant="transparent">
            Delete account
          </Button>
          <Button className="py-4" variant="danger" onClick={logout}>
            Logout
          </Button>
        </div>
      </div>
    </>
  );
}
