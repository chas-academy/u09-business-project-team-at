import React, { useState } from "react";
import BaseModal from "../atoms/base-modal";
import Button from "../atoms/button";
import { LoginDto, LoginResponse } from "../../models/signupdto.model";
import { UserService } from "../../services/user.service";
import { useUser } from "../../context/UserContext";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  onSwitchToSignUp: () => void;
}

export default function LoginModal({
  open,
  onClose,
  onSwitchToSignUp,
}: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { login } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const loginData: LoginDto = {
      email,
      password,
    }

    try {
      const result: LoginResponse = await UserService.login(loginData);

      login(result.user, result.token);

      console.log("Sign in successful:", result);

      setEmail("");
      setPassword("");

      onClose();
    } catch (error) {
      console.error("Login failed:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Login failed. Please try again."
      );
    }
  };

  return (
    <BaseModal open={open} onClose={onClose} title="Sign In">
      <form
        className="flex flex-col w-full max-w-80 mx-auto
          text-start gap-8 text-base font-normal"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-1 text-white text-base font-bold">
            Email
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded px-3 py-2 bg-white/10  text-white font-normal"
              required
            />
          </label>
          <label className="flex flex-col gap-1 text-white text-base font-bold">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded px-3 bg-white/10 py-2 text-white font-normal"
              required
            />
          </label>
        </div>
        {error && (
          <div className="text-red-400 text-sm text-center">{error}</div>
        )}
        <div className="flex flex-col gap-4">
          <Button type="submit" variant="secondary" className="mt-2">
            Sign In
          </Button>
          {/* <Button onClick={onClose} variant="danger">
              Close
            </Button> */}
        </div>
        <div className="flex items-center gap-2">
          <div className="h-px flex-1 bg-white"></div>
          <span className="text-xs font-bold">or</span>
          <div className="h-px flex-1 bg-white"></div>
        </div>

        <div className="flex flex-col items-center font-bold">
          <span>Don't have an account yet?</span>
          <a
            className="flex cursor-pointer items-center gap-1 text-[#EB634B] transition hover:text-[#6DBE45]"
            onClick={onSwitchToSignUp}
          >
            Sign up
          </a>
        </div>
      </form>
    </BaseModal>
  );
}
