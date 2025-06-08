import { Component } from "react";

type FontProps = {
  variant:
    | "mainTitle"
    | "sectionTitle"
    | "recipeTitle"
    | "recipeInfo"
    | "recipeCategory"
    | "bannerTitle"
    | "bannerSubtitle"
    | "bannerDesc"
    | "heroImageTitle";
  className?: string;
  children: React.ReactNode;
};

const variantClasses = {
  //Page  styles
  mainTitle: "font-bold text-3xl md:text-4xl lg:text-5xl",
  sectionTitle: "font-semibold text-2xl md:text-3xl lg:text-4xl",
  // Recipe styles
  recipeTitle: "font-medium text-lg md:text-xl",
  recipeInfo: "text-base",
  recipeCategory: "bg-[#FFFFFF80] font-bold text-xs md:text-sm py-2 px-2",

  // Banner styles
  bannerTitle:
    "text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 xs:mb-3 sm:mb-4",
  bannerSubtitle: "text-xs xs:text-sm sm:text-base md:text-lg mb-2 xs:mb-3",
  bannerDesc: "text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl",

  heroImageTitle: "text-sm sm:text-xl md:text-2xl text-black",
};

export default class FontStyled extends Component<FontProps> {
  render() {
    const { variant, className = "" } = this.props;
    const classes = ` ${variantClasses[variant]} ${className}`;

    if (variant === "mainTitle") {
      return <h1 className={classes}>{this.props.children}</h1>;
    }

    if (variant === "sectionTitle") {
      return <h2 className={classes}>{this.props.children}</h2>;
    }

    if (variant === "recipeTitle") {
      return <h3 className={classes}>{this.props.children}</h3>;
    }

    if (variant === "recipeInfo") {
      return <p className={classes}>{this.props.children}</p>;
    }
    if (variant === "bannerTitle") {
      return <h3 className={classes}>{this.props.children}</h3>;
    }
    if (variant === "bannerSubtitle") {
      return <p className={classes}>{this.props.children}</p>;
    }
    if (variant === "bannerDesc") {
      return <p className={classes}>{this.props.children}</p>;
    }
    if (variant === "heroImageTitle") {
      return <p className={classes}>{this.props.children}</p>;
    }

    if (variant === "recipeCategory") {
      return <span className={classes}>{this.props.children}</span>;
    }
  }
}
