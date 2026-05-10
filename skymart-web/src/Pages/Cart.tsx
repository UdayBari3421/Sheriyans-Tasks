import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useDispatch } from "react-redux";
import { useSelectorHook } from "../Hooks/useSelectorHook";
import { decreaseQuantity, increaseQuantity, removeFromCart } from "../Feature/CartSlice";

const Cart = () => {
  const dispatch = useDispatch();

  const cartItems = useSelectorHook("cartItems", "cart");
  const totalItems = useSelectorHook("totalItems", "cart");
  const totalPrice = useSelectorHook("totalPrice", "cart");

  const convertToINR = (dollar: number): string => {
    const exchangeRate = 88;
    return `₹${Math.ceil(dollar * exchangeRate)}`;
  };

  const getItemPrice = (price: number, quantity: number) => {
    return convertToINR(price * quantity);
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-white/5">
          <ShoppingBag
            size={36}
            className="text-volt"
          />
        </div>

        <h1 className="text-2xl font-bold text-white">Your Cart is Empty</h1>

        <p className="mt-2 text-sm text-gray-500">
          Add some products to your cart and they will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-volt">Shopping Cart</p>

        <h1 className="mt-2 text-3xl font-bold text-white">Your Cart</h1>

        <p className="mt-2 text-sm text-gray-500">
          {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
        <div className="flex flex-col gap-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-white/20 sm:flex-row sm:items-center">
              <div className="flex h-28 w-full items-center justify-center rounded-xl bg-white sm:w-28">
                <img
                  src={item?.images[0]}
                  alt={item.title}
                  className="h-full w-full object-contain p-3"
                />
              </div>

              <div className="flex flex-1 flex-col gap-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  {item.category}
                </p>

                <h2 className="line-clamp-1 text-lg font-bold text-white">{item.title}</h2>

                <p className="text-lg font-bold text-volt">{convertToINR(item.price)}</p>
              </div>

              <div className="flex items-center justify-between gap-5 sm:flex-col sm:items-end">
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black p-1">
                  <button
                    onClick={() => dispatch(decreaseQuantity(item.id))}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-white transition hover:bg-white hover:text-black">
                    <Minus size={15} />
                  </button>

                  <span className="w-6 text-center font-bold text-white">{item.quantity}</span>

                  <button
                    onClick={() => dispatch(increaseQuantity(item.id))}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-white transition hover:bg-volt hover:text-black">
                    <Plus size={15} />
                  </button>
                </div>

                <div className="flex items-center gap-4">
                  <p className="font-bold text-white">{getItemPrice(item.price, item.quantity)}</p>

                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="rounded-lg p-2 text-gray-500 transition hover:bg-red-500/10 hover:text-red-500">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="h-fit rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-bold text-white">Order Summary</h2>

          <div className="mt-6 flex flex-col gap-4 border-b border-white/10 pb-5">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Items</span>

              <span className="font-semibold text-white">{totalItems}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Subtotal</span>

              <span className="font-semibold text-white">{convertToINR(totalPrice)}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Delivery</span>

              <span className="font-semibold text-green-400">Free</span>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between">
            <span className="text-lg font-bold text-white">Total</span>

            <span className="text-2xl font-bold text-volt">{convertToINR(totalPrice)}</span>
          </div>

          <button className="mt-6 w-full rounded-xl bg-volt py-3 font-bold text-black transition hover:bg-white">
            Proceed to Checkout
          </button>

          <button
            onClick={() => {
              cartItems.forEach((item) => dispatch(removeFromCart(item.id)));
            }}
            className="mt-3 w-full rounded-xl border border-white/10 py-3 text-sm font-semibold text-gray-400 transition hover:border-red-500/30 hover:text-red-500">
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
