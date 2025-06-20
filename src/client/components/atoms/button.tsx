import { Link } from "react-router-dom";
import { Component } from "react";

type ButtonProps = {
  onClick?: () => void;
  to?: string;
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "transparent" | "danger" | "render";
  renderType?: "button" | "link";
  className?: string;
  type?: "submit";
};

const baseClasses =
  "px-6 py-2 font-bold rounded transition-colors duration-500 leading-[12.8px] text-[14px] border-2 cursor-pointer";

const variantClasses = {
  primary:
    "bg-black border-black hover:border-black hover:border-solid text-white hover:bg-white hover:text-black",
  secondary:
    "bg-white text-black hover:bg-transparent hover:border-white hover:text-white",
  transparent:
    "bg-transparent border-solid border-black text-black focus:bg-black focus:text-white hover:bg-black hover:text-white",
  danger:
    "bg-[#EB634B] text-white border-solid border-[#EB634B] hover:border-[#C14A32] hover:bg-[#C14A32]",

  render: "bg-black border-solid  text-white border-black ",
};

export default class Button extends Component<ButtonProps> {
  render() {
    const {
      onClick,
      children,
      variant = "primary",
      renderType = "button",
      type = "button",
      className = "",
    } = this.props;
    const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

    if (renderType === "link") {
      return (
        <Link to={this.props.to || "#"} className={classes} onClick={onClick}>
          {children}
        </Link>
      );
    }
    return (
      <button type={type} className={classes} onClick={onClick}>
        {children}
      </button>
    );
  }
}
