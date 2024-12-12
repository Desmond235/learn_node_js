 const express = require('express')
 const router = express.Router();

 const {login, register} = require('../controllers/auth')

 router.route('/register').get(register)
 router.route('/login').get(login)

 module.exports = router;