type RecipeImageProps = {
  imageUrl: string;
  altText?: string;
};

export default function RecipeImage(props: RecipeImageProps) {
  const { imageUrl, altText }: RecipeImageProps = props;
  return (
    <img
      src={imageUrl}
      alt={altText}
      className="w-full h-87 max-w-273 sm:h-174"
    ></img>
  );
}
