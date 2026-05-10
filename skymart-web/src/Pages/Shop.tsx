import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";
import { getAllCategories, getAllProducts } from "../Api/productsApi";
import { useSelectorHook } from "../Hooks/useSelectorHook";
import ProductCard from "../Components/ProductCard";
import Pagination from "../Components/Pagination";

const Shop = () => {
  const dispatch = useDispatch<any>();

  const products = useSelectorHook("products", "products");
  const categories = useSelectorHook("categories", "products");
  const total = useSelectorHook("total", "products");
  const productsLoading = useSelectorHook("productsLoading", "products");

  const limit = 8;

  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const skip = (currentPage - 1) * limit;

  useEffect(() => {
    dispatch(getAllProducts({ limit, skip, search, category }));
  }, [currentPage, search, category, dispatch]);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col gap-8 py-6">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Explore Products</h1>

          <p className="mt-1 text-sm text-gray-500">Find something you love from our collection.</p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
          <div className="group relative w-full sm:w-80">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition group-focus-within:text-black"
            />

            <input
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="Search products..."
              className="h-12 text-black w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm outline-none transition focus:border-black focus:bg-white focus:ring-2 focus:ring-black/5"
            />
          </div>

          <div className="relative w-full sm:w-52">
            <SlidersHorizontal
              size={17}
              className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-gray-500"
            />

            <select
              value={category}
              onChange={handleCategory}
              className="h-12 w-full cursor-pointer appearance-none rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-10 text-sm font-medium text-gray-700 outline-none transition hover:border-gray-300 focus:border-black focus:bg-white focus:ring-2 focus:ring-black/5">
              <option value="">All Categories</option>

              {categories?.map((category: any) => (
                <option
                  key={category.slug}
                  value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>

            <ChevronDown
              size={17}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <div className="text-sm text-gray-500">
          Showing{" "}
          <span className="font-semibold text-white">
            {skip}/{products?.length || 0}
          </span>{" "}
          of <span className="font-semibold text-white">{total}</span> products
        </div>

        {category && (
          <button
            onClick={() => {
              setCategory("");
              setCurrentPage(1);
            }}
            className="text-sm font-semibold text-gray-500 transition hover:text-black">
            Clear filter
          </button>
        )}
      </div>

      <div className="min-h-100">
        {productsLoading ? (
          <div className="flex min-h-100 items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-black" />
          </div>
        ) : products?.length > 0 ? (
          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product: any) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="flex min-h-100 flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300">
            <Search
              size={40}
              className="mb-4 text-gray-300"
            />
            <h2 className="text-lg font-bold">No products found</h2>
            <p className="mt-1 text-sm text-gray-500">Try searching for something else.</p>
          </div>
        )}
      </div>

      {products?.length > 0 && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          total={total}
          limit={limit}
        />
      )}
    </div>
  );
};

export default Shop;
