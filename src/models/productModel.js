// src/models/productModel.js
class Product {
    constructor(id, title, description, code, price, color, model, stock, thumbnails) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.code = code;
      this.price = price;
      this.color = color;
      this.model = model;
      this.stock = stock;
      this.thumbnails = thumbnails;
    }
  }
  
  module.exports = Product;
  