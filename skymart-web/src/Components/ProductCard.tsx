import { useDispatch } from "react-redux";
import { addToCart, increaseQuantity, decreaseQuantity } from "../Feature/CartSlice";
import { useSelectorHook } from "../Hooks/useSelectorHook";

export const convertToINR = (dollar: number): string => {
  const exchangeRate = 88;
  const convertedPrice = Number((dollar * exchangeRate).toFixed(2));

  return `₹${Math.ceil(convertedPrice)}`;
};

const ProductCard = ({ product }) => {
  const { title, category, price, discountPercentage, rating, stock, thumbnail, id } = product;

  const dispatch = useDispatch();

  const cartItems = useSelectorHook("cartItems", "cart");

  const cartItem = cartItems?.find((item) => item.id === id);

  const handleAddToCartClick = () => {
    dispatch(addToCart(product));
  };

  const handleIncrease = () => {
    dispatch(increaseQuantity(id));
  };

  const handleDecrease = () => {
    dispatch(decreaseQuantity(id));
  };

  return (
    <div className="group w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-white text-black shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative flex h-60 items-center justify-center overflow-hidden bg-gray-100">
        <img
          src={thumbnail}
          alt={title}
          className="h-full w-full object-contain p-6 transition duration-500 group-hover:scale-110"
        />

        <span className="absolute left-3 top-3 rounded-full bg-volt px-3 py-1 text-xs font-bold text-black">
          -{discountPercentage.toFixed(0)}%
        </span>

        <span
          className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${
            stock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}>
          {stock > 0 ? "In Stock" : "Out of Stock"}
        </span>
      </div>

      <div className="p-5">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
          {category}
        </p>

        <h2 className="line-clamp-1 text-lg font-bold text-gray-900">{title}</h2>

        <div className="mt-2 flex items-center gap-2">
          <span className="text-yellow-500">★</span>

          <span className="text-sm font-semibold">{rating}</span>
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <p className="text-2xl font-bold text-gray-900">{convertToINR(price)}</p>

          {cartItem ? (
            <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-1">
              <button
                onClick={handleDecrease}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-lg font-bold text-white transition hover:bg-volt hover:text-black">
                −
              </button>

              <span className="min-w-5 text-center text-sm font-bold">{cartItem.quantity}</span>

              <button
                onClick={handleIncrease}
                disabled={cartItem.quantity >= stock}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-lg font-bold text-white transition hover:bg-volt hover:text-black disabled:cursor-not-allowed disabled:opacity-40">
                +
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCartClick}
              disabled={stock === 0}
              className="rounded-xl bg-black px-4 py-2 text-sm font-bold text-white transition hover:bg-volt hover:text-black disabled:cursor-not-allowed disabled:opacity-50">
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
