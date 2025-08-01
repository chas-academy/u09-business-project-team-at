import { useState } from "react";
import { useUser } from "../../context/UserContext";
import { UserService } from "../../services/user.service";
import { EditUserDto } from "../../models/signupdto.model";
import User from "../../models/user.model";
import BaseModal from "../atoms/base-modal";
import Button from "../atoms/button";

interface EditUsernameModalProps {
	open: boolean;
	onClose: () => void;
}

export default function EditUsernameModal({
  open,
	onClose,
}: EditUsernameModalProps) {
	const [username, setUsername] = useState("");
	const [error, setError] = useState<string | null>(null);
	
	const { login } = useUser();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);

		const data: EditUserDto = {
			username
		}

		try {
			const result = await UserService.editUser(data);

			if (!result) {
				throw new Error;
			}

			login(result, localStorage.token);

			// console.log("Username updated succesfully", result);

			setUsername("");

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
            New username
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="rounded px-3 py-2 bg-white/10 text-white font-normal"
              required
            />
          </label>
				</div>
				{error && (
          <div className="text-red-400 text-sm text-center">{error}</div>
        )}
				<div className="flex flex-col gap-4">
					<Button
						type="submit"
						variant="secondary"
						className="mt-2"
					>
						Submit
					</Button>
				</div>
			</form>
		</BaseModal>
	)
}