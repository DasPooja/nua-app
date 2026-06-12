import styles from './Navbar.module.scss';
import { RiShoppingCartLine } from "react-icons/ri";

const Navbar = () => {
    const cartCount = 0;

  return (
    <header className={styles.navbar}>
      <div className={styles.logo}>
        NUA STORE
      </div>

      <button
        type="button"
        className={styles.cartButton}
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