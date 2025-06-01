import { Component } from "react";
import Button from "./button";

type HeaderProps = {
  onClick?: (section: string) => void;
  variants?: "guest" | "user";
};

const renderVariantButton = (variant: "guest" | "user") => {
  if (variant === "guest") {
    return (
      <li>
        <Button variant="secondary">Sign in</Button>
      </li>
    );
  }
  if (variant === "user") {
    return (
      <li>
        <Button variant="secondary">Profile</Button>
      </li>
    );
  }
  return null;
};

const baseClasses =
  "flex gap-12 px-8 py-4 bg-black text-white items-center text-base rounded-2xl";

const navItemClasses =
  "cursor-pointer hover:text-black bg-transparent hover:bg-white rounded-2xl px-4 py-4 leading-[12.8px]";

export default class Header extends Component<HeaderProps> {
  render() {
    const { onClick, variants = "guest" } = this.props;
    const classes = `${baseClasses}`;

    return (
      <header className="flex justify-center mx-auto mt-16">
        <nav>
          <ul className={classes}>
            <li>
              <a className="text-[32px] font-bold cursor-pointer"> Recifood</a>
            </li>
            <div className="flex gap-3">
              <li>
                <a href="#" className={navItemClasses}>
                  Recipes
                </a>
              </li>
              <li>
                <a href="#" className={navItemClasses}>
                  Trending
                </a>
              </li>
              <li>
                <a href="#" className={navItemClasses}>
                  Recommendation
                </a>
              </li>
            </div>
            {renderVariantButton(variants)}
          </ul>
        </nav>
      </header>
    );
  }
}
