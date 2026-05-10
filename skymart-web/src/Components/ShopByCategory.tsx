import { ArrowRight } from "lucide-react";
import { useDispatch } from "react-redux";
import { getProductByCategory } from "../Api/productsApi";
import { useSelectorHook } from "../Hooks/useSelectorHook";
import { useNavigate } from "react-router";

const ShopByCategory = () => {
  const dispatch = useDispatch<any>();
  const categories = useSelectorHook("categories", "products");
  const navigate = useNavigate();

  const image = {
    beauty: "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp",

    fragrances: "https://cdn.dummyjson.com/product-images/fragrances/dior-j'adore/1.webp",

    furniture: "https://cdn.dummyjson.com/product-images/furniture/3-door-pantry/1.webp",

    groceries: "https://cdn.dummyjson.com/product-images/groceries/annatto-powder/1.webp",

    "home-decoration":
      "https://cdn.dummyjson.com/product-images/home-decoration/bedside-table-african-cherry/1.webp",

    "kitchen-accessories":
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/boxed-blender/1.webp",
  };

  const onCategoryClick = (selectedCategory: string) => {
    dispatch(getProductByCategory(selectedCategory));

    navigate("/shop", {
      state: selectedCategory,
    });
  };

  return (
    <section className="py-8">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-volt">Explore</p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">Shop by Category</h1>

          <p className="mt-2 text-sm text-gray-500">Find exactly what you're looking for.</p>
        </div>

        <button
          onClick={() => navigate("/shop")}
          className="hidden items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-volt sm:flex">
          View All
          <ArrowRight size={16} />
        </button>
      </div>

      <div className="mt-7 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {categories &&
          categories.length > 0 &&
          categories.slice(0, 6).map((item: { slug: string; url: string; name: string }) => (
            <div
              onClick={() => onCategoryClick(item.slug)}
              key={item.slug}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-volt/40 hover:bg-volt/5">
              <div className="absolute right-2 top-2 h-16 w-16 rounded-full bg-volt/5 blur-2xl transition group-hover:bg-volt/20" />

              <div className="relative flex h-24 items-center justify-center">
                <img
                  className="h-20 w-20 object-contain transition duration-500 group-hover:scale-110"
                  src={image[item.slug]}
                  alt={item.name}
                />
              </div>

              <div className="relative mt-4 text-center">
                <h2 className="text-sm font-semibold text-gray-300 transition group-hover:text-volt">
                  {item.name}
                </h2>

                <div className="mt-2 flex items-center justify-center gap-1 text-xs text-gray-600 transition group-hover:text-gray-400">
                  Explore
                  <ArrowRight
                    size={12}
                    className="transition duration-300 group-hover:translate-x-1"
                  />
                </div>
              </div>
            </div>
          ))}
      </div>

      <button
        onClick={() => navigate("/shop")}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 py-3 text-sm font-semibold text-gray-500 transition hover:border-volt/30 hover:text-volt sm:hidden">
        View All Categories
        <ArrowRight size={16} />
      </button>
    </section>
  );
};

export default ShopByCategory;
