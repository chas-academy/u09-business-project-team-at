import HeroImage from "../organisms/heroimage";
import CaruselTemplate from "../organisms/carusel";
export default function HomeTemplate() {
  return (
    <div className="mt-6.5 md:px-4 xl:px-0 w-full max-w-7xl mx-auto">
      <HeroImage />
      <div className=" mt-50 mb-50">
        <CaruselTemplate />
      </div>
    </div>
  );
}
