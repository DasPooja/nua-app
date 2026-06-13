import { useEffect, useState } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import { IoArrowBack, IoStar, IoStarOutline } from "react-icons/io5";
import { getProduct } from "../../api/products";
import type { Product } from "../../types/product";
import { useCart } from "../../hooks/useCart";
import { useUI } from "../../context/UIContext";
import { productVariants } from "../../data/productVariants";
import styles from "./ProductDetail.module.scss";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { openCart } = useUI();

  const [product, setProduct] =
    useState<Product | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");
  
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const [searchParams, setSearchParams] =
  useSearchParams();

  const [selectedColor, setSelectedColor] =
    useState(
      searchParams.get("color") || "black"
    );

  const [selectedSize, setSelectedSize] =
    useState(
      searchParams.get("size") || "M"
    );

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      try {
        const data = await getProduct(id);

        setProduct(data);
      } catch {
        setError(
          "Unable to load product details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    setSearchParams({
      color: selectedColor,
      size: selectedSize,
    });
  }, [
    selectedColor,
    selectedSize,
    setSearchParams,
  ]);

  if (loading) {
    return <p>Loading product...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  const hasDiscount = product.id % 2 === 0;

  const originalPrice = Number(
    (product.price * 1.25).toFixed(2)
  );
  
  const filledStars = Math.floor(product.rating.rate);

  const productImages = [
    product.image,
    product.image,
    product.image,
    product.image,
  ];

  const variantData = productVariants.default;

  const selectedVariant =
  variantData.sizes.find(
    (size) =>
      size.id === selectedSize
  );

  const stockLabel =
    selectedVariant?.stock === 0
      ? "Sold Out"
      : selectedVariant?.stock &&
        selectedVariant.stock <= 3
      ? "Low Stock"
      : "In Stock";

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      title: product.title,
      image: product.image,
      price: product.price,
      quantity,
      color: selectedColor,
      size: selectedSize,
    });

    openCart();
  };

  return  (
    <>
      <div className={styles.page}>
        <Link
            to="/"
            className={styles.backButton}
          >
            <IoArrowBack size={20} />
        </Link>
        
        <div className={styles.productLayout}>
          
          <div>
            <div className={styles.imageSection}>
              <img
                src={productImages[selectedImageIndex]}
                alt={product.title}
                className={styles.image}
              />
            </div>

            <div className={styles.thumbnailList}>
              {productImages.map((image, index) => (
                <button
                  key={index}
                  type="button"
                  className={`${styles.thumbnailButton} ${
                    selectedImageIndex === index
                      ? styles.activeThumbnail
                      : ""
                  }`}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <img
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    className={styles.thumbnail}
                  />
                </button>
              ))}
            </div>
          </div>
          <div className={styles.infoSection}>
            <p className={styles.category}>
              {product.category}
            </p>

            <h1 className={styles.title}>
              {product.title}
            </h1>

            {hasDiscount ? (
              <div className={styles.priceContainer}>
                <span className={styles.salePrice}>
                  ${product.price}
                </span>

                <span className={styles.originalPrice}>
                  ${originalPrice}
                </span>
              </div>
            ) : (
              <p className={styles.price}>
                ${product.price}
              </p>
            )}

            <div className={styles.rating}>
              {[1, 2, 3, 4, 5].map((star) => 
                star <= filledStars ? (
                  <IoStar 
                    key={star} 
                    className={styles.star}
                  /> 
                ) : (
                  <IoStarOutline
                    key={star}
                    className={styles.star}
                  />
                )
              )}

              <span className={styles.ratingValue}>
                {product.rating.rate}
              </span>

              <span className={styles.reviewCount}>
                ({product.rating.count} reviews)
              </span>
            </div>

            <hr className={styles.divider} />

            <p className={styles.description}>
              {product.description.charAt(0).toUpperCase() +
                product.description.slice(1)}
            </p>

            <div className={styles.variantSection}>
              <p className={styles.variantLabel}>
                Color
              </p>

              <div className={styles.colorList}>
                {variantData.colors.map((color) => (
                  <button
                    key={color.id}
                    type="button"
                    title={color.name}
                    className={`${styles.colorSwatch} ${
                      selectedColor === color.id
                        ? styles.activeColor
                        : ""
                    }`}
                    style={{
                      backgroundColor: color.hex,
                    }}
                    onClick={() =>
                      setSelectedColor(color.id)
                    }
                  />
                ))}
              </div>
            </div>

            <div className={styles.variantSection}>
              <p className={styles.variantLabel}>
                Size
              </p>

              <div className={styles.sizeList}>
                {variantData.sizes.map((size) => (
                  <button
                    key={size.id}
                    type="button"
                    disabled={size.stock === 0}
                    className={`${styles.sizeButton} ${
                      selectedSize === size.id
                        ? styles.activeSize
                        : ""
                    } ${
                      size.stock === 0
                        ? styles.soldOut
                        : ""
                    }`}
                    onClick={() =>
                      setSelectedSize(size.id)
                    }
                  >
                    {size.id}

                    {size.stock === 0 && (
                      <span> Sold Out</span>
                    )}

                    {size.stock > 0 &&
                      size.stock <= 3 && (
                        <span> (Low Stock)</span>
                      )}
                  </button>
                ))}
              </div>
              <p className={styles.stockStatus}>
                {stockLabel}
              </p>

              <div className={styles.purchaseSection}>
                <div className={styles.quantitySection}>
                  {/* <p className={styles.variantLabel}>
                    Quantity
                  </p> */}

                  <div className={styles.quantityControls}>
                    <button
                      onClick={() =>
                        setQuantity((prev) =>
                          Math.max(1, prev - 1)
                        )
                      }
                    >
                      -
                    </button>

                    <span>{quantity}</span>

                    <button
                      onClick={() =>
                        setQuantity((prev) => prev + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  className={styles.addToCartButton}
                  disabled={
                    selectedVariant?.stock === 0
                  }
                  onClick={handleAddToCart}
                >
                  {selectedVariant?.stock === 0
                    ? "Sold Out"
                    : "ADD TO CART"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;