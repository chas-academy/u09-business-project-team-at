import { Component } from "react";

type ButtonProps = {
  onClick?: () => void;
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "transparent" | "danger";
};

const baseClasses =
  "px-4 py-4 font-bold rounded-2xl transition-colors duration-300 leading-[12.8px] text-[14px]";

const variantClasses = {
  primary: "bg-black text-white hover:bg-white hover:text-black",
  secondary: "bg-white text-black hover:bg-black hover:text-white",
  transparent:
    "bg-transparent border-2 border-black text-black hover:bg-black hover:text-white",
  danger: "bg-[#EB634B] text-white hover:bg-[#C14A32]",
};

export default class Button extends Component<ButtonProps> {
  render() {
    const { onClick, children, variant = "primary" } = this.props;
    const classes = `${baseClasses} ${variantClasses[variant]}`;
    return (
      <button className={classes} onClick={onClick}>
        {children}
      </button>
    );
  }
}
