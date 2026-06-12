import React, { useEffect } from "react";
import { useLocation, Outlet } from "react-router-dom"; 
import Footer from "./Footer";
import Header from "./Header";
  // import matches filename on disk

const Layout = () => {
  const location = useLocation();

  // 1️⃣ Routes where Header & Footer MUST NOT appear
  const hideHeaderFooterRoutes = [
    "/login",
    "/dashboard",
    "/change-password",
  ];

  // 2️⃣ Hide on ALL /admin routes automatically
  const isAdminRoute = location.pathname.startsWith("/admin");

  // Final condition
  const hideHeaderFooter =
    hideHeaderFooterRoutes.includes(location.pathname) || isAdminRoute;

  // 3️⃣ Scroll to top on every route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      {/* Show Header only on public pages */}
      {!hideHeaderFooter && <Header />}
      

      {/* Page Content */}
      <main>
        <Outlet />
      </main>

      {/* Show Footer only on public pages */}
      {!hideHeaderFooter && <Footer />}
    </>
  );
};

export default Layout;
