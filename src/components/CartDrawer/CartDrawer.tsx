import { RxCross2 } from "react-icons/rx";
import { RiDeleteBin4Line } from "react-icons/ri";
import { LuShoppingBag } from "react-icons/lu";
import { useCart } from "../../hooks/useCart";
import styles from "./CartDrawer.module.scss";

type CartDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CartDrawer = ({
  isOpen,
  onClose,
}: CartDrawerProps) => {

    const {
        cartItems,
        removeFromCart,
        updateQuantity,
    } = useCart();

    const subtotal = cartItems.reduce(
        (total, item) =>
            total + item.price * item.quantity,
        0
    );

  return (
    <>
      {isOpen && (
        <div
          className={styles.backdrop}
          onClick={onClose}
        />
      )}

      <aside
        className={`${styles.drawer} ${
          isOpen ? styles.open : ""
        }`}
      >
        <div className={styles.header}>
            <h2 className={styles.heading}>
                Your Cart
                <span className={styles.countBadge}>
                    {cartItems.length}
                </span>
            </h2>

            <button
                type="button"
                className={styles.closeButton}
                onClick={onClose}
                area-label="Close"
            >
                {/* ✕ */}
                <RxCross2 />
            </button>
        </div>

        <div className={styles.content}>
            {cartItems.length === 0 ? (
                <p className={styles.emptyState}>
                    Your cart is empty
                    <LuShoppingBag size={20} />
                </p>
                ) : (
                <div className={styles.items}>
                    {cartItems.map((item) => (
                        <div
                            key={item.productId}
                            className={styles.cartItem}
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                className={styles.thumbnail}
                            />

                            <div className={styles.details}>
                                <h4>{item.title}</h4>

                                <p className={styles.variantInfo}>
                                    {item.color} • {item.size}
                                </p>
                                <p>${item.price}</p>

                                <div className={styles.quantityControls}>
                                    <button
                                        onClick={() =>
                                            updateQuantity(
                                                item.productId,
                                                item.color,
                                                item.size,
                                                item.quantity - 1
                                            )
                                        }
                                        aria-label="Decrease quantity" 
                                    >
                                        -
                                    </button>

                                    <span>{item.quantity}</span>

                                    <button
                                        onClick={() =>
                                            updateQuantity(
                                                item.productId,
                                                item.color,
                                                item.size,
                                                item.quantity + 1
                                            )
                                        }
                                        aria-label="Increase quantity"  
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <button
                                className={styles.removeButton}
                                onClick={() =>
                                    removeFromCart(
                                        item.productId,
                                        item.color,
                                        item.size
                                    )
                                }
                                aria-label="Close"
                            >
                                <RiDeleteBin4Line />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>

        {cartItems.length > 0 && (
            <div className={styles.summary}>
                <div className={styles.summaryRow}>
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className={styles.summaryRow}>
                    <strong>Total</strong>
                    <strong>${subtotal.toFixed(2)}</strong>
                </div>

                <button
                    type="button"
                    className={styles.checkoutButton}
                >
                    PROCEED TO PAY
                </button>
            </div>
        )}
      </aside>
    </>
  );
};

export default CartDrawer;