import { createContext, useContext, useState, ReactNode } from "react";
import LoginModal from "../components/organisms/loginModal";
import AddToListModal from "../components/organisms/addtoListModal";

interface ModalContextType {
  invokeLoginModal: (value: boolean) => void;
  invokeSignUpModal: (value: boolean) => void;
  invokeAddToListModal: (value: boolean) => void;
}
interface ModalProviderProps {
  children: ReactNode;
}
const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [showedLoginModal, invokeLoginModal] = useState(false);
  const [showedSignupModal, invokeSignUpModal] = useState(false);
  const [showedAddToListModal, invokeAddToListModal] = useState(false);

  const sharingData = {
    invokeLoginModal,
    invokeSignUpModal,
    invokeAddToListModal,
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
      {showedAddToListModal && (
        <AddToListModal
          open={showedAddToListModal}
          onClose={() => invokeAddToListModal(false)}
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
