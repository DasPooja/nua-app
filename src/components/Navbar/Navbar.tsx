import { useCart } from "../../hooks/useCart";
import { RiShoppingCartLine } from "react-icons/ri";
import { useUI } from "../../context/UIContext";
import styles from './Navbar.module.scss';

// type NavbarProps = {
//   onCartClick: () => void;
// };

const Navbar = () => {
  const { openCart } = useUI();
  const { cartItems } = useCart();
  
  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <header className={styles.navbar}>
      <div className={styles.logo}>
        NUA STORE
      </div>

      <button
        type="button"
        className={styles.cartButton}
        onClick={openCart}
      >
        <RiShoppingCartLine color='white' />
        {cartCount > 0 && (
          <span className={styles.badge}>
            {cartCount}
          </span>
        )}
      </button>
    </header>
  );
};

export default Navbar;