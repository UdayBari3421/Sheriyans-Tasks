import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import { Outlet } from "react-router";

const App = () => {
  return (
    <div className="dark:bg-black/95 text-white min-h-screen">
      <Navbar />
      <div className="mx-auto flex flex-col w-10/12">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default App;
