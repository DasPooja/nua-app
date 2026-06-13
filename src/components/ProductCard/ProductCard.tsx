import { Link } from "react-router-dom";
import type { Product } from '../../types/product';
import styles from "./ProductCard.module.scss";

type ProductCardProps = {
  product: Product;
  onAddToCart: (product: Product) => void;
};

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <article className={styles.card}>
        <Link
            to={`/product/${product.id}`}
            className={styles.imageLink}
        >
            <div className={styles.imageWrapper}>
                <img
                    src={product.image}
                    alt={product.title}
                    loading="lazy"
                    className={styles.image}
                />
                
            </div>
        </Link>

        <div className={styles.content}>
            <Link
                to={`/product/${product.id}`}
                className={styles.titleLink}
            >
                <h3 className={styles.title}>{product.title}</h3>
            </Link>

            <p className={styles.price}>${product.price}</p>

            <button 
                type="button"
                className={styles.button}
                onClick={() => onAddToCart(product)}
            >
                ADD TO CART
            </button>
        </div>
    </article>
  );
};

export default ProductCard;