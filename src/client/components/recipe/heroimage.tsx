import Button from "../common/button";
import { Component } from "react";

type ButtonProps = {
  src: string;
  to: string;
  recipeTitle: string;
};

class HeroImage extends Component<ButtonProps> {
  render() {
    const { src, to, recipeTitle } = this.props;
    return (
      <div
        className={`bg-[url('${src}')] aspect-3/2 bg-cover bg-center sm:h-195.5 w-full object-cover bg-no-repeat sm:bg-cover flex flex-col items-center- justify-center shadow-md relative`}
      >
        <div className="absolute bg-[#D9D9D980] flex flex-col items-center gap-2 bottom-0 left-1/2 transform -translate-x-1/2 p-4 rounded-lg">
          <p className="text-sm sm:text-xl md:text-2xl text-black">
            {recipeTitle}
          </p>
          <Button to={to} renderType="link">
            View Recipe
          </Button>
        </div>
      </div>
    );
  }
}

export default HeroImage;
