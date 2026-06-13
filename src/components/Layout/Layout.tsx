import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import CartDrawer from "../CartDrawer/CartDrawer";
import { useUI } from "../../context/UIContext";

const Layout = () => {
  const {
    isCartOpen,
    closeCart,
  } = useUI();

  return (
    <>
      <Navbar />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={closeCart}
      />

      <Outlet />
    </>
  );
};

export default Layout;