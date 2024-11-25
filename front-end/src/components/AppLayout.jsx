import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router";

function AppLayout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default AppLayout;
