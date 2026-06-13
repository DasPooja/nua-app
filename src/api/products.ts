import type { Product } from "../types/product";

const BASE_URL = 'https://fakestoreapi.com';

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${BASE_URL}/products`);

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  return response.json();
};

export const getProduct = async (
  productId: string
): Promise<Product> => {
  const response = await fetch(
    `${BASE_URL}/products/${productId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  return response.json();
};