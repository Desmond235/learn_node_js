// check username, password in post(login) request
// if exist create new JWT
// send back to front-end

// setup authentication son only the request with JWT can access the dashboard

// require('dotenv').config()
const jwt = require('jsonwebtoken');
const CustomAPIError = require('../errors/custom-error')
const login = async (req, res, next) => {
    const { username, password } = req.body;

    // mongo validation,
    // joi,
    // check in  the controller

    if (!username || !password) {
        throw new CustomAPIError('No token provided', 401)
    }

    const id = new Date().getDate()

    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: '30d' });

    console.log(process.env.JWT_SECRET)

    res.status(200).json({
        msg: "User created",
        token
    })
}

const dashboard = async (req, res) => {
    const luckyNumber = Math.floor(Math.random() * 90);
    const {username} = req.user

    res.status(200).json({
        msg: `Hello, ${username} ` ,
        secret: `Here is your authorized data, your lucky number is ${luckyNumber}`
    })
}

module.exports = {
    login,
    dashboard
}