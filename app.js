const express = require('express');
const logger = require('./logger');
const authorize = require('./authorize');
const {people} = require('./02-express-tutorial/data');
const router = require('./routes/people');
const authRouter = require('./routes/auth')

const app = express();

const port = 4001;

app.use(router)
app.use(authRouter);

// parse form data
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.get('/api/people', (req, res) => {
    res.status(200).json({
        status: true, data: people
    })
});


app.listen(port, () => console.log(`Server is listening on port ${port}...`));

