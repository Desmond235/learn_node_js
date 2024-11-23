require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

const connectDB = require('./db/connect')
const productsRouter = require('./routes/products');

const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');

const connectionString =  process.env.MONGO_URI;

// middleware
app.use(express.json());

// routes
app.get('/', (req, res) => {
    res.send('<h1>Store API</h1><a href="api/v1/products">products route</a>');
});

app.get('/products', (req, res) => {
     res.send('Products')
})

app.use('/api/v1/products',productsRouter )


// products route
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 3005;

const start = async () => {
    try {
        await connectDB(connectionString)
        .then(console.log('connected to database'))
        .catch((error) => console.log(error));

        app.listen(port,() => console.log(`Server is listening on port ${port}...`));
    } catch (error) {
        console.log(error);
    }
}

start();