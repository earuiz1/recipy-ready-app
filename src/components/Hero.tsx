import heroRecipeImg from "../assets/hero.jpeg";

const Hero = () => {
  return (
    <div className="w-[90%] h-[200px] md:h-[250px] lg:h-[300px] mt-4 rounded-lg mx-auto">
      <img
        src={heroRecipeImg}
        alt="Hero Recipe"
        className="w-full h-full object-cover rounded-lg"
        loading="lazy"
      />
    </div>
  );
};

export default Hero;
