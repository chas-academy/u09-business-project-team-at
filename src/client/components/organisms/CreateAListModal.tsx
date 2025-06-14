import { useModal } from "../../context/ModalContext";
import { useUser } from "../../context/UserContext";
import { ListService } from "../../services/list.service";
import BaseModal from "../atoms/base-modal";
import Button from "../atoms/button";

export default function CreateAListModal() {
  const { invokeCreateAListModal, invokeLoginModal } = useModal();
  const { user, token } = useUser();

  if (!user || !token) {
    invokeLoginModal(true);
    invokeCreateAListModal(false);
    return null;
  }

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    invokeCreateAListModal(false);
    e.stopPropagation();

    const result = await ListService.createList(
      token,
      user.id,
      (
        (e.target as HTMLFormElement).elements.namedItem(
          "name"
        ) as HTMLInputElement
      )?.value
    );

    if (result) {
      // console.log("List created successfully:", result);
      window.location.reload();
    } else {
      console.error("Failed to create list");
    }
  };

  return (
    <>
      <BaseModal
        open={true}
        onClose={() => invokeCreateAListModal(false)}
        title="Create a new list"
      >
        <form
          className="flex flex-col w-full  gap-1 text-white text-base font-bold text-left"
          onSubmit={handleOnSubmit}
        >
          <label htmlFor="name" className="w-full">
            Name
          </label>
          <input
            type="text"
            className="rounded px-3 py-2 bg-white/10  text-white font-normal"
            placeholder="List name"
            required
            name="name"
          />
          <div className="flex gap-1 mt-4">
            <Button
              className="py-4"
              variant="danger"
              onClick={() => invokeCreateAListModal(false)}
            >
              Cancel
            </Button>
            <Button className="w-full py-4" variant="secondary" type="submit">
              Create List
            </Button>
          </div>
        </form>
      </BaseModal>
    </>
  );
}
