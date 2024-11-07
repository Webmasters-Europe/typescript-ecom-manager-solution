import { Product } from './Product';

interface SalesData {
  productId: string;
  soldUnits: number;
}

export function getTopProductsBySales<T>(
  products: T[],
  salesData: SalesData[],
  topN: number
): T[] {
  const getTotalSales = (productId: string): number => {
    return salesData
      .filter((sale) => sale.productId === productId) // Get sales for the specific product
      .reduce((total, sale) => total + sale.soldUnits, 0); // Sum up the units sold
  };

  // Sort products by their total sales and get the top N products
  return products
    .sort((a, b) => {
      const salesA = getTotalSales((a as Product).id);
      const salesB = getTotalSales((b as Product).id);
      return salesB - salesA;
    })
    .slice(0, topN); // Take the top N products
}
