import { products, Product } from './Product';

export function filterProductsByCategory(
  category: string | string[]
): Product[] {
  if (Array.isArray(category)) {
    return products.filter((p) => category.includes(p.category));
  } else {
    return products.filter((p) => p.category === category);
  }
}

export function getLowStockProducts(threshold: number): Product[] {
  return products.filter((p) => p.stockQuantity < threshold);
}
