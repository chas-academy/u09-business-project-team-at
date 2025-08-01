import { createContext, useContext, useState, ReactNode } from "react";
import LoginModal from "../components/organisms/loginModal";
import AddToListModal from "../components/organisms/addtoListModal";
import CreateAListModal from "../components/organisms/CreateAListModal";
import SignUpModal from "../components/organisms/signUpModal";
import EditUsernameModal from "../components/organisms/editUsernameModal";
import EditPasswordModal from "../components/organisms/editPasswordModal";
import DeleteAccountModal from "../components/organisms/deleteAccountModal";
import EditListNameModal from "../components/organisms/editListNameModal";

interface ModalContextType {
  invokeLoginModal: (value: boolean) => void;
  invokeSignUpModal: (value: boolean) => void;
  invokeAddToListModal: (value: boolean, recipeId?: string) => void;
  invokeCreateAListModal: (value: boolean) => void;
  invokeEditUsernameModal: (value: boolean) => void;
  invokeEditPasswordModal: (value: boolean) => void;
  invokeDeleteAccountModal: (value: boolean) => void;
  invokeEditListNameModal: (value: boolean) => void;
}
interface ModalProviderProps {
  children: ReactNode;
}
const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [showedLoginModal, invokeLoginModal] = useState(false);
  const [showedSignupModal, invokeSignUpModal] = useState(false);
  const [showedAddToListModal, invokeAddToListModal] = useState(false);
  const [showedCreateAListModal, invokeCreateAListModal] = useState(false);
  const [showedEditListNameModal, invokeEditListNameModal] = useState(false);
  const [addToListRecipeId, setAddToListRecipeId] = useState<string | null>(
    null
  );
  const [showedEditUsernameModal, invokeEditUsernameModal] = useState(false);
  const [showedEditPasswordModal, invokeEditPasswordModal] = useState(false);
  const [showedDeleteAccountModal, invokeDeleteAccountModal] = useState(false);

  const sharingData = {
    invokeLoginModal,
    invokeSignUpModal,
    invokeAddToListModal: (value: boolean, recipeId?: string) => {
      invokeAddToListModal(value);
      setAddToListRecipeId(recipeId ?? null);
    },
    invokeCreateAListModal,
    invokeEditUsernameModal,
    invokeEditPasswordModal,
    invokeDeleteAccountModal,
    invokeEditListNameModal,
  };

  return (
    <ModalContext.Provider value={sharingData}>
      {children}
      {showedLoginModal && (
        <LoginModal
          open={showedLoginModal}
          onClose={() => invokeLoginModal(false)}
          onSwitchToSignUp={() => {
            invokeLoginModal(false);
            invokeSignUpModal(true);
          }}
        />
      )}
      {showedSignupModal && (
        <SignUpModal
          open={showedSignupModal}
          onClose={() => invokeSignUpModal(false)}
          onSwitchToSignIn={() => {
            invokeSignUpModal(false);
            invokeLoginModal(true);
          }}
        />
      )}
      {showedAddToListModal && (
        <AddToListModal
          open={showedAddToListModal}
          onClose={() => invokeAddToListModal(false)}
          recipeId={addToListRecipeId ?? ""}
        />
      )}
      {showedEditUsernameModal && (
        <EditUsernameModal
          open={showedEditUsernameModal}
          onClose={() => invokeEditUsernameModal(false)}
        />
      )}
      {showedEditPasswordModal && (
        <EditPasswordModal
          open={showedEditPasswordModal}
          onClose={() => invokeEditPasswordModal(false)}
        />
      )}
      {showedDeleteAccountModal && (
        <DeleteAccountModal
          open={showedDeleteAccountModal}
          onClose={() => invokeDeleteAccountModal(false)}
        />
      )}
      {showedCreateAListModal && <CreateAListModal />}
      {showedEditListNameModal && (
        <EditListNameModal
          open={showedEditListNameModal}
          onClose={() => invokeEditListNameModal(false)}
        />
      )}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
