import { Component } from "react";
import { IonIcon } from "@ionic/react";
import { menu } from "ionicons/icons";
import { handleMenu } from "../../js/menu";
import { Link } from "react-router-dom";
import Button from "./button";

type HeaderProps = {
  variants?: "guest" | "user";
};

type TestState = {
  menuState: "menu" | "close";
};

const renderVariantButton = (variant: "guest" | "user") => {
  if (variant === "guest") {
    return (
      <li className="mx-4 my-4">
        {" "}
        <Button variant="secondary">Sign in</Button>{" "}
      </li>
    );
  }
  if (variant === "user") {
    return (
      <li className="mx-4 my-4">
        <Button renderType="link" to="/profile" variant="secondary">
          Profile
        </Button>
      </li>
    );
  }
  return null;
};

const navLinks = [
  { name: "HOME", to: "/" },
  { name: "RECIPES", to: "/recipes" },
  { name: "TRENDING", to: "/trending" },
  { name: "RECOMMENDATION", to: "/recommendation" },
];
export default class Test extends Component<HeaderProps, TestState> {
  constructor(props: HeaderProps) {
    super(props);
    this.state = {
      menuState: "close",
    };
  }

  toggleMenu = () => {
    const newState = this.state.menuState === "menu" ? "close" : "menu";
    this.setState({ menuState: newState }, () => {
      handleMenu({ name: this.state.menuState });
    });
  };

  render() {
    const { variants = "guest" } = this.props;
    const navLinksClasses = "text-base hover:text-[#6DBE45] duration-500";

    return (
      <nav className="p-5 text-base text-white bg-black shadow md:flex md:items-center md:justify-between">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-[32px] cursor-pointer">
            Recifood
          </Link>

          <span className="text-3xl cursor-pointer mx-2 md:hidden block">
            <IonIcon icon={menu} onClick={this.toggleMenu}></IonIcon>
          </span>
        </div>

        <ul className="md:flex md:items-center z-[-1] md:z-auto md:static absolute bg-black w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7 md:opacity-100 opacity-0 top-[-400px] transition-all ease-in duration-500">
          {navLinks.map((link) => (
            <li key={link.name} className="mx-4 my-6 md:my-0">
              <Link to={link.to} className={navLinksClasses}>
                {link.name}
              </Link>
            </li>
          ))}
          {renderVariantButton(variants)}
        </ul>
      </nav>
    );
  }
}
