import { Component } from "react";
import Rating from "@mui/material/Rating";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import FontStyled from "../atoms/font-styling";
import Skeleton from "@mui/material/Skeleton";

type Recipe = {
  title: string;
  image: string;
  category?: string;
  cookTimeMinutes?: number;
  rating?: number;
  id: number;
};

type RecipeCardProps = {
  recipe?: Recipe;
  isLoading?: boolean;
};

const theme = createTheme({
  components: {
    MuiRating: {
      styleOverrides: {
        iconFilled: {
          color: "black",
        },
        iconEmpty: {
          color: "#00000080",
        },
      },
    },
  },
});

export default class RecipeCard extends Component<RecipeCardProps> {
  render() {
    const { isLoading } = this.props;
    const { title, image, category, rating, cookTimeMinutes, id } =
      this.props.recipe || {};

    if (isLoading) {
      return (
        <div>
          <div
            className="
        flex flex-col items-center sm:w-auto  max-w-100 transition hover:scale-103 gap-2 md:gap-4 h-auto overflow-hidden"
          >
            <Skeleton variant="rectangular" width={200} height={250} />
          </div>
        </div>
      );
    }

    return (
      <div
        className="
        flex flex-col items-center sm:w-auto  max-w-100 transition hover:scale-103 gap-2 md:gap-4 h-auto overflow-hidden"
      >
        <Link to={`/recipe/${id}`}>
          <div className="relative">
            <img src={image} alt={title} className=" w-full object-cover" />
            <div className="absolute bottom-0 left-0">
              <FontStyled variant="recipeCategory">{category}</FontStyled>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <ThemeProvider theme={theme}>
              <Rating
                defaultValue={rating}
                precision={0.5}
                size="small"
                readOnly
              />
            </ThemeProvider>
            <FontStyled variant="recipeInfo">{cookTimeMinutes} min</FontStyled>
          </div>
          <FontStyled variant="recipeTitle">{title}</FontStyled>
        </Link>
      </div>
    );
  }
}
