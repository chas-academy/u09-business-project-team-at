import Banner from "../molecules/banner";
import Carusel from "../organisms/carusel";
import FontStyled from "../atoms/font-styling";
import LineDivider from "../atoms/line-divider";
import ProfileContainer from "../molecules/profile-container";
import ListContainer from "../molecules/list-container";
import { useEffect } from "react";

export default function ProfileTemplate() {
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      alert("Login to access your profile");
      window.location.replace("/");
    }
  }, []);
  return (
    <div className="mt-6.5 mb-20 md:px-4 xl:px-0 w-full max-w-7xl flex flex-col gap-12 mx-auto">
      <div className="flex flex-col md:flex-row gap-8 w-full">
        <ProfileContainer />
        <ListContainer />
      </div>

      <LineDivider />
      <FontStyled variant="sectionTitle">New Feature</FontStyled>
      <Banner
        title="What's in Your Kitchen?"
        subtitle="New Feature Coming Soon!"
        description="Enter the ingredients you have, and we’ll match you with delicious recipes you can make right now — no extra shopping needed."
        image="https://i.gyazo.com/13e9d337fb6332689c870d65959a2882.png"
        alt="Fridge"
      />
      <LineDivider />
      <FontStyled variant="sectionTitle">Trending Recipes</FontStyled>
      <Carusel RenderType="trending" />
    </div>
  );
}
