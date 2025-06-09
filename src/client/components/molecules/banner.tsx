import { Component } from "react";
import Button from "../atoms/button";
import FontStyled from "../atoms/font-styling";

type BannerProps = {
  title: string;
  description: string;
  subtitle?: string;
  image?: string;
  buttonText?: string;
  to?: string;
  alt?: string;
};

const baseClasses =
  "flex flex-col sm:flex-row items-center text-white bg-black w-auto xl:mx-0";

export default class Banner extends Component<BannerProps> {
  render() {
    const { title, description, alt, subtitle, buttonText, image, to } =
      this.props;
    return (
      <div className={baseClasses}>
        {image && (
          <div className="w-full sm:w-1/2">
            <img
              src={image}
              alt={alt}
              className="w-full h-[200px] xs:h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover"
            />
          </div>
        )}
        <div
          className="flex flex-col items-start justify-center p-4 xs:p-6 sm:p-8 md:p-12 lg:p-16 gap-4
         xs:gap-4 sm:gap-6 md:gap-8 w-full sm:w-1/2"
        >
          <div className="w-full">
            <FontStyled variant="bannerTitle">{title}</FontStyled>
            {subtitle && (
              <FontStyled variant="bannerSubtitle">{subtitle}</FontStyled>
            )}
          </div>
          <FontStyled variant="bannerDesc">{description}</FontStyled>
          {buttonText && to && (
            <Button renderType="link" to={to} variant="secondary">
              {buttonText}
            </Button>
          )}
        </div>
      </div>
    );
  }
}
