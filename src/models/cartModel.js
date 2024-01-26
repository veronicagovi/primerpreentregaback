// src/models/cartModel.js

class Cart {
    constructor(id, products) {
      this.id = id;
      this.products = products || [];
    }
  }
  
  class CartProduct {
    constructor(productId, quantity, stock) {
      this.productId = productId;
      this.quantity = quantity;
      this.stock = stock;
    }
  }
  
  module.exports = {
    Cart,
    CartProduct,
  };
  
