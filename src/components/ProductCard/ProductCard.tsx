import type { Product } from '../../types/product';
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
                className={styles.image}
            />
        </div>
        <h3 className={styles.title}>{product.title}</h3>

        <p className={styles.price}>${product.price}</p>

        <button 
            type="button"
            className={styles.button}
        >
            Quick Add
        </button>
    </article>
  );
};

export default ProductCard;