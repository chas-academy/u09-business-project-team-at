import React, { useState } from "react";
import BaseModal from "../organisms/base-modal";
import Button from "../atoms/button";

interface SignUpModalProps {
  open: boolean;
  onClose: () => void;
  onSwitchToSignIn?: () => void;
}

export default function SignUpModal({
  open,
  onClose,
  onSwitchToSignIn,
}: SignUpModalProps) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign up logic
    onClose();
  };

  return (
    <BaseModal open={open} onClose={onClose} title="Sign Up">
      <form
        className="flex flex-col w-full max-w-80 mx-auto 
        text-start gap-8 text-base font-normal"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-1 text-white text-base font-bold">
            Username
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="rounded px-3 py-2 bg-white/10 text-white font-normal"
              required
            />
          </label>
          <label className="flex flex-col gap-1 text-white text-base font-bold">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded px-3 py-2 bg-white/10 text-white font-normal"
              required
            />
          </label>
          <label className="flex flex-col gap-1 text-white text-base font-bold">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded px-3 py-2 bg-white/10 text-white font-normal"
              required
            />
          </label>
        </div>
        <div className="flex flex-col gap-4">
          <Button type="submit" variant="secondary" className="mt-2">
            Sign Up
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-px flex-1 bg-white"></div>
          <span className="text-xs font-bold">or</span>
          <div className="h-px flex-1 bg-white"></div>
        </div>
        <div className="flex flex-col items-center font-bold">
          <span>Already have an account?</span>
          <a
            className="flex cursor-pointer items-center gap-1 text-[#EB634B] transition hover:text-[#6DBE45]"
            onClick={onSwitchToSignIn}
          >
            Sign in
          </a>
        </div>
      </form>
    </BaseModal>
  );
}
