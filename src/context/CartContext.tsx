import {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { CartItem } from "../types/product";

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;

  removeFromCart: (
    productId: number,
    color: string,
    size: string
  ) => void;

  updateQuantity: (
    productId: number,
    color: string,
    size: string,
    quantity: number,
  ) => void;
};

export const CartContext = createContext<CartContextType | null>(null);

type CartProviderProps = {
  children: ReactNode;
};

export const CartProvider = ({ children }: CartProviderProps) => {
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        const storedCart = localStorage.getItem("cart");

        return storedCart ? JSON.parse(storedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem(
        "cart",
        JSON.stringify(cartItems)
        );
    }, [cartItems]);

    const addToCart = (item: CartItem) => {
        setCartItems((prev) => {
        const existingItem = prev.find(
            (cartItem) =>
            cartItem.productId === item.productId &&
            cartItem.color === item.color &&
            cartItem.size === item.size
        );

        if (existingItem) {
            return prev.map((cartItem) =>
            cartItem.productId === item.productId &&
            cartItem.color === item.color &&
            cartItem.size === item.size
                ? {
                    ...cartItem,
                    quantity: cartItem.quantity + 1,
                }
                : cartItem
            );
        }

        return [...prev, item];
        });
    };

    const removeFromCart = (
        productId: number,
        color: string,
        size: string
    ) => {
        setCartItems((prev) =>
            prev.filter(
                (item) => 
                  !(
                    item.productId === productId &&
                    item.color === color &&
                    item.size === size
                   )
            )
        );
    };

    const updateQuantity = (
        productId: number,
        color: string,
        size: string,
        quantity: number,
    ) => {
        if (quantity < 1) return;

        setCartItems((prev) =>
            prev.map((item) =>
                item.productId === productId &&
                item.color === color &&
                item.size === size
                    ? {
                        ...item,
                        quantity,
                    }
                    : item
            )
        );
    };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};