import { useState } from "react";
import { useUser } from "../../context/UserContext";
import { UserService } from "../../services/user.service";
import BaseModal from "../atoms/base-modal";
import Button from "../atoms/button";

interface DeleteAccountModalProps {
  open: boolean;
	onClose: () => void;
}

export default function DeleteAccountModal({
  open,
  onClose,
}: DeleteAccountModalProps) {
	const [error, setError] = useState<string | null>(null);
	const { logout } = useUser();

	return (
		<BaseModal open={open} onClose={onClose} title="Are you sure?">
			<div
        className="flex flex-col w-full max-w-80 mx-auto
          text-start gap-8 text-base font-normal"
      >
				{error && (
          <div className="text-red-400 text-sm text-center">{error}</div>
        )}
				<div className="flex flex-col gap-4">
					<Button
						onClick={async () => {
							try {
								await UserService.deleteUser();
								logout();
								onClose();
							} catch (error) {
								setError(
									error instanceof Error
									? error.message
									: "Account deletion failed. Please try again."
								);
							}
						}}
						type="submit"
						variant="danger"
						className="mt-2"
					>
						Delete Account
					</Button>
				</div>
			</div>
		</BaseModal>
	)
}