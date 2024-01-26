const fs = require('fs/promises');
const path = require('path');
const Product = require('../models/productModel');

async function getAllProducts(req, res) {
  try {
    console.log('Intentando obtener la lista de productos...');

    const filePath = path.join(__dirname, '..', 'data', 'productos.json');
    const productsData = await fs.readFile(filePath, 'utf-8');

    const products = JSON.parse(productsData);

    console.log('Productos obtenidos correctamente:', products);

    res.json(products);
  } catch (error) {
    console.error('Error al obtener la lista de productos:', error);
    res.status(500).json({ error: 'Error al obtener la lista de productos' });
  }
}

async function getProductById(req, res) {
  const productId = req.params.pid;

  try {
    const filePath = path.join(__dirname, '..', 'data', 'productos.json');
    const productsData = await fs.readFile(filePath, 'utf-8');
    const products = JSON.parse(productsData);

    const product = products.find(p => p.id == productId);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    console.error('Error al obtener el producto:', error);

    // Manejar errores específicos, por ejemplo, si el archivo no existe
    if (error.code === 'ENOENT') {
      res.status(500).json({ error: 'Error: el archivo de productos no existe' });
    } else {
      res.status(500).json({ error: 'Error al obtener el producto' });
    }
  }
}

async function addProduct(req, res) {
  const newProductData = req.body;
  try {
    const filePath = path.join(__dirname, '..', 'data', 'productos.json');
    const productsData = await fs.readFile(filePath, 'utf-8');
    const products = JSON.parse(productsData);

    // Generar un nuevo ID único
    const newProductId = Date.now().toString();

    const newProduct = new Product(
      newProductId,
      newProductData.title,
      newProductData.description,
      newProductData.code,
      newProductData.price,
      newProductData.status,
      newProductData.stock,
      newProductData.category,
      newProductData.thumbnails
    );

    products.push(newProduct);
    await fs.writeFile(filePath, JSON.stringify(products, null, 2));

    res.json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar un nuevo producto' });
  }
}

async function updateProduct(req, res) {
  const productId = req.params.pid;
  const updatedProductData = req.body;

  try {
    const filePath = path.join(__dirname, '..', 'data', 'productos.json');
    const productsData = await fs.readFile(filePath, 'utf-8');
    const products = JSON.parse(productsData);

    const updatedProductIndex = products.findIndex(p => p.id == productId);

    if (updatedProductIndex !== -1) {
      const updatedProduct = new Product(
        productId,
        updatedProductData.title,
        updatedProductData.description,
        updatedProductData.code,
        updatedProductData.price,
        updatedProductData.status,
        updatedProductData.stock,
        updatedProductData.category,
        updatedProductData.thumbnails
      );

      products[updatedProductIndex] = updatedProduct;
      await fs.writeFile(filePath, JSON.stringify(products, null, 2));

      res.json(updatedProduct);
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
}

async function deleteProduct(req, res) {
  const productId = req.params.pid;

  try {
    const filePath = path.join(__dirname, '..', 'data', 'productos.json');
    const productsData = await fs.readFile(filePath, 'utf-8');
    let products = JSON.parse(productsData);

    const updatedProducts = products.filter(p => p.id !== productId);

    await fs.writeFile(filePath, JSON.stringify(updatedProducts, null, 2));

    res.json({ message: 'Producto eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
