import { useState, useEffect } from "react";
import { getProducts } from "../../api/products";
import type { Product } from "../../types/product";
import ProductCard from "../../components/ProductCard/ProductCard";
import styles from "./ProductList.module.scss"
const ProductList = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

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

    if (loading) {
        return <p>Loading products...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className={styles.page}>
            <h1 className={styles.heading}>Products</h1>
            
            <div className={styles.productGrid}>
                {products.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductList;