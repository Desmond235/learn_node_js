const connectDB = require('./db/connect')
require('dotenv').config();
const express = require('express')
const app = express();
const tasks = require('./routes/tasks');
const path = require('path');
const notFound = require('./middleware/not-found')
const error = require('./middleware/error_handler')
const port = process.env.PoRT || 3000;

const connectionString = process.env.MONGO_URI

app.use(express.json());
app.use(express.static('./public'));

// routes
app.use('/api/v1/tasks', tasks);

// middleware
app.use(notFound)
app.use(error)



const start = async() => {
    try {
        await connectDB(connectionString)
        .then(console.log('Connected to the database'))
        .catch(console.error);
        app.listen(port, () => console.log(`Server running on port ${port}`));
    } catch (error) {
        console.error('Error connecting to the database:', error.message);
        process.exit(1);
    }
}

start();
