export interface Product {
  id: string;
  name: string;
  price: number;
  category:
    | 'clothing'
    | 'electronics'
    | 'home'
    | 'beauty'
    | 'sports'
    | 'grocery';
  stockQuantity: number;
  discountPercentage?: number;
  readonly addedDate: string;
}

// In-memory storage of products
export let products: Product[] = [];
