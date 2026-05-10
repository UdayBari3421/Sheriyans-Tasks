import { ChevronLeft, ChevronRight, LogOut, MenuIcon, ShoppingCart, X, Zap } from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import { useSelectorHook } from "../Hooks/useSelectorHook";
import { useDispatch } from "react-redux";
import { setIsLoggedIn, setUser } from "../Feature/AuthSlice";
import { useState } from "react";

const Navbar = () => {
  const [popUpMode, setPopUpMode] = useState(false);
  const [modalNav, setModalNav] = useState(false);
  const user = useSelectorHook("user", "auth");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <nav className="w-11/12 lg:w-10/12 mx-auto sticky top-0 bg-[#0D0D0D] z-50">
      <div className="justify-between flex p-8">
        <div className="flex items-center justify-center gap-3">
          <Zap
            size={30}
            fontSize={10}
            color="#000"
            className="bg-volt rounded-xl p-1"
          />
          <p>
            Sky
            <span className="text-volt">Mart</span>
          </p>
        </div>
        <div className="hidden md:flex items-center justify-center gap-6">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? `text-volt font-bold` : `font-bold`)}>
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? `text-volt font-bold` : `font-bold`)}>
            About
          </NavLink>
          <NavLink
            to="/shop"
            className={({ isActive }) => (isActive ? `text-volt font-bold` : `font-bold`)}>
            Shop
          </NavLink>
        </div>

        <div className="flex md:hidden">
          <span
            onClick={() => setModalNav((prev) => !prev)}
            className="p-2 border-2 rounded-2xl hover:text-black hover:bg-white cursor-pointer">
            <MenuIcon />
          </span>

          <div
            className={`fixed top-0 left-0 h-screen bg-black text-white z-30 overflow-hidden transition-[width] duration-500 ease-in-out ${modalNav ? "w-full" : "w-0"}`}>
            <span
              onClick={() => setModalNav(false)}
              className="absolute right-5 top-5 hover:bg-white hover:text-red-500 rounded-full p-1 cursor-pointer">
              <X />
            </span>

            <div
              className={`flex flex-col items-center justify-center h-full gap-8 transition-opacity duration-300 ${modalNav ? "opacity-100" : "opacity-0"}`}>
              <NavLink
                to="/"
                onClick={() => setModalNav(false)}
                className="text-3xl font-bold">
                Home
              </NavLink>

              <NavLink
                to="/about"
                onClick={() => setModalNav(false)}
                className="text-3xl font-bold">
                About
              </NavLink>

              <NavLink
                to="/shop"
                onClick={() => setModalNav(false)}
                className="text-3xl font-bold">
                Shop
              </NavLink>

              <div
                onClick={() => {
                  setModalNav(false);
                  return navigate("/cart");
                }}
                className="flex items-center justify-center rounded-xl gap-2 p-3 border border-white cursor-pointer dark:hover:bg-white dark:hover:text-black transition duration-300 hover:bg-black hover:text-white">
                <button className="flex gap-2 items-center">
                  <p>View Cart</p>
                  <ShoppingCart size={13} />
                </button>
              </div>
              <div className="flex items-center justify-center rounded-xl gap-2 p-3 border border-white cursor-pointer dark:hover:bg-white dark:hover:text-black transition duration-300 hover:bg-black hover:text-white">
                <button
                  className="flex gap-2 items-center"
                  onClick={() => {
                    localStorage.clear();
                    setModalNav(false);
                    dispatch(setUser(null));
                    dispatch(setIsLoggedIn(false));
                    return navigate("/login");
                  }}>
                  <p>Logout</p>
                  <LogOut size={13} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center justify-center gap-3">
          <div
            onClick={() => setPopUpMode(!popUpMode)}
            className="flex px-3 items-center justify-center rounded-xl gap-2 p-2 border border-white cursor-pointer dark:hover:bg-white dark:hover:text-black transition duration-300 hover:bg-black hover:text-white">
            <p className="bg-volt hover:outline-2 outline-black text-black font-bold flex justify-center items-center px-2 w-6 rounded-xl">
              {String(user.name).slice(0, 1)}
            </p>
            <p>{user.name}</p>
          </div>
          <div className="flex items-center justify-center rounded-xl gap-2 p-3 border border-white cursor-pointer dark:hover:bg-white dark:hover:text-black transition duration-300 hover:bg-black hover:text-white">
            <ShoppingCart
              size={16}
              onClick={() => navigate("/cart")}
            />
          </div>
          <div className="flex items-center justify-center rounded-xl gap-2 p-3 border border-white cursor-pointer dark:hover:bg-white dark:hover:text-black transition duration-300 hover:bg-black hover:text-white">
            <LogOut
              onClick={() => {
                localStorage.clear();
                dispatch(setUser(null));
                dispatch(setIsLoggedIn(false));
                return navigate("/login");
              }}
              size={16}
            />
          </div>
        </div>
      </div>

      {popUpMode && (
        <div
          onClick={() => setPopUpMode(!popUpMode)}
          className={`absolute top-0 left-0 right-0 bottom-0 z-10 h-screen bg-black/40 backdrop-blur`}>
          <div className="relative w-full h-full">
            <span
              onClick={() => setPopUpMode(!popUpMode)}
              className="absolute right-10 top-10 hover:bg-white hover:text-red-600 p-2 rounded-2xl">
              <X size={20} />
            </span>
            <div className="flex justify-center flex-col h-full w-1/2 mx-auto gap-6">
              <span className="text-4xl flex justify-between">
                <p>Name:</p>
                <h2>{user?.name}</h2>
              </span>
              <span className="text-4xl flex justify-between">
                <p>Email:</p>
                <h2> {user?.email}</h2>
              </span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
