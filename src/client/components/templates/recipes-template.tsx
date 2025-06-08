import Categories from "../organisms/categories";
import Banner from "../molecules/banner";
import CaruselTemplate from "../organisms/carusel";
import FontStyled from "../atoms/font-styling";

export default function RecipesTemplate() {
  return (
    <div className="mt-6.5 md:px-4 xl:px-0 w-full max-w-7xl mx-auto flex flex-col gap-12">
      <FontStyled variant="mainTitle">Explore Our Recipe Collection</FontStyled>
      <Categories />
      <Banner
        title="What's in Your Kitchen?"
        subtitle="New Feature"
        description="Enter the ingredients you have, and we’ll match you with delicious recipes you can make right now — no extra shopping needed."
        buttonText="LEARN MORE"
        image="https://i.gyazo.com/13e9d337fb6332689c870d65959a2882.png"
        alt="Fridge"
        to="/recommendation"
      />
      <CaruselTemplate />
    </div>
  );
}
