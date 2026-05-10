import Footer from "../Components/Footer";
import HeroCards from "../Components/HeroCards";
import ShopByCategory from "../Components/ShopByCategory";

const Home = () => {
  return (
    <div className="h-full flex-1">
      <HeroCards />
      <ShopByCategory />
    </div>
  );
};

export default Home;
