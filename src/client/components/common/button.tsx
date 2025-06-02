import { Link } from "react-router-dom";
import { Component } from "react";

type ButtonProps = {
  onClick?: () => void;
  to?: string;
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "transparent" | "danger";
  renderType?: "button" | "link";
};

const baseClasses =
  "px-6 py-2 font-bold rounded transition-colors duration-500 leading-[12.8px] text-[14px] border-2 border-transparent cursor-pointer";

const variantClasses = {
  primary: "bg-black text-white hover:bg-white hover:text-black",
  secondary:
    "bg-white text-black hover:bg-transparent hover:border-white hover:text-white",
  transparent:
    "bg-transparent border-2 border-black text-black hover:bg-black hover:text-white",
  danger: "bg-[#EB634B] text-white hover:bg-[#C14A32]",
};

export default class Button extends Component<ButtonProps> {
  render() {
    const {
      onClick,
      children,
      variant = "primary",
      renderType = "button",
    } = this.props;
    const classes = `${baseClasses} ${variantClasses[variant]}`;

    if (renderType === "link") {
      return (
        <Link to={this.props.to || "#"} className={classes}>
          {children}
        </Link>
      );
    }
    return (
      <button className={classes} onClick={onClick}>
        {children}
      </button>
    );
  }
}
