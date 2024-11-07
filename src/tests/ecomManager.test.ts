/*
This is a test file for the `productManager`, `productFilters`, and `salesManager` modules. It tests the core functionality implemented in these modules.

IMPORTANT:
- DO NOT MODIFY this file.
- After implementing the modules, you should be able to run this file by using the command `npm run ts-build`.
- Once the project is built, open the `index.html` file located in the `assets` folder in your browser to see the output of the test cases in the browser's console.

The test file will:
- Add products.
- Update product stock.
- Remove products.
- Apply discounts.
- Filter products by category.
- Fetch low-stock products.
- Get top products by sales.
- Test edge cases, such as updating or deleting non-existing products.

EXPECTED BEHAVIOR:
- This file should run successfully without any modifications.
- Ensure that your implementation in the modules meets the requirements of these tests.

DO NOT MODIFY this file. You should aim to pass all the tests provided here by only working on the respective modules.
*/

import {
  addProduct,
  removeProduct,
  updateProductStock,
  applyDiscount,
} from '../productManager';
import {
  filterProductsByCategory,
  getLowStockProducts,
} from '../productFilters';
import { getTopProductsBySales } from '../salesManager';
import { products } from '../Product';

// ===== 1. Adding Products =====
console.warn('=== Adding Products ===');
const shirt = addProduct('T-Shirt', 29.99, 'clothing', 100, 30, 'id-1');
console.log('Added T-Shirt (ID should be id-1):');
console.log(shirt);

const laptop = addProduct('Laptop', 999.99, 'electronics', 50, 10, 'id-2');
console.log('Added Laptop (ID should be id-2):');
console.log(laptop);

const sofa = addProduct('Sofa', 499.99, 'home', 20, 15, 'id-3');
console.log('Added Sofa (ID should be id-3):');
console.log(sofa);

// ===== 2. Applying Discount to a Product =====
console.warn('=== Applying Discount to a Product ===');
const discountedShirt = applyDiscount(shirt.id, 15);
console.log('It should say "Discount of 15% applied to product T-Shirt.":');
console.log(discountedShirt);

// ===== 3. Updating Product Stock =====
console.warn('=== Updating Product Stock ===');
const updatedLaptop = updateProductStock(laptop.id, 40);
console.log(
  'It should say "Stock quantity for product Laptop updated to 40.":'
);
console.log(updatedLaptop);

// ===== 4. Removing a Product =====
console.warn('=== Removing a Product ===');
const removedLipstick = removeProduct('id-5');
console.log('It should say "Product with ID id-5 not found.":');
console.log(removedLipstick);

// ===== 5. Filtering Products by Category =====
console.warn('=== Filtering Products by Category ===');
console.log('Clothing products (Expecting only T-Shirt):');
console.log(filterProductsByCategory('clothing'));

console.log('Clothing and Home products (Expecting T-Shirt and Sofa):');
console.log(filterProductsByCategory(['clothing', 'home']));

// ===== 6. Fetching Low Stock Products =====
console.warn('=== Fetching Low Stock Products ===');
console.log('It should return the Laptop and Sofa products:');
console.log(getLowStockProducts(50));

// ===== 7. Getting Top Products by Sales =====
console.warn('=== Getting Top Products by Sales ===');
const salesData = [
  { productId: 'id-2', soldUnits: 120 },
  { productId: 'id-1', soldUnits: 80 },
  { productId: 'id-4', soldUnits: 150 },
  { productId: 'id-3', soldUnits: 172 },
  { productId: 'id-5', soldUnits: 26 },
];
console.log('Top 2 products by sales (Expecting Sofa and Laptop):');
console.log(getTopProductsBySales([shirt, laptop, sofa], salesData, 2));

// ===== 8. Edge Case: Updating Non-existing Product Stock =====
console.warn('=== Attempting to Update a Non-existing Product ===');
const updateNonExistingProduct = updateProductStock('id-9999', 50);
console.log(
  'Updating a non-existing product should return "Product with ID id-9999 not found.":'
);
console.log(updateNonExistingProduct);

// ===== 9. Edge Case: Removing a Non-existing Product =====
console.warn('=== Attempting to Remove a Non-existing Product ===');
const removeNonExistingProduct = removeProduct('id-1000');
console.log(
  'Removing a non-existing product should return "Product with ID id-1000 not found.":'
);
console.log(removeNonExistingProduct);

// ===== 10. Adding Product After Removal and Checking IDs =====
console.warn('=== Adding New Product After Removal ===');
const basketball = addProduct('Basketball', 29.99, 'sports', 30, 25, 'id-6');
console.log(
  'A basketball product with ID id-6 should be added in the products list:'
);
console.log(products);

console.warn('=== Verifying Product IDs ===');
console.log('All Product IDs should be [id-1, id-2, id-3, id-6]:');
console.log([shirt.id, laptop.id, sofa.id, basketball.id]);
