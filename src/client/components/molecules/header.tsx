import { Component } from "react";
import { IonIcon } from "@ionic/react";
import { menu } from "ionicons/icons";
import { handleMenu } from "../../js/menu";
import { Link } from "react-router-dom";
import Button from "../atoms/button";

type HeaderProps = {
  variants?: "guest" | "user";
};

type menuState = {
  menuState: "menu" | "close";
  showMenu: boolean;
};

const renderVariantButton = (
  variant: "guest" | "user",
  toggleMenu: () => void
) => {
  if (variant === "guest") {
    return (
      <li className="mx-4 my-0 mr-0">
        <Button variant="secondary" onClick={toggleMenu}>
          Sign in
        </Button>
      </li>
    );
  }
  if (variant === "user") {
    return (
      <li className="mx-4 my-4 mr-0">
        <Button
          onClick={toggleMenu}
          renderType="link"
          to="/profile"
          variant="secondary"
        >
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
];
export default class Test extends Component<HeaderProps, menuState> {
  mediaQuery: MediaQueryList;

  constructor(props: HeaderProps) {
    super(props);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.setShowMenu = this.setShowMenu.bind(this);
    this.handleMediaQueryChange = this.handleMediaQueryChange.bind(this);
    this.mediaQuery = window.matchMedia("(max-width: 768px)");
    this.state = {
      menuState: "close",
      showMenu: !this.mediaQuery.matches,
    };
  }

  componentDidMount() {
    this.mediaQuery.addEventListener("change", this.handleMediaQueryChange);
  }

  componentWillUnmount() {
    this.mediaQuery.removeEventListener("change", this.handleMediaQueryChange);
  }

  handleMediaQueryChange = () => {
    this.setState({
      menuState: "close",
      showMenu: !this.mediaQuery.matches,
    });
  };
  setShowMenu = (menuState: "menu" | "close") => {
    this.setState({
      showMenu:
        (this.mediaQuery.matches && menuState === "menu") ||
        !this.mediaQuery.matches,
    });
  };

  toggleMenu = () => {
    const newState = this.state.menuState === "menu" ? "close" : "menu";
    this.setState(
      {
        menuState: newState,
        showMenu:
          (this.mediaQuery.matches && newState === "menu") ||
          !this.mediaQuery.matches,
      },
      () => {
        handleMenu({ name: this.state.menuState });
      }
    );
  };

  render() {
    const { variants = "guest" } = this.props;
    const navLinksClasses = "text-base hover:text-[#6DBE45] duration-200";

    return (
      <header className="bg-black h-24 z-[15]">
        <nav className="md:max-w-7xl mx-auto md:px-4 xl:px-0 py-5 text-base text-white bg-black shadow md:flex md:items-center md:justify-between">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-[32px] cursor-pointer">
              Recifood
            </Link>

            <span className="text-3xl cursor-pointer mx-2 md:hidden flex items-center justify-center">
              <IonIcon icon={menu} onClick={this.toggleMenu}></IonIcon>
            </span>
          </div>

          {this.state.showMenu && (
            <ul className="md:flex md:items-center z-[10] md:z-auto md:static absolute bg-black w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-4 md:opacity-100 opacity-0 top-[70px] transition-all ease-in duration-200">
              {navLinks.map((link) => (
                <li key={link.name} className="mx-4 my-6 md:my-0">
                  <Link
                    to={link.to}
                    className={navLinksClasses}
                    onClick={this.toggleMenu}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}

              {renderVariantButton(variants, this.toggleMenu)}
            </ul>
          )}
        </nav>
      </header>
    );
  }
}
