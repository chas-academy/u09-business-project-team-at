import React, { useState, useEffect, useCallback } from "react";
import { IonIcon } from "@ionic/react";
import { menu } from "ionicons/icons";
import { handleMenu } from "../../js/menu";
import { Link } from "react-router-dom";
import Button from "../atoms/button";
import LoginModal from "../organisms/loginModal";
import SignUpModal from "../organisms/signUpModal";
import { useUser } from "../../context/UserContext";
import User from "../../models/user.model";
import { useModal } from "../../context/ModalContext";

type HeaderProps = {
  variants?: "guest" | "user";
};

const navLinks = [
  { name: "HOME", to: "/" },
  { name: "RECIPES", to: "/recipes" },
  { name: "TRENDING", to: "/trending" },
];

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handleChange = () => setMatches(mediaQuery.matches);

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
};

const UserButtons: React.FC<{
  user: User | null;
  onToggleMenu: () => void;
}> = ({ user, onToggleMenu }) => {
  const { invokeLoginModal } = useModal();
  if (!user) {
    return (
      <li className="mx-4 my-0 mr-0">
        <Button variant="secondary" onClick={() => invokeLoginModal(true)}>
          SIGN IN
        </Button>
      </li>
    );
  }
  // console.log("User has the following data:", user);

  return (
    <li className="mx-4 my-4 mr-0">
      <Button
        onClick={onToggleMenu}
        renderType="link"
        to="/profile"
        variant="secondary"
      >
        Profile
      </Button>
    </li>
  );
};

export default function Header({ variants = "guest" }: HeaderProps) {
  const [menuState, setMenuState] = useState<"menu" | "close">("close");
  const { user } = useUser();

  const isMobile = useMediaQuery("(max-width: 768px)");
  const showMenu = isMobile ? menuState === "menu" : true;

  const toggleMenu = useCallback(() => {
    const newState = menuState === "menu" ? "close" : "menu";
    setMenuState(newState);
    handleMenu({ name: newState });
  }, [menuState]);

  useEffect(() => {
    if (!isMobile && menuState === "menu") {
      setMenuState("close");
    }
  }, [isMobile, menuState]);

  const navLinksClasses = "text-base hover:text-[#6DBE45] duration-200";
  // console.log("Header rendered with variants:", variants);

  return (
    <header className="bg-black h-24 z-[15]">
      <nav className="md:max-w-7xl mx-auto md:px-4 xl:px-0 py-5 text-base text-white bg-black shadow md:flex md:items-center md:justify-between">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-[32px] cursor-pointer">
            Recifood
          </Link>

          <span className="text-3xl cursor-pointer mx-2 md:hidden flex items-center justify-center">
            <IonIcon icon={menu} onClick={toggleMenu} />
          </span>
        </div>

        {showMenu && (
          <ul className="md:flex md:items-center z-[10] md:z-auto md:static absolute bg-black w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-4 top-[70px] transition-all ease-in duration-200">
            {navLinks.map((link) => (
              <li key={link.name} className="mx-4 my-6 md:my-0">
                <Link
                  to={link.to}
                  className={navLinksClasses}
                  onClick={toggleMenu}
                >
                  {link.name}
                </Link>
              </li>
            ))}

            <UserButtons user={user} onToggleMenu={toggleMenu} />
          </ul>
        )}
      </nav>
    </header>
  );
}
