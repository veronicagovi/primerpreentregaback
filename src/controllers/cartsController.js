
const fs = require('fs/promises');

async function createCart(req, res) {
  const newCart = {
    id: Date.now().toString(),
    products: [],
  };

  try {
    const cartsData = await fs.readFile(__dirname + '/../data/carrito.json', 'utf-8');

    const carts = JSON.parse(cartsData);

    carts.push(newCart);
    await fs.writeFile('data/carrito.json', JSON.stringify(carts, null, 2));

    res.json(newCart);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear un nuevo carrito' });
  }
}

async function getCartById(req, res) {
  const cartId = req.params.cid;

  try {
    const cartsData = await fs.readFile('data/carrito.json', 'utf-8');
    const carts = JSON.parse(cartsData);

    const cart = carts.find(c => c.id == cartId);

    if (cart) {
      res.json(cart.products);
    } else {
      res.status(404).json({ error: 'Carrito no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el carrito' });
  }
}

async function addProductToCart(req, res) {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const { quantity } = req.body;

  try {
    const cartsData = await fs.readFile('data/carrito.json', 'utf-8');
    let carts = JSON.parse(cartsData);

    const cartIndex = carts.findIndex(c => c.id == cartId);

    if (cartIndex !== -1) {
      const productIndex = carts[cartIndex].products.findIndex(p => p.product == productId);

      if (productIndex !== -1) {
        
        carts[cartIndex].products[productIndex].quantity += quantity;
      } else {
        
        carts[cartIndex].products.push({
          product: productId,
          quantity: quantity,
        });
      }

      await fs.writeFile('data/carrito.json', JSON.stringify(carts, null, 2));

      res.json(carts[cartIndex]);
    } else {
      res.status(404).json({ error: 'Carrito no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el producto al carrito' });
  }
}

module.exports = {
  createCart,
  getCartById,
  addProductToCart,
};
