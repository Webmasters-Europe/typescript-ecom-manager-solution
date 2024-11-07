(() => {
  // src/Product.ts
  var products = [];

  // src/productManager.ts
  function generateProductId() {
    const datePrefix = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    const timestamp = Date.now();
    return `${datePrefix}-${timestamp}`;
  }
  function addProduct(name, price, category, stockQuantity, discountPercentage, id) {
    const newProduct = {
      name,
      price,
      category,
      stockQuantity,
      discountPercentage,
      addedDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      id: id || generateProductId()
    };
    products.push(newProduct);
    return newProduct;
  }
  function removeProduct(id) {
    const productIndex = products.findIndex((p) => p.id === id);
    if (productIndex !== -1) {
      products.splice(productIndex, 1);
      return `Product with ID ${id} removed successfully.`;
    }
    return `Product with ID ${id} not found.`;
  }
  function updateProductStock(id, newQuantity) {
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
  function applyDiscount(id, discountPercentage) {
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

  // src/productFilters.ts
  function filterProductsByCategory(category) {
    if (Array.isArray(category)) {
      return products.filter((p) => category.includes(p.category));
    } else {
      return products.filter((p) => p.category === category);
    }
  }
  function getLowStockProducts(threshold) {
    return products.filter((p) => p.stockQuantity < threshold);
  }

  // src/salesManager.ts
  function getTopProductsBySales(products2, salesData2, topN) {
    const getTotalSales = (productId) => {
      return salesData2.filter((sale) => sale.productId === productId).reduce((total, sale) => total + sale.soldUnits, 0);
    };
    return products2.sort((a, b) => {
      const salesA = getTotalSales(a.id);
      const salesB = getTotalSales(b.id);
      return salesB - salesA;
    }).slice(0, topN);
  }

  // src/tests/ecomManager.test.ts
  console.warn("=== Adding Products ===");
  var shirt = addProduct("T-Shirt", 29.99, "clothing", 100, 30, "id-1");
  console.log("Added T-Shirt (ID should be id-1):");
  console.log(shirt);
  var laptop = addProduct("Laptop", 999.99, "electronics", 50, 10, "id-2");
  console.log("Added Laptop (ID should be id-2):");
  console.log(laptop);
  var sofa = addProduct("Sofa", 499.99, "home", 20, 15, "id-3");
  console.log("Added Sofa (ID should be id-3):");
  console.log(sofa);
  console.warn("=== Applying Discount to a Product ===");
  var discountedShirt = applyDiscount(shirt.id, 15);
  console.log('It should say "Discount of 15% applied to product T-Shirt.":');
  console.log(discountedShirt);
  console.warn("=== Updating Product Stock ===");
  var updatedLaptop = updateProductStock(laptop.id, 40);
  console.log(
    'It should say "Stock quantity for product Laptop updated to 40.":'
  );
  console.log(updatedLaptop);
  console.warn("=== Removing a Product ===");
  var removedLipstick = removeProduct("id-5");
  console.log('It should say "Product with ID id-5 not found.":');
  console.log(removedLipstick);
  console.warn("=== Filtering Products by Category ===");
  console.log("Clothing products (Expecting only T-Shirt):");
  console.log(filterProductsByCategory("clothing"));
  console.log("Clothing and Home products (Expecting T-Shirt and Sofa):");
  console.log(filterProductsByCategory(["clothing", "home"]));
  console.warn("=== Fetching Low Stock Products ===");
  console.log("It should return the Laptop and Sofa products:");
  console.log(getLowStockProducts(50));
  console.warn("=== Getting Top Products by Sales ===");
  var salesData = [
    { productId: "id-2", soldUnits: 120 },
    { productId: "id-1", soldUnits: 80 },
    { productId: "id-4", soldUnits: 150 },
    { productId: "id-3", soldUnits: 172 },
    { productId: "id-5", soldUnits: 26 }
  ];
  console.log("Top 2 products by sales (Expecting Sofa and Laptop):");
  console.log(getTopProductsBySales([shirt, laptop, sofa], salesData, 2));
  console.warn("=== Attempting to Update a Non-existing Product ===");
  var updateNonExistingProduct = updateProductStock("id-9999", 50);
  console.log(
    'Updating a non-existing product should return "Product with ID id-9999 not found.":'
  );
  console.log(updateNonExistingProduct);
  console.warn("=== Attempting to Remove a Non-existing Product ===");
  var removeNonExistingProduct = removeProduct("id-1000");
  console.log(
    'Removing a non-existing product should return "Product with ID id-1000 not found.":'
  );
  console.log(removeNonExistingProduct);
  console.warn("=== Adding New Product After Removal ===");
  var basketball = addProduct("Basketball", 29.99, "sports", 30, 25, "id-6");
  console.log(
    "A basketball product with ID id-6 should be added in the products list:"
  );
  console.log(products);
  console.warn("=== Verifying Product IDs ===");
  console.log("All Product IDs should be [id-1, id-2, id-3, id-6]:");
  console.log([shirt.id, laptop.id, sofa.id, basketball.id]);
})();
