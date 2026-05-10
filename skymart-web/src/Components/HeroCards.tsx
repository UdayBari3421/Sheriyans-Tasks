import GreetCard from "./GreetCard";
import { useSelectorHook } from "../Hooks/useSelectorHook";
import Button from "./Button";
import { ArrowRight, Package, Star, Tag, TrendingUp } from "lucide-react";
import { convertToINR } from "./ProductCard";

const HeroCards = () => {
  const user = useSelectorHook("user", "auth");
  const totalItems = useSelectorHook("totalItems", "cart");
  const totallPrice = useSelectorHook("totalPrice", "cart");

  return (
    <div className="grid grid-cols-4 gap-4 py-6">
      <div className="group relative col-span-4 overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-white/[0.07] via-white/[0.03] to-transparent p-7 sm:p-10 lg:p-12">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-volt/10 blur-3xl transition duration-700 group-hover:bg-volt/20" />

        <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-volt/5 blur-3xl" />

        <div className="relative z-10 flex flex-col justify-between gap-10 lg:flex-row">
          <div className="flex max-w-2xl flex-col items-start gap-5">
            <div className="rounded-full border border-volt/20 bg-volt/10 px-4 py-2 text-sm text-volt">
              <GreetCard />
            </div>

            <div>
              <p className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Welcome back,
              </p>

              <h1 className="mt-1 text-4xl font-black tracking-tight text-volt sm:text-5xl">
                {user?.name?.split(" ")[0]}
              </h1>
            </div>

            <p className="max-w-xl text-sm leading-7 text-gray-500 sm:text-base">
              Discover today's picks — hand-curated products across electronics, fashion, lifestyle,
              and more.
            </p>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button
                title="Shop Now"
                style="flex items-center justify-center gap-2 rounded-xl border border-volt bg-volt px-6 py-3 text-sm font-bold text-black transition hover:bg-volt/70"
                isIcon={true}
                IconElement={ArrowRight}
                isRightIcon={true}
              />

              <Button
                title="View All Products"
                style="rounded-xl border border-white/20 px-6 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-black"
              />
            </div>
          </div>

          <div className="grid w-full grid-cols-2 gap-3 lg:w-64 lg:grid-cols-1">
            <div className="flex flex-col justify-center rounded-2xl border border-volt/20 bg-volt/10 p-6">
              <p className="text-4xl font-black text-volt">20+</p>

              <p className="mt-1 text-sm text-gray-500">Products Available</p>
            </div>

            <div className="flex flex-col justify-center rounded-2xl border border-white/10 bg-black/30 p-6">
              <p className="text-4xl font-black text-white">Free</p>

              <p className="mt-1 text-sm text-gray-500">Delivery Available</p>
            </div>
          </div>
        </div>
      </div>

      <StatCard
        icon={<Package size={21} />}
        iconStyle="bg-volt/10 text-volt"
        value={totalItems}
        title="Cart Items"
        description="In your bag"
      />

      <StatCard
        icon={<TrendingUp size={21} />}
        iconStyle="bg-blue-500/10 text-blue-400"
        value={`${convertToINR(totallPrice?.toFixed(2))}`}
        title="Cart Value"
        description="Ready to checkout"
      />

      <StatCard
        icon={<Star size={21} />}
        iconStyle="bg-amber-500/10 text-amber-400"
        value="5"
        title="Top Products"
        description="Highly rated"
      />

      <StatCard
        icon={<Tag size={21} />}
        iconStyle="bg-purple-500/10 text-purple-400"
        value="6"
        title="Categories"
        description="To explore"
      />
    </div>
  );
};

const StatCard = ({ icon, iconStyle, value, title, description }) => {
  return (
    <div className="group col-span-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05] sm:col-span-2 lg:col-span-1">
      <div className="flex items-center gap-4">
        <div className={`rounded-xl p-3 ${iconStyle}`}>{icon}</div>

        <div>
          <h2 className="text-2xl font-bold text-white">{value}</h2>

          <p className="text-sm font-semibold text-gray-300">{title}</p>

          <p className="mt-1 text-xs text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default HeroCards;
