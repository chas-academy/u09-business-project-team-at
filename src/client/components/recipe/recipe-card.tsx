import { Component } from "react";
import Rating from "@mui/material/Rating";
import { createTheme, ThemeProvider } from "@mui/material/styles";

type RecipeCardProps = {
  title: string;
  image: string;
  category?: string;
  cookTimeMinutes?: string;
  rating?: number;
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
    const { title, image, category, rating, cookTimeMinutes } = this.props;

    return (
      <div
        className="w-50
       sm:w-72 flex flex-col transition hover:scale-103 gap-2 md:gap-4 h-auto overflow-hidden"
      >
        <div className="relative">
          <img
            src={image}
            alt={title}
            className=" w-full h-60 sm:h-94 object-cover"
          />
          <div className="absolute bottom-0 left-0">
            <p className="bg-[#FFFFFF80] font-bold text-xs md:text-sm py-2 px-2">
              {category}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <ThemeProvider theme={theme}>
            <Rating
              name="size-small"
              defaultValue={rating}
              precision={0.5}
              size="small"
              readOnly
            />
          </ThemeProvider>
          <p className="text-base"> {cookTimeMinutes} min</p>{" "}
        </div>

        <h3 className="font-medium text-lg md:text-xl">{title}</h3>
      </div>
    );
  }
}
