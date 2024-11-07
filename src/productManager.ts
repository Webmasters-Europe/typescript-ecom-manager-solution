import { products, Product } from './Product';

export function generateProductId(): string {
  const datePrefix = new Date().toISOString().split('T')[0];
  const timestamp = Date.now();
  return `${datePrefix}-${timestamp}`;
}

export function addProduct(
  name: string,
  price: number,
  category:
    | 'clothing'
    | 'electronics'
    | 'home'
    | 'beauty'
    | 'sports'
    | 'grocery',
  stockQuantity: number,
  discountPercentage?: number,
  id?: string
): Product {
  const newProduct: Product = {
    name,
    price,
    category,
    stockQuantity,
    discountPercentage,
    addedDate: new Date().toISOString().split('T')[0],
    id: id || generateProductId(),
  };

  products.push(newProduct);
  return newProduct;
}

export function removeProduct(id: string): string {
  const productIndex = products.findIndex((p) => p.id === id);

  if (productIndex !== -1) {
    products.splice(productIndex, 1);
    return `Product with ID ${id} removed successfully.`;
  }

  return `Product with ID ${id} not found.`;
}

export function updateProductStock(id: string, newQuantity: number): string {
  const product = products.find((p) => p.id === id);
  if (product) {
    if (newQuantity >= 0) {
      product.stockQuantity = newQuantity;
      return `Stock quantity for product ${product.name} updated to ${newQuantity}.`;
    } else {
      return `Stock quantity cannot be negative.`;
    }
  }
  return `Product with ID ${id} not found.`;
}

export function applyDiscount(id: string, discountPercentage: number): string {
  const product = products.find((p) => p.id === id);

  if (product) {
    if (discountPercentage >= 0 && discountPercentage <= 100) {
      product.discountPercentage = discountPercentage;
      return `Discount of ${discountPercentage}% applied to product ${product.name}.`;
    }

    return `Invalid discount percentage. It should be between 0 and 100.`;
  }

  return `Product with ID ${id} not found.`;
}
