import type { Product } from '../../types/product';
import { RiShoppingCartLine } from "react-icons/ri";
import styles from "./ProductCard.module.scss";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <article className={styles.card}>
        <div className={styles.imageWrapper}>
            <img
                src={product.image}
                alt={product.title}
                loading="lazy"
                className={styles.image}
            />
        </div>
        <div className={styles.content}>
            <h3 className={styles.title}>{product.title}</h3>

            <p className={styles.price}>${product.price}</p>

            <button 
                type="button"
                className={styles.button}
            >
                ADD TO CART
            </button>
        </div>
    </article>
  );
};

export default ProductCard;