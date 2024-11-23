const express = require('express');
const router = express.Router();

const {getAllProducts, geAllProductsStatic} = require('../controllers/products');

router.route('/').get(getAllProducts);
router.route('/static').get(geAllProductsStatic);


module.exports = router;