const express = require('express');
const exphbs = require('express-handlebars');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);


app.engine('handlebars', exphbs({
    defaultLayout: 'main', 
    layoutsDir: path.join(__dirname, 'views/layouts')
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));


app.get('/', (req, res) => {
    res.render('index', {
        products: products 
    });
});


app.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', {
        products: products 
    });
});


io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');

    
    socket.on('addProduct', (product) => {
       
        product.id = Math.floor(Math.random() * 1000) + 1;
       
        products.push(product);
       
        saveProductsToFile();
        
        io.emit('productAdded', product);
    });

    socket.on('deleteProduct', (productId) => {
        
        products = products.filter(product => product.id !== productId);
        
        saveProductsToFile();
       
        io.emit('productDeleted', productId);
    });
});


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});


let products = loadProductsFromFile();


function loadProductsFromFile() {
    try {
        const productsData = fs.readFileSync(path.join(__dirname, 'data/productos.json'), 'utf-8');
        return JSON.parse(productsData);
    } catch (error) {
        console.error('Error al cargar productos desde el archivo:', error);
        return [];
    }
}


function saveProductsToFile() {
    try {
        fs.writeFileSync(path.join(__dirname, 'data/productos.json'), JSON.stringify(products, null, 2));
        console.log('Productos guardados en productos.json');
    } catch (error) {
        console.error('Error al guardar productos en el archivo:', error);
    }
}
