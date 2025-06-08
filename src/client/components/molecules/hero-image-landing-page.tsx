import Button from "../atoms/button";
import FontStyled from "../atoms/font-styling";
import { Component } from "react";

type ButtonProps = {
  src: string;
  id: number;
  recipeTitle: string;
};

export default class HeroImageLandingPage extends Component<ButtonProps> {
  render() {
    const { src, id, recipeTitle } = this.props;

    return (
      <div
        style={{ backgroundImage: `url('${src}')` }}
        className={`aspect-3/2 bg-cover bg-center sm:h-195.5 w-full object-cover bg-no-repeat sm:bg-cover flex flex-col items-center- justify-center shadow-md relative`}
      >
        <div className="absolute bg-[#D9D9D980] flex flex-col items-center gap-2 bottom-0 left-1/2 transform -translate-x-1/2 p-4 rounded-lg">
          <FontStyled variant="heroImageTitle">{recipeTitle}</FontStyled>
          <Button to={`/recipe/${id}`} renderType="link">
            View Recipe
          </Button>
        </div>
      </div>
    );
  }
}
