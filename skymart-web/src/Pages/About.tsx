import { ArrowRight, Award, Heart, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { useNavigate } from "react-router";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="py-8">
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 px-6 py-16 sm:px-10 lg:px-16">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-volt/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-volt/5 blur-3xl" />

        <div className="relative grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-volt/20 bg-volt/10 px-4 py-2 text-sm font-semibold text-volt">
              <Sparkles size={15} />
              About SkyMart
            </div>

            <h1 className="max-w-2xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Shopping made
              <span className="text-volt"> simple.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-gray-400 sm:text-lg">
              Welcome to SkyMart, your modern destination for discovering quality products at prices
              you'll love. We make online shopping simple, fast, and enjoyable.
            </p>

            <button
              onClick={() => navigate("/shop")}
              className="mt-8 flex items-center gap-2 rounded-xl bg-volt px-6 py-3 font-bold text-black transition hover:bg-white">
              Explore Products
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="relative flex justify-center">
            <div className="flex h-72 w-72 items-center justify-center rounded-full border border-volt/20 bg-volt/5 sm:h-80 sm:w-80">
              <div className="flex h-56 w-56 items-center justify-center rounded-full border border-white/10 bg-black">
                <div className="text-center">
                  <p className="text-6xl font-black text-volt">S</p>
                  <p className="mt-2 font-bold text-white">SkyMart</p>
                  <p className="text-xs text-gray-500">Shop. Smile. Repeat.</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-3 right-5 rounded-2xl border border-white/10 bg-black px-5 py-4 shadow-2xl sm:right-10">
              <p className="text-2xl font-bold text-volt">100%</p>
              <p className="text-xs text-gray-500">Customer Focused</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-volt">Why SkyMart</p>

          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            Everything you need,
            <span className="text-gray-500"> in one place.</span>
          </h2>

          <p className="mt-4 text-gray-400">
            We focus on making every part of your shopping experience better.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-volt/30">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-volt/10 text-volt transition group-hover:bg-volt group-hover:text-black">
              <ShieldCheck size={24} />
            </div>

            <h3 className="text-lg font-bold text-white">Trusted Products</h3>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              Carefully selected products with quality and value in mind.
            </p>
          </div>

          <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-volt/30">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-volt/10 text-volt transition group-hover:bg-volt group-hover:text-black">
              <Truck size={24} />
            </div>

            <h3 className="text-lg font-bold text-white">Fast Delivery</h3>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              We make getting your favorite products quick and convenient.
            </p>
          </div>

          <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-volt/30">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-volt/10 text-volt transition group-hover:bg-volt group-hover:text-black">
              <Award size={24} />
            </div>

            <h3 className="text-lg font-bold text-white">Great Value</h3>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              Competitive prices without compromising on the shopping experience.
            </p>
          </div>

          <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-volt/30">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-volt/10 text-volt transition group-hover:bg-volt group-hover:text-black">
              <Heart size={24} />
            </div>

            <h3 className="text-lg font-bold text-white">Customer First</h3>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              Your satisfaction is at the heart of everything we do.
            </p>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-volt px-6 py-12 text-black sm:px-10 lg:px-16">
        <div className="absolute -right-10 -top-20 h-60 w-60 rounded-full bg-white/20 blur-3xl" />

        <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest opacity-60">
              Ready to explore?
            </p>

            <h2 className="mt-2 text-3xl font-black sm:text-4xl">
              Find your next favorite product.
            </h2>

            <p className="mt-3 max-w-xl text-sm font-medium opacity-70">
              Browse our collection and discover products made for you.
            </p>
          </div>

          <button
            onClick={() => navigate("/shop")}
            className="flex shrink-0 items-center gap-2 rounded-xl bg-black px-6 py-3 font-bold text-white transition hover:bg-white hover:text-black">
            Start Shopping
            <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;
