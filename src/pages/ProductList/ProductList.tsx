import { useState, useEffect } from "react";
import { getProducts } from "../../api/products";
import type { Product } from "../../types/product";
import { useCart } from "../../hooks/useCart";
import { useUI } from "../../context/UIContext";
import ProductCard from "../../components/ProductCard/ProductCard";
import styles from "./ProductList.module.scss";

const ProductList = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const { openCart } = useUI();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
            const data = await getProducts();
            setProducts(data);
            } catch {
            setError('Unable to load products');
            } finally {
            setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const { addToCart } = useCart();

    const handleAddToCart = (product: Product) => {
        addToCart({
            productId: product.id,
            title: product.title,
            image: product.image,
            price: product.price,
            quantity: 1,
            color: "black",
            size: "M",
        });

        openCart();
    };

    if (loading) {
        return <p>Loading products...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <>
            <div className={styles.page}>
                <header className={styles.hero}>
                    <p className={styles.subHeading}>New Summer arrivals</p>
                    <h1 className={styles.heading}>Shop the Collection</h1>
                    <p className={styles.sub}>{products.length > 0 ? `${products.length} products` : '\u00A0'}</p>
                </header>
                <div className={styles.productGrid}>
                    {products.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onAddToCart={handleAddToCart}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default ProductList;