import HeroImage from "../organisms/heroimage";
import Carusel from "../organisms/carusel";
import Banner from "../molecules/banner";
import FontStyled from "../atoms/font-styling";
import LineDivider from "../atoms/line-divider";
export default function HomeTemplate() {
  return (
    <div className="mt-6.5 mb-20 md:px-4 xl:px-0 w-full max-w-7xl flex flex-col gap-12 mx-auto">
      <HeroImage />
      {/* <LineDivider /> */}
      <FontStyled variant="sectionTitle">All Recipes</FontStyled>
      <Carusel RenderType="recipes" />

      <FontStyled variant="sectionTitle">New Feature</FontStyled>
      <Banner
        title="What's in Your Kitchen?"
        subtitle="New Feature"
        description="Enter the ingredients you have, and we’ll match you with delicious recipes you can make right now — no extra shopping needed."
        buttonText="LEARN MORE"
        image="https://i.gyazo.com/13e9d337fb6332689c870d65959a2882.png"
        alt="Fridge"
        to="/recommendation"
      />
      <LineDivider />
      <FontStyled variant="sectionTitle">Trending Recipes</FontStyled>
      <Carusel RenderType="trending" />
    </div>
  );
}
