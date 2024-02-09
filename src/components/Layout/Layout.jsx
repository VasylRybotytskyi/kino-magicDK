import Navbar from "../Navbar";
import Footer from "../Footer";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Loader from "../common/Loader";

const Layout = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Layout;
